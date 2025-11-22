export const sortOptions = [
  { value: 0, label: 'Newest First' },
  { value: 1, label: 'Price High to Low' },
  { value: 2, label: 'Price Low to High' }
];

// Format prices as Kenyan Shillings
export const formatCurrency = value => {
  const amount = Number(value || 0);
  if (Number.isNaN(amount)) {
    return 'KSh 0';
  }
  return amount.toLocaleString('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
};
