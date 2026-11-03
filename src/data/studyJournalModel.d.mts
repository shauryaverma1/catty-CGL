export type JournalActivity = { id:string; date:string; subject:string; topic:string; activityType:string; durationMinutes:number; questionsAttempted:number; correctAnswers:number; notes:string; timeSource:string }
export type JournalTask = { id:string; date:string; title:string; completed:boolean }
export type JournalReflection = { date:string; achievements:string; difficulties:string; tomorrowGoals:string }
export type JournalData = { activities:JournalActivity[]; tasks:JournalTask[]; reflections:JournalReflection[] }
export type PeriodSummary = { totalMinutes:number; subjectMinutes:Record<string,number>; completedActivities:number; activeDays:number; totalDays:number; consistency:number; completedTasks:number }
export const JOURNAL_STORAGE_KEY:string
export const ACTIVITY_TYPES:readonly string[]
export const TIME_SOURCES:readonly string[]
export function readJournal(storage?:Storage):JournalData
export function saveJournal(data:JournalData,storage?:Storage):void
export function upsertById<T extends {id:string}>(items:T[],item:T):T[]
export function deleteById<T extends {id:string}>(items:T[],id:string):T[]
export function dateKey(date:Date|string):string
export function monthKey(date:Date|string):string
export function getPeriodSummary(activities:JournalActivity[],startDate:string,endDate:string,tasks?:JournalTask[]):PeriodSummary
export function getStudyStreak(activities:JournalActivity[],today?:string):number
export function getMonthDays(year:number,month:number):(string|null)[]
