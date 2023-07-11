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

export const limitText = (value: string, limit: number) => {
  let text = value;
  if (text.length >= limit) {
    text = text.substring(0, limit).trim() + "...";
  }

  return text;
};

export const dateToTimestamp = (date: string) => {
  const [day, mounth, year] = date.split("-").reverse();
  const formatedDate = new Date(`${mounth}/${day}/${year}`);
  return formatedDate.getTime();
}

export const timestampToDate = (timestamp: number) => {
  const formatedDate = new Date(timestamp);
  const day = formatedDate.getDate();
  const mounth = formatedDate.getMonth() + 1;
  const year = formatedDate.getFullYear();
  return `${day.toString().padStart(2, "0")}/${mounth
    .toString()
    .padStart(2, "0")}/${year}`;
}