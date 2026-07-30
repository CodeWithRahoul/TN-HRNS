import { useState } from 'react';
import PMLayout from '@/components/PMLayout';
import PMPageLayout from '@/components/PMPageLayout';
import CreateProjectModal from '@/components/CreateProjectModal';

export default function PMProjects() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeTab, setActiveTab] = useState('Overview');
  const [selectedDeliverable, setSelectedDeliverable] = useState(null);
  const [priorityFilter, setPriorityFilter] = useState('High');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isBacklogModalOpen, setIsBacklogModalOpen] = useState(false);

  // Backlog form state
  const [backlogTask, setBacklogTask] = useState('');
  const [backlogType, setBacklogType] = useState('Design');
  const [backlogPriority, setBacklogPriority] = useState('Medium');
  const [backlogAssignee, setBacklogAssignee] = useState('');

  const handleCreateProject = (projectData) => {
    console.log('New Project:', projectData);
    setIsModalOpen(false);
  };

  const handleViewProject = (projectId) => {
    const project = projects.find((p) => p.id === projectId);
    setSelectedProject(project);
    setActiveTab('Overview');
  };

  const handleBackToProjects = () => {
    setSelectedProject(null);
  };

  const handleViewDeliverable = (member) => {
    setSelectedDeliverable(member);
  };

  const handleCloseDeliverable = () => {
    setSelectedDeliverable(null);
  };

  const handleCreateBacklog = () => {
    console.log('Creating backlog:', {
      task: backlogTask,
      type: backlogType,
      priority: backlogPriority,
      assignee: backlogAssignee,
      project: selectedProject?.title
    });
    setIsBacklogModalOpen(false);
    setBacklogTask('');
    setBacklogType('Design');
    setBacklogPriority('Medium');
    setBacklogAssignee('');
  };

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
    tableHeaderBg: '#9AA3AD',
    statusOnTrack: '#1FA25A',
  };

  const avatarColors = {
    'BA': '#3B5BDB',
    'SK': '#F4B400',
    'TR': '#2FBF71',
    'AR': '#E8483E',
    'RK': '#8B5CF6',
    'HJ': '#F97316',
  };

  const priorityColors = {
    'Low': { bg: '#FDEDD3', text: '#C98A2C', dot: '#E0A63C' },
    'Medium': { bg: '#FDEDD3', text: '#C98A2C', dot: '#E0A63C' },
    'High': { bg: '#FBDADA', text: '#D64545', dot: '#E24C4C' },
  };

  const backlogItems = [
    { id: 1, title: 'Empty state illustrations', type: 'Design', priority: 'Low', assignee: 'Sara Kareem' },
    { id: 2, title: 'Dev dashboard', type: 'Design', priority: 'Medium', assignee: 'Sara Kareem' },
    { id: 3, title: 'Payment system', type: 'Bug', priority: 'High', assignee: 'Abdul rehman' },
  ];

  const typeOptions = ['Design', 'Bug', 'Feature', 'Task', 'Improvement'];
  const priorityOptions = ['Low', 'Medium', 'High'];
  const assigneeOptions = ['Bilal Ahmed', 'Rohael Khan', 'Sara Koreem', 'Tehreem Raja', 'Abdul rehman', 'Hafeez jamil'];

  const projects = [
    {
      id: 1,
      title: 'Nexovate Portal',
      subtitle: 'Client-developer portal · AI scope reports',
      description: 'Nexovate is an AI-powered platform that helps non-technical clients transform their ideas into structured software projects. By answering AI-generated multiple-choice questions, clients receive a detailed project scope document that is published on the platform. Developers can browse and choose projects that match their expertise, while Nexovate manages project documentation, administration, and secure payment processing to ensure a smooth and organized experience.',
      status: 'On track',
      startDate: '7 Jun 2026',
      endDate: '24 Jul 2026',
      team: [
        { initials: 'BA', name: 'Bilal Ahmed', role: 'Project Manager' },
        { initials: 'RK', name: 'Rohael Khan', role: 'Team Lead' },
        { initials: 'SK', name: 'Sara Koreem', role: 'UI/UX designer' },
        { initials: 'TR', name: 'Tehreem Raja', role: 'Frontend developer' },
        { initials: 'AR', name: 'Abdul rehman', role: 'Backend developer' },
        { initials: 'HJ', name: 'Hafeez jamil', role: 'AI engineer' },
      ],
      documents: [
        { name: 'Figma file', uploadedBy: 'Sara kareem' },
        { name: 'SRS document', uploadedBy: 'Sara kareem' },
        { name: 'Analytics dashboard – brand brief', uploadedBy: 'Abdul ramnan' },
        { name: 'Payments API – architecture notes', uploadedBy: 'Sara kareem' },
      ]
    },
    {
      id: 2,
      title: 'TN - HRMS',
      subtitle: 'Unified HR & project management system',
      description: 'TN-HRMS is a comprehensive human resource management system that streamlines employee onboarding, leave tracking, attendance management, and performance reviews. The platform provides role-based dashboards for HR, project managers, and employees, with real-time analytics and reporting capabilities.',
      status: 'On track',
      startDate: '2 Feb 2026',
      endDate: '30 Sep 2026',
      team: [
        { initials: 'BA', name: 'Bilal Ahmed', role: 'Project Manager' },
        { initials: 'SK', name: 'Sara Koreem', role: 'UI/UX designer' },
        { initials: 'TR', name: 'Tehreem Raja', role: 'Frontend developer' },
        { initials: 'AR', name: 'Abdul rehman', role: 'Backend developer' },
      ],
      documents: [
        { name: 'HRMS Architecture', uploadedBy: 'Bilal Ahmed' },
        { name: 'Database Schema', uploadedBy: 'Abdul rehman' },
        { name: 'UI Mockups', uploadedBy: 'Sara Koreem' },
      ]
    },
    {
      id: 3,
      title: 'Marketing Site Refresh',
      subtitle: 'Public landing page & brand refresh',
      description: 'A complete refresh of the company\'s public-facing marketing website. The project includes a new brand identity, responsive landing pages, SEO optimization, and integration with the company\'s CMS. The goal is to increase engagement and conversion rates.',
      status: 'At risk',
      startDate: '10 Jan 2026',
      endDate: '15 May 2026',
      team: [
        { initials: 'BA', name: 'Bilal Ahmed', role: 'Project Manager' },
        { initials: 'SK', name: 'Sara Koreem', role: 'UI/UX designer' },
        { initials: 'TR', name: 'Tehreem Raja', role: 'Frontend developer' },
        { initials: 'AR', name: 'Abdul rehman', role: 'Backend developer' },
      ],
      documents: [
        { name: 'Brand Guidelines', uploadedBy: 'Sara Koreem' },
        { name: 'Landing Page Design', uploadedBy: 'Sara Koreem' },
        { name: 'SEO Report', uploadedBy: 'Abdul rehman' },
      ]
    },
  ];

  // ─── TABS ──────────────────────────────────────────────────────────────
  const tabs = ['Overview', 'Backlog', 'Sprint info', 'Milestones', 'Documents'];

  // ─── DETAIL VIEW ──────────────────────────────────────────────────────
  if (selectedProject) {
    return (
      <PMLayout>
        <PMPageLayout title="Projects">
          {/* Back Button */}
          <div style={{ marginBottom: '16px' }}>
            <button
              onClick={handleBackToProjects}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'transparent',
                color: colors.textGray,
                border: 'none',
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer',
                fontFamily: "'Poppins', sans-serif",
                padding: '8px 0',
              }}
            >
              <i className="fas fa-arrow-left" style={{ fontSize: '14px' }} />
              Back to Projects
            </button>
          </div>

          {/* Title & Subtitle */}
          <div style={{ marginBottom: '18px' }}>
            <h2 style={{
              fontSize: 'clamp(22px, 3vw, 28px)',
              fontWeight: 700,
              color: colors.textDark,
              margin: 0,
            }}>
              {selectedProject.title}
            </h2>
            <p style={{
              fontSize: '14px',
              color: colors.textGray,
              margin: '4px 0 0 0',
            }}>
              {selectedProject.subtitle}
            </p>
          </div>

          {/* Tabs */}
          <div style={{
            display: 'flex',
            gap: 'clamp(12px, 2vw, 28px)',
            borderBottom: `1px solid ${colors.border}`,
            marginBottom: '24px',
            overflowX: 'auto',
            flexWrap: 'nowrap',
          }}>
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  padding: '10px 4px',
                  fontSize: '13px',
                  fontWeight: activeTab === tab ? 600 : 500,
                  color: activeTab === tab ? colors.primary : colors.textGray,
                  borderBottom: activeTab === tab ? `3px solid ${colors.primary}` : '3px solid transparent',
                  cursor: 'pointer',
                  fontFamily: "'Poppins', sans-serif",
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s',
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* ─── TAB CONTENT ──────────────────────────────────────── */}
          {activeTab === 'Overview' && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.3fr) minmax(0, 1fr)',
              gap: '20px',
              alignItems: 'start',
            }}>
              {/* Description card */}
              <div style={{
                background: colors.cardBg,
                border: `1px solid ${colors.border}`,
                borderRadius: '16px',
                padding: 'clamp(20px, 3vw, 28px)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              }}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: colors.textDark,
                  margin: '0 0 12px 0',
                }}>
                  Description
                </h3>
                <p style={{
                  fontSize: '14px',
                  lineHeight: '1.7',
                  color: colors.textGray,
                  margin: 0,
                }}>
                  {selectedProject.description}
                </p>

                <div style={{
                  borderTop: `1px solid ${colors.border}`,
                  margin: '20px 0 16px 0',
                }} />

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span style={{ color: colors.textGray }}>Status</span>
                    <span style={{
                      color: selectedProject.status === 'On track' ? colors.statusOnTrack : '#E0A800',
                      fontWeight: 600,
                    }}>
                      {selectedProject.status}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span style={{ color: colors.textGray }}>Start date</span>
                    <span style={{ color: colors.textDark, fontWeight: 500 }}>{selectedProject.startDate}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span style={{ color: colors.textGray }}>End date</span>
                    <span style={{ color: colors.textDark, fontWeight: 500 }}>{selectedProject.endDate}</span>
                  </div>
                </div>
              </div>

              {/* Team card */}
              <div style={{
                background: colors.cardBg,
                border: `1px solid ${colors.border}`,
                borderRadius: '16px',
                padding: 'clamp(20px, 3vw, 28px)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              }}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: colors.textDark,
                  margin: '0 0 14px 0',
                }}>
                  Team
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {selectedProject.team.map((member, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                      }}
                    >
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: avatarColors[member.initials] || '#ccc',
                        color: '#fff',
                        fontSize: '12px',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        {member.initials}
                      </div>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 500, color: colors.textDark }}>
                          {member.name}
                        </div>
                        <div style={{ fontSize: '12.5px', color: colors.textGray }}>
                          {member.role}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ─── BACKLOG TAB ──────────────────────────────────── */}
          {activeTab === 'Backlog' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
                <button
                  onClick={() => setIsBacklogModalOpen(true)}
                  style={{
                    background: colors.primary,
                    color: '#fff',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '10px 20px',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  Add Backlog
                </button>
              </div>

              <div style={{
                background: colors.cardBg,
                border: `1px solid ${colors.border}`,
                borderRadius: '16px',
                padding: '20px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '16px',
                  flexWrap: 'wrap',
                  gap: '10px',
                }}>
                  <div style={{ position: 'relative' }}>
                    <button
                      onClick={() => setIsFilterOpen(!isFilterOpen)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        background: colors.cardBg,
                        border: `1px solid ${colors.border}`,
                        borderRadius: '8px',
                        padding: '9px 14px',
                        fontSize: '13px',
                        color: colors.textDark,
                        cursor: 'pointer',
                        fontFamily: "'Poppins', sans-serif",
                        minWidth: '170px',
                        justifyContent: 'space-between',
                      }}
                    >
                      Filter by priority
                      <i className="fas fa-chevron-down" style={{ fontSize: '11px', color: colors.textGray }} />
                    </button>
                    {isFilterOpen && (
                      <div style={{
                        position: 'absolute',
                        top: 'calc(100% + 4px)',
                        left: 0,
                        background: colors.cardBg,
                        border: `1px solid ${colors.border}`,
                        borderRadius: '8px',
                        width: '170px',
                        zIndex: 10,
                        overflow: 'hidden',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                      }}>
                        {['Low', 'Medium', 'High'].map((p) => (
                          <div
                            key={p}
                            onClick={() => { setPriorityFilter(p); setIsFilterOpen(false); }}
                            style={{
                              padding: '10px 14px',
                              fontSize: '13px',
                              cursor: 'pointer',
                              background: priorityFilter === p ? colors.primary : 'transparent',
                              color: priorityFilter === p ? '#fff' : colors.textDark,
                              fontFamily: "'Poppins', sans-serif",
                            }}
                            onMouseEnter={(e) => { if (priorityFilter !== p) e.currentTarget.style.background = colors.bg; }}
                            onMouseLeave={(e) => { if (priorityFilter !== p) e.currentTarget.style.background = 'transparent'; }}
                          >
                            {p}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    style={{
                      background: 'transparent',
                      color: colors.primary,
                      border: `1px solid ${colors.primary}`,
                      borderRadius: '8px',
                      padding: '9px 16px',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    Move to sprint
                  </button>
                </div>

                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ background: colors.tableHeaderBg }}>
                        <th style={{ padding: '10px 12px', width: '36px' }}></th>
                        <th style={{ textAlign: 'left', padding: '10px 12px', fontSize: '13px', fontWeight: 600, color: '#fff' }}></th>
                        <th style={{ textAlign: 'left', padding: '10px 12px', fontSize: '13px', fontWeight: 600, color: '#fff' }}>Type</th>
                        <th style={{ textAlign: 'left', padding: '10px 12px', fontSize: '13px', fontWeight: 600, color: '#fff' }}>Priority</th>
                        <th style={{ textAlign: 'left', padding: '10px 12px', fontSize: '13px', fontWeight: 600, color: '#fff' }}>Assignee</th>
                        <th style={{ padding: '10px 12px' }}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {backlogItems.map((item, idx) => {
                        const pc = priorityColors[item.priority];
                        return (
                          <tr key={item.id} style={{ borderBottom: idx < backlogItems.length - 1 ? `1px solid ${colors.border}` : 'none' }}>
                            <td style={{ padding: '14px 12px' }}>
                              <input type="checkbox" style={{ width: '16px', height: '16px', cursor: 'pointer' }} />
                            </td>
                            <td style={{ padding: '14px 12px', fontSize: '14px', color: colors.textDark }}>
                              {item.title}
                            </td>
                            <td style={{ padding: '14px 12px', fontSize: '14px', color: colors.textDark }}>
                              {item.type}
                            </td>
                            <td style={{ padding: '14px 12px' }}>
                              <span style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                background: pc.bg,
                                color: pc.text,
                                fontSize: '12px',
                                fontWeight: 600,
                                padding: '4px 10px',
                                borderRadius: '20px',
                              }}>
                                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: pc.dot, display: 'inline-block' }} />
                                {item.priority}
                              </span>
                            </td>
                            <td style={{ padding: '14px 12px', fontSize: '14px', color: colors.textDark }}>
                              {item.assignee}
                            </td>
                            <td style={{ padding: '14px 12px', textAlign: 'right' }}>
                              <a href="#" style={{ fontSize: '13px', color: colors.primary, fontWeight: 500, textDecoration: 'underline', cursor: 'pointer' }}>
                                move to sprint
                              </a>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ─── DOCUMENTS TAB ──────────────────────────────────── */}
          {activeTab === 'Documents' && (
            <div style={{
              background: colors.cardBg,
              border: `1px solid ${colors.border}`,
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr',
                background: colors.tableHeaderBg,
                padding: '14px 24px',
              }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: colors.textDark }}>
                  Document
                </div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: colors.textDark }}>
                  Uploaded by
                </div>
                <div />
              </div>

              {selectedProject.documents && selectedProject.documents.length > 0 ? (
                selectedProject.documents.map((doc, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '2fr 1fr 1fr',
                      padding: '16px 24px',
                      alignItems: 'center',
                      borderTop: `1px solid #E5E7EB`,
                    }}
                  >
                    <div style={{ fontSize: '14px', color: colors.textDark }}>
                      {doc.name}
                    </div>
                    <div style={{ fontSize: '14px', color: colors.textDark }}>
                      {doc.uploadedBy}
                    </div>
                    <div>
                      <a href="#" style={{ fontSize: '14px', color: '#2E6BE6', textDecoration: 'none', cursor: 'pointer' }}>
                        Download
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{
                  padding: '40px 20px',
                  textAlign: 'center',
                  color: colors.textMuted,
                }}>
                  <i className="fas fa-folder-open" style={{ fontSize: '32px', display: 'block', marginBottom: '12px' }} />
                  No documents uploaded for this project.
                </div>
              )}
            </div>
          )}

          {/* ─── OTHER TABS (placeholder) ──────────────────────── */}
          {activeTab !== 'Overview' && activeTab !== 'Backlog' && activeTab !== 'Documents' && (
            <div style={{
              background: colors.cardBg,
              border: `1px solid ${colors.border}`,
              borderRadius: '16px',
              padding: '40px 20px',
              textAlign: 'center',
              color: colors.textGray,
            }}>
              <i className="fas fa-construction" style={{ fontSize: '36px', color: colors.textMuted, marginBottom: '12px', display: 'block' }} />
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: colors.textDark, margin: 0 }}>
                {activeTab}
              </h3>
              <p style={{ fontSize: '14px', margin: '6px 0 0 0' }}>
                Content for {activeTab} will be displayed here.
              </p>
            </div>
          )}

          {/* ─── CREATE BACKLOG MODAL ──────────────────────────────────── */}
          {isBacklogModalOpen && (
            <div
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
              }}
            >
              <div
                style={{
                  background: colors.cardBg,
                  borderRadius: '16px',
                  padding: 'clamp(24px, 3vw, 36px)',
                  width: '460px',
                  maxWidth: '90vw',
                  maxHeight: '90vh',
                  overflowY: 'auto',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
                  position: 'relative',
                }}
              >
                <button
                  onClick={() => setIsBacklogModalOpen(false)}
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '16px',
                    background: 'transparent',
                    border: 'none',
                    fontSize: '24px',
                    cursor: 'pointer',
                    color: colors.textGray,
                  }}
                >
                  ×
                </button>

                <h2 style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: colors.textDark,
                  margin: '0 0 4px 0',
                }}>
                  Create Backlog
                </h2>
                <p style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: colors.primary,
                  margin: '0 0 20px 0',
                }}>
                  {selectedProject.title}
                </p>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: colors.textGray,
                    marginBottom: '4px',
                  }}>
                    Task
                  </label>
                  <input
                    type="text"
                    value={backlogTask}
                    onChange={(e) => setBacklogTask(e.target.value)}
                    placeholder="Enter task name"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      border: `1px solid ${colors.border}`,
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none',
                      fontFamily: "'Poppins', sans-serif",
                      boxSizing: 'border-box',
                      background: '#fff',
                    }}
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: colors.textGray,
                    marginBottom: '4px',
                  }}>
                    Type
                  </label>
                  <select
                    value={backlogType}
                    onChange={(e) => setBacklogType(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      border: `1px solid ${colors.border}`,
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none',
                      fontFamily: "'Poppins', sans-serif",
                      boxSizing: 'border-box',
                      background: '#fff',
                      appearance: 'auto',
                    }}
                  >
                    {typeOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: colors.textGray,
                    marginBottom: '4px',
                  }}>
                    Priority
                  </label>
                  <select
                    value={backlogPriority}
                    onChange={(e) => setBacklogPriority(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      border: `1px solid ${colors.border}`,
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none',
                      fontFamily: "'Poppins', sans-serif",
                      boxSizing: 'border-box',
                      background: '#fff',
                      appearance: 'auto',
                    }}
                  >
                    {priorityOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: colors.textGray,
                    marginBottom: '4px',
                  }}>
                    Assignee
                  </label>
                  <select
                    value={backlogAssignee}
                    onChange={(e) => setBacklogAssignee(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      border: `1px solid ${colors.border}`,
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none',
                      fontFamily: "'Poppins', sans-serif",
                      boxSizing: 'border-box',
                      background: '#fff',
                      appearance: 'auto',
                    }}
                  >
                    <option value="">Select assignee</option>
                    {assigneeOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handleCreateBacklog}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: colors.primary,
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '15px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontFamily: "'Poppins', sans-serif",
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) => e.target.style.background = colors.primaryDark}
                  onMouseLeave={(e) => e.target.style.background = colors.primary}
                >
                  Create Backlog
                </button>
              </div>
            </div>
          )}
        </PMPageLayout>
      </PMLayout>
    );
  }

  // ─── GRID VIEW ──────────────────────────────────────────────────────
  return (
    <PMLayout>
      <PMPageLayout title="Projects">
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
          <button
            onClick={() => setIsModalOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: colors.primary,
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              padding: '10px 18px',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            <i className="fas fa-plus" style={{ fontSize: '14px' }} />
            Create Project
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '20px',
        }}>
          {projects.map((project) => (
            <div
              key={project.id}
              style={{
                background: colors.cardBg,
                border: `1px solid ${colors.border}`,
                borderRadius: '16px',
                padding: '20px 22px',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onClick={() => handleViewProject(project.id)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <h3 style={{
                fontSize: '16px',
                fontWeight: 600,
                color: colors.textDark,
                margin: '0 0 4px 0',
              }}>
                {project.title}
              </h3>
              <p style={{
                fontSize: '13px',
                color: colors.textGray,
                margin: '0 0 16px 0',
              }}>
                {project.subtitle}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                {project.team.slice(0, 4).map((member, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: avatarColors[member.initials] || '#ccc',
                      color: '#fff',
                      fontSize: '11px',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      {member.initials}
                    </div>
                    <span style={{
                      fontSize: '13px',
                      color: colors.textDark,
                    }}>
                      {member.name} . <span style={{ color: colors.textGray }}>{member.role}</span>
                    </span>
                  </div>
                ))}
                {project.team.length > 4 && (
                  <div style={{ fontSize: '12px', color: colors.textMuted, paddingLeft: '38px' }}>
                    +{project.team.length - 4} more
                  </div>
                )}
              </div>

              <div style={{
                marginTop: '16px',
                paddingTop: '14px',
                borderTop: `1px solid ${colors.border}`,
                display: 'flex',
                justifyContent: 'flex-end',
              }}>
                <button
                  onClick={(e) => { e.stopPropagation(); handleViewProject(project.id); }}
                  style={{
                    background: colors.primary,
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '6px 20px',
                    fontSize: '13px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </PMPageLayout>

      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateProject}
      />
    </PMLayout>
  );
}