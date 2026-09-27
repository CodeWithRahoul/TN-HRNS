import HRLayout from '@/components/HRLayout';
import HRPageLayout from '@/components/HRPageLayout';
import { useState } from 'react';

export default function Letters() {
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [selectedDomain, setSelectedDomain] = useState('Everyone');
  const [selectedEmployee, setSelectedEmployee] = useState('');

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

  // Domains and their employees
  const domains = [
    {
      name: 'IT',
      employees: [
        { id: 'it-1', name: 'Abdul rehman', role: 'Backend developer' },
        { id: 'it-2', name: 'Tehreem raja', role: 'Frontend developer' },
        { id: 'it-3', name: 'Hamza khalid', role: 'DevOps engineer' },
        { id: 'it-4', name: 'Usman raza', role: 'QA engineer' },
      ],
    },
    {
      name: 'HR',
      employees: [
        { id: 'hr-1', name: 'Bilal ahmed', role: 'HR Manager' },
        { id: 'hr-2', name: 'Maryam hassan', role: 'HR Executive' },
      ],
    },
    {
      name: 'Design',
      employees: [
        { id: 'ds-1', name: 'Sara kareem', role: 'UI/UX designer' },
        { id: 'ds-2', name: 'Fatima noor', role: 'Graphic designer' },
      ],
    },
    {
      name: 'Marketing',
      employees: [
        { id: 'mk-1', name: 'Zain khan', role: 'Marketing lead' },
        { id: 'mk-2', name: 'Ayesha siddiqui', role: 'Content writer' },
      ],
    },
    {
      name: 'Finance',
      employees: [
        { id: 'fn-1', name: 'Ali saeed', role: 'Finance Manager' },
        { id: 'fn-2', name: 'Nida iqbal', role: 'Accountant' },
      ],
    },
    {
      name: 'Leadership',
      employees: [
        { id: 'ld-1', name: 'CEO', role: 'Chief Executive Officer' },
        { id: 'ld-2', name: 'CTO', role: 'Chief Technology Officer' },
        { id: 'ld-3', name: 'CFO', role: 'Chief Financial Officer' },
        { id: 'ld-4', name: 'Operations Manager', role: 'Operations' },
      ],
    },
  ];

  // When "Everyone" is selected, flatten all employees from every domain
  const allEmployees = domains.flatMap((d) =>
    d.employees.map((e) => ({ ...e, domain: d.name }))
  );

  const isEveryone = selectedDomain === 'Everyone';

  const activeDomain = domains.find((d) => d.name === selectedDomain);

  const employeesInDomain = isEveryone
    ? allEmployees
    : activeDomain
    ? activeDomain.employees.map((e) => ({ ...e, domain: activeDomain.name }))
    : [];

  const selectedEmployeeObj = employeesInDomain.find((e) => e.id === selectedEmployee);

  const handleSend = () => {
    if (isEveryone && !selectedEmployee) {
      alert('Message will be sent to everyone in the organization.');
      return;
    }
    if (!selectedEmployee) {
      alert('Please select a person to send the message to.');
      return;
    }
    alert(
      `Message sent to ${selectedEmployeeObj.name} (${selectedEmployeeObj.domain})`
    );
  };

  const handleGenerate = (type) => {
    setSelectedLetter(type);
    alert(`Generating ${type}...`);
  };

  const letterCategories = [
    {
      name: 'Recruitment',
      icon: 'fa-user-plus',
      letters: [
        { label: 'Offer letter', key: 'Offer letter' },
        { label: 'Rejection letter', key: 'Rejection letter' },
        { label: 'Internship offer letter', key: 'Internship offer letter' },
      ],
    },
    {
      name: 'Employment',
      icon: 'fa-briefcase',
      letters: [
        { label: 'Experience letter', key: 'Experience letter' },
        { label: 'Appointment letter', key: 'Appointment letter' },
        { label: 'Promotion letter', key: 'Promotion letter' },
      ],
    },
  ];

  return (
    <HRLayout>
      <HRPageLayout title="Letters">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '24px',
          }}
        >
          {/* LEFT COLUMN: Send a message */}
          <div
            style={{
              background: colors.cardBg,
              border: `1px solid ${colors.border}`,
              borderRadius: '16px',
              padding: '24px 28px',
            }}
          >
            <h2
              style={{
                fontSize: '18px',
                fontWeight: 600,
                color: colors.textDark,
                margin: '0 0 20px 0',
              }}
            >
              Send a message
            </h2>

            {/* Domain dropdown */}
            <div style={{ marginBottom: '14px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: colors.textGray,
                  marginBottom: '4px',
                }}
              >
                Domain
              </label>
              <select
                value={selectedDomain}
                onChange={(e) => {
                  setSelectedDomain(e.target.value);
                  setSelectedEmployee(''); // reset employee when domain changes
                }}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  border: `1px solid ${colors.border}`,
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                  background: '#fff',
                  fontFamily: "'Poppins', sans-serif",
                  cursor: 'pointer',
                }}
              >
                <option value="Everyone">Everyone (All domains)</option>
                {domains.map((d) => (
                  <option key={d.name} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Employee dropdown (filtered by domain or all if Everyone) */}
            <div style={{ marginBottom: '16px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: colors.textGray,
                  marginBottom: '4px',
                }}
              >
                Send to
              </label>
              <select
                value={selectedEmployee}
                onChange={(e) => setSelectedEmployee(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  border: `1px solid ${colors.border}`,
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                  background: '#fff',
                  fontFamily: "'Poppins', sans-serif",
                  cursor: 'pointer',
                }}
              >
                <option value="">
                  {isEveryone
                    ? '-- Select a person (or leave blank for All) --'
                    : '-- Select a person --'}
                </option>

                {isEveryone
                  ? // Group by domain when Everyone is selected
                    domains.map((d) => (
                      <optgroup key={d.name} label={d.name}>
                        {d.employees.map((emp) => (
                          <option key={emp.id} value={emp.id}>
                            {emp.name} — {emp.role}
                          </option>
                        ))}
                      </optgroup>
                    ))
                  : employeesInDomain.map((emp) => (
                      <option key={emp.id} value={emp.id}>
                        {emp.name} — {emp.role}
                      </option>
                    ))}
              </select>

              {/* Selected person preview */}
              {selectedEmployeeObj && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginTop: '10px',
                    padding: '8px 12px',
                    background: colors.primaryLight,
                    border: `1px solid ${colors.primary}33`,
                    borderRadius: '8px',
                  }}
                >
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
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
                    {selectedEmployeeObj.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>
                  <div style={{ fontSize: '12.5px', color: colors.textDark }}>
                    Sending to <strong>{selectedEmployeeObj.name}</strong>
                    <span style={{ color: colors.textGray }}>
                      {' '}
                      • {selectedEmployeeObj.domain} • {selectedEmployeeObj.role}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: colors.textGray,
                  marginBottom: '4px',
                }}
              >
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
              <label
                style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: colors.textGray,
                  marginBottom: '4px',
                }}
              >
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

          {/* RIGHT COLUMN: Generate a letter */}
          <div
            style={{
              background: colors.cardBg,
              border: `1px solid ${colors.border}`,
              borderRadius: '16px',
              padding: '24px 28px',
            }}
          >
            <h2
              style={{
                fontSize: '18px',
                fontWeight: 600,
                color: colors.textDark,
                margin: '0 0 20px 0',
              }}
            >
              Generate a letter
            </h2>

            {letterCategories.map((category, idx) => (
              <div
                key={idx}
                style={{ marginBottom: idx < letterCategories.length - 1 ? '20px' : 0 }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '10px',
                  }}
                >
                  <i
                    className={`fas ${category.icon}`}
                    style={{ color: colors.primary, fontSize: '14px' }}
                  />
                  <h3
                    style={{
                      fontSize: '13px',
                      fontWeight: 600,
                      color: colors.textGray,
                      margin: 0,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    {category.name}
                  </h3>
                  <div
                    style={{
                      flex: 1,
                      height: '1px',
                      background: colors.border,
                      opacity: 0.3,
                    }}
                  />
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
                      <span
                        style={{
                          fontSize: '14px',
                          color: colors.textDark,
                          fontWeight: 500,
                        }}
                      >
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

            <div
              style={{
                marginTop: '20px',
                paddingTop: '16px',
                borderTop: `1px solid ${colors.border}`,
                opacity: 0.5,
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '12px',
                color: colors.textGray,
              }}
            >
              <span>
                Total templates:{' '}
                {letterCategories.reduce((acc, cat) => acc + cat.letters.length, 0)}
              </span>
              <span>Click Generate to create letter</span>
            </div>
          </div>
        </div>
      </HRPageLayout>
    </HRLayout>
  );
}