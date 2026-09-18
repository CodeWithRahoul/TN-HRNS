import CFOLayout from '@/components/CFOLayout';
import CFOPageLayout from '@/components/CFOPageLayout';

export default function CFODashboard() {
  const colors = {
    primary: '#00A19A',
    primaryLight: '#E6F5F4',
    border: '#000000',
    textDark: '#1A1A1A',
    textGray: '#666666',
    textMuted: '#8a8f98',
    bg: '#F4FBFB',
    cardBg: '#FFFFFF',
  };

  const stats = [
    { id: 1, label: 'Total expenses', value: 'Rs. 140,786', icon: 'fa-arrow-rotate-right' },
    { id: 2, label: 'Salary slip to view', value: '1', icon: 'fa-clock' },
    { id: 3, label: 'Uploaded financial report', value: '2', icon: 'fa-list-check' },
  ];

  const quickActions = [
    { id: 1, title: 'Upload financial reports', subtitle: 'Expense summary', icon: 'fa-file-arrow-up' },
    { id: 2, title: 'View salary slips', subtitle: 'Across all departments', icon: 'fa-arrow-rotate-right' },
    { id: 3, title: 'Internal communication', subtitle: 'Communicate seniors', icon: 'fa-shield-halved' },
  ];

  const announcements = [
    { id: 1, title: 'Office closed Aug 14 for Independence Day', source: 'HR', time: '2 hrs ago' },
    { id: 2, title: 'Office closed July 04 for Eid holiday', source: 'HR', time: 'month ago' },
  ];

  const cardStyle = {
    background: colors.cardBg,
    border: `1px solid ${colors.border}`,
    borderRadius: '16px',
    padding: 'clamp(16px, 2.5vw, 24px)',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    width: '100%',
    boxSizing: 'border-box',
  };

  return (
    <CFOLayout>
      <CFOPageLayout title="Dashboard">
        {/* Stat cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
          marginBottom: '32px',
        }}>
          {stats.map((stat) => (
            <div key={stat.id} style={{
              background: colors.cardBg,
              border: `1px solid ${colors.border}`,
              borderRadius: '16px',
              padding: 'clamp(20px, 3vw, 28px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: colors.primaryLight,
                color: colors.primary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
              }}>
                <i className={`fas ${stat.icon}`} />
              </div>
              <div style={{ fontSize: '22px', fontWeight: 700, color: colors.textDark }}>{stat.value}</div>
              <div style={{ fontSize: '13px', color: colors.textMuted, fontWeight: 500 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'start' }}>
          {/* Quick Actions */}
          <div style={cardStyle}>
            <h2 style={{ fontSize: '18px', fontWeight: 600, color: colors.textDark, margin: '0 0 12px 0' }}>
              Quick Actions
            </h2>
            <div style={{ height: '1px', background: '#E0E0E0', marginBottom: '8px' }} />

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {quickActions.map((action, i) => (
                <button
                  key={action.id}
                  onClick={() => {}}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px',
                    padding: '16px 4px',
                    background: 'transparent',
                    border: 'none',
                    borderBottom: i === quickActions.length - 1 ? 'none' : '1px solid #EFEFEF',
                    cursor: 'pointer',
                    textAlign: 'left',
                    width: '100%',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: colors.primaryLight,
                      color: colors.primary,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px',
                      flexShrink: 0,
                    }}>
                      <i className={`fas ${action.icon}`} />
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: colors.textDark }}>
                        {action.title}
                      </div>
                      <div style={{ fontSize: '11px', color: colors.textMuted, marginTop: '2px' }}>
                        {action.subtitle}
                      </div>
                    </div>
                  </div>
                  <i className="fas fa-arrow-right" style={{ fontSize: '12px', color: colors.textGray }} />
                </button>
              ))}
            </div>
          </div>

          {/* Announcements */}
          <div style={cardStyle}>
            <h2 style={{ fontSize: '18px', fontWeight: 600, color: colors.textDark, margin: '0 0 6px 0' }}>
              Announcements
            </h2>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px',
            }}>
              <span style={{ fontSize: '11px', color: colors.textMuted }}>company wide</span>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                style={{ color: colors.primary, fontSize: '13px', fontWeight: 500, textDecoration: 'none' }}
              >
                view all <i className="fas fa-arrow-right" style={{ fontSize: '11px' }} />
              </a>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {announcements.map((a, i) => (
                <div key={a.id} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  padding: '14px 4px',
                  borderBottom: i === announcements.length - 1 ? 'none' : '1px solid #EFEFEF',
                }}>
                  <div style={{
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    background: '#4A4A4A',
                    marginTop: '3px',
                    flexShrink: 0,
                  }} />
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: colors.textDark }}>
                      {a.title}
                    </div>
                    <div style={{ fontSize: '11px', color: colors.textMuted, marginTop: '4px' }}>
                      {a.source} . {a.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CFOPageLayout>
    </CFOLayout>
  );
}