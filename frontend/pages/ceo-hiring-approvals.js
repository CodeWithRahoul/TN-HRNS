import { useState } from 'react';
import CEOLayout from '@/components/CEOLayout';
import CEOPageLayout from '@/components/CEOPageLayout';

export default function CEOHiringApprovals() {
  const colors = {
    primary: '#00A19A',
    primaryLight: '#E6F5F4',
    border: '#E5E7EB',
    textDark: '#1A1A1A',
    textGray: '#666666',
    textMuted: '#8a8f98',
    bg: '#F4FBFB',
    cardBg: '#FFFFFF',
    headerBg: '#EDEEF1',
    danger: '#DC5A5A',
  };

  const positions = ['QA engineer', 'Project manager', 'Frontend dev', 'Backend dev', 'UI/UX Designer'];

  const candidates = [
    {
      id: 1,
      name: 'Sona Kareem',
      position: 'UI/UX Designer',
      applied: '19 Jun 2026',
      applicantTitle: 'UI/UX Designer applicant',
      education: {
        degree: 'BS Software Engineering',
        school: 'Bahria university - graduate (yes)',
        cgpa: '3.5 cgpa',
      },
      experience: [
        { role: 'Product Designer — Lumen Labs', period: '2023 — Present' },
        { role: 'UI Intern — Folio3', period: '2022 — 2023' },
      ],
      skills: ['Figma', 'Prototyping', 'Design system'],
      resumeLabel: 'Download resume/CV',
      review: {
        reviewer: 'Technical Assessment',
        text: 'Demonstrated strong frontend development skills with a good understanding of HTML, CSS, JavaScript, and modern frameworks. Completed technical tasks effectively.',
        score: '8.5',
      },
      interviewer: {
        title: 'Behavioral & Communication',
        text: 'Displayed a positive attitude, adaptability, and professionalism. Showed willingness to learn and collaborate within a team. Communicated ideas clearly and confidently. Demonstrated good listening skills and the ability to explain technical concepts effectively.',
        skillScore: '8.0',
        communicationScore: '9.0',
      },
    },
    {
      id: 2,
      name: 'Hamza Khan',
      position: 'Backend Dev',
      applied: '9 Jun 2026',
      applicantTitle: 'Backend Dev applicant',
      education: { degree: 'BS Computer Science', school: 'FAST NUCES', cgpa: '3.7 cgpa' },
      experience: [{ role: 'Backend Developer — Systems Ltd', period: '2022 — Present' }],
      skills: ['Node.js', 'PostgreSQL', 'Docker'],
      resumeLabel: 'Download resume/CV',
      review: {
        reviewer: 'Technical Assessment',
        text: 'Solid grasp of backend architecture, database design, and API development. Handled system design questions confidently.',
        score: '8.0',
      },
      interviewer: {
        title: 'Behavioral & Communication',
        text: 'Clear communicator, structured problem-solving approach, and collaborative attitude during pair exercises.',
        skillScore: '8.0',
        communicationScore: '8.0',
      },
    },
    {
      id: 3,
      name: 'Talha Baig',
      position: 'QA Engineer',
      applied: '25 Jun 2026',
      applicantTitle: 'QA Engineer applicant',
      education: { degree: 'BS Software Engineering', school: 'UET Lahore', cgpa: '3.3 cgpa' },
      experience: [{ role: 'QA Engineer — Testify', period: '2021 — Present' }],
      skills: ['Selenium', 'Manual Testing', 'JIRA'],
      resumeLabel: 'Download resume/CV',
      review: {
        reviewer: 'Technical Assessment',
        text: 'Good understanding of test case design and automation frameworks. Identified edge cases effectively during the assessment.',
        score: '7.5',
      },
      interviewer: {
        title: 'Behavioral & Communication',
        text: 'Detail-oriented and methodical. Communicated testing strategy clearly and asked thoughtful clarifying questions.',
        skillScore: '7.5',
        communicationScore: '8.0',
      },
    },
    {
      id: 4,
      name: 'Robia Ali',
      position: 'Frontend Dev intern',
      applied: '18 Jun 2026',
      applicantTitle: 'Frontend Dev intern applicant',
      education: { degree: 'BS Computer Science', school: 'COMSATS', cgpa: '3.6 cgpa' },
      experience: [{ role: 'Frontend Intern — PixelWorks', period: '2024 — Present' }],
      skills: ['React', 'CSS', 'JavaScript'],
      resumeLabel: 'Download resume/CV',
      review: {
        reviewer: 'Technical Assessment',
        text: 'Demonstrated strong frontend development skills with a good understanding of HTML, CSS, JavaScript, and modern frameworks.',
        score: '8.0',
      },
      interviewer: {
        title: 'Behavioral & Communication',
        text: 'Enthusiastic learner with good communication skills and a proactive approach to feedback.',
        skillScore: '7.5',
        communicationScore: '8.0',
      },
    },
  ];

  const [filterPosition, setFilterPosition] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const filteredCandidates = filterPosition
    ? candidates.filter((c) => c.position.toLowerCase() === filterPosition.toLowerCase())
    : candidates;

  const handleDecline = (candidate) => {
    console.log('Declined:', candidate.name);
    setSelectedCandidate(null);
  };

  const handleApprove = (candidate) => {
    console.log('Approved:', candidate.name);
    setSelectedCandidate(null);
  };

  return (
    <CEOLayout>
      <CEOPageLayout title="Hiring approvals">
        {/* Filter by position */}
        <div style={{ position: 'relative', width: '260px', marginBottom: '20px' }}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 14px',
              background: colors.cardBg,
              border: `1px solid ${colors.border}`,
              borderRadius: '10px',
              fontSize: '14px',
              color: filterPosition ? colors.textDark : colors.textMuted,
              cursor: 'pointer',
            }}
          >
            <span>{filterPosition || 'Filter by position'}</span>
            <i className="fas fa-chevron-down" style={{ fontSize: '12px', color: colors.textMuted }} />
          </button>

          {dropdownOpen && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 6px)',
                left: 0,
                width: '100%',
                background: colors.cardBg,
                border: `1px solid ${colors.border}`,
                borderRadius: '10px',
                boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
                overflow: 'hidden',
                zIndex: 10,
              }}
            >
              <div
                onClick={() => {
                  setFilterPosition('');
                  setDropdownOpen(false);
                }}
                style={{ padding: '10px 14px', fontSize: '14px', cursor: 'pointer', color: colors.textGray }}
                onMouseEnter={(e) => (e.currentTarget.style.background = colors.primaryLight)}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                All positions
              </div>
              {positions.map((pos) => (
                <div
                  key={pos}
                  onClick={() => {
                    setFilterPosition(pos);
                    setDropdownOpen(false);
                  }}
                  style={{
                    padding: '10px 14px',
                    fontSize: '14px',
                    cursor: 'pointer',
                    color: colors.textDark,
                    background: filterPosition === pos ? colors.primary : 'transparent',
                    ...(filterPosition === pos ? { color: '#fff' } : {}),
                  }}
                  onMouseEnter={(e) => {
                    if (filterPosition !== pos) e.currentTarget.style.background = colors.primaryLight;
                  }}
                  onMouseLeave={(e) => {
                    if (filterPosition !== pos) e.currentTarget.style.background = 'transparent';
                  }}
                >
                  {pos}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Candidates table */}
        <div
          style={{
            background: colors.cardBg,
            border: `1px solid ${colors.border}`,
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr auto',
              padding: '14px 24px',
              background: colors.headerBg,
              fontSize: '12px',
              fontWeight: 700,
              color: colors.textDark,
              letterSpacing: '0.3px',
            }}
          >
            <div>CANDIDATE</div>
            <div>POSITION</div>
            <div>APPLIED</div>
            <div></div>
          </div>

          {filteredCandidates.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: colors.textGray, fontSize: '14px' }}>
              No candidates found for this position.
            </div>
          ) : (
            filteredCandidates.map((c, idx) => (
              <div
                key={c.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr auto',
                  alignItems: 'center',
                  padding: '18px 24px',
                  borderTop: idx === 0 ? 'none' : `1px solid ${colors.border}`,
                  fontSize: '14px',
                }}
              >
                <div style={{ color: colors.textDark, fontWeight: 500 }}>{c.name}</div>
                <div style={{ color: colors.textGray }}>{c.position}</div>
                <div style={{ color: colors.textGray }}>{c.applied}</div>
                <div style={{ justifySelf: 'end' }}>
                  <button
                    onClick={() => setSelectedCandidate(c)}
                    style={{
                      padding: '6px 18px',
                      borderRadius: '8px',
                      border: `1px solid ${colors.border}`,
                      background: colors.cardBg,
                      color: colors.textDark,
                      fontSize: '13px',
                      fontWeight: 500,
                      cursor: 'pointer',
                    }}
                  >
                    Review
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Review modal */}
        {selectedCandidate && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.45)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 100,
            }}
            onClick={() => setSelectedCandidate(null)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                background: colors.bg,
                borderRadius: '16px',
                width: '480px',
                maxHeight: '85vh',
                overflowY: 'auto',
                padding: '28px',
                position: 'relative',
                boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
              }}
            >
              <button
                onClick={() => setSelectedCandidate(null)}
                style={{
                  position: 'absolute',
                  top: '18px',
                  right: '18px',
                  width: '30px',
                  height: '30px',
                  borderRadius: '8px',
                  border: 'none',
                  background: '#FBEAEA',
                  color: colors.danger,
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
              >
                <i className="fas fa-times" />
              </button>

              <h2 style={{ fontSize: '18px', fontWeight: 700, color: colors.textDark, margin: '0 0 2px 0' }}>
                {selectedCandidate.name}
              </h2>
              <p style={{ fontSize: '13px', color: colors.textGray, margin: '0 0 20px 0' }}>
                {selectedCandidate.applicantTitle}
              </p>

              {/* Education */}
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: colors.primary, margin: '0 0 8px 0' }}>
                Education
              </h3>
              <p style={{ fontSize: '13px', color: colors.textDark, margin: '0 0 2px 0', fontWeight: 600 }}>
                {selectedCandidate.education.degree}
              </p>
              <p style={{ fontSize: '13px', color: colors.textGray, margin: '0 0 2px 0' }}>
                {selectedCandidate.education.school}
              </p>
              <p style={{ fontSize: '13px', color: colors.textGray, margin: '0 0 18px 0' }}>
                {selectedCandidate.education.cgpa}
              </p>

              {/* Experience */}
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: colors.primary, margin: '0 0 8px 0' }}>
                Experience
              </h3>
              {selectedCandidate.experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: '8px' }}>
                  <p style={{ fontSize: '13px', color: colors.textDark, margin: 0, fontWeight: 600 }}>{exp.role}</p>
                  <p style={{ fontSize: '12px', color: colors.textGray, margin: 0 }}>{exp.period}</p>
                </div>
              ))}

              {/* Skills */}
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: colors.primary, margin: '18px 0 8px 0' }}>
                Skills
              </h3>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '10px' }}>
                {selectedCandidate.skills.map((skill) => (
                  <span
                    key={skill}
                    style={{
                      background: colors.primaryLight,
                      color: colors.primary,
                      fontSize: '12px',
                      fontWeight: 500,
                      padding: '4px 12px',
                      borderRadius: '20px',
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: '#FCEFD9',
                  color: '#B8860B',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '6px 12px',
                  fontSize: '12px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  marginBottom: '20px',
                }}
              >
                <i className="fas fa-file-download" />
                {selectedCandidate.resumeLabel}
              </button>

              {/* Reviews by team lead */}
              <h3 style={{ fontSize: '13px', fontWeight: 700, color: colors.textDark, margin: '0 0 10px 0' }}>
                REVIEWS BY TEAM LEAD
              </h3>
              <div
                style={{
                  background: colors.cardBg,
                  border: `1px solid ${colors.border}`,
                  borderRadius: '10px',
                  padding: '14px',
                  marginBottom: '16px',
                }}
              >
                <p style={{ fontSize: '13px', fontWeight: 600, color: colors.primary, margin: '0 0 8px 0' }}>
                  ✓ {selectedCandidate.review.reviewer}
                </p>
                <p style={{ fontSize: '13px', color: colors.textGray, margin: '0 0 12px 0', lineHeight: 1.5 }}>
                  {selectedCandidate.review.text}
                </p>
                <div
                  style={{
                    display: 'inline-block',
                    background: colors.primaryLight,
                    color: colors.primary,
                    fontSize: '13px',
                    fontWeight: 700,
                    padding: '4px 14px',
                    borderRadius: '8px',
                  }}
                >
                  {selectedCandidate.review.score}
                </div>
              </div>

              {/* Interviewer notes */}
              <h3 style={{ fontSize: '13px', fontWeight: 700, color: colors.textDark, margin: '0 0 10px 0' }}>
                INTERVIEWER NOTES
              </h3>
              <div
                style={{
                  background: colors.cardBg,
                  border: `1px solid ${colors.border}`,
                  borderRadius: '10px',
                  padding: '14px',
                  marginBottom: '20px',
                }}
              >
                <p style={{ fontSize: '13px', fontWeight: 600, color: colors.textDark, margin: '0 0 8px 0' }}>
                  📋 {selectedCandidate.interviewer.title}
                </p>
                <p style={{ fontSize: '13px', color: colors.textGray, margin: '0 0 14px 0', lineHeight: 1.5 }}>
                  {selectedCandidate.interviewer.text}
                </p>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <div
                    style={{
                      flex: 1,
                      border: `1px solid ${colors.border}`,
                      borderRadius: '8px',
                      padding: '8px 12px',
                    }}
                  >
                    <p style={{ fontSize: '11px', color: colors.textMuted, margin: '0 0 2px 0' }}>SKILL SET</p>
                    <p style={{ fontSize: '14px', fontWeight: 700, color: colors.textDark, margin: 0 }}>
                      {selectedCandidate.interviewer.skillScore}
                    </p>
                  </div>
                  <div
                    style={{
                      flex: 1,
                      border: `1px solid ${colors.border}`,
                      borderRadius: '8px',
                      padding: '8px 12px',
                    }}
                  >
                    <p style={{ fontSize: '11px', color: colors.textMuted, margin: '0 0 2px 0' }}>COMMUNICATION</p>
                    <p style={{ fontSize: '14px', fontWeight: 700, color: colors.textDark, margin: 0 }}>
                      {selectedCandidate.interviewer.communicationScore}
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={() => handleDecline(selectedCandidate)}
                  style={{
                    flex: 1,
                    padding: '10px',
                    borderRadius: '10px',
                    border: `1px solid ${colors.danger}`,
                    background: colors.cardBg,
                    color: colors.danger,
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Decline
                </button>
                <button
                  onClick={() => handleApprove(selectedCandidate)}
                  style={{
                    flex: 1,
                    padding: '10px',
                    borderRadius: '10px',
                    border: 'none',
                    background: colors.primary,
                    color: '#fff',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Approve hire
                </button>
              </div>
            </div>
          </div>
        )}
      </CEOPageLayout>
    </CEOLayout>
  );
}