import { z } from 'zod';

// Zod 4: параметр `required_error` замінено на `error`.
export const feedbackSchema = z.object({
  name: z
    .string({ error: "Ім'я обов'язкове" })
    .trim()
    .min(2, "Ім'я має містити щонайменше 2 символи")
    .max(50, "Ім'я не може перевищувати 50 символів"),
  email: z
    .string({ error: 'Вкажіть ваш email' })
    .trim()
    .min(1, 'Вкажіть ваш email')
    .email('Введіть коректну адресу електронної пошти'),
  rating: z
    .number({ error: 'Будь ласка, оберіть оцінку' })
    .min(1, 'Мінімальна оцінка — 1')
    .max(5, 'Максимальна оцінка — 5'),
  comment: z
    .string({ error: 'Напишіть текст відгуку' })
    .trim()
    .min(10, 'Відгук має містити щонайменше 10 символів')
    .max(300, 'Відгук занадто довгий (максимум 300 символів)'),
  isAnonymous: z.boolean().default(false),
});

/** Дані після валідації (isAnonymous завжди boolean). */
export type FeedbackFormData = z.infer<typeof feedbackSchema>;

/** Значення полів до валідації (через .default() isAnonymous тут опційний). */
export type FeedbackFormInput = z.input<typeof feedbackSchema>;

export const COMMENT_MAX_LENGTH = 300;
