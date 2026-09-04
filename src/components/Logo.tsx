/**
 * The agency mark, used exactly as supplied — never redrawn.
 *
 * `logo.png` is the full lockup with the scan's white paper knocked out, so it
 * sits correctly on both the bone and ink sections. On dark ground the green
 * outline of the wordmark loses contrast, so the `invert` variant shows the
 * house icon beside typeset wordmark instead of tinting the artwork.
 */
import { Link } from 'react-router-dom'
import { cx } from '@/lib/utils'
import { agency } from '@/data/site'
import lockup from '@/assets/logo.png'
import icon from '@/assets/logo-icon.png'

export default function Logo({
  variant = 'full',
  className,
  linkTo = '/',
}: {
  variant?: 'full' | 'invert' | 'icon'
  className?: string
  linkTo?: string | null
}) {
  // Each variant sizes its artwork with `h-full`, so every wrapper between the
  // caller's `className` height and the <img> must also carry h-full — without
  // it the image falls back to its intrinsic 335px.
  const inner =
    variant === 'icon' ? (
      <img src={icon} alt={agency.legalName} className="h-full w-auto" width={512} height={335} />
    ) : variant === 'invert' ? (
      <span className="flex h-full items-center gap-3">
        <img
          src={icon}
          alt=""
          aria-hidden
          className="h-full w-auto"
          width={512}
          height={335}
        />
        <span className="flex flex-col leading-none">
          <span className="font-display text-[clamp(1rem,1.5vw,1.2rem)] font-normal uppercase tracking-[0.06em] text-bone">
            Contestabile
          </span>
          <span className="mt-[3px] font-sans text-[10px] font-medium uppercase tracking-[0.28em] text-terra-400">
            Immobiliare
          </span>
        </span>
      </span>
    ) : (
      <img
        src={lockup}
        alt={agency.legalName}
        className="h-full w-auto"
        width={900}
        height={257}
      />
    )

  const cls = cx('inline-flex items-center', className)

  if (!linkTo) return <span className={cls}>{inner}</span>

  return (
    <Link to={linkTo} className={cls} aria-label={`${agency.legalName} — home`}>
      {inner}
    </Link>
  )
}
