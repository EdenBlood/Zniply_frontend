export function getFirstLine(text: string): string {
  const firstLine = text.split('\n')[0].trim();
  return firstLine.slice(0, 48);
}

export function createId(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function dateFormat(date: string): string {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString('es-AR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
