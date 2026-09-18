import CFOLayout from '@/components/CFOLayout';
import CFOPageLayout from '@/components/CFOPageLayout';

export default function CFOReports() {
  return (
    <CFOLayout>
      <CFOPageLayout title="Reports">
        <div style={{
          background: '#fff',
          border: '1px solid #000',
          borderRadius: '16px',
          padding: '40px 24px',
          textAlign: 'center',
        }}>
          <i className="fas fa-chart-line" style={{ fontSize: '48px', color: '#00A19A', marginBottom: '16px' }} />
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1A1A1A', margin: '0 0 8px 0' }}>Reports</h2>
          <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>Company-wide financial reports will appear here.</p>
        </div>
      </CFOPageLayout>
    </CFOLayout>
  );
}