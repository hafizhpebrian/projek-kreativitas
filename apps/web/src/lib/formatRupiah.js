/**
 * Format a number or numeric string to Indonesian Rupiah format
 * e.g. 1500000 -> "Rp1.500.000"
 * @param {number|string} value
 * @returns {string}
 */
export function formatRupiah(value) {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(num)) return 'Rp0';
  return 'Rp' + Math.round(num).toLocaleString('id-ID');
}
