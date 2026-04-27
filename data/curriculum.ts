import type { Curriculum } from '@/types/curriculum';

export const curriculum: Curriculum = {
  subjects: [
    {
      id: 'geography',
      title: 'Geography',
      description: 'Maps, continents, and world understanding.',
      color: '#2A9D8F',
      topics: [
        {
          id: 'world-map-basics',
          title: 'World Map Basics',
          description: 'Learn continents with interactive hotspots.',
          lessonIds: ['geo-continents-01'],
        },
      ],
    },
    {
      id: 'math',
      title: 'Math',
      description: 'Pattern thinking, arithmetic, and logic.',
      color: '#E76F51',
      topics: [
        {
          id: 'number-sense',
          title: 'Number Sense',
          description: 'Build speed and confidence with smart challenges.',
          lessonIds: ['math-patterns-01'],
        },
      ],
    },
    {
      id: 'biology',
      title: 'Biology',
      description: 'Living systems from cells to ecosystems.',
      color: '#457B9D',
      topics: [
        {
          id: 'cell-biology',
          title: 'Cell Biology',
          description: 'Interactive parts of a cell and their jobs.',
          lessonIds: [],
        },
      ],
    },
    {
      id: 'chemistry',
      title: 'Chemistry',
      description: 'Elements, atoms, reactions, and patterns.',
      color: '#8D5A97',
      topics: [
        {
          id: 'periodic-table',
          title: 'Periodic Table',
          description: 'Element families and periodic trends.',
          lessonIds: [],
        },
      ],
    },
    {
      id: 'history',
      title: 'History',
      description: 'Timelines, civilizations, and world events.',
      color: '#F4A261',
      topics: [
        {
          id: 'world-history',
          title: 'World History',
          description: 'Historic events and world wars with timelines.',
          lessonIds: [],
        },
      ],
    },
  ],
  lessons: [
    {
      id: 'geo-continents-01',
      type: 'hotspot',
      subjectId: 'geography',
      topicId: 'world-map-basics',
      title: 'Continents Explorer',
      subtitle: 'Tap continents to discover fast facts.',
      intro: 'Explore the map, then complete a quick "find on image" quiz.',
      hotspots: [
        {
          id: 'north-america',
          label: 'North America',
          factKid: 'North America has Canada, the USA, and Mexico.',
          factGenius:
            'It spans from Arctic climates to tropical zones and includes major tectonic boundaries.',
        },
        {
          id: 'south-america',
          label: 'South America',
          factKid: 'The Amazon rainforest is in South America.',
          factGenius: 'The Andes mountain range is the world\'s longest continental mountain chain.',
        },
        {
          id: 'europe',
          label: 'Europe',
          factKid: 'Europe has many countries close together.',
          factGenius: 'Europe\'s peninsulas and navigable rivers strongly shaped trade and state formation.',
        },
        {
          id: 'africa',
          label: 'Africa',
          factKid: 'Africa is the second-largest continent.',
          factGenius: 'Africa contains the Sahara, major river systems, and extraordinary biome diversity.',
        },
        {
          id: 'asia',
          label: 'Asia',
          factKid: 'Asia is the largest continent.',
          factGenius:
            'Asia holds the greatest population and includes many climate belts and tectonic zones.',
        },
        {
          id: 'australia',
          label: 'Australia',
          factKid: 'Australia is both a country and a continent.',
          factGenius: 'It is often called the smallest continent and has many endemic species.',
        },
      ],
      quiz: {
        id: 'geo-continents-quiz-1',
        prompt: 'Tap Asia on the map.',
        targetHotspotId: 'asia',
      },
    },
    {
      id: 'math-patterns-01',
      type: 'mcq',
      subjectId: 'math',
      topicId: 'number-sense',
      title: 'Math Power Sprint',
      subtitle: 'Train pattern thinking and quick arithmetic.',
      intro: 'Answer each question, then unlock your completion badge.',
      questions: [
        {
          id: 'm1',
          prompt: 'What comes next: 3, 6, 12, 24, ?',
          options: [
            { id: 'a', text: '48' },
            { id: 'b', text: '30' },
            { id: 'c', text: '36' },
          ],
          correctOptionId: 'a',
          explanationKid: 'Each number doubles. 24 doubled is 48.',
          explanationGenius: 'This is a geometric sequence with common ratio r = 2.',
        },
        {
          id: 'm2',
          prompt: 'If 9 x 7 = 63, then 63 / 9 = ?',
          options: [
            { id: 'a', text: '6' },
            { id: 'b', text: '7' },
            { id: 'c', text: '8' },
          ],
          correctOptionId: 'b',
          explanationKid: 'Division undoes multiplication, so 63 / 9 = 7.',
          explanationGenius: 'Multiplication and division are inverse operations over non-zero numbers.',
        },
        {
          id: 'm3',
          prompt: 'Which number is prime?',
          options: [
            { id: 'a', text: '21' },
            { id: 'b', text: '29' },
            { id: 'c', text: '35' },
          ],
          correctOptionId: 'b',
          explanationKid: '29 is prime because only 1 and 29 divide it.',
          explanationGenius: '29 has no divisors in integers from 2 through floor(sqrt(29)).',
        },
      ],
    },
  ],
};

export function getLessonById(lessonId: string) {
  return curriculum.lessons.find((lesson) => lesson.id === lessonId);
}
