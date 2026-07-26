import { useState } from 'react';
import HRLayout from '@/components/HRLayout';
import HRPageLayout from '@/components/HRPageLayout';

export default function Attendance() {
  const [searchQuery, setSearchQuery] = useState('');
  // 'idle' | 'verifying' | 'checked-in'
  const [checkInStatus, setCheckInStatus] = useState('idle');
  const [checkInTime, setCheckInTime] = useState('');
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isGeoFenceModalOpen, setIsGeoFenceModalOpen] = useState(false);

  // Geo-fence form fields
  const [officeLocation, setOfficeLocation] = useState('');
  const [radius, setRadius] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [appliesTo, setAppliesTo] = useState('');

  // Filter dropdown state
  const [openFilter, setOpenFilter] = useState(null); // 'position' | 'project' | 'employee' | null
  const [positionFilter, setPositionFilter] = useState('');
  const [projectFilter, setProjectFilter] = useState('');
  const [employeeFilter, setEmployeeFilter] = useState('');

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

  const avatarColors = {
    'SK': '#F4B400',
    'TR': '#2FBF71',
    'BA': '#3B5BDB',
  };

  const attendanceRecords = [
    { initials: 'SK', name: 'Sara kareem', role: 'UI/UX designer', project: 'Nexovate', checkIn: '5:00 PM', checkOut: '5:00 PM' },
    { initials: 'TR', name: 'Tehreem raja', role: 'Frontend dev', project: 'Nexovate', checkIn: '5:05 PM', checkOut: '5:05 PM' },
    { initials: 'BA', name: 'Bilal ahmed', role: 'Project manager', project: 'TN-HRMS', checkIn: '5:16 PM', checkOut: '5:16 PM' },
  ];

  const positionOptions = ['QA engineer', 'Project manager', 'Frontend dev', 'Backend dev', 'UI/UX designer'];
  const projectOptions = ['Nexovate', 'TN-HRMS', 'Nexus desktop'];
  const employeeOptions = ['Sara kareem', 'Tehreem raja', 'Saleem ahmed', 'Abdul rehman', 'Bilal ahmed'];

  const filteredRecords = attendanceRecords.filter((record) => {
    const matchesPosition = !positionFilter || record.role === positionFilter;
    const matchesProject = !projectFilter || record.project === projectFilter;
    const matchesEmployee = !employeeFilter || record.name === employeeFilter;
    const matchesSearch = !searchQuery || record.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPosition && matchesProject && matchesEmployee && matchesSearch;
  });

  const formatNow = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';
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

  const toggleFilter = (name) => {
    setOpenFilter(openFilter === name ? null : name);
  };

  const renderFilterDropdown = (label, name, options, value, setValue) => (
    <div style={{ position: 'relative', flex: 1 }}>
      <button
        onClick={() => toggleFilter(name)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: colors.cardBg,
          border: `1px solid ${colors.containerBorder}`,
          borderRadius: '8px',
          padding: '10px 14px',
          fontSize: '13px',
          fontWeight: 500,
          color: colors.textDark,
          fontFamily: "'Poppins', sans-serif",
          cursor: 'pointer',
        }}
      >
        <span>{value || label}</span>
        <i
          className="fas fa-chevron-down"
          style={{
            fontSize: '11px',
            color: colors.primary,
            transform: openFilter === name ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.15s',
          }}
        />
      </button>

      {openFilter === name && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 6px)',
          left: 0,
          right: 0,
          background: colors.cardBg,
          border: `1px solid ${colors.border}`,
          borderRadius: '10px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          zIndex: 20,
          overflow: 'hidden',
        }}>
          <div
            onClick={() => { setValue(''); setOpenFilter(null); }}
            style={{
              padding: '10px 14px',
              fontSize: '13px',
              color: colors.textGray,
              cursor: 'pointer',
              fontFamily: "'Poppins', sans-serif",
              background: !value ? colors.primaryLight : colors.cardBg,
            }}
          >
            All
          </div>
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => { setValue(opt); setOpenFilter(null); }}
              style={{
                padding: '10px 14px',
                fontSize: '13px',
                color: opt === value ? '#fff' : colors.textDark,
                cursor: 'pointer',
                fontFamily: "'Poppins', sans-serif",
                background: opt === value ? colors.primary : colors.cardBg,
              }}
              onMouseEnter={(e) => { if (opt !== value) e.currentTarget.style.background = colors.primaryLight; }}
              onMouseLeave={(e) => { if (opt !== value) e.currentTarget.style.background = colors.cardBg; }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // Attendance circle content based on status
  const circleConfig = {
    idle: { bg: colors.primary, shadow: 'rgba(0,161,154,0.35)', label: 'Check in' },
    verifying: { bg: colors.verifying, shadow: 'rgba(244,161,26,0.35)', label: 'Verifying...' },
    'checked-in': { bg: colors.checkedIn, shadow: 'rgba(31,146,84,0.35)', label: 'Checked in' },
  };
  const currentCircle = circleConfig[checkInStatus];

  const handleSaveGeoFence = () => {
    alert(`Geo-fence configuration saved!\nOffice: ${officeLocation || 'N/A'}\nRadius: ${radius || 'N/A'}\nLatitude: ${latitude || 'N/A'}\nLongitude: ${longitude || 'N/A'}\nApplies to: ${appliesTo || 'N/A'}`);
    setIsGeoFenceModalOpen(false);
  };

  return (
    <HRLayout>
      <HRPageLayout title="Attendance">
        {/* Search Bar Removed */}

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
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              marginBottom: '4px',
            }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: 600,
                color: colors.textDark,
                margin: 0,
              }}>
                Geo-fence configuration
              </h3>
              <button
                onClick={() => setIsGeoFenceModalOpen(true)}
                style={{
                  background: colors.cardBg,
                  color: colors.primary,
                  border: `1px solid ${colors.primary}`,
                  borderRadius: '8px',
                  padding: '7px 14px',
                  fontSize: '12px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  fontFamily: "'Poppins', sans-serif",
                  whiteSpace: 'nowrap',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => e.target.style.background = colors.primaryLight}
                onMouseLeave={(e) => e.target.style.background = colors.cardBg}
              >
                Edit location &amp; radius
              </button>
            </div>
            <p style={{
              fontSize: '13px',
              color: colors.textGray,
              margin: '0 0 16px 0',
            }}>
              HR sets office location &amp; radius only – each employee marks their own attendance and verification happens on their device
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
                BUKC
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
                  Auto disable outside the fence
                </p>
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
              <p style={{
                fontSize: '13px',
                fontWeight: 500,
                color: colors.checkedIn,
                margin: 0,
              }}>
                Attendance marked: {checkInTime}
              </p>
            )}
          </div>
        </div>

        {/* Today's Attendance Table */}
        <div style={{
          background: colors.cardBg,
          border: `1px solid ${colors.containerBorder}`,
          borderRadius: '16px',
          overflow: 'visible',
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
                background: colors.cardBg,
                color: colors.primary,
                border: `1px solid ${colors.primary}`,
                borderRadius: '8px',
                padding: '8px 18px',
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'pointer',
                fontFamily: "'Poppins', sans-serif",
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => e.target.style.background = colors.primaryLight}
              onMouseLeave={(e) => e.target.style.background = colors.cardBg}
            >
              Generate attendance report
            </button>
          </div>

          {/* Filters Row */}
          <div style={{
            display: 'flex',
            gap: '16px',
            padding: '16px 24px',
            borderBottom: `1px solid ${colors.border}`,
            background: colors.bg,
          }}>
            {renderFilterDropdown('Filter by position', 'position', positionOptions, positionFilter, setPositionFilter)}
            {renderFilterDropdown('Filter by project', 'project', projectOptions, projectFilter, setProjectFilter)}
            {renderFilterDropdown('Filter by employee', 'employee', employeeOptions, employeeFilter, setEmployeeFilter)}
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: colors.tableHeaderBg,
            padding: '12px 24px',
          }}>
            <div style={{ width: '28px', flexShrink: 0 }} />
            <div style={{
              flex: 2,
              fontSize: '12px',
              fontWeight: 600,
              color: colors.tableHeaderText,
            }}>
              Employee
            </div>
            <div style={{
              flex: 1,
              fontSize: '12px',
              fontWeight: 600,
              color: colors.tableHeaderText,
            }}>
              Position
            </div>
            <div style={{
              flex: 1,
              fontSize: '12px',
              fontWeight: 600,
              color: colors.tableHeaderText,
            }}>
              Project
            </div>
            <div style={{
              flex: 1,
              fontSize: '12px',
              fontWeight: 600,
              color: colors.tableHeaderText,
            }}>
              Check in
            </div>
            <div style={{
              flex: 1,
              fontSize: '12px',
              fontWeight: 600,
              color: colors.tableHeaderText,
            }}>
              Check out
            </div>
          </div>

          {filteredRecords.map((record, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '14px 24px',
                borderTop: idx === 0 ? 'none' : `1px solid ${colors.border}`,
                background: colors.cardBg,
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = colors.primaryLight}
              onMouseLeave={(e) => e.currentTarget.style.background = colors.cardBg}
            >
              <div style={{ width: '28px', flexShrink: 0 }}>
                <input type="checkbox" style={{ width: '16px', height: '16px', cursor: 'pointer' }} />
              </div>
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
                  {record.name}
                </span>
              </div>
              <div style={{ flex: 1, fontSize: '14px', color: colors.textDark }}>
                {record.role}
              </div>
              <div style={{ flex: 1, fontSize: '14px', color: colors.textDark }}>
                {record.project}
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
      {/* GENERATE REPORT MODAL */}
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

      {/* ======================================== */}
      {/* CONFIGURE GEO-FENCE MODAL - EMPTY FIELDS */}
      {/* ======================================== */}
      {isGeoFenceModalOpen && (
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
            maxWidth: '440px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
            maxHeight: '90vh',
            overflowY: 'auto',
            position: 'relative',
          }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: 600,
              color: '#1A1A1A',
              margin: '0 0 24px 0',
              fontFamily: "'Poppins', sans-serif",
            }}>
              Configure geo-fence
            </h2>

            {/* Office location */}
            <div style={{ marginBottom: '18px' }}>
              <label style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: 500,
                color: '#666666',
                marginBottom: '4px',
                fontFamily: "'Poppins', sans-serif",
              }}>
                Office location
              </label>
              <input
                type="text"
                value={officeLocation}
                onChange={(e) => setOfficeLocation(e.target.value)}
                placeholder="Enter office location"
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

            {/* Radius */}
            <div style={{ marginBottom: '18px' }}>
              <label style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: 500,
                color: '#666666',
                marginBottom: '4px',
                fontFamily: "'Poppins', sans-serif",
              }}>
                Radius
              </label>
              <input
                type="text"
                value={radius}
                onChange={(e) => setRadius(e.target.value)}
                placeholder="Enter radius (e.g. 200m)"
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

            {/* Coordinates - two inputs side by side */}
            <div style={{ marginBottom: '18px' }}>
              <label style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: 500,
                color: '#666666',
                marginBottom: '4px',
                fontFamily: "'Poppins', sans-serif",
              }}>
                Coordinates
              </label>
              <div style={{ display: 'flex', gap: '12px' }}>
                <input
                  type="text"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  placeholder="Latitude"
                  style={{
                    flex: 1,
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
                <input
                  type="text"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  placeholder="Longitude"
                  style={{
                    flex: 1,
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

            {/* Applies to */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: 500,
                color: '#666666',
                marginBottom: '4px',
                fontFamily: "'Poppins', sans-serif",
              }}>
                Applies to
              </label>
              <input
                type="text"
                value={appliesTo}
                onChange={(e) => setAppliesTo(e.target.value)}
                placeholder="Enter applies to (e.g. All employees)"
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

            {/* Save Button */}
            <button
              onClick={handleSaveGeoFence}
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
              Save
            </button>

            {/* Close Button */}
            <button
              onClick={() => setIsGeoFenceModalOpen(false)}
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