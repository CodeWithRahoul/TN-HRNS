import { useState } from 'react';
import HRLayout from '@/components/HRLayout';
import HRPageLayout from '@/components/HRPageLayout';
import CreateProjectModal from '@/components/CreateProjectModal';

export default function Projects() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null); // null = grid view
  const [selectedDeliverable, setSelectedDeliverable] = useState(null);
  const [reassignTarget, setReassignTarget] = useState(null); // { index, member } when reassigning

  const [projects, setProjects] = useState([
    {
      id: 1,
      title: 'Nexovate Portal',
      description: 'Client-developer portal - AI scope reports',
      team: [
        { initials: 'BA', name: 'Bilal ahmed', role: 'PM', deliverable: 'Project scope report', figmaLink: '', document: { name: 'Scope report.pdf', size: '1.8 MB' } },
        { initials: 'SK', name: 'Sara kareem', role: 'UI/UX designer', deliverable: 'Developer flow', figmaLink: 'figma.com/sara/devconnect', document: { name: 'Design document.pdf', size: '2.4 MB' } },
        { initials: 'TR', name: 'Tehreem raja', role: 'Frontend developer', deliverable: 'Client side flow', figmaLink: '', document: { name: 'Client flow.pdf', size: '1.2 MB' } },
        { initials: 'AR', name: 'Abdul rehman', role: 'Backend developer', deliverable: 'API integration', figmaLink: '', document: { name: 'API docs.pdf', size: '900 KB' } },
      ],
    },
    {
      id: 2,
      title: 'TN - HRMS',
      description: 'Unified HR & project management system',
      team: [
        { initials: 'BA', name: 'Bilal ahmed', role: 'PM', deliverable: 'Sprint plan', figmaLink: '', document: { name: 'Sprint plan.pdf', size: '1.1 MB' } },
        { initials: 'SK', name: 'Sara kareem', role: 'UI/UX designer', deliverable: 'Dashboard UI', figmaLink: 'figma.com/sara/hrms-dashboard', document: { name: 'Dashboard UI.pdf', size: '3.1 MB' } },
        { initials: 'TR', name: 'Tehreem raja', role: 'Frontend developer', deliverable: 'Module integration', figmaLink: '', document: { name: 'Module notes.pdf', size: '780 KB' } },
        { initials: 'AR', name: 'Abdul rehman', role: 'Backend developer', deliverable: 'DB schema', figmaLink: '', document: { name: 'DB schema.pdf', size: '640 KB' } },
      ],
    },
    {
      id: 3,
      title: 'Marketing Site Refresh',
      description: 'Public landing page & brand refresh',
      team: [
        { initials: 'BA', name: 'Bilal ahmed', role: 'PM', deliverable: 'Launch plan', figmaLink: '', document: { name: 'Launch plan.pdf', size: '1.4 MB' } },
        { initials: 'SK', name: 'Sara kareem', role: 'UI/UX designer', deliverable: 'Landing page design', figmaLink: 'figma.com/sara/landing-refresh', document: { name: 'Landing design.pdf', size: '2.9 MB' } },
        { initials: 'TR', name: 'Tehreem raja', role: 'Frontend developer', deliverable: 'Page build', figmaLink: '', document: { name: 'Page build notes.pdf', size: '650 KB' } },
        { initials: 'AR', name: 'Abdul rehman', role: 'Backend developer', deliverable: 'Form handling', figmaLink: '', document: { name: 'Form handling.pdf', size: '540 KB' } },
      ],
    },
  ]);

  // Pool of employees available for reassignment
  const availableEmployees = [
    { initials: 'MH', name: 'Maryam Hassan', role: 'PM' },
    { initials: 'ZK', name: 'Zain Khan', role: 'UI/UX designer' },
    { initials: 'FN', name: 'Fatima Noor', role: 'Frontend developer' },
    { initials: 'UR', name: 'Usman Raza', role: 'Backend developer' },
    { initials: 'AS', name: 'Ali Saeed', role: 'QA engineer' },
    { initials: 'HK', name: 'Hamza Khalid', role: 'Frontend developer' },
  ];

  const selectedProject = projects.find((p) => p.id === selectedProjectId) || null;

  const handleCreateProject = (projectData) => {
    console.log('New Project:', projectData);
    setIsModalOpen(false);
  };

  const handleViewProject = (projectId) => {
    setSelectedProjectId(projectId);
  };

  const handleBackToProjects = () => {
    setSelectedProjectId(null);
  };

  const handleViewDeliverable = (member) => {
    setSelectedDeliverable(member);
  };

  const handleCloseDeliverable = () => {
    setSelectedDeliverable(null);
  };

  const handleOpenReassign = (index, member) => {
    setReassignTarget({ index, member });
  };

  const handleCloseReassign = () => {
    setReassignTarget(null);
  };

  const handleReassign = (newEmployee) => {
    if (!reassignTarget || !selectedProject) return;
    const { index } = reassignTarget;

    setProjects((prev) =>
      prev.map((p) =>
        p.id === selectedProject.id
          ? {
              ...p,
              team: p.team.map((m, i) =>
                i === index
                  ? {
                      ...newEmployee,
                      // keep the deliverable slot, reset deliverable artifacts
                      deliverable: m.deliverable,
                      figmaLink: '',
                      document: null,
                    }
                  : m
              ),
            }
          : p
      )
    );

    setReassignTarget(null);
  };

  const colors = {
    primary: '#00A19A',
    border: '#e2e8e8',
    textDark: '#1A1A1A',
    textGray: '#666666',
    textMuted: '#8a8f98',
    bg: '#F4FBFB',
    cardBg: '#FFFFFF',
    tableHeaderBg: '#B8BFC6',
  };

  const avatarColors = {
    'BA': '#3B5BDB',
    'SK': '#F4B400',
    'TR': '#2FBF71',
    'AR': '#E8483E',
    'MH': '#9C27B0',
    'ZK': '#00A19A',
    'FN': '#FF7043',
    'UR': '#5C6BC0',
    'AS': '#26A69A',
    'HK': '#8E24AA',
  };

  // ---------- DETAIL VIEW ----------
  if (selectedProject) {
    return (
      <HRLayout>
        <HRPageLayout title="Projects">
          <div style={{ marginBottom: '16px' }}>
            <button
              onClick={handleBackToProjects}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'transparent',
                color: colors.textGray,
                border: 'none',
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'pointer',
                fontFamily: "'Poppins', sans-serif",
                padding: 0,
              }}
            >
              <i className="fas fa-arrow-left" style={{ fontSize: '12px' }} />
              Back to Projects
            </button>
          </div>

          <div
            style={{
              background: colors.cardBg,
              border: `1px solid ${colors.border}`,
              borderRadius: '16px',
              padding: '24px',
              maxWidth: '620px',
            }}
          >
            <h3 style={{
              fontSize: '18px',
              fontWeight: 600,
              color: colors.textDark,
              margin: '0 0 4px 0',
            }}>
              {selectedProject.title}
            </h3>
            <p style={{
              fontSize: '13px',
              color: colors.textGray,
              margin: '0 0 20px 0',
            }}>
              {selectedProject.description}
            </p>

            <div style={{
              borderRadius: '10px',
              overflow: 'hidden',
              border: `1px solid ${colors.border}`,
            }}>
              {/* Table Header */}
              <div style={{
                display: 'flex',
                background: colors.tableHeaderBg,
                padding: '10px 16px',
              }}>
                <div style={{
                  flex: 1,
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#fff',
                  letterSpacing: '0.4px',
                  textTransform: 'uppercase',
                }}>
                  Employee and Position
                </div>
                <div style={{
                  flex: 1,
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#fff',
                  letterSpacing: '0.4px',
                  textTransform: 'uppercase',
                }}>
                  Deliverable
                </div>
              </div>

              {/* Table Rows */}
              {selectedProject.team.map((member, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '12px 16px',
                    borderTop: idx === 0 ? 'none' : `1px solid ${colors.border}`,
                    background: colors.cardBg,
                  }}
                >
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      background: avatarColors[member.initials] || '#ccc',
                      color: '#fff',
                      fontSize: '10px',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      {member.initials}
                    </div>
                    <span style={{ fontSize: '13px', color: colors.textDark }}>
                      {member.name} . <span style={{ color: colors.textGray }}>{member.role}</span>
                    </span>
                  </div>

                  <div style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '10px',
                  }}>
                    <span style={{ fontSize: '13px', color: colors.textDark }}>
                      {member.deliverable}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <button
                        onClick={() => handleOpenReassign(idx, member)}
                        title="Reassign this position"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px',
                          background: '#EAF7F6',
                          color: colors.primary,
                          border: `1px solid ${colors.primary}33`,
                          borderRadius: '6px',
                          padding: '4px 10px',
                          fontSize: '12px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          fontFamily: "'Poppins', sans-serif",
                        }}
                      >
                        <i className="fas fa-user-pen" style={{ fontSize: '11px' }} />
                        Change
                      </button>
                      <button
                        onClick={() => handleViewDeliverable(member)}
                        style={{
                          background: 'transparent',
                          color: colors.primary,
                          border: 'none',
                          fontSize: '13px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          fontFamily: "'Poppins', sans-serif",
                          padding: 0,
                        }}
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </HRPageLayout>

        {/* ---------- DELIVERABLE MODAL ---------- */}
        {selectedDeliverable && (
          <div
            onClick={handleCloseDeliverable}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(20, 30, 30, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                background: colors.cardBg,
                borderRadius: '16px',
                padding: '28px',
                width: '360px',
                maxWidth: '90vw',
                position: 'relative',
                boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
              }}
            >
              <button
                onClick={handleCloseDeliverable}
                style={{
                  position: 'absolute',
                  top: '-14px',
                  right: '-14px',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: '#F5C6C6',
                  color: '#C0392B',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                }}
              >
                <i className="fas fa-times" />
              </button>

              <h3 style={{
                fontSize: '18px',
                fontWeight: 700,
                color: colors.textDark,
                margin: '0 0 20px 0',
              }}>
                Deliverable
              </h3>

              <div style={{ marginBottom: '18px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: colors.textDark,
                  marginBottom: '6px',
                }}>
                  Figma link
                </label>
                <div style={{
                  border: `1px solid ${colors.border}`,
                  borderRadius: '8px',
                  padding: '10px 12px',
                  fontSize: '13px',
                  color: selectedDeliverable.figmaLink ? colors.textDark : colors.textMuted,
                  background: '#fff',
                }}>
                  {selectedDeliverable.figmaLink || 'No link provided'}
                </div>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: colors.textDark,
                  marginBottom: '6px',
                }}>
                  Document
                </label>
                {selectedDeliverable.document ? (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    border: `1px solid ${colors.border}`,
                    borderRadius: '8px',
                    padding: '10px 12px',
                    background: '#fff',
                    cursor: 'pointer',
                  }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '6px',
                      background: '#FDECEC',
                      color: '#E8483E',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <i className="fas fa-file-pdf" style={{ fontSize: '14px' }} />
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 500, color: colors.textDark }}>
                        {selectedDeliverable.document.name}
                      </div>
                      <div style={{ fontSize: '11px', color: colors.textMuted }}>
                        {selectedDeliverable.document.size}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div style={{ fontSize: '13px', color: colors.textMuted }}>
                    No document uploaded
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ---------- REASSIGN EMPLOYEE MODAL ---------- */}
        {reassignTarget && (
          <div
            onClick={handleCloseReassign}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(20, 30, 30, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                background: colors.cardBg,
                borderRadius: '16px',
                padding: '28px',
                width: '420px',
                maxWidth: '90vw',
                position: 'relative',
                boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
              }}
            >
              <button
                onClick={handleCloseReassign}
                style={{
                  position: 'absolute',
                  top: '-14px',
                  right: '-14px',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: '#F5C6C6',
                  color: '#C0392B',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                }}
              >
                <i className="fas fa-times" />
              </button>

              <h3 style={{
                fontSize: '18px',
                fontWeight: 700,
                color: colors.textDark,
                margin: '0 0 4px 0',
              }}>
                Reassign Position
              </h3>
              <p style={{
                fontSize: '13px',
                color: colors.textGray,
                margin: '0 0 20px 0',
              }}>
                Replacing <strong style={{ color: colors.textDark }}>{reassignTarget.member.name}</strong> ({reassignTarget.member.role}) on
                {' '}<strong style={{ color: colors.textDark }}>{reassignTarget.member.deliverable}</strong>
              </p>

              <label style={{
                display: 'block',
                fontSize: '12px',
                fontWeight: 600,
                color: colors.textGray,
                textTransform: 'uppercase',
                letterSpacing: '0.4px',
                marginBottom: '10px',
              }}>
                Select replacement
              </label>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                maxHeight: '280px',
                overflowY: 'auto',
              }}>
                {availableEmployees.map((emp) => (
                  <button
                    key={emp.initials}
                    onClick={() => handleReassign(emp)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '10px 14px',
                      background: '#fff',
                      border: `1px solid ${colors.border}`,
                      borderRadius: '10px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontFamily: "'Poppins', sans-serif",
                      transition: 'all 0.15s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = colors.primary;
                      e.currentTarget.style.background = '#F4FBFB';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = colors.border;
                      e.currentTarget.style.background = '#fff';
                    }}
                  >
                    <div style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '50%',
                      background: avatarColors[emp.initials] || '#ccc',
                      color: '#fff',
                      fontSize: '12px',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      {emp.initials}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: colors.textDark }}>
                        {emp.name}
                      </div>
                      <div style={{ fontSize: '12px', color: colors.textGray }}>
                        {emp.role}
                      </div>
                    </div>
                    <i className="fas fa-chevron-right" style={{ fontSize: '11px', color: colors.textMuted }} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </HRLayout>
    );
  }

  // ---------- GRID VIEW ----------
  return (
    <HRLayout>
      <HRPageLayout title="Projects">
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

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
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

              <div style={{
                marginTop: '16px',
                paddingTop: '14px',
                borderTop: `1px solid ${colors.border}`,
                display: 'flex',
                justifyContent: 'flex-end',
              }}>
                <button
                  onClick={() => handleViewProject(project.id)}
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
      </HRPageLayout>

      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateProject}
      />
    </HRLayout>
  );
}