import numeral from "numeral";

const formatNumber = (number) => {
  return numeral(number).format("0.0a"); // Formats number in shorthand (e.g., 1k, 1.5M)
};

export default formatNumber;
