"use client"

import { useEffect, useRef, useState, type CSSProperties } from "react"
import Image from "next/image"
import styles from "./PlatformAboutScene.module.css"

const AUDIENCES = ["Digital Banks", "Payment Platforms", "FinTech Companies", "AML & Compliance Teams"]
const ABOUT_COPY = "SentinelFlow gives financial teams one clear view of transaction risk. It connects behavioural signals, account relationships and investigation evidence in real time—so every decision can be explained, reviewed and defended."
const ABOUT_WORDS = ABOUT_COPY.split(" ")

const clamp = (value: number) => Math.min(1, Math.max(0, value))
const phase = (value: number, from: number, to: number) => clamp((value - from) / (to - from))
const mix = (from: number[], to: number[], amount: number) => from.map((channel, index) => Math.round(channel + (to[index] - channel) * amount)).join(" ")

function AudienceMark({ name, index }: { name: string; index: number }) {
  return <div className={styles.audienceMark}>
    <span className={styles.mark} aria-hidden="true">
      {index % 4 === 0 && <><i className={styles.circle}/><i className={styles.dot}/></>}
      {index % 4 === 1 && <><i className={styles.diamond}/><i className={styles.diamondOuter}/></>}
      {index % 4 === 2 && <><i className={styles.bars}/><i className={styles.diagonal}/></>}
      {index % 4 === 3 && <><i className={styles.square}/><i className={styles.squareInner}/></>}
    </span>
    <span>{name}</span>
  </div>
}

/** The same scroll timeline reveals the words, then turns the whole scene into paper. */
export function PlatformAboutScene() {
  const sceneRef = useRef<HTMLElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const [scene, setScene] = useState({ scroll: 0, viewport: 800, height: 1728, reduced: false })

  useEffect(() => {
    let frame = 0
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => {
      const element = sceneRef.current
      const about = aboutRef.current
      if (!element || !about) return
      const viewport = window.innerHeight
      const start = element.getBoundingClientRect().top + window.scrollY
      // A tall paragraph is allowed to leave the sticky stage naturally, never clipped to a viewport.
      const height = Math.max(viewport * 2.16, about.offsetHeight + viewport * .92)
      setScene({ scroll: Math.max(0, window.scrollY - start), viewport, height, reduced: preference.matches })
    }
    const schedule = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        update()
      })
    }
    const observer = new ResizeObserver(schedule)
    if (aboutRef.current) observer.observe(aboutRef.current)
    update()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    preference.addEventListener("change", schedule)
    document.fonts.ready.then(schedule)
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
      preference.removeEventListener("change", schedule)
    }
  }, [])

  const progress = scene.scroll / scene.viewport
  const audienceExit = phase(progress, .2, .5)
  const aboutEnter = phase(progress, .03, .56)
  const aboutFade = phase(progress, .03, .3)
  const visualEnter = phase(progress, .12, .56)
  const copyEnter = phase(progress, .12, .58)
  const textReveal = scene.reduced ? 1 : phase(progress, .24, .94)
  const revealHead = -1 + textReveal * (ABOUT_WORDS.length + 4)
  // Trigger a timed colour handoff so stopping the scroll never leaves grey text on grey.
  const inversion = scene.reduced || progress >= 1 ? 1 : 0
  const palette = {
    "--scene-paper": `rgb(${mix([16, 19, 25], [239, 238, 234], inversion)})`,
    "--scene-ink": `rgb(${mix([255, 255, 255], [23, 27, 35], inversion)})`,
    "--scene-muted": `rgb(${mix([130, 133, 139], [105, 107, 112], inversion)})`,
    "--scene-rule": `rgb(${mix([58, 61, 67], [201, 202, 201], inversion)})`,
    height: scene.reduced ? "auto" : `${scene.height}px`,
  } as CSSProperties

  return <section ref={sceneRef} id="platform" data-palette={inversion ? "light" : "dark"} className={styles.scene} style={palette}>
    <span id="about" className={styles.anchor} style={{ top: scene.viewport }} aria-hidden="true"/>
    <div className={styles.stage}>
      <div className={styles.audience} style={{ opacity: 1 - audienceExit, transform: `translateY(${-54 * audienceExit}px) scale(${1 - .035 * audienceExit})` }}>
        <div className={styles.audienceGrid}>
          <div className={styles.index}><span>(01)</span><p>Built for financial operations</p></div>
          <div className={styles.marqueeWindow}>
            <div className={styles.marquee}>
              {[0, 1].map(copy => <div key={copy} className={styles.marqueeGroup} aria-hidden={copy === 1 ? true : undefined}>
                {AUDIENCES.map((name, index) => <AudienceMark key={name} name={name} index={index}/>)}
              </div>)}
            </div>
          </div>
        </div>
      </div>

      <div ref={aboutRef} className={styles.about} style={{ opacity: .32 + .68 * aboutFade, transform: `translateY(${scene.viewport * .62 * (1 - aboutEnter)}px)` }}>
        <aside className={styles.sidebar}>
          <div className={styles.index}><span>(02)</span><p>About SentinelFlow</p></div>
          <div className={styles.visual} style={{ transform: `scale(${.82 + .18 * visualEnter})` }}>
            <div className={styles.image}>
              <Image src="/images/sentinelflow-istanbul-hero.png" alt="Istanbul financial district" fill sizes="(min-width: 1024px) 250px, 0px" className={styles.photograph}/>
              <span/>
            </div>
            <p>Built to turn complex financial activity into clear, defensible investigation decisions.</p>
          </div>
        </aside>
        <div className={styles.copy} style={{ opacity: .55 + .45 * copyEnter, transform: `translateY(${72 * (1 - copyEnter)}px)` }}>
          <p>{ABOUT_WORDS.map((word, index) => {
            const intensity = clamp((revealHead - index) / 2.4)
            const darkChannel = Math.round(66 + 189 * intensity)
            const lightColor = [153, 154, 155].map((channel, colorIndex) => Math.round(channel + ([23, 27, 35][colorIndex] - channel) * intensity))
            return <span key={`${word}-${index}`} data-reveal-word={index} style={{ color: `rgb(${mix([darkChannel, darkChannel, darkChannel], lightColor, inversion)})` }}>{word}{index < ABOUT_WORDS.length - 1 ? " " : ""}</span>
          })}</p>
          <div className={styles.signature} aria-hidden="true"><span>Financial intelligence.</span><span>Human judgement.</span><span className={styles.signatureLine}/></div>
        </div>
      </div>
    </div>
  </section>
}
