import { z } from 'zod';

export const authSchema = z.object({
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  displayName: z.string().min(2, 'Display name must be at least 2 characters').optional(),
});

export const postSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  description: z.string().min(1, 'Description is required').max(5000, 'Description too long'),
  category: z.string().min(1, 'Category is required'),
  price: z.number().positive('Price must be positive').optional(),
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
  content: z.string().min(1, 'Message cannot be empty').max(2000, 'Message too long'),
  message_type: z.enum(['text', 'image', 'file']).default('text'),
});

export type AuthInput = z.infer<typeof authSchema>;
export type PostInput = z.infer<typeof postSchema>;
export type ProfileInput = z.infer<typeof profileSchema>;
export type MessageInput = z.infer<typeof messageSchema>;