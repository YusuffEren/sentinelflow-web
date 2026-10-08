"use client"

import { useEffect, useRef, useState, type KeyboardEvent } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowDown, ArrowUpRight, ArrowRight } from "lucide-react"
import { InvestigationScene } from "./InvestigationScene"
import styles from "./PlatformExperience.module.css"

const CHAPTERS = [
  { name: "Recognise the signal", short: "Monitor", title: "A change in behaviour. A reason to look closer.", text: "See unusual activity alongside the pattern that came before it. Give every investigation a meaningful starting point.", action: "Next: reveal the connections" },
  { name: "Reveal the connections", short: "Connect", title: "The account is one part of a much bigger story.", text: "Follow the relationships around a transaction. Bring shared counterparties and connected activity into the same field of view.", action: "Next: bring the evidence together" },
  { name: "Bring the evidence together", short: "Investigate", title: "A decision is stronger when its reasoning is clear.", text: "Assemble the activity, relationships and findings in one case. Keep the evidence close to the decision it informs.", action: "Return to monitoring" },
]

function ChapterLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return <div className={styles.chapter}><span>({number})</span><p>{children}</p></div>
}

export function PlatformExperience() {
  const experienceRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const current = CHAPTERS[active]
  useEffect(() => {
    const root = experienceRef.current
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const elements = root.querySelectorAll<HTMLElement>("[data-reveal]")
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.setAttribute("data-state", "visible")
          observer.unobserve(entry.target)
        }
      }
    }, { threshold: .08 })
    elements.forEach(element => {
      element.dataset.state = element.getBoundingClientRect().top < window.innerHeight ? "visible" : "waiting"
      observer.observe(element)
    })
    return () => observer.disconnect()
  }, [])
  const selectWithKeyboard = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index
    if (event.key === "ArrowRight") next = (index + 1) % CHAPTERS.length
    else if (event.key === "ArrowLeft") next = (index + CHAPTERS.length - 1) % CHAPTERS.length
    else if (event.key === "Home") next = 0
    else if (event.key === "End") next = CHAPTERS.length - 1
    else return
    event.preventDefault()
    setActive(next)
    document.getElementById(`experience-tab-${next}`)?.focus()
  }

  return <div ref={experienceRef} className={styles.experience}>
    <section id="capabilities" className={styles.capabilities} aria-labelledby="capabilities-heading">
      <div className={styles.container}>
        <div className={styles.sectionTop}><ChapterLabel number="03">The platform</ChapterLabel><span className={styles.marginNote}>A closer look changes everything.</span></div>
        <div className={styles.introduction} data-reveal>
          <h2 id="capabilities-heading">See the whole story.<br/><em>Make the right call.</em></h2>
          <div className={styles.introNote}><p>Beyond the alert, there is a pattern. A relationship. A reason. Bring them together in one investigation workspace.</p><a href="#experience-demo" aria-label="Explore the interactive platform example"><ArrowDown size={20}/></a></div>
        </div>
        <div id="experience-demo" className={styles.demonstration}>
          <div className={styles.tabs} role="tablist" aria-label="Platform capabilities">
            {CHAPTERS.map((chapter,index)=><button type="button" key={chapter.name} role="tab" id={`experience-tab-${index}`} aria-selected={active===index} aria-controls="experience-panel" tabIndex={active===index?0:-1} onClick={()=>setActive(index)} onKeyDown={event=>selectWithKeyboard(event,index)}><span className={styles.tabNumber}>0{index+1}</span><span className={styles.tabDesktop}>{chapter.name}</span><span className={styles.tabMobile}>{chapter.short}</span><span className={styles.tabIndicator}/></button>)}
          </div>
          <div role="tabpanel" id="experience-panel" aria-labelledby={`experience-tab-${active}`} tabIndex={0}>
            <InvestigationScene view={active}/>
            <div className={styles.sceneCaption}>
              <span className={styles.captionIndex}>0{active+1} / INTELLIGENCE IN CONTEXT</span>
              <h3>{current.title}</h3>
              <div><p>{current.text}</p><Link href="#experience-demo" onClick={()=>setActive((active+1)%CHAPTERS.length)}>{current.action}<ArrowUpRight size={17}/></Link></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="infrastructure" className={styles.perspective} aria-labelledby="perspective-heading">
      <Image src="/images/sentinelflow-perspective.png" alt="Reflections and intersecting lines on a financial district glass facade" fill sizes="100vw" className={styles.perspectiveImage}/>
      <div className={styles.perspectiveShade}/>
      <div className={`${styles.container} ${styles.perspectiveContent}`}>
        <div className={styles.sectionTop}><ChapterLabel number="04">A different perspective</ChapterLabel><span className={styles.photoIndex}>CONTEXT / CONNECTION / CLARITY</span></div>
        <div className={styles.perspectiveStatement} data-reveal><span className={styles.shortRule}/><h2 id="perspective-heading">Complexity is inevitable.<br/><em>Confusion doesn’t have to be.</em></h2><p>A transaction can look ordinary in isolation.<br/>The right context changes what you see.</p></div>
        <div className={styles.photoFooter}><span>Financial intelligence, with perspective.</span><ArrowDown size={20}/></div>
      </div>
    </section>

    <section className={styles.judgement} aria-labelledby="judgement-heading">
      <div className={styles.container}>
        <div className={styles.judgementGrid} data-reveal>
          <div className={styles.judgementIntro}><ChapterLabel number="05">Built around your judgement</ChapterLabel><h2 id="judgement-heading">The intelligence<br/>is connected.<br/><em>The decision<br/>is yours.</em></h2><p>Good investigations need more than a risk score. They need a clear view of the facts, and room for the people who understand them.</p><Link href="#experience-demo" onClick={()=>setActive(2)} className={styles.textLink}>Explore the investigation preview <ArrowUpRight size={18}/></Link></div>
          <div className={styles.principles}>
            <article><div className={styles.principleNumber}>01 <span>UNDERSTAND</span></div><h3>Know what raised the question.</h3><p>Keep the original activity in view. Examine the behavioural signal and the transactions behind it before deciding where to investigate.</p><div className={styles.evidenceStrip}><span className={styles.evidenceDot}/><span>Signal</span><ArrowRight size={14}/><span>Supporting activity</span></div></article>
            <article><div className={styles.principleNumber}>02 <span>INVESTIGATE</span></div><h3>Keep the context together.</h3><p>Move from an account to its connected activity without losing the thread. Give the next person a clear place to pick up the investigation.</p><div className={styles.evidenceStrip}><span className={styles.evidenceDot}/><span>Account</span><ArrowRight size={14}/><span>Relationships</span></div></article>
            <article><div className={styles.principleNumber}>03 <span>EXPLAIN</span></div><h3>Leave a decision others can follow.</h3><p>Bring the findings into a case and document the reasoning. Make the path from observation to outcome easier to review.</p><div className={styles.evidenceStrip}><span className={styles.evidenceDot}/><span>Evidence</span><ArrowRight size={14}/><span>Decision record</span></div></article>
          </div>
        </div>
      </div>
    </section>

    <section className={styles.closing} aria-labelledby="closing-heading">
      <div className={styles.container}>
        <div className={styles.sectionTop}><ChapterLabel number="06">See it for yourself</ChapterLabel><span className={styles.marginNote}>From the first signal to the final decision.</span></div>
        <Link href="#experience-demo" onClick={()=>setActive(0)} className={styles.invitation} aria-label="Explore the interactive SentinelFlow preview"><h2 id="closing-heading">Let the<br/><em>investigation begin.</em></h2><span className={styles.invitationArrow}><ArrowUpRight strokeWidth={1} aria-hidden="true"/></span></Link>
        <div className={styles.closingNote}><span>Explore the interactive preview</span><p>Every signal. Every connection.<br/>One clear perspective.</p><Link href="#experience-demo" onClick={()=>setActive(0)}>Start with monitoring <ArrowUpRight size={17}/></Link></div>
        <footer className={styles.footer}>
          <div className={styles.footerTop}><a href="#top" className={styles.brandSmall}><svg viewBox="0 0 44 26" aria-hidden="true"><path d="M2 3L22 13L42 3M2 23L22 13L42 23M2 3V23M42 3V23" fill="none" stroke="currentColor" strokeWidth="1.4"/></svg><span>Financial intelligence.<br/>Human judgement.</span></a><nav aria-label="Platform preview"><Link href="#experience-demo" onClick={()=>setActive(0)}>Monitoring</Link><Link href="#experience-demo" onClick={()=>setActive(1)}>Relationships</Link><Link href="#experience-demo" onClick={()=>setActive(2)}>Investigations</Link></nav><nav aria-label="Page navigation"><a href="#about">About</a><a href="#capabilities">The platform</a><a href="#top">Back to top ↑</a></nav></div>
          <div className={styles.wordmark} aria-hidden="true">SentinelFlow<span>®</span></div>
          <div className={styles.footerBottom}><span>© {new Date().getFullYear()} SentinelFlow</span><span>Clarity in every connection.</span><span>Istanbul, Türkiye</span></div>
        </footer>
      </div>
    </section>
  </div>
}
