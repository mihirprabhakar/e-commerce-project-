// Auth state management
// Will handle: login, logout, register, token storage

const authState = {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null
  };
  
  export default authState;