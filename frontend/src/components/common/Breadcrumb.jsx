function Breadcrumb({ items = [] }) {
    return (
      <nav className="breadcrumb">
        {items.map((item, i) => (
          <span key={i}>{item} {i < items.length - 1 && ">"} </span>
        ))}
      </nav>
    );
  }
  export default Breadcrumb;