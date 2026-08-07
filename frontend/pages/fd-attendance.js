import FDLayout from '@/components/FDLayout';
import FDPageLayout from '@/components/FDPageLayout';

export default function FDAttendance() {
  return (
    <FDLayout>
      <FDPageLayout title="Attendance">
        <div style={{ padding: '20px', background: '#fff', borderRadius: '16px', border: '1px solid #e2e8e8' }}>
          <h2>Attendance</h2>
          <p>Frontend Developer attendance page.</p>
        </div>
      </FDPageLayout>
    </FDLayout>
  );
}