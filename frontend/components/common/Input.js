// components/common/Input.js
export default function Input({ 
  label, 
  error, 
  className = '', 
  ...props 
}) {
  return (
    <div className="form-group">
      {label && <label>{label}</label>}
      <input className={`form-input ${error ? 'error' : ''} ${className}`} {...props} />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
}