/** Currency and number formatting shared by server and client components. */

export function formatINR(n: number): string {
  return `₹${n.toLocaleString("en-IN")}`;
}

export function formatCount(n: number): string {
  return n.toLocaleString("en-IN");
}
