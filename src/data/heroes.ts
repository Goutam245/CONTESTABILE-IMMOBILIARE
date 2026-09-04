/**
 * Hero art direction.
 *
 * The agency shoots its own listings, so every hero is a real photograph from a
 * real instruction rather than stock. Chosen for subject variety — landscape,
 * courtyard, interior, stonework — and for having somewhere quiet to set type.
 */
import { photosFor } from '@/lib/photos'
import type { PhotoRendition } from '@/types'

const HEROES = {
  /**
   * PLACEHOLDER — swap for the client's chosen photography.
   * The flagship Piazza Vanvitelli building, in Caserta itself: architecture
   * rather than landscape, so the hero reads as real estate at a glance, with
   * open sky behind the headline. It replaced a hillside panorama that looked
   * like a nature shot.
   */
  home: { property: 'av-vanvitelli-330', photo: 'av-vanvitelli-330-01' },
  /** Stone courtyard arch of the 1770 building. */
  properties: { property: 'pv-municipio-110', photo: 'pv-municipio-110-02' },
  /** Terracotta floors and an arch — the heritage stock the agency is known for. */
  about: { property: 'pv-municipio-110', photo: 'pv-municipio-110-17' },
  /** Tuff walls and an exposed beam, Marzano Appio. */
  contact: { property: 'pv-finelli-55', photo: 'pv-finelli-55-16' },
} as const

export type HeroKey = keyof typeof HEROES

export function heroPhoto(key: HeroKey): PhotoRendition | undefined {
  const { property, photo } = HEROES[key]
  return photosFor(property).find((p) => p.id === photo)
}

/** Descriptive alt text for each hero, in both languages. */
export const heroAlt: Record<HeroKey, { it: string; en: string }> = {
  home: {
    it: 'Palazzo signorile in Piazza Vanvitelli, Caserta — facciata con balconi',
    en: 'Fine residential building on Piazza Vanvitelli, Caserta — balconied facade',
  },
  properties: {
    it: 'Cortile interno con arco in pietra di uno stabile storico a Marzano Appio',
    en: 'Inner courtyard with a stone arch in a historic building in Marzano Appio',
  },
  about: {
    it: 'Sala con pavimento in cotto, arco e arredi d’epoca in uno stabile del 1770 a Marzano Appio',
    en: 'Room with terracotta floor, arch and period furniture in a 1770 building in Marzano Appio',
  },
  contact: {
    it: 'Ambiente con pareti in pietra di tufo e travi a vista a Marzano Appio',
    en: 'Room with tuff stone walls and exposed beams in Marzano Appio',
  },
}
