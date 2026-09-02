import { useState } from 'react';
import CEOLayout from '@/components/CEOLayout';
import CEOPageLayout from '@/components/CEOPageLayout';

export default function CEOLeaveManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('Needs review');
  const [selectedRequest, setSelectedRequest] = useState(null);

  const colors = {
    primary: '#00A19A',
    primaryDark: '#008a84',
    primaryLight: '#E6F5F4',
    border: '#E5E7EB',
    textDark: '#1A1A1A',
    textGray: '#666666',
    textMuted: '#8a8f98',
    bg: '#F4FBFB',
    cardBg: '#FFFFFF',
    tableHeaderBg: '#EEF1F4',
    tableHeaderText: '#4B5563',
    tan: '#F5E6CE',
    tanBorder: '#E8D3AA',
    declineRed: '#8B1E1E',
  };

  const leaveRequests = [
    { 
      id: 1, 
      employee: 'Raheel Khan', 
      role: 'Backend Developer · Project Nexovate',
      reason: 'Planning a family trip and would like to take 12 days off starting July 28th. Happy to hand off any open items before I leave.',
      type: 'Annual leave', 
      startDate: '26 July 2026', 
      endDate: '31 July 2026', 
      duration: '5 days', 
      days: 'July 26 - July 31',
      status: 'Needs review',
      milestone: {
        assignedName: 'Beta release milestone',
        assigned: 'Yes',
        openTasks: '0 remaining — all done',
        dueDate: '01 Aug'
      }
    },
    { 
      id: 2, 
      employee: 'Sara Kareem', 
      role: 'UI/UX Designer · Project Nexovate',
      reason: 'Need time off for personal reasons.',
      type: 'Annual leave', 
      startDate: '26 July 2026', 
      endDate: '28 July 2026', 
      duration: '6 days', 
      days: 'July 26 - July 28',
      status: 'Needs review',
      milestone: {
        assignedName: 'Beta release milestone',
        assigned: 'Yes',
        openTasks: '2 remaining — pending',
        dueDate: '11 Aug'
      }
    },
    { 
      id: 3, 
      employee: 'Hamza Jamali', 
      role: 'Project Manager · TN-HRMS',
      reason: 'Medical leave.',
      type: 'Sick leave', 
      startDate: '14 July 2026', 
      endDate: '19 July 2026', 
      duration: '6 days', 
      days: 'July 14 - July 19',
      status: 'Needs review',
      milestone: {
        assignedName: 'Sprint milestone',
        assigned: 'No',
        openTasks: '0 remaining — all done',
        dueDate: '15 Aug'
      }
    },
    { 
      id: 4, 
      employee: 'Tehreem Raja', 
      role: 'Frontend Developer · Nexovate',
      reason: 'Casual leave for family event.',
      type: 'Casual leave', 
      startDate: '15 July 2026', 
      endDate: '15 July 2026', 
      duration: '1 day', 
      days: 'July 15',
      status: 'Rejected',
      milestone: {
        assignedName: 'UI polish milestone',
        assigned: 'No',
        openTasks: '3 remaining — pending',
        dueDate: '20 Aug'
      }
    },
    { 
      id: 5, 
      employee: 'Abdul Rehman', 
      role: 'Backend Developer · TN-HRMS',
      reason: 'Annual vacation.',
      type: 'Annual leave', 
      startDate: '10 Aug 2026', 
      endDate: '14 Aug 2026', 
      duration: '5 days', 
      days: 'Aug 10 - Aug 14',
      status: 'Approved',
      milestone: {
        assignedName: 'Release milestone',
        assigned: 'Yes',
        openTasks: '0 remaining — all done',
        dueDate: '25 Aug'
      }
    },
  ];

  const statusOptions = [
    { label: 'All', value: 'All' },
    { label: 'Need review', value: 'Needs review' },
    { label: 'Approved', value: 'Approved' },
    { label: 'Declined', value: 'Rejected' },
  ];

  const getStatusColor = (status) => {
    const map = {
      'Needs review': { bg: '#FDE9D0', text: '#B9740B' },
      'Pending': { bg: '#DBEAFE', text: '#2563EB' },
      'Approved': { bg: '#D1FAE5', text: '#059669' },
      'Rejected': { bg: '#FEE2E2', text: '#DC2626' },
    };
    return map[status] || { bg: '#F3F4F6', text: '#6B7280' };
  };

  const filteredRequests = leaveRequests.filter((request) => {
    const matchesSearch = request.employee.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          request.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'All' || request.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleRowClick = (request) => setSelectedRequest(request);
  const closeDetail = () => setSelectedRequest(null);

  const handleApprove = () => {
    alert(`Leave request for ${selectedRequest.employee} approved and forwarded to HR.`);
    closeDetail();
  };

  const handleDecline = () => {
    alert(`Leave request for ${selectedRequest.employee} declined.`);
    closeDetail();
  };

  return (
    <CEOLayout>
      <CEOPageLayout title="Leave management">
        {/* ─── Search Bar REMOVED ─────────────────────────────────────── */}

        {/* Filter Tabs */}
        <div style={{
          display: 'flex', gap: '32px', borderBottom: `1px solid ${colors.border}`,
          marginBottom: '20px', padding: '0 4px',
        }}>
          {statusOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setFilterStatus(opt.value)}
              style={{
                background: 'transparent', border: 'none',
                borderBottom: filterStatus === opt.value ? `2px solid ${colors.primary}` : '2px solid transparent',
                padding: '10px 2px', fontSize: '14px',
                fontWeight: filterStatus === opt.value ? 600 : 500,
                color: filterStatus === opt.value ? colors.textDark : colors.textGray,
                cursor: 'pointer', fontFamily: "'Poppins', sans-serif", transition: 'all 0.2s',
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Main content: table + side detail panel */}
        <div style={{
          display: 'flex',
          gap: '20px',
          alignItems: 'flex-start',
        }}>
          {/* Leave Requests Table */}
          <div style={{
            background: colors.cardBg, border: `1px solid ${colors.border}`,
            borderRadius: '16px', overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            flex: selectedRequest ? '1 1 60%' : '1 1 100%',
            minWidth: 0,
            transition: 'flex 0.2s',
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: selectedRequest
                ? '1.3fr 1fr 1.5fr 1fr 1fr 0.7fr'
                : '1.3fr 1fr 1.5fr 1fr 1fr 0.7fr',
              background: colors.tableHeaderBg, padding: '14px 20px', gap: '10px',
            }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: colors.tableHeaderText }}>Employee</div>
              <div style={{ fontSize: '12px', fontWeight: 600, color: colors.tableHeaderText }}>Type</div>
              <div style={{ fontSize: '12px', fontWeight: 600, color: colors.tableHeaderText }}>Dates</div>
              <div style={{ fontSize: '12px', fontWeight: 600, color: colors.tableHeaderText }}>Duration</div>
              <div style={{ fontSize: '12px', fontWeight: 600, color: colors.tableHeaderText }}>Status</div>
              <div></div>
            </div>

            {filteredRequests.length === 0 ? (
              <div style={{ padding: '40px 20px', textAlign: 'center', color: colors.textMuted }}>
                <i className="fas fa-inbox" style={{ fontSize: '32px', display: 'block', marginBottom: '12px' }} />
                No leave requests found
              </div>
            ) : (
              filteredRequests.map((request, idx) => {
                const statusColor = getStatusColor(request.status);
                const isSelected = selectedRequest?.id === request.id;
                return (
                  <div
                    key={request.id}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1.3fr 1fr 1.5fr 1fr 1fr 0.7fr',
                      padding: '16px 20px', gap: '10px',
                      borderTop: idx === 0 ? 'none' : `1px solid ${colors.border}`,
                      background: isSelected ? colors.primaryLight : colors.cardBg,
                      alignItems: 'center',
                      transition: 'background 0.15s',
                    }}
                  >
                    <div style={{ fontSize: '14px', fontWeight: 500, color: colors.textDark, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {request.employee}
                    </div>
                    <div style={{ fontSize: '14px', color: colors.textDark }}>{request.type}</div>
                    <div style={{ fontSize: '13px', color: colors.textGray, whiteSpace: 'nowrap' }}>
                      {request.startDate} - {request.endDate}
                    </div>
                    <div style={{ fontSize: '14px', color: colors.textDark }}>{request.duration}</div>
                    <div>
                      <span style={{
                        display: 'inline-block', background: statusColor.bg, color: statusColor.text,
                        fontSize: '12px', fontWeight: 600, padding: '4px 14px', borderRadius: '20px',
                      }}>
                        {request.status}
                      </span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <button
                        onClick={() => handleRowClick(request)}
                        style={{
                          background: isSelected ? colors.primary : colors.cardBg,
                          color: isSelected ? '#fff' : colors.textDark,
                          border: `1px solid ${isSelected ? colors.primary : colors.border}`,
                          borderRadius: '6px', padding: '6px 16px', fontSize: '12px',
                          fontWeight: 500, cursor: 'pointer', fontFamily: "'Poppins', sans-serif",
                        }}
                      >
                        View
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* ─── DETAIL SIDE PANEL ─────────────────────────────────────── */}
          {selectedRequest && (
            <div
              style={{
                background: colors.cardBg,
                border: `1px solid ${colors.border}`,
                borderRadius: '20px',
                padding: '24px 22px 20px 22px',
                flex: '0 0 320px',
                width: '320px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                position: 'relative',
              }}
            >
              {/* Close button */}
              <button
                onClick={closeDetail}
                style={{
                  position: 'absolute', top: '14px', right: '16px',
                  background: 'transparent', border: 'none', fontSize: '20px',
                  cursor: 'pointer', color: colors.textGray, lineHeight: 1,
                }}
              >
                ×
              </button>

              {/* Employee info */}
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: colors.textDark, margin: '0 0 4px 0' }}>
                {selectedRequest.employee}
              </h2>
              <p style={{ fontSize: '12.5px', color: colors.textGray, margin: '0 0 14px 0' }}>
                {selectedRequest.role || 'Employee'}
              </p>

              {/* Reason box */}
              <div style={{
                background: colors.tan,
                padding: '12px 14px',
                borderRadius: '10px',
                marginBottom: '14px',
              }}>
                <p style={{ margin: 0, fontSize: '12.5px', color: colors.textDark, lineHeight: '1.55' }}>
                  {selectedRequest.reason || 'No reason provided.'}
                </p>
              </div>

              {/* Leave duration and Dates */}
              <div style={{ display: 'flex', gap: '32px', marginBottom: '16px' }}>
                <div>
                  <div style={{ fontSize: '10.5px', color: colors.textGray, fontWeight: 500, marginBottom: '4px' }}>Leave duration</div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: colors.textDark }}>{selectedRequest.duration}</div>
                </div>
                <div>
                  <div style={{ fontSize: '10.5px', color: colors.textGray, fontWeight: 500, marginBottom: '4px' }}>Dates</div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: colors.textDark }}>
                    {selectedRequest.days || selectedRequest.startDate + ' - ' + selectedRequest.endDate}
                  </div>
                </div>
              </div>

              {/* Milestone impact check */}
              <div style={{
                background: colors.tan,
                padding: '14px 16px',
                borderRadius: '10px',
                marginBottom: '18px',
              }}>
                <h4 style={{ fontSize: '13px', fontWeight: 700, color: colors.textDark, margin: '0 0 8px 0' }}>
                  Milestone impact check
                </h4>
                <div style={{ borderTop: `1px solid ${colors.tanBorder}`, marginBottom: '10px' }} />

                <div style={{ marginBottom: '10px' }}>
                  <div style={{ fontSize: '11.5px', color: colors.textDark, marginBottom: '2px' }}>
                    Assigned to {selectedRequest.milestone?.assignedName || 'milestone'}
                  </div>
                  <div style={{ fontSize: '12.5px', fontWeight: 700, color: colors.textDark }}>
                    {selectedRequest.milestone?.assigned || '—'}
                  </div>
                </div>

                <div style={{ marginBottom: '10px' }}>
                  <div style={{ fontSize: '11.5px', color: colors.textDark, marginBottom: '2px' }}>
                    Open tasks tied to this milestone
                  </div>
                  <div style={{ fontSize: '12.5px', fontWeight: 700, color: colors.textDark }}>
                    {selectedRequest.milestone?.openTasks || '—'}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '11.5px', color: colors.textDark, marginBottom: '2px' }}>
                    Milestone due date
                  </div>
                  <div style={{ fontSize: '12.5px', fontWeight: 700, color: colors.textDark }}>
                    {selectedRequest.milestone?.dueDate || '—'}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={handleDecline}
                  style={{
                    flex: 1, padding: '10px 0', background: colors.declineRed,
                    color: '#fff', border: 'none', borderRadius: '8px',
                    fontSize: '12.5px', fontWeight: 600, cursor: 'pointer',
                    fontFamily: "'Poppins', sans-serif", transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={(e) => e.target.style.opacity = 0.9}
                  onMouseLeave={(e) => e.target.style.opacity = 1}
                >
                  Decline
                </button>
                <button
                  onClick={handleApprove}
                  style={{
                    flex: 1, padding: '10px 0', background: colors.primary,
                    color: '#fff', border: 'none', borderRadius: '8px',
                    fontSize: '12.5px', fontWeight: 600, cursor: 'pointer',
                    fontFamily: "'Poppins', sans-serif", transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) => e.target.style.background = colors.primaryDark}
                  onMouseLeave={(e) => e.target.style.background = colors.primary}
                >
                  Approve
                </button>
              </div>
            </div>
          )}
        </div>
      </CEOPageLayout>
    </CEOLayout>
  );
}