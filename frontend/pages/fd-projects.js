import { useState } from 'react';
import FDLayout from '@/components/FDLayout';
import FDPageLayout from '@/components/FDPageLayout';

export default function FDProjects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeTab, setActiveTab] = useState('Overview');
  const [messageText, setMessageText] = useState('');
  const [teamMessageText, setTeamMessageText] = useState('');
  const [showSeniorInput, setShowSeniorInput] = useState(false);
  const [showTeamInput, setShowTeamInput] = useState(false);

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

  const cardShadow = '0 4px 20px rgba(0,0,0,0.06)';

  const avatarColors = {
    'BA': '#3B5BDB',
    'SK': '#F4B400',
    'TR': '#2FBF71',
    'AR': '#E8483E',
    'RK': '#8B5CF6',
    'HJ': '#F97316',
    'CEO': '#0F766E',
    'CTO': '#C2660C',
    'HR': '#2B6FC0',
  };

  const projects = [
    {
      id: 1,
      title: 'Nexovate Portal',
      subtitle: 'Client-developer portal · AI scope reports',
      description: 'Nexovate is an AI-powered platform that helps non-technical clients transform their ideas into structured software projects. By answering AI-generated multiple-choice questions, clients receive a detailed project scope document that is published on the platform. Developers can browse and choose projects that match their expertise, while Nexovate manages project documentation, administration, and secure payment processing to ensure a smooth and organized experience.',
      status: 'Active',
      statusLabel: 'On track',
      startDate: '7 Jun 2026',
      endDate: '24 Jul 2026',
      team: [
        { initials: 'BA', name: 'Bilal Ahmed', role: 'Project Manager' },
        { initials: 'RK', name: 'Raheel Khan', role: 'Team Lead' },
        { initials: 'SK', name: 'Sara kareem', role: 'UI/UX designer' },
        { initials: 'TR', name: 'Sara afzal', role: 'Frontend developer' },
        { initials: 'AR', name: 'Abdul rehman', role: 'Backend developer' },
        { initials: 'HJ', name: 'Hafeez jamil', role: 'AI engineer' },
      ],
      seniors: [
        { initials: 'CEO', name: 'CEO', role: 'CEO' },
        { initials: 'CTO', name: 'CTO', role: 'CTO' },
        { initials: 'HR', name: 'HR', role: 'HR' },
      ],
    },
    {
      id: 2,
      title: 'Marketing Site Refresh',
      subtitle: 'Public landing page & brand refresh',
      description: 'A complete refresh of the company\'s public-facing marketing website. The project includes a new brand identity, responsive landing pages, SEO optimization, and integration with the company\'s CMS.',
      status: 'Completed',
      statusLabel: 'Delivered',
      startDate: '2 Feb 2026',
      endDate: '30 Apr 2026',
      team: [
        { initials: 'BA', name: 'Bilal ahmed', role: 'PM' },
        { initials: 'SK', name: 'Sara kareem', role: 'UI/UX designer' },
        { initials: 'TR', name: 'Tehreem raja', role: 'Frontend developer' },
        { initials: 'AR', name: 'Abdul rehman', role: 'Backend developer' },
      ],
      seniors: [
        { initials: 'CEO', name: 'CEO', role: 'CEO' },
        { initials: 'CTO', name: 'CTO', role: 'CTO' },
        { initials: 'HR', name: 'HR', role: 'HR' },
      ],
    },
    {
      id: 3,
      title: 'TN - HRMS',
      subtitle: 'Unified HR & project management system',
      description: 'TN-HRMS is a comprehensive human resource management system that streamlines employee onboarding, leave tracking, attendance management, and performance reviews.',
      status: 'Completed',
      statusLabel: 'Delivered',
      startDate: '10 Oct 2025',
      endDate: '15 Jan 2026',
      team: [
        { initials: 'BA', name: 'Bilal ahmed', role: 'PM' },
        { initials: 'SK', name: 'Sara kareem', role: 'UI/UX designer' },
        { initials: 'TR', name: 'Tehreem raja', role: 'Frontend developer' },
        { initials: 'AR', name: 'Abdul rehman', role: 'Backend developer' },
      ],
      seniors: [
        { initials: 'CEO', name: 'CEO', role: 'CEO' },
        { initials: 'CTO', name: 'CTO', role: 'CTO' },
        { initials: 'HR', name: 'HR', role: 'HR' },
      ],
    },
  ];

  const handleViewProject = (projectId) => {
    const project = projects.find((p) => p.id === projectId);
    setSelectedProject(project);
    setActiveTab('Overview');
  };

  const handleBackToProjects = () => {
    setSelectedProject(null);
    setActiveTab('Overview');
  };

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    alert(`Message sent to seniors: ${messageText}`);
    setMessageText('');
    setShowSeniorInput(false); // hide after send
  };

  const handleSendTeamMessage = () => {
    if (!teamMessageText.trim()) return;
    alert(`Message sent to team: ${teamMessageText}`);
    setTeamMessageText('');
    setShowTeamInput(false); // hide after send
  };

  const toggleSeniorInput = () => setShowSeniorInput(!showSeniorInput);
  const toggleTeamInput = () => setShowTeamInput(!showTeamInput);

  const activeProjects = projects.filter(p => p.status === 'Active');
  const completedProjects = projects.filter(p => p.status === 'Completed');

  // Shared card wrapper style
  const cardStyle = {
    background: colors.cardBg,
    border: `1px solid ${colors.border}`,
    borderRadius: '16px',
    padding: '20px 22px',
    boxShadow: cardShadow,
  };

  // ─── DETAIL VIEW ──────────────────────────────────────────────────────
  if (selectedProject) {
    const tabs = ['Overview', 'Tasks', 'Documents'];
    const isOnTrack = selectedProject.status === 'Active';

    return (
      <FDLayout>
        <FDPageLayout title="Projects">
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

          {/* Title, subtitle & Tabs */}
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{
              fontSize: 'clamp(22px, 3vw, 28px)',
              fontWeight: 700,
              color: colors.textDark,
              margin: '0 0 4px 0',
            }}>
              {selectedProject.title}
            </h2>
            <p style={{
              fontSize: '14px',
              color: colors.textGray,
              margin: 0,
            }}>
              {selectedProject.subtitle}
            </p>
          </div>

          <div style={{
            display: 'flex',
            gap: 'clamp(20px, 2vw, 32px)',
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
                  fontSize: '14px',
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

          {/* ─── TAB: Overview ──────────────────────────────────── */}
          {activeTab === 'Overview' && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '20px',
              alignItems: 'start',
            }}>
              {/* LEFT COLUMN: Description + Message seniors */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                {/* Description card */}
                <div style={cardStyle}>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: colors.textDark,
                    margin: '0 0 10px 0',
                  }}>
                    Description
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    lineHeight: '1.7',
                    color: colors.textGray,
                    margin: '0 0 16px 0',
                  }}>
                    {selectedProject.description}
                  </p>

                  <div style={{ borderTop: `1px solid ${colors.border}`, marginBottom: '14px' }} />

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                      <span style={{ color: colors.textGray }}>Status</span>
                      <span style={{ fontWeight: 600, color: isOnTrack ? colors.statusOnTrack : colors.textDark }}>
                        {selectedProject.statusLabel}
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                      <span style={{ color: colors.textGray }}>Start date</span>
                      <span style={{ fontWeight: 500, color: colors.textDark }}>{selectedProject.startDate}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                      <span style={{ color: colors.textGray }}>End date</span>
                      <span style={{ fontWeight: 500, color: colors.textDark }}>{selectedProject.endDate}</span>
                    </div>
                  </div>
                </div>

                {/* Message seniors card with toggle */}
                <div style={cardStyle}>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: colors.textDark,
                    margin: '0 0 12px 0',
                  }}>
                    Message seniors
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {selectedProject.seniors.map((senior, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '8px 10px',
                          background: colors.bg,
                          borderRadius: '10px',
                        }}
                      >
                        <div style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          background: avatarColors[senior.initials] || '#ccc',
                          color: '#fff',
                          fontSize: '10px',
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}>
                          {senior.initials}
                        </div>
                        <span style={{ fontSize: '13px', fontWeight: 500, color: colors.textDark, flex: 1 }}>
                          {senior.name}
                        </span>
                        <button
                          aria-label={`Message ${senior.name}`}
                          onClick={toggleSeniorInput}
                          style={{
                            width: '26px',
                            height: '26px',
                            borderRadius: '8px',
                            border: 'none',
                            background: 'transparent',
                            color: showSeniorInput ? colors.primary : colors.textMuted,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <i className="far fa-comment-dots" />
                        </button>
                      </div>
                    ))}

                    {showSeniorInput && (
                      <>
                        <div style={{ borderTop: `1px solid ${colors.border}`, margin: '4px 0' }} />
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                          <input
                            type="text"
                            value={messageText}
                            onChange={(e) => setMessageText(e.target.value)}
                            placeholder="Type your message..."
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleSendMessage();
                              }
                            }}
                            style={{
                              flex: 1,
                              padding: '10px 16px',
                              border: `1px solid ${colors.border}`,
                              borderRadius: '10px',
                              fontSize: '13px',
                              outline: 'none',
                              fontFamily: "'Poppins', sans-serif",
                              color: colors.textDark,
                              background: colors.bg,
                            }}
                          />
                          <button
                            onClick={handleSendMessage}
                            style={{
                              padding: '10px 22px',
                              background: colors.primary,
                              color: '#fff',
                              border: 'none',
                              borderRadius: '10px',
                              fontSize: '13px',
                              fontWeight: 600,
                              cursor: 'pointer',
                              fontFamily: "'Poppins', sans-serif",
                              transition: 'background 0.2s',
                            }}
                            onMouseEnter={(e) => e.target.style.background = colors.primaryDark}
                            onMouseLeave={(e) => e.target.style.background = colors.primary}
                          >
                            Send
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Team card with toggle */}
              <div style={cardStyle}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: colors.textDark,
                  margin: '0 0 14px 0',
                }}>
                  Team
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {selectedProject.team.map((member, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '8px 10px',
                        background: colors.bg,
                        borderRadius: '10px',
                      }}
                    >
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: avatarColors[member.initials] || '#ccc',
                        color: '#fff',
                        fontSize: '11px',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        {member.initials}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '13.5px', fontWeight: 600, color: colors.textDark }}>
                          {member.name}
                        </div>
                        <div style={{ fontSize: '12px', color: colors.textGray }}>
                          {member.role}
                        </div>
                      </div>
                      <button
                        aria-label={`Message ${member.name}`}
                        onClick={toggleTeamInput}
                        style={{
                          width: '26px',
                          height: '26px',
                          borderRadius: '8px',
                          border: 'none',
                          background: 'transparent',
                          color: showTeamInput ? colors.primary : colors.textMuted,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <i className="far fa-comment-dots" />
                      </button>
                    </div>
                  ))}
                </div>

                {showTeamInput && (
                  <>
                    <div style={{ borderTop: `1px solid ${colors.border}`, margin: '10px 0 12px 0' }} />
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <input
                        type="text"
                        value={teamMessageText}
                        onChange={(e) => setTeamMessageText(e.target.value)}
                        placeholder="Type your message..."
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleSendTeamMessage();
                          }
                        }}
                        style={{
                          flex: 1,
                          padding: '10px 16px',
                          border: `1px solid ${colors.border}`,
                          borderRadius: '10px',
                          fontSize: '13px',
                          outline: 'none',
                          fontFamily: "'Poppins', sans-serif",
                          color: colors.textDark,
                          background: colors.bg,
                        }}
                      />
                      <button
                        onClick={handleSendTeamMessage}
                        style={{
                          padding: '10px 22px',
                          background: colors.primary,
                          color: '#fff',
                          border: 'none',
                          borderRadius: '10px',
                          fontSize: '13px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          fontFamily: "'Poppins', sans-serif",
                          transition: 'background 0.2s',
                        }}
                        onMouseEnter={(e) => e.target.style.background = colors.primaryDark}
                        onMouseLeave={(e) => e.target.style.background = colors.primary}
                      >
                        Send
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* ─── TAB: Tasks ────────────────────────────────────── */}
          {activeTab === 'Tasks' && (
            <div style={{
              ...cardStyle,
              padding: '40px 20px',
              textAlign: 'center',
              color: colors.textMuted,
            }}>
              <i className="fas fa-tasks" style={{ fontSize: '36px', display: 'block', marginBottom: '12px', color: colors.primary }} />
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: colors.textDark, margin: 0 }}>Tasks</h3>
              <p style={{ fontSize: '14px', margin: '6px 0 0 0' }}>Task management will be available here.</p>
            </div>
          )}

          {/* ─── TAB: Documents ────────────────────────────────── */}
          {activeTab === 'Documents' && (
            <div style={{
              ...cardStyle,
              padding: '40px 20px',
              textAlign: 'center',
              color: colors.textMuted,
            }}>
              <i className="fas fa-file-alt" style={{ fontSize: '36px', display: 'block', marginBottom: '12px', color: colors.primary }} />
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: colors.textDark, margin: 0 }}>Documents</h3>
              <p style={{ fontSize: '14px', margin: '6px 0 0 0' }}>Project documents will be available here.</p>
            </div>
          )}
        </FDPageLayout>
      </FDLayout>
    );
  }

  // ─── GRID VIEW ──────────────────────────────────────────────────────
  const ProjectCard = ({ project }) => (
    <div style={{
      background: colors.cardBg,
      border: `1px solid ${colors.border}`,
      borderRadius: '12px',
      padding: '18px 20px',
      boxShadow: cardShadow,
      transition: 'transform 0.15s, box-shadow 0.15s',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.10)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = cardShadow;
    }}
    >
      <div style={{ marginBottom: '10px' }}>
        <h3 style={{
          fontSize: '15px',
          fontWeight: 700,
          color: colors.textDark,
          margin: '0 0 2px 0',
        }}>
          {project.title}
        </h3>
        <p style={{
          fontSize: '12px',
          color: colors.textGray,
          margin: 0,
        }}>
          {project.subtitle}
        </p>
      </div>

      <div style={{
        borderTop: `1px solid ${colors.border}`,
        marginBottom: '12px',
      }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
        {project.team.slice(0, 4).map((member, idx) => (
          <div key={idx} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '12px',
            color: colors.textDark,
          }}>
            <div style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              background: avatarColors[member.initials] || '#999',
              color: '#fff',
              fontSize: '8px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              {member.initials}
            </div>
            <span style={{ fontWeight: 600 }}>{member.name}</span>
            <span style={{ color: colors.textGray, fontSize: '12px' }}>· {member.role}</span>
          </div>
        ))}
        {project.team.length > 4 && (
          <div style={{ fontSize: '11px', color: colors.textMuted, paddingLeft: '28px' }}>
            +{project.team.length - 4} more
          </div>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleViewProject(project.id);
          }}
          style={{
            color: colors.primary,
            background: 'transparent',
            border: 'none',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: "'Poppins', sans-serif",
            textDecoration: 'underline',
          }}
        >
          View
        </button>
      </div>
    </div>
  );

  const sectionTitleStyle = {
    fontSize: '18px',
    fontWeight: 700,
    color: colors.textDark,
    margin: '0 0 10px 0',
  };

  const sectionDividerStyle = {
    borderTop: `1px solid ${colors.border}`,
    marginBottom: '20px',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 340px))',
    gap: '20px',
  };

  return (
    <FDLayout>
      <FDPageLayout title="Projects">
        {/* ─── Active Projects ────────────────────────────── */}
        <div style={{ marginBottom: '32px' }}>
          <h2 style={sectionTitleStyle}>Active projects</h2>
          <div style={sectionDividerStyle} />

          {activeProjects.length > 0 ? (
            <div style={gridStyle}>
              {activeProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <p style={{ fontSize: '13px', color: colors.textMuted, textAlign: 'center', padding: '20px 0' }}>
              No active projects.
            </p>
          )}
        </div>

        {/* ─── Completed Projects ────────────────────────── */}
        <div>
          <h2 style={sectionTitleStyle}>Completed projects</h2>
          <div style={sectionDividerStyle} />

          {completedProjects.length > 0 ? (
            <div style={gridStyle}>
              {completedProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <p style={{ fontSize: '13px', color: colors.textMuted, textAlign: 'center', padding: '20px 0' }}>
              No completed projects.
            </p>
          )}
        </div>
      </FDPageLayout>
    </FDLayout>
  );
}