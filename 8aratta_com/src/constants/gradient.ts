import { GradientConfig } from '../types';

// Default grayscale gradient configuration
export const DEFAULT_GRADIENT_CONFIG: GradientConfig = {
  colors: {
    color1: '#606060',
    color2: '#909090',
    color3: '#212121',
  },
  baseRotation: {
    rotationX: 65,
    rotationY: 0,
    rotationZ: 0,
  },
  animation: {
    speed: 0.3,
    density: 1.5,
    strength: 0.8,
  },
  camera: {
    azimuthAngle: 180,
    polarAngle: 80,
    distance: 3,
    zoom: 8,
  },
};

// Mouse interaction sensitivity
export const MOUSE_SENSITIVITY = {
  rotationX: 0,
  rotationY: 0,
  rotationZ: 10,
};
