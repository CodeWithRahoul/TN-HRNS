// pages/interview.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { interviewAPI } from '@/services/api';
import Footer from '@/components/Footer';
import Spinner from '@/components/common/Spinner';

export default function Interview() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const appId = router.query.appId || 'mock-id';
    const fetchData = async () => {
      try {
        const response = await interviewAPI.getDetails(appId);
        setData(response.data);
      } catch (err) {
        setError(err.message || 'Failed to load interview details');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [router.query]);

  if (loading) return <div className="auth-page"><Spinner /></div>;
  if (error) return <div className="auth-page"><div className="error-message">{error}</div></div>;

  const interview = data || {
    date: '18 Jun 2026',
    day: 'Tuesday',
    time: '04:00 PM - 05:00 PM',
    meetLink: 'https://meet.google.com/abc-tgibc-nwl',
    interviewer: 'Mr. Ahmad',
    notes: 'Please have your portfolio ready.'
  };

  return (
    <div className="auth-page">
      <div className="auth-wrapper">
        <div className="auth-card track-card">
          <button className="auth-close" onClick={() => router.push('/track')}><i className="fas fa-times"></i></button>
          <h1 className="auth-welcome" style={{ fontSize: '1.5rem' }}>Interview Details</h1>
          <p className="auth-subtitle">Here are the details of your upcoming interview.</p>

          <div className="interview-details-card">
            <div className="interview-detail-row"><span className="detail-label">Date</span><span className="detail-value">{interview.date}</span></div>
            <div className="interview-detail-row"><span className="detail-label">Day</span><span className="detail-value">{interview.day}</span></div>
            <div className="interview-detail-row"><span className="detail-label">Time</span><span className="detail-value">{interview.time}</span></div>
            <div className="interview-detail-row"><span className="detail-label">Interviewer</span><span className="detail-value">{interview.interviewer}</span></div>
            <div className="interview-detail-row"><span className="detail-label">Meeting Link</span><span className="detail-value"><a href={interview.meetLink} target="_blank" rel="noopener noreferrer" className="meet-link">{interview.meetLink}</a></span></div>
            {interview.notes && (
              <div className="interview-detail-row"><span className="detail-label">Additional Notes</span><span className="detail-value">{interview.notes}</span></div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
            <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => router.push('/track')}><i className="fas fa-arrow-left"></i> Back to Status</button>
            <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => window.open(interview.meetLink, '_blank')}><i className="fas fa-external-link-alt"></i> Join Interview</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}