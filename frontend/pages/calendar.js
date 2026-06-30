import HRLayout from '@/components/HRLayout';

export default function Calendar() {
  const interviews = [
    { candidate: 'Sana Alawari', position: 'AI/3D Designer', date: '25 Jun, 23:00pm', venue: 'Apartment A, Block A', mode: 'Video call' },
    { candidate: 'Younis Alawari', position: 'Business Developer', date: '25 Jun, 4:00pm', venue: 'Block B', mode: 'Email' },
    { candidate: 'Younis Alawari', position: 'QA Engineer', date: '25 Jun, 6:00pm', venue: 'Apartment B', mode: 'Video call' },
    { candidate: 'Younis Alawari', position: 'UI/UX Designer', date: '25 Jun, 9:00pm', venue: 'Apartment C, Block B', mode: 'Video call' },
  ];

  return (
    <HRLayout>
      <div className="calendar-page" style={{ padding: '20px 0' }}>
        <div className="container" style={{ padding: '0 24px' }}>
          <div className="page-header" style={{ marginBottom: '24px' }}>
            <h1 className="page-title" style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>Calendar</h1>
            <p className="page-subtitle" style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>Sera Afsaf · HR</p>
          </div>

          {/* Month View */}
          <div className="calendar-card" style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(4px)', borderRadius: '16px', padding: '24px', border: '1px solid rgba(255,255,255,0.3)', marginBottom: '24px' }}>
            <div className="calendar-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 600, color: 'var(--text-primary)' }}>June 2026</h2>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button className="btn btn-ghost" style={{ padding: '4px 12px' }}>←</button>
                <button className="btn btn-ghost" style={{ padding: '4px 12px' }}>→</button>
              </div>
            </div>
            <div className="calendar-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: '4px' }}>
              {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (
                <div key={d} className="calendar-day-header" style={{ fontWeight: 600, color: 'var(--text-muted)', textAlign: 'center', padding: '8px 0' }}>{d}</div>
              ))}
              {[31,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,1,2,3,4].map((d,i) => (
                <div key={i} className={`calendar-day ${d === 25 ? 'has-event' : ''}`} style={{ textAlign: 'center', padding: '8px 0', borderRadius: '8px', color: 'var(--text-dark)', background: d === 25 ? 'var(--bg-light)' : 'transparent', fontWeight: d === 25 ? 600 : 'normal' }}>
                  {d}
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Interviews */}
          <div className="dashboard-card" style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(4px)', borderRadius: '16px', padding: '24px', border: '1px solid rgba(255,255,255,0.3)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '12px' }}>Upcoming Interviews</h3>
            <table className="interview-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '8px 0', color: 'var(--text-muted)', borderBottom: '1px solid #f0f3f2' }}>Candidates</th>
                  <th style={{ textAlign: 'left', padding: '8px 0', color: 'var(--text-muted)', borderBottom: '1px solid #f0f3f2' }}>Positions</th>
                  <th style={{ textAlign: 'left', padding: '8px 0', color: 'var(--text-muted)', borderBottom: '1px solid #f0f3f2' }}>Dates & Times</th>
                  <th style={{ textAlign: 'left', padding: '8px 0', color: 'var(--text-muted)', borderBottom: '1px solid #f0f3f2' }}>Venues</th>
                  <th style={{ textAlign: 'left', padding: '8px 0', color: 'var(--text-muted)', borderBottom: '1px solid #f0f3f2' }}>Mode</th>
                </tr>
              </thead>
              <tbody>
                {interviews.map((item, i) => (
                  <tr key={i}>
                    <td style={{ padding: '10px 0', borderBottom: '1px solid #f0f3f2', color: 'var(--text-dark)' }}>{item.candidate}</td>
                    <td style={{ padding: '10px 0', borderBottom: '1px solid #f0f3f2', color: 'var(--text-dark)' }}>{item.position}</td>
                    <td style={{ padding: '10px 0', borderBottom: '1px solid #f0f3f2', color: 'var(--text-dark)' }}>{item.date}</td>
                    <td style={{ padding: '10px 0', borderBottom: '1px solid #f0f3f2', color: 'var(--text-dark)' }}>{item.venue}</td>
                    <td style={{ padding: '10px 0', borderBottom: '1px solid #f0f3f2', color: 'var(--text-dark)' }}>{item.mode}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </HRLayout>
  );
}