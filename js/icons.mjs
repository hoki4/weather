const icons = {
  sun: `<svg width="46" height="46" viewBox="0 0 96 96">
    <circle cx="48" cy="48" r="18" fill="var(--icon-accent)"/>
    <g fill="var(--icon-accent)" opacity="0.7">
      <rect x="46" y="12" width="4" height="14" rx="2"/>
      <rect x="46" y="70" width="4" height="14" rx="2"/>
      <rect x="12" y="46" width="14" height="4" rx="2"/>
      <rect x="70" y="46" width="14" height="4" rx="2"/>
    </g>
  </svg>`,

  cloud: `<svg width="46" height="46" viewBox="0 0 96 96">
    <path fill="var(--icon-cloud)" d="M35 62h36a18 18 0 0 0 2-36A23 23 0 0 0 28 29a15 15 0 0 0 7 33Z"/>
  </svg>`,

  rain: `<svg width="46" height="46" viewBox="0 0 96 96">
    <path fill="var(--icon-cloud)" d="M35 60h36a18 18 0 0 0 2-36A23 23 0 0 0 28 27a15 15 0 0 0 7 33Z"/>
    <path fill="var(--icon-rain)" d="M33 70l-4 10h6l4-10h-6Zm18 0l-4 10h6l4-10h-6Zm18 0l-4 10h6l4-10h-6Z"/>
  </svg>`,

  thunder: `<svg width="46" height="46" viewBox="0 0 96 96">
    <path fill="var(--icon-cloud)" d="M35 69h36a18 18 0 0 0 2-36A23 23 0 0 0 28 36a15 15 0 0 0 7 33Z"/>
    <path fill="var(--icon-accent)" d="M46 70l-7 14h11l-6 12l18-20H51l6-6H46Z"/>
  </svg>`,

  snow: `<svg width="46" height="46" viewBox="0 0 96 96">
    <path fill="var(--icon-cloud)" d="M35 55h36a18 18 0 0 0 2-36A23 23 0 0 0 28 22a15 15 0 0 0 7 33Z"/>
    <circle cx="36" cy="72" r="4" fill="var(--icon-rain)"/>
    <circle cx="48" cy="78" r="4" fill="var(--icon-rain)"/>
    <circle cx="60" cy="72" r="4" fill="var(--icon-rain)"/>
  </svg>`,

  mist: `<svg width="46" height="46" viewBox="0 0 96 96">
    <g fill="var(--icon-cloud)">
      <rect x="20" y="36" width="56" height="6" rx="3"/>
      <rect x="26" y="48" width="44" height="6" rx="3"/>
      <rect x="20" y="60" width="56" height="6" rx="3"/>
    </g>
  </svg>`,
};

export function getIcon(condition, size = 46) {
  const c = condition.toLowerCase();
  let icon;

  if (c.includes('thunder')) icon = icons.thunder;
  else if (c.includes('rain') || c.includes('drizzle')) icon = icons.rain;
  else if (c.includes('snow')) icon = icons.snow;
  else if (c.includes('mist') || c.includes('fog') || c.includes('haze')) icon = icons.mist;
  else if (c.includes('cloud')) icon = icons.cloud;
  else if (c.includes('clear')) icon = icons.sun;
  else icon = icons.cloud;

  return size !== 46
    ? icon.replace(/width="46" height="46"/g, `width="${size}" height="${size}"`)
    : icon;
}
