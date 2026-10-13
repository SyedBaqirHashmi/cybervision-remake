/** Adapted from Skiper UI's skiper41 (https://skiper-ui.com) — stripped of its
 * demo wrapper and retargeted to the brand's obsidian background by default. */
export function ProgressiveBlur({
  className = '',
  backgroundColor = '#0b0a08',
  position = 'top',
  height = '96px',
  blurAmount = '6px'
}: {
  className?: string;
  backgroundColor?: string;
  position?: 'top' | 'bottom';
  height?: string;
  blurAmount?: string;
}) {
  const isTop = position === 'top';
  return <div
    aria-hidden="true"
    className={`pointer-events-none absolute left-0 z-10 w-full select-none ${className}`}
    style={{
      [isTop ? 'top' : 'bottom']: 0,
      height,
      background: isTop
        ? `linear-gradient(to top, transparent, ${backgroundColor})`
        : `linear-gradient(to bottom, transparent, ${backgroundColor})`,
      maskImage: isTop
        ? `linear-gradient(to bottom, ${backgroundColor} 50%, transparent)`
        : `linear-gradient(to top, ${backgroundColor} 50%, transparent)`,
      WebkitBackdropFilter: `blur(${blurAmount})`,
      backdropFilter: `blur(${blurAmount})`
    }}
  />;
}
