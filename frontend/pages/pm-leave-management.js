import { useState } from 'react';
import PMLayout from '@/components/PMLayout';
import PMPageLayout from '@/components/PMPageLayout';

export default function PMLeaveManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedRequest, setSelectedRequest] = useState(null);

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

  const leaveRequests = [
    { 
      id: 1, 
      employee: 'Raheel Khan', 
      role: 'Exponential Developer - Project Navonova',
      reason: 'Planning a family trip and would like to take 12 days off starting July 28th. Happy to hand off any open items before I leave.',
      type: 'Annual leave', 
      startDate: '26 July 2026', 
      endDate: '28 July 2026', 
      duration: '5 days', 
      days: 'July 25 - July 28',
      status: 'Needs review',
      milestone: {
        assignee: 'Sara release milestone',
        openTasks: 'remaining - all clear',
        dueDate: '11 Aug'
      }
    },
    { 
      id: 2, 
      employee: 'Sara kareem', 
      role: 'UI/UX Designer - Project Nexovate',
      reason: 'Need time off for personal reasons.',
      type: 'Annual leave', 
      startDate: '26 July 2026', 
      endDate: '28 July 2026', 
      duration: '6 days', 
      days: 'July 25 - July 28',
      status: 'Needs review',
      milestone: {
        assignee: 'Sara release milestone',
        openTasks: 'remaining - all clear',
        dueDate: '11 Aug'
      }
    },
    { 
      id: 3, 
      employee: 'Bilal Ahmed', 
      role: 'Project Manager - TN-HRMS',
      reason: 'Medical leave.',
      type: 'Sick leave', 
      startDate: '20 July 2026', 
      endDate: '21 July 2026', 
      duration: '2 days', 
      days: 'July 20 - July 21',
      status: 'Approved',
      milestone: {
        assignee: 'Bilal milestone',
        openTasks: 'all clear',
        dueDate: '15 Aug'
      }
    },
    { 
      id: 4, 
      employee: 'Tehreem Raja', 
      role: 'Frontend Developer - Nexovate',
      reason: 'Casual leave for family event.',
      type: 'Casual leave', 
      startDate: '15 July 2026', 
      endDate: '15 July 2026', 
      duration: '1 day', 
      days: 'July 15',
      status: 'Rejected',
      milestone: {
        assignee: 'Tehreem milestone',
        openTasks: 'some tasks pending',
        dueDate: '20 Aug'
      }
    },
    { 
      id: 5, 
      employee: 'Abdul Rehman', 
      role: 'Backend Developer - TN-HRMS',
      reason: 'Annual vacation.',
      type: 'Annual leave', 
      startDate: '10 Aug 2026', 
      endDate: '14 Aug 2026', 
      duration: '5 days', 
      days: 'Aug 10 - Aug 14',
      status: 'Pending',
      milestone: {
        assignee: 'Abdul milestone',
        openTasks: 'all clear',
        dueDate: '25 Aug'
      }
    },
  ];

  const statusOptions = ['All', 'Needs review', 'Pending', 'Approved', 'Rejected'];

  const getStatusColor = (status) => {
    const colors = {
      'Needs review': { bg: '#FEF3C7', text: '#D97706' },
      'Pending': { bg: '#DBEAFE', text: '#2563EB' },
      'Approved': { bg: '#D1FAE5', text: '#059669' },
      'Rejected': { bg: '#FEE2E2', text: '#DC2626' },
    };
    return colors[status] || { bg: '#F3F4F6', text: '#6B7280' };
  };

  const filteredRequests = leaveRequests.filter((request) => {
    const matchesSearch = request.employee.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          request.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'All' || request.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleRowClick = (request) => {
    setSelectedRequest(request);
  };

  const closeDetail = () => {
    setSelectedRequest(null);
  };

  const handleApprove = () => {
    alert(`Leave request for ${selectedRequest.employee} approved and forwarded to HR.`);
    closeDetail();
  };

  const handleDecline = () => {
    alert(`Leave request for ${selectedRequest.employee} declined.`);
    closeDetail();
  };

  return (
    <PMLayout>
      <PMPageLayout title="Leave Management">
        {/* Search and Filter Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '24px',
          background: colors.cardBg,
          padding: '16px 20px',
          borderRadius: '12px',
          border: `1px solid ${colors.border}`,
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            background: colors.cardBg,
            border: `1px solid ${colors.border}`,
            borderRadius: '10px',
            padding: '6px 6px 6px 16px',
            flex: 1,
            maxWidth: '400px',
          }}>
            <i className="fas fa-search" style={{ fontSize: '13px', color: colors.textMuted }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by employee or leave type..."
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

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {statusOptions.map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                style={{
                  padding: '8px 18px',
                  background: filterStatus === status ? colors.primary : colors.cardBg,
                  color: filterStatus === status ? '#fff' : colors.textDark,
                  border: `1px solid ${filterStatus === status ? colors.primary : colors.border}`,
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  fontFamily: "'Poppins', sans-serif",
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  if (filterStatus !== status) e.target.style.background = colors.primaryLight;
                }}
                onMouseLeave={(e) => {
                  if (filterStatus !== status) e.target.style.background = colors.cardBg;
                }}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Leave Requests Table */}
        <div style={{
          background: colors.cardBg,
          border: `1px solid ${colors.border}`,
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 2fr 1fr 1fr',
            background: colors.tableHeaderBg,
            padding: '14px 24px',
            gap: '10px',
          }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#fff', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Employee</div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#fff', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Type</div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#fff', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Dates</div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#fff', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Duration</div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#fff', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Status</div>
          </div>

          {filteredRequests.length === 0 ? (
            <div style={{ padding: '40px 20px', textAlign: 'center', color: colors.textMuted }}>
              <i className="fas fa-inbox" style={{ fontSize: '32px', display: 'block', marginBottom: '12px' }} />
              No leave requests found
            </div>
          ) : (
            filteredRequests.map((request, idx) => {
              const statusColor = getStatusColor(request.status);
              return (
                <div
                  key={request.id}
                  onClick={() => handleRowClick(request)}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 2fr 1fr 1fr',
                    padding: '14px 24px',
                    gap: '10px',
                    borderTop: idx === 0 ? 'none' : `1px solid ${colors.border}`,
                    background: idx % 2 === 0 ? colors.cardBg : colors.bg,
                    transition: 'background 0.15s, cursor 0.15s',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = colors.primaryLight}
                  onMouseLeave={(e) => e.currentTarget.style.background = idx % 2 === 0 ? colors.cardBg : colors.bg}
                >
                  <div style={{ fontSize: '14px', fontWeight: 500, color: colors.textDark }}>
                    {request.employee}
                  </div>
                  <div style={{ fontSize: '14px', color: colors.textDark }}>
                    {request.type}
                  </div>
                  <div style={{ fontSize: '14px', color: colors.textGray }}>
                    {request.startDate} - {request.endDate}
                  </div>
                  <div style={{ fontSize: '14px', color: colors.textDark }}>
                    {request.duration}
                  </div>
                  <div>
                    <span style={{
                      display: 'inline-block',
                      background: statusColor.bg,
                      color: statusColor.text,
                      fontSize: '12px',
                      fontWeight: 600,
                      padding: '4px 14px',
                      borderRadius: '20px',
                    }}>
                      {request.status}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* ─── STATS CARDS REMOVED ────────────────────────────────────── */}

        {/* ─── DETAIL MODAL ─────────────────────────────────────────────── */}
        {selectedRequest && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: '20px',
            }}
            onClick={closeDetail}
          >
            <div
              style={{
                background: colors.cardBg,
                borderRadius: '14px',
                padding: '24px 28px 20px 28px',
                maxWidth: '640px',
                width: '100%',
                maxHeight: '85vh',
                overflowY: 'auto',
                boxShadow: '0 16px 48px rgba(0,0,0,0.15)',
                position: 'relative',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closeDetail}
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '14px',
                  background: 'transparent',
                  border: 'none',
                  fontSize: '22px',
                  cursor: 'pointer',
                  color: colors.textGray,
                  lineHeight: 1,
                }}
              >
                ×
              </button>

              {/* Employee info */}
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: colors.textDark, margin: '0 0 2px 0' }}>
                {selectedRequest.employee}
              </h2>
              <p style={{ fontSize: '13px', color: colors.textGray, margin: '0 0 12px 0' }}>
                {selectedRequest.role || 'Employee'}
              </p>

              {/* Reason */}
              <div style={{
                background: colors.bg,
                padding: '10px 14px',
                borderRadius: '8px',
                marginBottom: '14px',
                border: `1px solid ${colors.border}`,
              }}>
                <p style={{ margin: 0, fontSize: '13px', color: colors.textDark, lineHeight: '1.5' }}>
                  "{selectedRequest.reason || 'No reason provided.'}"
                </p>
              </div>

              {/* Leave duration and days */}
              <div style={{
                display: 'flex',
                gap: '28px',
                marginBottom: '16px',
                flexWrap: 'wrap',
              }}>
                <div>
                  <div style={{ fontSize: '11px', color: colors.textGray, textTransform: 'uppercase', fontWeight: 600 }}>Leaves duration</div>
                  <div style={{ fontSize: '16px', fontWeight: 600, color: colors.textDark }}>{selectedRequest.duration}</div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: colors.textGray, textTransform: 'uppercase', fontWeight: 600 }}>Days</div>
                  <div style={{ fontSize: '16px', fontWeight: 600, color: colors.textDark }}>{selectedRequest.days || selectedRequest.startDate + ' - ' + selectedRequest.endDate}</div>
                </div>
              </div>

              {/* Mini table */}
              <div style={{ marginBottom: '14px' }}>
                <h4 style={{ fontSize: '13px', fontWeight: 600, color: colors.textDark, margin: '0 0 8px 0' }}>Employee</h4>
                <div style={{
                  border: `1px solid ${colors.border}`,
                  borderRadius: '8px',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1.5fr 1fr 1fr',
                    background: colors.tableHeaderBg,
                    padding: '6px 12px',
                    gap: '6px',
                  }}>
                    <div style={{ fontSize: '10px', fontWeight: 700, color: '#fff', textTransform: 'uppercase' }}>Employee</div>
                    <div style={{ fontSize: '10px', fontWeight: 700, color: '#fff', textTransform: 'uppercase' }}>Type</div>
                    <div style={{ fontSize: '10px', fontWeight: 700, color: '#fff', textTransform: 'uppercase' }}>Dates</div>
                    <div style={{ fontSize: '10px', fontWeight: 700, color: '#fff', textTransform: 'uppercase' }}>Duration</div>
                    <div style={{ fontSize: '10px', fontWeight: 700, color: '#fff', textTransform: 'uppercase' }}>Status</div>
                  </div>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1.5fr 1fr 1fr',
                    padding: '6px 12px',
                    gap: '6px',
                    background: colors.cardBg,
                    borderTop: `1px solid ${colors.border}`,
                    alignItems: 'center',
                  }}>
                    <div style={{ fontSize: '13px', fontWeight: 500, color: colors.textDark }}>{selectedRequest.employee}</div>
                    <div style={{ fontSize: '13px', color: colors.textDark }}>{selectedRequest.type}</div>
                    <div style={{ fontSize: '13px', color: colors.textGray }}>{selectedRequest.startDate} - {selectedRequest.endDate}</div>
                    <div style={{ fontSize: '13px', fontWeight: 500, color: colors.textDark }}>{selectedRequest.duration}</div>
                    <div>
                      <span style={{
                        display: 'inline-block',
                        background: getStatusColor(selectedRequest.status).bg,
                        color: getStatusColor(selectedRequest.status).text,
                        fontSize: '10px',
                        fontWeight: 600,
                        padding: '2px 10px',
                        borderRadius: '16px',
                      }}>
                        {selectedRequest.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Milestone impact check */}
              <div style={{
                background: colors.bg,
                padding: '10px 14px',
                borderRadius: '8px',
                border: `1px solid ${colors.border}`,
                marginBottom: '16px',
              }}>
                <h4 style={{ fontSize: '13px', fontWeight: 600, color: colors.textDark, margin: '0 0 8px 0' }}>
                  Milestone impact check
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
                    <span style={{ color: colors.textGray }}>Assignee:</span>
                    <span style={{ fontWeight: 500, color: colors.textDark }}>
                      {selectedRequest.milestone?.assignee || '—'}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
                    <span style={{ color: colors.textGray }}>Open tasks:</span>
                    <span style={{ fontWeight: 500, color: colors.textDark }}>
                      {selectedRequest.milestone?.openTasks || '—'}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
                    <span style={{ color: colors.textGray }}>Due date:</span>
                    <span style={{ fontWeight: 500, color: colors.textDark }}>
                      {selectedRequest.milestone?.dueDate || '—'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '12px',
                paddingTop: '14px',
                borderTop: `1px solid ${colors.border}`,
              }}>
                <button
                  onClick={handleDecline}
                  style={{
                    padding: '8px 22px',
                    background: 'transparent',
                    color: '#DC2626',
                    border: `1.5px solid #DC2626`,
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontFamily: "'Poppins', sans-serif",
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => { e.target.style.background = '#DC2626'; e.target.style.color = '#fff'; }}
                  onMouseLeave={(e) => { e.target.style.background = 'transparent'; e.target.style.color = '#DC2626'; }}
                >
                  Decline
                </button>
                <button
                  onClick={handleApprove}
                  style={{
                    padding: '8px 22px',
                    background: colors.primary,
                    color: '#fff',
                    border: `1.5px solid ${colors.primary}`,
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontFamily: "'Poppins', sans-serif",
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => { e.target.style.background = colors.primaryDark; e.target.style.borderColor = colors.primaryDark; }}
                  onMouseLeave={(e) => { e.target.style.background = colors.primary; e.target.style.borderColor = colors.primary; }}
                >
                  Approve &amp; forward to HR
                </button>
              </div>
            </div>
          </div>
        )}
      </PMPageLayout>
    </PMLayout>
  );
}