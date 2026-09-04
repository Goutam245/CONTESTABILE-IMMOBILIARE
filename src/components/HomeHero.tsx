/**
 * The home page's full-viewport opening.
 *
 * The photograph carries this section; the motion under it is deliberately
 * minimal. An earlier version set the headline line by line and ran a warm
 * bloom on an infinite loop, which meant three things moving at once while
 * someone was still trying to read the first sentence. Now: the shared
 * <HeroMedia> bed drifts slowly on scroll, the copy arrives as one calm block
 * behind the logo intro, and nothing loops.
 */
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import HeroMedia from './HeroMedia'
import { ButtonLink, ArrowGlyph } from './primitives'
import { heroAlt, heroPhoto } from '@/data/heroes'
import { agency, yearsTrading } from '@/data/site'
import { useI18n } from '@/i18n'

const easing = [0.16, 1, 0.3, 1] as const

/** One shared entrance; children only vary the delay slightly. */
const rise = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function HomeHero() {
  const { t, locale } = useI18n()

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink">
      <HeroMedia photo={heroPhoto('home')} alt={heroAlt.home[locale]} strength={16} />

      {/* The copy scrolls away with the section. It used to be tied to a
          scroll-linked fade that reached near-zero opacity while the buttons
          and tagline were still centred on screen — unreadable content that had
          not gone anywhere. Nothing here fades on scroll now. */}
      <motion.div
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.07, delayChildren: 0.1 }}
        className="shell relative w-full pb-16 pt-[calc(var(--nav-h)+3rem)] sm:pb-20"
      >
        <motion.p
          variants={rise}
          transition={{ duration: 0.7, ease: easing }}
          className="eyebrow eyebrow-invert"
        >
          {t('home.hero.eyebrow')}
        </motion.p>

        <motion.h1
          variants={rise}
          transition={{ duration: 0.8, ease: easing }}
          className="mt-5 max-w-5xl text-[clamp(2.7rem,7.6vw,6.4rem)] leading-[0.98] tracking-[-0.03em] text-bone"
        >
          {t('home.hero.title.a')}{' '}
          <em className="font-light italic">{t('home.hero.title.b')}</em>
        </motion.h1>

        <motion.p
          variants={rise}
          transition={{ duration: 0.7, ease: easing }}
          className="mt-6 max-w-xl text-[15.5px] leading-relaxed text-bone/90 sm:text-[17px]"
        >
          {t('home.hero.sub')}
        </motion.p>

        <motion.div
          variants={rise}
          transition={{ duration: 0.7, ease: easing }}
          className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4"
        >
          <ButtonLink to="/immobili" variant="accent" size="lg">
            {t('home.hero.cta')}
            <ArrowGlyph />
          </ButtonLink>
          <Link
            to="/contatti"
            className="group inline-flex items-center gap-3 text-[12.5px] font-medium uppercase tracking-[0.15em] text-bone/90 transition-colors hover:text-bone"
          >
            {t('home.hero.cta2')}
            <ArrowGlyph />
          </Link>
        </motion.div>

        <motion.div
          variants={rise}
          transition={{ duration: 0.7, ease: easing }}
          className="mt-12 flex items-end justify-between gap-6 border-t border-bone/20 pt-5"
        >
          <p className="max-w-xs font-display text-[15px] font-light italic leading-snug text-bone/75">
            {agency.tagline[locale]}
          </p>

          <div className="flex items-center gap-4">
            <span className="hidden text-[11px] uppercase tracking-eyebrow text-bone/70 sm:inline">
              {t('a11y.scroll')}
            </span>
            <span
              aria-hidden
              className="relative block h-11 w-[18px] rounded-full border border-bone/40"
            >
              <span className="absolute left-1/2 top-2 h-1.5 w-px -translate-x-1/2 animate-scroll-cue bg-bone/90" />
            </span>
          </div>
        </motion.div>

        <span className="sr-only">
          {locale === 'it'
            ? `Agenzia attiva dal ${agency.founded}, ${yearsTrading()} anni di attività.`
            : `Trading since ${agency.founded}, ${yearsTrading()} years in business.`}
        </span>
      </motion.div>
    </section>
  )
}
