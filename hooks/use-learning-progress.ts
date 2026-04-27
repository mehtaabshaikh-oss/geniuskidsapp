import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'geniuskids.learningProgress.v1';

type ProgressState = {
  completedLessonIds: string[];
};

const DEFAULT_PROGRESS: ProgressState = {
  completedLessonIds: [],
};

export function useLearningProgress() {
  const [progress, setProgress] = useState<ProgressState>(DEFAULT_PROGRESS);
  const [isLoading, setIsLoading] = useState(true);

  const loadProgress = useCallback(async () => {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);

      if (!raw) {
        setProgress(DEFAULT_PROGRESS);
        return;
      }

      const parsed = JSON.parse(raw) as ProgressState;
      if (Array.isArray(parsed.completedLessonIds)) {
        setProgress({ completedLessonIds: parsed.completedLessonIds });
        return;
      }

      setProgress(DEFAULT_PROGRESS);
    } catch {
      setProgress(DEFAULT_PROGRESS);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadProgress();
  }, [loadProgress]);

  const persist = useCallback(async (nextState: ProgressState) => {
    setProgress(nextState);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
  }, []);

  const markLessonComplete = useCallback(
    async (lessonId: string) => {
      if (progress.completedLessonIds.includes(lessonId)) {
        return;
      }
      const nextState = {
        completedLessonIds: [...progress.completedLessonIds, lessonId],
      };
      await persist(nextState);
    },
    [persist, progress.completedLessonIds]
  );

  const resetProgress = useCallback(async () => {
    await persist(DEFAULT_PROGRESS);
  }, [persist]);

  const completedSet = useMemo(() => new Set(progress.completedLessonIds), [progress.completedLessonIds]);

  return {
    isLoading,
    progress,
    completedSet,
    loadProgress,
    markLessonComplete,
    resetProgress,
  };
}
