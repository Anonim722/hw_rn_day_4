import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

import { InputField } from '../components/InputField';

/** Завдання 1: демонстрація InputField з локальною валідацією. */
export function SimpleFormExample() {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>InputField</Text>
      <Text style={styles.subtitle}>Фокус, помилка, кнопка очищення та пропси клавіатури</Text>

      <InputField
        label="Повне ім'я"
        placeholder="Олександр Коваленко"
        value={name}
        onChangeText={(text) => {
          setName(text);
          if (text.length > 0 && text.length < 3) {
            setError('Ім’я має містити щонайменше 3 символи');
          } else {
            setError('');
          }
        }}
        onClear={() => {
          setName('');
          setError('');
        }}
        error={error}
        autoCapitalize="words"
        returnKeyType="done"
      />

      <InputField
        label="Пароль"
        placeholder="Щонайменше 8 символів"
        value={password}
        onChangeText={setPassword}
        onClear={() => setPassword('')}
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
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
});
