import { useState } from 'react';
import CFOLayout from '@/components/CFOLayout';
import CFOPageLayout from '@/components/CFOPageLayout';

export default function CFOLeaveRequest() {
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [leaveType, setLeaveType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');

  const colors = {
    primary: '#00A19A',
    primaryDark: '#008a84',
    border: '#000000',
    inputBorder: '#D9D9D9',
    textDark: '#1A1A1A',
    textGray: '#666666',
    textMuted: '#8a8f98',
    bg: '#F4FBFB',
    cardBg: '#FFFFFF',
    tableHeaderBg: '#B3B3B3',
    closeRed: '#E85D5D',
  };

  const approvalStatus = {
    submittedDate: 'Jul 24, 11:02 AM',
    duration: '5 day annual leave',
    awaitingLabel: 'Awaiting approval — HR',
    awaitingSubLabel: 'Pending',
  };

  const leaveHistory = [
    { id: 1, type: 'Annual leave', dates: 'Aug 5 - Aug 9, 2026 (1 day)', applied: 'Jul 24', status: 'Pending' },
    { id: 2, type: 'Casual leave', dates: 'Jun 10 (1 day)', applied: 'Jun 6', status: 'Approved' },
    { id: 3, type: 'Sick leave', dates: 'March 15, 2026 (1 day)', applied: 'May 20', status: 'Approved' },
    { id: 4, type: 'Casual leave', dates: 'May 16, 2026 (1 day)', applied: 'March 14', status: 'Disapproved' },
  ];

  const getStatusColor = (status) => {
    const map = {
      Pending: { bg: '#FDE9D0', text: '#B9740B' },
      Approved: { bg: '#D1FAE5', text: '#059669' },
      Disapproved: { bg: '#FEE2E2', text: '#DC2626' },
    };
    return map[status] || { bg: '#F3F4F6', text: '#6B7280' };
  };

  const closeModal = () => {
    setShowApplyModal(false);
    setLeaveType('');
    setStartDate('');
    setEndDate('');
    setReason('');
  };

  const handleSubmit = () => {
    if (!leaveType || !startDate || !endDate) {
      alert('Please fill leave type and dates.');
      return;
    }
    alert(`Leave request submitted: ${leaveType}, ${startDate} - ${endDate}`);
    closeModal();
  };

  const inputStyle = {
    width: '100%',
    padding: '10px 12px',
    borderRadius: '8px',
    border: `1px solid ${colors.inputBorder}`,
    fontSize: '13px',
    fontFamily: "'Poppins', sans-serif",
    color: colors.textDark,
    boxSizing: 'border-box',
    outline: 'none',
  };

  const labelStyle = {
    fontSize: '12.5px',
    fontWeight: 600,
    color: colors.textDark,
    marginBottom: '6px',
    display: 'block',
  };

  return (
    <CFOLayout>
      <CFOPageLayout title="Leave request">
        {/* Apply for leave button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
          <button
            onClick={() => setShowApplyModal(true)}
            style={{
              background: colors.primary,
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 20px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Apply for leave
          </button>
        </div>

        {/* Approval status card */}
        <div style={{
          background: colors.cardBg,
          border: `1px solid ${colors.border}`,
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: colors.textDark, margin: '0 0 4px 0' }}>
            Approval status
          </h2>
          <p style={{ fontSize: '13px', color: colors.textGray, margin: '0 0 24px 0' }}>
            Your most recent request
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0', maxWidth: '480px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minWidth: '160px' }}>
              <div style={{
                width: '28px', height: '28px', borderRadius: '50%',
                background: colors.primary, color: '#fff', display: 'flex',
                alignItems: 'center', justifyContent: 'center', fontSize: '13px', marginBottom: '10px',
              }}>
                <i className="fas fa-check" />
              </div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: colors.primary }}>
                Submitted<br />by you
              </div>
              <div style={{ fontSize: '11.5px', color: colors.textGray, marginTop: '4px' }}>
                {approvalStatus.submittedDate} ·<br />{approvalStatus.duration}
              </div>
            </div>

            <div style={{ flex: 1, height: '2px', background: colors.primary, marginTop: '-46px' }} />

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minWidth: '160px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#D9D9D9', marginBottom: '10px' }} />
              <div style={{ fontSize: '13px', fontWeight: 700, color: colors.textDark }}>
                {approvalStatus.awaitingLabel}
              </div>
              <div style={{ fontSize: '11.5px', color: colors.textGray, marginTop: '4px' }}>
                {approvalStatus.awaitingSubLabel}
              </div>
            </div>
          </div>
        </div>

        {/* Leave history table */}
        <div style={{
          background: colors.cardBg,
          border: `1px solid ${colors.border}`,
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: colors.textDark, margin: 0, padding: '20px 24px 16px' }}>
            Leave history
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.5fr 1fr 1fr',
            background: colors.tableHeaderBg,
            padding: '14px 24px',
          }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: colors.textDark }}>Type</div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: colors.textDark }}>Dates</div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: colors.textDark }}>Applied</div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: colors.textDark }}>Status</div>
          </div>

          {leaveHistory.map((row, i) => {
            const statusColor = getStatusColor(row.status);
            return (
              <div
                key={row.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1.5fr 1fr 1fr',
                  padding: '18px 24px',
                  alignItems: 'center',
                  borderTop: i === 0 ? 'none' : '1px solid #EFEFEF',
                }}
              >
                <div style={{ fontSize: '14px', color: colors.textDark }}>{row.type}</div>
                <div style={{ fontSize: '14px', color: colors.textDark }}>{row.dates}</div>
                <div style={{ fontSize: '14px', color: colors.textDark }}>{row.applied}</div>
                <div>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    background: statusColor.bg, color: statusColor.text,
                    fontSize: '12px', fontWeight: 600, padding: '4px 12px', borderRadius: '20px',
                  }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: statusColor.text }} />
                    {row.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ─── Apply for leave modal ─────────────────────────────────── */}
        {showApplyModal && (
          <div
            onClick={closeModal}
            style={{
              position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
              background: 'rgba(0,0,0,0.45)', display: 'flex',
              alignItems: 'center', justifyContent: 'center', zIndex: 50,
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                background: colors.cardBg,
                borderRadius: '16px',
                padding: '28px 26px',
                width: '380px',
                maxWidth: '90vw',
                position: 'relative',
                boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
              }}
            >
              {/* Close (X) button */}
              <button
                onClick={closeModal}
                style={{
                  position: 'absolute',
                  top: '18px',
                  right: '18px',
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  background: colors.closeRed,
                  color: '#fff',
                  border: 'none',
                  fontSize: '13px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <i className="fas fa-times" />
              </button>

              <h3 style={{ margin: '0 0 20px 0', fontSize: '17px', fontWeight: 700, color: colors.textDark }}>
                Apply for leave
              </h3>

              {/* Leave type */}
              <div style={{ marginBottom: '16px' }}>
                <label style={labelStyle}>Leave type</label>
                <select
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value)}
                  style={{ ...inputStyle, cursor: 'pointer', appearance: 'auto' }}
                >
                  <option value="">Select leave type</option>
                  <option value="Annual leave">Annual leave</option>
                  <option value="Casual leave">Casual leave</option>
                  <option value="Sick leave">Sick leave</option>
                  <option value="Unpaid leave">Unpaid leave</option>
                </select>
              </div>

              {/* Start / End date */}
              <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Start date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    style={inputStyle}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>End date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* Reason */}
              <div style={{ marginBottom: '22px' }}>
                <label style={labelStyle}>Reason</label>
                <input
                  type="text"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Briefly describe your reason"
                  style={inputStyle}
                />
              </div>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                style={{
                  width: '100%',
                  background: colors.primary,
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px 0',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: "'Poppins', sans-serif",
                }}
                onMouseEnter={(e) => (e.target.style.background = colors.primaryDark)}
                onMouseLeave={(e) => (e.target.style.background = colors.primary)}
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </CFOPageLayout>
    </CFOLayout>
  );
}