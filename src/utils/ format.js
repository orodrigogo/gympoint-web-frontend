export const { format: formatPrice } = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL"
});

export const decimalMask = value => {
  return value.replace(/[^0-9,]/g, "");
};

export const numberMask = value => {
  return value.replace(/[^0-9]/g, "").replace(/^0+/, "");
};

export const moneyMask = value => {
  return value.replace(/[^\d,]+/g, "");
};
