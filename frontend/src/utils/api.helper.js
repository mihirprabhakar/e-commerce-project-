const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };
  
  const buildUrl = (base, params = {}) => {
    let url = base;
    Object.keys(params).forEach((key) => {
      url = url.replace(`:${key}`, params[key]);
    });
    return url;
  };
  
  export { getAuthHeader, buildUrl };