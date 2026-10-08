"use client"

import { useState } from "react"
import { ArrowUpRight, Check, Fingerprint, ShieldCheck } from "lucide-react"
import styles from "./InvestigationScene.module.css"

const ACCOUNTS = [
  { id: "AC–1048", label: "Origin account", x: 16, y: 48, detail: "The starting point of the transaction trail.", amount: "€24,600" },
  { id: "AC–2091", label: "Shared counterparty", x: 38, y: 22, detail: "Receives transfers from both accounts in this investigation.", amount: "€18,200" },
  { id: "AC–3026", label: "Focus account", x: 52, y: 53, detail: "A change in transfer frequency links this account to the original signal.", amount: "€42,800" },
  { id: "AC–4017", label: "Related account", x: 31, y: 79, detail: "Shares a counterparty with the focus account.", amount: "€9,700" },
  { id: "AC–5024", label: "Recipient", x: 78, y: 29, detail: "The next destination in the highlighted transaction trail.", amount: "€16,400" },
  { id: "AC–6083", label: "Destination", x: 82, y: 77, detail: "A downstream account for the investigator to review.", amount: "€12,100" },
]

export function InvestigationScene({ view }: { view: number }) {
  const [account, setAccount] = useState(2)
  const [transaction, setTransaction] = useState(0)
  const active = ACCOUNTS[account]
  const rows = [
    ["TX–0842", "AC–3026 → AC–5024", "€16,400", "Frequency shift"],
    ["TX–0841", "AC–1048 → AC–3026", "€24,600", "Linked activity"],
    ["TX–0840", "AC–4017 → AC–2091", "€9,700", "Shared recipient"],
  ]
  return <div className={styles.stage}>
    <div className={styles.stageTop}><span><i/> SENTINELFLOW WORKSPACE</span><span>Interactive example · Synthetic data</span></div>
    <div className={styles.workspace}>
      <div className={styles.canvas}>
        <div className={styles.toolbar}><span>Intelligence <span className={styles.slash}>/</span> <strong>{["Activity overview", "Relationship explorer", "Case workspace"][view]}</strong></span><span className={styles.caseTag}>CASE SF–2048 <span>↗</span></span></div>
        <div key={view} className={styles.enter}>
          {view===0 && <div className={styles.monitor}>
            <div className={styles.sceneHeading}><div><span className={styles.eyebrow}>MONITOR / ACCOUNT AC–3026</span><h3>Something changed.</h3><p>Transfer activity has moved beyond its usual pattern.</p></div><span className={styles.reviewTag}><i/> Needs review</span></div>
            <div className={styles.chartLayout}>
              <div className={styles.chart}><div className={styles.chartCaption}><span>Transfer activity</span><span>Today, 00:00—24:00</span></div><svg viewBox="0 0 650 180" role="img" aria-label="Example transaction activity increasing sharply after 16:00"><defs><linearGradient id="sf-chart-fill" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#5678cd" stopOpacity=".22"/><stop offset="1" stopColor="#5678cd" stopOpacity="0"/></linearGradient></defs>{[35,85,135].map(y=><line key={y} x1="0" x2="650" y1={y} y2={y} stroke="#dce1e5" strokeDasharray="3 5"/>)}<path d="M0 145L28 140L52 148L80 125L105 138L133 126L158 145L185 122L214 133L240 117L266 131L294 128L322 109L350 119L378 95L400 104L423 65L447 82L474 31L501 48L528 18L556 42L584 25L610 54L650 40V180H0Z" fill="url(#sf-chart-fill)"/><path className={styles.chartLine} d="M0 145L28 140L52 148L80 125L105 138L133 126L158 145L185 122L214 133L240 117L266 131L294 128L322 109L350 119L378 95L400 104L423 65L447 82L474 31L501 48L528 18L556 42L584 25L610 54L650 40" fill="none" stroke="#3155aa" strokeWidth="2.5"/><line x1="423" x2="423" y1="5" y2="180" stroke="#c97459" strokeDasharray="4 4"/><circle cx="423" cy="65" r="5" fill="#c97459" stroke="#fff" strokeWidth="3"/></svg><div className={styles.axis}><span>00:00</span><span>08:00</span><span>16:00</span><span>24:00</span></div></div>
              <div className={styles.signalNote}><span className={styles.eyebrow}>SIGNAL / 01</span><span className={styles.signalNumber}>3.4<span>×</span></span><p>Transfer frequency<br/>above the example baseline</p><div><span className={styles.smallDot}/> First observed at 16:08</div></div>
            </div>
            <div className={styles.rowHeading}><span>Related transactions</span><span>Select a transaction ↓</span></div>
            <div className={styles.transactions}>{rows.map((row,i)=><button key={row[0]} onClick={()=>setTransaction(i)} aria-pressed={transaction===i} className={transaction===i?styles.selectedRow:""}><span>{row[0]}</span><span>{row[1]}</span><strong>{row[2]}</strong><span className={styles.rowReason}>{row[3]}</span><ArrowUpRight size={14}/></button>)}</div>
            <p className={styles.selectionNote} aria-live="polite"><span/> {rows[transaction][0]} selected for review — {rows[transaction][3].toLowerCase()}.</p>
          </div>}
          {view===1 && <div className={styles.relationships}>
            <div className={styles.graph}>
              <div className={styles.graphHeading}><span className={styles.eyebrow}>RELATIONSHIP EXPLORER</span><h3>Follow the connection.</h3><p>Select an account to inspect its context.</p></div>
              <div className={styles.graphField}><svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">{[[0,1],[0,2],[1,2],[1,3],[2,3],[2,4],[2,5],[4,5]].map(([a,b],i)=><line key={i} x1={ACCOUNTS[a].x} y1={ACCOUNTS[a].y} x2={ACCOUNTS[b].x} y2={ACCOUNTS[b].y} stroke={a===account||b===account?"#e1a18a":"#ffffff22"} strokeWidth={(a === account || b === account) ? .35 : .16}/>)}</svg>{ACCOUNTS.map((node,i)=><button key={node.id} onClick={()=>setAccount(i)} aria-label={`Inspect ${node.id}, ${node.label}`} aria-pressed={account===i} style={{left:node.x+"%",top:node.y+"%"}} className={`${styles.node} ${account===i?styles.nodeSelected:""}`}><span>{i===2?<Fingerprint size={23}/>:"0"+(i+1)}</span><small>{node.id}</small></button>)}</div>
              <div className={styles.graphLegend}><span><i/> Account</span><span><i/> Selected relationship</span><span>6 entities / 8 connections</span></div>
            </div>
            <aside className={styles.inspector} aria-live="polite"><span className={styles.eyebrow}>ACCOUNT CONTEXT</span><div className={styles.inspectorIcon}><Fingerprint size={28}/></div><h4>{active.id}</h4><p className={styles.accountRole}>{active.label}</p><div className={styles.inspectorRule}/><span className={styles.eyebrow}>OBSERVED TRANSFERS</span><strong className={styles.amount}>{active.amount}</strong><p>{active.detail}</p><div className={styles.evidenceTag}><Check size={13}/> Linked to SF–2048</div></aside>
          </div>}
          {view===2 && <div className={styles.caseLayout}>
            <div className={styles.casePaper}><div className={styles.paperTop}><span>INVESTIGATION RECORD</span><ShieldCheck size={20}/></div><span className={styles.eyebrow}>SF–2048 / ACTIVITY REVIEW</span><h3>A clear record.<br/>An informed decision.</h3><p>Unusual transfer activity involving connected accounts.</p><div className={styles.paperFields}><div><span>Focus account</span><strong>AC–3026</strong></div><div><span>Status</span><strong className={styles.coralText}>Under review</strong></div></div><div className={styles.finding}><span>01 / OBSERVATION</span><p>Transfer frequency increased above the account’s example baseline.</p></div><div className={styles.finding}><span>02 / CONTEXT</span><p>Related transactions connect the focus account to shared counterparties.</p></div><div className={styles.paperFoot}><span>Analyst review required</span><span>01 — 01</span></div></div>
            <aside className={styles.evidenceList}><span className={styles.eyebrow}>THE THREAD OF EVIDENCE</span><h4>Nothing lost<br/>between the steps.</h4>{[["16:08","Signal identified","A change in account behaviour."],["16:12","Relationships mapped","Connected activity in one view."],["16:18","Evidence assembled","Findings attached to the case."]].map(([time,title,desc])=><div className={styles.timelineItem} key={time}><span className={styles.timelineDot}/><time>{time}</time><strong>{title}</strong><p>{desc}</p></div>)}<p className={styles.exampleNote}>Illustrative investigation. No real customer data.</p></aside>
          </div>}
        </div>
      </div>
    </div>
    <div className={styles.stageBottom}><span>One investigation. Every perspective.</span><span>0{view+1} / 03</span></div>
  </div>
}
