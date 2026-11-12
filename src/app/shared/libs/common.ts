
export function getRandomEntry(array: any[]) {
    return array[Math.floor(Math.random() * array.length)];
}

export function sortObjectArray<T>(
  array: T[],
  sortField: keyof T
): T[] {
  return array.sort((a, b) => {
    const aVal = a[sortField];
    const bVal = b[sortField];

    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return aVal.localeCompare(bVal);
    }
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return aVal - bVal;
    }
    return 0;
  });
}

/**
 * Sets the page favicon, creating the <link rel="icon"> if it doesn't exist.
 * Returns the previous href (if any) so callers can restore it later.
 */
export function setFavicon(href: string, type = 'image/png'): string | null {
  let link = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }
  const previous = link.getAttribute('href');
  link.type = type;
  link.href = href;
  return previous;
}
