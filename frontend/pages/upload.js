// pages/upload.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { uploadAPI } from '@/services/api';
import Footer from '@/components/Footer';
import Button from '@/components/common/Button';
import Spinner from '@/components/common/Spinner';

export default function Upload() {
  const router = useRouter();
  const [files, setFiles] = useState({ resume: null, cnicFront: null, cnicBack: null });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [appId, setAppId] = useState(null);

  useEffect(() => {
    // Get application ID from query string
    const id = router.query.appId;
    if (id) setAppId(id);
  }, [router.query]);

  const handleFileChange = (type, file) => {
    setFiles({ ...files, [type]: file });
    if (errors[type]) setErrors({ ...errors, [type]: null });
  };

  const validate = () => {
    const newErrors = {};
    if (!files.resume) newErrors.resume = 'Resume is required';
    if (!files.cnicFront) newErrors.cnicFront = 'CNIC Front required';
    if (!files.cnicBack) newErrors.cnicBack = 'CNIC Back required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    setApiError('');
    try {
      await uploadAPI.uploadDocuments({ ...files, applicationId: appId });
      alert('Application submitted successfully!');
      router.push('/track?appId=' + (appId || 'mock-id'));
    } catch (err) {
      setApiError(err.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-wrapper">
        <div className="auth-card job-app-card">
          <button className="auth-close" onClick={() => router.push('/')}><i className="fas fa-times"></i></button>
          <h1 className="auth-welcome">Upload Documents</h1>
          <p className="auth-subtitle">Please upload the required documents.</p>
          <form onSubmit={handleSubmit}>
            {['resume', 'cnicFront', 'cnicBack'].map((type) => {
              const label = type === 'resume' ? 'Resume / CV' : type === 'cnicFront' ? 'CNIC Front' : 'CNIC Back';
              return (
                <div className="upload-group" key={type}>
                  <label style={{ fontWeight: 500, fontSize: '0.85rem' }}>{label}</label>
                  <div className={`upload-area ${errors[type] ? 'error' : ''}`}>
                    <i className="fas fa-cloud-upload-alt upload-icon"></i>
                    <p>Drag & drop or <strong onClick={() => document.getElementById(`${type}-input`).click()} style={{ cursor: 'pointer' }}>browse</strong></p>
                    <span className="upload-hint">PDF, DOCX up to 5MB</span>
                    <input id={`${type}-input`} type="file" accept=".pdf,.docx" style={{ display: 'none' }} onChange={(e) => { if (e.target.files.length) handleFileChange(type, e.target.files[0]); }} />
                    {files[type] && <div style={{ marginTop: '8px', fontSize: '0.85rem', color: 'var(--primary)' }}><i className="fas fa-check-circle"></i> {files[type].name}</div>}
                    {errors[type] && <span className="error-message">{errors[type]}</span>}
                  </div>
                </div>
              );
            })}
            {apiError && <div className="error-message" style={{ textAlign: 'center', marginBottom: '12px' }}>{apiError}</div>}
            <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
              <Button variant="ghost" onClick={() => router.back()} style={{ flex: 1 }}><i className="fas fa-arrow-left" style={{ marginRight: '8px' }}></i> Back</Button>
              <Button variant="primary" loading={loading} type="submit" style={{ flex: 2 }}>Submit Application <i className="fas fa-paper-plane" style={{ marginLeft: '8px' }}></i></Button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}