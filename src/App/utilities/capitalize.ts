const capitalize = (data: string) => {
  const firstChar = data.charAt(0).toUpperCase();
  const rest = data.slice(1).replace(/_/g, ' ');

  return `${firstChar}${rest}`;
};

export default capitalize;
