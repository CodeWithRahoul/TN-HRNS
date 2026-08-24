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
  const [viewWorkTask, setViewWorkTask] = useState(null);
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [milestoneComment, setMilestoneComment] = useState('');

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
    statusOnTrack: '#1FA25A',
  };

  const cardShadow = '0 4px 20px rgba(0,0,0,0.06)';

  const avatarColors = {
    BA: '#3B5BDB',
    SK: '#F4B400',
    TR: '#2FBF71',
    AR: '#E8483E',
    RK: '#8B5CF6',
    HJ: '#F97316',
    CEO: '#0F766E',
    CTO: '#C2660C',
    HR: '#2B6FC0',
  };

  const projects = [
    {
      id: 1,
      title: 'Nexovate Portal',
      subtitle: 'Client-developer portal · AI scope reports',
      description:
        "Nexovate is an AI-powered platform that helps non-technical clients transform their ideas into structured software projects. By answering AI-generated multiple-choice questions, clients receive a detailed project scope document that is published on the platform. Developers can browse and choose projects that match their expertise, while Nexovate manages project documentation, administration, and secure payment processing to ensure a smooth and organized experience.",
      status: 'Active',
      statusLabel: 'On track',
      startDate: '7 Jun 2026',
      endDate: '24 Jul 2026',
      team: [
        { initials: 'BA', name: 'Bilal ahmed', role: 'Project Manager' },
        { initials: 'RK', name: 'Raheel khan', role: 'Team lead' },
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
      // "Tasks submitted" list — read-only work submissions
      submittedTasks: [
        {
          id: 1,
          title: 'Design high-fidelity UI screens',
          submittedBy: 'Sara kareem . UI/UX designer',
          link: 'https/www.figma/prototype',
          fileName: 'high-fidelity UI screens',
        },
        {
          id: 2,
          title: 'Prepare design system & components',
          submittedBy: 'Sara kareem . UI/UX designer',
          link: 'https/www.figma/design-system',
          fileName: 'design-system-components',
        },
        {
          id: 3,
          title: 'Implement Figma designs',
          submittedBy: 'Bilal ahmed . Frontend dev',
          link: 'https/www.github.com/nexovate/pr-114',
          fileName: 'figma-implementation',
        },
        {
          id: 4,
          title: 'Design database schema',
          submittedBy: 'Abdul rehman . Backend dev',
          link: 'https/www.github.com/nexovate/schema',
          fileName: 'db-schema',
        },
      ],
      // "Milestones" — top-level project milestones
      milestones: [
        {
          id: 1,
          title: 'Discovery & scoping',
          status: 'Completed',
          progress: 100,
          people: 'Bilal Rauf, Rehan Naqvi',
          start: '20 May 2026',
          end: '2 Jun 2026',
          deliverables: ['Requirement doc', 'Scope document', 'Client approval'],
          comments: 3,
        },
        {
          id: 2,
          title: 'UI/UX designing',
          status: 'Completed',
          progress: 100,
          people: 'Sara Kareem',
          start: '3 Jun 2026',
          end: '5 Jul 2026',
          deliverables: ['Wireframes', 'UI mockups', 'Design system'],
          comments: 5,
        },
        {
          id: 3,
          title: 'Frontend development',
          status: 'In Progress',
          progress: 30,
          people: 'Hamza Jamali, Faisal Khalid',
          start: '12 Mar 2026',
          end: '15 May 2026',
          deliverables: ['Home page', 'Login/Sign up'],
          comments: 4,
          // Sub-tasks shown on the milestone details page
          tasks: [
            { id: 1, title: 'Home page', description: 'Main landing page for the portal', status: 'Completed', progress: 100, start: '12 Mar 2026', end: '25 Mar 2026', assignee: 'Abdul Rehman' },
            { id: 2, title: 'Login page', description: 'User login with validation', status: 'Completed', progress: 100, start: '16 Mar 2026', end: '28 Mar 2026', assignee: 'Hassan Ali' },
            { id: 3, title: 'Signup page', description: 'User registration and verification', status: 'Completed', progress: 100, start: '20 Mar 2026', end: '2 Apr 2026', assignee: 'Usman Khan' },
            { id: 4, title: 'Dashboard (Main)', description: 'Overview dashboard for users', status: 'In Progress', progress: 40, start: '26 Mar 2026', end: '20 Apr 2026', assignee: 'Sara Afzal' },
            { id: 5, title: 'Project listing page', description: 'List all projects with filters', status: 'Pending', progress: 0, start: '5 Apr 2026', end: '18 Apr 2026', assignee: 'Bilal Ahmed' },
            { id: 6, title: 'Project details page', description: 'Detailed view of a project', status: 'Pending', progress: 0, start: '10 Apr 2026', end: '25 Apr 2026', assignee: 'Hamza Jamali' },
            { id: 7, title: 'Settings page', description: 'User profile and preferences', status: 'Pending', progress: 0, start: '20 Apr 2026', end: '30 Apr 2026', assignee: 'Faisal Khalid' },
            { id: 8, title: 'Notifications page', description: 'Manage user notifications', status: 'On Hold', progress: 0, start: '15 Apr 2026', end: '29 Apr 2026', assignee: 'Ali Raza' },
          ],
          commentsThread: [
            { author: 'Faisal Khalid', time: '2 May 2026, 10:30 AM', text: 'Dashboard UI is 40% complete. Charts integration is in progress.' },
          ],
        },
        {
          id: 4,
          title: 'API integration',
          status: 'Pending',
          progress: 0,
          people: 'Hamza Jamali, Faisal Khalid',
          start: '16 May 2026',
          end: '20 Jun 2026',
          deliverables: ['API connections', 'Data mapping', 'Integration tests'],
          comments: 0,
        },
        {
          id: 5,
          title: 'Backend development',
          status: 'Pending',
          progress: 0,
          people: 'Hamza Jamali, Faisal Khalid',
          start: '21 Jun 2026',
          end: '25 Jul 2026',
          deliverables: ['Database setup', 'Core logic', 'Admin APIs'],
          comments: 0,
        },
        {
          id: 6,
          title: 'Testing',
          status: 'Pending',
          progress: 0,
          people: 'Hamza Jamali, Faisal Khalid',
          start: '26 Jul 2026',
          end: '7 Aug 2026',
          deliverables: ['Test cases', 'Bug fixing', 'UAT'],
          comments: 0,
        },
      ],
    },
    {
      id: 2,
      title: 'Marketing Site Refresh',
      subtitle: 'Public landing page & brand refresh',
      description:
        "A complete refresh of the company's public-facing marketing website. The project includes a new brand identity, responsive landing pages, SEO optimization, and integration with the company's CMS.",
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
      submittedTasks: [],
      milestones: [],
    },
    {
      id: 3,
      title: 'TN - HRMS',
      subtitle: 'Unified HR & project management system',
      description:
        'TN-HRMS is a comprehensive human resource management system that streamlines employee onboarding, leave tracking, attendance management, and performance reviews.',
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
      submittedTasks: [],
      milestones: [],
    },
  ];

  const handleViewProject = (projectId) => {
    const project = projects.find((p) => p.id === projectId);
    setSelectedProject(project);
    setActiveTab('Overview');
    setSelectedMilestone(null);
  };

  const handleBackToProjects = () => {
    setSelectedProject(null);
    setActiveTab('Overview');
    setSelectedMilestone(null);
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

  const toggleSeniorInput = () => setShowSeniorInput(!showSeniorInput);
  const toggleTeamInput = () => setShowTeamInput(!showTeamInput);

  const openViewWork = (task) => setViewWorkTask(task);
  const closeViewWork = () => setViewWorkTask(null);

  const openMilestone = (milestone) => {
    if (!milestone.tasks) return; // only milestones with details drill down
    setSelectedMilestone(milestone);
    setActiveTab('Milestones');
  };

  const closeMilestoneDetails = () => setSelectedMilestone(null);

  const handlePostComment = () => {
    if (!milestoneComment.trim() || !selectedMilestone) return;
    setSelectedMilestone((prev) => ({
      ...prev,
      commentsThread: [
        ...(prev.commentsThread || []),
        { author: 'You', time: 'Just now', text: milestoneComment },
      ],
    }));
    setMilestoneComment('');
  };

  const activeProjects = projects.filter((p) => p.status === 'Active');
  const completedProjects = projects.filter((p) => p.status === 'Completed');

  const cardStyle = {
    background: colors.cardBg,
    border: `1px solid ${colors.border}`,
    borderRadius: '16px',
    padding: '20px 22px',
    boxShadow: cardShadow,
  };

  const statusPillStyle = (status) => {
    const map = {
      Completed: { bg: '#DDF3E6', color: '#1FA25A' },
      'In Progress': { bg: '#E4EEFC', color: '#2563AE' },
      Pending: { bg: '#EEF0F2', color: '#6B7280' },
      'On Hold': { bg: '#FDF1DE', color: '#B7791F' },
    };
    const s = map[status] || map.Pending;
    return {
      display: 'inline-block',
      background: s.bg,
      color: s.color,
      fontWeight: 600,
      padding: '3px 12px',
      borderRadius: '12px',
      fontSize: '11.5px',
    };
  };

  const progressBarColor = (status) => {
    if (status === 'Completed') return '#1FA25A';
    if (status === 'In Progress') return colors.primary;
    if (status === 'On Hold') return '#E0A63C';
    return '#D9DEE2';
  };

  // ─── DETAIL VIEW ──────────────────────────────────────────────────────
  if (selectedProject) {
    const tabs = ['Overview', 'Tasks submitted', 'Milestones'];
    const isOnTrack = selectedProject.status === 'Active';

    return (
      <FDLayout>
        <FDPageLayout title="Projects">
          {/* Back Button */}
          <div style={{ marginBottom: '16px' }}>
            <button
              onClick={selectedMilestone ? closeMilestoneDetails : handleBackToProjects}
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
              {selectedMilestone ? 'Back to Projects' : 'Back to Projects'}
            </button>
          </div>

          {/* Title, subtitle & Tabs */}
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 700, color: colors.textDark, margin: '0 0 4px 0' }}>
              {selectedMilestone ? selectedMilestone.title : selectedProject.title}
            </h2>
            <p style={{ fontSize: '14px', color: colors.textGray, margin: 0 }}>
              {selectedMilestone ? 'Milestone details' : selectedProject.subtitle}
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              gap: 'clamp(20px, 2vw, 32px)',
              borderBottom: `1px solid ${colors.border}`,
              marginBottom: '24px',
              overflowX: 'auto',
              flexWrap: 'nowrap',
            }}
          >
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setSelectedMilestone(null);
                }}
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
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '20px',
                alignItems: 'start',
              }}
            >
              {/* LEFT COLUMN: Description + Message seniors */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={cardStyle}>
                  <h3 style={{ fontSize: '16px', fontWeight: 600, color: colors.textDark, margin: '0 0 10px 0' }}>Description</h3>
                  <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.textGray, margin: '0 0 16px 0' }}>
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

                <div style={cardStyle}>
                  <h3 style={{ fontSize: '16px', fontWeight: 600, color: colors.textDark, margin: '0 0 12px 0' }}>Message seniors</h3>
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
                        <div
                          style={{
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
                          }}
                        >
                          {senior.initials}
                        </div>
                        <span style={{ fontSize: '13px', fontWeight: 500, color: colors.textDark, flex: 1 }}>{senior.name}</span>
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
                            onMouseEnter={(e) => (e.target.style.background = colors.primaryDark)}
                            onMouseLeave={(e) => (e.target.style.background = colors.primary)}
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
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: colors.textDark, margin: '0 0 14px 0' }}>Team</h3>
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
                      <div
                        style={{
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
                        }}
                      >
                        {member.initials}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '13.5px', fontWeight: 600, color: colors.textDark }}>{member.name}</div>
                        <div style={{ fontSize: '12px', color: colors.textGray }}>{member.role}</div>
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
                        onMouseEnter={(e) => (e.target.style.background = colors.primaryDark)}
                        onMouseLeave={(e) => (e.target.style.background = colors.primary)}
                      >
                        Send
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* ─── TAB: Tasks submitted ───────────────────────────── */}
          {activeTab === 'Tasks submitted' && (
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
                .fd-tasks-scroll::-webkit-scrollbar { width: 10px; }
                .fd-tasks-scroll::-webkit-scrollbar-track { background: ${colors.bg}; border-radius: 8px; }
                .fd-tasks-scroll::-webkit-scrollbar-thumb { background: ${colors.primary}; border-radius: 8px; }
                .fd-tasks-scroll::-webkit-scrollbar-thumb:hover { background: ${colors.primaryDark}; }
              `}</style>
              {selectedProject.submittedTasks && selectedProject.submittedTasks.length > 0 ? (
                selectedProject.submittedTasks.map((task, index) => {
                  const isLast = index === selectedProject.submittedTasks.length - 1;
                  return (
                    <div key={task.id} style={{ padding: '22px 0', borderBottom: isLast ? 'none' : '1px solid #E8ECEE' }}>
                      <h3 style={{ fontSize: '16px', fontWeight: 700, color: colors.textDark, margin: '0 0 10px 0' }}>{task.title}</h3>
                      <span
                        style={{
                          display: 'inline-block',
                          background: '#E4EEFC',
                          color: '#2563AE',
                          fontWeight: 500,
                          padding: '4px 12px',
                          borderRadius: '8px',
                          fontSize: '12px',
                          marginBottom: '14px',
                        }}
                      >
                        Submitted by {task.submittedBy}
                      </span>
                      <div>
                        <button
                          onClick={() => openViewWork(task)}
                          style={{
                            padding: '10px 20px',
                            background: '#fff',
                            color: colors.textDark,
                            border: '1px solid #D9DEE2',
                            borderRadius: '8px',
                            fontSize: '13px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            fontFamily: "'Poppins', sans-serif",
                          }}
                        >
                          View work
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div style={{ padding: '40px 20px', textAlign: 'center', color: colors.textMuted }}>
                  <i className="fas fa-tasks" style={{ fontSize: '36px', display: 'block', marginBottom: '12px', color: colors.primary }} />
                  <h3 style={{ fontSize: '16px', fontWeight: 600, color: colors.textDark, margin: 0 }}>No work submitted yet</h3>
                  <p style={{ fontSize: '14px', margin: '6px 0 0 0' }}>Submitted tasks for this project will appear here.</p>
                </div>
              )}
            </div>
          )}

          {/* ─── TAB: Milestones (list or drill-down details) ─── */}
          {activeTab === 'Milestones' && !selectedMilestone && (
            <div style={{ ...cardStyle, padding: '0', overflowX: 'auto' }}>
              {selectedProject.milestones && selectedProject.milestones.length > 0 ? (
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '900px' }}>
                  <thead>
                    <tr style={{ borderBottom: `1px solid #E8ECEE` }}>
                      {['Milestone', 'Status & Progress', 'Schedule', 'Deliverables', 'Comments'].map((h) => (
                        <th
                          key={h}
                          style={{
                            textAlign: 'left',
                            padding: '16px 20px',
                            fontSize: '12.5px',
                            fontWeight: 700,
                            color: colors.primary,
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {selectedProject.milestones.map((m) => (
                      <tr
                        key={m.id}
                        onClick={() => openMilestone(m)}
                        style={{
                          borderBottom: '1px solid #E8ECEE',
                          cursor: m.tasks ? 'pointer' : 'default',
                          background: m.status === 'In Progress' ? colors.primaryLight : 'transparent',
                        }}
                      >
                        <td style={{ padding: '16px 20px', verticalAlign: 'top' }}>
                          <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                            <div
                              style={{
                                width: '22px',
                                height: '22px',
                                borderRadius: '50%',
                                flexShrink: 0,
                                marginTop: '2px',
                                background: m.progress === 100 ? colors.primary : m.status === 'In Progress' ? colors.primary : '#D9DEE2',
                                color: '#fff',
                                fontSize: '11px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              {m.progress === 100 ? <i className="fas fa-check" /> : null}
                            </div>
                            <div>
                              <div style={{ fontSize: '14px', fontWeight: 700, color: colors.textDark }}>{m.title}</div>
                              <div style={{ fontSize: '12px', color: colors.textGray }}>{m.status === 'In Progress' ? 'In progress' : m.status}</div>
                              <div style={{ fontSize: '12px', color: colors.textGray }}>{m.people}</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '16px 20px', verticalAlign: 'top', minWidth: '160px' }}>
                          <span style={statusPillStyle(m.status)}>{m.status}</span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                            <div style={{ flex: 1, height: '6px', background: '#E8ECEE', borderRadius: '4px', overflow: 'hidden' }}>
                              <div style={{ width: `${m.progress}%`, height: '100%', background: progressBarColor(m.status) }} />
                            </div>
                            <span style={{ fontSize: '12px', color: colors.textGray, fontWeight: 600 }}>{m.progress}%</span>
                          </div>
                        </td>
                        <td style={{ padding: '16px 20px', verticalAlign: 'top', fontSize: '12.5px', color: colors.textGray }}>
                          <div>Start: {m.start}</div>
                          <div>End: {m.end}</div>
                        </td>
                        <td style={{ padding: '16px 20px', verticalAlign: 'top', fontSize: '12.5px', color: colors.textGray }}>
                          <ul style={{ margin: 0, paddingLeft: '16px' }}>
                            {m.deliverables.map((d, i) => (
                              <li key={i}>{d}</li>
                            ))}
                          </ul>
                        </td>
                        <td style={{ padding: '16px 20px', verticalAlign: 'top', fontSize: '12.5px', color: colors.textGray }}>
                          <i className="far fa-comment" /> {m.comments}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div style={{ padding: '40px 20px', textAlign: 'center', color: colors.textMuted }}>
                  <i className="fas fa-flag-checkered" style={{ fontSize: '36px', display: 'block', marginBottom: '12px', color: colors.primary }} />
                  <h3 style={{ fontSize: '16px', fontWeight: 600, color: colors.textDark, margin: 0 }}>No milestones yet</h3>
                  <p style={{ fontSize: '14px', margin: '6px 0 0 0' }}>Milestones for this project will appear here.</p>
                </div>
              )}
            </div>
          )}

          {/* ─── Milestone details drill-down ───────────────────── */}
          {activeTab === 'Milestones' && selectedMilestone && (
            <>
              <div style={{ ...cardStyle, padding: '0', overflowX: 'auto', marginBottom: '20px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '900px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #E8ECEE' }}>
                      {['Task', 'Status', 'Completion', 'Start Date', 'End Date', 'Assignee'].map((h) => (
                        <th key={h} style={{ textAlign: 'left', padding: '14px 20px', fontSize: '12.5px', fontWeight: 700, color: colors.textDark }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {selectedMilestone.tasks.map((t) => (
                      <tr
                        key={t.id}
                        style={{
                          borderBottom: '1px solid #E8ECEE',
                          background: t.status === 'On Hold' ? '#FDF6E9' : 'transparent',
                        }}
                      >
                        <td style={{ padding: '14px 20px', verticalAlign: 'top' }}>
                          <div style={{ fontSize: '13.5px', fontWeight: 700, color: colors.textDark }}>{t.title}</div>
                          <div style={{ fontSize: '12px', color: colors.textGray }}>{t.description}</div>
                        </td>
                        <td style={{ padding: '14px 20px', verticalAlign: 'top' }}>
                          <span style={statusPillStyle(t.status)}>{t.status}</span>
                        </td>
                        <td style={{ padding: '14px 20px', verticalAlign: 'top', minWidth: '150px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ flex: 1, height: '6px', background: '#E8ECEE', borderRadius: '4px', overflow: 'hidden' }}>
                              <div style={{ width: `${t.progress}%`, height: '100%', background: progressBarColor(t.status) }} />
                            </div>
                            <span style={{ fontSize: '12px', color: colors.textGray, fontWeight: 600 }}>{t.progress}%</span>
                          </div>
                        </td>
                        <td style={{ padding: '14px 20px', verticalAlign: 'top', fontSize: '12.5px', color: colors.textGray }}>{t.start}</td>
                        <td style={{ padding: '14px 20px', verticalAlign: 'top', fontSize: '12.5px', color: colors.textGray }}>{t.end}</td>
                        <td style={{ padding: '14px 20px', verticalAlign: 'top', fontSize: '12.5px', color: colors.textDark, fontWeight: 500 }}>
                          {t.assignee}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Comments */}
              <div style={cardStyle}>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: colors.textDark, margin: '0 0 12px 0' }}>Comments</h3>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
                  <input
                    type="text"
                    value={milestoneComment}
                    onChange={(e) => setMilestoneComment(e.target.value)}
                    placeholder="Write a comment..."
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handlePostComment();
                      }
                    }}
                    style={{
                      flex: 1,
                      padding: '10px 16px',
                      border: '1px solid #D9DEE2',
                      borderRadius: '10px',
                      fontSize: '13px',
                      outline: 'none',
                      fontFamily: "'Poppins', sans-serif",
                      color: colors.textDark,
                    }}
                  />
                  <button
                    onClick={handlePostComment}
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
                    }}
                  >
                    Post
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {(selectedMilestone.commentsThread || []).map((c, idx) => (
                    <div key={idx}>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: colors.textDark }}>
                        {c.author} <span style={{ fontWeight: 400, color: colors.textMuted, fontSize: '12px' }}>{c.time}</span>
                      </div>
                      <div style={{ fontSize: '13px', color: colors.textGray, marginTop: '2px' }}>{c.text}</div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ─── View Work Modal (read-only) ────────────────────── */}
          {viewWorkTask && (
            <div
              onClick={closeViewWork}
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
                  maxWidth: '420px',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.18)',
                  position: 'relative',
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                <button
                  onClick={closeViewWork}
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

                <h3 style={{ fontSize: '20px', fontWeight: 700, color: colors.textDark, margin: '0 0 20px 0' }}>View work</h3>

                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: colors.textDark, marginBottom: '8px' }}>
                  Link
                </label>
                <div
                  style={{
                    padding: '11px 14px',
                    border: '1px solid #D9DEE2',
                    borderRadius: '10px',
                    fontSize: '13px',
                    color: colors.primary,
                    marginBottom: '20px',
                    wordBreak: 'break-all',
                  }}
                >
                  {viewWorkTask.link}
                </div>

                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: colors.textDark, marginBottom: '8px' }}>
                  Upload your work
                </label>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '8px',
                    padding: '14px 16px',
                    border: '1px solid #D9DEE2',
                    borderRadius: '10px',
                    background: colors.bg,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <i className="far fa-file" style={{ color: colors.textMuted }} />
                    <span style={{ fontSize: '13.5px', fontWeight: 600, color: colors.textDark }}>{viewWorkTask.fileName}</span>
                  </div>
                  <i className="fas fa-file-upload" style={{ color: colors.textMuted }} />
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
    <div
      style={{
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
        <h3 style={{ fontSize: '15px', fontWeight: 700, color: colors.textDark, margin: '0 0 2px 0' }}>{project.title}</h3>
        <p style={{ fontSize: '12px', color: colors.textGray, margin: 0 }}>{project.subtitle}</p>
      </div>

      <div style={{ borderTop: `1px solid ${colors.border}`, marginBottom: '12px' }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
        {project.team.slice(0, 4).map((member, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: colors.textDark }}>
            <div
              style={{
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
              }}
            >
              {member.initials}
            </div>
            <span style={{ fontWeight: 600 }}>{member.name}</span>
            <span style={{ color: colors.textGray, fontSize: '12px' }}>· {member.role}</span>
          </div>
        ))}
        {project.team.length > 4 && (
          <div style={{ fontSize: '11px', color: colors.textMuted, paddingLeft: '28px' }}>+{project.team.length - 4} more</div>
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

  const sectionTitleStyle = { fontSize: '18px', fontWeight: 700, color: colors.textDark, margin: '0 0 10px 0' };
  const sectionDividerStyle = { borderTop: `1px solid ${colors.border}`, marginBottom: '20px' };
  const gridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 340px))', gap: '20px' };

  return (
    <FDLayout>
      <FDPageLayout title="Projects">
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
            <p style={{ fontSize: '13px', color: colors.textMuted, textAlign: 'center', padding: '20px 0' }}>No active projects.</p>
          )}
        </div>

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
            <p style={{ fontSize: '13px', color: colors.textMuted, textAlign: 'center', padding: '20px 0' }}>No completed projects.</p>
          )}
        </div>
      </FDPageLayout>
    </FDLayout>
  );
}