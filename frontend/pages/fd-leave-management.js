import { useState } from 'react';
import FDLayout from '@/components/FDLayout';
import FDPageLayout from '@/components/FDPageLayout';

export default function FDLeaveManagement() {
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [leaveType, setLeaveType] = useState('Annual leave');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');

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
    tableHeaderBg: '#B7C0C4',
    stepLine: '#00A19A',
    stepPending: '#9CA3AF',
  };

  // Sample data – current user's leave history
  const leaveHistory = [
    { id: 1, type: 'Annual leave', dates: 'Aug 5 - Aug 9, 2026 (1 day)', applied: 'Jul 24', status: 'Pending' },
    { id: 2, type: 'Casual leave', dates: 'Jun 10 (1 day)', applied: 'Jun 6', status: 'Approved' },
    { id: 3, type: 'Sick leave', dates: 'March 15, 2026 (1 day)', applied: 'May 20', status: 'Approved' },
    { id: 4, type: 'Casual leave', dates: 'May 16, 2026 (1 day)', applied: 'March 14', status: 'Disapproved' },
  ];

  // Current pending request (for approval status)
  const pendingRequest = {
    type: 'annual leave',
    duration: '5 day',
    submittedDate: 'Jul 24, 11:02 AM',
    pmReview: { name: 'Bilal Ahmed', date: 'Jul 24, 3:40 PM' },
    hrStatus: 'Pending',
  };

  const statusBadgeStyles = {
    Pending: { bg: '#FBE7C6', text: '#B5791A', dot: '#F59E0B' },
    Approved: { bg: '#D9F2E3', text: '#1F9254', dot: '#10B981' },
    Disapproved: { bg: '#F9DEDD', text: '#C0392B', dot: '#EF4444' },
  };

  const handleApplySubmit = () => {
    alert(`Leave request submitted:\nType: ${leaveType}\nStart: ${startDate}\nEnd: ${endDate}\nReason: ${reason}`);
    setShowApplyModal(false);
    setLeaveType('Annual leave');
    setStartDate('');
    setEndDate('');
    setReason('');
  };

  const applyLeaveButton = (
    <button
      onClick={() => setShowApplyModal(true)}
      style={{
        padding: '12px 22px',
        background: colors.primary,
        color: '#fff',
        border: 'none',
        borderRadius: '10px',
        fontSize: '14px',
        fontWeight: 600,
        cursor: 'pointer',
        fontFamily: "'Poppins', sans-serif",
        transition: 'background 0.2s',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={(e) => e.target.style.background = colors.primaryDark}
      onMouseLeave={(e) => e.target.style.background = colors.primary}
    >
      Apply for leave
    </button>
  );

  return (
    <FDLayout>
      <FDPageLayout title="Leave request">
        {/* ─── Top Row: Approval Status + Apply button ─────────── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2.4fr 1fr',
          gap: '24px',
          marginBottom: '24px',
          alignItems: 'start',
        }}>
          {/* Approval Status */}
          <div style={{
            background: colors.cardBg,
            border: `1px solid ${colors.border}`,
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
              Approval status
            </h3>
            <p style={{ fontSize: '13px', color: colors.textGray, margin: '0 0 24px 0' }}>
              Your most recent request
            </p>

            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              {/* Step 1: Submitted */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', flex: '0 0 auto', maxWidth: '180px' }}>
                <div style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  background: colors.primary,
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '13px',
                  marginBottom: '10px',
                }}>
                  <i className="fas fa-check" />
                </div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: colors.primary, lineHeight: 1.3 }}>
                  Submitted<br />by you
                </div>
                <div style={{ fontSize: '12.5px', color: colors.textGray, marginTop: '6px', lineHeight: 1.4 }}>
                  {pendingRequest.submittedDate} ·<br />{pendingRequest.duration} {pendingRequest.type}
                </div>
              </div>

              {/* Connector line */}
              <div style={{ flex: 1, height: '2px', background: colors.stepLine, marginTop: '14px', minWidth: '40px' }} />

              {/* Step 2: PM review */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', flex: '0 0 auto', maxWidth: '190px' }}>
                <div style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  background: colors.stepPending,
                  marginBottom: '10px',
                }} />
                <div style={{ fontSize: '14px', fontWeight: 700, color: colors.textDark, lineHeight: 1.3 }}>
                  Reviewed &amp;<br />approved by PM
                </div>
                <div style={{ fontSize: '12.5px', color: colors.textGray, marginTop: '6px', lineHeight: 1.4 }}>
                  {pendingRequest.pmReview.name} ·<br />{pendingRequest.pmReview.date}
                </div>
              </div>

              {/* Connector line */}
              <div style={{ flex: 1, height: '2px', background: colors.stepPending, marginTop: '14px', minWidth: '40px' }} />

              {/* Step 3: HR final approval */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', flex: '0 0 auto', maxWidth: '180px' }}>
                <div style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  background: colors.stepPending,
                  marginBottom: '10px',
                }} />
                <div style={{ fontSize: '14px', fontWeight: 700, color: colors.textDark, lineHeight: 1.3 }}>
                  Awaiting final<br />approval — HR
                </div>
                <div style={{ fontSize: '13px', color: '#B5791A', fontWeight: 500, marginTop: '6px' }}>
                  {pendingRequest.hrStatus}
                </div>
              </div>
            </div>
          </div>

          {/* Apply for leave button — top right, matching reference image */}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            {applyLeaveButton}
          </div>
        </div>

        {/* ─── Leave History ────────────────────────────────────── */}
        <div style={{
          background: colors.cardBg,
          border: `1px solid ${colors.border}`,
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        }}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: 700,
            color: colors.textDark,
            margin: '0 0 16px 0',
          }}>
            Leave history
          </h3>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: colors.tableHeaderBg }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '13.5px', fontWeight: 700, color: colors.textDark }}>Type</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: '13.5px', fontWeight: 700, color: colors.textDark }}>Dates</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: '13.5px', fontWeight: 700, color: colors.textDark }}>Applied</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: '13.5px', fontWeight: 700, color: colors.textDark }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {leaveHistory.map((record) => {
                  const badge = statusBadgeStyles[record.status];
                  return (
                    <tr key={record.id} style={{ borderBottom: `1px solid ${colors.border}` }}>
                      <td style={{ padding: '16px 16px', fontSize: '14px', color: colors.textDark }}>{record.type}</td>
                      <td style={{ padding: '16px 16px', fontSize: '14px', color: colors.textDark, textAlign: 'center' }}>{record.dates}</td>
                      <td style={{ padding: '16px 16px', fontSize: '14px', color: colors.textDark, textAlign: 'center' }}>{record.applied}</td>
                      <td style={{ padding: '16px 16px', textAlign: 'center' }}>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontSize: '13px',
                          fontWeight: 600,
                          color: badge.text,
                          background: badge.bg,
                          borderRadius: '20px',
                          padding: '5px 14px',
                        }}>
                          <span style={{
                            display: 'inline-block',
                            width: '7px',
                            height: '7px',
                            borderRadius: '50%',
                            background: badge.dot,
                          }} />
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </FDPageLayout>

      {/* ─── Apply for Leave Modal ────────────────────────────── */}
      {showApplyModal && (
        <div
          onClick={() => setShowApplyModal(false)}
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
              padding: '28px 28px 32px 28px',
              width: '100%',
              maxWidth: '440px',
              boxShadow: '0 20px 50px rgba(0,0,0,0.18)',
              position: 'relative',
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setShowApplyModal(false)}
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

            <h3 style={{
              fontSize: '20px',
              fontWeight: 700,
              color: colors.textDark,
              margin: '0 0 24px 0',
            }}>
              Apply for leave
            </h3>

            {/* Leave type */}
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: 600,
              color: colors.textDark,
              marginBottom: '6px',
            }}>
              Leave type
            </label>
            <select
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
              style={{
                width: '100%',
                padding: '11px 14px',
                border: `1px solid ${colors.border}`,
                borderRadius: '10px',
                fontSize: '13px',
                outline: 'none',
                fontFamily: "'Poppins', sans-serif",
                color: colors.textDark,
                marginBottom: '16px',
                boxSizing: 'border-box',
                background: colors.cardBg,
                appearance: 'auto',
              }}
            >
              <option value="Annual leave">Annual leave</option>
              <option value="Casual leave">Casual leave</option>
              <option value="Sick leave">Sick leave</option>
              <option value="Maternity leave">Maternity leave</option>
              <option value="Paternity leave">Paternity leave</option>
            </select>

            {/* Start date / End date side by side */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: colors.textDark,
                  marginBottom: '6px',
                }}>
                  Start date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    border: `1px solid ${colors.border}`,
                    borderRadius: '10px',
                    fontSize: '13px',
                    outline: 'none',
                    fontFamily: "'Poppins', sans-serif",
                    color: colors.textDark,
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: colors.textDark,
                  marginBottom: '6px',
                }}>
                  End date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    border: `1px solid ${colors.border}`,
                    borderRadius: '10px',
                    fontSize: '13px',
                    outline: 'none',
                    fontFamily: "'Poppins', sans-serif",
                    color: colors.textDark,
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            </div>

            {/* Reason */}
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: 600,
              color: colors.textDark,
              marginBottom: '6px',
            }}>
              Reason
            </label>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder=""
              style={{
                width: '100%',
                padding: '11px 14px',
                border: `1px solid ${colors.border}`,
                borderRadius: '10px',
                fontSize: '13px',
                outline: 'none',
                fontFamily: "'Poppins', sans-serif",
                color: colors.textDark,
                marginBottom: '24px',
                boxSizing: 'border-box',
                background: colors.cardBg,
              }}
            />

            {/* Submit button */}
            <button
              onClick={handleApplySubmit}
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
    </FDLayout>
  );
}