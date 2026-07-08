"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

interface ClientDot {
  name: string;
  country: string;
  lng: number;
  lat: number;
  pulseOffset: number;
}

const clientDots: ClientDot[] = [
  // --- Americas (11 dots) ---
  { name: "San Francisco", country: "United States", lng: -122.4194, lat: 37.7749, pulseOffset: 0 },
  { name: "New York", country: "United States", lng: -74.0060, lat: 40.7128, pulseOffset: 0.5 },
  { name: "Seattle", country: "United States", lng: -122.3321, lat: 47.6062, pulseOffset: 1.0 },
  { name: "Austin", country: "United States", lng: -97.7431, lat: 30.2672, pulseOffset: 1.5 },
  { name: "Chicago", country: "United States", lng: -87.6298, lat: 41.8781, pulseOffset: 2.0 },
  { name: "Los Angeles", country: "United States", lng: -118.2437, lat: 34.0522, pulseOffset: 2.5 },
  { name: "Boston", country: "United States", lng: -71.0589, lat: 42.3601, pulseOffset: 3.0 },
  { name: "Miami", country: "United States", lng: -80.1918, lat: 25.7617, pulseOffset: 3.5 },
  { name: "Toronto", country: "Canada", lng: -79.3832, lat: 43.6532, pulseOffset: 4.0 },
  { name: "Vancouver", country: "Canada", lng: -123.1207, lat: 49.2827, pulseOffset: 4.5 },
  { name: "Sao Paulo", country: "Brazil", lng: -46.6333, lat: -23.5505, pulseOffset: 5.0 },

  // --- Europe (15 dots) ---
  { name: "London", country: "United Kingdom", lng: -0.1278, lat: 51.5074, pulseOffset: 0.2 },
  { name: "Paris", country: "France", lng: 2.3522, lat: 48.8566, pulseOffset: 0.7 },
  { name: "Berlin", country: "Germany", lng: 13.4050, lat: 52.5200, pulseOffset: 1.2 },
  { name: "Amsterdam", country: "Netherlands", lng: 4.8952, lat: 52.3702, pulseOffset: 1.7 },
  { name: "Dublin", country: "Ireland", lng: -6.2603, lat: 53.3498, pulseOffset: 2.2 },
  { name: "Zurich", country: "Switzerland", lng: 8.5417, lat: 47.3769, pulseOffset: 2.7 },
  { name: "Stockholm", country: "Sweden", lng: 18.0686, lat: 59.3293, pulseOffset: 3.2 },
  { name: "Madrid", country: "Spain", lng: -3.7038, lat: 40.4168, pulseOffset: 3.7 },
  { name: "Rome", country: "Italy", lng: 12.4964, lat: 41.9028, pulseOffset: 4.2 },
  { name: "Munich", country: "Germany", lng: 11.5820, lat: 48.1351, pulseOffset: 4.7 },
  { name: "Warsaw", country: "Poland", lng: 21.0122, lat: 52.2297, pulseOffset: 0.4 },
  { name: "Oslo", country: "Norway", lng: 10.7522, lat: 59.9139, pulseOffset: 0.9 },
  { name: "Copenhagen", country: "Denmark", lng: 12.5683, lat: 55.6761, pulseOffset: 1.4 },
  { name: "Helsinki", country: "Finland", lng: 24.9384, lat: 60.1699, pulseOffset: 1.9 },
  { name: "Vienna", country: "Austria", lng: 16.3738, lat: 48.2082, pulseOffset: 2.4 },

  // --- Asia-Pacific (15 dots, excluding Pakistan) ---
  { name: "Bangalore", country: "India", lng: 77.5946, lat: 12.9716, pulseOffset: 0.1 },
  { name: "Mumbai", country: "India", lng: 72.8777, lat: 19.0760, pulseOffset: 0.6 },
  { name: "New Delhi", country: "India", lng: 77.2090, lat: 28.6139, pulseOffset: 1.1 },
  { name: "Singapore", country: "Singapore", lng: 103.8198, lat: 1.3521, pulseOffset: 1.6 },
  { name: "Tokyo", country: "Japan", lng: 139.6917, lat: 35.6762, pulseOffset: 2.1 },
  { name: "Sydney", country: "Australia", lng: 151.2093, lat: -33.8688, pulseOffset: 2.6 },
  { name: "Melbourne", country: "Australia", lng: 144.9631, lat: -37.8136, pulseOffset: 3.1 },
  { name: "Seoul", country: "South Korea", lng: 126.9780, lat: 37.5665, pulseOffset: 3.6 },
  { name: "Taipei", country: "Taiwan", lng: 121.5654, lat: 25.0330, pulseOffset: 4.1 },
  { name: "Hong Kong", country: "Hong Kong", lng: 114.1694, lat: 22.3193, pulseOffset: 4.6 },
  { name: "Jakarta", country: "Indonesia", lng: 106.8272, lat: -6.2088, pulseOffset: 0.3 },
  { name: "Kuala Lumpur", country: "Malaysia", lng: 101.6869, lat: 3.1390, pulseOffset: 0.8 },
  { name: "Bangkok", country: "Thailand", lng: 100.5018, lat: 13.7563, pulseOffset: 1.3 },
  { name: "Ho Chi Minh City", country: "Vietnam", lng: 106.6602, lat: 10.7626, pulseOffset: 1.8 },
  { name: "Manila", country: "Philippines", lng: 120.9842, lat: 14.5995, pulseOffset: 2.3 },

  // --- Middle East & Africa (10 dots) ---
  { name: "Dubai", country: "United Arab Emirates", lng: 55.2708, lat: 25.2048, pulseOffset: 0.8 },
  { name: "Tel Aviv", country: "Israel", lng: 34.7818, lat: 32.0853, pulseOffset: 1.3 },
  { name: "Riyadh", country: "Saudi Arabia", lng: 46.7386, lat: 24.7136, pulseOffset: 1.8 },
  { name: "Cape Town", country: "South Africa", lng: 18.4241, lat: -33.9249, pulseOffset: 2.3 },
  { name: "Johannesburg", country: "South Africa", lng: 28.0473, lat: -26.2041, pulseOffset: 2.8 },
  { name: "Nairobi", country: "Kenya", lng: 36.8219, lat: -1.2921, pulseOffset: 3.3 },
  { name: "Lagos", country: "Nigeria", lng: 3.3792, lat: 6.5244, pulseOffset: 3.8 },
  { name: "Cairo", country: "Egypt", lng: 31.2357, lat: 30.0444, pulseOffset: 4.3 },
  { name: "Casablanca", country: "Morocco", lng: -7.5898, lat: 33.5731, pulseOffset: 4.8 },
  { name: "Istanbul", country: "Turkey", lng: 28.9784, lat: 41.0082, pulseOffset: 0.5 }
];

interface RotatingEarthProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function RotatingEarth({ width = 850, height = 850, className = "" }: RotatingEarthProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    // ── Device-aware quality settings ──────────────────────────────
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth <= 1024 && window.innerWidth > 768;
    // Clamp DPR to max 2 to avoid overdraw on high-DPI screens
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);
    // Sparser dots on mobile/tablet for faster point-in-polygon + less draw calls
    const dotSpacing = isMobile ? 24 : isTablet ? 20 : 16;

    // Set up responsive dimensions
    const containerWidth = Math.min(width, window.innerWidth - 40);
    const containerHeight = Math.min(height, window.innerHeight - 100);
    const radius = Math.min(containerWidth, containerHeight) / 2.2;

    canvas.width = containerWidth * dpr;
    canvas.height = containerHeight * dpr;
    canvas.style.width = `${containerWidth}px`;
    canvas.style.height = `${containerHeight}px`;
    context.scale(dpr, dpr);

    // Create projection and path generator for Canvas
    const projection = d3
      .geoOrthographic()
      .scale(radius)
      .translate([containerWidth / 2, containerHeight / 2])
      .clipAngle(90);

    const path = d3.geoPath().projection(projection).context(context);

    const pointInPolygon = (point: [number, number], polygon: number[][]): boolean => {
      const [x, y] = point;
      let inside = false;

      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const [xi, yi] = polygon[i];
        const [xj, yj] = polygon[j];

        if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
          inside = !inside;
        }
      }

      return inside;
    };

    const pointInFeature = (point: [number, number], feature: any): boolean => {
      const geometry = feature.geometry;

      if (geometry.type === "Polygon") {
        const coordinates = geometry.coordinates;
        if (!pointInPolygon(point, coordinates[0])) {
          return false;
        }
        for (let i = 1; i < coordinates.length; i++) {
          if (pointInPolygon(point, coordinates[i])) {
            return false;
          }
        }
        return true;
      } else if (geometry.type === "MultiPolygon") {
        for (const polygon of geometry.coordinates) {
          if (pointInPolygon(point, polygon[0])) {
            let inHole = false;
            for (let i = 1; i < polygon.length; i++) {
              if (pointInPolygon(point, polygon[i])) {
                inHole = true;
                break;
              }
            }
            if (!inHole) {
              return true;
            }
          }
        }
        return false;
      }

      return false;
    };

    const generateDotsInPolygon = (feature: any, spacing: number) => {
      const dots: [number, number][] = [];
      const bounds = d3.geoBounds(feature);
      const [[minLng, minLat], [maxLng, maxLat]] = bounds;

      const stepSize = spacing * 0.08;

      for (let lng = minLng; lng <= maxLng; lng += stepSize) {
        for (let lat = minLat; lat <= maxLat; lat += stepSize) {
          const point: [number, number] = [lng, lat];
          if (pointInFeature(point, feature)) {
            dots.push(point);
          }
        }
      }

      return dots;
    };

    interface DotData {
      lng: number;
      lat: number;
      visible: boolean;
    }

    const allDots: DotData[] = [];
    let landFeatures: any;

    // ── Optimized batched render ──────────────────────────────────
    const render = () => {
      // Clear canvas
      context.clearRect(0, 0, containerWidth, containerHeight);

      const currentScale = projection.scale();
      const scaleFactor = currentScale / radius;

      // Draw ocean (globe background) - NO border/stroke for cleaner look
      context.beginPath();
      context.arc(containerWidth / 2, containerHeight / 2, currentScale, 0, 2 * Math.PI);
      context.fillStyle = "rgba(0, 0, 0, 0.15)";
      context.fill();
      // Border removed — seamless globe appearance

      if (landFeatures) {
        // Draw graticule (longitude and latitude grid lines)
        const graticule = d3.geoGraticule();
        context.beginPath();
        path(graticule());
        context.strokeStyle = "#ffffff";
        context.lineWidth = 0.8 * scaleFactor;
        context.globalAlpha = 0.12;
        context.stroke();
        context.globalAlpha = 1;

        // Draw land outlines
        context.beginPath();
        landFeatures.features.forEach((feature: any) => {
          path(feature);
        });
        context.strokeStyle = "rgba(255, 255, 255, 0.4)";
        context.lineWidth = 0.8 * scaleFactor;
        context.stroke();

        // ── BATCHED halftone dots (single beginPath for ALL dots) ──
        const dotRadius = 1.0 * scaleFactor;
        context.fillStyle = "rgba(255, 255, 255, 0.45)";
        context.beginPath();
        for (let i = 0, len = allDots.length; i < len; i++) {
          const dot = allDots[i];
          const projected = projection([dot.lng, dot.lat]);
          if (
            projected &&
            projected[0] >= 0 &&
            projected[0] <= containerWidth &&
            projected[1] >= 0 &&
            projected[1] <= containerHeight
          ) {
            // Inline sub-path: moveTo + arc avoids closing/opening paths
            context.moveTo(projected[0] + dotRadius, projected[1]);
            context.arc(projected[0], projected[1], dotRadius, 0, 2 * Math.PI);
          }
        }
        context.fill();

        // Draw client glowing dots
        const invert = projection.invert;
        if (invert) {
          const center = invert([containerWidth / 2, containerHeight / 2]);
          if (center) {
            const [centerLng, centerLat] = center;
            const deg2rad = Math.PI / 180;
            const phi1 = centerLat * deg2rad;
            const lambda1 = centerLng * deg2rad;
            const now = Date.now();

            clientDots.forEach((dot) => {
              const phi2 = dot.lat * deg2rad;
              const lambda2 = dot.lng * deg2rad;
              const cosD = Math.sin(phi1) * Math.sin(phi2) + Math.cos(phi1) * Math.cos(phi2) * Math.cos(lambda2 - lambda1);

              // Only show the dots facing the user (on the visible hemisphere)
              // Using a threshold of 0.08 to prevent distortion/clutter at the extreme edges
              if (cosD > 0.08) {
                const projected = projection([dot.lng, dot.lat]);
                if (
                  projected &&
                  projected[0] >= 0 &&
                  projected[0] <= containerWidth &&
                  projected[1] >= 0 &&
                  projected[1] <= containerHeight
                ) {
                  const pulse = Math.abs(Math.sin(now * 0.0035 + dot.pulseOffset));
                  const glowRadius = (4.5 + pulse * 6.5) * scaleFactor;

                  // Pulsing outer glow (Cyan/emerald mix for cyberpunk/tech aesthetic)
                  context.beginPath();
                  context.arc(projected[0], projected[1], glowRadius, 0, 2 * Math.PI);
                  context.fillStyle = `rgba(6, 182, 212, ${0.15 + (1 - pulse) * 0.25})`;
                  context.fill();

                  // Solid middle ring
                  context.beginPath();
                  context.arc(projected[0], projected[1], 3.0 * scaleFactor, 0, 2 * Math.PI);
                  context.strokeStyle = "rgba(6, 182, 212, 0.95)";
                  context.lineWidth = 1.0 * scaleFactor;
                  context.stroke();

                  // Central bright white dot
                  context.beginPath();
                  context.arc(projected[0], projected[1], 1.5 * scaleFactor, 0, 2 * Math.PI);
                  context.fillStyle = "#ffffff";
                  context.fill();
                }
              }
            });
          }
        }
      }
    };

    const loadWorldData = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json"
        );
        if (!response.ok) throw new Error("Failed to load land data");

        landFeatures = await response.json();

        // Generate dots for all land features (device-appropriate spacing)
        landFeatures.features.forEach((feature: any) => {
          const dots = generateDotsInPolygon(feature, dotSpacing);
          dots.forEach(([lng, lat]) => {
            allDots.push({ lng, lat, visible: true });
          });
        });

        render();
      } catch (err) {
        setError("Failed to load land map data");
      }
    };

    // Set up rotation and interaction
    const rotation = [0, 0];
    let autoRotate = true;
    const rotationSpeed = 0.45;

    // ── Frame-throttled rotation (cap at ~30fps for rotation, saves CPU) ──
    let lastFrameTime = 0;
    const targetFrameInterval = isMobile ? 50 : 33; // ~20fps mobile, ~30fps desktop

    const rotate = (timestamp: number) => {
      if (timestamp - lastFrameTime >= targetFrameInterval) {
        if (autoRotate) {
          rotation[0] += rotationSpeed;
          projection.rotate(rotation as [number, number, number]);
        }
        render();
        lastFrameTime = timestamp;
      }
    };

    // Auto-rotation timer
    const rotationTimer = d3.timer(rotate);

    const handleMouseDown = (event: MouseEvent) => {
      autoRotate = false;
      const startX = event.clientX;
      const startY = event.clientY;
      const startRotation = [...rotation];

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const sensitivity = 0.4;
        const dx = moveEvent.clientX - startX;
        const dy = moveEvent.clientY - startY;

        rotation[0] = startRotation[0] + dx * sensitivity;
        rotation[1] = startRotation[1] - dy * sensitivity;
        rotation[1] = Math.max(-90, Math.min(90, rotation[1]));

        projection.rotate(rotation as [number, number, number]);
        render();
      };

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);

        setTimeout(() => {
          autoRotate = true;
        }, 10);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };

    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length !== 1) return;
      autoRotate = false;
      const touch = event.touches[0];
      const startX = touch.clientX;
      const startY = touch.clientY;
      const startRotation = [...rotation];

      const handleTouchMove = (moveEvent: TouchEvent) => {
        if (moveEvent.touches.length !== 1) return;
        const touch = moveEvent.touches[0];
        const sensitivity = 0.4;
        const dx = touch.clientX - startX;
        const dy = touch.clientY - startY;

        // If swipe is primarily horizontal, rotate the globe and prevent default scrolling.
        // If primarily vertical, allow normal page scrolling.
        if (Math.abs(dx) > Math.abs(dy)) {
          moveEvent.preventDefault();
        }

        rotation[0] = startRotation[0] + dx * sensitivity;
        rotation[1] = startRotation[1] - dy * sensitivity;
        rotation[1] = Math.max(-90, Math.min(90, rotation[1]));

        projection.rotate(rotation as [number, number, number]);
        render();
      };

      const handleTouchEnd = () => {
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleTouchEnd);

        setTimeout(() => {
          autoRotate = true;
        }, 10);
      };

      document.addEventListener("touchmove", handleTouchMove, { passive: false });
      document.addEventListener("touchend", handleTouchEnd);
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("touchstart", handleTouchStart, { passive: true });

    // Load the world data
    loadWorldData();

    // Cleanup
    return () => {
      rotationTimer.stop();
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("touchstart", handleTouchStart);
    };
  }, [width, height]);

  if (error) {
    return null; // Return nothing on error to keep the background clean
  }

  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        style={{ maxWidth: "100%", height: "auto" }}
        role="img"
        aria-label="Interactive 3D globe visualization highlighting active client locations and international project hubs across the United States, Europe, Asia, and the Middle East."
      />

      {/* Visually hidden screen-reader and crawler text for SEO indexing */}
      <div className="sr-only">
        <h3>Global Client Base & Interactive 3D Project Map</h3>
        <p>
          Interactive 3D visualization showcasing software engineering projects and clients located across 
          North America (including San Francisco, New York, Seattle, Austin, Chicago, Los Angeles, Boston, Miami, Toronto, Vancouver), 
          Europe (London, Paris, Berlin, Amsterdam, Dublin), Asia-Pacific (Bangalore, Singapore, Tokyo, Sydney, Seoul, Taipei), 
          and the Middle East (Dubai, Riyadh).
        </p>
      </div>
    </div>
  );
}
