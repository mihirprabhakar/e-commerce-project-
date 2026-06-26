const capitalize = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };
  
  const truncate = (str, length = 50) => {
    if (!str) return "";
    return str.length > length ? str.substring(0, length) + "..." : str;
  };
  
  const slugify = (str) => {
    if (!str) return "";
    return str.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  };
  
  export { capitalize, truncate, slugify };