export function price(str) {
  if (!str) return;
  let num = Number(str);
  return num.toFixed(2);
}
