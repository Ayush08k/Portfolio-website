"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function AuroraBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ── Device-aware quality settings ──────────────────────────────
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth <= 1024 && window.innerWidth > 768;
    // Render at lower resolution on mobile/tablet for massive perf gain
    const resolutionScale = isMobile ? 0.35 : isTablet ? 0.5 : 0.65;
    const numOctaves = isMobile ? 2 : 3;
    const loopIterations = isMobile ? 20 : isTablet ? 28 : 35;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: false, // AA not needed for background shader
        alpha: true,
        powerPreference: isMobile ? "low-power" : "default",
      });
    } catch {
      // WebGL not available — fail silently
      return;
    }
    
    // Get container dimensions at reduced resolution
    const fullW = container.clientWidth || window.innerWidth;
    const fullH = container.clientHeight || window.innerHeight;
    const w = Math.round(fullW * resolutionScale);
    const h = Math.round(fullH * resolutionScale);
    
    renderer.setSize(w, h);
    // Stretch the low-res canvas to fill container via CSS
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.imageRendering = "auto";
    container.appendChild(renderer.domElement);

    // Create the shader material with device-tuned parameters
    const material = new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector2(w, h) }
      },
      vertexShader: `
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float iTime;
        uniform vec2 iResolution;

        #define NUM_OCTAVES ${numOctaves}

        float rand(vec2 n) {
          return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
        }

        float noise(vec2 p) {
          vec2 ip = floor(p);
          vec2 u = fract(p);
          u = u*u*(3.0-2.0*u);

          float res = mix(
            mix(rand(ip), rand(ip + vec2(1.0, 0.0)), u.x),
            mix(rand(ip + vec2(0.0, 1.0)), rand(ip + vec2(1.0, 1.0)), u.x), u.y);
          return res * res;
        }

        float fbm(vec2 x) {
          float v = 0.0;
          float a = 0.3;
          vec2 shift = vec2(100.0);
          mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
          for (int i = 0; i < NUM_OCTAVES; ++i) {
            v += a * noise(x);
            x = rot * x * 2.0 + shift;
            a *= 0.4;
          }
          return v;
        }

        void main() {
          vec2 shake = vec2(sin(iTime * 1.2) * 0.005, cos(iTime * 2.1) * 0.005);
          vec2 p = ((gl_FragCoord.xy + shake * iResolution.xy) - iResolution.xy * 0.5) / iResolution.y * mat2(6.0, -4.0, 4.0, 6.0);
          vec2 v;
          vec4 o = vec4(0.0);

          float f = 2.0 + fbm(p + vec2(iTime * 5.0, 0.0)) * 0.5;

          for (float i = 0.0; i < ${loopIterations}.0; i++) {
            v = p + cos(i * i + (iTime + p.x * 0.08) * 0.025 + i * vec2(13.0, 11.0)) * 3.5 + vec2(sin(iTime * 3.0 + i) * 0.003, cos(iTime * 3.5 - i) * 0.003);
            float tailNoise = fbm(v + vec2(iTime * 0.5, i)) * 0.3 * (1.0 - (i / ${loopIterations}.0));
            vec4 auroraColors = vec4(
              0.1 + 0.3 * sin(i * 0.2 + iTime * 0.4),
              0.3 + 0.5 * cos(i * 0.3 + iTime * 0.5),
              0.7 + 0.3 * sin(i * 0.4 + iTime * 0.3),
              1.0
            );
            vec4 currentContribution = auroraColors * exp(sin(i * i + iTime * 0.8)) / length(max(v, vec2(v.x * f * 0.015, v.y * 1.5)));
            float thinnessFactor = smoothstep(0.0, 1.0, i / ${loopIterations}.0) * 0.6;
            o += currentContribution * (1.0 + tailNoise * 0.8) * thinnessFactor;
          }

          o = tanh(pow(o / 100.0, vec4(1.6)));
          gl_FragColor = o * 1.5;
        }
      `
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // ── Throttled animation (reduce frame rate for background effect) ──
    let frameId: number;
    let lastTime = 0;
    const frameInterval = isMobile ? 50 : 33; // ~20fps mobile, ~30fps desktop

    const animate = (timestamp: number) => {
      frameId = requestAnimationFrame(animate);
      if (timestamp - lastTime < frameInterval) return;
      lastTime = timestamp;

      material.uniforms.iTime.value += 0.045;
      renderer.render(scene, camera);
    };
    frameId = requestAnimationFrame(animate);

    const handleResize = () => {
      if (!container) return;
      const fullW = container.clientWidth || window.innerWidth;
      const fullH = container.clientHeight || window.innerHeight;
      const w = Math.round(fullW * resolutionScale);
      const h = Math.round(fullH * resolutionScale);
      renderer.setSize(w, h);
      material.uniforms.iResolution.value.set(w, h);
      // Keep CSS size at 100%
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        pointerEvents: "none",
        overflow: "hidden",
        opacity: 0.45, // Set opacity so text and main content remain perfectly readable
        contain: "strict", // CSS containment for layout isolation
      }}
    />
  );
}
