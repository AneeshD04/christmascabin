import { HolidayScene } from "@/components/holiday-scene"
import { BackgroundMusic } from "@/components/background-music"
import { CelebrationButton } from "@/components/celebration-button"

export default function HomePage() {
  return (
    <>
      <BackgroundMusic />
      <HolidayScene />
      <CelebrationButton />
    </>
  )
}
