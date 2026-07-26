// pages/pm-dashboard.js
import PMLayout from '@/components/PMLayout';
import PMPageLayout from '@/components/PMPageLayout';

export default function PMDashboard() {
  const colors = {
    primary: '#007A7C',
    lightTeal: '#E8F5F5',
    border: '#020a14',
    textDark: '#1A1A1A',
    textGray: '#666666',
    cardBg: '#FFFFFF',
    greenIcon: '#2F8A4B',
  };

  const cardStyle = {
    background: colors.cardBg,
    border: `1px solid ${colors.border}`,
    borderRadius: '16px',
    padding: 'clamp(16px, 2.5vw, 24px)',
    marginBottom: '24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
    width: '100%',
    boxSizing: 'border-box',
  };

  const statCardStyle = {
    background: colors.cardBg,
    border: `1px solid ${colors.border}`,
    borderRadius: '12px',
    padding: 'clamp(12px, 1.5vw, 24px) 12px',
    textAlign: 'center',
    boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
    minWidth: '80px',
  };

  const listItemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 'clamp(10px, 1.5vw, 16px) 0',
    borderBottom: `1px solid ${colors.border}`,
    flexWrap: 'wrap',
    gap: '8px',
  };

  // Static data based on the image
  const statCards = [
    { icon: 'fa-briefcase', num: '3', label: 'Active projects' },
    { icon: 'fa-tasks', num: '5', label: 'Work in progress' },
    { icon: 'fa-list-check', num: '7', label: 'Open tasks' },
    { icon: 'fa-calendar', num: 'Jul 24', label: 'Work in progress' },
  ];

  const pipelineStats = [
    { num: '6', label: 'Tasks' },
    { num: '5', label: 'In-progress' },
    { num: '3', label: 'In-progress' },
    { num: '14', label: 'Days' },
  ];

  const projectList = [
    { name: 'up design', release: 'Project released: 05 Jul 2024' },
    { name: 'Customer site formed', release: 'Project released: Dec 04, Jul 2024' },
    { name: 'Art integration', release: 'Project released: Dec 04, Jul 2024' },
  ];

  return (
    <PMLayout>
      <PMPageLayout title="Dashboard">
        {/* ─── Top Stats Row ─── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: 'clamp(12px, 2vw, 20px)',
          marginBottom: '30px',
        }}>
          {statCards.map((stat, idx) => (
            <div key={idx} style={statCardStyle}>
              <div style={{
                color: colors.primary,
                fontSize: 'clamp(18px, 2vw, 20px)',
                marginBottom: '8px',
                background: colors.lightTeal,
                width: '40px',
                height: '40px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px',
              }}>
                <i className={`fas ${stat.icon}`}></i>
              </div>
              <div style={{
                fontSize: 'clamp(20px, 2.5vw, 24px)',
                fontWeight: 700,
                color: colors.textDark,
                lineHeight: 1.2,
              }}>{stat.num}</div>
              <div style={{
                fontSize: 'clamp(10px, 1.2vw, 12px)',
                color: colors.textGray,
                marginTop: '2px',
              }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* ─── Recruitment Pipeline ─── */}
        <div style={cardStyle}>
          <h2 style={{
            fontSize: 'clamp(16px, 2vw, 18px)',
            fontWeight: 600,
            margin: '0 0 20px 0',
            color: colors.textDark,
          }}>
            Recruitment pipeline
          </h2>

          {/* Pipeline Stats Row */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 'clamp(8px, 1.5vw, 16px)',
            position: 'relative',
            marginTop: 'clamp(20px, 3vw, 40px)',
            padding: '0 10px',
          }}>
            <div style={{
              position: 'absolute',
              top: '10px',
              left: '30px',
              right: '30px',
              height: '2px',
              backgroundColor: colors.primary,
              zIndex: 1,
            }}></div>

            {pipelineStats.map((step, idx) => (
              <div key={idx} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
                zIndex: 2,
                background: colors.cardBg,
                padding: '0 6px',
                flex: '0 1 auto',
                minWidth: '50px',
              }}>
                <div style={{
                  width: 'clamp(16px, 2vw, 20px)',
                  height: 'clamp(16px, 2vw, 20px)',
                  borderRadius: '50%',
                  border: `3px solid ${colors.primary}`,
                  background: 'white',
                  marginBottom: '8px',
                }}></div>
                <div style={{
                  fontSize: 'clamp(18px, 2vw, 22px)',
                  fontWeight: 700,
                  color: colors.textDark,
                }}>{step.num}</div>
                <div style={{
                  fontSize: 'clamp(10px, 1vw, 12px)',
                  color: colors.textGray,
                  marginTop: '2px',
                  textAlign: 'center',
                }}>{step.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Project List ─── */}
        <div style={cardStyle}>
          <h2 style={{
            fontSize: 'clamp(16px, 2vw, 18px)',
            fontWeight: 600,
            margin: '0 0 16px 0',
            color: colors.textDark,
          }}>
            Recruitment pipeline
          </h2>

          {projectList.map((project, idx) => (
            <div key={idx} style={listItemStyle}>
              <div>
                <h4 style={{
                  margin: '0 0 4px 0',
                  fontSize: 'clamp(14px, 1.5vw, 15px)',
                  fontWeight: 500,
                  color: colors.textDark,
                }}>
                  {project.name}
                </h4>
                <p style={{
                  margin: 0,
                  fontSize: '13px',
                  color: colors.textGray,
                }}>
                  {project.release}
                </p>
              </div>
              <span style={{
                color: colors.primary,
                fontSize: '13px',
                fontWeight: 500,
              }}>
                <i className="fas fa-arrow-right"></i>
              </span>
            </div>
          ))}
        </div>
      </PMPageLayout>
    </PMLayout>
  );
}