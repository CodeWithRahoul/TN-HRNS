// pages/internal-communication.js
import { useState, useRef, useEffect } from 'react';
import HRLayout from '@/components/HRLayout';
import HRPageLayout from '@/components/HRPageLayout';

export default function InternalCommunication() {
  const [activeGroup, setActiveGroup] = useState('Employees');
  const [searchQuery, setSearchQuery] = useState('');
  const [messageText, setMessageText] = useState('');
  const [activeConversationId, setActiveConversationId] = useState(1);
  const messagesEndRef = useRef(null);

  const colors = {
    primary: '#007A7C',
    primaryDark: '#046466',
    border: '#e3e8ea',
    textDark: '#1A1A1A',
    textGray: '#666666',
    textMuted: '#8a8f98',
    bg: '#effbfb',
    cardBg: '#FFFFFF',
    lightTeal: '#E8F5F5',
    bubbleIn: '#f1f3f5',
  };

  const groups = ['Employees', 'Seniors', 'Interns'];

  const [conversations, setConversations] = useState([
    // ─── Employees ───────────────────────────────────────────
    {
      id: 1,
      group: 'Employees',
      name: 'Nexovate project',
      subtitle: 'Sara kareem, UI/UX designer',
      avatarInitials: 'SK',
      avatarColor: '#7c5cf0',
      time: '9:50 AM',
      messages: [
        { id: 1, from: 'them', text: 'Hi Ali, good morning! We have a new client project starting next week. Are you available to join the design team?', time: '9:00 AM' },
        { id: 2, from: 'me', text: 'Good morning! Yes, I\'m available. Could you share the project details?', time: '9:30 AM' },
        { id: 3, from: 'them', text: 'Sure, it\'s a healthcare management web application. I\'ve assigned you to the project, and the Project Manager will send the design requirements shortly.', time: '9:45 AM' },
        { id: 4, from: 'me', text: 'Great! When is the expected deadline for the first design draft?', time: '9:50 AM' },
      ],
    },
    {
      id: 2,
      group: 'Employees',
      name: 'TN-HRMS project',
      subtitle: 'Bilal ahmed, Frontend dev',
      avatarInitials: 'BA',
      avatarColor: '#2f9e5b',
      time: 'Yesterday',
      messages: [
        { id: 1, from: 'them', text: 'Hey! Can you review the pull request I sent for the HRMS dashboard?', time: 'Yesterday' },
      ],
    },
    {
      id: 3,
      group: 'Employees',
      name: 'Nexovate project',
      subtitle: 'Tehreem raja, Frontend dev',
      avatarInitials: 'TR',
      avatarColor: '#e0932c',
      time: 'Yesterday',
      messages: [
        { id: 1, from: 'them', text: 'Please check the updated wireframes when you get a chance.', time: 'Yesterday' },
      ],
    },
    {
      id: 4,
      group: 'Employees',
      name: 'Nexovate project',
      subtitle: 'Abdul rehman, Backend dev',
      avatarInitials: 'AR',
      avatarColor: '#c0392b',
      time: '30 Jun',
      messages: [
        { id: 1, from: 'them', text: 'The API endpoints for the project module are ready for testing.', time: '30 Jun' },
      ],
    },
    {
      id: 5,
      group: 'Employees',
      name: 'TN-HRMS project',
      subtitle: 'Saleem ahmed, Backend dev',
      avatarInitials: 'SA',
      avatarColor: '#2b6fc0',
      time: '15 Jun',
      messages: [
        { id: 1, from: 'them', text: 'We need to sync on the leave management module tomorrow.', time: '15 Jun' },
      ],
    },
    {
      id: 6,
      group: 'Employees',
      name: 'Nexovate project',
      subtitle: 'Sara kareem, UI/UX designer',
      avatarInitials: 'SK',
      avatarColor: '#7c5cf0',
      time: '15 Jun',
      messages: [
        { id: 1, from: 'them', text: 'Sent over the updated brand palette for the project.', time: '15 Jun' },
      ],
    },

    // ─── Seniors ─────────────────────────────────────────────
    {
      id: 7,
      group: 'Seniors',
      name: 'CEO',
      subtitle: 'Chief Executive Officer',
      avatarInitials: 'CEO',
      avatarColor: '#0f766e',
      time: '2:56 AM',
      messages: [
        { id: 1, from: 'them', text: 'Good morning, Sara! Can you give me an update of the hiring progress for the office assigned position?', time: '2:36 AM' },
        { id: 2, from: 'me', text: 'Good morning, sir! We have received 42 applications after reviewing the shortlist, we shortlisted 6 candidates for the first round.', time: '2:41 AM' },
        { id: 3, from: 'them', text: 'That\'s good progress ✅. Let me know if you need anything else from my side.', time: '2:45 AM' },
        { id: 4, from: 'me', text: 'Sure sir, I will share the interview schedule and finalize the panel members by tomorrow.', time: '2:56 AM' },
      ],
    },
    {
      id: 8,
      group: 'Seniors',
      name: 'CTO',
      subtitle: 'Chief Technology Officer',
      avatarInitials: 'CTO',
      avatarColor: '#c2660c',
      time: 'Yesterday',
      messages: [
        { id: 1, from: 'them', text: 'Can we sync this week on the new engineering headcount plan?', time: 'Yesterday' },
      ],
    },
    {
      id: 9,
      group: 'Seniors',
      name: 'CFO',
      subtitle: 'Chief Financial Officer',
      avatarInitials: 'CFO',
      avatarColor: '#2b6fc0',
      time: 'Yesterday',
      messages: [
        { id: 1, from: 'them', text: 'Please share the updated payroll budget for next quarter.', time: 'Yesterday' },
      ],
    },

    // ─── Interns ─────────────────────────────────────────────
    {
      id: 10,
      group: 'Interns',
      name: 'Onboarding batch',
      subtitle: 'Hassan ali, Intern - Design',
      avatarInitials: 'HA',
      avatarColor: '#7c5cf0',
      time: '11:20 AM',
      messages: [
        { id: 1, from: 'them', text: 'Hi! Just wanted to confirm my onboarding documents were received.', time: '11:20 AM' },
      ],
    },
    {
      id: 11,
      group: 'Interns',
      name: 'Onboarding batch',
      subtitle: 'Mahnoor sheikh, Intern - QA',
      avatarInitials: 'MS',
      avatarColor: '#2f9e5b',
      time: 'Yesterday',
      messages: [
        { id: 1, from: 'them', text: 'Could you share the internship completion certificate template?', time: 'Yesterday' },
      ],
    },
  ]);

  // First conversation id for each group, used to auto-select on tab switch
  const firstIdByGroup = groups.reduce((acc, g) => {
    const first = conversations.find((c) => c.group === g);
    acc[g] = first ? first.id : null;
    return acc;
  }, {});

  useEffect(() => {
    const targetId = firstIdByGroup[activeGroup];
    if (targetId) setActiveConversationId(targetId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeGroup]);

  const activeConversation = conversations.find((c) => c.id === activeConversationId) || conversations[0];

  const filteredConversations = conversations.filter(
    (c) =>
      c.group === activeGroup &&
      (c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.subtitle.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversationId, activeConversation?.messages?.length]);

  const handleSend = () => {
    if (!messageText.trim()) return;
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConversationId
          ? { ...c, messages: [...c.messages, { id: c.messages.length + 1, from: 'me', text: messageText, time }] }
          : c
      )
    );
    setMessageText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <HRLayout>
      <HRPageLayout title="Internal Communication">
        <div style={{ fontFamily: "'Poppins', sans-serif" }}>
          {/* ─── Top bar: title + search ─────────────────────── */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '14px',
              marginBottom: '22px',
            }}
          >
            <h1 style={{ margin: 0, fontSize: '22px', fontWeight: 700, color: colors.textDark }}>
              Internal Communication
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: colors.cardBg,
                  border: `1px solid ${colors.border}`,
                  borderRadius: '10px',
                  padding: '9px 14px',
                  minWidth: '260px',
                }}
              >
                <span style={{ color: colors.textMuted, marginRight: '8px', fontSize: '14px' }}>🔍</span>
                <input
                  type="text"
                  placeholder="Search projects, tasks, or clients..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    border: 'none',
                    outline: 'none',
                    fontSize: '13.5px',
                    color: colors.textDark,
                    width: '100%',
                    fontFamily: "'Poppins', sans-serif",
                    background: 'transparent',
                  }}
                />
                <button
                  style={{
                    background: colors.primary,
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '6px 14px',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    marginLeft: '8px',
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  Search
                </button>
              </div>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: colors.lightTeal,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                  color: colors.primary,
                }}
              >
                📶
              </div>
            </div>
          </div>

          {/* ─── Group tabs ───────────────────────────────────── */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '22px' }}>
            <div
              style={{
                display: 'inline-flex',
                background: colors.cardBg,
                border: `1px solid ${colors.border}`,
                borderRadius: '30px',
                padding: '5px',
                gap: '4px',
              }}
            >
              {groups.map((g) => (
                <span
                  key={g}
                  onClick={() => setActiveGroup(g)}
                  style={{
                    padding: '9px 26px',
                    borderRadius: '24px',
                    fontSize: '13.5px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    color: activeGroup === g ? '#fff' : colors.textGray,
                    background: activeGroup === g ? colors.primary : 'transparent',
                    transition: 'all 0.15s',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {g.toUpperCase()}
                </span>
              ))}
            </div>
          </div>

          {/* ─── Chat panels ──────────────────────────────────── */}
          <div
            style={{
              display: 'flex',
              gap: '18px',
              flexWrap: 'wrap',
              alignItems: 'stretch',
            }}
          >
            {/* Conversation list */}
            <div
              style={{
                flex: '1 1 300px',
                minWidth: '280px',
                maxWidth: '360px',
                background: colors.cardBg,
                border: `1px solid ${colors.border}`,
                borderRadius: '18px',
                boxShadow: '0 2px 10px rgba(2,10,20,0.05)',
                display: 'flex',
                flexDirection: 'column',
                maxHeight: '640px',
              }}
            >
              <div style={{ padding: '16px 16px 10px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: '#f4f6f7',
                    borderRadius: '10px',
                    padding: '9px 12px',
                  }}
                >
                  <span style={{ color: colors.textMuted, marginRight: '8px', fontSize: '13px' }}>🔍</span>
                  <input
                    type="text"
                    placeholder="Search conversation"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      border: 'none',
                      outline: 'none',
                      fontSize: '13px',
                      color: colors.textDark,
                      width: '100%',
                      background: 'transparent',
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  />
                </div>
              </div>
              <div style={{ overflowY: 'auto', flex: 1, padding: '4px 8px 12px' }}>
                {filteredConversations.map((conv) => {
                  const isActive = conv.id === activeConversationId;
                  return (
                    <div
                      key={conv.id}
                      onClick={() => setActiveConversationId(conv.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '10px 10px',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        background: isActive ? colors.lightTeal : 'transparent',
                        marginBottom: '4px',
                        transition: 'background 0.15s',
                      }}
                      onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = '#fafbfc'; }}
                      onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
                    >
                      <div
                        style={{
                          width: '38px',
                          height: '38px',
                          borderRadius: '50%',
                          background: conv.avatarColor,
                          color: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '12.5px',
                          fontWeight: 700,
                          flexShrink: 0,
                        }}
                      >
                        {conv.avatarInitials}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: '13.5px',
                            fontWeight: 600,
                            color: colors.textDark,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {conv.name}
                        </div>
                        <div
                          style={{
                            fontSize: '12px',
                            color: colors.textMuted,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {conv.subtitle}
                        </div>
                      </div>
                      <div style={{ fontSize: '11px', color: colors.textMuted, flexShrink: 0 }}>{conv.time}</div>
                    </div>
                  );
                })}
                {filteredConversations.length === 0 && (
                  <p style={{ textAlign: 'center', color: colors.textMuted, fontSize: '13px', padding: '30px 10px' }}>
                    No conversations found.
                  </p>
                )}
              </div>
            </div>

            {/* Active chat window */}
            <div
              style={{
                flex: '2 1 420px',
                minWidth: '300px',
                background: colors.cardBg,
                border: `1px solid ${colors.border}`,
                borderRadius: '18px',
                boxShadow: '0 2px 10px rgba(2,10,20,0.05)',
                display: 'flex',
                flexDirection: 'column',
                maxHeight: '640px',
              }}
            >
              {/* Chat header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '16px 18px',
                  borderTopLeftRadius: '18px',
                  borderTopRightRadius: '18px',
                  background: 'linear-gradient(135deg, #cfd9dc 0%, #b9c4c8 100%)',
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: activeConversation.avatarColor,
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12.5px',
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {activeConversation.avatarInitials}
                </div>
                <div>
                  <div style={{ fontSize: '14.5px', fontWeight: 700, color: colors.textDark }}>
                    {activeConversation.name}
                  </div>
                  <div style={{ fontSize: '12px', color: '#3a4a4d' }}>{activeConversation.subtitle}</div>
                </div>
              </div>

              {/* Messages */}
              <div
                style={{
                  flex: 1,
                  overflowY: 'auto',
                  padding: '18px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  background: '#fbfdfd',
                }}
              >
                {activeConversation.messages.map((msg) => (
                  <div
                    key={msg.id}
                    style={{
                      display: 'flex',
                      justifyContent: msg.from === 'me' ? 'flex-end' : 'flex-start',
                      alignItems: 'flex-end',
                      gap: '8px',
                    }}
                  >
                    {msg.from !== 'me' && (
                      <div
                        style={{
                          width: '26px',
                          height: '26px',
                          borderRadius: '50%',
                          background: activeConversation.avatarColor,
                          color: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '10px',
                          fontWeight: 700,
                          flexShrink: 0,
                        }}
                      >
                        {activeConversation.avatarInitials}
                      </div>
                    )}
                    <div style={{ maxWidth: '72%' }}>
                      <div
                        style={{
                          background: msg.from === 'me' ? colors.primary : colors.bubbleIn,
                          color: msg.from === 'me' ? '#fff' : colors.textDark,
                          padding: '10px 14px',
                          borderRadius: msg.from === 'me' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                          fontSize: '13.5px',
                          lineHeight: 1.5,
                        }}
                      >
                        {msg.text}
                      </div>
                      <div
                        style={{
                          fontSize: '10.5px',
                          color: colors.textMuted,
                          marginTop: '4px',
                          textAlign: msg.from === 'me' ? 'right' : 'left',
                        }}
                      >
                        {msg.time}
                      </div>
                    </div>
                    {msg.from === 'me' && (
                      <div
                        style={{
                          width: '26px',
                          height: '26px',
                          borderRadius: '50%',
                          background: colors.primary,
                          color: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '10px',
                          fontWeight: 700,
                          flexShrink: 0,
                        }}
                      >
                        HR
                      </div>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message input */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '14px 16px',
                  borderTop: `1px solid ${colors.border}`,
                }}
              >
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  style={{
                    flex: 1,
                    border: `1px solid ${colors.border}`,
                    borderRadius: '24px',
                    padding: '11px 16px',
                    fontSize: '13.5px',
                    outline: 'none',
                    fontFamily: "'Poppins', sans-serif",
                    color: colors.textDark,
                  }}
                />
                <button
                  onClick={handleSend}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: colors.primary,
                    color: '#fff',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  ➤
                </button>
              </div>
            </div>
          </div>
        </div>
      </HRPageLayout>
    </HRLayout>
  );
}