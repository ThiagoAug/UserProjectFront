
export function maskMoney(price = 0, decimalCount = 2, decimal = ",", thousands = ".") {
    try {
      decimalCount = Math.abs(decimalCount);
      decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
  
      const negativeSign = price < 0 ? "-" : "";
      
      let x = parseInt(price.toFixed(decimalCount));
      let i = parseInt(price.toFixed(decimalCount)).toString();
      let j = (i.length > 3) ? i.length % 3 : 0;
  
      return negativeSign +
        'R$' + (j ? i.substr(0, j) + thousands : '') +
        i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
        (decimalCount ? decimal + Math.abs(price - x).toFixed(decimalCount).slice(2) : "");
    } catch (e) {
      console.log(e)
    }
  };