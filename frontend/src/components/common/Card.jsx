function Card({ title = "Card Title" }) {
    return (
      <div className="card">
        <h3>{title}</h3>
        <p>Card content goes here</p>
      </div>
    );
  }
  export default Card;