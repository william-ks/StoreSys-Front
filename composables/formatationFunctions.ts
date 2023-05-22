export const formatToPrice = (value: number) => {
  const newValue = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return newValue;
};

export const formatData = (value: any) => {
  const date = value.split("T")[0].split("-").reverse().join("/");
  return date;
};

export const limitText = (value: string) => {
  let text = value;
  if (text.length >= 12) {
    text = text.substring(0, 12).trim() + '...';
  }

  return text;
};
