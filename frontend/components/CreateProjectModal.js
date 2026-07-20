import { useState } from 'react';

export default function CreateProjectModal({ isOpen, onClose, onCreate }) {
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [teamMembers, setTeamMembers] = useState([]);
  const [memberInput, setMemberInput] = useState('');
  const [timeline, setTimeline] = useState('');
  const [projectManager, setProjectManager] = useState('');

  if (!isOpen) return null;

  const handleAddMember = () => {
    if (memberInput.trim()) {
      setTeamMembers([...teamMembers, memberInput.trim()]);
      setMemberInput('');
    }
  };

  const handleRemoveMember = (index) => {
    setTeamMembers(teamMembers.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: projectName,
      description,
      team: teamMembers,
      timeline,
      projectManager,
    };
    onCreate(data);
    // Reset form
    setProjectName('');
    setDescription('');
    setTeamMembers([]);
    setMemberInput('');
    setTimeline('');
    setProjectManager('');
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
    }}>
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '16px',
        padding: '32px',
        width: '100%',
        maxWidth: '480px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
        maxHeight: '90vh',
        overflowY: 'auto',
      }}>
        <h2 style={{
          fontSize: '22px',
          fontWeight: 600,
          color: '#1A1A1A',
          margin: '0 0 24px 0',
          fontFamily: "'Poppins', sans-serif",
        }}>
          Create Project
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Project Name */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: 500,
              color: '#333',
              marginBottom: '6px',
              fontFamily: "'Poppins', sans-serif",
            }}>
              Project name
            </label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Enter project name"
              style={{
                width: '100%',
                padding: '10px 14px',
                border: '1px solid #e2e8e8',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box',
                fontFamily: "'Poppins', sans-serif",
              }}
              required
            />
          </div>

          {/* Description */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: 500,
              color: '#333',
              marginBottom: '6px',
              fontFamily: "'Poppins', sans-serif",
            }}>
              Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              style={{
                width: '100%',
                padding: '10px 14px',
                border: '1px solid #e2e8e8',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box',
                fontFamily: "'Poppins', sans-serif",
              }}
            />
          </div>

          {/* Form Team */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: 500,
              color: '#333',
              marginBottom: '6px',
              fontFamily: "'Poppins', sans-serif",
            }}>
              Form team
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                value={memberInput}
                onChange={(e) => setMemberInput(e.target.value)}
                placeholder="Add member"
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  border: '1px solid #e2e8e8',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                  fontFamily: "'Poppins', sans-serif",
                }}
              />
              <button
                type="button"
                onClick={handleAddMember}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#00A19A',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  fontFamily: "'Poppins', sans-serif",
                  whiteSpace: 'nowrap',
                }}
              >
                Add member
              </button>
            </div>
            {teamMembers.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '10px' }}>
                {teamMembers.map((member, idx) => (
                  <span
                    key={idx}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      backgroundColor: '#f0f0f0',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '13px',
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    {member}
                    <button
                      type="button"
                      onClick={() => handleRemoveMember(idx)}
                      style={{
                        border: 'none',
                        background: 'none',
                        color: '#999',
                        cursor: 'pointer',
                        fontSize: '16px',
                        padding: '0 4px',
                      }}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Target Timeline */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: 500,
              color: '#333',
              marginBottom: '6px',
              fontFamily: "'Poppins', sans-serif",
            }}>
              Target timeline
            </label>
            <input
              type="date"
              value={timeline}
              onChange={(e) => setTimeline(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                border: '1px solid #e2e8e8',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box',
                fontFamily: "'Poppins', sans-serif",
              }}
              required
            />
          </div>

          {/* Assign Project Manager */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: 500,
              color: '#333',
              marginBottom: '6px',
              fontFamily: "'Poppins', sans-serif",
            }}>
              Assign project manager
            </label>
            <select
              value={projectManager}
              onChange={(e) => setProjectManager(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                border: '1px solid #e2e8e8',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box',
                fontFamily: "'Poppins', sans-serif",
                backgroundColor: '#fff',
              }}
              required
            >
              <option value="">Select a manager</option>
              <option value="Bilal ahmed">Bilal ahmed</option>
              <option value="Sara kareem">Sara kareem</option>
              <option value="Tehreem raja">Tehreem raja</option>
              <option value="Abdul rehman">Abdul rehman</option>
            </select>
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '10px 24px',
                backgroundColor: 'transparent',
                color: '#666',
                border: '1px solid #e2e8e8',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer',
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: '10px 28px',
                backgroundColor: '#00A19A',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer',
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              Create project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}