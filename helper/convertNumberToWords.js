function convertNumberToWords(amount) {
  var ones = [
    "",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ];
  var tens = [
    "",
    "",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];

  var num = parseFloat(amount).toFixed(2);
  var rupees = Math.floor(num);
  var paise = Math.round((num - rupees) * 100);

  var rupeesWords = convertToWords(rupees);
  var paiseWords = convertToWords(paise);

  var result = rupeesWords + " rupees";

  if (paise > 0) {
    result += " and " + paiseWords + " paise";
  }

  result += " only";

  return result;

  function convertToWords(num) {
    if (num < 20) {
      return ones[num];
    } else if (num < 100) {
      return tens[Math.floor(num / 10)] + " " + convertToWords(num % 10);
    } else if (num < 1000) {
      return (
        ones[Math.floor(num / 100)] + " hundred " + convertToWords(num % 100)
      );
    } else if (num < 100000) {
      return (
        convertToWords(Math.floor(num / 1000)) +
        " thousand " +
        convertToWords(num % 1000)
      );
    } else if (num < 10000000) {
      return (
        convertToWords(Math.floor(num / 100000)) +
        " lakh " +
        convertToWords(num % 100000)
      );
    } else {
      return (
        convertToWords(Math.floor(num / 10000000)) +
        " crore " +
        convertToWords(num % 10000000)
      );
    }
  }
}

module.exports = convertNumberToWords;
