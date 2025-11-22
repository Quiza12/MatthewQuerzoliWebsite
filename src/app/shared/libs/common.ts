
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