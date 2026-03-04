import React, {
    useRef,
    useState,
    useEffect,
    useMemo,
    useCallback,
    Suspense,
} from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

/* ── Config ──────────────────────────────────────────────── */

/** Distance from origin to camera along Z */
const CAMERA_Z = 30;
/** Milliseconds to wait before the fly-through starts */
const ANIMATION_DELAY_MS = 1200;
/** Duration of the fly-through in seconds */
const ANIMATION_DURATION = 1.8;
/** Total Z-distance the plane travels (must exceed CAMERA_Z) */
const TRAVEL_DISTANCE = 38;

/* ── Shader: texture-based mask with complex hole shape ──── */

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform sampler2D uMask;
  uniform float uTextureAspect;  // width / height of the PNG
  uniform float uViewportAspect; // width / height of the viewport
  uniform float uLogoScale;      // how much of the plane the logo occupies
  varying vec2 vUv;

  void main() {
    // Center UV so (0,0) is the middle
    vec2 centered = vUv - 0.5;

    // Correct for the mismatch between viewport and texture aspect ratios
    float aspectCorrection = uViewportAspect / uTextureAspect;
    if (aspectCorrection > 1.0) {
      centered.x *= aspectCorrection;
    } else {
      centered.y /= aspectCorrection;
    }

    // Scale down so the logo occupies a smaller region
    centered /= uLogoScale;

    // Shift back to 0..1 UV range
    vec2 correctedUv = centered + 0.5;

    // Outside the texture bounds → solid wall
    if (correctedUv.x < 0.0 || correctedUv.x > 1.0 ||
        correctedUv.y < 0.0 || correctedUv.y > 1.0) {
      gl_FragColor = vec4(uColor, 1.0);
      return;
    }

    vec4 maskSample = texture2D(uMask, correctedUv);

    // Opaque logo pixels → hole (alpha = 0), transparent → solid wall (alpha = 1)
    float alpha = 1.0 - maskSample.a;
    alpha = smoothstep(0.05, 0.95, alpha);

    gl_FragColor = vec4(uColor, alpha);
  }
`;

/* ── Internal: animated mask plane ───────────────────────── */

interface AnimatedMaskProps {
    maskColor: string;
    mask: string;
    logoScale?: number;
    onLoaded: () => void;
    onComplete: () => void;
    beforeStart?: () => void;
}

function AnimatedMask({ maskColor, mask, logoScale = 0.3, onLoaded, onComplete, beforeStart }: AnimatedMaskProps) {
    const texture = useTexture(mask);
    const meshRef = useRef<THREE.Mesh>(null!);
    const startTimeRef = useRef<number | null>(null);
    const completedRef = useRef(false);
    const [animating, setAnimating] = useState(false);
    const { viewport } = useThree();

    const color = useMemo(() => new THREE.Color(maskColor), [maskColor]);

    /* Ensure the texture stretches cleanly without mipmap artifacts */
    useEffect(() => {
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.generateMipmaps = false;
    }, [texture]);
    
    const img = texture.image as HTMLImageElement | undefined;
    const textureAspect = img ? img.width / img.height : 1;
    const viewportAspect = viewport.width / viewport.height;

    const uniforms = useMemo(
        () => ({
            uColor: { value: color },
            uMask: { value: texture },
            uTextureAspect: { value: textureAspect },
            uViewportAspect: { value: viewportAspect },
            uLogoScale: { value: logoScale },
        }),
        [color, texture, textureAspect, viewportAspect, logoScale],
    );

    /* Size the plane to cover the full viewport with overflow */
    const planeWidth = viewport.width * 1.3;
    const planeHeight = viewport.height * 1.3;

    useEffect(() => { onLoaded(); }, [onLoaded]);

    useEffect(() => {
        if (beforeStart) beforeStart();
    }, [beforeStart]);

    /* Begin the fly-through after a short pause */
    useEffect(() => {
        const id = setTimeout(() => setAnimating(true), ANIMATION_DELAY_MS);
        return () => clearTimeout(id);
    }, []);

    /* Per-frame animation: move plane toward (and past) the camera */
    useFrame((state) => {
        if (!animating || !meshRef.current || completedRef.current) return;

        if (startTimeRef.current === null) {
            startTimeRef.current = state.clock.elapsedTime;
        }

        const elapsed = state.clock.elapsedTime - startTimeRef.current;
        const t = Math.min(elapsed / ANIMATION_DURATION, 1);

        /* Cubic ease-in → slow start, fast finish (swooping toward user) */
        const eased = t * t * t;

        meshRef.current.position.z = eased * TRAVEL_DISTANCE;

        /* Scale up as it approaches the camera so edges stay covered */
        const scale = 1 + eased * 4;
        meshRef.current.scale.set(scale, scale, 1);

        if (t >= 1 && !completedRef.current) {
            completedRef.current = true;
            onComplete();
        }
    });

    return (
        <mesh ref={meshRef}>
            <planeGeometry args={[planeWidth, planeHeight]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent
                depthWrite={false}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
}

// Preload mask texture if desired (optional)

/* ── Public component ────────────────────────────────────── */


export interface MaskIntroProps {
    onComplete: () => void;
    beforeStart?: () => void;
    backgroundColor: string;
    mask: string;
    logoScale?: number;
}

export function MaskIntro({ onComplete, beforeStart, backgroundColor, mask, logoScale }: MaskIntroProps) {
    const [modelReady, setModelReady] = useState(false);
    const handleLoaded = useCallback(() => setModelReady(true), []);

    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                pointerEvents: 'none',
                background: modelReady ? 'transparent' : backgroundColor,
                transition: 'background 0.15s ease',
            }}
        >
            <Canvas
                camera={{ position: [0, 0, CAMERA_Z], fov: 90 }}
                gl={{ alpha: true }}
                style={{ background: 'transparent' }}
            >
                <Suspense fallback={null}>
                    <AnimatedMask
                        maskColor={backgroundColor}
                        mask={mask}
                        logoScale={logoScale}
                        onLoaded={handleLoaded}
                        onComplete={onComplete}
                        beforeStart={beforeStart}
                    />
                </Suspense>
            </Canvas>
        </div>
    );
}
