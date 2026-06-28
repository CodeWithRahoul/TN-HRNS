import { useRouter } from 'next/router';

export default function Header() {
  const router = useRouter();

  const navigate = (path) => {
    router.push(path);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo" onClick={() => navigate('/')}>
          <div className="tn-logo">
            <span className="tn-logo-text">TN</span>
          </div>
          TrustNexus-<span>HRMS</span>
        </div>
        <ul className="nav-links">
          <li><a onClick={() => navigate('/')}>Home</a></li>
          <li><a onClick={() => navigate('/features')}>Features</a></li>
          <li><a onClick={() => navigate('/careers')}>Careers</a></li>
          <li><a onClick={() => navigate('/contact')}>Contact</a></li>
        </ul>
        {/* Login/Sign Up removed as per earlier request */}
      </div>
    </header>
  );
}