import TLLayout from '@/components/TLLayout';
import TLPageLayout from '@/components/TLPageLayout';

export default function TLProjects() {
  return (
    <TLLayout>
      <TLPageLayout title="Projects">
        <div style={{ padding: '20px', background: '#fff', borderRadius: '16px', border: '1px solid #e2e8e8' }}>
          <h2>Team Lead Projects</h2>
          <p>Manage projects and team assignments.</p>
        </div>
      </TLPageLayout>
    </TLLayout>
  );
}