const getMonthBySlug = (string: string) => {
  const splitedText = string.split("/");

  return splitedText[0];
};

export default getMonthBySlug;
