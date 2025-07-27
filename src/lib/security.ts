import DOMPurify from 'dompurify';

// Content Security Policy configuration
export const cspConfig = {
  'default-src': ["'self'"],
  'script-src': ["'self'", "'unsafe-inline'", 'https://js.stripe.com'],
  'style-src': ["'self'", "'unsafe-inline'"],
  'img-src': ["'self'", 'data:', 'https:'],
  'font-src': ["'self'", 'https:'],
  'connect-src': ["'self'", 'https://*.supabase.co', 'https://api.stripe.com'],
};

// Sanitize HTML content to prevent XSS
export function sanitizeHtml(content: string): string {
  return DOMPurify.sanitize(content, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'ol', 'ul', 'li', 'a'],
    ALLOWED_ATTR: ['href', 'target'],
  });
}

// Sanitize text content (strip all HTML)
export function sanitizeText(content: string): string {
  return DOMPurify.sanitize(content, { ALLOWED_TAGS: [] });
}

// Validate file uploads
export function validateFile(file: File): { valid: boolean; error?: string } {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'application/pdf',
    'text/plain',
  ];

  if (file.size > maxSize) {
    return { valid: false, error: 'File size exceeds 10MB limit' };
  }

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'File type not allowed' };
  }

  return { valid: true };
}

// Rate limiting for client-side operations
class RateLimiter {
  private attempts: Map<string, number[]> = new Map();
  private readonly maxAttempts: number;
  private readonly windowMs: number;

  constructor(maxAttempts: number = 5, windowMs: number = 15 * 60 * 1000) {
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
  }

  canProceed(key: string): boolean {
    const now = Date.now();
    const attempts = this.attempts.get(key) || [];
    
    // Remove old attempts
    const validAttempts = attempts.filter(time => now - time < this.windowMs);
    
    if (validAttempts.length >= this.maxAttempts) {
      return false;
    }

    validAttempts.push(now);
    this.attempts.set(key, validAttempts);
    return true;
  }
}

export const authRateLimiter = new RateLimiter(5, 15 * 60 * 1000); // 5 attempts per 15 minutes
export const apiRateLimiter = new RateLimiter(60, 60 * 1000); // 60 requests per minute