import React, { Ref, useState } from 'react';
import {
  BlurEvent,
  FocusEvent,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

export interface InputFieldProps extends TextInputProps {
  label: string;
  error?: string;
  onClear?: () => void;
  /** React 19: ref передається як звичайний проп (потрібен для setFocus у RHF). */
  ref?: Ref<TextInput>;
}

const COLORS = {
  border: '#D1D5DB',
  focus: '#2563EB',
  error: '#EF4444',
  text: '#111827',
  label: '#374151',
  placeholder: '#9CA3AF',
  clearBg: '#E5E7EB',
  clearBgPressed: '#D1D5DB',
};

export function InputField({
  label,
  error,
  value,
  onChangeText,
  onClear,
  onFocus,
  onBlur,
  multiline,
  style,
  placeholderTextColor = COLORS.placeholder,
  ref,
  ...rest
}: InputFieldProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: FocusEvent) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: BlurEvent) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const showClear = Boolean(value) && Boolean(onClear);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View
        style={[
          styles.inputWrapper,
          multiline && styles.inputWrapperMultiline,
          isFocused && styles.inputWrapperFocused,
          // помилка має пріоритет над кольором фокусу
          Boolean(error) && styles.inputWrapperError,
        ]}
      >
        <TextInput
          ref={ref}
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          multiline={multiline}
          placeholderTextColor={placeholderTextColor}
          style={[styles.input, multiline && styles.inputMultiline, style]}
          {...rest}
        />

        {showClear && (
          <Pressable
            onPress={onClear}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel={`Очистити поле «${label}»`}
            style={({ pressed }) => [
              styles.clearButton,
              multiline && styles.clearButtonMultiline,
              pressed && styles.clearButtonPressed,
            ]}
          >
            <Text style={styles.clearIcon}>✕</Text>
          </Pressable>
        )}
      </View>

      {Boolean(error) && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.label,
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    // компенсуємо різницю товщини рамки, щоб текст не «стрибав» при фокусі
    paddingHorizontal: 13,
  },
  inputWrapperMultiline: {
    alignItems: 'flex-start',
  },
  inputWrapperFocused: {
    borderColor: COLORS.focus,
    borderWidth: 2,
    paddingHorizontal: 12,
  },
  inputWrapperError: {
    borderColor: COLORS.error,
  },
  input: {
    flex: 1,
    minHeight: 46,
    paddingVertical: 10,
    fontSize: 16,
    color: COLORS.text,
    ...Platform.select({ web: { outlineStyle: 'none' } as object, default: {} }),
  },
  inputMultiline: {
    minHeight: 110,
    textAlignVertical: 'top',
  },
  clearButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.clearBg,
  },
  clearButtonMultiline: {
    marginTop: 10,
  },
  clearButtonPressed: {
    backgroundColor: COLORS.clearBgPressed,
    transform: [{ scale: 0.9 }],
  },
  clearIcon: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4B5563',
  },
  errorText: {
    marginTop: 4,
    fontSize: 13,
    color: COLORS.error,
  },
});
