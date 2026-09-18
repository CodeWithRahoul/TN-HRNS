import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function CFOLayout({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({ name: 'CFO User', role: 'CFO' });

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    const userRole = localStorage.getItem('userRole');

    if (!userData || !userRole) {
      router.replace('/login');
      return;
    }

    try {
      const parsed = JSON.parse(userData);
      if (parsed && parsed.name) {
        setUser({
          name: parsed.name,
          role: userRole || 'CFO'
        });
      } else {
        router.replace('/login');
        return;
      }
    } catch (err) {
      console.error("Error parsing user data:", err);
      router.replace('/login');
      return;
    }

    setLoading(false);
  }, [router]);

  // Role-based access: Only CFO can access CFO pages
  useEffect(() => {
    if (!loading) {
      const userRole = localStorage.getItem('userRole');
      if (userRole !== 'CFO') {
        if (userRole === 'HR') router.replace('/hr-dashboard');
        else if (userRole === 'PM') router.replace('/pm-dashboard');
        else if (userRole === 'FD') router.replace('/fd-dashboard');
        else if (userRole === 'TL') router.replace('/tl-dashboard');
        else if (userRole === 'CEO') router.replace('/ceo-dashboard');
        else if (userRole === 'Employee') router.replace('/dashboard');
        else router.replace('/login');
      }
    }
  }, [loading, router]);

  const initials = user.name
    ? user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : 'CFO';

  const navItems = [
    { name: 'Dashboard', path: '/cfo-dashboard', icon: 'fa-chart-pie' },
    { name: 'Reports', path: '/cfo-reports', icon: 'fa-chart-line' },
    { name: 'Salary', path: '/cfo-salary', icon: 'fa-money-bill-wave' }, // ✅ NEW
    { name: 'Attendance', path: '/cfo-attendance', icon: 'fa-clipboard-list' },
    { name: 'Leave request', path: '/cfo-leave-management', icon: 'fa-clock' }, // ✅ renamed
    { name: 'Internal communication', path: '/cfo-internal-communication', icon: 'fa-comments' },
    { name: 'Announcements', path: '/cfo-announcements', icon: 'fa-bullhorn' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    localStorage.removeItem('userRole');
    router.push('/login');
  };

  if (loading) {
    return null;
  }

  return (
    <div className="hr-layout">
      <div className="hr-body">
        <aside className="hr-sidebar">
          <div className="sidebar-profile">
            <div className="profile-avatar">{initials}</div>
            <div className="profile-name">{user.name}</div>
            <div className="profile-role">{user.role}</div>
          </div>
          <nav className="sidebar-nav">
            {navItems.map((item) => (
              <a
                key={item.path}
                className={`sidebar-link ${router.pathname === item.path ? 'active' : ''}`}
                onClick={() => router.push(item.path)}
              >
                <i className={`fas ${item.icon}`}></i>
                <span>{item.name}</span>
              </a>
            ))}
          </nav>
          <div style={{ padding: '16px 12px' }}>
            <button
              style={{
                width: '100%',
                background: '#ffffff',
                color: '#06504A',
                border: 'none',
                padding: '10px',
                borderRadius: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: "'Poppins', sans-serif",
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
              onClick={() => router.push('/cfo-internal-communication')}
            >
              <i className="fas fa-plus-circle"></i> Create Task
            </button>
          </div>
          <div style={{ padding: '0 12px 16px', marginTop: 'auto' }}>
            <button
              style={{
                width: '100%',
                background: 'transparent',
                color: '#ffffff',
                border: '1px solid rgba(255,255,255,0.3)',
                padding: '10px',
                borderRadius: '12px',
                fontWeight: 500,
                cursor: 'pointer',
                fontFamily: "'Poppins', sans-serif",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
              onMouseLeave={(e) => e.target.style.background = 'transparent'}
              onClick={handleLogout}
            >
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          </div>
        </aside>
        <main className="hr-main">
          {children}
        </main>
      </div>
    </div>
  );
}