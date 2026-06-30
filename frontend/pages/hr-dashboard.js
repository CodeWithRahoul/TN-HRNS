import HRLayout from '@/components/HRLayout';
import { useRouter } from 'next/router';

export default function HRDashboard() {
  const router = useRouter();

  return (
    <HRLayout>
      <div className="hr-dashboard">
        <div className="container" style={{ padding: '0 24px' }}>
          <div className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
            <div>
              <h1 className="page-title" style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>Dashboard</h1>
              <p className="page-subtitle" style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>Sara Afzal · HR</p>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button className="btn btn-primary" onClick={() => router.push('/calendar')}>
                <i className="fas fa-calendar-alt" style={{ marginRight: '6px' }}></i> Calendar
              </button>
              <button className="btn btn-primary" onClick={() => router.push('/candidates')}>
                <i className="fas fa-users" style={{ marginRight: '6px' }}></i> Candidates
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px,1fr))', gap: '16px', marginBottom: '32px' }}>
            <div className="stat-card" style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(4px)', borderRadius: '16px', padding: '20px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.3)' }}>
              <div className="stat-number" style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>7</div>
              <div className="stat-label" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>New Hires</div>
            </div>
            <div className="stat-card" style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(4px)', borderRadius: '16px', padding: '20px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.3)' }}>
              <div className="stat-number" style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>38</div>
              <div className="stat-label" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Total Employees</div>
            </div>
            <div className="stat-card" style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(4px)', borderRadius: '16px', padding: '20px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.3)' }}>
              <div className="stat-number" style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>3</div>
              <div className="stat-label" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Departments</div>
            </div>
            <div className="stat-card" style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(4px)', borderRadius: '16px', padding: '20px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.3)' }}>
              <div className="stat-number" style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>9</div>
              <div className="stat-label" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Open Positions</div>
            </div>
            <div className="stat-card" style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(4px)', borderRadius: '16px', padding: '20px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.3)' }}>
              <div className="stat-number" style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>5</div>
              <div className="stat-label" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Pending Reviews</div>
            </div>
          </div>

          {/* Main Grid */}
          <div className="hr-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div className="hr-left">
              <div className="dashboard-card" style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(4px)', borderRadius: '16px', padding: '24px', marginBottom: '24px', border: '1px solid rgba(255,255,255,0.3)' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '12px' }}>Recruitment Pipeline</h3>
                <div className="pipeline-item" style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f0f3f2', fontSize: '0.95rem', color: 'var(--text-dark)' }}>
                  <span>Applied</span><span>38</span>
                </div>
                <div className="pipeline-item" style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f0f3f2', fontSize: '0.95rem', color: 'var(--text-dark)' }}>
                  <span>Screening</span><span>21</span>
                </div>
                <div className="pipeline-item" style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f0f3f2', fontSize: '0.95rem', color: 'var(--text-dark)' }}>
                  <span>Interview</span><span>14</span>
                </div>
                <div className="pipeline-item" style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f0f3f2', fontSize: '0.95rem', color: 'var(--text-dark)' }}>
                  <span>Offer</span><span>9</span>
                </div>
                <div className="pipeline-item" style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: 'none', fontSize: '0.95rem', color: 'var(--text-dark)' }}>
                  <span>Hired</span><span>4</span>
                </div>
              </div>

              <div className="dashboard-card" style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(4px)', borderRadius: '16px', padding: '24px', marginBottom: '24px', border: '1px solid rgba(255,255,255,0.3)' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '12px' }}>Today's Interviews</h3>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
                  <button className="btn btn-ghost" style={{ fontSize: '0.8rem' }}>View all interviews</button>
                  <button className="btn btn-primary" style={{ fontSize: '0.8rem' }} onClick={() => router.push('/calendar')}>Open calendar</button>
                </div>
                <div className="interview-item" style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f0f3f2', fontSize: '0.95rem', color: 'var(--text-dark)' }}>
                  <strong>Sales Growth</strong> — Interview
                </div>
                <div className="interview-item" style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: 'none', fontSize: '0.95rem', color: 'var(--text-dark)' }}>
                  <strong>Gain More Jobs</strong> — Upgrade
                </div>
              </div>
            </div>

            <div className="hr-right">
              <div className="dashboard-card" style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(4px)', borderRadius: '16px', padding: '24px', marginBottom: '24px', border: '1px solid rgba(255,255,255,0.3)' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '12px' }}>
                  Pending leave approvals
                  <button className="btn btn-ghost" style={{ fontSize: '0.8rem', marginLeft: '8px' }}>View all</button>
                </h3>
                <div className="leave-item" style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f0f3f2', fontSize: '0.95rem', color: 'var(--text-dark)' }}>
                  Union News — Amplitude finds all
                </div>
                <div className="leave-item" style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: 'none', fontSize: '0.95rem', color: 'var(--text-dark)' }}>
                  2024HR — 95 new 3-day
                </div>
              </div>

              <div className="dashboard-card" style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(4px)', borderRadius: '16px', padding: '24px', marginBottom: '24px', border: '1px solid rgba(255,255,255,0.3)' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '12px' }}>Recent activities</h3>
                <div className="activity-item" style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f0f3f2', fontSize: '0.95rem', color: 'var(--text-dark)' }}>
                  LinkedIn profile improved — Details added
                </div>
                <div className="activity-item" style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f0f3f2', fontSize: '0.95rem', color: 'var(--text-dark)' }}>
                  LinkedIn profile is open — Interview
                </div>
                <div className="activity-item" style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: 'none', fontSize: '0.95rem', color: 'var(--text-dark)' }}>
                  LinkedIn profile is closed — Interview
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HRLayout>
  );
}