import { Link, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { ContinentsMap } from '@/components/interactive/continents-map';
import { getLessonById } from '@/data/curriculum';
import { useLearningProgress } from '@/hooks/use-learning-progress';
import type { HotspotLesson, McqLesson } from '@/types/curriculum';

function HotspotLessonView({ lesson, onComplete }: { lesson: HotspotLesson; onComplete: () => Promise<void> }) {
  const [selectedHotspotId, setSelectedHotspotId] = useState<string | undefined>();
  const [quizMode, setQuizMode] = useState(false);
  const [quizResult, setQuizResult] = useState<string>('');

  const selectedHotspot = useMemo(
    () => lesson.hotspots.find((hotspot) => hotspot.id === selectedHotspotId),
    [lesson.hotspots, selectedHotspotId]
  );

  const handleHotspotPress = async (hotspotId: string) => {
    setSelectedHotspotId(hotspotId);

    if (!quizMode) {
      return;
    }

    if (hotspotId === lesson.quiz.targetHotspotId) {
      setQuizResult('Correct! Great map skills. Lesson completed.');
      await onComplete();
      return;
    }

    setQuizResult('Not quite. Try again and tap the correct continent.');
  };

  return (
    <ThemedView style={styles.lessonCard}>
      <ThemedText type="subtitle">{lesson.title}</ThemedText>
      <ThemedText>{lesson.intro}</ThemedText>

      <View style={styles.mapWrap}>
        <ContinentsMap onHotspotPress={handleHotspotPress} activeHotspotId={selectedHotspotId} />
      </View>

      {!quizMode ? (
        <>
          <ThemedText type="defaultSemiBold">Tap a hotspot to read facts:</ThemedText>
          {selectedHotspot ? (
            <ThemedView style={styles.factCard}>
              <ThemedText type="defaultSemiBold">{selectedHotspot.label}</ThemedText>
              <ThemedText>Kid Fact: {selectedHotspot.factKid}</ThemedText>
              <ThemedText>Genius Fact: {selectedHotspot.factGenius}</ThemedText>
            </ThemedView>
          ) : (
            <ThemedText style={styles.placeholder}>No hotspot selected yet.</ThemedText>
          )}

          <Pressable style={styles.primaryButton} onPress={() => setQuizMode(true)}>
            <ThemedText style={styles.primaryButtonText}>Start Quiz</ThemedText>
          </Pressable>
        </>
      ) : (
        <>
          <ThemedText type="defaultSemiBold">Quiz: {lesson.quiz.prompt}</ThemedText>
          <ThemedText style={styles.placeholder}>Tap on the map to answer.</ThemedText>
          {!!quizResult && <ThemedText style={styles.result}>{quizResult}</ThemedText>}
        </>
      )}
    </ThemedView>
  );
}

function McqLessonView({ lesson, onComplete }: { lesson: McqLesson; onComplete: () => Promise<void> }) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [feedback, setFeedback] = useState<string>('');

  const question = lesson.questions[questionIndex];

  const handleAnswer = async (optionId: string) => {
    const isCorrect = optionId === question.correctOptionId;
    if (!isCorrect) {
      setFeedback('Not yet. Try again.');
      return;
    }

    const isLastQuestion = questionIndex === lesson.questions.length - 1;
    if (isLastQuestion) {
      await onComplete();
      setFeedback(`Correct! ${question.explanationKid} ${question.explanationGenius} Lesson completed.`);
      return;
    }

    setFeedback(`Correct! ${question.explanationKid}`);
    setQuestionIndex((prev) => prev + 1);
  };

  return (
    <ThemedView style={styles.lessonCard}>
      <ThemedText type="subtitle">{lesson.title}</ThemedText>
      <ThemedText>{lesson.intro}</ThemedText>

      <ThemedView style={styles.questionCard}>
        <ThemedText type="defaultSemiBold">
          Question {questionIndex + 1} of {lesson.questions.length}
        </ThemedText>
        <ThemedText>{question.prompt}</ThemedText>

        {question.options.map((option) => (
          <Pressable key={option.id} style={styles.optionButton} onPress={() => handleAnswer(option.id)}>
            <ThemedText>{option.text}</ThemedText>
          </Pressable>
        ))}

        {!!feedback && <ThemedText style={styles.result}>{feedback}</ThemedText>}
      </ThemedView>
    </ThemedView>
  );
}

export default function LessonScreen() {
  const { lessonId } = useLocalSearchParams<{ lessonId: string }>();
  const resolvedLessonId = Array.isArray(lessonId) ? lessonId[0] : lessonId;
  const lesson = resolvedLessonId ? getLessonById(resolvedLessonId) : undefined;
  const { completedSet, markLessonComplete } = useLearningProgress();

  if (!lesson) {
    return (
      <ThemedView style={styles.notFoundContainer}>
        <ThemedText type="title">Lesson Not Found</ThemedText>
        <Link href="/" asChild>
          <Pressable style={styles.primaryButton}>
            <ThemedText style={styles.primaryButtonText}>Back to Dashboard</ThemedText>
          </Pressable>
        </Link>
      </ThemedView>
    );
  }

  const isCompleted = completedSet.has(lesson.id);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Link href="/" asChild>
        <Pressable style={styles.backButton}>
          <ThemedText type="defaultSemiBold">Back to Dashboard</ThemedText>
        </Pressable>
      </Link>

      <ThemedText type="title">{lesson.title}</ThemedText>
      <ThemedText style={styles.subtitle}>{lesson.subtitle}</ThemedText>
      <ThemedText style={[styles.completion, isCompleted ? styles.complete : styles.notComplete]}>
        {isCompleted ? 'Completed' : 'In progress'}
      </ThemedText>

      {lesson.type === 'hotspot' ? (
        <HotspotLessonView lesson={lesson} onComplete={() => markLessonComplete(lesson.id)} />
      ) : (
        <McqLessonView lesson={lesson} onComplete={() => markLessonComplete(lesson.id)} />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 18,
    gap: 12,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 18,
    gap: 12,
  },
  subtitle: {
    opacity: 0.85,
  },
  completion: {
    fontWeight: '700',
  },
  complete: {
    color: '#2A9D8F',
  },
  notComplete: {
    color: '#E76F51',
  },
  backButton: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#cbcbcb',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  lessonCard: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#d2d2d2',
    padding: 12,
    gap: 10,
  },
  mapWrap: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#d2d2d2',
  },
  factCard: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d2d2d2',
    padding: 10,
    gap: 6,
  },
  questionCard: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d2d2d2',
    padding: 10,
    gap: 8,
  },
  optionButton: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#c6c6c6',
    padding: 10,
  },
  primaryButton: {
    borderRadius: 10,
    backgroundColor: '#0a7ea4',
    padding: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: '700',
  },
  placeholder: {
    opacity: 0.75,
  },
  result: {
    fontWeight: '700',
  },
});
