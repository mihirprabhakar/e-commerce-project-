// Products state management
// Will handle: fetch products, filter, search, pagination

const productsState = {
    list: [],
    selected: null,
    total: 0,
    page: 1,
    limit: 10,
    loading: false,
    error: null
  };
  
  export default productsState;