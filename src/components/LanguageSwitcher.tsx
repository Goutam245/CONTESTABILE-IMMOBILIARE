/**
 * IT / EN switch, styled as a real segmented control rather than two bare
 * words — it sits in the header beside the WhatsApp button and has to read as
 * deliberate UI at a glance, on both the light and dark header states.
 *
 * The old site offered six flags but only ever had Italian behind them. Two
 * languages that are actually written beat six that are not; the list is data,
 * so adding FR/DE/ES/RU later is a one-line change.
 */
import { useI18n } from '@/i18n'
import type { Locale } from '@/types'
import { cx } from '@/lib/utils'

const LOCALES: { code: Locale; short: string; labelKey: 'lang.it' | 'lang.en' }[] = [
  { code: 'it', short: 'IT', labelKey: 'lang.it' },
  { code: 'en', short: 'EN', labelKey: 'lang.en' },
]

export default function LanguageSwitcher({
  tone = 'light',
  className,
}: {
  /** `light` sits on bone, `dark` on ink or over a photo scrim. */
  tone?: 'light' | 'dark'
  className?: string
}) {
  const { locale, setLocale, t } = useI18n()
  const dark = tone === 'dark'

  return (
    <div
      role="group"
      aria-label={t('lang.label')}
      className={cx(
        'inline-flex items-center gap-0.5 rounded-full p-0.5',
        dark ? 'bg-white/15 ring-1 ring-inset ring-white/20' : 'bg-ink/6 ring-1 ring-inset ring-ink/10',
        className,
      )}
    >
      {LOCALES.map((l) => {
        const active = locale === l.code
        return (
          <button
            key={l.code}
            type="button"
            onClick={() => setLocale(l.code)}
            aria-current={active ? 'true' : undefined}
            aria-label={t(l.labelKey)}
            className={cx(
              'rounded-full px-2.5 py-1.5 text-[11.5px] font-semibold leading-none tracking-[0.1em]',
              'transition-colors duration-300 ease-cinematic',
              active
                ? dark
                  ? 'bg-bone text-ink'
                  : 'bg-ink text-bone'
                : dark
                  ? 'text-bone/75 hover:text-bone'
                  : 'text-ink-muted hover:text-ink',
            )}
          >
            {l.short}
          </button>
        )
      })}
    </div>
  )
}
