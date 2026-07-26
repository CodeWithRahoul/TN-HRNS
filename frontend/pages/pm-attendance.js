import { useState } from 'react';
import PMLayout from '@/components/PMLayout';
import PMPageLayout from '@/components/PMPageLayout';

export default function PMAttendance() {
  // Attendance state
  const [checkInStatus, setCheckInStatus] = useState('idle');
  const [checkInTime, setCheckInTime] = useState('');

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

  const circleConfig = {
    idle: { bg: colors.primary, shadow: 'rgba(0,161,154,0.35)', label: 'Check in' },
    verifying: { bg: colors.verifying, shadow: 'rgba(244,161,26,0.35)', label: 'Verifying...' },
    'checked-in': { bg: colors.checkedIn, shadow: 'rgba(31,146,84,0.35)', label: 'Checked in' },
  };
  const currentCircle = circleConfig[checkInStatus];

  return (
    <PMLayout>
      <PMPageLayout title="Attendance">
        {/* No search bar, no table */}

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
              margin: '0 0 12px 0',
            }}>
              Geo-fence configuration
            </h3>
            <p style={{
              fontSize: '13px',
              color: colors.textGray,
              margin: '0 0 16px 0',
            }}>
              Geo-fence configuration is a feature that allows you to set up geo-fences for your team.
            </p>

            {/* BACK / DEFAULT buttons removed */}

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
                Office
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
                    Inside 1500 results
                  </p>
                </div>
                <p style={{
                  fontSize: '11px',
                  color: colors.textMuted,
                  margin: '6px 0 0 0',
                }}>
                  contact us for more information
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
      </PMPageLayout>
    </PMLayout>
  );
}