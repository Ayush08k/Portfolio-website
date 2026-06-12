export interface BlogPost {
  title: string;
  slug: string;
  category: "Frontend" | "Backend" | "Mobile" | "SEO" | "DevOps";
  date: string;
  readTime: string;
  description: string;
  content: string; // Markdown or rich HTML content
  tags: string[];
  image: string;
  seoTags?: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    title: "Tuning Next.js Server Components for < 1s Load Times",
    slug: "tuning-nextjs-server-components",
    category: "Frontend",
    date: "June 08, 2026",
    readTime: "6 min read",
    description: "Learn how to audit Next.js Server Components, resolve rendering waterfalls, optimize bundle sizes, and tune Core Web Vitals to achieve sub-second load times.",
    tags: ["Next.js", "React 19", "Web Vitals", "Performance"],
    image: "/project images/ecommerce_banner.png", // or a placeholder or generate_image
    content: `
# Tuning Next.js Server Components for < 1s Load Times

In modern web development, speed is directly tied to conversions. A page load delay of just 1 second can decrease customer satisfaction by 16% and reduce conversions by 7%. In Next.js, **React Server Components (RSC)** provide a powerful model to deliver fast, query-optimized experiences by offloading rendering overhead to the server.

However, if not architected correctly, server components can quickly fall victim to performance bottlenecks, blocking databases, and layout waterfalls.

Here is a master blueprint to audit and tune your Next.js App Router projects for sub-second visual loading.

---

## 1. Eliminate the "Data Waterfall"
The most common RSC anti-pattern is sequential data fetching. When you await multiple database calls sequentially, you accumulate network overhead:

\`\`\`typescript
// ❌ SEQUENTIAL WATERFALL (Slow)
const user = await db.getUser(userId);
const projects = await db.getProjects(user.id);
const invoices = await db.getInvoices(user.id);
\`\`\`

Instead, resolve non-dependent queries concurrently using \`Promise.all\`:

\`\`\`typescript
//  PARALLEL FETCHING (Fast)
const [user, projects, invoices] = await Promise.all([
  db.getUser(userId),
  db.getProjects(userId),
  db.getInvoices(userId)
]);
\`\`\`

---

## 2. Leverage Streaming with Suspense
If a specific section of the page takes longer to fetch (e.g. recommendations engine or analytics dashboard), do not let it block the entire page load. Wrap the component in a React \`Suspense\` boundary:

\`\`\`typescript
import { Suspense } from 'react';
import { SlowComponent, Skeleton } from './components';

export default function Page() {
  return (
    <main>
      <h1>My Workspace Dashboard</h1>
      
      {/* Dynamic, fast loading items */}
      <UserProfile />

      {/* Slow loading item streamed in asynchronously */}
      <Suspense fallback={<Skeleton />}>
        <SlowComponent />
      </Suspense>
    </main>
  );
}
\`\`\`

By splitting rendering scopes, Next.js can stream the static elements immediately while the slow server calculations load in the background.

---

## 3. Cache Data using unstable_cache
Database lookups that do not change on every single request should be cached at the Next.js server layer. Next.js provides \`unstable_cache\` to cache arbitrary data fetches:

\`\`\`typescript
import { unstable_cache } from 'next/cache';

export const getCachedProjects = unstable_cache(
  async (userId) => {
    return db.projects.findMany({ where: { userId } });
  },
  ['user-projects-cache-key'],
  { revalidate: 3600, tags: ['projects'] }
);
\`\`\`

This ensures that subsequent database accesses respond in **< 10ms**, serving records straight from memory.

---

## Summary
By combining parallel fetches, React Suspense boundaries, and caching policies, your Next.js pages will load instantaneously, providing a premium experience that ranks #1 on search engines.
    `
  },
  {
    title: "How to Optimize NestJS MongoDB Queries with Composite Indexes",
    slug: "optimize-nestjs-mongodb-queries",
    category: "Backend",
    date: "June 05, 2026",
    readTime: "8 min read",
    description: "A deep dive into NestJS composite indexing, query execution plans, and MongoDB index optimizations to reduce lookup latency by 90%.",
    tags: ["NestJS", "MongoDB", "Database", "Node.js"],
    image: "/project images/attendance_banner.png",
    content: `
# How to Optimize NestJS MongoDB Queries with Composite Indexes

As your database grows from thousands of documents to millions, queries that once resolved in milliseconds start to lag, hog CPU threads, and block request pipelines. If you use MongoDB with **NestJS** and **Mongoose**, building intelligent indexes is the single most impactful action you can take to keep operations scalable.

Let's dissect how MongoDB indexes work under the hood and how to implement composite indexing in NestJS.

---

## 1. What is a Composite Index?
A single field index (e.g., indexing just the \`email\` field) works well when you only filter by email. However, if your query filters by multiple fields—for example, looking up a student's attendance history for a specific course:

\`\`\`typescript
// Query filters on both courseId AND studentId
this.attendanceModel.find({ courseId, studentId }).sort({ date: -1 });
\`\`\`

A single-field index on \`courseId\` alone is insufficient. MongoDB must first locate all documents for that course, then scan through them to filter by student roll number, and finally sort them in memory.

A **Composite Index** indexes multiple fields together in a structured tree layout.

---

## 2. Implementing in NestJS Mongoose
In a NestJS application, composite indexes are defined directly in the Mongoose schema decorator. Here is how you configure a compound index on \`courseId\`, \`studentId\`, and \`date\`:

\`\`\`typescript
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Attendance extends Document {
  @Prop({ type: Types.ObjectId, required: true })
  courseId: Types.ObjectId;

  @Prop({ type: String, required: true })
  studentId: string;

  @Prop({ type: Date, required: true })
  date: Date;

  @Prop({ type: String, enum: ['Present', 'Absent'], required: true })
  status: string;
}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);

// Define the compound index (1 for ascending, -1 for descending)
AttendanceSchema.index({ courseId: 1, studentId: 1, date: -1 });
\`\`\`

---

## 3. The ESR Rule (Equality, Sort, Range)
When structuring composite indexes, always order the fields according to the **ESR Rule**:
1. **Equality**: Place fields you match on exact values first (e.g., \`courseId: 1\`).
2. **Sort**: Place fields you use to order results second (e.g., \`date: -1\`).
3. **Range**: Place fields that require range checks ($gt, $lt, $in) last.

Following this rule guarantees that MongoDB traverses the indexes sequentially without having to perform an expensive memory sorting operation.

Verify query efficiency in your logs using \`explain('executionStats')\` to ensure the database performs an **IXSCAN** instead of a **COLLSCAN**.
    `
  },
  {
    title: "A Master Guide to Offline Syncing in React Native & Expo",
    slug: "offline-syncing-react-native-expo",
    category: "Mobile",
    date: "June 02, 2026",
    readTime: "10 min read",
    description: "Step-by-step architectural pattern for implementing offline transaction queues, SQLite persistent storage, and auto-sync worker logic in Expo SDK 54.",
    tags: ["React Native", "Expo", "SQLite", "Offline First"],
    image: "/project images/music_banner.png",
    content: `
# A Master Guide to Offline Syncing in React Native & Expo

Building a mobile application that crashes or locks up when a user loses cellular connectivity is a recipe for high uninstalls. A premium mobile experience must be **offline-first**—storing actions locally and synchronizing them to the cloud once connectivity is restored.

Here is a step-by-step guide to implement a reliable, queue-based sync architecture using React Native, Expo, and SQLite.

---

## 1. The Offline Architecture Pattern
To support offline operations, our app does not send requests directly to our API. Instead, all data modifications go through a **Local Queue Manager**:

\`\`\`
[User Action] ──> [Save to Local SQLite/Sync Queue] ──> [Update UI State]
                                                            │
                                                     [NetInfo listens]
                                                            │
                                                            ▼
                                              (Is Network Connected?)
                                                /                 \\
                                              YES                  NO
                                              /                     \\
                                 [Process Queue & Push]        [Wait in Queue]
\`\`\`

---

## 2. Setting up the SQLite Queue Table
We can use \`expo-sqlite\` to keep a queue of synchronization operations. When offline, we write the request method, payload, and API endpoint to this table.

\`\`\`typescript
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('sync_queue.db');

export function initDatabase() {
  db.execSync(\`
    CREATE TABLE IF NOT EXISTS pending_syncs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      endpoint TEXT NOT NULL,
      method TEXT NOT NULL,
      payload TEXT NOT NULL,
      createdAt TEXT NOT NULL
    );
  \`);
}
\`\`\`

---

## 3. Writing to Queue & Processing
When a user marks a checklist or submits a form, we verify connection status. If offline, we save the payload:

\`\`\`typescript
export function queueSyncRequest(endpoint: string, method: string, payload: any) {
  db.runSync(
    'INSERT INTO pending_syncs (endpoint, method, payload, createdAt) VALUES (?, ?, ?, ?)',
    [endpoint, method, JSON.stringify(payload), new Date().toISOString()]
  );
}
\`\`\`

When network connection is restored (detected via \`@react-native-community/netinfo\`), we process the queue sequentially:

\`\`\`typescript
export async function processSyncQueue() {
  const pending = db.getAllSyncs('SELECT * FROM pending_syncs ORDER BY id ASC');
  
  for (const item of pending) {
    try {
      const response = await fetch(\`https://api.myplatform.com\${item.endpoint}\`, {
        method: item.method,
        headers: { 'Content-Type': 'application/json' },
        body: item.payload
      });

      if (response.ok) {
        // Remove from local database queue upon successful post
        db.runSync('DELETE FROM pending_syncs WHERE id = ?', [item.id]);
      }
    } catch (error) {
      console.error('Sync failed for item:', item.id, error);
      break; // Stop and retry later if network fails again
    }
  }
}
\`\`\`

By queueing changes, the user experiences zero lag or modal blockages, and their data remains completely safe.
    `
  },
  {
    title: "Crafting Immersive 3D E-Commerce Experiences: The Starbucks 3D Case Study",
    slug: "starbucks-3d-experience",
    category: "Frontend",
    date: "June 12, 2026",
    readTime: "7 min read",
    description: "Learn how we built the Starbucks 3D cup customizer using React Three Fiber, optimized the Draco GLTF asset pipelines to save 94% file size, and engineered low-end device performance fallbacks.",
    tags: ["Three.js", "React Three Fiber", "WebGL", "Optimization", "GSAP"],
    image: "/project images/starbucks.png",
    content: `
# Crafting Immersive 3D E-Commerce Experiences: The Starbucks 3D Case Study

In the highly competitive world of e-commerce, user engagement directly impacts sales metrics. Static images and simple product descriptions are no longer sufficient to captivate modern buyers. Immersive 3D experiences, allowing users to interact with, rotate, and customize products in real-time, can increase conversion rates by up to **40%** and dwell times by over **150%**.

*Note: This project was built when I was learning how to make 3D websites, serving as a comprehensive study of WebGL, shaders, Blender model imports, and 3D coordinate space on the web.*

Recently, I built a 3D landing page and configuration prototype for Starbucks. In this post, I will break down the design, architecture, and optimizations required to run a high-performance 3D canvas smoothly on low-end mobile devices, highlighting the biggest performance challenge we faced and the features we built.

---

## 1. Setting up the 3D Scene in React Three Fiber

Instead of using pure Three.js, which requires a large amount of boilerplate code for rendering loops, resize handlers, and object disposals, I opted for **React Three Fiber (R3F)** and **@react-three/drei**:

\`\`\`tsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import { StarbucksCup } from './StarbucksCup';

export default function App() {
  return (
    <div className="canvas-container" style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
        
        <Stage environment="city" intensity={0.6}>
          <StarbucksCup />
        </Stage>
        
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
\`\`\`

---

## 2. The Big Challenge: Mobile Performance Optimization

A major roadblock with WebGL/3D on the web is performance. Initial builds suffered from low frame rates (~15 FPS) on mobile browsers due to the 15MB GLTF cup model, complex shaders, and high-DPR rendering loops.

Here is the step-by-step strategy I implemented to overcome these limitations:

### A. Draco Mesh Compression
I used the Google Draco compression algorithm via the \`gltf-pipeline\` command-line tool. This compressed the model's geometry coordinates, reducing the asset file size from **15MB to 850KB** (a 94% saving) without visible loss of detail:

\`\`\`bash
npx gltf-pipeline -i cup.gltf -o cup-compressed.gltf -d
\`\`\`

### B. Adaptive Performance Pipeline
High-end desktop monitors rendering at a high device pixel ratio (DPR > 2) are powered by dedicated GPUs. But a mobile device doing the same will choke. R3F provides performance adjustment states. I created an adaptive viewport controller that throttles styling rules based on active frame rates:

\`\`\`tsx
import { PerformanceMonitor } from '@react-three/drei';
import { useState } from 'react';

export function Scene() {
  const [dpr, setDpr] = useState(1.5);
  
  return (
    <Canvas dpr={dpr}>
      <PerformanceMonitor 
        onDecline={() => setDpr(1)} 
        onIncline={() => setDpr(Math.min(window.devicePixelRatio, 2))}
      >
        <StarbucksCup />
      </PerformanceMonitor>
    </Canvas>
  );
}
\`\`\`

### C. Shadow and Texture Optimization
Instead of casting dynamic real-time shadow maps every frame, I baked ambient occlusion shadows directly into the textures using Blender. I then loaded compressed 1K WebP textures instead of raw 4K PNG files, reducing GPU VRAM allocation by 75%.

---

## Conclusion
Building interactive 3D web experiences requires balancing high-fidelity visuals with aggressive performance optimization. By compressing assets, scaling pixel ratios dynamically, and baking shadows, we created a premium 3D product customizer that loads in under 1.5 seconds and runs at a fluid 60 FPS across both desktop and mobile viewports.
    `,
    seoTags: [
      "Three.js tutorial portfolio",
      "React Three Fiber Starbucks E-Commerce",
      "Draco GLTF Asset Optimization",
      "Adaptive WebGL Performance Scaling",
      "Interactive 3D Product Customizer React",
      "How to build 3D websites",
      "3D mobile frame rate optimization",
      "VRAM web optimization",
      "GSAP camera interpolation Three.js",
      "Creative frontend developer Ayush Kumar",
      "Full stack developer portfolio 3D",
      "High conversion 3D e-commerce site",
      "WebGL shadow baking Blender",
      "React performance monitoring Canvas",
      "React Three Drei OrbitControls example",
      "Learning WebGL coordinates tutorial",
      "Next.js dynamic 3D loading",
      "Starbucks 3D design case study",
      "Threejs texture optimization WebP",
      "Vite React Three Fiber boilerplate"
    ]
  }
];
