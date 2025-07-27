import { z } from 'zod';

export const authSchema = z.object({
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  displayName: z.string().min(2, 'Display name must be at least 2 characters').optional(),
});

export const postSchema = z.object({
  title: z.string()
    .min(1, 'Title is required')
    .max(200, 'Title too long')
    .regex(/^[a-zA-Z0-9\s\-.,!?()]+$/, 'Title contains invalid characters'),
  description: z.string()
    .min(1, 'Description is required')
    .max(5000, 'Description too long'),
  category: z.string().min(1, 'Category is required'),
  price: z.number().positive('Price must be positive').max(1000000, 'Price too high').optional(),
  location: z.string().max(200, 'Location too long').optional(),
  post_type: z.enum(['marketplace', 'help', 'business']),
});

export const profileSchema = z.object({
  display_name: z.string().min(1, 'Display name is required').max(100, 'Name too long'),
  bio: z.string().max(500, 'Bio too long').optional(),
  location: z.string().max(200, 'Location too long').optional(),
  avatar_url: z.string().url('Invalid URL').optional(),
});

export const messageSchema = z.object({
  content: z.string()
    .min(1, 'Message cannot be empty')
    .max(2000, 'Message too long')
    .refine(content => content.trim().length > 0, 'Message cannot be only whitespace'),
  message_type: z.enum(['text', 'image', 'file']).default('text'),
});

// Add file upload validation
export const fileUploadSchema = z.object({
  file: z.instanceof(File)
    .refine(file => file.size <= 10 * 1024 * 1024, 'File size must be less than 10MB')
    .refine(file => ['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(file.type), 'Only image files are allowed'),
});

// Add rate limiting schema
export const rateLimitSchema = z.object({
  action: z.string(),
  identifier: z.string(),
  maxAttempts: z.number().default(5),
  windowMs: z.number().default(15 * 60 * 1000), // 15 minutes
});

export type AuthInput = z.infer<typeof authSchema>;
export type PostInput = z.infer<typeof postSchema>;
export type ProfileInput = z.infer<typeof profileSchema>;
export type MessageInput = z.infer<typeof messageSchema>;
export type FileUploadInput = z.infer<typeof fileUploadSchema>;
export type RateLimitInput = z.infer<typeof rateLimitSchema>;