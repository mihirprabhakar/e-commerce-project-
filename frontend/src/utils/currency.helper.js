const formatCurrency = (amount, symbol = "₹") => {
    if (amount === undefined || amount === null) return `${symbol}0`;
    return `${symbol}${Number(amount).toLocaleString("en-IN")}`;
  };
  
  const calculateDiscount = (price, discount) => {
    if (!discount) return price;
    return price - (price * discount) / 100;
  };
  
  export { formatCurrency, calculateDiscount };