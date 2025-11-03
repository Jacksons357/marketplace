export function maskPhone(value: string): string {
  if (!value) return "";

  const numbers = value.replace(/\D/g, "");
  if (!numbers) return "";

  const val = numbers.slice(0, 11);

  if (val.length <= 2) {
    return `(${val}`;
  }
  if (val.length <= 6) {
    return `(${val.slice(0, 2)}) ${val.slice(2)}`;
  }
  if (val.length <= 10) {
    return `(${val.slice(0, 2)}) ${val.slice(2, 6)}-${val.slice(6)}`;
  }

  return `(${val.slice(0, 2)}) ${val.slice(2, 7)}-${val.slice(7, 11)}`;
}