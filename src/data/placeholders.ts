export type Subject = {
  id: string
  name: string
  detail: string
  icon: string
  tone: 'rose' | 'lilac' | 'sage' | 'butter'
  progress: number
}

export const placeholderSubjects: Subject[] = [
  { id: 'placeholder-reasoning', name: 'Reasoning', detail: 'Practice patterns & logic', icon: '✦', tone: 'lilac', progress: 0 },
  { id: 'placeholder-quant', name: 'Quantitative Aptitude', detail: 'Build confidence with numbers', icon: '＋', tone: 'rose', progress: 0 },
  { id: 'placeholder-english', name: 'English', detail: 'Words, grammar & reading', icon: 'Aa', tone: 'sage', progress: 0 },
  { id: 'placeholder-awareness', name: 'General Awareness', detail: 'Explore the world around you', icon: '☼', tone: 'butter', progress: 0 },
]

export const placeholderNotice = {
  label: 'PLACEHOLDER CONTENT',
  message: 'This is a design preview. Syllabus topics, lessons, questions, answers and progress are not yet connected to approved academic content.',
}
