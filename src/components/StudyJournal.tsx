import { useEffect, useMemo, useState } from 'react'
import { BookOpen, CalendarDays, Check, ChevronLeft, ChevronRight, Clock3, Flower2, Flame, Pencil, Plus, Save, Sparkles, Trash2, X } from 'lucide-react'
import { ACTIVITY_TYPES, dateKey, getMonthDays, getPeriodSummary, getStudyStreak, readJournal, saveJournal, upsertById, deleteById } from '../data/studyJournalModel.mjs'

type Activity = { id:string; date:string; subject:string; topic:string; activityType:string; durationMinutes:number; questionsAttempted:number; correctAnswers:number; notes:string; timeSource:string }
type Task = { id:string; date:string; title:string; completed:boolean }
type Reflection = { date:string; achievements:string; difficulties:string; tomorrowGoals:string }
const today=dateKey(new Date())
const blankActivity=():Activity=>({id:'',date:today,subject:'Reasoning',topic:'',activityType:'learning',durationMinutes:30,questionsAttempted:0,correctAnswers:0,notes:'',timeSource:'manual'})
const uid=()=>globalThis.crypto?.randomUUID?.() ?? `entry-${Date.now()}-${Math.random().toString(36).slice(2)}`
const prettyDate=(key:string)=>new Date(key+'T12:00:00').toLocaleDateString(undefined,{weekday:'long',day:'numeric',month:'long',year:'numeric'})
const minutesLabel=(n:number)=>n>=60?`${Math.floor(n/60)}h ${n%60}m`:`${n}m`

export default function StudyJournal(){
 const [data,setData]=useState(()=>readJournal())
 const [selectedDate,setSelectedDate]=useState(today)
 const [month,setMonth]=useState(()=>new Date(today+'T12:00:00'))
 const [activity,setActivity]=useState<Activity|null>(null)
 const [taskText,setTaskText]=useState('')
 const [tab,setTab]=useState<'day'|'calendar'|'insights'>('day')
 const [period,setPeriod]=useState<'week'|'month'>('week')
 const [reflection,setReflection]=useState<Reflection>({date:today,achievements:'',difficulties:'',tomorrowGoals:''})
 useEffect(()=>{saveJournal(data)},[data])
 useEffect(()=>{setReflection(data.reflections.find((r:Reflection)=>r.date===selectedDate)||{date:selectedDate,achievements:'',difficulties:'',tomorrowGoals:''})},[selectedDate,data.reflections])
 const dayActivities=(data.activities as Activity[]).filter(a=>a.date===selectedDate)
 const dayTasks=(data.tasks as Task[]).filter(t=>t.date===selectedDate)
 const streak=getStudyStreak(data.activities,today)
 const activeDates=new Set((data.activities as Activity[]).filter(a=>a.durationMinutes>0).map(a=>a.date))
 const selectedSummary=getPeriodSummary(data.activities,selectedDate,selectedDate,data.tasks)
 const calendarDays=getMonthDays(month.getFullYear(),month.getMonth())
 const startEnd=useMemo(()=>{
  if(period==='month'){const start=new Date(month.getFullYear(),month.getMonth(),1),end=new Date(month.getFullYear(),month.getMonth()+1,0);return [dateKey(start),dateKey(end)]}
  const d=new Date(today+'T12:00:00'),weekday=(d.getDay()+6)%7;d.setDate(d.getDate()-weekday);const end=new Date(d);end.setDate(d.getDate()+6);return [dateKey(d),dateKey(end)]
 },[period,month])
 const summary=getPeriodSummary(data.activities,startEnd[0],startEnd[1],data.tasks)
 const change=(next:Partial<Activity>)=>setActivity(current=>current?{...current,...next}:current)
 const saveActivity=()=>{if(!activity||!activity.subject.trim()||!activity.topic.trim()||activity.durationMinutes<=0||activity.correctAnswers>activity.questionsAttempted)return;setData(d=>({...d,activities:upsertById(d.activities,{...activity,id:activity.id||uid()})}));setActivity(null)}
 const saveReflection=()=>setData(d=>({...d,reflections:upsertById(d.reflections,reflection)}))
 const moveMonth=(delta:number)=>setMonth(m=>new Date(m.getFullYear(),m.getMonth()+delta,1))
 return <section className="journal">
  <header className="journal-hero"><div><div className="eyebrow"><Flower2 size={14}/> YOUR PERSONAL STUDY DIARY</div><h1>My Study Journal <span>✿</span></h1><p>A gentle place to notice the work you put in, one day at a time.</p></div><div className="journal-cat" aria-hidden="true"><span>ฅ^•ﻌ•^ฅ</span><small>you’ve got this!</small></div></header>
  <div className="journal-stats">
   <article><span className="journal-stat-icon rose"><Clock3 size={17}/></span><div><strong>{minutesLabel(selectedSummary.totalMinutes)}</strong><small>Study time · selected day</small></div></article>
   <article><span className="journal-stat-icon lilac"><BookOpen size={17}/></span><div><strong>{dayActivities.length}</strong><small>Activities recorded</small></div></article>
   <article><span className="journal-stat-icon butter"><Flame size={17}/></span><div><strong>{streak} day{streak===1?'':'s'}</strong><small>Current study streak</small></div></article>
  </div>
  <nav className="journal-tabs" aria-label="Study journal views">{(['day','calendar','insights'] as const).map(t=><button key={t} className={tab===t?'selected':''} onClick={()=>setTab(t)}>{t==='day'?'Daily journal':t==='calendar'?'Calendar':'Summaries'}</button>)}</nav>
  {tab==='day'&&<>
   <div className="journal-daybar"><div><span className="journal-kicker">YOUR STUDY DAY</span><strong>{prettyDate(selectedDate)}</strong></div><label className="journal-date"><CalendarDays size={15}/><input aria-label="Choose study date" type="date" value={selectedDate} onChange={e=>setSelectedDate(e.target.value)}/></label></div>
   <div className="journal-columns">
    <section className="journal-panel"><div className="journal-panel-head"><div><span className="journal-panel-icon"><BookOpen size={17}/></span><div><h2>Study activities</h2><p>Keep track of each little step.</p></div></div><button className="journal-add" onClick={()=>setActivity(blankActivity())}><Plus size={15}/> Add activity</button></div>
     {dayActivities.length===0?<div className="journal-empty"><span>✿</span><strong>No activities recorded yet</strong><p>Your study story for this day starts whenever you do.</p></div>:<div className="journal-activity-list">{dayActivities.map(a=><article key={a.id} className="journal-activity"><div className="journal-activity-top"><span className="activity-type">{a.activityType}</span><span className="activity-time">{minutesLabel(a.durationMinutes)} · {a.timeSource==='pomodoro'?'Pomodoro':'Manual'}</span></div><strong>{a.subject} · {a.topic}</strong><p>{a.questionsAttempted} attempted · {a.correctAnswers} correct</p>{a.notes&&<small>{a.notes}</small>}<div className="journal-row-actions"><button onClick={()=>setActivity(a)}><Pencil size={13}/> Edit</button><button className="delete" onClick={()=>setData(d=>({...d,activities:deleteById(d.activities,a.id)}))}><Trash2 size={13}/> Delete</button></div></article>)}</div>}
    </section>
    <section className="journal-panel"><div className="journal-panel-head"><div><span className="journal-panel-icon butter"><Check size={17}/></span><div><h2>Daily checklist</h2><p>{dayTasks.filter(t=>t.completed).length} of {dayTasks.length} completed</p></div></div></div>
     <form className="journal-task-form" onSubmit={e=>{e.preventDefault();if(taskText.trim()){setData(d=>({...d,tasks:[...d.tasks,{id:uid(),date:selectedDate,title:taskText.trim(),completed:false}]}));setTaskText('')}}}><input value={taskText} onChange={e=>setTaskText(e.target.value)} placeholder="Add a small study task…" aria-label="New daily task"/><button aria-label="Add task"><Plus size={17}/></button></form>
     <div className="journal-task-list">{dayTasks.map(t=><div key={t.id} className="journal-task"><label><input type="checkbox" checked={t.completed} onChange={e=>setData(d=>({...d,tasks:d.tasks.map(x=>x.id===t.id?{...x,completed:e.target.checked}:x)}))}/><span>{t.title}</span></label><button aria-label="Delete task" onClick={()=>setData(d=>({...d,tasks:deleteById(d.tasks,t.id)}))}><X size={14}/></button></div>)}{dayTasks.length===0&&<p className="journal-hint">Your checklist is ready for your plans.</p>}</div>
     <div className="journal-reflection"><div className="journal-panel-head"><div><span className="journal-panel-icon lilac"><Sparkles size={17}/></span><div><h2>Daily reflection</h2><p>A little note to your future self.</p></div></div></div>
      <label>Little achievements<textarea value={reflection.achievements} onChange={e=>setReflection(r=>({...r,achievements:e.target.value}))} placeholder="What went well today?"/></label>
      <label>Things that felt difficult<textarea value={reflection.difficulties} onChange={e=>setReflection(r=>({...r,difficulties:e.target.value}))} placeholder="What challenged you?"/></label>
      <label>Tomorrow’s goals<textarea value={reflection.tomorrowGoals} onChange={e=>setReflection(r=>({...r,tomorrowGoals:e.target.value}))} placeholder="What would you like to focus on?"/></label>
      <button className="journal-save" onClick={saveReflection}><Save size={14}/> Save reflection</button>
     </div>
    </section>
   </div>
  </>}
  {tab==='calendar'&&<section className="journal-panel journal-calendar"><div className="journal-calendar-head"><button onClick={()=>moveMonth(-1)} aria-label="Previous month"><ChevronLeft size={18}/></button><h2>{month.toLocaleDateString(undefined,{month:'long',year:'numeric'})}</h2><button onClick={()=>moveMonth(1)} aria-label="Next month"><ChevronRight size={18}/></button></div><div className="journal-calendar-grid">{['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d=><strong key={d}>{d}</strong>)}{calendarDays.map((d,i)=>d?<button key={d} className={`journal-calendar-day ${d===selectedDate?'chosen':''} ${activeDates.has(d)?'has-study':''}`} onClick={()=>{setSelectedDate(d);setTab('day')}}><span>{Number(d.slice(-2))}</span>{activeDates.has(d)&&<i/>}</button>:<span key={'blank-'+i}/>)}</div><p className="journal-hint"><i/> A flower marks a day with recorded study time. Select a date to revisit it.</p></section>}
  {tab==='insights'&&<section className="journal-panel"><div className="journal-insight-head"><div><span className="journal-kicker">YOUR GENTLE PROGRESS</span><h2>{period==='week'?'This week':'This month'}</h2></div><div className="journal-period"><button className={period==='week'?'active':''} onClick={()=>setPeriod('week')}>Weekly</button><button className={period==='month'?'active':''} onClick={()=>setPeriod('month')}>Monthly</button></div></div><div className="journal-summary-grid"><article><strong>{minutesLabel(summary.totalMinutes)}</strong><small>Total study time</small></article><article><strong>{summary.completedActivities}</strong><small>Activities completed</small></article><article><strong>{summary.consistency}%</strong><small>Study consistency · {summary.activeDays}/{summary.totalDays} days</small></article><article><strong>{summary.completedTasks}</strong><small>Checklist tasks completed</small></article></div><h3 className="journal-subheading">Time by subject</h3>{Object.entries(summary.subjectMinutes).length===0?<p className="journal-hint">No recorded study time in this period yet.</p>:<div className="journal-subject-bars">{Object.entries(summary.subjectMinutes).sort((a,b)=>b[1]-a[1]).map(([subject,mins])=><div key={subject}><span>{subject}</span><div><i style={{width:`${Math.max(2,mins/Math.max(...Object.values(summary.subjectMinutes))*100)}%`}}/></div><strong>{minutesLabel(mins)}</strong></div>)}</div>}</section>}
  {activity&&<div className="journal-modal-backdrop" role="presentation" onMouseDown={e=>{if(e.target===e.currentTarget)setActivity(null)}}><form className="journal-modal" onSubmit={e=>{e.preventDefault();saveActivity()}}><div className="journal-modal-head"><div><span className="journal-kicker">{activity.id?'EDIT YOUR ENTRY':'A NEW LITTLE STUDY STEP'}</span><h2>{activity.id?'Edit activity':'Add study activity'}</h2></div><button type="button" onClick={()=>setActivity(null)} aria-label="Close"><X size={18}/></button></div>
   <label>Date<input type="date" value={activity.date} onChange={e=>change({date:e.target.value})} required/></label>
   <div className="journal-form-grid"><label>Subject<input value={activity.subject} onChange={e=>change({subject:e.target.value})} placeholder="e.g. Reasoning" required/></label><label>Topic<input value={activity.topic} onChange={e=>change({topic:e.target.value})} placeholder="e.g. Analogies" required/></label></div>
   <label>Activity type<select value={activity.activityType} onChange={e=>change({activityType:e.target.value})}>{ACTIVITY_TYPES.map(t=><option key={t} value={t}>{t[0].toUpperCase()+t.slice(1)}</option>)}</select></label>
   <div className="journal-form-grid"><label>Duration (minutes)<input type="number" min="1" max="1440" value={activity.durationMinutes} onChange={e=>change({durationMinutes:Number(e.target.value)})} required/></label><label>Time recorded as<select value={activity.timeSource} onChange={e=>change({timeSource:e.target.value})}><option value="manual">Manual entry</option><option value="pomodoro">Pomodoro-recorded</option></select></label></div>
   <div className="journal-form-grid"><label>Questions attempted<input type="number" min="0" value={activity.questionsAttempted} onChange={e=>change({questionsAttempted:Number(e.target.value)})}/></label><label>Correct answers<input type="number" min="0" max={activity.questionsAttempted} value={activity.correctAnswers} onChange={e=>change({correctAnswers:Number(e.target.value)})}/></label></div>
   <label>Notes <span className="optional">(optional)</span><textarea value={activity.notes} onChange={e=>change({notes:e.target.value})} placeholder="Anything you’d like to remember…"/></label>
   {activity.correctAnswers>activity.questionsAttempted&&<p className="journal-error">Correct answers cannot exceed questions attempted.</p>}
   <div className="journal-modal-actions"><button type="button" className="journal-cancel" onClick={()=>setActivity(null)}>Cancel</button><button className="journal-save" disabled={!activity.topic.trim()||!activity.subject.trim()||activity.durationMinutes<=0||activity.correctAnswers>activity.questionsAttempted}><Save size={14}/> Save activity</button></div>
  </form></div>}
  <p className="journal-storage-note">Your journal is saved in this browser on this device. No sample study records are pre-filled. <span>✿</span></p>
 </section>
}
