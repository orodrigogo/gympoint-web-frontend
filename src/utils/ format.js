export const { format: formatPrice } = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL"
});

export const decimalMask = value => {
  return value.replace(/[^0-9,]/g, "");
};

export const numverMask = value => {
  return value.replace(/[^0-9]/g, "").replace(/^0+/, "");
};
