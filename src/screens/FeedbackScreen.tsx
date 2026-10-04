import React from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { InputField } from '../components/InputField';
import { RatingSelector } from '../components/RatingSelector';
import {
  COMMENT_MAX_LENGTH,
  feedbackSchema,
  FeedbackFormData,
  FeedbackFormInput,
} from '../schemas/feedbackSchema';

const DEFAULT_VALUES: FeedbackFormData = {
  name: '',
  email: '',
  rating: 5,
  comment: '',
  isAnonymous: false,
};

export default function FeedbackScreen() {
  const {
    control,
    handleSubmit,
    reset,
    setFocus,
    formState: { isSubmitting },
  } = useForm<FeedbackFormInput, unknown, FeedbackFormData>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: DEFAULT_VALUES,
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const onSubmit = (data: FeedbackFormData) => {
    const title = 'Дякуємо за відгук!';
    const message =
      `Ім'я: ${data.isAnonymous ? 'Анонім' : data.name}\n` +
      `Email: ${data.email}\n` +
      `Оцінка: ${data.rating} ★\n` +
      `Коментар: ${data.comment}`;

    // У React Native Web Alert.alert — заглушка, тому використовуємо window.alert
    if (Platform.OS === 'web') {
      window.alert(`${title}\n\n${message}`);
      reset();
      return;
    }

    Alert.alert(title, message, [{ text: 'Чудово', onPress: () => reset() }]);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Залишити відгук</Text>
        <Text style={styles.subtitle}>Поділіться вашими враженнями від сервісу</Text>

        {/* 1. Поле імені */}
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => (
            <InputField
              ref={ref}
              label="Ваше ім'я"
              placeholder="Олександр Коваленко"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={error?.message}
              onClear={() => onChange('')}
              keyboardType="default"
              autoCapitalize="words"
              returnKeyType="next"
              submitBehavior="submit"
              onSubmitEditing={() => setFocus('email')}
            />
          )}
        />

        {/* 2. Поле Email */}
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => (
            <InputField
              ref={ref}
              label="Електронна пошта"
              placeholder="example@domain.com"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={error?.message}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="email"
              onClear={() => onChange('')}
              returnKeyType="next"
              submitBehavior="submit"
              onSubmitEditing={() => setFocus('comment')}
            />
          )}
        />

        {/* 3. Селектор рейтингу */}
        <Controller
          control={control}
          name="rating"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <RatingSelector
              label="Ваша оцінка"
              value={value}
              onChange={onChange}
              error={error?.message}
            />
          )}
        />

        {/* 4. Поле коментаря */}
        <Controller
          control={control}
          name="comment"
          render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => (
            <View>
              <InputField
                ref={ref}
                label="Текст відгуку"
                placeholder="Що вам сподобалося, а що варто покращити?"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={error?.message}
                onClear={() => onChange('')}
                keyboardType="default"
                multiline={true}
                numberOfLines={4}
                textAlignVertical="top"
              />
              <Text
                style={[
                  styles.counter,
                  value.length > COMMENT_MAX_LENGTH && styles.counterExceeded,
                ]}
              >
                {value.length}/{COMMENT_MAX_LENGTH}
              </Text>
            </View>
          )}
        />

        {/* 5. Перемикач анонімності */}
        <Controller
          control={control}
          name="isAnonymous"
          render={({ field: { onChange, value } }) => (
            <View style={styles.switchRow}>
              <View style={styles.switchTextBlock}>
                <Text style={styles.switchLabel}>Анонімний відгук</Text>
                <Text style={styles.switchHint}>Ваше ім'я не буде опубліковано</Text>
              </View>
              <Switch
                value={value ?? false}
                onValueChange={onChange}
                trackColor={{ false: '#D1D5DB', true: '#93C5FD' }}
                thumbColor={value ? '#2563EB' : '#F9FAFB'}
                accessibilityLabel="Анонімний відгук"
              />
            </View>
          )}
        />

        {/* 6. Кнопка відправки форми */}
        <Pressable
          style={({ pressed }) => [
            styles.submitButton,
            pressed && styles.buttonPressed,
            isSubmitting && styles.buttonDisabled,
          ]}
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          accessibilityRole="button"
        >
          <Text style={styles.submitButtonText}>Надіслати відгук</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#111827',
  },
  subtitle: {
    marginTop: 4,
    marginBottom: 24,
    fontSize: 15,
    color: '#6B7280',
  },
  counter: {
    marginTop: -12,
    marginBottom: 16,
    alignSelf: 'flex-end',
    fontSize: 12,
    color: '#9CA3AF',
  },
  counterExceeded: {
    color: '#EF4444',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    marginBottom: 24,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  switchTextBlock: {
    flex: 1,
    marginRight: 12,
  },
  switchLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  switchHint: {
    marginTop: 2,
    fontSize: 13,
    color: '#6B7280',
  },
  submitButton: {
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 12,
    backgroundColor: '#2563EB',
  },
  buttonPressed: {
    backgroundColor: '#1D4ED8',
    transform: [{ scale: 0.98 }],
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
