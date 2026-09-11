import { useState } from 'react';
import CEOLayout from '@/components/CEOLayout';
import CEOPageLayout from '@/components/CEOPageLayout';

export default function CEOProjects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeTab, setActiveTab] = useState('Overview');
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [milestoneCommentText, setMilestoneCommentText] = useState('');
  const [seniorMessageText, setSeniorMessageText] = useState('');

  const handleBackToProjects = () => {
    setSelectedProject(null);
    setSelectedTask(null);
    setSelectedMilestone(null);
    setActiveTab('Overview');
  };

  const handleViewProject = (projectId) => {
    const project = projects.find((p) => p.id === projectId);
    setSelectedProject(project);
    setActiveTab('Overview');
  };

  const handleViewTask = (task) => setSelectedTask(task);
  const closeTaskDetail = () => setSelectedTask(null);

  const handleViewMilestone = (milestone) => setSelectedMilestone(milestone);
  const closeMilestoneDetail = () => {
    setSelectedMilestone(null);
    setMilestoneCommentText('');
  };
  const handlePostMilestoneComment = () => {
    console.log('New comment on', selectedMilestone?.title, ':', milestoneCommentText);
    setMilestoneCommentText('');
  };
  const handleSendSeniorMessage = (recipient) => {
    console.log('Message to', recipient, ':', seniorMessageText);
    setSeniorMessageText('');
  };

  const colors = {
    primary: '#00A19A',
    primaryDark: '#008a84',
    primaryLight: '#E6F5F4',
    border: '#000000',
    textDark: '#1A1A1A',
    textGray: '#666666',
    textMuted: '#8a8f98',
    bg: '#F4FBFB',
    cardBg: '#FFFFFF',
    tableHeaderBg: '#2C3E50',
    statusOnTrack: '#1FA25A',
  };

  const avatarColors = {
    'BA': '#3B5BDB',
    'SK': '#F4B400',
    'TR': '#2FBF71',
    'AR': '#E8483E',
    'RK': '#8B5CF6',
    'HJ': '#F97316',
  };

  const priorityColors = {
    'Low': { bg: '#FDEDD3', text: '#C98A2C', dot: '#E0A63C' },
    'Medium': { bg: '#DBEAFE', text: '#2563EB', dot: '#3B82F6' },
    'High': { bg: '#FBDADA', text: '#D64545', dot: '#E24C4C' },
  };

  const progressColors = {
    'To do': { bg: '#F3F4F6', text: '#6B7280', dot: '#9CA3AF' },
    'In progress': { bg: '#FDEDD3', text: '#C98A2C', dot: '#F59E0B' },
    'In review': { bg: '#FEF3C7', text: '#D97706', dot: '#F59E0B' },
    'Done': { bg: '#D1FAE5', text: '#059669', dot: '#10B981' },
  };

  // ── Seniors the CEO can message from a project's Overview tab ──
  const seniors = [
    { key: 'CTO', label: 'CTO', initials: 'CTO', color: '#3B5BDB' },
    { key: 'HR', label: 'HR', initials: 'HR', color: '#F4B400' },
  ];

  const projects = [
    {
      id: 1,
      title: 'Nexovate Portal',
      subtitle: 'Client-developer portal · AI scope reports',
      description: 'Nexovate is an AI-powered platform that helps non-technical clients transform their ideas into structured software projects. By answering AI-generated multiple-choice questions, clients receive a detailed project scope document that is published on the platform. Developers can browse and choose projects that match their expertise, while Nexovate manages project documentation, administration, and secure payment processing to ensure a smooth and organized experience.',
      status: 'On track',
      startDate: '7 Jun 2026',
      endDate: '24 Jul 2026',
      team: [
        { initials: 'BA', name: 'Bilal ahmed', role: 'Project Manager' },
        { initials: 'RK', name: 'Raheel khan', role: 'Team lead' },
        { initials: 'SK', name: 'Sara kareem', role: 'UI/UX designer' },
        { initials: 'TR', name: 'Sara afzal', role: 'Frontend developer' },
        { initials: 'AR', name: 'Abdul rehman', role: 'Backend developer' },
        { initials: 'HJ', name: 'Hafeez jamil', role: 'AI engineer' },
      ],
      submittedTasks: [
        {
          title: 'Design high-fidelity UI screens',
          submittedBy: 'Sara kareem',
          role: 'UI/UX designer',
          type: 'Design',
          assignee: 'Sara kareem',
          priority: 'Medium',
          dueDate: '30 May 2026',
          description: 'High-fidelity UI screens for the client portal covering onboarding, scoping, and dashboard flows.',
          attachments: [{ name: 'ui-screens.fig', size: '18 MB' }],
          progressPercentage: 100,
          progress: 'Done',
          subtasks: [
            { text: 'Onboarding screens', done: true },
            { text: 'Dashboard screens', done: true },
            { text: 'Review with dev team', done: true },
          ],
        },
        {
          title: 'Prepare design system & components',
          submittedBy: 'Sara kareem',
          role: 'UI/UX designer',
          type: 'Design',
          assignee: 'Sara kareem',
          priority: 'Medium',
          dueDate: '5 Jul 2026',
          description: 'Reusable component library and style guide for the frontend team to build against.',
          attachments: [{ name: 'design-system.fig', size: '22 MB' }],
          progressPercentage: 100,
          progress: 'Done',
          subtasks: [
            { text: 'Colors & typography', done: true },
            { text: 'Component set', done: true },
          ],
        },
        {
          title: 'Implement Figma designs',
          submittedBy: 'Bilal ahmed',
          role: 'Frontend dev',
          type: 'Frontend',
          assignee: 'Sara afzal',
          priority: 'High',
          dueDate: '25 Mar 2026',
          description: 'Convert Figma designs for the home, login, and signup pages into working React components.',
          attachments: [{ name: 'frontend-notes.pdf', size: '4 MB' }],
          progressPercentage: 100,
          progress: 'Done',
          subtasks: [
            { text: 'Home page', done: true },
            { text: 'Login/Signup pages', done: true },
          ],
        },
        {
          title: 'Design database schema',
          submittedBy: 'Abdul rehman',
          role: 'Backend dev',
          type: 'Backend',
          assignee: 'Abdul rehman',
          priority: 'High',
          dueDate: '1 Jul 2026',
          description: 'Database schema covering users, projects, scope documents, and payments.',
          attachments: [{ name: 'schema.sql', size: '1 MB' }],
          progressPercentage: 90,
          progress: 'In review',
          subtasks: [
            { text: 'Entity design', done: true },
            { text: 'Migrations', done: true },
            { text: 'Review with team lead', done: false },
          ],
        },
      ],
      milestones: [
        {
          title: 'Discovery & scoping',
          status: 'Completed',
          startDate: '20 May 2026',
          endDate: '2 Jun 2026',
          assignees: ['Bilal Rauf', 'Rehan Naqvi'],
          progress: 100,
          description: 'Gather client requirements and define the overall project scope.',
          deliverables: ['Requirement doc', 'Scope document', 'Client approval'],
          completedItems: [],
          comments: 3,
          tasks: [
            { title: 'Client interviews', description: 'Collect requirements from client', status: 'Completed', completion: 100, startDate: '20 May 2026', endDate: '24 May 2026', assignee: 'Bilal Rauf' },
            { title: 'Scope document', description: 'Draft the detailed scope document', status: 'Completed', completion: 100, startDate: '25 May 2026', endDate: '30 May 2026', assignee: 'Rehan Naqvi' },
            { title: 'Client approval', description: 'Get sign-off from client', status: 'Completed', completion: 100, startDate: '31 May 2026', endDate: '2 Jun 2026', assignee: 'Bilal Rauf' },
          ],
          commentsList: [
            { author: 'Bilal Rauf', date: '2 Jun 2026, 11:00 AM', text: 'Scope document approved by client.' },
          ],
        },
        {
          title: 'UI/UX designing',
          status: 'Completed',
          startDate: '3 Jun 2026',
          endDate: '5 Jul 2026',
          assignees: ['Sara Kareem'],
          progress: 100,
          description: 'Design wireframes, UI mockups and a consistent design system.',
          deliverables: ['Wireframes', 'UI mockups', 'Design system'],
          completedItems: [],
          comments: 5,
          tasks: [
            { title: 'Wireframes', description: 'Low-fidelity wireframes for all pages', status: 'Completed', completion: 100, startDate: '3 Jun 2026', endDate: '12 Jun 2026', assignee: 'Sara Kareem' },
            { title: 'UI mockups', description: 'High-fidelity mockups', status: 'Completed', completion: 100, startDate: '13 Jun 2026', endDate: '28 Jun 2026', assignee: 'Sara Kareem' },
            { title: 'Design system', description: 'Reusable components and style guide', status: 'Completed', completion: 100, startDate: '29 Jun 2026', endDate: '5 Jul 2026', assignee: 'Sara Kareem' },
          ],
          commentsList: [
            { author: 'Sara Kareem', date: '5 Jul 2026, 4:00 PM', text: 'Design system finalized and shared with dev team.' },
          ],
        },
        {
          title: 'Frontend development',
          status: 'In progress',
          startDate: '12 Mar 2026',
          endDate: '15 May 2026',
          assignees: ['Hamza Jamali', 'Faisal Khalid'],
          progress: 30,
          description: 'Build the client-facing pages and core UI screens.',
          deliverables: [],
          completedItems: ['Home page', 'Login/Sign up'],
          comments: 4,
          tasks: [
            { title: 'Home page', description: 'Main landing page for the portal', status: 'Completed', completion: 100, startDate: '12 Mar 2026', endDate: '25 Mar 2026', assignee: 'Abdul Rehman' },
            { title: 'Login page', description: 'User login with validation', status: 'Completed', completion: 100, startDate: '16 Mar 2026', endDate: '28 Mar 2026', assignee: 'Hassan Ali' },
            { title: 'Signup page', description: 'User registration and verification', status: 'Completed', completion: 100, startDate: '20 Mar 2026', endDate: '2 Apr 2026', assignee: 'Usman Khan' },
            { title: 'Dashboard (Main)', description: 'Overview dashboard for users', status: 'In Progress', completion: 40, startDate: '26 Mar 2026', endDate: '20 Apr 2026', assignee: 'Sara Afzal' },
            { title: 'Project listing page', description: 'List all projects with filters', status: 'Pending', completion: 0, startDate: '5 Apr 2026', endDate: '18 Apr 2026', assignee: 'Bilal Ahmed' },
            { title: 'Project details page', description: 'Detailed view of a project', status: 'Pending', completion: 0, startDate: '10 Apr 2026', endDate: '25 Apr 2026', assignee: 'Hamza Jamali' },
            { title: 'Settings page', description: 'User profile and preferences', status: 'Pending', completion: 0, startDate: '20 Apr 2026', endDate: '30 Apr 2026', assignee: 'Faisal Khalid' },
            { title: 'Notifications page', description: 'Manage user notifications', status: 'On Hold', completion: 0, startDate: '15 Apr 2026', endDate: '29 Apr 2026', assignee: 'Ali Raza' },
          ],
          commentsList: [
            { author: 'Faisal Khalid', date: '2 May 2026, 10:30 AM', text: 'Dashboard UI is 40% complete. Charts integration is in progress.' },
          ],
        },
        {
          title: 'API integration',
          status: 'Pending',
          startDate: '16 May 2026',
          endDate: '20 Jun 2026',
          assignees: ['Hamza Jamali', 'Faisal Khalid'],
          progress: 0,
          description: 'Connect frontend to backend services and validate data flow.',
          deliverables: ['API connections', 'Data mapping', 'Integration tests'],
          completedItems: [],
          comments: 0,
          tasks: [
            { title: 'API connections', description: 'Connect all frontend calls to APIs', status: 'Pending', completion: 0, startDate: '16 May 2026', endDate: '30 May 2026', assignee: 'Hamza Jamali' },
            { title: 'Data mapping', description: 'Map API responses to UI models', status: 'Pending', completion: 0, startDate: '1 Jun 2026', endDate: '12 Jun 2026', assignee: 'Faisal Khalid' },
            { title: 'Integration tests', description: 'Test end-to-end data flow', status: 'Pending', completion: 0, startDate: '13 Jun 2026', endDate: '20 Jun 2026', assignee: 'Hamza Jamali' },
          ],
          commentsList: [],
        },
        {
          title: 'Backend development',
          status: 'Pending',
          startDate: '21 Jun 2026',
          endDate: '25 Jul 2026',
          assignees: ['Hamza Jamali', 'Faisal Khalid'],
          progress: 0,
          description: 'Set up database schema and build core backend logic.',
          deliverables: ['Database setup', 'Core logic', 'Admin APIs'],
          completedItems: [],
          comments: 0,
          tasks: [
            { title: 'Database setup', description: 'Design and set up schema', status: 'Pending', completion: 0, startDate: '21 Jun 2026', endDate: '1 Jul 2026', assignee: 'Hamza Jamali' },
            { title: 'Core logic', description: 'Implement business logic', status: 'Pending', completion: 0, startDate: '2 Jul 2026', endDate: '15 Jul 2026', assignee: 'Faisal Khalid' },
            { title: 'Admin APIs', description: 'Build admin-facing endpoints', status: 'Pending', completion: 0, startDate: '16 Jul 2026', endDate: '25 Jul 2026', assignee: 'Hamza Jamali' },
          ],
          commentsList: [],
        },
        {
          title: 'Testing',
          status: 'Pending',
          startDate: '26 Jul 2026',
          endDate: '7 Aug 2026',
          assignees: ['Hamza Jamali', 'Faisal Khalid'],
          progress: 0,
          description: 'Run QA test cases, fix bugs, and complete user acceptance testing.',
          deliverables: ['Test cases', 'Bug fixing', 'UAT'],
          completedItems: [],
          comments: 0,
          tasks: [
            { title: 'Test cases', description: 'Write test cases for all modules', status: 'Pending', completion: 0, startDate: '26 Jul 2026', endDate: '31 Jul 2026', assignee: 'Hamza Jamali' },
            { title: 'Bug fixing', description: 'Fix issues found during testing', status: 'Pending', completion: 0, startDate: '1 Aug 2026', endDate: '5 Aug 2026', assignee: 'Faisal Khalid' },
            { title: 'UAT', description: 'User acceptance testing with client', status: 'Pending', completion: 0, startDate: '6 Aug 2026', endDate: '7 Aug 2026', assignee: 'Hamza Jamali' },
          ],
          commentsList: [],
        },
      ],
    },
    {
      id: 2,
      title: 'TN - HRMS',
      subtitle: 'Unified HR & project management system',
      description: 'TN-HRMS is a comprehensive human resource management system that streamlines employee onboarding, leave tracking, attendance management, and performance reviews. The platform provides role-based dashboards for HR, project managers, and employees, with real-time analytics and reporting capabilities.',
      status: 'On track',
      startDate: '2 Feb 2026',
      endDate: '30 Sep 2026',
      team: [
        { initials: 'BA', name: 'Bilal ahmed', role: 'Project Manager' },
        { initials: 'SK', name: 'Sara kareem', role: 'UI/UX designer' },
        { initials: 'TR', name: 'Tehreem raja', role: 'Frontend developer' },
        { initials: 'AR', name: 'Abdul rehman', role: 'Backend developer' },
      ],
      submittedTasks: [
        {
          title: 'Employee onboarding module',
          submittedBy: 'Tehreem raja',
          role: 'Frontend dev',
          type: 'Frontend',
          assignee: 'Tehreem raja',
          priority: 'High',
          dueDate: '20 Apr 2026',
          description: 'Onboarding flow for new employees including document upload and profile setup.',
          attachments: [{ name: 'onboarding-flow.pdf', size: '5 MB' }],
          progressPercentage: 100,
          progress: 'Done',
          subtasks: [
            { text: 'Profile setup form', done: true },
            { text: 'Document upload', done: true },
          ],
        },
        {
          title: 'Attendance tracking APIs',
          submittedBy: 'Abdul rehman',
          role: 'Backend dev',
          type: 'Backend',
          assignee: 'Abdul rehman',
          priority: 'Medium',
          dueDate: '10 May 2026',
          description: 'Backend APIs for check-in/check-out and attendance reports.',
          attachments: [{ name: 'attendance-api.pdf', size: '3 MB' }],
          progressPercentage: 100,
          progress: 'Done',
          subtasks: [
            { text: 'Check-in/out endpoints', done: true },
            { text: 'Report generation', done: true },
          ],
        },
      ],
      milestones: [
        {
          title: 'HRMS Planning',
          status: 'Completed',
          startDate: '2 Feb 2026',
          endDate: '20 Feb 2026',
          assignees: ['Bilal Ahmed'],
          progress: 100,
          description: 'Define project charter and finalize HRMS scope.',
          deliverables: ['Project charter', 'Scope document'],
          completedItems: [],
          comments: 2,
          tasks: [
            { title: 'Project charter', description: 'Draft project charter', status: 'Completed', completion: 100, startDate: '2 Feb 2026', endDate: '10 Feb 2026', assignee: 'Bilal Ahmed' },
            { title: 'Scope document', description: 'Finalize scope with stakeholders', status: 'Completed', completion: 100, startDate: '11 Feb 2026', endDate: '20 Feb 2026', assignee: 'Bilal Ahmed' },
          ],
          commentsList: [],
        },
        {
          title: 'UI/UX Design',
          status: 'Completed',
          startDate: '21 Feb 2026',
          endDate: '30 Mar 2026',
          assignees: ['Sara Koreem'],
          progress: 100,
          description: 'Design wireframes and UI mockups for all HRMS dashboards.',
          deliverables: ['Wireframes', 'UI mockups'],
          completedItems: [],
          comments: 4,
          tasks: [
            { title: 'Wireframes', description: 'Low-fidelity wireframes', status: 'Completed', completion: 100, startDate: '21 Feb 2026', endDate: '10 Mar 2026', assignee: 'Sara Koreem' },
            { title: 'UI mockups', description: 'High-fidelity dashboard mockups', status: 'Completed', completion: 100, startDate: '11 Mar 2026', endDate: '30 Mar 2026', assignee: 'Sara Koreem' },
          ],
          commentsList: [],
        },
        {
          title: 'Development',
          status: 'Completed',
          startDate: '1 Apr 2026',
          endDate: '30 Jun 2026',
          assignees: ['Tehreem Raja', 'Abdul rehman'],
          progress: 100,
          description: 'Build employee, attendance, and leave management modules.',
          deliverables: ['Employee module', 'Attendance module', 'Leave management'],
          completedItems: [],
          comments: 6,
          tasks: [
            { title: 'Employee module', description: 'Employee onboarding and records', status: 'Completed', completion: 100, startDate: '1 Apr 2026', endDate: '20 Apr 2026', assignee: 'Tehreem Raja' },
            { title: 'Attendance module', description: 'Attendance tracking system', status: 'Completed', completion: 100, startDate: '21 Apr 2026', endDate: '10 May 2026', assignee: 'Abdul rehman' },
            { title: 'Leave management', description: 'Leave requests and approvals', status: 'Completed', completion: 100, startDate: '11 May 2026', endDate: '30 Jun 2026', assignee: 'Tehreem Raja' },
          ],
          commentsList: [],
        },
        {
          title: 'Testing',
          status: 'Completed',
          startDate: '1 Jul 2026',
          endDate: '30 Sep 2026',
          assignees: ['Bilal Ahmed'],
          progress: 100,
          description: 'Execute test cases and get sign-off through UAT.',
          deliverables: ['Test cases', 'UAT sign-off'],
          completedItems: [],
          comments: 0,
          tasks: [
            { title: 'Test cases', description: 'Write and execute test cases', status: 'Completed', completion: 100, startDate: '1 Jul 2026', endDate: '31 Jul 2026', assignee: 'Bilal Ahmed' },
            { title: 'UAT sign-off', description: 'Client acceptance testing', status: 'Completed', completion: 100, startDate: '1 Aug 2026', endDate: '30 Sep 2026', assignee: 'Bilal Ahmed' },
          ],
          commentsList: [],
        },
      ],
    },
    {
      id: 3,
      title: 'Marketing Site Refresh',
      subtitle: 'Public landing page & brand refresh',
      description: 'A complete refresh of the company\'s public-facing marketing website. The project includes a new brand identity, responsive landing pages, SEO optimization, and integration with the company\'s CMS. The goal is to increase engagement and conversion rates.',
      status: 'At risk',
      startDate: '10 Jan 2026',
      endDate: '15 May 2026',
      team: [
        { initials: 'BA', name: 'Bilal ahmed', role: 'Project Manager' },
        { initials: 'SK', name: 'Sara kareem', role: 'UI/UX designer' },
        { initials: 'TR', name: 'Tehreem raja', role: 'Frontend developer' },
        { initials: 'AR', name: 'Abdul rehman', role: 'Backend developer' },
      ],
      submittedTasks: [
        {
          title: 'Brand moodboard',
          submittedBy: 'Sara kareem',
          role: 'UI/UX designer',
          type: 'Design',
          assignee: 'Sara kareem',
          priority: 'Low',
          dueDate: '25 Jan 2026',
          description: 'Visual moodboard exploring the new brand direction.',
          attachments: [{ name: 'moodboard.pdf', size: '6 MB' }],
          progressPercentage: 100,
          progress: 'Done',
          subtasks: [
            { text: 'Color exploration', done: true },
            { text: 'Typography exploration', done: true },
          ],
        },
      ],
      milestones: [
        {
          title: 'Brand Discovery',
          status: 'Completed',
          startDate: '10 Jan 2026',
          endDate: '25 Jan 2026',
          assignees: ['Sara Koreem'],
          progress: 100,
          description: 'Explore brand direction and put together the visual moodboard.',
          deliverables: ['Brand brief', 'Moodboard'],
          completedItems: [],
          comments: 1,
          tasks: [
            { title: 'Brand brief', description: 'Define brand direction', status: 'Completed', completion: 100, startDate: '10 Jan 2026', endDate: '18 Jan 2026', assignee: 'Sara Koreem' },
            { title: 'Moodboard', description: 'Visual moodboard for new brand', status: 'Completed', completion: 100, startDate: '19 Jan 2026', endDate: '25 Jan 2026', assignee: 'Sara Koreem' },
          ],
          commentsList: [],
        },
        {
          title: 'Design Phase',
          status: 'Completed',
          startDate: '26 Jan 2026',
          endDate: '28 Feb 2026',
          assignees: ['Sara Koreem'],
          progress: 100,
          description: 'Design the new homepage and key landing pages.',
          deliverables: ['Homepage design', 'Landing page design'],
          completedItems: [],
          comments: 3,
          tasks: [
            { title: 'Homepage design', description: 'New homepage layout', status: 'Completed', completion: 100, startDate: '26 Jan 2026', endDate: '10 Feb 2026', assignee: 'Sara Koreem' },
            { title: 'Landing page design', description: 'Campaign landing pages', status: 'Completed', completion: 100, startDate: '11 Feb 2026', endDate: '28 Feb 2026', assignee: 'Sara Koreem' },
          ],
          commentsList: [],
        },
        {
          title: 'Development',
          status: 'Completed',
          startDate: '1 Mar 2026',
          endDate: '30 Apr 2026',
          assignees: ['Tehreem Raja', 'Abdul rehman'],
          progress: 100,
          description: 'Set up the CMS and build the responsive site.',
          deliverables: ['CMS setup', 'Responsive build'],
          completedItems: [],
          comments: 0,
          tasks: [
            { title: 'CMS setup', description: 'Configure content management system', status: 'Completed', completion: 100, startDate: '1 Mar 2026', endDate: '15 Mar 2026', assignee: 'Abdul rehman' },
            { title: 'Responsive build', description: 'Build responsive frontend', status: 'Completed', completion: 100, startDate: '16 Mar 2026', endDate: '30 Apr 2026', assignee: 'Tehreem Raja' },
          ],
          commentsList: [],
        },
        {
          title: 'Launch',
          status: 'Completed',
          startDate: '1 May 2026',
          endDate: '15 May 2026',
          assignees: ['Bilal Ahmed'],
          progress: 100,
          description: 'Finalize go-live checklist and SEO handoff before launch.',
          deliverables: ['Go-live checklist', 'SEO handoff'],
          completedItems: [],
          comments: 0,
          tasks: [
            { title: 'Go-live checklist', description: 'Final pre-launch checklist', status: 'Completed', completion: 100, startDate: '1 May 2026', endDate: '10 May 2026', assignee: 'Bilal Ahmed' },
            { title: 'SEO handoff', description: 'Handoff SEO report to marketing', status: 'Completed', completion: 100, startDate: '11 May 2026', endDate: '15 May 2026', assignee: 'Abdul rehman' },
          ],
          commentsList: [],
        },
      ],
    },
  ];

  // A project is "completed" once every milestone in it is Completed.
  const isProjectCompleted = (project) =>
    project.milestones && project.milestones.length > 0 &&
    project.milestones.every((m) => m.status === 'Completed');

  const activeProjects = projects.filter((p) => !isProjectCompleted(p));
  const completedProjects = projects.filter((p) => isProjectCompleted(p));

  const tabs = ['Overview', 'Tasks submitted', 'Milestones'];

  const getInitials = (name) => name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
  const initialsPalette = ['#3B5BDB', '#F4B400', '#2FBF71', '#E8483E', '#8B5CF6', '#F97316', '#0EA5E9', '#DB2777'];
  const colorForName = (name) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return initialsPalette[Math.abs(hash) % initialsPalette.length];
  };

  // ─── MILESTONE DETAIL VIEW ──────────────────────────────────────────
  if (selectedProject && selectedMilestone) {
    const milestoneStatusColors = {
      'Completed': { bg: '#D1FAE5', text: '#059669', dot: '#10B981' },
      'In Progress': { bg: '#DBEAFE', text: '#2563EB', dot: '#3B82F6' },
      'Pending': { bg: '#F3F4F6', text: '#6B7280', dot: '#9CA3AF' },
      'On Hold': { bg: '#FEF3C7', text: '#C98A2C', dot: '#F59E0B' },
    };
    const taskBarColor = (status) =>
      status === 'Completed' ? '#10B981' :
      status === 'In Progress' ? '#3B82F6' :
      status === 'On Hold' ? '#F59E0B' : '#D1D5DB';

    const msc = milestoneStatusColors[selectedMilestone.status] || milestoneStatusColors['Pending'];
    const totalTasks = selectedMilestone.tasks ? selectedMilestone.tasks.length : 0;
    const completedTasks = selectedMilestone.tasks ? selectedMilestone.tasks.filter((t) => t.status === 'Completed').length : 0;

    return (
      <CEOLayout>
        <CEOPageLayout title={selectedMilestone.title}>
          <div style={{ marginBottom: '16px' }}>
            <button
              onClick={closeMilestoneDetail}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'transparent', color: colors.textGray, border: 'none', fontSize: '14px', fontWeight: 500, cursor: 'pointer', fontFamily: "'Poppins', sans-serif", padding: '8px 0' }}
            >
              <i className="fas fa-arrow-left" style={{ fontSize: '13px' }} />
              Back to Milestones
            </button>
          </div>

          {/* Tabs (kept for navigation consistency) */}
          <div style={{ display: 'flex', gap: 'clamp(12px, 2vw, 28px)', borderBottom: `1px solid ${colors.border}`, marginBottom: '24px', overflowX: 'auto' }}>
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => { setSelectedMilestone(null); setActiveTab(tab); }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  padding: '10px 4px',
                  fontSize: '13px',
                  fontWeight: tab === 'Milestones' ? 600 : 500,
                  color: tab === 'Milestones' ? colors.primary : colors.textGray,
                  borderBottom: tab === 'Milestones' ? `3px solid ${colors.primary}` : '3px solid transparent',
                  cursor: 'pointer',
                  fontFamily: "'Poppins', sans-serif",
                  whiteSpace: 'nowrap',
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tasks table */}
          <div style={{ background: colors.cardBg, border: `1px solid ${colors.border}`, borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', marginBottom: '20px' }}>
            <div style={{ overflowX: 'auto' }}>
              <div style={{ minWidth: '780px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr 1.3fr 1fr 1fr 1.1fr', padding: '10px clamp(20px, 3vw, 28px)', background: colors.tableHeaderBg }}>
                  {['Task', 'Status', 'Completion', 'Start Date', 'End Date', 'Assignee'].map((h) => (
                    <div key={h} style={{ fontSize: '11.5px', fontWeight: 600, color: '#fff', letterSpacing: '0.5px', textTransform: 'uppercase' }}>{h}</div>
                  ))}
                </div>

                {selectedMilestone.tasks && selectedMilestone.tasks.length > 0 ? (
                  selectedMilestone.tasks.map((task, idx) => {
                    const tsc = milestoneStatusColors[task.status] || milestoneStatusColors['Pending'];
                    const avColor = colorForName(task.assignee);
                    return (
                      <div
                        key={idx}
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '1.8fr 1fr 1.3fr 1fr 1fr 1.1fr',
                          padding: '14px clamp(20px, 3vw, 28px)',
                          borderTop: '1px solid #F0F1F3',
                          alignItems: 'center',
                          background: task.status === 'On Hold' ? '#FFFBEB' : (idx % 2 === 0 ? colors.cardBg : '#FAFBFC'),
                        }}
                      >
                        <div>
                          <div style={{ fontSize: '13.5px', fontWeight: 600, color: colors.textDark }}>{task.title}</div>
                          <div style={{ fontSize: '12px', color: colors.textGray, marginTop: '2px' }}>{task.description}</div>
                        </div>
                        <div>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: tsc.bg, color: tsc.text, fontSize: '11.5px', fontWeight: 600, padding: '4px 12px', borderRadius: '20px' }}>
                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: tsc.dot, display: 'inline-block' }} />
                            {task.status}
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ flex: 1, height: '6px', background: '#E5E7EB', borderRadius: '3px', overflow: 'hidden' }}>
                            <div style={{ width: `${task.completion}%`, height: '100%', background: taskBarColor(task.status), borderRadius: '3px' }} />
                          </div>
                          <span style={{ fontSize: '12px', fontWeight: 600, color: colors.textDark, minWidth: '32px' }}>{task.completion}%</span>
                        </div>
                        <div style={{ fontSize: '13px', color: colors.textDark }}>{task.startDate}</div>
                        <div style={{ fontSize: '13px', color: colors.textDark }}>{task.endDate}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: avColor, color: '#fff', fontSize: '9.5px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            {getInitials(task.assignee)}
                          </div>
                          <span style={{ fontSize: '12.5px', color: colors.textDark }}>{task.assignee}</span>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div style={{ padding: '40px 20px', textAlign: 'center', color: colors.textMuted }}>
                    <i className="fas fa-clipboard-list" style={{ fontSize: '28px', display: 'block', marginBottom: '10px' }} />
                    No tasks added for this milestone yet.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Comments */}
          <div style={{ background: colors.cardBg, border: `1px solid ${colors.border}`, borderRadius: '16px', padding: 'clamp(20px, 3vw, 28px)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: colors.textDark, margin: '0 0 16px 0' }}>
              Comments {selectedMilestone.commentsList && selectedMilestone.commentsList.length > 0 && (
                <span style={{ color: colors.textGray, fontWeight: 500 }}>({selectedMilestone.commentsList.length})</span>
              )}
            </h3>

            <div style={{ display: 'flex', gap: '10px', marginBottom: '22px' }}>
              <input
                type="text"
                value={milestoneCommentText}
                onChange={(e) => setMilestoneCommentText(e.target.value)}
                placeholder="Write a comment..."
                style={{ flex: 1, padding: '11px 16px', border: `1px solid ${colors.border}`, borderRadius: '10px', fontSize: '13.5px', outline: 'none', fontFamily: "'Poppins', sans-serif", background: colors.bg }}
              />
              <button
                onClick={handlePostMilestoneComment}
                style={{ background: colors.primary, color: '#fff', border: 'none', borderRadius: '10px', padding: '11px 26px', fontSize: '13.5px', fontWeight: 600, cursor: 'pointer', fontFamily: "'Poppins', sans-serif" }}
              >
                Post
              </button>
            </div>

            {selectedMilestone.commentsList && selectedMilestone.commentsList.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {selectedMilestone.commentsList.map((c, idx) => {
                  const avColor = colorForName(c.author);
                  return (
                    <div key={idx} style={{ display: 'flex', gap: '12px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: avColor, color: '#fff', fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {getInitials(c.author)}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '3px' }}>
                          <span style={{ fontSize: '13.5px', fontWeight: 700, color: colors.textDark }}>{c.author}</span>
                          <span style={{ fontSize: '12px', color: colors.textGray }}>{c.date}</span>
                        </div>
                        <p style={{ fontSize: '13px', color: colors.textGray, margin: 0, lineHeight: '1.6' }}>{c.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ fontSize: '13px', color: colors.textMuted, textAlign: 'center', padding: '10px 0' }}>
                No comments yet. Be the first to add one.
              </div>
            )}
          </div>
        </CEOPageLayout>
      </CEOLayout>
    );
  }

  // ─── TASK DETAIL VIEW (opened from "View work") ─────────────────────
  if (selectedProject && selectedTask) {
    const pc = progressColors[selectedTask.progress] || progressColors['To do'];
    const prc = priorityColors[selectedTask.priority] || priorityColors['Medium'];
    const doneCount = selectedTask.subtasks.filter((s) => s.done).length;

    return (
      <CEOLayout>
        <CEOPageLayout title={selectedTask.title}>
          <div style={{ marginBottom: '16px' }}>
            <button
              onClick={closeTaskDetail}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'transparent', color: colors.primary, border: 'none', fontSize: '14px', fontWeight: 500, cursor: 'pointer', fontFamily: "'Poppins', sans-serif", padding: '8px 0' }}
            >
              <i className="fas fa-arrow-left" style={{ fontSize: '13px' }} />
              Back to Tasks submitted
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.3fr) minmax(0, 1fr)', gap: '20px', alignItems: 'start' }}>
            <div style={{ background: colors.cardBg, border: `1px solid ${colors.border}`, borderRadius: '16px', padding: 'clamp(20px, 3vw, 28px)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: colors.textDark, margin: '0 0 4px 0' }}>{selectedTask.title}</h2>
              <div style={{ fontSize: '13px', color: colors.textGray, marginBottom: '12px' }}>
                Submitted by {selectedTask.submittedBy} · {selectedTask.role}
              </div>

              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: pc.bg, color: pc.text, fontSize: '12px', fontWeight: 600, padding: '4px 12px', borderRadius: '20px', marginBottom: '20px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: pc.dot, display: 'inline-block' }} />
                {selectedTask.progress}
              </span>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '20px' }}>
                <div>
                  <div style={{ fontSize: '13px', color: colors.textGray, marginBottom: '2px' }}>Type</div>
                  <div style={{ fontSize: '14px', fontWeight: 500, color: colors.textDark }}>{selectedTask.type}</div>
                </div>
                <div>
                  <div style={{ fontSize: '13px', color: colors.textGray, marginBottom: '2px' }}>Assignee</div>
                  <div style={{ fontSize: '14px', fontWeight: 500, color: colors.textDark }}>{selectedTask.assignee}</div>
                </div>
                <div>
                  <div style={{ fontSize: '13px', color: colors.textGray, marginBottom: '4px' }}>Priority</div>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: prc.bg, color: prc.text, fontSize: '12px', fontWeight: 600, padding: '3px 12px', borderRadius: '20px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: prc.dot, display: 'inline-block' }} />
                    {selectedTask.priority}
                  </span>
                </div>
                <div>
                  <div style={{ fontSize: '13px', color: colors.textGray, marginBottom: '2px' }}>Due date</div>
                  <div style={{ fontSize: '14px', fontWeight: 500, color: colors.textDark }}>{selectedTask.dueDate}</div>
                </div>
              </div>

              <div style={{ borderTop: `1px solid ${colors.border}`, margin: '4px 0 16px 0' }} />

              <div style={{ marginBottom: '18px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 600, color: colors.textDark, margin: '0 0 8px 0' }}>Description</h4>
                <p style={{ fontSize: '13.5px', color: colors.textGray, margin: 0, lineHeight: '1.7' }}>{selectedTask.description}</p>
              </div>

              <div>
                <h4 style={{ fontSize: '14px', fontWeight: 600, color: colors.textDark, margin: '0 0 10px 0' }}>Attachments</h4>
                {selectedTask.attachments && selectedTask.attachments.length > 0 ? (
                  selectedTask.attachments.map((file, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', background: colors.bg, borderRadius: '8px', border: `1px solid ${colors.border}` }}>
                      <i className="fas fa-file-pdf" style={{ color: '#DC2626', fontSize: '16px' }} />
                      <span style={{ fontSize: '13px', fontWeight: 500, color: colors.textDark, flex: 1 }}>{file.name}</span>
                      <span style={{ fontSize: '12px', color: colors.textGray }}>{file.size}</span>
                      <i className="fas fa-arrow-down" style={{ fontSize: '12px', color: colors.textGray, cursor: 'pointer' }} />
                    </div>
                  ))
                ) : (
                  <div style={{ fontSize: '13px', color: colors.textGray }}>No attachments</div>
                )}
              </div>
            </div>

            <div style={{ background: colors.cardBg, border: `1px solid ${colors.border}`, borderRadius: '16px', padding: 'clamp(20px, 3vw, 28px)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: colors.textDark, margin: '0 0 14px 0' }}>Task Progress</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <div style={{ flex: 1, height: '8px', background: colors.bg, borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${selectedTask.progressPercentage}%`, height: '100%', background: '#F59E0B', borderRadius: '4px' }} />
                </div>
                <span style={{ fontSize: '13px', fontWeight: 600, color: colors.textDark }}>{selectedTask.progressPercentage}%</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: colors.textDark, margin: 0 }}>Subtasks</h3>
                <span style={{ fontSize: '13px', color: colors.textGray }}>({doneCount}/{selectedTask.subtasks.length})</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {selectedTask.subtasks.map((subtask, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <i className={subtask.done ? 'fas fa-check-circle' : 'far fa-circle'} style={{ color: subtask.done ? colors.primary : colors.textMuted, fontSize: '15px', flexShrink: 0 }} />
                    <span style={{ fontSize: '14px', color: subtask.done ? colors.textDark : colors.textGray }}>{subtask.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CEOPageLayout>
      </CEOLayout>
    );
  }

  // ─── PROJECT DETAIL VIEW ─────────────────────────────────────────────
  if (selectedProject) {
    return (
      <CEOLayout>
        <CEOPageLayout title={selectedProject.title}>
          <div style={{ marginBottom: '16px' }}>
            <button
              onClick={handleBackToProjects}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'transparent', color: colors.textGray, border: 'none', fontSize: '14px', fontWeight: 500, cursor: 'pointer', fontFamily: "'Poppins', sans-serif", padding: '8px 0' }}
            >
              <i className="fas fa-arrow-left" style={{ fontSize: '14px' }} />
              Back to Projects
            </button>
          </div>

          <div style={{ marginBottom: '18px' }}>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 700, color: colors.textDark, margin: 0 }}>{selectedProject.title}</h2>
            <p style={{ fontSize: '14px', color: colors.textGray, margin: '4px 0 0 0' }}>{selectedProject.subtitle}</p>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 'clamp(12px, 2vw, 28px)', borderBottom: `1px solid ${colors.border}`, marginBottom: '24px', overflowX: 'auto', flexWrap: 'nowrap' }}>
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  padding: '10px 4px',
                  fontSize: '13px',
                  fontWeight: activeTab === tab ? 600 : 500,
                  color: activeTab === tab ? colors.primary : colors.textGray,
                  borderBottom: activeTab === tab ? `3px solid ${colors.primary}` : '3px solid transparent',
                  cursor: 'pointer',
                  fontFamily: "'Poppins', sans-serif",
                  whiteSpace: 'nowrap',
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* ─── OVERVIEW TAB ──────────────────────────────────────── */}
          {activeTab === 'Overview' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.3fr) minmax(0, 1fr)', gap: '20px', alignItems: 'start' }}>
              {/* Description card */}
              <div style={{ background: colors.cardBg, border: `1px solid ${colors.border}`, borderRadius: '16px', padding: 'clamp(20px, 3vw, 28px)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: colors.textDark, margin: '0 0 12px 0' }}>Description</h3>
                <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.textGray, margin: 0 }}>{selectedProject.description}</p>

                <div style={{ borderTop: `1px solid ${colors.border}`, margin: '20px 0 16px 0' }} />

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span style={{ color: colors.textGray }}>Status</span>
                    <span style={{ color: selectedProject.status === 'On track' ? colors.statusOnTrack : '#E0A800', fontWeight: 600 }}>{selectedProject.status}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span style={{ color: colors.textGray }}>Start date</span>
                    <span style={{ color: colors.textDark, fontWeight: 500 }}>{selectedProject.startDate}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span style={{ color: colors.textGray }}>End date</span>
                    <span style={{ color: colors.textDark, fontWeight: 500 }}>{selectedProject.endDate}</span>
                  </div>
                </div>
              </div>

              {/* Right column: Team + Message seniors */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ background: colors.cardBg, border: `1px solid ${colors.border}`, borderRadius: '16px', padding: 'clamp(20px, 3vw, 28px)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 600, color: colors.textDark, margin: '0 0 14px 0' }}>Team</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {selectedProject.team.map((member, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: avatarColors[member.initials] || '#ccc', color: '#fff', fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            {member.initials}
                          </div>
                          <div>
                            <div style={{ fontSize: '14px', fontWeight: 500, color: colors.textDark }}>{member.name}</div>
                            <div style={{ fontSize: '12.5px', color: colors.textGray }}>{member.role}</div>
                          </div>
                        </div>
                        <i className="far fa-comment-dots" style={{ color: colors.textMuted, fontSize: '15px', cursor: 'pointer' }} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Message seniors */}
                <div style={{ background: colors.cardBg, border: `1px solid ${colors.border}`, borderRadius: '16px', padding: 'clamp(20px, 3vw, 28px)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 600, color: colors.textDark, margin: '0 0 14px 0' }}>Message seniors</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '16px' }}>
                    {seniors.map((s) => (
                      <div key={s.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: s.color, color: '#fff', fontSize: '10px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            {s.initials}
                          </div>
                          <span style={{ fontSize: '14px', fontWeight: 500, color: colors.textDark }}>{s.label}</span>
                        </div>
                        <i
                          className="far fa-comment-dots"
                          style={{ color: colors.textMuted, fontSize: '15px', cursor: 'pointer' }}
                          onClick={() => handleSendSeniorMessage(s.label)}
                        />
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      value={seniorMessageText}
                      onChange={(e) => setSeniorMessageText(e.target.value)}
                      placeholder="Type your message..."
                      style={{ flex: 1, padding: '10px 14px', border: `1px solid ${colors.border}`, borderRadius: '10px', fontSize: '13px', outline: 'none', fontFamily: "'Poppins', sans-serif", background: colors.bg }}
                    />
                    <button
                      onClick={() => handleSendSeniorMessage('selected senior')}
                      style={{ background: colors.primary, color: '#fff', border: 'none', borderRadius: '10px', padding: '10px 20px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: "'Poppins', sans-serif" }}
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ─── TASKS SUBMITTED TAB ──────────────────────────────── */}
          {activeTab === 'Tasks submitted' && (
            <div style={{ background: colors.cardBg, border: `1px solid ${colors.border}`, borderRadius: '16px', padding: 'clamp(20px, 3vw, 28px)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              {selectedProject.submittedTasks && selectedProject.submittedTasks.length > 0 ? (
                selectedProject.submittedTasks.map((task, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '18px 0',
                      borderTop: idx === 0 ? 'none' : `1px solid ${colors.border}`,
                    }}
                  >
                    <div style={{ fontSize: '15px', fontWeight: 600, color: colors.textDark, marginBottom: '8px' }}>{task.title}</div>
                    <span style={{
                      display: 'inline-block',
                      background: colors.primaryLight,
                      color: colors.primary,
                      fontSize: '12px',
                      fontWeight: 500,
                      padding: '4px 12px',
                      borderRadius: '8px',
                      marginBottom: '14px',
                    }}>
                      Submitted by {task.submittedBy} . {task.role}
                    </span>
                    <div>
                      <button
                        onClick={() => handleViewTask(task)}
                        style={{
                          background: 'transparent',
                          border: `1px solid ${colors.border}`,
                          borderRadius: '8px',
                          padding: '8px 18px',
                          fontSize: '13px',
                          fontWeight: 600,
                          color: colors.textDark,
                          cursor: 'pointer',
                          fontFamily: "'Poppins', sans-serif",
                        }}
                      >
                        View work
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ padding: '40px 20px', textAlign: 'center', color: colors.textMuted }}>
                  <i className="fas fa-inbox" style={{ fontSize: '28px', display: 'block', marginBottom: '10px' }} />
                  No tasks submitted yet.
                </div>
              )}
            </div>
          )}

          {/* ─── MILESTONES TAB ──────────────────────────────────────── */}
          {activeTab === 'Milestones' && (
            <div style={{ background: colors.cardBg, border: `1px solid ${colors.border}`, borderRadius: '16px', padding: 'clamp(20px, 3vw, 28px)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              {selectedProject.milestones && selectedProject.milestones.length > 0 ? (
                <div style={{ overflowX: 'auto' }}>
                  <div style={{ minWidth: '900px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '40px 1.6fr 1.3fr 1.3fr 1.6fr 0.7fr', gap: '16px', paddingBottom: '14px', marginBottom: '8px', borderBottom: `1px solid ${colors.border}` }}>
                      <div />
                      <div style={{ fontSize: '13px', fontWeight: 700, color: colors.primary }}>Milestone</div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: colors.primary }}>Status &amp; Progress</div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: colors.primary }}>Schedule</div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: colors.primary }}>Deliverables</div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: colors.primary }}>Comments</div>
                    </div>

                    <div style={{ position: 'relative' }}>
                      {selectedProject.milestones.map((milestone, idx) => {
                        const isCompleted = milestone.status === 'Completed';
                        const isInProgress = milestone.status === 'In progress';
                        const isLast = idx === selectedProject.milestones.length - 1;

                        const statusPillColors = {
                          'Completed': { bg: '#D1FAE5', text: '#059669' },
                          'In progress': { bg: '#DBEAFE', text: '#2563EB' },
                          'Pending': { bg: '#F3F4F6', text: '#6B7280' },
                        };
                        const spc = statusPillColors[milestone.status] || statusPillColors['Pending'];
                        const barColor = isCompleted ? '#10B981' : isInProgress ? '#3B82F6' : '#D1D5DB';

                        return (
                          <div
                            key={idx}
                            onClick={() => handleViewMilestone(milestone)}
                            style={{
                              display: 'grid',
                              gridTemplateColumns: '40px 1.6fr 1.3fr 1.3fr 1.6fr 0.7fr',
                              gap: '16px',
                              padding: '16px 12px',
                              borderRadius: '10px',
                              alignItems: 'flex-start',
                              background: isInProgress ? colors.primaryLight : 'transparent',
                              cursor: 'pointer',
                              transition: 'background 0.15s',
                            }}
                            onMouseEnter={(e) => { if (!isInProgress) e.currentTarget.style.background = colors.bg; }}
                            onMouseLeave={(e) => { if (!isInProgress) e.currentTarget.style.background = 'transparent'; }}
                          >
                            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                              {!isLast && (
                                <div style={{ position: 'absolute', top: '28px', bottom: '-16px', width: '2px', background: isCompleted ? colors.primary : '#D1D5DB' }} />
                              )}
                              <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: isCompleted || isInProgress ? colors.primary : '#E5E7EB', color: isCompleted || isInProgress ? '#fff' : '#9CA3AF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, flexShrink: 0, zIndex: 1 }}>
                                {isCompleted ? <i className="fas fa-check" style={{ fontSize: '11px' }} /> : <span />}
                              </div>
                            </div>

                            <div>
                              <div style={{ fontSize: '14px', fontWeight: 700, color: colors.textDark, marginBottom: '4px' }}>{milestone.title}</div>
                              <div style={{ fontSize: '12.5px', color: colors.textGray, marginBottom: '2px' }}>
                                {isCompleted ? `Completed ${milestone.endDate}` : milestone.status}
                              </div>
                              <div style={{ fontSize: '12.5px', color: colors.textGray, marginBottom: '6px' }}>{milestone.assignees.join(', ')}</div>
                              {milestone.description && (
                                <div style={{ fontSize: '12.5px', color: colors.textMuted, lineHeight: '1.5' }}>{milestone.description}</div>
                              )}
                            </div>

                            <div>
                              <span style={{ display: 'inline-block', background: spc.bg, color: spc.text, fontSize: '11.5px', fontWeight: 600, padding: '3px 12px', borderRadius: '20px', marginBottom: '8px' }}>
                                {milestone.status}
                              </span>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{ flex: 1, height: '6px', background: '#E5E7EB', borderRadius: '3px', overflow: 'hidden' }}>
                                  <div style={{ width: `${milestone.progress}%`, height: '100%', background: barColor, borderRadius: '3px' }} />
                                </div>
                                <span style={{ fontSize: '12px', fontWeight: 600, color: colors.textDark }}>{milestone.progress}%</span>
                              </div>
                            </div>

                            <div style={{ fontSize: '13px', color: colors.textDark, lineHeight: '1.8' }}>
                              <div>Start: {milestone.startDate}</div>
                              <div>End: {milestone.endDate}</div>
                            </div>

                            <div>
                              {isInProgress && milestone.completedItems && milestone.completedItems.length > 0 ? (
                                <>
                                  <div style={{ fontSize: '13px', fontWeight: 600, color: colors.textDark, marginBottom: '6px' }}>Completed so far:</div>
                                  {milestone.completedItems.map((item, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                                      <i className="fas fa-check-circle" style={{ color: colors.primary, fontSize: '12px' }} />
                                      <span style={{ fontSize: '13px', color: colors.textDark }}>{item}</span>
                                    </div>
                                  ))}
                                </>
                              ) : (
                                milestone.deliverables && milestone.deliverables.map((item, i) => (
                                  <div key={i} style={{ fontSize: '13px', color: colors.textGray, marginBottom: '4px' }}>• {item}</div>
                                ))
                              )}
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <i className="far fa-comment" style={{ color: colors.textGray, fontSize: '14px' }} />
                              <span style={{ fontSize: '13px', color: colors.textGray }}>{milestone.comments}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ padding: '40px', textAlign: 'center', color: colors.textMuted }}>No milestones defined for this project.</div>
              )}
            </div>
          )}
        </CEOPageLayout>
      </CEOLayout>
    );
  }

  // ─── GRID VIEW: Active projects / Completed projects ────────────────
  const renderProjectCard = (project) => (
    <div
      key={project.id}
      style={{
        background: colors.cardBg,
        border: `1px solid ${colors.border}`,
        borderRadius: '16px',
        padding: '20px 22px',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
      }}
      onClick={() => handleViewProject(project.id)}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
    >
      <h3 style={{ fontSize: '16px', fontWeight: 600, color: colors.textDark, margin: '0 0 4px 0' }}>{project.title}</h3>
      <p style={{ fontSize: '13px', color: colors.textGray, margin: '0 0 16px 0' }}>{project.subtitle}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
        {project.team.slice(0, 4).map((member, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: avatarColors[member.initials] || '#ccc', color: '#fff', fontSize: '11px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {member.initials}
            </div>
            <span style={{ fontSize: '13px', color: colors.textDark }}>
              {member.name} . <span style={{ color: colors.textGray }}>{member.role}</span>
            </span>
          </div>
        ))}
        {project.team.length > 4 && (
          <div style={{ fontSize: '12px', color: colors.textMuted, paddingLeft: '38px' }}>+{project.team.length - 4} more</div>
        )}
      </div>

      <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: `1px solid ${colors.border}`, display: 'flex', justifyContent: 'flex-end' }}>
        <button
          onClick={(e) => { e.stopPropagation(); handleViewProject(project.id); }}
          style={{ background: colors.primary, color: '#fff', border: 'none', borderRadius: '8px', padding: '6px 20px', fontSize: '13px', fontWeight: 500, cursor: 'pointer', fontFamily: "'Poppins', sans-serif" }}
        >
          View
        </button>
      </div>
    </div>
  );

  return (
    <CEOLayout>
      <CEOPageLayout title="Projects">
        {activeProjects.length > 0 && (
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: colors.textDark, margin: '0 0 16px 0' }}>Active projects</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              {activeProjects.map(renderProjectCard)}
            </div>
          </div>
        )}

        {completedProjects.length > 0 && (
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: colors.textDark, margin: '0 0 16px 0' }}>Completed projects</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              {completedProjects.map(renderProjectCard)}
            </div>
          </div>
        )}
      </CEOPageLayout>
    </CEOLayout>
  );
}