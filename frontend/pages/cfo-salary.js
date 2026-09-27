import { useState } from 'react';
import CFOLayout from '@/components/CFOLayout';
import CFOPageLayout from '@/components/CFOPageLayout';

const employees = [
  { initials: 'AB', name: 'Abdul rehman', role: 'Backend devloper . Since Mar 2024', color: '#3B82F6' },
  { initials: 'TR', name: 'Tehreem raja', role: 'Frontend devloper . Since Sep 2024', color: '#B91C3C' },
  { initials: 'BA', name: 'Bilal ahmed', role: 'Project manager . Since Jan 2025', color: '#6D28D9' },
  { initials: 'SH', name: 'Sania hammad', role: 'UI/UX designer . Since Jul 2026', color: '#059669' },
];

const payrollSheets = [
  { month: 'Aug 2026' },
  { month: 'Jul 2026' },
  { month: 'Jun 2026' },
  { month: 'May 2026' },
  { month: 'Apr 2026' },
];

export default function CFOSalary() {
  const [activeTab, setActiveTab] = useState('slips'); // 'slips' | 'payroll'
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [period, setPeriod] = useState('');
  const [file, setFile] = useState(null);

  const tealColor = '#00A19A';

  const handleUpload = () => {
    // TODO: hook this up to your actual upload API
    console.log('Uploading', { period, file });
    setShowUploadModal(false);
    setPeriod('');
    setFile(null);
  };

  return (
    <CFOLayout>
      <CFOPageLayout title="Salary">
        <div style={{ position: 'relative' }}>
          {/* Tabs + Upload button row */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px',
            flexWrap: 'wrap',
            gap: '12px',
          }}>
            <div style={{
              background: '#fff',
              border: '1px solid #E5E7EB',
              borderRadius: '10px',
              padding: '6px 16px',
              display: 'flex',
              gap: '24px',
            }}>
              <button
                onClick={() => setActiveTab('slips')}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px 0',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: activeTab === 'slips' ? '#1A1A1A' : '#9CA3AF',
                  borderBottom: activeTab === 'slips' ? `3px solid ${tealColor}` : '3px solid transparent',
                }}
              >
                Salary slips
              </button>
              <button
                onClick={() => setActiveTab('payroll')}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px 0',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: activeTab === 'payroll' ? '#1A1A1A' : '#9CA3AF',
                  borderBottom: activeTab === 'payroll' ? `3px solid ${tealColor}` : '3px solid transparent',
                }}
              >
                Payroll sheets
              </button>
            </div>

            {activeTab === 'payroll' && (
              <button
                onClick={() => setShowUploadModal(true)}
                style={{
                  background: tealColor,
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 18px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                + Upload document
              </button>
            )}
          </div>

          {/* Content card */}
          <div style={{
            background: '#fff',
            border: '1px solid #E5E7EB',
            borderRadius: '16px',
            overflow: 'hidden',
          }}>
            <div style={{
              background: '#A9A3A3',
              padding: '16px 24px',
              fontSize: '16px',
              fontWeight: 700,
              color: '#1A1A1A',
            }}>
              {activeTab === 'slips' ? 'EMPLOYEES' : 'Payroll sheets'}
            </div>

            <div style={{ maxHeight: '420px', overflowY: 'auto', padding: '8px 24px' }}>
              {activeTab === 'slips' ? (
                employees.map((emp, idx) => (
                  <div
                    key={emp.name}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '16px 0',
                      borderBottom: idx !== employees.length - 1 ? '1px solid #F0F0F0' : 'none',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: emp.color,
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: '13px',
                        flexShrink: 0,
                      }}>
                        {emp.initials}
                      </div>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 600, color: '#1A1A1A' }}>{emp.name}</div>
                        <div style={{ fontSize: '12px', color: '#9CA3AF' }}>{emp.role}</div>
                      </div>
                    </div>
                    <button style={{
                      background: '#fff',
                      border: '1px solid #D1D5DB',
                      borderRadius: '6px',
                      padding: '8px 16px',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#1A1A1A',
                      cursor: 'pointer',
                    }}>
                      Download
                    </button>
                  </div>
                ))
              ) : (
                payrollSheets.map((sheet, idx) => (
                  <div
                    key={sheet.month}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '18px 0',
                      borderBottom: idx !== payrollSheets.length - 1 ? '1px solid #F0F0F0' : 'none',
                    }}
                  >
                    <div style={{ fontSize: '14px', fontWeight: 500, color: '#1A1A1A' }}>{sheet.month}</div>
                    <button style={{
                      background: '#fff',
                      border: '1px solid #D1D5DB',
                      borderRadius: '6px',
                      padding: '8px 16px',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#1A1A1A',
                      cursor: 'pointer',
                    }}>
                      Download
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Upload document modal */}
          {showUploadModal && (
            <div style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
            }}>
              <div style={{
                background: '#fff',
                borderRadius: '16px',
                width: '420px',
                maxWidth: '90%',
                padding: '28px',
                position: 'relative',
              }}>
                <button
                  onClick={() => setShowUploadModal(false)}
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    background: '#FEE2E2',
                    border: 'none',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    cursor: 'pointer',
                    color: '#DC2626',
                    fontWeight: 700,
                  }}
                >
                  ✕
                </button>

                <h3 style={{ margin: '0 0 24px 0', fontSize: '18px', fontWeight: 700, color: '#1A1A1A' }}>
                  Upload document
                </h3>

                <label style={{ fontSize: '13px', fontWeight: 600, color: '#374151' }}>Period</label>
                <div style={{
                  marginTop: '6px',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px solid #D1D5DB',
                  borderRadius: '8px',
                  padding: '10px 12px',
                }}>
                  <input
                    type="text"
                    placeholder="mm/yyyy"
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                    style={{
                      border: 'none',
                      outline: 'none',
                      flex: 1,
                      fontSize: '14px',
                    }}
                  />
                  <i className="fas fa-calendar-alt" style={{ color: '#9CA3AF' }} />
                </div>

                <label style={{ fontSize: '13px', fontWeight: 600, color: '#374151' }}>Upload</label>
                <div style={{
                  marginTop: '6px',
                  marginBottom: '24px',
                  border: '2px dashed #D1D5DB',
                  borderRadius: '10px',
                  padding: '28px 16px',
                  textAlign: 'center',
                  cursor: 'pointer',
                }}
                  onClick={() => document.getElementById('salary-file-input').click()}
                >
                  <i className="fas fa-cloud-upload-alt" style={{ fontSize: '24px', color: tealColor, marginBottom: '10px' }} />
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#1A1A1A' }}>
                    {file ? file.name : 'Drag and drop your files here'}
                  </div>
                  <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '4px' }}>
                    {!file && 'or click to browse files'}
                  </div>
                  <div style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '4px' }}>
                    Supported formats: .zip, .rar, .pdf (Max 50MB)
                  </div>
                  <input
                    id="salary-file-input"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </div>

                <button
                  onClick={handleUpload}
                  style={{
                    width: '100%',
                    background: tealColor,
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '12px',
                    fontSize: '14px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Upload
                </button>
              </div>
            </div>
          )}
        </div>
      </CFOPageLayout>
    </CFOLayout>
  );
}