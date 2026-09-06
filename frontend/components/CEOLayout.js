import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function CEOLayout({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({ name: 'CEO User', role: 'CEO' });

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('userData');
    const userRole = localStorage.getItem('userRole');

    if (!userData || !userRole) {
      // Not logged in – redirect to login
      router.replace('/login');
      return;
    }

    try {
      const parsed = JSON.parse(userData);
      if (parsed && parsed.name) {
        setUser({
          name: parsed.name,
          role: userRole || 'CEO'
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

    // If we reach here, user is authenticated
    setLoading(false);
  }, [router]);

  // Optional: Also check role-based access – if userRole is not CEO, redirect to appropriate dashboard
  useEffect(() => {
    if (!loading) {
      const userRole = localStorage.getItem('userRole');
      if (userRole !== 'CEO') {
        // If user is not CEO, redirect to their own dashboard
        if (userRole === 'HR') router.replace('/hr-dashboard');
        else if (userRole === 'PM') router.replace('/pm-dashboard');
        else if (userRole === 'FD') router.replace('/fd-dashboard');
        else if (userRole === 'Employee') router.replace('/dashboard');
        else router.replace('/login');
      }
    }
  }, [loading, router]);

  const initials = user.name
    ? user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : 'CEO';

  const navItems = [
    { name: 'Dashboard', path: '/ceo-dashboard', icon: 'fa-chart-pie' },
    { name: 'Projects', path: '/ceo-projects', icon: 'fa-project-diagram' },
    { name: 'Attendance', path: '/ceo-attendance', icon: 'fa-clipboard-list' },
    { name: 'Leave management', path: '/ceo-leave-management', icon: 'fa-clock' },
    { name: 'Hiring approvals', path: '/ceo-hiring-approvals', icon: 'fa-user-plus' },
    { name: 'Internal communication', path: '/ceo-internal-communication', icon: 'fa-comments' },
    { name: 'Announcements', path: '/ceo-announcements', icon: 'fa-bullhorn' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    localStorage.removeItem('userRole');
    router.push('/login');
  };

  // Show nothing while checking authentication
  if (loading) {
    return null; // or a loading spinner
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
              onClick={() => router.push('/ceo-internal-communication')}
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