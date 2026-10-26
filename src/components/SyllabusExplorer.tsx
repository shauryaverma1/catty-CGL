import { useMemo, useState } from 'react'
import { BookOpen, ChevronDown, ChevronRight, ExternalLink, FileText, FilterX, Search, ShieldAlert } from 'lucide-react'
import { syllabusNodes, sourceRegister, starterTopics, targetExamCycle, syllabusSourceCycle } from '../data/syllabusData'
import { buildSyllabusTree, filterSyllabusTree, filterSyllabusByPath, targetCycleStatus, lessonStatus, type SyllabusTreeNode } from '../data/syllabusModel.mjs'

const tierOptions = ['All tiers', ...new Set(syllabusNodes.map(node => node.tier).filter((tier): tier is string => Boolean(tier) && tier !== 'Exam'))]
const paperOptions = ['All papers', ...new Set(syllabusNodes.map(node => node.paper).filter((paper): paper is string => Boolean(paper)))]
const subjectOptions = ['All subjects', ...new Set(syllabusNodes.map(node => node.subject).filter((subject): subject is string => Boolean(subject)))]
const cycleLabel = (node: SyllabusTreeNode) => {
 const status=targetCycleStatus(node)
 if(status==='previous-cycle') return '2026 source · 2027 pending'
 if(status==='awaiting-2027') return '2027 not verified'
 return 'Editorial / needs review'
}
const nodeTitle = (node: SyllabusTreeNode) => node.topic || node.subtopic || node.subject || node.official_wording || node.tier || node.node_id

function SyllabusExplorer() {
 const [query,setQuery]=useState('')
 const [tier,setTier]=useState('All tiers')
 const [paper,setPaper]=useState('All papers')
 const [subject,setSubject]=useState('All subjects')
 const [showSources,setShowSources]=useState(false)
 const [showStarters,setShowStarters]=useState(true)
 const fullTree=useMemo(()=>buildSyllabusTree(syllabusNodes),[])
 const searchedTree=useMemo(()=>filterSyllabusTree(fullTree,query),[fullTree,query])
 const visibleTree=useMemo(()=>filterSyllabusByPath(searchedTree,{tier,paper,subject}),[searchedTree,tier,paper,subject])
 const topicCount=syllabusNodes.filter(node=>node.topic||node.subtopic).length
 const previousCount=syllabusNodes.filter(node=>node.exam_cycle===syllabusSourceCycle&&node.mapping_status==='verified_official').length
 const clearFilters=()=>{setQuery('');setTier('All tiers');setPaper('All papers');setSubject('All subjects')}
 const renderNode=(node:SyllabusTreeNode,depth=0):React.ReactNode=>{
  const isTopic=Boolean(node.topic||node.subtopic)
  const status=targetCycleStatus(node)
  const approved=lessonStatus(node)==='approved'
  const childrenOpen=Boolean(query||tier!=='All tiers'||paper!=='All papers'||subject!=='All subjects')||depth<1
  return <details className={`syllabus-node depth-${Math.min(depth,5)}`} key={node.node_id} open={childrenOpen}>
   <summary className={`syllabus-node-summary ${isTopic?'topic-summary':'group-summary'}`}>
    <span className="syllabus-disclosure" aria-hidden="true"><ChevronRight size={15}/></span>
    <span className="syllabus-node-main">
     <strong>{nodeTitle(node)}</strong>
     {node.subtopic&&node.topic&&<small>{node.subtopic}</small>}
     <small className="syllabus-reference">{[node.tier,node.paper,node.section,node.source_reference].filter(Boolean).join(' · ')}</small>
    </span>
    <span className={`mapping-pill ${status}`}>{cycleLabel(node)}</span>
    {isTopic&&<span className={`lesson-unavailable ${approved?'lesson-approved':''}`}>{approved?'Lesson approved':'Lesson not available'}</span>}
   </summary>
   {node.research_notes&&<p className="syllabus-research-note">{node.research_notes}</p>}
   {node.children.length>0&&<div className="syllabus-children">{node.children.map(child=>renderNode(child,depth+1))}</div>}
   {isTopic&&<div className="syllabus-topic-meta">
    <span><FileText size={13}/>{node.source_id||'Source not assigned'}</span>
    <span>{node.mapping_status==='unresolved'?'Editorial grouping · unresolved':'Syllabus mapping only; lesson, questions and answers not approved'}</span>
   </div>}
  </details>
 }
 return <section className="syllabus-explorer">
  <div className="syllabus-intro">
   <div><div className="eyebrow"><BookOpen size={14}/> YOUR LEARNING GARDEN</div><h1>Explore your syllabus <span>✿</span></h1><p>Find a subject, open its topics and subtopics, and see what is ready to study.</p></div>
   <div className="syllabus-cycle-card"><span>Target exam</span><strong>SSC CGL {targetExamCycle}</strong><small>Source baseline: SSC CGL {syllabusSourceCycle}</small></div>
  </div>
  <div className="syllabus-alert" role="note"><ShieldAlert size={19}/><div><strong>2027 syllabus not yet verified</strong><p>Role 02 inspected the official 2026 notice. This is a previous-cycle reference, not confirmation of the 2027 syllabus. No item is marked as verified for 2027. Specialist Tier-II papers may apply only to candidates for specified posts.</p></div></div>
  <div className="syllabus-stats"><div><strong>{syllabusNodes.length}</strong><span>source hierarchy entries</span></div><div><strong>{topicCount}</strong><span>topic / subtopic entries</span></div><div><strong>{previousCount}</strong><span>2026-source mappings</span></div></div>
  <div className="syllabus-controls">
   <label className="syllabus-search"><Search size={17}/><input value={query} onChange={event=>setQuery(event.target.value)} placeholder="Search subject, topic, subtopic or source…" aria-label="Search syllabus"/></label>
   <label className="tier-filter"><span>Tier</span><select value={tier} onChange={event=>setTier(event.target.value)} aria-label="Filter by exam tier">{tierOptions.map(option=><option key={option}>{option}</option>)}</select></label>
   <label className="tier-filter"><span>Paper</span><select value={paper} onChange={event=>setPaper(event.target.value)} aria-label="Filter by paper">{paperOptions.map(option=><option key={option}>{option}</option>)}</select></label>
   <label className="tier-filter"><span>Subject</span><select value={subject} onChange={event=>setSubject(event.target.value)} aria-label="Filter by subject">{subjectOptions.map(option=><option key={option}>{option}</option>)}</select></label>
   <button className="clear-syllabus-filters" onClick={clearFilters} aria-label="Clear all syllabus filters"><FilterX size={15}/> Clear</button>
  </div>
  <div className="syllabus-legend"><span><i className="legend-dot previous"/> 2026 source · 2027 pending</span><span><i className="legend-dot pending"/> 2027 not verified</span><span><i className="legend-dot unresolved"/> Editorial / needs review</span><span><i className="legend-dot unavailable"/> Lesson not available</span></div>
  <div className="syllabus-tree" aria-label="Syllabus hierarchy">{visibleTree.length?visibleTree.map(node=>renderNode(node)):<div className="syllabus-empty">No matching syllabus entries. Try clearing one of the filters.</div>}</div>
  <section className="starter-panel">
   <button className="source-toggle starter-toggle" onClick={()=>setShowStarters(!showStarters)} aria-expanded={showStarters}><span><span><span className="eyebrow">ROLE 02 SUGGESTED STARTERS</span><strong className="starter-heading">Small topics to begin with</strong></span><small>{starterTopics.length} suggested · none approved</small></span>{showStarters?<ChevronDown size={18}/>:<ChevronRight size={18}/>}</button>
   {showStarters&&<div className="starter-list">{starterTopics.map(item=><article className="starter-item" key={item.topic_id}><span className="starter-rank">{String(item.rank).padStart(2,'0')}</span><div><strong>{item.title}</strong><small>{item.official_reference} · {item.mapping_status.replaceAll('_',' ')}</small><p>{item.academic_risks}</p></div><span className="lesson-unavailable">Lesson not available</span></article>)}</div>}
  </section>
  <section className="source-panel">
   <button className="source-toggle" onClick={()=>setShowSources(!showSources)} aria-expanded={showSources}><span><FileText size={17}/> Official source register <small>{sourceRegister.length} recorded sources</small></span>{showSources?<ChevronDown size={18}/>:<ChevronRight size={18}/>}</button>
   {showSources&&<div className="source-list">{sourceRegister.map(source=><article className="source-item" key={source.source_id}><div className="source-item-heading"><strong>{source.title}</strong><span className={source.official==='True'?'source-official':'source-context'}>{source.official==='True'?'Official source':'Reference'}</span></div><p>{source.publisher} · Cycle: {source.exam_cycle} · Checked: {source.access_date}</p><p><strong>Sections:</strong> {source.relevant_sections||'Not specified'} · <strong>Inspection:</strong> {source.inspection_status}</p><p><strong>Use:</strong> {source.intended_use}</p><p className="source-limit"><strong>Limit:</strong> {source.limitations}</p><a href={source.document_url} target="_blank" rel="noreferrer">Open source <ExternalLink size={13}/></a></article>)}</div>}
  </section>
  <p className="syllabus-footnote">The supplied hierarchy is a starter extraction, not exhaustive normalization. Editorial General Awareness groupings remain explicitly unresolved. Syllabus mapping does not approve lessons, questions, explanations or answers.</p>
 </section>
}
export default SyllabusExplorer
