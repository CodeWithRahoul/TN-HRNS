import { useState, useRef, useEffect } from 'react';
import CEOLayout from '@/components/CEOLayout';
import CEOPageLayout from '@/components/CEOPageLayout';

export default function CEOInternalCommunication() {
  const [activeTab, setActiveTab] = useState('groupChats'); // 'seniors' | 'groupChats' | 'teamMembers'
  const [searchQuery, setSearchQuery] = useState('');
  const [messageText, setMessageText] = useState('');
  const [activeConversationId, setActiveConversationId] = useState('group-nexovate');
  const [expandedProjects, setExpandedProjects] = useState({ nexovate: true, tnhrms: false, bonappetit: false });
  const messagesEndRef = useRef(null);

  const colors = {
    primary: '#00A19A',
    primaryDark: '#008a84',
    primaryLight: '#DCEFEE',
    border: '#000000',
    textDark: '#1A1A1A',
    textGray: '#666666',
    textMuted: '#8a8f98',
    bg: '#F4FBFB',
    cardBg: '#FFFFFF',
    bubbleIn: '#f1f3f5',
    headerBg: '#C7CBCC',
    pillBg: '#E7E9EA',
  };

  const genericMessages = [
    { id: 1, from: 'them', text: "I've followed the layout, colors, typography, and spacing from Figma. There are a few small differences because of responsiveness.", time: '8:00 AM', fromMe: false },
    { id: 2, from: 'me', text: 'That\'s fine. Are there any blockers at the moment?', time: '8:30 AM', fromMe: true },
    { id: 3, from: 'them', text: "I'm waiting for the final API endpoints for the user data and project details. For now, I'm using dummy data.", time: '9:00 AM', fromMe: false },
    { id: 4, from: 'me', text: 'Okay. The backend team could provide those soon. Can you make sure the frontend is ready?', time: '9:30 AM', fromMe: true },
  ];

  // ─── Seniors ────────────────────────────────────────────────────────
  const seniors = [
    { id: 'senior-ceo', initials: 'CEO', color: '#0F766E', name: 'CEO', subtitle: '' },
    { id: 'senior-hr', initials: 'HR', color: '#A0522D', name: 'HR', subtitle: '' },
  ];

  // ─── Group Chats ────────────────────────────────────────────────────
  const groupChats = [
    { id: 'group-nexovate', initials: 'N', color: '#3F3DA0', name: 'Nexovate', members: 5, subtitle: '' },
    { id: 'group-tnhrms', initials: 'T', color: '#2B6FC0', name: 'TN-HRMS', members: 6, subtitle: '' },
  ];

  // ─── Team Members (grouped by project) ─────────────────────────────
  const projectGroups = [
    {
      projectId: 'nexovate',
      projectName: 'Nexovate',
      projectLabel: 'Portal',
      avatarInitials: 'N',
      avatarColor: '#3F3DA0',
      members: [
        { id: 'member-ba', initials: 'BA', color: '#3F3DA0', name: 'Bilal ahmed', role: 'Project manager' },
        { id: 'member-tr', initials: 'TR', color: '#2B6FC0', name: 'Tehreem raja', role: 'Backend dev' },
        { id: 'member-ar', initials: 'AR', color: '#2FBF71', name: 'Abdul rehman', role: 'Team lead' },
        { id: 'member-sk', initials: 'SK', color: '#E8483E', name: 'Sara kareem', role: 'UI/UX designer' },
      ],
    },
    {
      projectId: 'tnhrms',
      projectName: 'TN-HRMS',
      projectLabel: 'Portal',
      avatarInitials: 'T',
      avatarColor: '#2B6FC0',
      members: [
        { id: 'member-tnhrms-ba', initials: 'BA', color: '#3F3DA0', name: 'Bilal ahmed', role: 'Project manager' },
        { id: 'member-tnhrms-sk', initials: 'SK', color: '#E8483E', name: 'Sara kareem', role: 'UI/UX designer' },
      ],
    },
    {
      projectId: 'bonappetit',
      projectName: 'Bon appetit',
      projectLabel: 'Web application',
      avatarInitials: 'B',
      avatarColor: '#2FBF71',
      members: [
        { id: 'member-bon-ba', initials: 'BA', color: '#3F3DA0', name: 'Bilal ahmed', role: 'Project manager' },
      ],
    },
  ];

  // ─── Build a flat lookup of every conversation (avatar/name/subtitle/messages) ─
  const [messagesById, setMessagesById] = useState(() => {
    const map = {};
    seniors.forEach((s) => { map[s.id] = genericMessages.map((m) => ({ ...m })); });
    groupChats.forEach((g) => { map[g.id] = genericMessages.map((m) => ({ ...m })); });
    projectGroups.forEach((p) => {
      p.members.forEach((m) => { map[m.id] = genericMessages.map((mm) => ({ ...mm })); });
    });
    return map;
  });

  const conversationMeta = {};
  seniors.forEach((s) => { conversationMeta[s.id] = { title: s.name, subtitle: '', initials: s.initials, color: s.color }; });
  groupChats.forEach((g) => { conversationMeta[g.id] = { title: g.name, subtitle: '', initials: g.initials, color: g.color }; });
  projectGroups.forEach((p) => {
    p.members.forEach((m) => {
      conversationMeta[m.id] = { title: p.projectName, subtitle: `${m.name} . ${m.role}`, initials: m.initials, color: m.color };
    });
  });

  const activeMeta = conversationMeta[activeConversationId] || conversationMeta['group-nexovate'];
  const activeMessages = messagesById[activeConversationId] || [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversationId, activeMessages.length]);

  const handleSend = () => {
    if (!messageText.trim()) return;
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const time = `${hours}:${minutes} ${ampm}`;

    setMessagesById((prev) => ({
      ...prev,
      [activeConversationId]: [
        ...(prev[activeConversationId] || []),
        { id: (prev[activeConversationId]?.length || 0) + 1, from: 'me', fromMe: true, text: messageText, time },
      ],
    }));
    setMessageText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleProject = (projectId) => {
    setExpandedProjects((prev) => ({ ...prev, [projectId]: !prev[projectId] }));
  };

  const tabPill = (label, key) => {
    const isActive = activeTab === key;
    return (
      <button
        key={key}
        onClick={() => setActiveTab(key)}
        style={{
          background: isActive ? colors.primary : colors.pillBg,
          color: isActive ? '#fff' : colors.textDark,
          border: 'none',
          borderRadius: '16px',
          padding: '6px 14px',
          fontSize: '12px',
          fontWeight: 600,
          cursor: 'pointer',
          fontFamily: "'Poppins', sans-serif",
          whiteSpace: 'nowrap',
          transition: 'all 0.15s',
        }}
      >
        {label}
      </button>
    );
  };

  const rowStyle = (isActive) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '8px 10px',
    borderRadius: '8px',
    cursor: 'pointer',
    background: isActive ? colors.primaryLight : 'transparent',
    marginBottom: '4px',
    transition: 'background 0.15s',
  });

  const avatarCircle = (initials, color, size = 32, fontSize = 12) => (
    <div style={{
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: '50%',
      background: color,
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: `${fontSize}px`,
      fontWeight: 700,
      flexShrink: 0,
    }}>
      {initials}
    </div>
  );

  return (
    <CEOLayout>
      <CEOPageLayout title="Internal communication">
        <div style={{ fontFamily: "'Poppins', sans-serif" }}>
          {/* ─── Main Content ──────────────────────────────────────── */}
          <div style={{
            display: 'flex',
            gap: '20px',
            flexWrap: 'wrap',
            alignItems: 'stretch',
          }}>
            {/* ─── Left Panel ────────────────────────────────────── */}
            <div style={{
              flex: '0 0 300px',
              background: colors.cardBg,
              border: `1px solid ${colors.border}`,
              borderRadius: '16px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              padding: '16px',
              maxHeight: '600px',
              minHeight: '460px',
              overflowY: 'auto',
              minWidth: '260px',
            }}>
              {/* Search conversation */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                border: `1px solid ${colors.border}`,
                borderRadius: '10px',
                padding: '2px 4px',
                marginBottom: '14px',
              }}>
                <i className="fas fa-search" style={{ color: colors.textMuted, fontSize: '13px', paddingLeft: '10px' }} />
                <input
                  type="text"
                  placeholder="Search conversation"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    flex: 1,
                    border: 'none',
                    outline: 'none',
                    padding: '9px 10px',
                    fontSize: '13px',
                    fontFamily: "'Poppins', sans-serif",
                    color: colors.textDark,
                    background: 'transparent',
                  }}
                />
              </div>

              {/* Tabs */}
              <div style={{
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap',
                marginBottom: '16px',
              }}>
                {tabPill('Seniors', 'seniors')}
                {tabPill('Projects group chats', 'groupChats')}
                {tabPill('Projects team members', 'teamMembers')}
              </div>

              {/* SENIORS */}
              {activeTab === 'seniors' && (
                <div>
                  <div style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: colors.textDark,
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                    paddingBottom: '8px',
                    borderBottom: `1px solid ${colors.border}`,
                    marginBottom: '10px',
                  }}>
                    Seniors
                  </div>
                  {seniors.map((s) => (
                    <div
                      key={s.id}
                      onClick={() => setActiveConversationId(s.id)}
                      style={rowStyle(activeConversationId === s.id)}
                    >
                      {avatarCircle(s.initials, s.color)}
                      <span style={{ fontSize: '13.5px', fontWeight: 600, color: colors.textDark }}>{s.name}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* PROJECTS GROUP CHATS */}
              {activeTab === 'groupChats' && (
                <div>
                  <div style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: colors.textDark,
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                    paddingBottom: '8px',
                    borderBottom: `1px solid ${colors.border}`,
                    marginBottom: '10px',
                  }}>
                    Projects group chats
                  </div>
                  {groupChats.map((g) => (
                    <div
                      key={g.id}
                      onClick={() => setActiveConversationId(g.id)}
                      style={rowStyle(activeConversationId === g.id)}
                    >
                      {avatarCircle(g.initials, g.color)}
                      <div>
                        <div style={{ fontSize: '13.5px', fontWeight: 600, color: colors.textDark }}>{g.name}</div>
                        <div style={{ fontSize: '11.5px', color: colors.textMuted }}>{g.members} members</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* PROJECTS TEAM MEMBERS */}
              {activeTab === 'teamMembers' && (
                <div>
                  <div style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: colors.textDark,
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                    paddingBottom: '8px',
                    borderBottom: `1px solid ${colors.border}`,
                    marginBottom: '10px',
                  }}>
                    Projects team members
                  </div>
                  {projectGroups.map((p) => {
                    const isExpanded = !!expandedProjects[p.projectId];
                    return (
                      <div key={p.projectId} style={{ marginBottom: '6px' }}>
                        <div
                          onClick={() => toggleProject(p.projectId)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '8px 10px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            background: colors.bg,
                          }}
                        >
                          {avatarCircle(p.avatarInitials, p.avatarColor)}
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '13.5px', fontWeight: 600, color: colors.textDark }}>{p.projectName}</div>
                            <div style={{ fontSize: '11.5px', color: colors.textMuted }}>{p.projectLabel}</div>
                          </div>
                          <i className={`fas fa-chevron-${isExpanded ? 'up' : 'down'}`} style={{ fontSize: '11px', color: colors.textMuted }} />
                        </div>
                        {isExpanded && (
                          <div style={{ marginTop: '2px' }}>
                            {p.members.map((m) => (
                              <div
                                key={m.id}
                                onClick={() => setActiveConversationId(m.id)}
                                style={{
                                  ...rowStyle(activeConversationId === m.id),
                                  paddingLeft: '18px',
                                }}
                              >
                                {avatarCircle(m.initials, m.color, 28, 10.5)}
                                <div>
                                  <div style={{ fontSize: '13px', fontWeight: 600, color: colors.textDark }}>{p.projectName}</div>
                                  <div style={{ fontSize: '11.5px', color: colors.textMuted }}>{m.name} . {m.role}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* ─── Chat Window ────────────────────────────────────── */}
            <div style={{
              flex: 1,
              minWidth: '320px',
              background: colors.cardBg,
              border: `1px solid ${colors.border}`,
              borderRadius: '16px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              display: 'flex',
              flexDirection: 'column',
              maxHeight: '600px',
              overflow: 'hidden',
            }}>
              {/* Chat header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '16px 20px',
                background: colors.headerBg,
                borderBottom: `1px solid ${colors.border}`,
              }}>
                {avatarCircle(activeMeta.initials, activeMeta.color, 36, 12)}
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: colors.textDark }}>
                    {activeMeta.title}
                  </div>
                  {activeMeta.subtitle && (
                    <div style={{ fontSize: '12px', color: colors.textGray }}>
                      {activeMeta.subtitle}
                    </div>
                  )}
                </div>
              </div>

              {/* Messages */}
              <div style={{
                flex: 1,
                overflowY: 'auto',
                padding: '18px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                background: '#fbfdfd',
              }}>
                {activeMessages.map((msg) => (
                  <div
                    key={msg.id}
                    style={{
                      display: 'flex',
                      justifyContent: msg.fromMe ? 'flex-end' : 'flex-start',
                      alignItems: 'flex-end',
                      gap: '8px',
                    }}
                  >
                    {!msg.fromMe && avatarCircle(activeMeta.initials, activeMeta.color, 26, 9.5)}
                    <div style={{ maxWidth: '78%' }}>
                      <div style={{
                        background: msg.fromMe ? colors.primary : '#fff',
                        color: msg.fromMe ? '#fff' : colors.textDark,
                        border: msg.fromMe ? 'none' : `1px solid #E4E7E8`,
                        padding: '10px 14px',
                        borderRadius: msg.fromMe ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                        fontSize: '13.5px',
                        lineHeight: '1.5',
                      }}>
                        {msg.text}
                      </div>
                      <div style={{
                        fontSize: '10.5px',
                        color: colors.textMuted,
                        marginTop: '4px',
                        textAlign: msg.fromMe ? 'right' : 'left',
                      }}>
                        {msg.time}
                      </div>
                    </div>
                    {msg.fromMe && avatarCircle('CEO', colors.primary, 26, 9.5)}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 16px',
                borderTop: `1px solid ${colors.border}`,
              }}>
                <button
                  aria-label="Attach file"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: colors.textDark,
                    fontSize: '16px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '6px',
                  }}
                >
                  <i className="fas fa-paperclip" />
                </button>
                <div style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  border: `1px solid ${colors.border}`,
                  borderRadius: '24px',
                  padding: '0 16px',
                }}>
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    style={{
                      flex: 1,
                      border: 'none',
                      outline: 'none',
                      padding: '10px 0',
                      fontSize: '13.5px',
                      fontFamily: "'Poppins', sans-serif",
                      color: colors.textDark,
                      background: 'transparent',
                    }}
                  />
                  <i className="far fa-smile" style={{ color: colors.textMuted, fontSize: '15px' }} />
                </div>
                <button
                  onClick={handleSend}
                  aria-label="Send message"
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: colors.primary,
                    color: '#fff',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <i className="fas fa-paper-plane" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </CEOPageLayout>
    </CEOLayout>
  );
}