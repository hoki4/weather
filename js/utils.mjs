export function getDayName(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { weekday: 'short' });
}

export function round(num) {
  return Math.round(num);
}

export function mpsToKph(mps) {
  return Math.round(mps * 3.6);
}

export function formatDegree(value) {
  return `${Math.round(value)}°`;
}
