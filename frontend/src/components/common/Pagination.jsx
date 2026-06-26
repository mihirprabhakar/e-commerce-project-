function Pagination({ total = 0, page = 1 }) {
    return (
      <div className="pagination">
        <p>Page {page} of {total}</p>
      </div>
    );
  }
  export default Pagination;