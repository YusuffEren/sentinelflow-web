import { Navbar } from "@/components/landing/Navbar"
import { Hero } from "@/components/landing/Hero"
import { EditorialSections } from "@/components/landing/EditorialSections"

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <EditorialSections />
      </main>
    </>
  )
}
