import { useState } from 'react';
import HRLayout from '@/components/HRLayout';
import HRPageLayout from '@/components/HRPageLayout';

export default function Attendance() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const colors = {
    primary: '#00A19A',
    primaryLight: '#E6F5F4',
    primaryDark: '#008a84',
    border: '#e2e8e8',
    containerBorder: '#000000',
    textDark: '#1A1A1A',
    textGray: '#666666',
    textMuted: '#8a8f98',
    bg: '#F4FBFB',
    cardBg: '#FFFFFF',
    tableHeaderBg: '#2C3E50',
    mapBg: '#CDEAE7',
  };

  const avatarColors = {
    'SK': '#F4B400',
    'TR': '#2FBF71',
    'BA': '#3B5BDB',
  };

  const attendanceRecords = [
    { initials: 'SK', name: 'Sara kareem', role: 'UI/UX designer', checkIn: '9:00 AM', checkOut: '5:00 PM' },
    { initials: 'TR', name: 'Tehreem raja', role: 'Frontend developer', checkIn: '8:55 AM', checkOut: '5:05 PM' },
    { initials: 'BA', name: 'Bilal ahmed', role: 'Project manager', checkIn: '8:50 AM', checkOut: '5:16 PM' },
  ];

  const handleCheckIn = () => {
    setIsCheckedIn(!isCheckedIn);
  };

  const handleGenerateReport = () => {
    setIsReportModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsReportModalOpen(false);
  };

  const handleGenerate = () => {
    console.log('Generating report from', startDate, 'to', endDate);
    alert(`Generating attendance report from ${startDate || 'N/A'} to ${endDate || 'N/A'}`);
    setIsReportModalOpen(false);
  };

  const handleClear = () => {
    setStartDate('');
    setEndDate('');
  };

  const handleToday = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const dateStr = `${yyyy}-${mm}-${dd}`;
    setStartDate(dateStr);
    setEndDate(dateStr);
  };

  return (
    <HRLayout>
      <HRPageLayout title="Attendance">
        {/* Search Bar */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: colors.cardBg,
            border: `1px solid ${colors.containerBorder}`,
            borderRadius: '10px',
            padding: '6px 6px 6px 16px',
            width: '360px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          }}>
            <i className="fas fa-search" style={{ fontSize: '13px', color: colors.textMuted }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search employees..."
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                fontSize: '13px',
                color: colors.textDark,
                fontFamily: "'Poppins', sans-serif",
                background: 'transparent',
                padding: '8px 0',
              }}
            />
            <button
              style={{
                background: colors.primary,
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 18px',
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'pointer',
                fontFamily: "'Poppins', sans-serif",
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => e.target.style.background = colors.primaryDark}
              onMouseLeave={(e) => e.target.style.background = colors.primary}
            >
              Search
            </button>
          </div>
        </div>

        {/* Top Row: Geo-fence + Your Attendance */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '24px',
          marginBottom: '24px',
        }}>
          {/* Geo-fence Configuration Card */}
          <div style={{
            background: colors.cardBg,
            border: `1px solid ${colors.containerBorder}`,
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: 600,
              color: colors.textDark,
              margin: '0 0 4px 0',
            }}>
              Geo-fence configuration
            </h3>
            <p style={{
              fontSize: '13px',
              color: colors.textGray,
              margin: '0 0 16px 0',
            }}>
              Set by Admin – attendance button is only active inside this radius
            </p>

            <div style={{
              position: 'relative',
              background: colors.mapBg,
              borderRadius: '12px',
              height: '190px',
              overflow: 'hidden',
              marginBottom: '16px',
            }}>
              <div style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(255,255,255,0.95)',
                borderRadius: '6px',
                padding: '4px 12px',
                fontSize: '11px',
                fontWeight: 600,
                color: colors.textDark,
                boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
              }}>
                <i className="fas fa-map-marker-alt" style={{ color: colors.primary, fontSize: '11px' }} />
                B.A.C
              </div>
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                border: `1.5px dashed ${colors.primary}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <div style={{
                  width: '90px',
                  height: '90px',
                  borderRadius: '50%',
                  border: `1.5px dashed ${colors.primary}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: colors.primary,
                  }} />
                </div>
              </div>
            </div>

            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '8px',
              background: colors.bg,
              borderRadius: '10px',
              padding: '14px 16px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '13px', color: colors.textGray }}>Configured radius</span>
                <span style={{ fontSize: '13px', fontWeight: 500, color: colors.textDark }}>500m</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '13px', color: colors.textGray }}>Allowed range</span>
                <span style={{ fontSize: '13px', fontWeight: 500, color: colors.textDark }}>200m – 2km</span>
              </div>
            </div>
          </div>

          {/* Your Attendance Card */}
          <div style={{
            background: colors.cardBg,
            border: `1px solid ${colors.containerBorder}`,
            borderRadius: '16px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: 600,
              color: colors.textDark,
              alignSelf: 'flex-start',
              margin: '0 0 20px 0',
            }}>
              Your attendance
            </h3>

            <button
              onClick={handleCheckIn}
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: isCheckedIn ? '#E8483E' : colors.primary,
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 600,
                fontFamily: "'Poppins', sans-serif",
                boxShadow: `0 6px 20px ${isCheckedIn ? 'rgba(232,72,62,0.35)' : 'rgba(0,161,154,0.35)'}`,
                marginBottom: '18px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.03)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
              }}
            >
              {isCheckedIn ? 'Check out' : 'Check in'}
            </button>

            <div style={{
              background: colors.primaryLight,
              borderRadius: '20px',
              padding: '6px 16px',
              marginBottom: '4px',
            }}>
              <p style={{
                fontSize: '13px',
                fontWeight: 500,
                color: colors.primary,
                margin: 0,
              }}>
                Inside 500m radius
              </p>
            </div>
            <p style={{
              fontSize: '11px',
              color: colors.textMuted,
              margin: '6px 0 0 0',
            }}>
              Auto disable outside the fence
            </p>
          </div>
        </div>

        {/* Today's Attendance Table */}
        <div style={{
          background: colors.cardBg,
          border: `1px solid ${colors.containerBorder}`,
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '18px 24px',
            borderBottom: `1px solid ${colors.border}`,
          }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: 600,
              color: colors.textDark,
              margin: 0,
            }}>
              Today's attendance
            </h3>
            <button
              onClick={handleGenerateReport}
              style={{
                background: colors.primary,
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 18px',
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'pointer',
                fontFamily: "'Poppins', sans-serif",
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => e.target.style.background = colors.primaryDark}
              onMouseLeave={(e) => e.target.style.background = colors.primary}
            >
              <i className="fas fa-file-alt" style={{ marginRight: '6px' }} />
              Generate report
            </button>
          </div>

          <div style={{
            display: 'flex',
            background: colors.tableHeaderBg,
            padding: '12px 24px',
          }}>
            <div style={{
              flex: 2,
              fontSize: '11px',
              fontWeight: 600,
              color: '#ffffff',
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
            }}>
              Employee and Position
            </div>
            <div style={{
              flex: 1,
              fontSize: '11px',
              fontWeight: 600,
              color: '#ffffff',
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
            }}>
              Check In
            </div>
            <div style={{
              flex: 1,
              fontSize: '11px',
              fontWeight: 600,
              color: '#ffffff',
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
            }}>
              Check Out
            </div>
          </div>

          {attendanceRecords.map((record, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '14px 24px',
                borderTop: idx === 0 ? 'none' : `1px solid ${colors.border}`,
                background: idx % 2 === 0 ? colors.cardBg : colors.bg,
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = colors.primaryLight}
              onMouseLeave={(e) => e.currentTarget.style.background = idx % 2 === 0 ? colors.cardBg : colors.bg}
            >
              <div style={{ flex: 2, display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: avatarColors[record.initials] || '#ccc',
                  color: '#fff',
                  fontSize: '12px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  {record.initials}
                </div>
                <span style={{ fontSize: '14px', color: colors.textDark }}>
                  {record.name} <span style={{ color: colors.textGray, fontSize: '13px' }}>· {record.role}</span>
                </span>
              </div>
              <div style={{ flex: 1, fontSize: '14px', color: colors.textDark, fontWeight: 500 }}>
                {record.checkIn}
              </div>
              <div style={{ flex: 1, fontSize: '14px', color: colors.textDark, fontWeight: 500 }}>
                {record.checkOut}
              </div>
            </div>
          ))}
        </div>
      </HRPageLayout>

      {/* ======================================== */}
      {/* GENERATE REPORT MODAL – Static Calendar Removed */}
      {/* ======================================== */}
      {isReportModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
        }}>
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '16px',
            padding: '32px',
            width: '100%',
            maxWidth: '480px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
            maxHeight: '90vh',
            overflowY: 'auto',
            position: 'relative',
          }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: 600,
              color: '#1A1A1A',
              margin: '0 0 20px 0',
              fontFamily: "'Poppins', sans-serif",
            }}>
              Generate attendance report
            </h2>

            {/* Date Range – From & To – Native Date Pickers */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <label style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: '#666666',
                  marginBottom: '4px',
                  fontFamily: "'Poppins', sans-serif",
                }}>
                  From
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    border: '1px solid #000000',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                    fontFamily: "'Poppins', sans-serif",
                    boxSizing: 'border-box',
                    background: '#fff',
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: '#666666',
                  marginBottom: '4px',
                  fontFamily: "'Poppins', sans-serif",
                }}>
                  To
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    border: '1px solid #000000',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                    fontFamily: "'Poppins', sans-serif",
                    boxSizing: 'border-box',
                    background: '#fff',
                  }}
                />
              </div>
            </div>

            {/* Clear & Today Buttons */}
            <div style={{
              display: 'flex',
              gap: '10px',
              marginBottom: '20px',
            }}>
              <button
                onClick={handleClear}
                style={{
                  padding: '8px 20px',
                  background: '#fff',
                  color: '#1A1A1A',
                  border: '1px solid #000000',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Clear
              </button>
              <button
                onClick={handleToday}
                style={{
                  padding: '8px 20px',
                  background: '#fff',
                  color: '#1A1A1A',
                  border: '1px solid #000000',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Today
              </button>
            </div>

            {/* Generate Report Button */}
            <button
              onClick={handleGenerate}
              style={{
                width: '100%',
                padding: '12px',
                background: '#00A19A',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: 500,
                cursor: 'pointer',
                fontFamily: "'Poppins', sans-serif",
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => e.target.style.background = '#008a84'}
              onMouseLeave={(e) => e.target.style.background = '#00A19A'}
            >
              Generate report
            </button>

            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              style={{
                position: 'absolute',
                top: '12px',
                right: '16px',
                background: 'transparent',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: '#666',
              }}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </HRLayout>
  );
}