```typescript
import type { SystemMetrics } from "./types"

export function calculateCpuUsage(): number {
  // In a real app, this would use system APIs
  return Math.random() * 100
}

export function calculateMemoryUsage(): number {
  if (typeof performance !== "undefined") {
    const memory = performance.memory
    if (memory) {
      return (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100
    }
  }
  return Math.random() * 100
}

export function calculateStorageUsage(): number {
  // In a real app, this would check actual storage usage
  return Math.random() * 100
}

export function getActiveUsers(): number {
  // In a real app, this would track actual active users
  return Math.floor(Math.random() * 100)
}

export function getRequestsPerMinute(): number {
  // In a real app, this would track actual request rates
  return Math.floor(Math.random() * 1000)
}

export function getErrorRate(): number {
  // In a real app, this would track actual error rates
  return Math.random() * 10
}

export function collectSystemMetrics(): SystemMetrics {
  return {
    cpu: calculateCpuUsage(),
    memory: calculateMemoryUsage(),
    storage: calculateStorageUsage(),
    activeUsers: getActiveUsers(),
    requestsPerMinute: getRequestsPerMinute(),
    errorRate: getErrorRate(),
    lastUpdated: new Date(),
  }
}
```