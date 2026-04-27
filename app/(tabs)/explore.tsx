import { Link, useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { curriculum } from '@/data/curriculum';
import { useLearningProgress } from '@/hooks/use-learning-progress';

export default function ProgressScreen() {
  const { progress, completedSet, resetProgress, isLoading, loadProgress } = useLearningProgress();
  const totalLessons = curriculum.lessons.length;

  useFocusEffect(
    useCallback(() => {
      void loadProgress();
    }, [loadProgress])
  );

  const handleReset = () => {
    Alert.alert('Reset progress?', 'This will mark all lessons as not completed.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Reset',
        style: 'destructive',
        onPress: async () => {
          await resetProgress();
        },
      },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedText type="title">Progress</ThemedText>
      <ThemedText style={styles.subtitle}>
        {isLoading
          ? 'Loading progress...'
          : `${progress.completedLessonIds.length} of ${totalLessons} lessons completed`}
      </ThemedText>

      <Pressable style={styles.resetCard} onPress={handleReset}>
        <ThemedText type="defaultSemiBold">Reset Progress</ThemedText>
        <ThemedText>This clears saved completion data on this iPad.</ThemedText>
      </Pressable>

      {curriculum.lessons.map((lesson) => {
        const complete = completedSet.has(lesson.id);
        return (
          <Link
            key={lesson.id}
            href={{ pathname: '/lesson/[lessonId]', params: { lessonId: lesson.id } }}
            asChild>
            <Pressable style={styles.lessonCard}>
              <ThemedText type="defaultSemiBold">{lesson.title}</ThemedText>
              <ThemedText style={styles.lessonSubtitle}>{lesson.subtitle}</ThemedText>
              <ThemedText style={[styles.status, complete ? styles.complete : styles.notComplete]}>
                {complete ? 'Completed' : 'Not completed yet'}
              </ThemedText>
            </Pressable>
          </Link>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 18,
    gap: 14,
  },
  subtitle: {
    opacity: 0.8,
  },
  resetCard: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f59f80',
    padding: 12,
    gap: 6,
  },
  lessonCard: {
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#d2d2d2',
    gap: 6,
  },
  lessonSubtitle: {
    opacity: 0.75,
  },
  status: {
    fontWeight: '700',
  },
  complete: {
    color: '#2A9D8F',
  },
  notComplete: {
    color: '#E76F51',
  },
});
