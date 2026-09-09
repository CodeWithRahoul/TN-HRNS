import { useState } from 'react';
import TLLayout from '@/components/TLLayout';
import TLPageLayout from '@/components/TLPageLayout';

export default function TLDashboard() {
  const colors = {
    primary: '#00A19A',
    primaryDark: '#008a84',
    primaryLight: '#E6F5F4',
    border: '#000000',
    textDark: '#1A1A1A',
    textGray: '#666666',
    textMuted: '#8a8f98',
    bg: '#F4FBFB',
    cardBg: '#FFFFFF',
  };

  const stats = [
    { id: 1, label: 'Team Members', value: 6, icon: 'fa-users' },
    { id: 2, label: 'Active Projects', value: 3, icon: 'fa-diagram-project' },
    { id: 3, label: 'Pending Reviews', value: 4, icon: 'fa-clock' },
  ];

  const tasks = [
    { id: 1, title: 'Review pull requests', project: 'Nexovate', dueDate: '02 Jun 2026', done: true },
    { id: 2, title: 'Team sync meeting', project: 'TN-HRMS', dueDate: '20 Jun 2026', done: false },
    { id: 3, title: 'Code review for API module', project: 'Nexovate', dueDate: '20 Jun 2026', done: false },
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
    marginBottom: '24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
    width: '100%',
    boxSizing: 'border-box',
  };

  return (
    <TLLayout>
      <TLPageLayout title="Dashboard">
        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
          marginBottom: '24px',
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
              boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
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
              <div style={{
                fontSize: '22px',
                fontWeight: 700,
                color: colors.textDark,
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: '13px',
                color: colors.textMuted,
                fontWeight: 500,
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Two column layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px',
          alignItems: 'start',
        }}>
          {/* Left: Tasks */}
          <div style={cardStyle}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ fontSize: 'clamp(16px, 2vw, 18px)', fontWeight: 600, color: colors.textDark, margin: 0 }}>
                  Pending tasks
                </h2>
                <span style={{ fontSize: '12px', color: colors.textMuted, fontWeight: 500 }}>
                  across team
                </span>
              </div>
              <a href="#" style={{ color: colors.primary, textDecoration: 'none', fontSize: '13px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }} onClick={(e) => e.preventDefault()}>
                view all <i className="fas fa-arrow-right" style={{ fontSize: '11px' }} />
              </a>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {tasks.map((task) => (
                <div key={task.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 14px',
                  background: colors.bg,
                  borderRadius: '10px',
                  border: `1px solid ${colors.border}`,
                  transition: 'background 0.15s',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = colors.primaryLight}
                onMouseLeave={(e) => e.currentTarget.style.background = colors.bg}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {task.done ? (
                      <div style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        background: colors.primary,
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '10px',
                        flexShrink: 0,
                      }}>
                        <i className="fas fa-check" />
                      </div>
                    ) : (
                      <div style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        border: `2px solid ${colors.textMuted}`,
                        flexShrink: 0,
                      }} />
                    )}
                    <span style={{ fontSize: '14px', color: task.done ? colors.primary : colors.textDark, fontWeight: 600 }}>
                      {task.title}
                    </span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', fontSize: '11px', color: colors.textMuted }}>
                    <span>Project {task.project} . {task.dueDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Announcements */}
          <div style={cardStyle}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ fontSize: 'clamp(16px, 2vw, 18px)', fontWeight: 600, color: colors.textDark, margin: 0 }}>
                  Announcements
                </h2>
                <span style={{ fontSize: '12px', color: colors.textMuted, fontWeight: 500 }}>
                  company wide
                </span>
              </div>
              <a href="#" style={{ color: colors.primary, textDecoration: 'none', fontSize: '13px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }} onClick={(e) => e.preventDefault()}>
                view all <i className="fas fa-arrow-right" style={{ fontSize: '11px' }} />
              </a>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {announcements.map((announcement) => (
                <div key={announcement.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 14px',
                  background: colors.bg,
                  borderRadius: '10px',
                  border: `1px solid ${colors.border}`,
                  transition: 'background 0.15s',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = colors.primaryLight}
                onMouseLeave={(e) => e.currentTarget.style.background = colors.bg}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: colors.textMuted,
                      flexShrink: 0,
                    }} />
                    <span style={{ fontSize: '14px', color: colors.textDark, fontWeight: 700 }}>
                      {announcement.title}
                    </span>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '11px',
                    color: colors.textMuted,
                    flexShrink: 0,
                    marginLeft: '12px',
                  }}>
                    <span>{announcement.source} . {announcement.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </TLPageLayout>
    </TLLayout>
  );
}