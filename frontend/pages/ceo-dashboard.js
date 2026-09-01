import { useState } from 'react';
import CEOLayout from '@/components/CEOLayout';
import CEOPageLayout from '@/components/CEOPageLayout';

export default function CEODashboard() {
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
    tableHeaderBg: '#2C3E50',
    statusOnTrack: '#1FA25A',
  };

  // CEO-specific stats (matches image)
  const stats = [
    { id: 1, label: 'Leave requests review', value: 3, icon: 'fa-clock' },
    { id: 2, label: 'Active projects', value: 1, icon: 'fa-diagram-project' },
    { id: 3, label: 'Projects completed', value: 2, icon: 'fa-list-check' },
  ];

  // Leave approvals awaiting (left column, matches image)
  const leaveApprovals = [
    { id: 1, name: 'Raheel khan', type: 'Annual leave', dateRange: 'July 26 - 31', project: 'Project neostate' },
    { id: 2, name: 'Hamza Jamali', type: 'Sick leave', dateRange: 'July 14-19', project: 'Project neostate' },
    { id: 3, name: 'Zain Haider', type: 'Annual leave', dateRange: 'July 26-28', project: 'Project neostate' },
  ];

  // Company-wide announcements (right column)
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
    <CEOLayout>
      <CEOPageLayout title="Dashboard">
        {/* ─── STAT CARDS ROW ────────────────────────────── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
          marginBottom: '24px',
        }}>
          {stats.map((stat) => (
            <div
              key={stat.id}
              style={{
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
              }}
            >
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
          {/* ─── LEFT COLUMN: Leave approvals awaiting ────────────────── */}
          <div style={cardStyle}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '16px',
            }}>
              <div>
                <h2 style={{
                  fontSize: 'clamp(16px, 2vw, 18px)',
                  fontWeight: 600,
                  color: colors.textDark,
                  margin: 0,
                }}>
                  Leave approvals awaiting
                </h2>
                <span style={{
                  fontSize: '12px',
                  color: colors.textMuted,
                  fontWeight: 500,
                }}>
                  Reviewed by HR . Forwarded for CEO
                </span>
              </div>
              <a
                href="#"
                style={{
                  color: colors.primary,
                  textDecoration: 'none',
                  fontSize: '13px',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  whiteSpace: 'nowrap',
                  marginTop: '2px',
                }}
                onClick={(e) => e.preventDefault()}
              >
                view all <i className="fas fa-arrow-right" style={{ fontSize: '11px' }} />
              </a>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {leaveApprovals.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
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
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: colors.textMuted,
                    flexShrink: 0,
                    marginTop: '6px',
                  }} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span style={{
                      fontSize: '14px',
                      color: colors.textDark,
                      fontWeight: 700,
                    }}>
                      {item.name} — {item.type}, {item.dateRange}
                    </span>
                    <span style={{
                      fontSize: '11px',
                      color: colors.textMuted,
                    }}>
                      {item.project}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ─── RIGHT COLUMN: Announcements ────────────────── */}
          <div style={cardStyle}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                <h2 style={{
                  fontSize: 'clamp(16px, 2vw, 18px)',
                  fontWeight: 600,
                  color: colors.textDark,
                  margin: 0,
                }}>
                  Annoucements
                </h2>
                <span style={{
                  fontSize: '12px',
                  color: colors.textMuted,
                  fontWeight: 500,
                }}>
                  company wide
                </span>
              </div>
              <a
                href="#"
                style={{
                  color: colors.primary,
                  textDecoration: 'none',
                  fontSize: '13px',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
                onClick={(e) => e.preventDefault()}
              >
                view all <i className="fas fa-arrow-right" style={{ fontSize: '11px' }} />
              </a>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {announcements.map((announcement) => (
                <div
                  key={announcement.id}
                  style={{
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
      </CEOPageLayout>
    </CEOLayout>
  );
}