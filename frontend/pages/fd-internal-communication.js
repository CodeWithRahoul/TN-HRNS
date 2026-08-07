import FDLayout from '@/components/FDLayout';
import FDPageLayout from '@/components/FDPageLayout';

export default function FDInternalCommunication() {
  return (
    <FDLayout>
      <FDPageLayout title="Internal Communication">
        <div style={{ padding: '20px', background: '#fff', borderRadius: '16px', border: '1px solid #e2e8e8' }}>
          <h2>Internal Communication</h2>
          <p>Frontend Developer communication hub.</p>
        </div>
      </FDPageLayout>
    </FDLayout>
  );
}