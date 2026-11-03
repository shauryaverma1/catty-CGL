export const JOURNAL_STORAGE_KEY = 'purr-petal.study-journal.v1'
export const ACTIVITY_TYPES = ['learning', 'practice', 'revision', 'mock test']
export const TIME_SOURCES = ['manual', 'pomodoro']

export function readJournal(storage = globalThis.localStorage) {
  try {
    const raw = storage?.getItem(JOURNAL_STORAGE_KEY)
    if (!raw) return { activities: [], tasks: [], reflections: [] }
    const parsed = JSON.parse(raw)
    return {
      activities: Array.isArray(parsed.activities) ? parsed.activities : [],
      tasks: Array.isArray(parsed.tasks) ? parsed.tasks : [],
      reflections: Array.isArray(parsed.reflections) ? parsed.reflections : [],
    }
  } catch { return { activities: [], tasks: [], reflections: [] } }
}
export function saveJournal(data, storage = globalThis.localStorage) {
  storage?.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(data))
}
export function upsertById(items, item) {
  return items.some(entry => entry.id === item.id) ? items.map(entry => entry.id === item.id ? item : entry) : [...items, item]
}
export function deleteById(items, id) { return items.filter(item => item.id !== id) }
export function dateKey(date) {
  const d = new Date(date)
  const y = d.getFullYear(), m = String(d.getMonth()+1).padStart(2,'0'), day = String(d.getDate()).padStart(2,'0')
  return `${y}-${m}-${day}`
}
export function monthKey(date) { return dateKey(date).slice(0,7) }
export function getPeriodSummary(activities, startDate, endDate, tasks = []) {
  const rows = activities.filter(a => a.date >= startDate && a.date <= endDate)
  const subjectMinutes = {}
  for (const a of rows) subjectMinutes[a.subject] = (subjectMinutes[a.subject] || 0) + Number(a.durationMinutes || 0)
  const days = new Set(rows.filter(a => Number(a.durationMinutes) > 0).map(a => a.date))
  const completedTasks = tasks.filter(t => t.date >= startDate && t.date <= endDate && t.completed).length
  return {
    totalMinutes: rows.reduce((sum,a) => sum + Number(a.durationMinutes || 0),0),
    subjectMinutes,
    completedActivities: rows.length,
    activeDays: days.size,
    totalDays: Math.max(1, Math.round((new Date(endDate+'T12:00:00')-new Date(startDate+'T12:00:00'))/86400000)+1),
    consistency: Math.round(days.size / Math.max(1, Math.round((new Date(endDate+'T12:00:00')-new Date(startDate+'T12:00:00'))/86400000)+1) * 100),
    completedTasks,
  }
}
export function getStudyStreak(activities, today = dateKey(new Date())) {
  const active = new Set(activities.filter(a => Number(a.durationMinutes)>0).map(a=>a.date))
  let cursor = today
  if (!active.has(cursor)) {
    const yesterday = new Date(cursor+'T12:00:00'); yesterday.setDate(yesterday.getDate()-1)
    cursor = dateKey(yesterday)
  }
  let streak=0
  while(active.has(cursor)) {
    streak++
    const d=new Date(cursor+'T12:00:00'); d.setDate(d.getDate()-1); cursor=dateKey(d)
  }
  return streak
}
export function getMonthDays(year, month) {
  const first = new Date(year, month, 1)
  const offset = (first.getDay()+6)%7
  const count = new Date(year, month+1, 0).getDate()
  return [...Array(offset).fill(null), ...Array.from({length:count},(_,i)=>dateKey(new Date(year,month,i+1)))]
}
