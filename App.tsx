import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import FeedbackScreen from './src/screens/FeedbackScreen';
import { SimpleFormExample } from './src/screens/SimpleFormExample';

type Tab = 'input' | 'feedback';

const TABS: { key: Tab; label: string }[] = [
  { key: 'input', label: 'Завдання 1' },
  { key: 'feedback', label: 'Завдання 2' },
];

export default function App() {
  const [tab, setTab] = useState<Tab>('feedback');

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safe}>
        <StatusBar style="dark" />

        <View style={styles.tabs}>
          {TABS.map(({ key, label }) => (
            <Pressable
              key={key}
              onPress={() => setTab(key)}
              accessibilityRole="tab"
              accessibilityState={{ selected: tab === key }}
              style={({ pressed }) => [
                styles.tab,
                tab === key && styles.tabActive,
                pressed && styles.tabPressed,
              ]}
            >
              <Text style={[styles.tabText, tab === key && styles.tabTextActive]}>{label}</Text>
            </Pressable>
          ))}
        </View>

        {tab === 'input' ? <SimpleFormExample /> : <FeedbackScreen />}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  tabs: {
    flexDirection: 'row',
    margin: 16,
    marginBottom: 0,
    padding: 4,
    borderRadius: 12,
    backgroundColor: '#E5E7EB',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 9,
  },
  tabActive: {
    backgroundColor: '#FFFFFF',
  },
  tabPressed: {
    opacity: 0.7,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  tabTextActive: {
    color: '#111827',
  },
});
