import { useRouter } from 'next/router';
import { useState } from 'react';

export default function PMPageLayout({ title, children }) {
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadIds, setUnreadIds] = useState([1, 2, 3]);

  const colors = {
    primary: '#007A7C',
    lightTeal: '#E8F5F5',
    bg: '#FAFBFC',
    textDark: '#1A1A1A',
    textGray: '#666666',
    textMuted: '#8a8f98',
    border: '#e8edee',
    cardBg: '#FFFFFF',
    greenIcon: '#2F8A4B',
  };

  const notifications = [
    { id: 1, text: 'HR assigned you project nexovate', time: '10m ago', icon: 'fa-project-diagram', color: '#3B5BDB' },
    { id: 2, text: 'Sara kareem has query on project nexovate', time: '2hrs ago', icon: 'fa-comment-dots', color: '#F4B400' },
    { id: 3, text: 'Bilal ahmed requested long leave', time: '10hrs ago', icon: 'fa-calendar-alt', color: '#E8483E' },
  ];

  const markAllAsRead = () => {
    setUnreadIds([]);
  };

  return (
    <div style={{
      fontFamily: "'Poppins', sans-serif",
      backgroundColor: '#effbfb',
      minHeight: '100vh',
      padding: 'clamp(16px, 4vw, 40px)',
      boxSizing: 'border-box'
    }}>
      <style dangerouslySetInnerHTML={{
        __html: `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
`}} />
      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>

        {/* ─── Top Header ─── */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '20px'
        }}>
          <h1 style={{ fontSize: 'clamp(22px, 4vw, 28px)', fontWeight: 700, color: colors.textDark, margin: 0 }}>{title}</h1>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            alignItems: 'center',
            width: '100%',
            maxWidth: '500px',
            position: 'relative',
          }}>
            {/* Search Bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              background: 'white',
              border: `1px solid ${colors.border}`,
              borderRadius: '10px',
              padding: '4px',
              flex: 1,
              minWidth: '180px',
              transition: 'border-color 0.2s',
            }}>
              <i className="fas fa-search" style={{ color: colors.textGray, fontSize: '14px', paddingLeft: '12px' }}></i>
              <input
                type="text"
                placeholder="Search projects, tasks, or clients..."
                style={{
                  border: 'none',
                  outline: 'none',
                  padding: '8px 12px',
                  flex: 1,
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '14px',
                  minWidth: '80px',
                  background: 'transparent',
                  color: colors.textDark,
                }}
              />
              <button style={{
                backgroundColor: colors.primary,
                color: 'white',
                border: 'none',
                padding: '6px 16px',
                borderRadius: '8px',
                fontWeight: 500,
                cursor: 'pointer',
                fontFamily: "'Poppins', sans-serif",
                whiteSpace: 'nowrap',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => e.target.style.background = '#005f5f'}
              onMouseLeave={(e) => e.target.style.background = colors.primary}
              >
                Search
              </button>
            </div>

            {/* Notification Bell */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                style={{
                  backgroundColor: showNotifications ? '#e8f0f0' : 'transparent',
                  color: colors.textDark,
                  border: 'none',
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  flexShrink: 0,
                  position: 'relative',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#e8f0f0'}
                onMouseLeave={(e) => {
                  if (!showNotifications) e.currentTarget.style.background = 'transparent';
                }}
              >
                <i className="fas fa-bell" style={{ fontSize: '20px', color: unreadIds.length > 0 ? colors.primary : colors.textGray }}></i>
                {unreadIds.length > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '6px',
                    right: '6px',
                    width: '10px',
                    height: '10px',
                    background: '#E8483E',
                    borderRadius: '50%',
                    border: '2px solid #effbfb',
                  }} />
                )}
              </button>

              {showNotifications && (
                <div style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  right: 0,
                  background: '#fff',
                  borderRadius: '16px',
                  boxShadow: '0 12px 48px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.04)',
                  padding: '8px 0',
                  minWidth: '380px',
                  maxWidth: '420px',
                  zIndex: 100,
                  border: `1px solid ${colors.border}`,
                  animation: 'slideDown 0.2s ease',
                }}>
                  <style dangerouslySetInnerHTML={{
                    __html: `
                      @keyframes slideDown {
                        from { opacity: 0; transform: translateY(-8px); }
                        to { opacity: 1; transform: translateY(0); }
                      }
                    `
                  }} />
                  
                  {/* Header */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 20px 12px 20px',
                    borderBottom: `1px solid ${colors.border}`,
                  }}>
                    <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: colors.textDark }}>
                      Notifications
                      {unreadIds.length > 0 && (
                        <span style={{
                          marginLeft: '8px',
                          background: colors.primary,
                          color: '#fff',
                          fontSize: '10px',
                          fontWeight: 600,
                          padding: '2px 10px',
                          borderRadius: '12px',
                        }}>
                          {unreadIds.length}
                        </span>
                      )}
                    </h4>
                    {unreadIds.length > 0 && (
                      <button
                        onClick={markAllAsRead}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: colors.primary,
                          fontSize: '12px',
                          fontWeight: 500,
                          cursor: 'pointer',
                          fontFamily: "'Poppins', sans-serif",
                          padding: '4px 0',
                          transition: 'opacity 0.2s',
                        }}
                        onMouseEnter={(e) => e.target.style.opacity = '0.7'}
                        onMouseLeave={(e) => e.target.style.opacity = '1'}
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>

                  {/* Notifications List */}
                  <div style={{ maxHeight: '380px', overflowY: 'auto' }}>
                    {notifications.map((notif) => {
                      const isUnread = unreadIds.includes(notif.id);
                      return (
                        <div key={notif.id} style={{
                          padding: '12px 20px',
                          borderBottom: `1px solid ${colors.border}`,
                          cursor: 'pointer',
                          background: isUnread ? '#f8fbfb' : '#fff',
                          transition: 'background 0.15s',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '12px',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = '#eef4f4'}
                        onMouseLeave={(e) => e.currentTarget.style.background = isUnread ? '#f8fbfb' : '#fff'}
                        >
                          {/* Icon */}
                          <div style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '10px',
                            background: `${notif.color}15`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            color: notif.color,
                          }}>
                            <i className={`fas ${notif.icon}`} style={{ fontSize: '16px' }} />
                          </div>

                          {/* Content */}
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{
                              fontSize: '14px',
                              color: colors.textDark,
                              lineHeight: '1.5',
                              fontWeight: isUnread ? 500 : 400,
                            }}>
                              {notif.text}
                            </div>
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              marginTop: '4px',
                            }}>
                              <span style={{
                                fontSize: '12px',
                                color: colors.textMuted,
                              }}>
                                {notif.time}
                              </span>
                              {isUnread && (
                                <span style={{
                                  width: '6px',
                                  height: '6px',
                                  borderRadius: '50%',
                                  background: colors.primary,
                                  display: 'inline-block',
                                }} />
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Footer */}
                  <div style={{
                    padding: '10px 20px',
                    textAlign: 'center',
                    borderTop: `1px solid ${colors.border}`,
                  }}>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowNotifications(false);
                        router.push('/notifications');
                      }}
                      style={{
                        fontSize: '13px',
                        color: colors.primary,
                        fontWeight: 500,
                        textDecoration: 'none',
                        transition: 'opacity 0.2s',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                      onMouseEnter={(e) => e.target.style.opacity = '0.7'}
                      onMouseLeave={(e) => e.target.style.opacity = '1'}
                    >
                      View all notifications
                      <i className="fas fa-arrow-right" style={{ fontSize: '11px' }} />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: `1px solid ${colors.border}`, marginBottom: 'clamp(16px, 3vw, 30px)' }} />

        {/* ─── Page Content ─── */}
        <div>{children}</div>

      </div>
    </div>
  );
}