import type { Contratto, Locale, Property, Tipologia } from '@/types'
import type { TKey } from '@/i18n'

/** Tiny classnames joiner — no need for a dependency at this size. */
export const cx = (...parts: Array<string | false | null | undefined>): string =>
  parts.filter(Boolean).join(' ')

const euro = (locale: Locale) =>
  new Intl.NumberFormat(locale === 'it' ? 'it-IT' : 'en-GB', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  })

/** `€ 230.000` in Italian, `€230,000` in English. */
export const formatPrice = (value: number, locale: Locale): string => euro(locale).format(value)

/** Rent carries a period suffix; sale prices do not. */
export function formatPriceWithPeriod(p: Property, locale: Locale, t: (k: TKey) => string): string {
  const base = formatPrice(p.prezzo, locale)
  return p.contratto === 'affitto' ? `${base} ${t('spec.mese')}` : base
}

export const formatNumber = (value: number, locale: Locale): string =>
  new Intl.NumberFormat(locale === 'it' ? 'it-IT' : 'en-GB').format(value)

export const formatArea = (value: number, locale: Locale): string =>
  `${formatNumber(value, locale)} m²`

export const tipologiaKey = (t: Tipologia): TKey => `type.${t}` as TKey
export const tipologiaPluralKey = (t: Tipologia): TKey => `type.${t}.plural` as TKey
export const contrattoKey = (c: Contratto): TKey => `contract.${c}` as TKey

export const TIPOLOGIE: Tipologia[] = ['appartamento', 'palazzo', 'villa', 'negozio']
export const CONTRATTI: Contratto[] = ['vendita', 'affitto']

/** "Appartamento in vendita, Via Ferrante 14, Caserta" — used for titles and alt text. */
export function propertyTitle(p: Property, locale: Locale, t: (k: TKey) => string): string {
  const tipo = t(tipologiaKey(p.tipologia))
  const contratto = locale === 'it' ? (p.contratto === 'vendita' ? 'in vendita' : 'in affitto') : t(contrattoKey(p.contratto)).toLowerCase()
  return `${tipo} ${contratto}, ${p.indirizzo}, ${p.comune}`
}

/** Descriptive alt text, per WCAG — never just "photo". */
export function photoAlt(
  p: Property,
  index: number,
  total: number,
  locale: Locale,
  t: (k: TKey) => string,
): string {
  const head = propertyTitle(p, locale, t)
  const n = locale === 'it' ? `foto ${index + 1} di ${total}` : `photo ${index + 1} of ${total}`
  return `${head[0].toUpperCase()}${head.slice(1)} — ${n}`
}

export const routeFor = (p: Property): string => `/immobili/${p.id}`

/** Deterministic shuffle-free pick of related stock: same comune first, then same type. */
export function relatedTo(p: Property, all: Property[], limit = 3): Property[] {
  const others = all.filter((x) => x.id !== p.id)
  const score = (x: Property) =>
    (x.comune === p.comune ? 2 : 0) +
    (x.tipologia === p.tipologia ? 2 : 0) +
    (x.contratto === p.contratto ? 1 : 0)
  return [...others].sort((a, b) => score(b) - score(a)).slice(0, limit)
}

export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches
