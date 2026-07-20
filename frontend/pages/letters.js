import HRLayout from '@/components/HRLayout';
import HRPageLayout from '@/components/HRPageLayout';
import { useState } from 'react';

export default function Letters() {
  const [selectedLetter, setSelectedLetter] = useState(null);

  const colors = {
    primary: '#00A19A',
    primaryLight: '#E8F5F4',
    border: '#000000',
    textDark: '#1A1A1A',
    textGray: '#666666',
    textMuted: '#8a8f98',
    bg: '#F4FBFB',
    cardBg: '#FFFFFF',
  };

  const handleSend = () => {
    alert('Message sent successfully!');
  };

  const handleGenerate = (type) => {
    setSelectedLetter(type);
    alert(`Generating ${type}...`);
  };

  // Letter types with categories
  const letterCategories = [
    {
      name: 'Recruitment',
      icon: 'fa-user-plus',
      letters: [
        { label: 'Offer letter', key: 'Offer letter' },
        { label: 'Rejection letter', key: 'Rejection letter' },
        { label: 'Internship offer letter', key: 'Internship offer letter' },
      ]
    },
    {
      name: 'Employment',
      icon: 'fa-briefcase',
      letters: [
        { label: 'Experience letter', key: 'Experience letter' },
        { label: 'Appointment letter', key: 'Appointment letter' },
        { label: 'Promotion letter', key: 'Promotion letter' },
      ]
    }
  ];

  return (
    <HRLayout>
      <HRPageLayout title="Letters">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px',
        }}>
          {/* LEFT COLUMN: Send a message */}
          <div style={{
            background: colors.cardBg,
            border: `1px solid ${colors.border}`,
            borderRadius: '16px',
            padding: '24px 28px',
          }}>
            <h2 style={{
              fontSize: '18px',
              fontWeight: 600,
              color: colors.textDark,
              margin: '0 0 20px 0',
            }}>
              Send a message
            </h2>

            <div style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: 500,
                color: colors.textGray,
                marginBottom: '4px',
              }}>
                Send to
              </label>
              <select style={{
                width: '100%',
                padding: '10px 14px',
                border: `1px solid ${colors.border}`,
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                background: '#fff',
                fontFamily: "'Poppins', sans-serif",
              }}>
                <option>Everyone</option>
                <option>HR Team</option>
                <option>IT Team</option>
                <option>Managers</option>
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
                Subject
              </label>
              <input
                type="text"
                placeholder="Subject"
                defaultValue="Office closure - Eid holiday"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  border: `1px solid ${colors.border}`,
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                  fontFamily: "'Poppins', sans-serif",
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: 500,
                color: colors.textGray,
                marginBottom: '4px',
              }}>
                Message
              </label>
              <textarea
                rows="4"
                placeholder="Message"
                defaultValue="The office will remain closed from 28 June to 30 June for the Eid holidays. Regular operations resume on 1 July."
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  border: `1px solid ${colors.border}`,
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                  resize: 'vertical',
                  fontFamily: "'Poppins', sans-serif",
                }}
              />
            </div>

            <button
              onClick={handleSend}
              style={{
                background: colors.primary,
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 24px',
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer',
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              Send
            </button>
          </div>

          {/* RIGHT COLUMN: Generate a letter - PROFESSIONAL UI */}
          <div style={{
            background: colors.cardBg,
            border: `1px solid ${colors.border}`,
            borderRadius: '16px',
            padding: '24px 28px',
          }}>
            <h2 style={{
              fontSize: '18px',
              fontWeight: 600,
              color: colors.textDark,
              margin: '0 0 20px 0',
            }}>
              Generate a letter
            </h2>

            {/* Letter Categories */}
            {letterCategories.map((category, idx) => (
              <div key={idx} style={{ marginBottom: idx < letterCategories.length - 1 ? '20px' : 0 }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '10px',
                }}>
                  <i className={`fas ${category.icon}`} style={{
                    color: colors.primary,
                    fontSize: '14px',
                  }} />
                  <h3 style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: colors.textGray,
                    margin: 0,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}>
                    {category.name}
                  </h3>
                  <div style={{
                    flex: 1,
                    height: '1px',
                    background: colors.border,
                    opacity: 0.3,
                  }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {category.letters.map((item) => (
                    <div
                      key={item.key}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '10px 14px',
                        background: colors.bg,
                        borderRadius: '8px',
                        transition: 'all 0.2s ease',
                        cursor: 'pointer',
                        border: '1px solid transparent',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = colors.primaryLight;
                        e.currentTarget.style.borderColor = colors.primary;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = colors.bg;
                        e.currentTarget.style.borderColor = 'transparent';
                      }}
                    >
                      <span style={{
                        fontSize: '14px',
                        color: colors.textDark,
                        fontWeight: 500,
                      }}>
                        {item.label}
                      </span>
                      <button
                        onClick={() => handleGenerate(item.key)}
                        style={{
                          background: colors.primary,
                          color: '#fff',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '5px 18px',
                          fontSize: '12px',
                          fontWeight: 500,
                          cursor: 'pointer',
                          fontFamily: "'Poppins', sans-serif",
                          transition: 'all 0.2s ease',
                          boxShadow: '0 2px 4px rgba(0,161,154,0.2)',
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = '#008a84';
                          e.target.style.transform = 'scale(1.02)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = colors.primary;
                          e.target.style.transform = 'scale(1)';
                        }}
                      >
                        Generate
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Quick stats / footer */}
            <div style={{
              marginTop: '20px',
              paddingTop: '16px',
              borderTop: `1px solid ${colors.border}`,
              opacity: 0.5,
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '12px',
              color: colors.textGray,
            }}>
              <span>Total templates: {letterCategories.reduce((acc, cat) => acc + cat.letters.length, 0)}</span>
              <span>Click Generate to create letter</span>
            </div>
          </div>
        </div>
      </HRPageLayout>
    </HRLayout>
  );
}