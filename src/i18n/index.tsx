/**
 * Two-language UI dictionary (IT default, EN second) plus the provider/hook.
 *
 * Only interface chrome lives here. Listing prose is stored per-property on the
 * Property model, because it is the agency's own contractual copy.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Locale } from '@/types'

const STORAGE_KEY = 'contestabile.locale'

const dict = {
  it: {
    'nav.home': 'Home',
    'nav.properties': 'Immobili',
    'nav.about': 'Agenzia',
    'nav.contact': 'Contatti',
    'nav.menu': 'Menu',
    'nav.close': 'Chiudi',
    'nav.call': 'Chiama',
    'nav.whatsapp': 'WhatsApp',

    'lang.label': 'Lingua',
    'lang.it': 'Italiano',
    'lang.en': 'Inglese',

    'a11y.skip': 'Vai al contenuto',
    'a11y.scroll': 'Scorri per esplorare',

    'home.hero.eyebrow': 'Caserta e provincia · dal 1989',
    'home.hero.title.a': 'Trentasette anni',
    'home.hero.title.b': 'nella stessa strada.',
    'home.hero.sub':
      'Vendita e locazione a Caserta e in provincia. Ogni immobile visto di persona, misurato e raccontato per quello che è.',
    'home.hero.cta': 'Scopri gli immobili',
    'home.hero.cta2': 'Contattaci',

    'home.search.title': 'Cerca un immobile',
    'home.featured.eyebrow': 'Selezione',
    'home.featured.title': 'In evidenza',
    'home.featured.sub': 'Una selezione dal portafoglio corrente.',
    'home.featured.all': 'Vedi tutti gli immobili',
    'home.about.eyebrow': "L'agenzia",
    'home.about.more': 'La nostra storia',
    'home.stats.eyebrow': 'In cifre',
    'home.stats.note': 'Dati indicativi — in attesa di conferma dall’agenzia.',
    'home.stats.anni': 'Anni di attività',
    'home.stats.immobili': 'Immobili trattati',
    'home.stats.comuni': 'Comuni seguiti',
    'home.stats.soddisfazione': 'Clienti soddisfatti',
    'home.testimonials.eyebrow': 'Dicono di noi',
    'home.testimonials.title': 'Chi ci ha affidato una casa',
    'home.testimonials.note': 'Testimonianze di esempio, in attesa di quelle reali.',
    'home.cta.title': 'Parliamo della vostra casa.',
    'home.cta.sub':
      'Una valutazione, un sopralluogo, o solo un parere sul mercato di zona. Rispondiamo noi, non un centralino.',
    'home.cta.button': 'Scrivici',

    'props.hero.eyebrow': 'Portafoglio',
    'props.hero.title': 'Immobili',
    'props.hero.sub': 'Vendita e locazione a Caserta e in provincia.',
    'props.count.one': 'immobile',
    'props.count.other': 'immobili',
    'props.filters': 'Filtri',
    'props.filter.tipologia': 'Tipologia',
    'props.filter.contratto': 'Contratto',
    'props.filter.comune': 'Comune',
    'props.filter.prezzo': 'Prezzo',
    'props.filter.superficie': 'Superficie',
    'props.filter.all': 'Tutti',
    'props.filter.reset': 'Azzera filtri',
    'props.sort': 'Ordina',
    'props.sort.recent': 'Predefinito',
    'props.sort.priceAsc': 'Prezzo crescente',
    'props.sort.priceDesc': 'Prezzo decrescente',
    'props.sort.areaDesc': 'Superficie',
    'props.empty.title': 'Nessun immobile corrisponde ai filtri',
    'props.empty.sub': 'Provate ad allargare la ricerca, oppure chiamateci: molte trattative non sono pubblicate.',
    'props.view.grid': 'Griglia',
    'props.view.list': 'Elenco',

    'detail.back': 'Tutti gli immobili',
    'detail.gallery': 'Foto dell’immobile',
    'detail.gallery.open': 'Apri la galleria',
    'detail.gallery.close': 'Chiudi galleria',
    'detail.gallery.prev': 'Foto precedente',
    'detail.gallery.next': 'Foto successiva',
    'detail.gallery.of': 'di',
    'detail.description': 'Descrizione',
    'detail.details': 'Dettagli',
    'detail.consistenze': 'Consistenze',
    'detail.consistenze.desc': 'Descrizione',
    'detail.consistenze.mq': 'MQ',
    'detail.consistenze.mqc': 'MQ COMM.',
    'detail.consistenze.total': 'Totale',
    'detail.map': 'Mappa dell’immobile',
    'detail.map.via': 'Posizione della via.',
    'detail.map.approx': 'Posizione indicativa — la via non è mappata con precisione.',
    'detail.map.comune': 'Posizione indicativa sul comune.',
    'detail.form.title': 'Richiedi informazioni',
    'detail.form.sub': 'Vi rispondiamo di persona, in giornata.',
    'detail.notfound.title': 'Immobile non disponibile',
    'detail.notfound.sub': 'Questo annuncio non è più online, oppure l’indirizzo non è corretto.',
    'detail.related': 'Altri immobili',
    'detail.ref': 'Rif.',
    'detail.share': 'Condividi',
    'detail.copied': 'Link copiato',

    'spec.vani': 'Vani',
    'spec.camere': 'Camere',
    'spec.bagni': 'Bagni',
    'spec.mq': 'Superficie',
    'spec.mqc': 'Sup. commerciale',
    'spec.classe': 'Classe energetica',
    'spec.piano': 'Piano',
    'spec.riscaldamento': 'Riscaldamento',
    'spec.cucina': 'Cucina',
    'spec.soggiorno': 'Soggiorno',
    'spec.occupazione': 'Occupazione',
    'spec.condizioni': 'Condizioni',
    'spec.contesto': 'Contesto',
    'spec.spese': 'Spese condominiali',
    'spec.arredato': 'Arredato',
    'spec.condizionamento': 'Condizionamento',
    'spec.ascensore': 'Ascensore',
    'spec.mese': '/ mese',
    'spec.si': 'Sì',
    'spec.no': 'No',

    'type.appartamento': 'Appartamento',
    'type.palazzo': 'Palazzo',
    'type.villa': 'Villa',
    'type.negozio': 'Negozio',
    'type.appartamento.plural': 'Appartamenti',
    'type.palazzo.plural': 'Palazzi',
    'type.villa.plural': 'Ville',
    'type.negozio.plural': 'Negozi',
    'contract.vendita': 'Vendita',
    'contract.affitto': 'Affitto',
    'contract.vendita.short': 'In vendita',
    'contract.affitto.short': 'In affitto',

    'about.hero.eyebrow': 'Agenzia',
    'about.hero.title': 'Chi siamo',
    'about.pledge': 'Il nostro impegno',
    'about.agent.role': 'Titolare',
    'about.office': 'Lo studio',
    'about.hours': 'Orari',
    'about.hours.note': 'Orari indicativi — da confermare con l’agenzia.',
    'about.areas': 'Dove operiamo',
    'about.areas.sub': 'I comuni in cui abbiamo immobili in questo momento.',

    'contact.hero.eyebrow': 'Contatti',
    'contact.hero.title': 'Parliamone',
    'contact.hero.sub': 'Viale Alberto Beneduce 23, Caserta. Oppure un messaggio, se preferite.',
    'contact.direct': 'Contatti diretti',
    'contact.phone': 'Telefono',
    'contact.mobile': 'Cellulare',
    'contact.email': 'Email',
    'contact.address': 'Indirizzo',
    'contact.follow': 'Seguici su',
    'contact.map.title': 'Dove siamo',

    'form.name': 'Nominativo',
    'form.phone': 'Telefono',
    'form.email': 'Email',
    'form.message': 'Messaggio',
    'form.message.ph': 'Come possiamo aiutarvi?',
    'form.check': 'Verifica anti-spam',
    'form.check.q': 'Quanto fa',
    'form.check.ph': 'Risultato',
    'form.privacy': 'Inviando accettate che i dati siano usati per rispondervi.',
    'form.submit': 'Invia il messaggio',
    'form.sending': 'Invio in corso…',
    'form.sent.title': 'Messaggio inviato',
    'form.sent.sub': 'Grazie. Vi ricontattiamo al più presto.',
    'form.error': 'Invio non riuscito. Riprovate, oppure chiamateci allo 0823.305974.',
    'form.err.name': 'Inserite un nominativo.',
    'form.err.contact': 'Serve almeno un recapito: email o telefono.',
    'form.err.email': 'Indirizzo email non valido.',
    'form.err.message': 'Scrivete due righe sulla vostra richiesta.',
    'form.err.check': 'Risposta non corretta.',
    'form.unconfigured':
      'Modulo non ancora collegato: inserite l’ID Formspree in src/data/site.ts.',

    'footer.nav': 'Navigazione',
    'footer.contact': 'Contatti',
    'footer.legal': 'Informazioni',
    'footer.rights': 'Tutti i diritti riservati.',
    'footer.credits': 'Dati immobili aggiornati dal gestionale dell’agenzia.',
    'footer.privacy': 'Privacy',
    'footer.top': 'Torna su',
    'footer.developed': 'Sviluppato da',

    'nf.title': 'Pagina non trovata',
    'nf.sub': 'L’indirizzo non esiste, o non esiste più.',
    'nf.cta': 'Torna alla home',
  },

  en: {
    'nav.home': 'Home',
    'nav.properties': 'Properties',
    'nav.about': 'Agency',
    'nav.contact': 'Contact',
    'nav.menu': 'Menu',
    'nav.close': 'Close',
    'nav.call': 'Call',
    'nav.whatsapp': 'WhatsApp',

    'lang.label': 'Language',
    'lang.it': 'Italian',
    'lang.en': 'English',

    'a11y.skip': 'Skip to content',
    'a11y.scroll': 'Scroll to explore',

    'home.hero.eyebrow': 'Caserta and province · since 1989',
    'home.hero.title.a': 'Thirty-seven years',
    'home.hero.title.b': 'on the same street.',
    'home.hero.sub':
      'Sales and lettings in Caserta and its province. Every property seen in person, measured, and described for what it is.',
    'home.hero.cta': 'View properties',
    'home.hero.cta2': 'Get in touch',

    'home.search.title': 'Find a property',
    'home.featured.eyebrow': 'Selection',
    'home.featured.title': 'Featured',
    'home.featured.sub': 'A selection from the current portfolio.',
    'home.featured.all': 'See all properties',
    'home.about.eyebrow': 'The agency',
    'home.about.more': 'Our story',
    'home.stats.eyebrow': 'In numbers',
    'home.stats.note': 'Indicative figures — pending confirmation from the agency.',
    'home.stats.anni': 'Years trading',
    'home.stats.immobili': 'Properties handled',
    'home.stats.comuni': 'Towns covered',
    'home.stats.soddisfazione': 'Satisfied clients',
    'home.testimonials.eyebrow': 'Testimonials',
    'home.testimonials.title': 'People who trusted us with a home',
    'home.testimonials.note': 'Sample testimonials, pending the real ones.',
    'home.cta.title': 'Let’s talk about your property.',
    'home.cta.sub':
      'A valuation, a viewing, or simply a view on the local market. You reach us, not a call centre.',
    'home.cta.button': 'Write to us',

    'props.hero.eyebrow': 'Portfolio',
    'props.hero.title': 'Properties',
    'props.hero.sub': 'For sale and to let in Caserta and its province.',
    'props.count.one': 'property',
    'props.count.other': 'properties',
    'props.filters': 'Filters',
    'props.filter.tipologia': 'Type',
    'props.filter.contratto': 'Contract',
    'props.filter.comune': 'Town',
    'props.filter.prezzo': 'Price',
    'props.filter.superficie': 'Area',
    'props.filter.all': 'All',
    'props.filter.reset': 'Clear filters',
    'props.sort': 'Sort',
    'props.sort.recent': 'Default',
    'props.sort.priceAsc': 'Price, low to high',
    'props.sort.priceDesc': 'Price, high to low',
    'props.sort.areaDesc': 'Area',
    'props.empty.title': 'No property matches these filters',
    'props.empty.sub': 'Try widening the search, or call us — many instructions are never published.',
    'props.view.grid': 'Grid',
    'props.view.list': 'List',

    'detail.back': 'All properties',
    'detail.gallery': 'Property photographs',
    'detail.gallery.open': 'Open gallery',
    'detail.gallery.close': 'Close gallery',
    'detail.gallery.prev': 'Previous photograph',
    'detail.gallery.next': 'Next photograph',
    'detail.gallery.of': 'of',
    'detail.description': 'Description',
    'detail.details': 'Details',
    'detail.consistenze': 'Surface breakdown',
    'detail.consistenze.desc': 'Description',
    'detail.consistenze.mq': 'SQM',
    'detail.consistenze.mqc': 'COMM. SQM',
    'detail.consistenze.total': 'Total',
    'detail.map': 'Location',
    'detail.map.via': 'Street-level position.',
    'detail.map.approx': 'Indicative position — the street is not precisely mapped.',
    'detail.map.comune': 'Indicative position within the town.',
    'detail.form.title': 'Request information',
    'detail.form.sub': 'A person replies, usually the same day.',
    'detail.notfound.title': 'Property unavailable',
    'detail.notfound.sub': 'This listing is no longer online, or the address is wrong.',
    'detail.related': 'Other properties',
    'detail.ref': 'Ref.',
    'detail.share': 'Share',
    'detail.copied': 'Link copied',

    'spec.vani': 'Rooms',
    'spec.camere': 'Bedrooms',
    'spec.bagni': 'Bathrooms',
    'spec.mq': 'Area',
    'spec.mqc': 'Commercial area',
    'spec.classe': 'Energy rating',
    'spec.piano': 'Floor',
    'spec.riscaldamento': 'Heating',
    'spec.cucina': 'Kitchen',
    'spec.soggiorno': 'Reception',
    'spec.occupazione': 'Occupancy',
    'spec.condizioni': 'Condition',
    'spec.contesto': 'Setting',
    'spec.spese': 'Service charge',
    'spec.arredato': 'Furnished',
    'spec.condizionamento': 'Air conditioning',
    'spec.ascensore': 'Lift',
    'spec.mese': '/ month',
    'spec.si': 'Yes',
    'spec.no': 'No',

    'type.appartamento': 'Apartment',
    'type.palazzo': 'Palazzo',
    'type.villa': 'Villa',
    'type.negozio': 'Commercial unit',
    'type.appartamento.plural': 'Apartments',
    'type.palazzo.plural': 'Palazzi',
    'type.villa.plural': 'Villas',
    'type.negozio.plural': 'Commercial units',
    'contract.vendita': 'For sale',
    'contract.affitto': 'To let',
    'contract.vendita.short': 'For sale',
    'contract.affitto.short': 'To let',

    'about.hero.eyebrow': 'Agency',
    'about.hero.title': 'About us',
    'about.pledge': 'Our commitment',
    'about.agent.role': 'Principal',
    'about.office': 'The office',
    'about.hours': 'Opening hours',
    'about.hours.note': 'Indicative hours — to be confirmed with the agency.',
    'about.areas': 'Where we work',
    'about.areas.sub': 'The towns where we currently hold property.',

    'contact.hero.eyebrow': 'Contact',
    'contact.hero.title': 'Let’s talk',
    'contact.hero.sub': 'Viale Alberto Beneduce 23, Caserta. Or a message, if you prefer.',
    'contact.direct': 'Direct contacts',
    'contact.phone': 'Telephone',
    'contact.mobile': 'Mobile',
    'contact.email': 'Email',
    'contact.address': 'Address',
    'contact.follow': 'Follow us',
    'contact.map.title': 'Where we are',

    'form.name': 'Name',
    'form.phone': 'Telephone',
    'form.email': 'Email',
    'form.message': 'Message',
    'form.message.ph': 'How can we help?',
    'form.check': 'Anti-spam check',
    'form.check.q': 'What is',
    'form.check.ph': 'Answer',
    'form.privacy': 'By sending, you agree we may use these details to reply to you.',
    'form.submit': 'Send message',
    'form.sending': 'Sending…',
    'form.sent.title': 'Message sent',
    'form.sent.sub': 'Thank you. We will be in touch shortly.',
    'form.error': 'Could not send. Please try again, or call us on +39 0823 305974.',
    'form.err.name': 'Please enter your name.',
    'form.err.contact': 'We need at least one way to reach you: email or telephone.',
    'form.err.email': 'That email address is not valid.',
    'form.err.message': 'Please tell us a little about your enquiry.',
    'form.err.check': 'That answer is not correct.',
    'form.unconfigured': 'Form not yet connected: add the Formspree ID in src/data/site.ts.',

    'footer.nav': 'Navigation',
    'footer.contact': 'Contact',
    'footer.legal': 'Information',
    'footer.rights': 'All rights reserved.',
    'footer.credits': 'Property data maintained in the agency’s back office.',
    'footer.privacy': 'Privacy',
    'footer.top': 'Back to top',
    'footer.developed': 'Developed by',

    'nf.title': 'Page not found',
    'nf.sub': 'That address does not exist, or no longer does.',
    'nf.cta': 'Back to home',
  },
} as const

export type TKey = keyof (typeof dict)['it']

interface Ctx {
  locale: Locale
  setLocale: (l: Locale) => void
  t: (key: TKey) => string
}

const I18nContext = createContext<Ctx | null>(null)

function initialLocale(): Locale {
  if (typeof window === 'undefined') return 'it'
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved === 'it' || saved === 'en') return saved
  } catch {
    /* private mode / blocked storage — fall through to the default */
  }
  return 'it'
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale)

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l)
    try {
      window.localStorage.setItem(STORAGE_KEY, l)
    } catch {
      /* nothing to do — the choice simply will not persist */
    }
  }, [])

  const value = useMemo<Ctx>(
    () => ({ locale, setLocale, t: (key: TKey) => dict[locale][key] ?? dict.it[key] ?? key }),
    [locale, setLocale],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): Ctx {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used inside <I18nProvider>')
  return ctx
}
