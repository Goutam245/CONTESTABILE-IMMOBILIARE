/**
 * Footer.
 *
 * Three columns that hold their own weight: the mark and the agency's line, the
 * navigation, and the real contact details. Column headings are set as ruled
 * labels rather than plain bold text so they read as designed structure instead
 * of default list headers.
 */
import { Link } from 'react-router-dom'
import Logo from './Logo'
import LanguageSwitcher from './LanguageSwitcher'
import { useI18n, type TKey } from '@/i18n'
import { agency, yearsTrading } from '@/data/site'
import { scrollToTop } from '@/lib/smoothScroll'
import { cx } from '@/lib/utils'

const LINKS: { to: string; key: TKey }[] = [
  { to: '/', key: 'nav.home' },
  { to: '/immobili', key: 'nav.properties' },
  { to: '/agenzia', key: 'nav.about' },
  { to: '/contatti', key: 'nav.contact' },
]

const DEVELOPER = 'https://onlinepertutti.com/'

/** Ruled column heading — a terracotta tick, then tracked caps. */
function ColHead({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-bone/55">
      <span aria-hidden className="h-[2px] w-5 shrink-0 bg-terra-500" />
      {children}
    </h2>
  )
}

function Social({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-white/8 text-bone/80 ring-1 ring-inset ring-white/12 transition-colors duration-300 hover:bg-brand-500 hover:text-white hover:ring-brand-500"
    >
      {children}
    </a>
  )
}

export default function Footer() {
  const { t, locale } = useI18n()
  const year = new Date().getFullYear()

  const contactLink = 'link-underline w-fit text-bone/80 transition-colors hover:text-bone'

  return (
    <footer className="bg-ink text-bone">
      <div className="shell py-16 sm:py-20 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-[1.5fr_1fr_1.3fr] lg:gap-16 xl:gap-24">
          <div>
            <Logo variant="invert" className="h-11" linkTo="/" />
            <p className="mt-7 max-w-sm font-display text-[20px] font-light italic leading-snug text-bone/85">
              {agency.tagline[locale]}
            </p>
            <p className="mt-6 text-[13.5px] leading-relaxed text-bone/55">
              {locale === 'it'
                ? `${yearsTrading()} anni di attività a Caserta e in provincia.`
                : `${yearsTrading()} years serving Caserta and its province.`}
            </p>
          </div>

          <nav aria-label={t('footer.nav')}>
            <ColHead>{t('footer.nav')}</ColHead>
            <ul className="mt-6 space-y-3.5">
              {LINKS.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="link-underline text-[15px] text-bone/80 transition-colors hover:text-bone"
                  >
                    {t(l.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <ColHead>{t('footer.contact')}</ColHead>
            <address className="mt-6 space-y-5 text-[15px] not-italic">
              <p className="leading-relaxed text-bone/80">
                {agency.address.street}
                <br />
                {agency.address.postcode} {agency.address.city} ({agency.address.province})
              </p>
              <span className="flex flex-col gap-2">
                <a href={agency.phone.href} className={contactLink}>
                  {agency.phone.label}
                </a>
                <a href={agency.mobile.href} className={contactLink}>
                  {agency.mobile.label}
                </a>
                <a href={`mailto:${agency.email}`} className={cx(contactLink, 'break-all')}>
                  {agency.email}
                </a>
              </span>
            </address>

            <div className="mt-7 flex items-center gap-3">
              <Social href={agency.social.facebook} label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="h-4 w-4">
                  <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h3l1-3h-4v-2c0-.55.45-1 1-1Z" />
                </svg>
              </Social>
              <Social
                href={agency.whatsapp.href}
                label={`${t('nav.whatsapp')} ${agency.whatsapp.label}`}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="h-4 w-4">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm4.52 12.15c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.53.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.43.06-.66.31-.22.25-.87.85-.87 2.07 0 1.22.89 2.4 1.02 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.22-.16-.47-.28Z" />
                </svg>
              </Social>
            </div>
          </div>
        </div>

        <div className="mt-16 h-px w-full bg-bone/12" />

        <div className="mt-7 flex flex-col gap-5 text-[12.5px] text-bone/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {agency.legalName}. {t('footer.rights')}
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <LanguageSwitcher tone="dark" />
            <button
              type="button"
              onClick={() => scrollToTop(false)}
              className="link-underline text-[12px] uppercase tracking-[0.14em] transition-colors hover:text-bone"
            >
              {t('footer.top')}
            </button>
          </div>
        </div>

        {/* Build credit — deliberately quiet, well under the agency's own marks. */}
        <p className="mt-6 text-[11.5px] text-bone/30">
          {t('footer.developed')}{' '}
          <a
            href={DEVELOPER}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline text-bone/45 transition-colors hover:text-bone/75"
          >
            Online Per Tutti
          </a>
        </p>
      </div>
    </footer>
  )
}
