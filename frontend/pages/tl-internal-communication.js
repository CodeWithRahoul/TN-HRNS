import TLLayout from '@/components/TLLayout';
import TLPageLayout from '@/components/TLPageLayout';

export default function TLInternalCommunication() {
  return (
    <TLLayout>
      <TLPageLayout title="Internal Communication">
        <div style={{ padding: '20px', background: '#fff', borderRadius: '16px', border: '1px solid #e2e8e8' }}>
          <h2>Team Lead Internal Communication</h2>
          <p>Team communication hub.</p>
        </div>
      </TLPageLayout>
    </TLLayout>
  );
}