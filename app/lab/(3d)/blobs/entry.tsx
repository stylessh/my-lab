"use client";

import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useMemo, useRef } from "react";
import * as THREE from "three";

export default function Entry() {
  const mouse = useRef({ x: 0, y: 0 });

  useFrame(({ pointer }) => {
    mouse.current = pointer;
  });

  return (
    <>
      <color attach="background" args={["#e0e0e0"]} />
      <Blob mouseRef={mouse} />
      <ambientLight intensity={0.5} />
    </>
  );
}

const vertexShader = /*glsl*/ `
  varying vec3 vPosition;
  varying vec3 vRayDir;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vPosition = position;
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vec4 mvPosition = viewMatrix * worldPosition;
    gl_Position = projectionMatrix * mvPosition;

    // Calculate proper ray direction for perspective view
    vRayDir = normalize(worldPosition.xyz - cameraPosition);
  }
`;

const fragmentShader = /*glsl*/ `
  varying vec3 vPosition;
  varying vec3 vRayDir;
  varying vec2 vUv;
  
  uniform vec2 uMouse;

  uniform float uSphere1Radius;
  uniform float uSphere2Radius;
  uniform float uSphere3Radius;
  uniform float uSmoothness;

  float sdSphere(vec3 p, float r) {
    return length(p) - r;
  }

  float smin(float a, float b, float k) {
    float h = max(k - abs(a - b), 0.0) / k;
    return min(a, b) - h * h * k * 0.25;
  }

  float map(vec3 p) {
    // Different movement speeds for each sphere
    vec3 mouseOffset1 = vec3(uMouse.x, uMouse.y, 0.0) * 0.4;  // Fastest
    vec3 mouseOffset2 = vec3(uMouse.x, uMouse.y, 0.0) * 0.2;  // Slowest
    vec3 mouseOffset3 = vec3(uMouse.x, uMouse.y, 0.0) * 0.3;  // Medium

    // Base positions
    vec3 pos1 = vec3(-0.7, 0.0, 0.0);
    vec3 pos2 = vec3(0.7, 0.0, 0.0);
    vec3 pos3 = vec3(0.0, -0.4, 0.0);

    // Apply different offsets to each sphere
    float sphere1 = sdSphere(p - (pos1 + mouseOffset1), uSphere1Radius);
    float sphere2 = sdSphere(p - (pos2 + mouseOffset2), uSphere2Radius);
    float sphere3 = sdSphere(p - (pos3 + mouseOffset3), uSphere3Radius);

    // Smooth blend all three spheres
    float blend = smin(sphere1, sphere2, uSmoothness);
    return smin(blend, sphere3, uSmoothness);
  }

  vec3 calcNormal(vec3 p) {
    vec2 e = vec2(0.0001, 0.0);
    return normalize(vec3(
      map(p + e.xyy) - map(p - e.xyy),
      map(p + e.yxy) - map(p - e.yxy),
      map(p + e.yyx) - map(p - e.yyx)
    ));
  }

  vec3 lighting(vec3 ro, vec3 p) {
    vec3 normal = calcNormal(p);
    vec3 viewDir = normalize(ro - p);

    // Ambient light
    vec3 ambient = vec3(0.2);

    // Diffuse lighting
    vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
    vec3 lightColor = vec3(1.0, 1.0, 0.9);
    float dp = max(0.0, dot(lightDir, normal));
    vec3 diffuse = dp * lightColor;

    // Specular highlight
    vec3 reflectDir = reflect(-lightDir, normal);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32.0);
    vec3 specular = vec3(0.5) * spec;

    // Final lighting calculation
    return ambient * 0.1 + diffuse * 0.5 + specular * 0.5;
  }

  void main() {
    // Convert UV to screen space coordinates
    vec2 uv = vUv * 2.0 - 1.0;

    // Setup camera
    vec3 rayOrigin = vec3(0.0, 0.0, -4.0); // Move camera back
    vec3 rayDir = normalize(vec3(uv, 2.0)); // Add perspective

    float t = 0.0;
    vec3 p = rayOrigin;
    
    // Ray marching loop
    for(int i = 0; i < 100; i++) {
      p = rayOrigin + rayDir * t;
      float d = map(p);
      
      if(d < 0.001) break;
      if(t > 20.0) { discard; }
      
      t += d;
    }

    if(t < 20.0) {
      vec3 color = lighting(rayOrigin, p);
      gl_FragColor = vec4(color, 1.0);
    } else {
      discard;
    }
  }
`;

const Blob = ({
  mouseRef,
}: {
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
}) => {
  const ref = useRef<THREE.Mesh>(null);
  const currentPos = useRef(new THREE.Vector2(0, 0));

  const controls = useControls(
    {
      smoothness: { value: 0.3, min: 0.01, max: 1, step: 0.01 },
      sphere1Radius: { value: 0.45, min: 0, max: 1, step: 0.001 },
      sphere2Radius: { value: 0.45, min: 0, max: 1, step: 0.001 },
      sphere3Radius: { value: 0.6, min: 0, max: 1, step: 0.001 },
    },
    { collapsed: true }
  );

  const uniforms = useMemo(
    () => ({
      uMouse: { value: new THREE.Vector2(0, 0) },
      uSphere1Radius: { value: 0.0 },
      uSphere2Radius: { value: 0.0 },
      uSphere3Radius: { value: 0.0 },
      uSmoothness: { value: 0.0 },
    }),
    []
  );

  useFrame(() => {
    if (uniforms.uMouse) {
      // Smooth interpolation
      const lerp = (start: number, end: number, t: number) =>
        start + (end - start) * t;
      const smoothness = 0.075; // Lower = smoother

      currentPos.current.x = lerp(
        currentPos.current.x,
        mouseRef.current.x,
        smoothness
      );
      currentPos.current.y = lerp(
        currentPos.current.y,
        mouseRef.current.y,
        smoothness
      );

      uniforms.uMouse.value.x = currentPos.current.x;
      uniforms.uMouse.value.y = currentPos.current.y;

      uniforms.uSphere1Radius.value = controls.sphere1Radius;
      uniforms.uSphere2Radius.value = controls.sphere2Radius;
      uniforms.uSphere3Radius.value = controls.sphere3Radius;
      uniforms.uSmoothness.value = controls.smoothness;
    }
  });

  return (
    <>
      <mesh ref={ref}>
        <planeGeometry args={[16, 16]} />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
        />
      </mesh>
    </>
  );
};
