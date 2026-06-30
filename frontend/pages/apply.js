// pages/apply.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import { applicationAPI } from '@/services/api';
import Footer from '@/components/Footer';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Spinner from '@/components/common/Spinner';

export default function Apply() {
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: '', phone: '', email: '',
    educations: [{ university: '', area: '', cgpa: '', graduated: 'No' }],
    experiences: [{ company: '', position: '' }],
    skills: '', position: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const addEducation = () => setForm({...form, educations: [...form.educations, { university: '', area: '', cgpa: '', graduated: 'No' }]});
  const addExperience = () => setForm({...form, experiences: [...form.experiences, { company: '', position: '' }]});

  const validate = () => {
    const newErrors = {};
    if (!form.fullName) newErrors.fullName = 'Full name required';
    if (!form.phone) newErrors.phone = 'Phone required';
    if (!form.email) newErrors.email = 'Email required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Invalid email';
    if (!form.position) newErrors.position = 'Select position';
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
      const response = await applicationAPI.submit(form);
      router.push('/upload?appId=' + (response.applicationId || 'mock-id'));
    } catch (err) {
      setApiError(err.message || 'Submission failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-wrapper">
        <div className="auth-card job-app-card">
          <button className="auth-close" onClick={() => router.push('/')}><i className="fas fa-times"></i></button>
          <h1 className="auth-welcome">Job Application Form</h1>
          <p className="auth-subtitle">Complete the form below to submit your application.</p>
          <form onSubmit={handleSubmit}>
            <div className="form-section">
              <h3>Personal Information</h3>
              <Input label="Full name" placeholder="eg Ayisha Khan" value={form.fullName} onChange={(e) => setForm({...form, fullName: e.target.value})} error={errors.fullName} />
              <div className="form-row">
                <Input label="Phone number" placeholder="+92-xxx xxxx" value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} error={errors.phone} />
                <Input label="Email Address" placeholder="abc@email.com" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} error={errors.email} />
              </div>
            </div>

            <div className="form-section">
              <h3>Education</h3>
              {form.educations.map((edu, i) => (
                <div key={i} className="edu-item">
                  <div className="form-row">
                    <Input label="University" placeholder="University" value={edu.university} onChange={(e) => { const newEdu = [...form.educations]; newEdu[i].university = e.target.value; setForm({...form, educations: newEdu}); }} />
                    <Input label="Area of study" placeholder="Area" value={edu.area} onChange={(e) => { const newEdu = [...form.educations]; newEdu[i].area = e.target.value; setForm({...form, educations: newEdu}); }} />
                  </div>
                  <div className="form-row">
                    <Input label="CGPA" placeholder="CGPA" value={edu.cgpa} onChange={(e) => { const newEdu = [...form.educations]; newEdu[i].cgpa = e.target.value; setForm({...form, educations: newEdu}); }} />
                    <div className="form-group">
                      <label>Graduated?</label>
                      <div className="radio-group">
                        <label><input type="radio" name={`grad-${i}`} value="Yes" checked={edu.graduated === 'Yes'} onChange={() => { const newEdu = [...form.educations]; newEdu[i].graduated = 'Yes'; setForm({...form, educations: newEdu}); }} /> Yes</label>
                        <label><input type="radio" name={`grad-${i}`} value="No" checked={edu.graduated === 'No'} onChange={() => { const newEdu = [...form.educations]; newEdu[i].graduated = 'No'; setForm({...form, educations: newEdu}); }} /> No</label>
                      </div>
                    </div>
                  </div>
                  {i < form.educations.length - 1 && <hr className="edu-divider" />}
                </div>
              ))}
              <button type="button" className="add-more-btn" onClick={addEducation}><i className="fas fa-plus-circle"></i> Add more</button>
            </div>

            <div className="form-section">
              <h3>Experience</h3>
              {form.experiences.map((exp, i) => (
                <div key={i} className="exp-item">
                  <div className="form-row">
                    <Input label="Company" placeholder="Company" value={exp.company} onChange={(e) => { const newExp = [...form.experiences]; newExp[i].company = e.target.value; setForm({...form, experiences: newExp}); }} />
                    <Input label="Position" placeholder="Position" value={exp.position} onChange={(e) => { const newExp = [...form.experiences]; newExp[i].position = e.target.value; setForm({...form, experiences: newExp}); }} />
                  </div>
                  {i < form.experiences.length - 1 && <hr className="exp-divider" />}
                </div>
              ))}
              <button type="button" className="add-more-btn" onClick={addExperience}><i className="fas fa-plus-circle"></i> Add more</button>
            </div>

            <div className="form-section">
              <h3>Skills & Position</h3>
              <Input label="Skills" placeholder="eg HTML, CSS, Node.js" value={form.skills} onChange={(e) => setForm({...form, skills: e.target.value})} />
              <div className="form-group">
                <label>Position applying for</label>
                <select className="form-select" value={form.position} onChange={(e) => setForm({...form, position: e.target.value})} style={{ width: '100%', padding: '13px 16px', borderRadius: '12px', border: '1.5px solid var(--border-color)' }}>
                  <option value="">Select position</option>
                  <option>AI Engineer</option><option>Frontend Developer</option><option>Backend Developer</option><option>Project Manager</option><option>UI/UX Designer</option>
                </select>
                {errors.position && <span className="error-message">{errors.position}</span>}
              </div>
            </div>

            {apiError && <div className="error-message" style={{ textAlign: 'center', marginBottom: '12px' }}>{apiError}</div>}

            <Button variant="primary" loading={loading} type="submit" style={{ width: '100%' }}>Next: Upload Documents <i className="fas fa-arrow-right" style={{ marginLeft: '8px' }}></i></Button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}