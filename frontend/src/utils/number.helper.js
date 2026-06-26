const formatNumber = (num) => {
    if (!num) return "0";
    return Number(num).toLocaleString("en-IN");
  };
  
  const clamp = (value, min, max) => {
    return Math.min(Math.max(value, min), max);
  };
  
  export { formatNumber, clamp };