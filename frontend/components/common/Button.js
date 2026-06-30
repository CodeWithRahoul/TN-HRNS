// components/common/Button.js
export default function Button({ 
  children, 
  variant = 'primary', 
  loading = false, 
  className = '', 
  ...props 
}) {
  const baseClass = `btn ${variant === 'primary' ? 'btn-primary' : variant === 'ghost' ? 'btn-ghost' : variant === 'dark' ? 'btn-dark' : 'btn-primary'}`;
  return (
    <button className={`${baseClass} ${className}`} disabled={loading} {...props}>
      {loading ? <i className="fas fa-spinner fa-spin"></i> : children}
    </button>
  );
}