// pages/leave-management.js
import { useState } from 'react';
import HRLayout from '@/components/HRLayout';
import HRPageLayout from '@/components/HRPageLayout';

export default function LeaveManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLeaveId, setSelectedLeaveId] = useState(null);

  // ─── Sample Leave Data ──────────────────────────────────────
  const [leaves, setLeaves] = useState([
    {
      id: 1,
      employee: 'Raheel Khan',
      role: 'HR',
      type: 'Sick leave',
      dates: '26 July 2025 - 28 July 2025',
      duration: '3 days',
      status: 'Approved by CFO',
      note: "Traveling to attend wedding on urgent notice, requires manual signing during return.",
    },
    {
      id: 2,
      employee: 'Raheel Khan',
      role: 'HR',
      type: 'Annual leave',
      dates: '26 July 2025 - 28 July 2025',
      duration: '3 days',
      status: 'Newly Added',
      note: 'Annual leave request submitted for review.',
    },
    {
      id: 3,
      employee: 'Raheel Khan',
      role: 'HR',
      type: 'Casual leave',
      dates: '26 July 2025 - 28 July 2025',
      duration: '3 days',
      status: 'Declined by HR',
      note: 'Casual leave request was declined by HR.',
    },
    {
      id: 4,
      employee: 'Raheel Khan',
      role: 'HR',
      type: 'Sick leave',
      dates: '26 July 2025 - 28 July 2025',
      duration: '3 days',
      status: 'with CFO',
      note: 'Currently pending approval with CFO.',
    },
  ]);

  // ─── Filter by type state ────────────────────────────────────
  const [openFilter, setOpenFilter] = useState(false);
  const [typeFilter, setTypeFilter] = useState(null);
  const typeOptions = ['Emergency leave', 'Short leave', 'Annual leave', 'Casual leave', 'Sick leave'];

  // ─── Filtered Data ──────────────────────────────────────────
  const filteredLeaves = leaves.filter((leave) => {
    const matchesSearch =
      leave.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
      leave.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      leave.status.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !typeFilter || leave.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const selectedLeave = leaves.find((l) => l.id === selectedLeaveId) || null;

  // ─── Status Badge Color ────────────────────────────────────
  const getStatusBadge = (status) => {
    if (status.toLowerCase().includes('approved')) {
      return { bg: '#d4edda', color: '#1e7e34', label: status };
    }
    if (status.toLowerCase().includes('declined')) {
      return { bg: '#f8d7da', color: '#c0392b', label: status };
    }
    if (status.toLowerCase().includes('newly added')) {
      return { bg: '#ffe8cc', color: '#c2660c', label: status };
    }
    if (status.toLowerCase().includes('with')) {
      return { bg: '#fff3cd', color: '#856404', label: status };
    }
    return { bg: '#e9ecef', color: '#495057', label: status };
  };

  const handleDecline = (id) => {
    setLeaves((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: 'Declined by HR' } : l))
    );
  };

  const handleApprove = (id) => {
    setLeaves((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: 'with CFO' } : l))
    );
  };

  const colors = {
    primary: '#007A7C',
    border: '#020a14',
    textDark: '#1A1A1A',
    textGray: '#666666',
    bg: '#effbfb',
    cardBg: '#FFFFFF',
    lightTeal: '#E8F5F5',
  };

  return (
    <HRLayout>
      <HRPageLayout title="Leave management">
        {/* ─── Filter by type ─────────────────────────────────── */}
        <div style={{ position: 'relative', maxWidth: '220px', marginBottom: '20px' }}>
          <button
            onClick={() => setOpenFilter((prev) => !prev)}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', width: '100%',
              background: 'white', border: `1px solid ${colors.border}`, borderRadius: '10px',
              padding: '8px 10px 8px 16px', fontFamily: "'Poppins', sans-serif", fontSize: '13px',
              color: colors.textDark, cursor: 'pointer',
            }}
          >
            {typeFilter ? `Filter by type: ${typeFilter}` : 'Filter by type'}
            <span style={{
              width: '20px', height: '20px', borderRadius: '50%', background: colors.primary,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <i className="fas fa-chevron-down" style={{ fontSize: '9px', color: 'white' }}></i>
            </span>
          </button>
          {openFilter && (
            <div style={{
              position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0, zIndex: 10,
              background: 'white', border: `1px solid ${colors.border}`, borderRadius: '10px',
              boxShadow: '0 6px 16px rgba(0,0,0,0.08)', overflow: 'hidden',
            }}>
              {typeFilter && (
                <div
                  onClick={() => { setTypeFilter(null); setOpenFilter(false); }}
                  style={{ padding: '9px 16px', fontSize: '13px', color: colors.textGray, cursor: 'pointer', fontFamily: "'Poppins', sans-serif" }}
                >
                  Clear filter
                </div>
              )}
              {typeOptions.map((opt) => (
                <div
                  key={opt}
                  onClick={() => { setTypeFilter(opt); setOpenFilter(false); }}
                  style={{
                    padding: '9px 16px', fontSize: '13px', cursor: 'pointer',
                    fontFamily: "'Poppins', sans-serif",
                    background: typeFilter === opt ? colors.primary : 'white',
                    color: typeFilter === opt ? 'white' : colors.textDark,
                  }}
                  onMouseEnter={(e) => { if (typeFilter !== opt) e.currentTarget.style.background = '#F2F4F5'; }}
                  onMouseLeave={(e) => { if (typeFilter !== opt) e.currentTarget.style.background = 'white'; }}
                >
                  {opt}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ─── Main Content: Table + Side Panel ─────────────── */}
        <div style={{
          display: 'flex',
          gap: '20px',
          alignItems: 'flex-start',
        }}>
          {/* Table */}
          <div style={{
            background: colors.cardBg,
            border: `1px solid ${colors.border}`,
            borderRadius: '12px',
            overflow: 'hidden',
            flex: 1,
          }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontFamily: "'Poppins', sans-serif",
              }}>
                <thead>
                  <tr style={{
                    background: '#e9edf0',
                  }}>
                    <th style={{
                      padding: '14px 16px',
                      textAlign: 'left',
                      fontWeight: 600,
                      color: colors.textDark,
                      fontSize: '14px',
                    }}>
                      Employee
                    </th>
                    <th style={{
                      padding: '14px 16px',
                      textAlign: 'left',
                      fontWeight: 600,
                      color: colors.textDark,
                      fontSize: '14px',
                    }}>
                      Type
                    </th>
                    <th style={{
                      padding: '14px 16px',
                      textAlign: 'left',
                      fontWeight: 600,
                      color: colors.textDark,
                      fontSize: '14px',
                    }}>
                      Dates
                    </th>
                    <th style={{
                      padding: '14px 16px',
                      textAlign: 'left',
                      fontWeight: 600,
                      color: colors.textDark,
                      fontSize: '14px',
                    }}>
                      Duration
                    </th>
                    <th style={{
                      padding: '14px 16px',
                      textAlign: 'left',
                      fontWeight: 600,
                      color: colors.textDark,
                      fontSize: '14px',
                    }}>
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeaves.length === 0 ? (
                    <tr>
                      <td colSpan="5" style={{
                        padding: '48px 20px',
                        textAlign: 'center',
                        color: colors.textDark,
                        fontSize: '15px',
                      }}>
                        There are no leaves here yet
                      </td>
                    </tr>
                  ) : (
                    filteredLeaves.map((leave, index) => {
                      const statusInfo = getStatusBadge(leave.status);
                      const isSelected = leave.id === selectedLeaveId;
                      return (
                        <tr
                          key={leave.id}
                          onClick={() => setSelectedLeaveId((prev) => (prev === leave.id ? null : leave.id))}
                          style={{
                            borderBottom: index < filteredLeaves.length - 1 ? `1px solid #eee` : 'none',
                            background: isSelected ? colors.lightTeal : 'transparent',
                            cursor: 'pointer',
                            transition: 'background 0.15s',
                          }}
                          onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.background = '#f8f9fa'; }}
                          onMouseLeave={(e) => { if (!isSelected) e.currentTarget.style.background = 'transparent'; }}
                        >
                          <td style={{
                            padding: '12px 16px',
                            color: colors.textDark,
                            fontSize: '14px',
                            fontWeight: 500,
                          }}>
                            {leave.employee}
                          </td>
                          <td style={{
                            padding: '12px 16px',
                            color: colors.textDark,
                            fontSize: '14px',
                          }}>
                            {leave.type}
                          </td>
                          <td style={{
                            padding: '12px 16px',
                            color: colors.textDark,
                            fontSize: '14px',
                          }}>
                            {leave.dates}
                          </td>
                          <td style={{
                            padding: '12px 16px',
                            color: colors.textDark,
                            fontSize: '14px',
                          }}>
                            {leave.duration}
                          </td>
                          <td style={{
                            padding: '12px 16px',
                          }}>
                            <span style={{
                              background: statusInfo.bg,
                              color: statusInfo.color,
                              padding: '4px 14px',
                              borderRadius: '20px',
                              fontSize: '12px',
                              fontWeight: 500,
                              display: 'inline-block',
                              whiteSpace: 'nowrap',
                            }}>
                              {statusInfo.label}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Side Panel: Employee Detail Card */}
          {selectedLeave && (
            <div style={{
              width: '260px',
              flexShrink: 0,
              background: colors.cardBg,
              border: `1px solid ${colors.border}`,
              borderRadius: '12px',
              padding: '20px',
              fontFamily: "'Poppins', sans-serif",
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            }}>
              <div style={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                background: colors.lightTeal,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '12px',
                fontSize: '24px',
                fontWeight: 600,
                color: colors.primary,
              }}>
                {selectedLeave.employee.split(' ').map((n) => n[0]).join('')}
              </div>
              <div style={{ fontWeight: 600, fontSize: '15px', color: colors.textDark }}>
                {selectedLeave.employee}
              </div>
              <div style={{ fontSize: '13px', color: colors.textGray, marginBottom: '12px' }}>
                {selectedLeave.role}
              </div>
              <p style={{
                fontSize: '12.5px',
                color: colors.textGray,
                lineHeight: 1.5,
                marginBottom: '20px',
              }}>
                {selectedLeave.note}
              </p>

              <button
                onClick={() => handleDecline(selectedLeave.id)}
                style={{
                  width: '100%',
                  background: '#e74c3c',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 0',
                  fontSize: '13px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  marginBottom: '10px',
                }}
              >
                Decline
              </button>
              <button
                onClick={() => handleApprove(selectedLeave.id)}
                style={{
                  width: '100%',
                  background: colors.primary,
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 0',
                  fontSize: '13px',
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                Approve & Forward to CFO
              </button>
            </div>
          )}
        </div>
      </HRPageLayout>
    </HRLayout>
  );
}