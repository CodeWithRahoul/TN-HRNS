import { useState } from 'react';
import CEOLayout from '@/components/CEOLayout';
import CEOPageLayout from '@/components/CEOPageLayout';

export default function CEOAnnouncements() {
  const colors = {
    primary: '#00A19A',
    primaryDark: '#00807A',
    primaryLight: '#7FCFC9',
    bg: '#E9F6F5',
    cardBg: '#FFFFFF',
    textDark: '#111318',
    textGray: '#4B4F55',
    textMuted: '#8A9199',
    border: '#111318',
  };

  const announcements = [
    {
      id: 1,
      title: 'Office closed for Independence Day',
      description: 'Trust nexus office will remain closed on Aug 14.',
      source: 'HR',
      time: '2 hrs ago',
      sentTo: 'Sent to all employees',
    },
    {
      id: 2,
      title: 'Monthly Team Meeting',
      description:
        'All employees are requested to attend the Monthly Team Meeting on July 05 at 11:00 AM. The meeting will cover important company updates, ongoing projects, and upcoming activities.',
      source: 'HR',
      time: 'July 15 2026',
      sentTo: 'Sent to all employees',
    },
    {
      id: 3,
      title: 'Office closed for Eid holiday Day',
      description: 'Trust nexus office will remain closed on Jun 06 to Jun 09.',
      source: 'HR',
      time: 'Jun 3 2026',
      sentTo: 'Sent to all employees',
    },
    {
      id: 4,
      title: 'Office Timing Update',
      description:
        'Trust Nexus office timings will be adjusted from 9:00 AM to 5:00 PM, effective July 01. All employees are requested to follow the updated working hours.',
      source: 'HR',
      time: 'May 26 2026',
      sentTo: 'Sent to all employees',
    },
    {
      id: 5,
      title: 'Office Maintenance Notice',
      description:
        'The Trust Nexus office will undergo scheduled maintenance on July 20. Employees are requested to work from home on that day.',
      source: 'HR',
      time: 'May 10 2026',
      sentTo: 'Sent to all employees',
    },
  ];

  return (
    <CEOLayout>
      <CEOPageLayout title="Announcements">
        {/* Announcements Card */}
        <div
          style={{
            background: colors.cardBg,
            border: `1px solid ${colors.border}`,
            borderRadius: '24px',
            padding: '8px 32px',
            maxHeight: '640px',
            overflowY: 'auto',
          }}
        >
          {announcements.map((a, i) => (
            <div
              key={a.id}
              style={{
                padding: '28px 0',
                borderBottom: i !== announcements.length - 1 ? '1px solid #E4E7EA' : 'none',
              }}
            >
              <h3
                style={{
                  margin: '0 0 10px',
                  fontSize: '20px',
                  fontWeight: 700,
                  color: colors.textDark,
                }}
              >
                {a.title}
              </h3>
              <p
                style={{
                  margin: '0 0 12px',
                  fontSize: '15px',
                  color: colors.textGray,
                  lineHeight: 1.6,
                }}
              >
                {a.description}
              </p>
              <div style={{ fontSize: '13px', color: colors.textMuted }}>
                {a.source} &middot; {a.time} &middot; {a.sentTo}
              </div>
            </div>
          ))}
        </div>
      </CEOPageLayout>
    </CEOLayout>
  );
}