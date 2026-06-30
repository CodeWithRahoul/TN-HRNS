// components/common/Spinner.js
export default function Spinner({ size = 'md' }) {
  const sizeMap = { sm: '1rem', md: '2rem', lg: '3rem' };
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
      <i className="fas fa-spinner fa-spin" style={{ fontSize: sizeMap[size] || '2rem', color: 'var(--primary)' }}></i>
    </div>
  );
}