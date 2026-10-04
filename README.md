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

## Що реалізовано

**Завдання 1 — `InputField`**
- `label` напівжирним над полем; стан `isFocused` через `onFocus`/`onBlur` (зовнішні обробники теж викликаються — це потрібно для `onBlur` з Controller).
- Фокус → синя рамка товщиною 2; помилка → червона рамка + червоний текст під полем.
- Кнопка `✕` (`Pressable`) праворуч усередині поля, якщо `value` не порожній і передано `onClear`.
- Усі інші пропси (`placeholder`, `keyboardType`, `secureTextEntry`, `multiline`, …) прокидаються через `...rest`.

**Завдання 2 — `FeedbackScreen`**
- `useForm` із `zodResolver(feedbackSchema)`, `defaultValues`, `mode: 'onSubmit'`, `reValidateMode: 'onChange'`.
- Усі 5 полів — лише через `<Controller>`; рейтинг (`onChange(star)`), `Switch` (`value` / `onValueChange={onChange}`).
- `KeyboardAvoidingView` (`padding` на iOS / `height` на Android) + `ScrollView keyboardShouldPersistTaps="handled"`.
- Email: `keyboardType="email-address"`, `autoCapitalize="none"`, `autoCorrect={false}`; коментар: `multiline`, `numberOfLines={4}`, `textAlignVertical="top"` + лічильник символів.
- `onSubmit` → `Alert.alert` з даними, кнопка «Чудово» викликає `reset()`.
- Усі кнопки мають стан `pressed` через масив стилів.

## Відхилення від методички (і чому)

- **Zod 4** (актуальна версія, яку ставить `npx expo install`) не підтримує `required_error` — замість нього використано параметр `error`. Повідомлення ті самі.
- Через `isAnonymous: z.boolean().default(false)` вхідний і вихідний типи схеми відрізняються, тому форма типізована як
  `useForm<FeedbackFormInput, unknown, FeedbackFormData>` (`z.input` / `z.infer`) — інакше `tsc` у strict-режимі видає помилку на `resolver`.
- До email додано `.min(1, 'Вкажіть ваш email')`, щоб порожнє поле показувало «Вкажіть ваш email», а не «некоректна адреса».
- У React Native Web `Alert.alert` нічого не показує, тому на web використовується `window.alert` (після нього форма так само очищується).
- Додатково: перехід між полями по кнопці «Далі» на клавіатурі (`setFocus` з RHF), лічильник символів у коментарі.

## Перевірка

- `npx tsc --noEmit` — без помилок; `npx expo-doctor` — 21/21; `npx expo export --platform web` — збирається.
- Сценарії: порожня форма → помилки під іменем, email і коментарем; невалідний email; короткий відгук; після виправлення помилки зникають одразу (`reValidateMode: 'onChange'`); кнопка ✕ очищує поле; `Switch` змінює ім'я на «Анонім» в Alert; після «Чудово» форма скидається.
