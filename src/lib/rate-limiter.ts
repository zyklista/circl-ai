interface RateLimit {
  count: number;
  resetTime: number;
}

class RateLimiter {
  private attempts: Map<string, RateLimit> = new Map();

  isRateLimited(identifier: string, maxAttempts: number = 5, windowMs: number = 15 * 60 * 1000): boolean {
    const now = Date.now();
    const key = identifier;
    const current = this.attempts.get(key);

    if (!current || now > current.resetTime) {
      this.attempts.set(key, {
        count: 1,
        resetTime: now + windowMs
      });
      return false;
    }

    if (current.count >= maxAttempts) {
      return true;
    }

    current.count++;
    return false;
  }

  getRemainingTime(identifier: string): number {
    const current = this.attempts.get(identifier);
    if (!current) return 0;
    
    const now = Date.now();
    return Math.max(0, current.resetTime - now);
  }

  reset(identifier: string): void {
    this.attempts.delete(identifier);
  }
}

export const rateLimiter = new RateLimiter();