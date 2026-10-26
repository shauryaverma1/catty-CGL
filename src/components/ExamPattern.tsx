import { useState } from 'react'
import { BookOpen, ChevronDown, ChevronRight, ExternalLink } from 'lucide-react'
import pattern from '../data/exam_pattern_2026.json'

function ExamPattern() {
 const [open,setOpen]=useState(true)
 return <section className="exam-pattern-panel">
  <button className="source-toggle" onClick={()=>setOpen(!open)} aria-expanded={open}>
   <span><BookOpen size={17}/> Exam pattern · 2026 baseline <small>Tier-I and Tier-II</small></span>
   {open?<ChevronDown size={18}/>:<ChevronRight size={18}/>}
  </button>
  {open&&<div className="exam-pattern-content">
   {pattern.tiers.map((tier:any)=><article className="pattern-tier" key={tier.id}>
    <div className="pattern-tier-heading"><h3>{tier.name}</h3>{tier.total_questions&&<span>{tier.total_questions} questions · {tier.total_marks} marks</span>}{tier.total_objective_questions&&<span>{tier.total_objective_questions} objective questions · {tier.total_objective_marks} marks + DEST</span>}</div>
    {tier.subjects&&<div className="pattern-table">{tier.subjects.map((subject:any)=><div className="pattern-row" key={subject.name}><strong>{subject.name}</strong><span>{subject.questions} questions</span><span>{subject.marks} marks</span><span>{subject.sectional_minutes} min</span></div>)}</div>}
    {tier.sessions&&tier.sessions.map((session:any)=><div className="pattern-session" key={session.name}><strong>{session.name} · {session.duration_minutes} minutes</strong>{session.sections.map((section:any)=><div className="pattern-section-row" key={section.name}><div className="pattern-row"><strong>{section.name}</strong><span>{section.questions===null?'Skill test':`${section.questions} questions`}</span><span>{section.marks===null?'Qualifying':`${section.marks} marks`}</span><span>{section.duration_minutes||section.sectional_minutes ? `${section.duration_minutes||section.sectional_minutes} min` : 'Within section'}</span></div>{section.section_time_note&&<p className="pattern-note">{section.section_time_note}</p>}</div>)}</div>)}
    {tier.questions&&<div className="pattern-row"><strong>{tier.questions} questions · {tier.marks} marks</strong><span>{tier.duration_minutes/60} hours</span><span>Negative marking: {tier.negative_marking_per_wrong_answer} per wrong answer</span></div>}
    {tier.applicability&&<p className="pattern-note">{tier.applicability}</p>}
    {tier.negative_marking_per_wrong_answer!==undefined&&<p className="pattern-note">Negative marking: {tier.negative_marking_per_wrong_answer} marks per wrong answer.</p>}{tier.negative_marking&&<p className="pattern-note">{tier.negative_marking}</p>}{tier.notes&&tier.notes.map((note:string)=><p className="pattern-note" key={note}>{note}</p>)}
   </article>)}
   <p className="pattern-source">Source: SSC CGL 2026 notice, {pattern.source_sections}. <a href={pattern.source_url} target="_blank" rel="noreferrer">Open official notice <ExternalLink size={12}/></a></p>
  </div>}
 </section>
}
export default ExamPattern
