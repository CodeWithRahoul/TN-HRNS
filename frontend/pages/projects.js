// pages/projects.js
import HRLayout from '@/components/HRLayout';
import HRPageLayout from '@/components/HRPageLayout';

export default function Projects() {
  const colors = {
    primary: '#00A19A',
    border: '#e2e8e8',
    textDark: '#1A1A1A',
    textGray: '#666666',
    textMuted: '#8a8f98',
    bg: '#F4FBFB',
    cardBg: '#FFFFFF',
  };

  const avatarColors = {
    'BA': '#3B5BDB',
    'SK': '#F4B400',
    'TR': '#2FBF71',
    'AR': '#E8483E',
  };

  const projects = [
    {
      id: 1,
      title: 'Nexovate Portal',
      description: 'Client-developer portal - AI scope reports',
      team: [
        { initials: 'BA', name: 'Bilal ahmed', role: 'PM' },
        { initials: 'SK', name: 'Sara kareem', role: 'UI/UX designer' },
        { initials: 'TR', name: 'Tehreem raja', role: 'Frontend developer' },
        { initials: 'AR', name: 'Abdul rehman', role: 'Backend developer' },
      ],
    },
    {
      id: 2,
      title: 'TN - HRMS',
      description: 'Unified HR & project management system',
      team: [
        { initials: 'BA', name: 'Bilal ahmed', role: 'PM' },
        { initials: 'SK', name: 'Sara kareem', role: 'UI/UX designer' },
        { initials: 'TR', name: 'Tehreem raja', role: 'Frontend developer' },
        { initials: 'AR', name: 'Abdul rehman', role: 'Backend developer' },
      ],
    },
    {
      id: 3,
      title: 'Marketing Site Refresh',
      description: 'Public landing page & brand refresh',
      team: [
        { initials: 'BA', name: 'Bilal ahmed', role: 'PM' },
        { initials: 'SK', name: 'Sara kareem', role: 'UI/UX designer' },
        { initials: 'TR', name: 'Tehreem raja', role: 'Frontend developer' },
        { initials: 'AR', name: 'Abdul rehman', role: 'Backend developer' },
      ],
    },
  ];

  return (
    <HRLayout>
      <HRPageLayout title="Projects">
        {/* Search Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}>
          <div style={{ flex: 1 }} /> {/* spacer */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: '#fff',
            border: `1px solid ${colors.border}`,
            borderRadius: '10px',
            padding: '8px 14px',
            gap: '8px',
            minWidth: '260px',
          }}>
            <i className="fas fa-search" style={{ color: colors.textMuted, fontSize: '14px' }} />
            <input
              type="text"
              placeholder="Search projects, tasks, or clients..."
              style={{
                border: 'none',
                outline: 'none',
                fontSize: '13px',
                width: '100%',
                color: colors.textDark,
                background: 'transparent',
              }}
            />
            <span style={{
              background: colors.primary,
              color: '#fff',
              fontSize: '12px',
              fontWeight: 500,
              padding: '4px 12px',
              borderRadius: '6px',
              cursor: 'pointer',
            }}>
              Search
            </span>
          </div>
        </div>

        {/* Create Project Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
          <button style={{
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
          }}>
            <i className="fas fa-plus" style={{ fontSize: '14px' }} />
            Create Project
          </button>
        </div>

        {/* Projects Grid */}
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
                {project.description}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {project.team.map((member, idx) => (
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
              </div>
            </div>
          ))}
        </div>
      </HRPageLayout>
    </HRLayout>
  );
}