# React Native Day 4 — Форми, текстовий ввід та валідація (React Hook Form + Zod)

Expo SDK 57 · React Native 0.86 · TypeScript (strict) · react-hook-form 7 · zod 4 · @hookform/resolvers 5.

## Запуск

```bash
npm install
npx expo start        # Expo Go: відскануйте QR-код
npx expo start --web  # React Native Web preview
```

Угорі екрана є перемикач **Завдання 1 / Завдання 2**.

## Структура

```text
App.tsx                            SafeArea + перемикач між завданнями
src/
├── components/
│   ├── InputField.tsx             Завдання 1: label, фокус (#2563EB, borderWidth 2),
│   │                              помилка (#EF4444), кнопка ✕, ...rest TextInputProps
│   └── RatingSelector.tsx         5 зірок на Pressable (#F59E0B)
├── schemas/feedbackSchema.ts      Zod-схема, FeedbackFormData = z.infer<...>
└── screens/
    ├── SimpleFormExample.tsx      Завдання 1: приклад використання InputField
    └── FeedbackScreen.tsx         Завдання 2: KeyboardAvoidingView → ScrollView →
                                   5 × Controller + кнопка handleSubmit(onSubmit)
```

