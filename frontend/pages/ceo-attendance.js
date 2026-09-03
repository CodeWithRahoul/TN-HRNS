import { useState } from 'react';
import CEOLayout from '@/components/CEOLayout';
import CEOPageLayout from '@/components/CEOPageLayout';

export default function CEOAttendance() {
  // Attendance state
  const [checkInStatus, setCheckInStatus] = useState('idle');
  const [checkInTime, setCheckInTime] = useState('');

  // Upload modal state
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [uploadLocation, setUploadLocation] = useState('Karachi');
  const [uploadDate, setUploadDate] = useState(
    new Date().toISOString().split('T')[0] // today's date
  );
  const [uploadFile, setUploadFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  // Active history tab
  const [activeTab, setActiveTab] = useState('all');

  // Current month being viewed
  const [monthOffset, setMonthOffset] = useState(0);
  const baseMonthDate = new Date(2026, 7, 1); // August 2026
  const viewedMonthDate = new Date(baseMonthDate.getFullYear(), baseMonthDate.getMonth() + monthOffset, 1);
  const monthLabel = viewedMonthDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  // Sample attendance history for the month
  const attendanceRecords = [
    { id: 1, status: 'Present', date: '01-08-2026', checkIn: '9:00 AM', checkOut: '5:00 PM', reason: '-', approvedBy: '-', recommendBy: '-' },
    { id: 2, status: 'Absent', date: '02-08-2026', checkIn: '-', checkOut: '-', reason: 'Personal Work', approvedBy: '-', recommendBy: '-' },
    { id: 3, status: 'Present', date: '03-08-2026', checkIn: '9:16 AM', checkOut: '5:16 PM', reason: '-', approvedBy: '-', recommendBy: '-' },
    { id: 4, status: 'Present', date: '04-08-2026', checkIn: '9:11 AM', checkOut: '5:12 PM', reason: '-', approvedBy: '-', recommendBy: '-' },
    { id: 5, status: 'Leave', date: '05-08-2026', checkIn: '-', checkOut: '-', reason: 'Medical appointment', approvedBy: 'HR', recommendBy: 'Team lead' },
    { id: 6, status: 'Weekend', date: '-', checkIn: '-', checkOut: '-', reason: '-', approvedBy: '-', recommendBy: '-' },
  ];

  const tabs = [
    { key: 'all', label: 'All' },
    { key: 'present', label: 'Present' },
    { key: 'absents', label: 'Absents' },
    { key: 'leaves', label: 'Leaves' },
  ];

  const statusToTab = {
    Present: 'present',
    Absent: 'absents',
    Leave: 'leaves',
    Weekend: 'weekend',
  };

  const filteredRecords = activeTab === 'all'
    ? attendanceRecords
    : attendanceRecords.filter((r) => statusToTab[r.status] === activeTab);

  const statusStyles = {
    Present: { text: '#1F9254', rowBg: 'transparent' },
    Absent: { text: '#C0392B', rowBg: '#F9DEDD' },
    Leave: { text: '#B5791A', rowBg: '#F6E3C8' },
    Weekend: { text: '#1A1A1A', rowBg: 'transparent' },
  };

  const colors = {
    primary: '#00A19A',
    primaryLight: '#E6F5F4',
    primaryDark: '#008a84',
    verifying: '#F4A11A',
    checkedIn: '#1F9254',
    border: '#e2e8e8',
    containerBorder: '#000000',
    textDark: '#1A1A1A',
    textGray: '#666666',
    textMuted: '#8a8f98',
    bg: '#F4FBFB',
    cardBg: '#FFFFFF',
    tableHeaderBg: '#EEF3F3',
    tableHeaderText: '#4A5560',
    mapBg: '#CDEAE7',
  };

  const formatNow = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'am' : 'pm';
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${ampm}`;
  };

  const handleCheckIn = () => {
    if (checkInStatus === 'checked-in') return;
    setCheckInStatus('verifying');
    setTimeout(() => {
      setCheckInTime(formatNow());
      setCheckInStatus('checked-in');
    }, 1800);
  };

  const handleCheckout = () => {
    setCheckInStatus('idle');
    setCheckInTime('');
  };

  const circleConfig = {
    idle: { bg: colors.primary, shadow: 'rgba(0,161,154,0.35)', label: 'Check in' },
    verifying: { bg: colors.verifying, shadow: 'rgba(244,161,26,0.35)', label: 'Verifying...' },
    'checked-in': { bg: colors.checkedIn, shadow: 'rgba(31,146,84,0.35)', label: 'Checked in' },
  };
  const currentCircle = circleConfig[checkInStatus];

  // Upload handlers
  const handleUploadSubmit = () => {
    alert(`Proof uploaded\nLocation: ${uploadLocation}\nDate: ${uploadDate}\nFile: ${uploadFile ? uploadFile.name : '—'}`);
    setUploadModalOpen(false);
    setUploadFile(null);
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUploadFile(e.target.files[0]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <CEOLayout>
      <CEOPageLayout title="Attendance">
        {/* ─── Top Row: Geo-fence + Your Attendance ─────── */}
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
              margin: '0 0 8px 0',
            }}>
              Geo-fence configuration
            </h3>
            <p style={{
              fontSize: '13px',
              color: colors.textGray,
              margin: '0 0 16px 0',
            }}>
              HR sets office location & radius only – each employee marks their own attendance and verification happens on their device
            </p>

            <div style={{
              position: 'relative',
              background: colors.mapBg,
              borderRadius: '12px',
              height: '160px',
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
                BUKC
              </div>
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                border: `1.5px dashed ${colors.primary}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
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
              gap: '10px',
              padding: '2px 2px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '13px', color: colors.textGray }}>Office coordinates</span>
                <span style={{ fontSize: '13px', fontWeight: 500, color: colors.textDark }}>24.8608° N, 67.0104° E</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '13px', color: colors.textGray }}>Configured radius</span>
                <span style={{ fontSize: '13px', fontWeight: 500, color: colors.textDark }}>500m</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '13px', color: colors.textGray }}>Allowed range</span>
                <span style={{ fontSize: '13px', fontWeight: 500, color: colors.textDark }}>200 m – 2 km</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '13px', color: colors.textGray }}>Applies to</span>
                <span style={{ fontSize: '13px', fontWeight: 500, color: colors.textDark }}>All employees</span>
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
              disabled={checkInStatus !== 'idle'}
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: currentCircle.bg,
                color: '#fff',
                border: 'none',
                cursor: checkInStatus === 'idle' ? 'pointer' : 'default',
                fontSize: '15px',
                fontWeight: 600,
                fontFamily: "'Poppins', sans-serif",
                boxShadow: `0 6px 20px ${currentCircle.shadow}`,
                marginBottom: '18px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                if (checkInStatus === 'idle') e.target.style.transform = 'scale(1.03)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
              }}
            >
              {currentCircle.label}
            </button>

            {checkInStatus === 'idle' && (
              <>
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
                  Location is verified at the moment you tap check in
                </p>
                <button
                  onClick={handleCheckIn}
                  style={{
                    marginTop: '16px',
                    padding: '8px 24px',
                    background: colors.primary,
                    color: '#fff',
                    border: 'none',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontFamily: "'Poppins', sans-serif",
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) => e.target.style.background = colors.primaryDark}
                  onMouseLeave={(e) => e.target.style.background = colors.primary}
                >
                  Mark my attendance
                </button>
              </>
            )}

            {checkInStatus === 'verifying' && (
              <p style={{
                fontSize: '12px',
                color: colors.textGray,
                margin: 0,
              }}>
                Confirming your location within radius
              </p>
            )}

            {checkInStatus === 'checked-in' && (
              <>
                <p style={{
                  fontSize: '13px',
                  fontWeight: 500,
                  color: colors.checkedIn,
                  margin: '0 0 12px 0',
                }}>
                  Attendance marked · {checkInTime}
                </p>
                <button
                  onClick={handleCheckout}
                  style={{
                    padding: '8px 24px',
                    background: '#E8483E',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontFamily: "'Poppins', sans-serif",
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#d43d34'}
                  onMouseLeave={(e) => e.target.style.background = '#E8483E'}
                >
                  Checkout
                </button>
              </>
            )}
          </div>
        </div>

        {/* ─── Attendance History ──────────────────────────────── */}
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
            margin: '0 0 16px 0',
          }}>
            Attendance history
          </h3>

          {/* Tabs row */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px',
            flexWrap: 'wrap',
            gap: '12px',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '28px',
              border: `1px solid ${colors.containerBorder}`,
              borderRadius: '10px',
              padding: '10px 20px',
            }}>
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: '14px',
                    fontWeight: activeTab === tab.key ? 700 : 500,
                    color: colors.textDark,
                    padding: '2px 0 6px 0',
                    borderBottom: activeTab === tab.key ? `2px solid ${colors.primary}` : '2px solid transparent',
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => setUploadModalOpen(true)}
              style={{
                background: colors.primary,
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: "'Poppins', sans-serif",
                padding: '12px 20px',
              }}
              onMouseEnter={(e) => e.target.style.background = colors.primaryDark}
              onMouseLeave={(e) => e.target.style.background = colors.primary}
            >
              Upload proofs
            </button>
          </div>

          {/* Month navigator + table */}
          <div style={{
            border: `1px solid ${colors.containerBorder}`,
            borderRadius: '12px',
            overflow: 'hidden',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '14px',
              padding: '16px 0',
            }}>
              <button
                onClick={() => setMonthOffset((m) => m - 1)}
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  border: 'none',
                  background: colors.primary,
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '12px',
                }}
              >
                <i className="fas fa-chevron-left" />
              </button>
              <span style={{
                fontSize: '16px',
                fontWeight: 700,
                color: colors.primary,
                fontFamily: "'Poppins', sans-serif",
              }}>
                {monthLabel}
              </span>
              <button
                onClick={() => setMonthOffset((m) => m + 1)}
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  border: 'none',
                  background: colors.primary,
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '12px',
                }}
              >
                <i className="fas fa-chevron-right" />
              </button>
            </div>

            {/* History Table */}
            <div style={{ overflowX: 'auto', maxHeight: '340px', overflowY: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: colors.tableHeaderBg, borderBottom: `1px solid ${colors.containerBorder}` }}>
                    <th style={{ padding: '10px 16px', textAlign: 'left', fontSize: '13px', fontWeight: 600, color: colors.tableHeaderText }}>Status</th>
                    <th style={{ padding: '10px 16px', textAlign: 'left', fontSize: '13px', fontWeight: 600, color: colors.tableHeaderText }}>Date</th>
                    <th style={{ padding: '10px 16px', textAlign: 'left', fontSize: '13px', fontWeight: 600, color: colors.tableHeaderText }}>Check in</th>
                    <th style={{ padding: '10px 16px', textAlign: 'left', fontSize: '13px', fontWeight: 600, color: colors.tableHeaderText }}>Check out</th>
                    <th style={{ padding: '10px 16px', textAlign: 'left', fontSize: '13px', fontWeight: 600, color: colors.tableHeaderText }}>Reason</th>
                    <th style={{ padding: '10px 16px', textAlign: 'left', fontSize: '13px', fontWeight: 600, color: colors.tableHeaderText }}>Approved by</th>
                    <th style={{ padding: '10px 16px', textAlign: 'left', fontSize: '13px', fontWeight: 600, color: colors.tableHeaderText }}>Recommend by</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.map((record) => {
                    const style = statusStyles[record.status] || statusStyles.Present;
                    return (
                      <tr key={record.id} style={{ background: style.rowBg, borderBottom: `1px solid ${colors.border}` }}>
                        <td style={{ padding: '12px 16px', fontSize: '14px', fontWeight: 700, color: style.text }}>{record.status}</td>
                        <td style={{ padding: '12px 16px', fontSize: '14px', color: colors.textDark }}>{record.date}</td>
                        <td style={{ padding: '12px 16px', fontSize: '14px', color: colors.textDark }}>{record.checkIn}</td>
                        <td style={{ padding: '12px 16px', fontSize: '14px', color: colors.textDark }}>{record.checkOut}</td>
                        <td style={{ padding: '12px 16px', fontSize: '14px', color: colors.textDark }}>{record.reason}</td>
                        <td style={{ padding: '12px 16px', fontSize: '14px', color: colors.textDark }}>{record.approvedBy}</td>
                        <td style={{ padding: '12px 16px', fontSize: '14px', color: colors.textDark }}>{record.recommendBy}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </CEOPageLayout>

      {/* ─── Upload Proofs Modal ────────────────────────────────── */}
      {uploadModalOpen && (
        <div
          onClick={() => setUploadModalOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(20, 30, 35, 0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: colors.cardBg,
              borderRadius: '18px',
              padding: '32px 28px 32px 28px',
              width: '100%',
              maxWidth: '440px',
              boxShadow: '0 20px 50px rgba(0,0,0,0.18)',
              position: 'relative',
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setUploadModalOpen(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                border: 'none',
                background: '#FBE4E4',
                color: '#DC2626',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
              }}
            >
              <i className="fas fa-times" />
            </button>

            {/* Location */}
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: 600,
              color: colors.textDark,
              marginBottom: '6px',
              marginTop: '8px',
            }}>
              Location
            </label>
            <input
              type="text"
              value={uploadLocation}
              onChange={(e) => setUploadLocation(e.target.value)}
              style={{
                width: '100%',
                padding: '11px 14px',
                border: `1px solid ${colors.containerBorder}`,
                borderRadius: '10px',
                fontSize: '13px',
                outline: 'none',
                fontFamily: "'Poppins', sans-serif",
                color: colors.textDark,
                marginBottom: '16px',
                boxSizing: 'border-box',
              }}
            />

            {/* Date */}
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: 600,
              color: colors.textDark,
              marginBottom: '6px',
            }}>
              Date
            </label>
            <input
              type="date"
              value={uploadDate}
              onChange={(e) => setUploadDate(e.target.value)}
              style={{
                width: '100%',
                padding: '11px 14px',
                border: `1px solid ${colors.containerBorder}`,
                borderRadius: '10px',
                fontSize: '13px',
                outline: 'none',
                fontFamily: "'Poppins', sans-serif",
                color: colors.textDark,
                marginBottom: '16px',
                boxSizing: 'border-box',
              }}
            />

            {/* Upload file */}
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: 600,
              color: colors.textDark,
              marginBottom: '6px',
            }}>
              Upload proofs
            </label>
            <label
              htmlFor="ceo-upload-proof"
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '26px 16px',
                border: `1.5px dashed ${isDragging ? colors.primary : colors.containerBorder}`,
                borderRadius: '12px',
                background: isDragging ? colors.primaryLight : colors.bg,
                cursor: 'pointer',
                textAlign: 'center',
                marginBottom: '24px',
                transition: 'all 0.15s',
              }}
            >
              <i className="fas fa-cloud-upload-alt" style={{ fontSize: '20px', color: colors.textMuted }} />
              <span style={{ fontSize: '13.5px', fontWeight: 600, color: colors.textDark }}>
                {uploadFile ? uploadFile.name : 'Click to upload or drag files here'}
              </span>
              <span style={{ fontSize: '11.5px', color: colors.textMuted }}>
                Screenshots, PDFs, or docs — up to 25MB
              </span>
              <input
                id="ceo-upload-proof"
                type="file"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
              />
            </label>

            {/* Submit button */}
            <button
              onClick={handleUploadSubmit}
              style={{
                width: '100%',
                padding: '12px',
                background: colors.primary,
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: "'Poppins', sans-serif",
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => e.target.style.background = colors.primaryDark}
              onMouseLeave={(e) => e.target.style.background = colors.primary}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </CEOLayout>
  );
}