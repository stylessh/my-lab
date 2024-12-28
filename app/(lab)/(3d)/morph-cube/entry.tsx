"use client";

import * as THREE from "three";
import {
  Environment,
  Lightformer,
  OrbitControls,
  RoundedBox,
} from "@react-three/drei";
import { useMemo } from "react";
import { Effects } from "./effects";
import { useSpring, animated } from "@react-spring/three";
import { useControls } from "leva";

export default function Entry() {
  const { autoRotate } = useControls("controls", {
    autoRotate: true,
  });

  return (
    <>
      <OrbitControls autoRotate={autoRotate} />
      <BoxChunk />

      <color attach="background" args={["#101010"]} />
      <ambientLight intensity={0.6} />
      <pointLight position={[0, 0, 0]} intensity={5} color="#f00" />

      <Environment resolution={256}>
        <group rotation={[-Math.PI / 3, 0, 1]}>
          <Lightformer
            form="circle"
            intensity={100}
            rotation-x={Math.PI / 2}
            position={[0, 5, -9]}
            scale={2}
          />
          <Lightformer
            form="circle"
            intensity={2}
            rotation-y={Math.PI / 2}
            position={[-5, 1, -1]}
            scale={2}
          />
          <Lightformer
            form="circle"
            intensity={2}
            rotation-y={Math.PI / 2}
            position={[-5, -1, -1]}
            scale={2}
          />
          <Lightformer
            form="circle"
            intensity={2}
            rotation-y={-Math.PI / 2}
            position={[10, 1, 0]}
            scale={8}
          />
          <Lightformer
            form="ring"
            color="#f00"
            intensity={80}
            onUpdate={(self) => self.lookAt(0, 0, 0)}
            position={[10, 10, 0]}
            scale={10}
          />
        </group>
      </Environment>

      <Effects />
    </>
  );
}

function AnimatedBox({
  position,
  delay,
  config,
  radius,
  materialProps,
}: {
  position: THREE.Vector3;
  delay: number;
  config: { mass: number; tension: number; friction: number };
  radius: number;
  materialProps: { roughness: number; metalness: number };
}) {
  const { scale } = useSpring({
    from: { scale: 1 },
    to: [{ scale: 0 }, { scale: 1 }],
    config,
    loop: true,
    delay,
  });

  return (
    <animated.mesh position={position} castShadow receiveShadow scale={scale}>
      <RoundedBox radius={radius} smoothness={4}>
        <meshStandardMaterial color="white" {...materialProps} />
      </RoundedBox>
    </animated.mesh>
  );
}

function BoxChunk() {
  const { size, gap, delayFactor, springMass, springTension, springFriction } =
    useControls("grid", {
      size: { value: 4, min: 2, max: 8, step: 1 },
      gap: { value: 1, min: 0.5, max: 2, step: 0.1 },
      delayFactor: { value: 200, min: 50, max: 500, step: 10 },
      springMass: { value: 1, min: 0.1, max: 5, step: 0.1 },
      springTension: { value: 280, min: 50, max: 500, step: 10 },
      springFriction: { value: 60, min: 10, max: 100, step: 1 },
    });

  const { boxRadius, roughness, metalness } = useControls("boxes", {
    boxRadius: { value: 0.1, min: 0, max: 0.5, step: 0.01 },
    roughness: { value: 0.1, min: 0, max: 1, step: 0.1 },
    metalness: { value: 0.25, min: 0, max: 1, step: 0.1 },
  });

  const cubes = useMemo(() => {
    const chunks = [];

    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        for (let z = 0; z < size; z++) {
          const position = new THREE.Vector3(
            (x - size / 2) * gap,
            (y - size / 2) * gap,
            (z - size / 2) * gap
          );

          const delay = (x + y + z) * delayFactor;

          chunks.push({
            position,
            key: `cube-${x}-${y}-${z}`,
            delay,
          });
        }
      }
    }

    return chunks;
  }, [size, gap, delayFactor]);

  const springConfig = {
    mass: springMass,
    tension: springTension,
    friction: springFriction,
  };

  const materialProps = {
    roughness,
    metalness,
  };

  return (
    <group rotation={[0, -10, 0]}>
      {cubes.map(({ position, key, delay }) => (
        <AnimatedBox
          key={key}
          position={position}
          delay={delay}
          config={springConfig}
          radius={boxRadius}
          materialProps={materialProps}
        />
      ))}
    </group>
  );
}
