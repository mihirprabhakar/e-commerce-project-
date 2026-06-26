function Modal({ title = "Modal Title" }) {
    return (
      <div className="modal">
        <h3>{title}</h3>
        <p>Modal content goes here</p>
      </div>
    );
  }
  export default Modal;