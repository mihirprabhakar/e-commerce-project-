const setItem = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error("Storage set error:", err);
    }
  };
  
  const getItem = (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (err) {
      console.error("Storage get error:", err);
      return null;
    }
  };
  
  const removeItem = (key) => {
    try {
      localStorage.removeItem(key);
    } catch (err) {
      console.error("Storage remove error:", err);
    }
  };
  
  const clearStorage = () => {
    try {
      localStorage.clear();
    } catch (err) {
      console.error("Storage clear error:", err);
    }
  };
  
  export { setItem, getItem, removeItem, clearStorage };