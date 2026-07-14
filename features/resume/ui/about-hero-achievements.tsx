import { Award, BookOpen, Lightbulb } from 'lucide-react'
import type {
  AboutHeroAchievement,
  AboutHeroAchievementIcon,
} from '@/features/resume/application/about'

function AchievementIcon({ icon }: { icon: AboutHeroAchievementIcon }) {
  switch (icon) {
    case 'award':
      return <Award aria-hidden="true" size={22} strokeWidth={1.8} />
    case 'lightbulb':
      return <Lightbulb aria-hidden="true" size={22} strokeWidth={1.8} />
    case 'book-open':
      return <BookOpen aria-hidden="true" size={22} strokeWidth={1.8} />
  }
}

type AboutHeroAchievementsProps = {
  achievements: AboutHeroAchievement[]
  className?: string
}

/**
 * Compact KPI row under the hero intro: fixed-width columns forming one
 * tight group, each a bold olive figure next to its icon and, tightly
 * beneath it, a muted label indented to start under the figure.
 */
export function AboutHeroAchievements({
  achievements,
  className = '',
}: AboutHeroAchievementsProps) {
  return (
    <ul
      aria-label="Distinctions et chiffres clés"
      className={`grid grid-cols-3 gap-4 lg:flex lg:gap-4 ${className}`}
    >
      {achievements.map((achievement) => (
        <li key={achievement.id} className="lg:w-40 lg:shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="text-site-accent shrink-0">
              <AchievementIcon icon={achievement.icon} />
            </span>
            <span className="font-identity text-site-accent text-xl font-bold tracking-tight">
              {achievement.value}
            </span>
          </div>
          <p className="text-site-foreground/50 mt-0 line-clamp-2 text-xs leading-snug lg:pl-8">
            {achievement.label}
          </p>
        </li>
      ))}
    </ul>
  )
}
