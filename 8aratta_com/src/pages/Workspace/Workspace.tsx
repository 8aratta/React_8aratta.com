import React, { useState } from 'react';
import { ModelViewer } from '../../components';
import { useTheme } from '../../contexts';
import styles from './Workspace.module.css';

const MODEL_PATH = `${process.env.PUBLIC_URL}/assets/models/Workspace.glb`;

function Workspace() {
    const { theme } = useTheme();
    const [ready, setReady] = useState(false);

    return (
        <div className={styles.workspacePage} data-theme={theme}>
            <div className={styles.canvasWrapper}>
                <ModelViewer
                    modelPath={MODEL_PATH}
                    camera={{ position: [45, 45, 45], fov: 50 }}
                    rotation={[0, Math.PI, 0]}
                    controls={{
                        enablePan: true,
                        enableZoom: true,
                        enableRotate: true,
                        target: [0, 10, 0],
                        minDistance: 20,
                        maxDistance: 80,
                        panLimits: {
                            x: [-10, 10],
                            y: [-5, 15],
                            z: [-10, 10],
                        },
                        // Vertical rotation limits (radians)
                        minPolarAngle: Math.PI / 6,   // ~30° — prevents looking from directly above
                        maxPolarAngle: Math.PI / 2,   // ~90° — prevents looking from below
                        // Horizontal rotation limits (radians)
                        minAzimuthAngle: -Math.PI / 25, // -45° left
                        maxAzimuthAngle: Math.PI / 2,  //  45° right
                    }}
                    lighting={{
                        ambientIntensity: 0.4,
                        directionalPosition: [10, 10, 10],
                        directionalIntensity: 1,
                    }}
                    environment={theme === 'dark' ? 'night' : 'apartment'}
                    onReady={() => setReady(true)}
                />
            </div>

            {/* Hint overlay */}
            {ready && (
                <div className={styles.infoOverlay}>
                    <p className={styles.infoText}>Drag to rotate · Scroll to zoom</p>
                    <p className={styles.infoText}>This is just a preview im still modelling</p>
                </div>
            )}
        </div>
    );
}

export default Workspace;
