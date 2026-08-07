import FDLayout from '@/components/FDLayout';
import FDPageLayout from '@/components/FDPageLayout';

export default function FDLeaveManagement() {
  return (
    <FDLayout>
      <FDPageLayout title="Leave Management">
        <div style={{ padding: '20px', background: '#fff', borderRadius: '16px', border: '1px solid #e2e8e8' }}>
          <h2>Leave Management</h2>
          <p>Frontend Developer leave requests.</p>
        </div>
      </FDPageLayout>
    </FDLayout>
  );
}