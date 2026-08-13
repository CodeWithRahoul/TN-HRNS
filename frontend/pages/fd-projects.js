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
  const [submitModalTask, setSubmitModalTask] = useState(null);
  const [submitLink, setSubmitLink] = useState('');
  const [submitFile, setSubmitFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [askModalTask, setAskModalTask] = useState(null);
  const [askInput, setAskInput] = useState('');
  const [askMessages, setAskMessages] = useState([]);

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
      tasks: [
        {
          id: 1,
          title: 'Fix responsive nav overflow',
          description: 'Nav collapses incorrectly below 768px on the Alpha marketing site — hamburger icon overlaps the logo.',
          assignedBy: 'Bilal ahmed',
          priority: 'High',
          deadline: '25 Aug 2026',
          progress: 20,
        },
        {
          id: 2,
          title: 'Update API documentation',
          description: 'Document the new tasks endpoints including auth headers and error codes.',
          assignedBy: 'Bilal ahmed',
          priority: 'High',
          deadline: '25 Aug 2026',
          progress: 20,
        },
        {
          id: 3,
          title: 'Optimize product image loading',
          description: 'Add lazy-loading and responsive srcset to the product gallery component.',
          assignedBy: 'Bilal ahmed',
          priority: 'Low',
          deadline: '25 Aug 2026',
          progress: 0,
        },
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
      tasks: [],
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
      tasks: [],
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
    setShowSeniorInput(false);
  };

  const handleSendTeamMessage = () => {
    if (!teamMessageText.trim()) return;
    alert(`Message sent to team: ${teamMessageText}`);
    setTeamMessageText('');
    setShowTeamInput(false);
  };

  const openSubmitModal = (task) => {
    setSubmitModalTask(task);
    setSubmitLink('');
    setSubmitFile(null);
    setIsDragging(false);
  };

  const closeSubmitModal = () => {
    setSubmitModalTask(null);
    setSubmitLink('');
    setSubmitFile(null);
    setIsDragging(false);
  };

  const handleSubmitWork = () => {
    alert(`Work submitted for: ${submitModalTask?.title}\nLink: ${submitLink || '—'}\nFile: ${submitFile ? submitFile.name : '—'}`);
    closeSubmitModal();
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSubmitFile(e.target.files[0]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSubmitFile(e.dataTransfer.files[0]);
    }
  };

  const openAskModal = (task) => {
    setAskModalTask(task);
    setAskInput('');
    setAskMessages([
      { sender: 'me', text: 'Quick question on the mobile breakpoint, is it 768px or 720px?', time: '11:45 AM' },
      { sender: 'them', text: 'It is 720px.', time: '11:50 AM' },
    ]);
  };

  const closeAskModal = () => {
    setAskModalTask(null);
    setAskInput('');
    setAskMessages([]);
  };

  const handleSendAsk = () => {
    if (!askInput.trim()) return;
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    setAskMessages((prev) => [...prev, { sender: 'me', text: askInput, time: `${hours}:${minutes} ${ampm}` }]);
    setAskInput('');
  };

  const toggleSeniorInput = () => setShowSeniorInput(!showSeniorInput);
  const toggleTeamInput = () => setShowTeamInput(!showTeamInput);

  const handleUpdateProgress = (taskId, progress) => {
    setSelectedProject((prev) => {
      if (!prev) return prev;
      const updatedTasks = prev.tasks.map((task) =>
        task.id === taskId ? { ...task, progress } : task
      );
      return { ...prev, tasks: updatedTasks };
    });
  };

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
    const tabs = ['Overview', 'Tasks'];
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

                {/* Message seniors card */}
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

              {/* RIGHT COLUMN: Team card */}
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

          {/* ─── TAB: Tasks (image-matched design) ─────────────── */}
          {activeTab === 'Tasks' && (
            <div
              className="fd-tasks-scroll"
              style={{
                ...cardStyle,
                padding: '8px 24px',
                maxHeight: '620px',
                overflowY: 'scroll',
                scrollbarWidth: 'thin',
                scrollbarColor: `${colors.primary} ${colors.bg}`,
              }}
            >
              <style>{`
                .fd-tasks-scroll::-webkit-scrollbar {
                  width: 10px;
                }
                .fd-tasks-scroll::-webkit-scrollbar-track {
                  background: ${colors.bg};
                  border-radius: 8px;
                }
                .fd-tasks-scroll::-webkit-scrollbar-thumb {
                  background: ${colors.primary};
                  border-radius: 8px;
                }
                .fd-tasks-scroll::-webkit-scrollbar-thumb:hover {
                  background: ${colors.primaryDark};
                }
              `}</style>
              {selectedProject.tasks && selectedProject.tasks.length > 0 ? (
                selectedProject.tasks.map((task, index) => {
                  const milestones = [10, 20, 40, 60, 80, 100];
                  const isHighPriority = task.priority === 'High';
                  const priorityColor = isHighPriority ? '#DC2626' : '#4B5563';
                  const priorityBg = isHighPriority ? '#FDE7E7' : '#EEF0F2';
                  const isLast = index === selectedProject.tasks.length - 1;

                  return (
                    <div
                      key={task.id}
                      style={{
                        padding: '22px 0',
                        borderBottom: isLast ? 'none' : `1px solid #E8ECEE`,
                      }}
                    >
                      {/* Task Title */}
                      <h3 style={{
                        fontSize: '16px',
                        fontWeight: 700,
                        color: colors.textDark,
                        margin: '0 0 4px 0',
                      }}>
                        {task.title}
                      </h3>

                      {/* Description */}
                      <p style={{
                        fontSize: '13px',
                        color: colors.textGray,
                        margin: '0 0 12px 0',
                        lineHeight: '1.6',
                      }}>
                        {task.description}
                      </p>

                      {/* Meta pills: Assigned by, Priority, Deadline */}
                      <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '8px',
                        marginBottom: '16px',
                      }}>
                        <span style={{
                          display: 'inline-block',
                          background: '#EAF2FB',
                          color: '#2563AE',
                          fontWeight: 600,
                          padding: '3px 12px',
                          borderRadius: '12px',
                          fontSize: '11.5px',
                        }}>
                          Assigned by {task.assignedBy}
                        </span>
                        <span style={{
                          display: 'inline-block',
                          background: priorityBg,
                          color: priorityColor,
                          fontWeight: 600,
                          padding: '3px 12px',
                          borderRadius: '12px',
                          fontSize: '11.5px',
                        }}>
                          {task.priority}
                        </span>
                        <span style={{
                          display: 'inline-block',
                          background: '#FDEDE3',
                          color: '#C2540C',
                          fontWeight: 600,
                          padding: '3px 12px',
                          borderRadius: '12px',
                          fontSize: '11.5px',
                        }}>
                          Deadline {task.deadline}
                        </span>
                      </div>

                      {/* Milestone track */}
                      <div style={{ marginBottom: '18px' }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 'clamp(10px, 3vw, 28px)',
                          position: 'relative',
                          maxWidth: '480px',
                          margin: '0 auto',
                        }}>
                          {milestones.map((pct, i) => {
                            const isDone = task.progress >= pct;
                            const isLastMilestone = i === milestones.length - 1;
                            return (
                              <div key={pct} style={{ display: 'flex', alignItems: 'center', flex: isLastMilestone ? '0 0 auto' : 1 }}>
                                <button
                                  onClick={() => handleUpdateProgress(task.id, pct)}
                                  aria-label={`Mark ${pct}% complete`}
                                  style={{
                                    width: '30px',
                                    height: '30px',
                                    borderRadius: '50%',
                                    border: 'none',
                                    background: isDone ? colors.primary : '#D9DEE2',
                                    color: '#fff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    flexShrink: 0,
                                    fontSize: '12px',
                                    transition: 'background 0.2s',
                                  }}
                                >
                                  {isDone ? <i className="fas fa-check" /> : null}
                                </button>
                                {!isLastMilestone && (
                                  <div style={{
                                    flex: 1,
                                    height: '2px',
                                    background: task.progress >= milestones[i + 1] ? colors.primary : '#D9DEE2',
                                    minWidth: '12px',
                                  }} />
                                )}
                              </div>
                            );
                          })}
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'center',
                          gap: 'clamp(18px, 4vw, 40px)',
                          maxWidth: '480px',
                          margin: '6px auto 0 auto',
                        }}>
                          {milestones.map((pct) => (
                            <span key={pct} style={{
                              fontSize: '11px',
                              color: colors.textMuted,
                              width: '30px',
                              textAlign: 'center',
                            }}>
                              {pct}%
                            </span>
                          ))}
                        </div>
                        <p style={{
                          textAlign: 'center',
                          fontSize: '11.5px',
                          color: colors.textMuted,
                          margin: '8px 0 0 0',
                        }}>
                          Click a milestone to mark it complete
                        </p>
                      </div>

                      {/* Action buttons */}
                      <div style={{
                        display: 'flex',
                        gap: '12px',
                        flexWrap: 'wrap',
                      }}>
                        <button
                          onClick={() => openSubmitModal(task)}
                          style={{
                            padding: '8px 20px',
                            background: colors.primary,
                            color: '#fff',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '13px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            fontFamily: "'Poppins', sans-serif",
                            transition: 'background 0.2s',
                          }}
                          onMouseEnter={(e) => e.target.style.background = colors.primaryDark}
                          onMouseLeave={(e) => e.target.style.background = colors.primary}
                        >
                          Submit work
                        </button>
                        <button
                          onClick={() => openAskModal(task)}
                          style={{
                            padding: '8px 20px',
                            background: '#fff',
                            color: colors.textDark,
                            border: `1px solid #D9DEE2`,
                            borderRadius: '8px',
                            fontSize: '13px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            fontFamily: "'Poppins', sans-serif",
                            transition: 'all 0.2s',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = colors.bg;
                            e.currentTarget.style.borderColor = colors.primary;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = '#fff';
                            e.currentTarget.style.borderColor = '#D9DEE2';
                          }}
                        >
                          Ask a question
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div style={{
                  padding: '40px 20px',
                  textAlign: 'center',
                  color: colors.textMuted,
                }}>
                  <i className="fas fa-tasks" style={{ fontSize: '36px', display: 'block', marginBottom: '12px', color: colors.primary }} />
                  <h3 style={{ fontSize: '16px', fontWeight: 600, color: colors.textDark, margin: 0 }}>No tasks assigned</h3>
                  <p style={{ fontSize: '14px', margin: '6px 0 0 0' }}>Tasks for this project will appear here.</p>
                </div>
              )}
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
          {/* ─── Submit Work Modal ─────────────────────────────── */}
          {submitModalTask && (
            <div
              onClick={closeSubmitModal}
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
                  padding: '26px 28px 28px 28px',
                  width: '100%',
                  maxWidth: '400px',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.18)',
                  position: 'relative',
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                {/* Close button */}
                <button
                  onClick={closeSubmitModal}
                  aria-label="Close"
                  style={{
                    position: 'absolute',
                    top: '18px',
                    right: '18px',
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
                    fontSize: '13px',
                  }}
                >
                  <i className="fas fa-times" />
                </button>

                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: colors.textDark,
                  margin: '0 0 20px 0',
                }}>
                  Submit work
                </h3>

                {/* Link field */}
                <label style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: colors.textDark,
                  marginBottom: '8px',
                }}>
                  Link
                </label>
                <input
                  type="text"
                  value={submitLink}
                  onChange={(e) => setSubmitLink(e.target.value)}
                  placeholder=""
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    border: `1px solid #D9DEE2`,
                    borderRadius: '10px',
                    fontSize: '13px',
                    outline: 'none',
                    fontFamily: "'Poppins', sans-serif",
                    color: colors.textDark,
                    marginBottom: '20px',
                    boxSizing: 'border-box',
                  }}
                />

                {/* Upload field */}
                <label style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: colors.textDark,
                  marginBottom: '8px',
                }}>
                  Upload your work
                </label>
                <label
                  htmlFor="fd-file-upload"
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '26px 16px',
                    border: `1.5px dashed ${isDragging ? colors.primary : '#C7CDD2'}`,
                    borderRadius: '12px',
                    background: isDragging ? colors.primaryLight : colors.bg,
                    cursor: 'pointer',
                    textAlign: 'center',
                    marginBottom: '20px',
                    transition: 'all 0.15s',
                  }}
                >
                  <i className="fas fa-cloud-upload-alt" style={{ fontSize: '20px', color: colors.textMuted }} />
                  <span style={{ fontSize: '13.5px', fontWeight: 600, color: colors.textDark }}>
                    {submitFile ? submitFile.name : 'Click to upload or drag files here'}
                  </span>
                  <span style={{ fontSize: '11.5px', color: colors.textMuted }}>
                    Screenshots, PDFs, or docs — up to 25MB
                  </span>
                  <input
                    id="fd-file-upload"
                    type="file"
                    onChange={handleFileSelect}
                    style={{ display: 'none' }}
                  />
                </label>

                {/* Submit button */}
                <button
                  onClick={handleSubmitWork}
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
          {/* ─── Ask a Question Modal ──────────────────────────── */}
          {askModalTask && (
            <div
              onClick={closeAskModal}
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
                  padding: '22px 24px 24px 24px',
                  width: '100%',
                  maxWidth: '440px',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.18)',
                  position: 'relative',
                  fontFamily: "'Poppins', sans-serif",
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '19px', fontWeight: 700, color: colors.textDark, margin: 0 }}>
                    Ask a question
                  </h3>
                  <button
                    onClick={closeAskModal}
                    aria-label="Close"
                    style={{
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
                      fontSize: '13px',
                      flexShrink: 0,
                    }}
                  >
                    <i className="fas fa-times" />
                  </button>
                </div>

                {/* Message thread */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  maxHeight: '280px',
                  overflowY: 'auto',
                  marginBottom: '16px',
                  paddingRight: '4px',
                }}>
                  {askMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      style={{
                        alignSelf: msg.sender === 'me' ? 'flex-end' : 'flex-start',
                        maxWidth: '78%',
                      }}
                    >
                      <div style={{
                        background: msg.sender === 'me' ? colors.primary : colors.bg,
                        color: msg.sender === 'me' ? '#fff' : colors.textDark,
                        padding: '12px 16px',
                        borderRadius: msg.sender === 'me' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                        fontSize: '13.5px',
                        lineHeight: '1.5',
                      }}>
                        {msg.text}
                      </div>
                      <div style={{
                        fontSize: '10.5px',
                        color: colors.textMuted,
                        marginTop: '4px',
                        textAlign: msg.sender === 'me' ? 'right' : 'left',
                      }}>
                        {msg.time}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input row */}
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <div style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    border: `1px solid #D9DEE2`,
                    borderRadius: '10px',
                    padding: '0 14px',
                  }}>
                    <input
                      type="text"
                      value={askInput}
                      onChange={(e) => setAskInput(e.target.value)}
                      placeholder="Type your message..."
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleSendAsk();
                        }
                      }}
                      style={{
                        flex: 1,
                        padding: '11px 0',
                        border: 'none',
                        outline: 'none',
                        fontSize: '13px',
                        fontFamily: "'Poppins', sans-serif",
                        color: colors.textDark,
                        background: 'transparent',
                      }}
                    />
                    <i className="far fa-eye" style={{ color: colors.textMuted, fontSize: '13px' }} />
                  </div>
                  <button
                    onClick={handleSendAsk}
                    style={{
                      padding: '11px 22px',
                      background: colors.primary,
                      color: '#fff',
                      border: 'none',
                      borderRadius: '10px',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      fontFamily: "'Poppins', sans-serif",
                      transition: 'background 0.2s',
                      flexShrink: 0,
                    }}
                    onMouseEnter={(e) => e.target.style.background = colors.primaryDark}
                    onMouseLeave={(e) => e.target.style.background = colors.primary}
                  >
                    Send
                  </button>
                </div>
              </div>
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