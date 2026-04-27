export type LessonType = 'hotspot' | 'mcq';

export type Subject = {
  id: string;
  title: string;
  description: string;
  color: string;
  topics: Topic[];
};

export type Topic = {
  id: string;
  title: string;
  description: string;
  lessonIds: string[];
};

export type Hotspot = {
  id: string;
  label: string;
  factKid: string;
  factGenius: string;
};

export type FindOnImageQuiz = {
  id: string;
  prompt: string;
  targetHotspotId: string;
};

export type HotspotLesson = {
  id: string;
  type: 'hotspot';
  subjectId: string;
  topicId: string;
  title: string;
  subtitle: string;
  intro: string;
  hotspots: Hotspot[];
  quiz: FindOnImageQuiz;
};

export type McqOption = {
  id: string;
  text: string;
};

export type McqQuestion = {
  id: string;
  prompt: string;
  options: McqOption[];
  correctOptionId: string;
  explanationKid: string;
  explanationGenius: string;
};

export type McqLesson = {
  id: string;
  type: 'mcq';
  subjectId: string;
  topicId: string;
  title: string;
  subtitle: string;
  intro: string;
  questions: McqQuestion[];
};

export type Lesson = HotspotLesson | McqLesson;

export type Curriculum = {
  subjects: Subject[];
  lessons: Lesson[];
};
