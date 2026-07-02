import Layout from '@/components/Layout';

export default function Features() {
  const features = [
    {
      icon: 'fa-users',
      title: 'Unified Employee Management',
      description: 'Manage all employee data, roles, and departments from a single, centralised dashboard.',
    },
    {
      icon: 'fa-project-diagram',
      title: 'Project & Task Tracking',
      description: 'Assign projects, track progress, and monitor deadlines with real‑time updates.',
    },
    {
      icon: 'fa-clock',
      title: 'Attendance & Leave Management',
      description: 'Streamline attendance tracking and leave requests with automated approvals.',
    },
    {
      icon: 'fa-user-plus',
      title: 'Recruitment & Onboarding',
      description: 'Post jobs, review applications, and onboard new hires seamlessly.',
    },
    {
      icon: 'fa-star',
      title: 'Performance Reviews',
      description: 'Conduct transparent performance evaluations and set actionable goals.',
    },
    {
      icon: 'fa-file-invoice-dollar',
      title: 'Payroll Integration (Coming Soon)',
      description: 'Automate payroll calculations and compliance with integrated financial tools.',
    },
  ];

  return (
    <Layout>
      <div className="features-page">
        <div className="container">
          <div className="features-header">
            <h1 className="features-title">Everything You Need to Manage Your Workforce</h1>
            <p className="features-subtitle">
              TN-HRMS brings together essential HR, project, and collaboration tools in one secure platform.
            </p>
          </div>

          <div className="features-grid">
            {features.map((item, index) => (
              <div className="feature-card" key={index}>
                <div className="feature-icon-wrapper">
                  <i className={`fas ${item.icon}`}></i>
                </div>
                <h3 className="feature-card-title">{item.title}</h3>
                <p className="feature-card-desc">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Inline styles for this page – can be moved to globals.css */}
      <style jsx>{`
        .features-page {
          padding: 60px 0 80px;
          position: relative;
          z-index: 1;
        }

        .features-header {
          text-align: center;
          max-width: 700px;
          margin: 0 auto 48px;
        }

        .features-title {
          font-size: 2.4rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .features-subtitle {
          font-size: 1.1rem;
          color: #1f2928;
          line-height: 1.6;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
        }

        .feature-card {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(4px);
          border-radius: 20px;
          padding: 32px 24px;
          text-align: center;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
        }

        .feature-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 48px rgba(0, 66, 61, 0.08);
          border-color: var(--bg-light);
          background: rgba(255, 255, 255, 0.95);
        }

        .feature-icon-wrapper {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 72px;
          height: 72px;
          border-radius: 18px;
          background: linear-gradient(135deg, var(--bg-primary), var(--bg-secondary));
          color: #fff;
          font-size: 2rem;
          margin-bottom: 16px;
        }

        .feature-card-title {
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .feature-card-desc {
          font-size: 0.95rem;
          color: var(--text-muted);
          line-height: 1.6;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .features-title {
            font-size: 1.8rem;
          }
          .features-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 480px) {
          .features-grid {
            grid-template-columns: 1fr;
          }
          .feature-card {
            padding: 24px 16px;
          }
        }
      `}</style>
    </Layout>
  );
}