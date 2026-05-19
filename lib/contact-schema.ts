// lib/contact-schema.ts
import { z } from "zod";

/**
 * Shared validation for the contact form. Used on both the client (for inline
 * feedback) and the server (as the source of truth). The server NEVER trusts
 * the client — every field is re-validated in the Route Handler.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Please enter your name.")
    .max(120, "Name is too long."),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .max(254, "Email is too long."),
  message: z
    .string()
    .trim()
    .min(1, "Please enter a message.")
    .max(5000, "Message is too long."),
  // Hidden honeypot field — humans leave it blank, bots fill it.
  website: z
    .string()
    .max(0, "Spam detected.")
    .optional()
    .default(""),
  // Client-supplied timestamp of when the form mounted. Server rejects
  // submissions that arrive too quickly to be a real human interaction.
  mountedAt: z.number().int().nonnegative(),
});

export type ContactInput = z.infer<typeof contactSchema>;
