"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { motion } from "motion/react"

export function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden bg-[#10151d] text-white">
      <Image
        src="/images/sentinelflow-istanbul-hero.png"
        alt="İstanbul finans merkezi ve Boğaz'ın gün batımında panoramik görünümü"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center saturate-[.82]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(31,39,54,.18)_0%,rgba(11,17,27,.15)_31%,rgba(7,11,18,.86)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,11,18,.42),transparent_58%)]" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-[1600px] flex-col justify-end px-5 pb-7 pt-32 sm:px-8 lg:px-[4.7vw]">
        <div className="grid items-end gap-10 pb-12 lg:grid-cols-[60%_40%] lg:gap-0 lg:pb-12">
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[720px] font-display text-[clamp(4rem,7vw,6rem)] font-light leading-[.97] tracking-[-0.055em] lg:relative lg:-top-[52px]"
          >
            See financial
            <br />risk before it
            <br /><span className="text-[#6fa4ff]">becomes loss.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-[455px] border-l border-[#df7158] pl-5 lg:relative lg:-top-5 lg:mb-0 lg:ml-1"
          >
            <p className="max-w-md text-[16px] leading-[1.35] text-white/90 sm:text-[18px]">
              SentinelFlow turns transaction streams into explainable financial intelligence, connecting suspicious behaviour, accounts and cases as they emerge.
            </p>
            <Link href="#about" className="group mt-8 inline-flex items-center gap-6 rounded-full border border-white/45 py-1.5 pl-6 pr-1.5 text-sm font-medium transition hover:bg-white hover:text-[#10151d]">
              LEARN MORE
              <span className="grid h-11 w-11 place-items-center rounded-full bg-[#df7158] text-white">
                <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </Link>
          </motion.div>
        </div>

        <div className="grid gap-3 border-t border-white/20 pt-5 text-[12px] text-white/65 sm:grid-cols-3 sm:text-[14px]">
          <span>hello@sentinelflow.ai</span>
          <span className="sm:text-center">Financial intelligence. Human judgement.</span>
          <span className="sm:text-right">All rights reserved 2026 ® SentinelFlow.</span>
        </div>
      </div>
    </section>
  )
}
