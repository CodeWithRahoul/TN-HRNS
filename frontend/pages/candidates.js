import { useState } from 'react';
import HRLayout from '@/components/HRLayout';

export default function Candidates() {
  const [candidates, setCandidates] = useState([
    { id: 1, name: 'Ayesha Khan', position: 'AI Engineer', status: 'Interview', applied: '02 Jun 2026' },
    { id: 2, name: 'Bilal Ahmed', position: 'Frontend Developer', status: 'Submitted', applied: '10 Jun 2026' },
    { id: 3, name: 'Sana Alawari', position: 'UI/UX Designer', status: 'Shortlisted', applied: '15 Jun 2026' },
    { id: 4, name: 'Usman Ali', position: 'Backend Engineer', status: 'Submitted', applied: '20 Jun 2026' },
  ]);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [interviewData, setInterviewData] = useState({
    candidate: '',
    date: '',
    time: '',
    mode: 'Video call',
    meetLink: '',
    interviewer: '',
  });

  const handleSelect = (id) => {
    setCandidates(candidates.map(c =>
      c.id === id ? { ...c, status: 'Selected' } : c
    ));
  };

  const handleReject = (id) => {
    setCandidates(candidates.map(c =>
      c.id === id ? { ...c, status: 'Rejected' } : c
    ));
  };

  const openScheduleModal = (candidate) => {
    setSelectedCandidate(candidate);
    setInterviewData({
      candidate: `${candidate.name} - ${candidate.position}`,
      date: '',
      time: '',
      mode: 'Video call',
      meetLink: '',
      interviewer: '',
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCandidate(null);
  };

  const handleSchedule = () => {
    // Update candidate status to 'Interview Scheduled'
    if (selectedCandidate) {
      setCandidates(candidates.map(c =>
        c.id === selectedCandidate.id ? { ...c, status: 'Interview Scheduled' } : c
      ));
    }
    alert(`Interview scheduled for ${interviewData.candidate} on ${interviewData.date} at ${interviewData.time}`);
    closeModal();
  };

  const getStatusBadge = (status) => {
    const map = {
      'Selected': 'selected',
      'Rejected': 'rejected',
      'Interview': 'interview',
      'Shortlisted': 'shortlisted',
      'Submitted': 'submitted',
      'Interview Scheduled': 'interview'
    };
    return `status-badge ${map[status] || 'submitted'}`;
  };

  return (
    <HRLayout>
      <div className="candidates-page" style={{ padding: '20px 0' }}>
        <div className="container" style={{ padding: '0 24px' }}>
          <div className="page-header" style={{ marginBottom: '24px' }}>
            <h1 className="page-title" style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>Candidates</h1>
            <p className="page-subtitle" style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>Sora Afzel · HR</p>
          </div>

          <div className="dashboard-card" style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(4px)', borderRadius: '16px', padding: '24px', border: '1px solid rgba(255,255,255,0.3)', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '12px' }}>Users Management</h3>
            <div className="candidates-actions" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button className="btn btn-primary">+ Add Candidate</button>
              <button className="btn btn-ghost">Invite All</button>
            </div>
          </div>

          <div className="dashboard-card" style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(4px)', borderRadius: '16px', padding: '24px', border: '1px solid rgba(255,255,255,0.3)' }}>
            <div className="search-filter-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '16px', alignItems: 'center' }}>
              <input type="text" className="search-input" placeholder="Search candidates..." style={{ flex: 1, minWidth: '200px', padding: '10px 14px', borderRadius: '12px', border: '1.5px solid var(--border-color)', background: 'rgba(255,255,255,0.8)', fontSize: '0.95rem' }} />
              <div className="filter-group" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button className="btn btn-ghost">Filter</button>
                <button className="btn btn-ghost">Filter</button>
                <button className="btn btn-ghost">Filter</button>
                <button className="btn btn-ghost">Filter</button>
              </div>
            </div>

            <table className="candidates-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '10px 0', color: 'var(--text-muted)', borderBottom: '1px solid #f0f3f2' }}>Name</th>
                  <th style={{ textAlign: 'left', padding: '10px 0', color: 'var(--text-muted)', borderBottom: '1px solid #f0f3f2' }}>Position</th>
                  <th style={{ textAlign: 'left', padding: '10px 0', color: 'var(--text-muted)', borderBottom: '1px solid #f0f3f2' }}>Status</th>
                  <th style={{ textAlign: 'left', padding: '10px 0', color: 'var(--text-muted)', borderBottom: '1px solid #f0f3f2' }}>Applied</th>
                  <th style={{ textAlign: 'left', padding: '10px 0', color: 'var(--text-muted)', borderBottom: '1px solid #f0f3f2' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {candidates.map((c) => (
                  <tr key={c.id}>
                    <td style={{ padding: '12px 0', borderBottom: '1px solid #f0f3f2', color: 'var(--text-dark)' }}>{c.name}</td>
                    <td style={{ padding: '12px 0', borderBottom: '1px solid #f0f3f2', color: 'var(--text-dark)' }}>{c.position}</td>
                    <td style={{ padding: '12px 0', borderBottom: '1px solid #f0f3f2', color: 'var(--text-dark)' }}>
                      <span className={getStatusBadge(c.status)} style={{ display: 'inline-block', padding: '2px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600,
                        background: c.status === 'Selected' ? '#d4edda' : c.status === 'Rejected' ? '#f8d7da' : c.status === 'Interview' ? '#fff3cd' : c.status === 'Shortlisted' ? '#d4edda' : c.status === 'Interview Scheduled' ? '#cce5ff' : '#d1ecf1',
                        color: c.status === 'Selected' ? '#155724' : c.status === 'Rejected' ? '#721c24' : c.status === 'Interview' ? '#856404' : c.status === 'Shortlisted' ? '#155724' : c.status === 'Interview Scheduled' ? '#004085' : '#0c5460'
                      }}>{c.status}</span>
                    </td>
                    <td style={{ padding: '12px 0', borderBottom: '1px solid #f0f3f2', color: 'var(--text-dark)' }}>{c.applied}</td>
                    <td style={{ padding: '12px 0', borderBottom: '1px solid #f0f3f2', color: 'var(--text-dark)' }}>
                      {c.status !== 'Selected' && c.status !== 'Rejected' ? (
                        <>
                          <button className="btn btn-primary" style={{ padding: '4px 12px', fontSize: '0.75rem', marginRight: '4px' }} onClick={() => handleSelect(c.id)}>Select</button>
                          <button className="btn btn-dark" style={{ padding: '4px 12px', fontSize: '0.75rem', background: '#dc3545', borderColor: '#dc3545', marginRight: '4px' }} onClick={() => handleReject(c.id)}>Reject</button>
                          <button className="btn btn-primary" style={{ padding: '4px 12px', fontSize: '0.75rem', background: '#17a2b8', borderColor: '#17a2b8' }} onClick={() => openScheduleModal(c)}>
                            <i className="fas fa-calendar-plus"></i> Schedule
                          </button>
                        </>
                      ) : (
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Done</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ─── Schedule Interview Modal ─── */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)', borderRadius: '24px', padding: '36px 40px', maxWidth: '520px', width: '100%', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 24px 80px rgba(0,0,0,0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>Schedule Interview</h2>
              <button onClick={closeModal} style={{ background: 'none', border: 'none', fontSize: '1.5rem', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <i className="fas fa-times"></i>
              </button>
            </div>

            {/* Candidate */}
            <div className="form-group" style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>Candidate</label>
              <select
                className="form-select"
                style={{ width: '100%', padding: '11px 14px', borderRadius: '12px', border: '1.5px solid var(--border-color)', fontSize: '0.95rem', fontFamily: 'Poppins, sans-serif', background: '#fafcfa' }}
                value={interviewData.candidate}
                onChange={(e) => setInterviewData({ ...interviewData, candidate: e.target.value })}
              >
                <option value="">Select candidate</option>
                {candidates.map(c => (
                  <option key={c.id} value={`${c.name} - ${c.position}`}>{c.name} - {c.position}</option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div className="form-group" style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>Date</label>
              <input
                type="date"
                className="form-input"
                style={{ width: '100%', padding: '11px 14px', borderRadius: '12px', border: '1.5px solid var(--border-color)', fontSize: '0.95rem', fontFamily: 'Poppins, sans-serif', background: '#fafcfa' }}
                value={interviewData.date}
                onChange={(e) => setInterviewData({ ...interviewData, date: e.target.value })}
              />
            </div>

            {/* Time */}
            <div className="form-group" style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>Time</label>
              <input
                type="time"
                className="form-input"
                style={{ width: '100%', padding: '11px 14px', borderRadius: '12px', border: '1.5px solid var(--border-color)', fontSize: '0.95rem', fontFamily: 'Poppins, sans-serif', background: '#fafcfa' }}
                value={interviewData.time}
                onChange={(e) => setInterviewData({ ...interviewData, time: e.target.value })}
              />
            </div>

            {/* Mode */}
            <div className="form-group" style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>Mode</label>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  className={`btn ${interviewData.mode === 'Video call' ? 'btn-primary' : 'btn-ghost'}`}
                  style={{ flex: 1 }}
                  onClick={() => setInterviewData({ ...interviewData, mode: 'Video call' })}
                >
                  <i className="fas fa-video" style={{ marginRight: '6px' }}></i> Video call
                </button>
                <button
                  className={`btn ${interviewData.mode === 'In person' ? 'btn-primary' : 'btn-ghost'}`}
                  style={{ flex: 1 }}
                  onClick={() => setInterviewData({ ...interviewData, mode: 'In person' })}
                >
                  <i className="fas fa-user" style={{ marginRight: '6px' }}></i> In person
                </button>
              </div>
            </div>

            {/* Meeting Link */}
            <div className="form-group" style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>Meeting link</label>
              <input
                type="url"
                className="form-input"
                placeholder="https://meet.google.com/..."
                style={{ width: '100%', padding: '11px 14px', borderRadius: '12px', border: '1.5px solid var(--border-color)', fontSize: '0.95rem', fontFamily: 'Poppins, sans-serif', background: '#fafcfa' }}
                value={interviewData.meetLink}
                onChange={(e) => setInterviewData({ ...interviewData, meetLink: e.target.value })}
              />
            </div>

            {/* Interviewer */}
            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>Interviewer</label>
              <input
                type="text"
                className="form-input"
                placeholder="Interviewer name"
                style={{ width: '100%', padding: '11px 14px', borderRadius: '12px', border: '1.5px solid var(--border-color)', fontSize: '0.95rem', fontFamily: 'Poppins, sans-serif', background: '#fafcfa' }}
                value={interviewData.interviewer}
                onChange={(e) => setInterviewData({ ...interviewData, interviewer: e.target.value })}
              />
            </div>

            <button className="btn btn-primary" style={{ width: '100%', padding: '14px' }} onClick={handleSchedule}>
              <i className="fas fa-calendar-plus" style={{ marginRight: '8px' }}></i> Schedule & add to application progress
            </button>
          </div>
        </div>
      )}
    </HRLayout>
  );
}