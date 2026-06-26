function Select({ options = [] }) {
    return (
      <select>
        {options.map((opt, i) => (
          <option key={i} value={opt}>{opt}</option>
        ))}
      </select>
    );
  }
  export default Select;