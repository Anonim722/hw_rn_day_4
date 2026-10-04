import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface RatingSelectorProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  error?: string;
  max?: number;
}

const ACTIVE = '#F59E0B';
const INACTIVE = '#D1D5DB';

export function RatingSelector({ label, value, onChange, error, max = 5 }: RatingSelectorProps) {
  const stars = Array.from({ length: max }, (_, i) => i + 1);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.row}>
        {stars.map((star) => {
          const isActive = star <= value;
          return (
            <Pressable
              key={star}
              onPress={() => onChange(star)}
              hitSlop={4}
              accessibilityRole="button"
              accessibilityLabel={`Оцінка ${star} з ${max}`}
              accessibilityState={{ selected: star === value }}
              style={({ pressed }) => [styles.star, pressed && styles.starPressed]}
            >
              <Text style={[styles.starIcon, { color: isActive ? ACTIVE : INACTIVE }]}>★</Text>
            </Pressable>
          );
        })}
        <Text style={styles.valueText}>
          {value} з {max}
        </Text>
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
    color: '#374151',
    marginBottom: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    paddingHorizontal: 4,
    borderRadius: 8,
  },
  starPressed: {
    transform: [{ scale: 0.85 }],
    opacity: 0.7,
  },
  starIcon: {
    fontSize: 36,
  },
  valueText: {
    marginLeft: 12,
    fontSize: 15,
    fontWeight: '600',
    color: '#6B7280',
  },
  errorText: {
    marginTop: 4,
    fontSize: 13,
    color: '#EF4444',
  },
});
