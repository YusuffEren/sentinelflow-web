"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import styles from "./Navbar.module.css"

const LINKS = [
  { href: "#platform", label: "Platform" },
  { href: "#capabilities", label: "Capabilities" },
  { href: "#infrastructure", label: "Perspective" },
  { href: "#about", label: "About" },
]

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!menuOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false)
        toggleRef.current?.focus()
      }
    }
    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setMenuOpen(false)
    }
    const onFocusIn = (event: FocusEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setMenuOpen(false)
    }
    const desktop = window.matchMedia("(min-width: 1060px)")
    const onBreakpointChange = () => {
      if (desktop.matches) setMenuOpen(false)
    }

    document.addEventListener("keydown", onKeyDown)
    document.addEventListener("pointerdown", onPointerDown)
    document.addEventListener("focusin", onFocusIn)
    desktop.addEventListener("change", onBreakpointChange)
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.removeEventListener("pointerdown", onPointerDown)
      document.removeEventListener("focusin", onFocusIn)
      desktop.removeEventListener("change", onBreakpointChange)
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header ref={headerRef} className={styles.header} data-menu-open={menuOpen}>
      <div className={styles.frame}>
        <Link href="/" className={styles.brand} aria-label="SentinelFlow home" onClick={closeMenu}>
          <svg className={styles.mark} viewBox="0 0 32 32" aria-hidden="true">
            <path d="M3 7 16 14.5 29 7M3 25 16 17.5 29 25M3 7v18M29 7v18" />
          </svg>
          <span>SentinelFlow<span className={styles.trademark}>®</span></span>
        </Link>

        <nav className={styles.desktopNav} aria-label="Main navigation">
          {LINKS.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}
        </nav>

        <a href="#experience-demo" className={styles.cta} onClick={closeMenu}>
          <span>Explore platform</span>
          <ArrowUpRight size={17} strokeWidth={1.5} aria-hidden="true" />
        </a>

        <button
          ref={toggleRef}
          type="button"
          className={styles.menuToggle}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setMenuOpen(open => !open)}
        >
          <span className={styles.menuLabel}>{menuOpen ? "Close" : "Menu"}</span>
          <span className={styles.menuIcon} aria-hidden="true"><span /><span /></span>
        </button>
      </div>

      <nav id="mobile-navigation" className={styles.mobileNav} aria-label="Mobile navigation" hidden={!menuOpen}>
        <span className={styles.mobileEyebrow}>A clearer perspective</span>
        {LINKS.map((link, index) => (
          <a key={link.href} href={link.href} onClick={closeMenu}>
            <span className={styles.linkNumber}>0{index + 1}</span>
            <span>{link.label}</span>
            <ArrowUpRight size={20} strokeWidth={1.25} aria-hidden="true" />
          </a>
        ))}
        <a href="#experience-demo" className={styles.mobileCta} onClick={closeMenu}>
          <span>Explore platform</span><ArrowUpRight size={18} aria-hidden="true" />
        </a>
      </nav>
    </header>
  )
}
