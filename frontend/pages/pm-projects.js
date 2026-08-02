import { useState, useRef } from 'react';
import PMLayout from '@/components/PMLayout';
import PMPageLayout from '@/components/PMPageLayout';
import CreateProjectModal from '@/components/CreateProjectModal';

export default function PMProjects() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeTab, setActiveTab] = useState('Overview');
  const [selectedDeliverable, setSelectedDeliverable] = useState(null);
  const [priorityFilter, setPriorityFilter] = useState('High');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isBacklogModalOpen, setIsBacklogModalOpen] = useState(false);
  const [isSprintTaskModalOpen, setIsSprintTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [milestoneCommentText, setMilestoneCommentText] = useState('');

  // Uploaded documents state (per project)
  const [uploadedDocs, setUploadedDocs] = useState({});
  const fileInputRef = useRef(null);

  // Backlog form state
  const [backlogTask, setBacklogTask] = useState('');
  const [backlogType, setBacklogType] = useState('Design');
  const [backlogPriority, setBacklogPriority] = useState('Medium');
  const [backlogAssignee, setBacklogAssignee] = useState('');

  // Sprint task form state
  const [sprintTask, setSprintTask] = useState('');
  const [sprintDescription, setSprintDescription] = useState('');
  const [sprintDeadline, setSprintDeadline] = useState('');
  const [sprintAssignee, setSprintAssignee] = useState('');
  const [sprintPriority, setSprintPriority] = useState('Medium');

  const handleCreateProject = (projectData) => {
    console.log('New Project:', projectData);
    setIsModalOpen(false);
  };

  const handleViewProject = (projectId) => {
    const project = projects.find((p) => p.id === projectId);
    setSelectedProject(project);
    setActiveTab('Overview');
  };

  const handleBackToProjects = () => {
    setSelectedProject(null);
    setSelectedTask(null);
    setSelectedMilestone(null);
  };

  const handleViewDeliverable = (member) => {
    setSelectedDeliverable(member);
  };

  const handleCloseDeliverable = () => {
    setSelectedDeliverable(null);
  };

  const handleCreateBacklog = () => {
    console.log('Creating backlog:', {
      task: backlogTask,
      type: backlogType,
      priority: backlogPriority,
      assignee: backlogAssignee,
      project: selectedProject?.title
    });
    setIsBacklogModalOpen(false);
    setBacklogTask('');
    setBacklogType('Design');
    setBacklogPriority('Medium');
    setBacklogAssignee('');
  };

  const handleCreateSprintTask = () => {
    console.log('Creating sprint task:', {
      task: sprintTask,
      description: sprintDescription,
      deadline: sprintDeadline,
      assignee: sprintAssignee,
      priority: sprintPriority,
      project: selectedProject?.title
    });
    setIsSprintTaskModalOpen(false);
    setSprintTask('');
    setSprintDescription('');
    setSprintDeadline('');
    setSprintAssignee('');
    setSprintPriority('Medium');
  };

  const handleViewTask = (task) => {
    setSelectedTask(task);
  };

  const closeTaskDetail = () => {
    setSelectedTask(null);
  };

  const handleViewMilestone = (milestone) => {
    setSelectedMilestone(milestone);
  };

  const closeMilestoneDetail = () => {
    setSelectedMilestone(null);
    setMilestoneCommentText('');
  };

  const handlePostMilestoneComment = () => {
    console.log('New comment on', selectedMilestone?.title, ':', milestoneCommentText);
    setMilestoneCommentText('');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file || !selectedProject) return;
    
    const newDoc = {
      name: file.name,
      uploadedBy: 'You',
      size: (file.size / 1024).toFixed(1) + ' KB',
      isUploaded: true,
    };
    
    const projectId = selectedProject.id;
    setUploadedDocs((prev) => ({
      ...prev,
      [projectId]: [...(prev[projectId] || []), newDoc],
    }));
    
    e.target.value = '';
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

  const backlogItems = [
    { id: 1, title: 'Empty state illustrations', type: 'Design', priority: 'Low', assignee: 'Sara Kareem' },
    { id: 2, title: 'Dev dashboard', type: 'Design', priority: 'Medium', assignee: 'Sara Kareem' },
    { id: 3, title: 'Payment system', type: 'Bug', priority: 'High', assignee: 'Abdul rehman' },
  ];

  const sprintItems = [
    { 
      id: 1, 
      title: 'Dev dashboard', 
      type: 'Design', 
      progress: 'In progress', 
      assignee: 'Sara kareem',
      priority: 'Medium',
      dueDate: '30 May 2025',
      description: 'Design and develop the main dashboard for the client portal. Includes summary widgets, recent activity, and quick actions.',
      attachments: [{ name: 'dashboard-wireframe.pdf', size: '12 MB' }],
      progressPercentage: 60,
      subtasks: [
        { text: 'Wireframe layout', done: true },
        { text: 'Dashboard UI design', done: true },
        { text: 'API integration', done: true },
        { text: 'Responsiveness check', done: false },
        { text: 'Testing & bug fixes', done: false }
      ],
      status: 'In progress'
    },
    { 
      id: 2, 
      title: 'API integration', 
      type: 'Backend', 
      progress: 'In progress', 
      assignee: 'Abdul rehman',
      priority: 'High',
      dueDate: '15 Jun 2025',
      description: 'Integrate REST APIs with the frontend. Ensure proper error handling and data validation.',
      attachments: [{ name: 'API-documentation.pdf', size: '8 MB' }],
      progressPercentage: 45,
      subtasks: [
        { text: 'Design API endpoints', done: true },
        { text: 'Implement authentication', done: true },
        { text: 'Create API documentation', done: false },
        { text: 'Test endpoints', done: false }
      ],
      status: 'In progress'
    },
    { 
      id: 3, 
      title: 'Payment system', 
      type: 'Bug', 
      progress: 'In review', 
      assignee: 'Abdul rehman',
      priority: 'High',
      dueDate: '20 Jun 2025',
      description: 'Fix payment gateway issues and improve transaction handling.',
      attachments: [{ name: 'payment-logs.txt', size: '2 MB' }],
      progressPercentage: 80,
      subtasks: [
        { text: 'Review payment logs', done: true },
        { text: 'Fix transaction bug', done: true },
        { text: 'Test with sandbox', done: true },
        { text: 'Deploy to production', done: false }
      ],
      status: 'In review'
    },
    { 
      id: 4, 
      title: 'Empty state illustrations', 
      type: 'Design', 
      progress: 'Done', 
      assignee: 'Sara kareem',
      priority: 'Low',
      dueDate: '10 May 2025',
      description: 'Design empty state illustrations for all pages with no data.',
      attachments: [{ name: 'illustrations.fig', size: '25 MB' }],
      progressPercentage: 100,
      subtasks: [
        { text: 'Design concepts', done: true },
        { text: 'Finalize illustrations', done: true },
        { text: 'Export assets', done: true }
      ],
      status: 'Done'
    },
  ];

  const typeOptions = ['Design', 'Bug', 'Feature', 'Task', 'Improvement'];
  const priorityOptions = ['Low', 'Medium', 'High'];
  const progressOptions = ['To do', 'In progress', 'In review', 'Done'];
  const assigneeOptions = ['Bilal Ahmed', 'Rohael Khan', 'Sara Koreem', 'Tehreem Raja', 'Abdul rehman', 'Hafeez jamil'];

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
        { initials: 'BA', name: 'Bilal Ahmed', role: 'Project Manager' },
        { initials: 'RK', name: 'Rohael Khan', role: 'Team Lead' },
        { initials: 'SK', name: 'Sara Koreem', role: 'UI/UX designer' },
        { initials: 'TR', name: 'Tehreem Raja', role: 'Frontend developer' },
        { initials: 'AR', name: 'Abdul rehman', role: 'Backend developer' },
        { initials: 'HJ', name: 'Hafeez jamil', role: 'AI engineer' },
      ],
      documents: [
        { name: 'Figma file', uploadedBy: 'Sara kareem' },
        { name: 'SRS document', uploadedBy: 'Sara kareem' },
        { name: 'Analytics dashboard – brand brief', uploadedBy: 'Abdul rehman' },
        { name: 'Payments API – architecture notes', uploadedBy: 'Sara kareem' },
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
      ]
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
        { initials: 'BA', name: 'Bilal Ahmed', role: 'Project Manager' },
        { initials: 'SK', name: 'Sara Koreem', role: 'UI/UX designer' },
        { initials: 'TR', name: 'Tehreem Raja', role: 'Frontend developer' },
        { initials: 'AR', name: 'Abdul rehman', role: 'Backend developer' },
      ],
      documents: [
        { name: 'HRMS Architecture', uploadedBy: 'Bilal Ahmed' },
        { name: 'Database Schema', uploadedBy: 'Abdul rehman' },
        { name: 'UI Mockups', uploadedBy: 'Sara Koreem' },
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
          status: 'In progress',
          startDate: '1 Apr 2026',
          endDate: '30 Jun 2026',
          assignees: ['Tehreem Raja', 'Abdul rehman'],
          progress: 45,
          description: 'Build employee, attendance, and leave management modules.',
          deliverables: [],
          completedItems: ['Employee module', 'Attendance module'],
          comments: 6,
          tasks: [
            { title: 'Employee module', description: 'Employee onboarding and records', status: 'Completed', completion: 100, startDate: '1 Apr 2026', endDate: '20 Apr 2026', assignee: 'Tehreem Raja' },
            { title: 'Attendance module', description: 'Attendance tracking system', status: 'Completed', completion: 100, startDate: '21 Apr 2026', endDate: '10 May 2026', assignee: 'Abdul rehman' },
            { title: 'Leave management', description: 'Leave requests and approvals', status: 'In Progress', completion: 45, startDate: '11 May 2026', endDate: '30 Jun 2026', assignee: 'Tehreem Raja' },
          ],
          commentsList: [],
        },
        {
          title: 'Testing',
          status: 'Pending',
          startDate: '1 Jul 2026',
          endDate: '30 Sep 2026',
          assignees: ['Bilal Ahmed'],
          progress: 0,
          description: 'Execute test cases and get sign-off through UAT.',
          deliverables: ['Test cases', 'UAT sign-off'],
          completedItems: [],
          comments: 0,
          tasks: [
            { title: 'Test cases', description: 'Write and execute test cases', status: 'Pending', completion: 0, startDate: '1 Jul 2026', endDate: '31 Jul 2026', assignee: 'Bilal Ahmed' },
            { title: 'UAT sign-off', description: 'Client acceptance testing', status: 'Pending', completion: 0, startDate: '1 Aug 2026', endDate: '30 Sep 2026', assignee: 'Bilal Ahmed' },
          ],
          commentsList: [],
        },
      ]
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
        { initials: 'BA', name: 'Bilal Ahmed', role: 'Project Manager' },
        { initials: 'SK', name: 'Sara Koreem', role: 'UI/UX designer' },
        { initials: 'TR', name: 'Tehreem Raja', role: 'Frontend developer' },
        { initials: 'AR', name: 'Abdul rehman', role: 'Backend developer' },
      ],
      documents: [
        { name: 'Brand Guidelines', uploadedBy: 'Sara Koreem' },
        { name: 'Landing Page Design', uploadedBy: 'Sara Koreem' },
        { name: 'SEO Report', uploadedBy: 'Abdul rehman' },
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
          status: 'In progress',
          startDate: '26 Jan 2026',
          endDate: '28 Feb 2026',
          assignees: ['Sara Koreem'],
          progress: 70,
          description: 'Design the new homepage and key landing pages.',
          deliverables: [],
          completedItems: ['Homepage design', 'Landing page design'],
          comments: 3,
          tasks: [
            { title: 'Homepage design', description: 'New homepage layout', status: 'Completed', completion: 100, startDate: '26 Jan 2026', endDate: '10 Feb 2026', assignee: 'Sara Koreem' },
            { title: 'Landing page design', description: 'Campaign landing pages', status: 'Completed', completion: 100, startDate: '11 Feb 2026', endDate: '28 Feb 2026', assignee: 'Sara Koreem' },
          ],
          commentsList: [],
        },
        {
          title: 'Development',
          status: 'Pending',
          startDate: '1 Mar 2026',
          endDate: '30 Apr 2026',
          assignees: ['Tehreem Raja', 'Abdul rehman'],
          progress: 0,
          description: 'Set up the CMS and build the responsive site.',
          deliverables: ['CMS setup', 'Responsive build'],
          completedItems: [],
          comments: 0,
          tasks: [
            { title: 'CMS setup', description: 'Configure content management system', status: 'Pending', completion: 0, startDate: '1 Mar 2026', endDate: '15 Mar 2026', assignee: 'Abdul rehman' },
            { title: 'Responsive build', description: 'Build responsive frontend', status: 'Pending', completion: 0, startDate: '16 Mar 2026', endDate: '30 Apr 2026', assignee: 'Tehreem Raja' },
          ],
          commentsList: [],
        },
        {
          title: 'Launch',
          status: 'Pending',
          startDate: '1 May 2026',
          endDate: '15 May 2026',
          assignees: ['Bilal Ahmed'],
          progress: 0,
          description: 'Finalize go-live checklist and SEO handoff before launch.',
          deliverables: ['Go-live checklist', 'SEO handoff'],
          completedItems: [],
          comments: 0,
          tasks: [
            { title: 'Go-live checklist', description: 'Final pre-launch checklist', status: 'Pending', completion: 0, startDate: '1 May 2026', endDate: '10 May 2026', assignee: 'Bilal Ahmed' },
            { title: 'SEO handoff', description: 'Handoff SEO report to marketing', status: 'Pending', completion: 0, startDate: '11 May 2026', endDate: '15 May 2026', assignee: 'Abdul rehman' },
          ],
          commentsList: [],
        },
      ]
    },
  ];

  // ─── TABS ──────────────────────────────────────────────────────────────
  const tabs = ['Overview', 'Backlog', 'Sprint info', 'Milestones', 'Documents'];

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

    const getInitials = (name) => name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    const initialsPalette = ['#3B5BDB', '#F4B400', '#2FBF71', '#E8483E', '#8B5CF6', '#F97316', '#0EA5E9', '#DB2777'];
    const colorForName = (name) => {
      let hash = 0;
      for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
      return initialsPalette[Math.abs(hash) % initialsPalette.length];
    };

    const msc = milestoneStatusColors[selectedMilestone.status] || milestoneStatusColors['Pending'];
    const totalTasks = selectedMilestone.tasks ? selectedMilestone.tasks.length : 0;
    const completedTasks = selectedMilestone.tasks ? selectedMilestone.tasks.filter(t => t.status === 'Completed').length : 0;

    return (
      <PMLayout>
        <PMPageLayout title="Projects">
          {/* Back Button */}
          <div style={{ marginBottom: '16px' }}>
            <button
              onClick={closeMilestoneDetail}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'transparent',
                color: colors.textGray,
                border: 'none',
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer',
                fontFamily: "'Poppins', sans-serif",
                padding: '8px 0',
              }}
            >
              <i className="fas fa-arrow-left" style={{ fontSize: '13px' }} />
              Back to Milestones
            </button>
          </div>

          {/* Header card */}
          <div style={{
            background: colors.cardBg,
            border: `1px solid #E5E7EB`,
            borderRadius: '16px',
            padding: 'clamp(20px, 3vw, 28px)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            marginBottom: '20px',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              gap: '16px',
              marginBottom: '18px',
            }}>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: colors.primary, letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Milestone
                </div>
                <h2 style={{ fontSize: 'clamp(20px, 2.5vw, 24px)', fontWeight: 700, color: colors.textDark, margin: 0 }}>
                  {selectedMilestone.title}
                </h2>
                {selectedMilestone.description && (
                  <p style={{ fontSize: '13.5px', color: colors.textGray, margin: '6px 0 0 0', maxWidth: '520px', lineHeight: '1.6' }}>
                    {selectedMilestone.description}
                  </p>
                )}
              </div>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: msc.bg,
                color: msc.text,
                fontSize: '12.5px',
                fontWeight: 600,
                padding: '6px 16px',
                borderRadius: '20px',
                flexShrink: 0,
              }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: msc.dot, display: 'inline-block' }} />
                {selectedMilestone.status}
              </span>
            </div>

            {/* Meta row */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '18px',
              paddingTop: '18px',
              borderTop: '1px solid #EEF0F2',
            }}>
              <div>
                <div style={{ fontSize: '11.5px', color: colors.textGray, marginBottom: '4px', fontWeight: 500 }}>Start Date</div>
                <div style={{ fontSize: '13.5px', fontWeight: 600, color: colors.textDark }}>{selectedMilestone.startDate}</div>
              </div>
              <div>
                <div style={{ fontSize: '11.5px', color: colors.textGray, marginBottom: '4px', fontWeight: 500 }}>End Date</div>
                <div style={{ fontSize: '13.5px', fontWeight: 600, color: colors.textDark }}>{selectedMilestone.endDate}</div>
              </div>
              <div>
                <div style={{ fontSize: '11.5px', color: colors.textGray, marginBottom: '4px', fontWeight: 500 }}>Team</div>
                <div style={{ fontSize: '13.5px', fontWeight: 600, color: colors.textDark }}>{selectedMilestone.assignees.join(', ')}</div>
              </div>
              <div>
                <div style={{ fontSize: '11.5px', color: colors.textGray, marginBottom: '4px', fontWeight: 500 }}>Tasks completed</div>
                <div style={{ fontSize: '13.5px', fontWeight: 600, color: colors.textDark }}>{completedTasks} / {totalTasks}</div>
              </div>
              <div>
                <div style={{ fontSize: '11.5px', color: colors.textGray, marginBottom: '6px', fontWeight: 500 }}>Overall progress</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ flex: 1, height: '6px', background: '#E5E7EB', borderRadius: '3px', overflow: 'hidden', maxWidth: '110px' }}>
                    <div style={{
                      width: `${selectedMilestone.progress}%`,
                      height: '100%',
                      background: taskBarColor(selectedMilestone.status),
                      borderRadius: '3px',
                    }} />
                  </div>
                  <span style={{ fontSize: '12.5px', fontWeight: 700, color: colors.textDark }}>{selectedMilestone.progress}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tasks table */}
          <div style={{
            background: colors.cardBg,
            border: `1px solid #E5E7EB`,
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            marginBottom: '20px',
          }}>
            <div style={{ padding: '18px clamp(20px, 3vw, 28px) 0' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: colors.textDark, margin: '0 0 16px 0' }}>Tasks</h3>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <div style={{ minWidth: '780px' }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1.8fr 1fr 1.3fr 1fr 1fr 1.1fr',
                  padding: '10px clamp(20px, 3vw, 28px)',
                  background: colors.tableHeaderBg,
                }}>
                  {['Task', 'Status', 'Completion', 'Start Date', 'End Date', 'Assignee'].map((h) => (
                    <div key={h} style={{ fontSize: '11.5px', fontWeight: 600, color: '#fff', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                      {h}
                    </div>
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
                          transition: 'background 0.15s',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = colors.primaryLight}
                        onMouseLeave={(e) => e.currentTarget.style.background = task.status === 'On Hold' ? '#FFFBEB' : (idx % 2 === 0 ? colors.cardBg : '#FAFBFC')}
                      >
                        <div>
                          <div style={{ fontSize: '13.5px', fontWeight: 600, color: colors.textDark }}>{task.title}</div>
                          <div style={{ fontSize: '12px', color: colors.textGray, marginTop: '2px' }}>{task.description}</div>
                        </div>
                        <div>
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            background: tsc.bg,
                            color: tsc.text,
                            fontSize: '11.5px',
                            fontWeight: 600,
                            padding: '4px 12px',
                            borderRadius: '20px',
                          }}>
                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: tsc.dot, display: 'inline-block' }} />
                            {task.status}
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ flex: 1, height: '6px', background: '#E5E7EB', borderRadius: '3px', overflow: 'hidden' }}>
                            <div style={{
                              width: `${task.completion}%`,
                              height: '100%',
                              background: taskBarColor(task.status),
                              borderRadius: '3px',
                            }} />
                          </div>
                          <span style={{ fontSize: '12px', fontWeight: 600, color: colors.textDark, minWidth: '32px' }}>{task.completion}%</span>
                        </div>
                        <div style={{ fontSize: '13px', color: colors.textDark }}>{task.startDate}</div>
                        <div style={{ fontSize: '13px', color: colors.textDark }}>{task.endDate}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            background: avColor,
                            color: '#fff',
                            fontSize: '9.5px',
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}>
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
          <div style={{
            background: colors.cardBg,
            border: `1px solid #E5E7EB`,
            borderRadius: '16px',
            padding: 'clamp(20px, 3vw, 28px)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          }}>
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
                style={{
                  flex: 1,
                  padding: '11px 16px',
                  border: `1px solid #E5E7EB`,
                  borderRadius: '10px',
                  fontSize: '13.5px',
                  outline: 'none',
                  fontFamily: "'Poppins', sans-serif",
                  background: colors.bg,
                }}
              />
              <button
                onClick={handlePostMilestoneComment}
                style={{
                  background: colors.primary,
                  color: '#fff',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '11px 26px',
                  fontSize: '13.5px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: "'Poppins', sans-serif",
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => e.target.style.background = colors.primaryDark}
                onMouseLeave={(e) => e.target.style.background = colors.primary}
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
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: avColor,
                        color: '#fff',
                        fontSize: '11px',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}>
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
        </PMPageLayout>
      </PMLayout>
    );
  }

  // ─── TASK DETAIL VIEW ──────────────────────────────────────────────
  if (selectedProject && selectedTask) {
    const pc = progressColors[selectedTask.progress] || progressColors['To do'];
    const prc = priorityColors[selectedTask.priority] || priorityColors['Medium'];
    const doneCount = selectedTask.subtasks.filter((s) => s.done).length;

    return (
      <PMLayout>
        <PMPageLayout title="Projects">
          <div style={{ marginBottom: '16px' }}>
            <button
              onClick={closeTaskDetail}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'transparent',
                color: colors.primary,
                border: 'none',
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer',
                fontFamily: "'Poppins', sans-serif",
                padding: '8px 0',
              }}
            >
              <i className="fas fa-arrow-left" style={{ fontSize: '13px' }} />
              Back to Sprint
            </button>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.3fr) minmax(0, 1fr)',
            gap: '20px',
            alignItems: 'start',
          }}>
            {/* Left card: task details */}
            <div style={{
              background: colors.cardBg,
              border: `1px solid ${colors.border}`,
              borderRadius: '16px',
              padding: 'clamp(20px, 3vw, 28px)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}>
              <h2 style={{
                fontSize: '20px',
                fontWeight: 700,
                color: colors.textDark,
                margin: '0 0 12px 0',
              }}>
                {selectedTask.title}
              </h2>

              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: pc.bg,
                color: pc.text,
                fontSize: '12px',
                fontWeight: 600,
                padding: '4px 12px',
                borderRadius: '20px',
                marginBottom: '20px',
              }}>
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
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: prc.bg,
                    color: prc.text,
                    fontSize: '12px',
                    fontWeight: 600,
                    padding: '3px 12px',
                    borderRadius: '20px',
                  }}>
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
                <p style={{ fontSize: '13.5px', color: colors.textGray, margin: 0, lineHeight: '1.7' }}>
                  {selectedTask.description}
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: '14px', fontWeight: 600, color: colors.textDark, margin: '0 0 10px 0' }}>Attachments</h4>
                {selectedTask.attachments && selectedTask.attachments.length > 0 ? (
                  selectedTask.attachments.map((file, idx) => (
                    <div key={idx} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 12px',
                      background: colors.bg,
                      borderRadius: '8px',
                      border: `1px solid ${colors.border}`,
                    }}>
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

            {/* Right card: progress + subtasks */}
            <div style={{
              background: colors.cardBg,
              border: `1px solid ${colors.border}`,
              borderRadius: '16px',
              padding: 'clamp(20px, 3vw, 28px)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: colors.textDark, margin: '0 0 14px 0' }}>
                Task Progress
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <div style={{
                  flex: 1,
                  height: '8px',
                  background: colors.bg,
                  borderRadius: '4px',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    width: `${selectedTask.progressPercentage}%`,
                    height: '100%',
                    background: '#F59E0B',
                    borderRadius: '4px',
                  }} />
                </div>
                <span style={{ fontSize: '13px', fontWeight: 600, color: colors.textDark }}>
                  {selectedTask.progressPercentage}%
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: colors.textDark, margin: 0 }}>Subtasks</h3>
                <span style={{ fontSize: '13px', color: colors.textGray }}>
                  ({doneCount}/{selectedTask.subtasks.length})
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {selectedTask.subtasks.map((subtask, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <i
                      className={subtask.done ? 'fas fa-check-circle' : 'far fa-circle'}
                      style={{ color: subtask.done ? colors.primary : colors.textMuted, fontSize: '15px', flexShrink: 0 }}
                    />
                    <span style={{
                      fontSize: '14px',
                      color: subtask.done ? colors.textDark : colors.textGray,
                    }}>
                      {subtask.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </PMPageLayout>
      </PMLayout>
    );
  }

  // ─── DETAIL VIEW ──────────────────────────────────────────────────────
  if (selectedProject) {
    return (
      <PMLayout>
        <PMPageLayout title="Projects">
          {/* Back Button */}
          <div style={{ marginBottom: '16px' }}>
            <button
              onClick={handleBackToProjects}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'transparent',
                color: colors.textGray,
                border: 'none',
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer',
                fontFamily: "'Poppins', sans-serif",
                padding: '8px 0',
              }}
            >
              <i className="fas fa-arrow-left" style={{ fontSize: '14px' }} />
              Back to Projects
            </button>
          </div>

          {/* Title & Subtitle */}
          <div style={{ marginBottom: '18px' }}>
            <h2 style={{
              fontSize: 'clamp(22px, 3vw, 28px)',
              fontWeight: 700,
              color: colors.textDark,
              margin: 0,
            }}>
              {selectedProject.title}
            </h2>
            <p style={{
              fontSize: '14px',
              color: colors.textGray,
              margin: '4px 0 0 0',
            }}>
              {selectedProject.subtitle}
            </p>
          </div>

          {/* Tabs */}
          <div style={{
            display: 'flex',
            gap: 'clamp(12px, 2vw, 28px)',
            borderBottom: `1px solid ${colors.border}`,
            marginBottom: '24px',
            overflowX: 'auto',
            flexWrap: 'nowrap',
          }}>
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
                  transition: 'all 0.2s',
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* ─── TAB CONTENT ──────────────────────────────────────── */}
          {activeTab === 'Overview' && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.3fr) minmax(0, 1fr)',
              gap: '20px',
              alignItems: 'start',
            }}>
              {/* Description card */}
              <div style={{
                background: colors.cardBg,
                border: `1px solid ${colors.border}`,
                borderRadius: '16px',
                padding: 'clamp(20px, 3vw, 28px)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              }}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: colors.textDark,
                  margin: '0 0 12px 0',
                }}>
                  Description
                </h3>
                <p style={{
                  fontSize: '14px',
                  lineHeight: '1.7',
                  color: colors.textGray,
                  margin: 0,
                }}>
                  {selectedProject.description}
                </p>

                <div style={{
                  borderTop: `1px solid ${colors.border}`,
                  margin: '20px 0 16px 0',
                }} />

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span style={{ color: colors.textGray }}>Status</span>
                    <span style={{
                      color: selectedProject.status === 'On track' ? colors.statusOnTrack : '#E0A800',
                      fontWeight: 600,
                    }}>
                      {selectedProject.status}
                    </span>
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

              {/* Team card */}
              <div style={{
                background: colors.cardBg,
                border: `1px solid ${colors.border}`,
                borderRadius: '16px',
                padding: 'clamp(20px, 3vw, 28px)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              }}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: colors.textDark,
                  margin: '0 0 14px 0',
                }}>
                  Team
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {selectedProject.team.map((member, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                      }}
                    >
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: avatarColors[member.initials] || '#ccc',
                        color: '#fff',
                        fontSize: '12px',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        {member.initials}
                      </div>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 500, color: colors.textDark }}>
                          {member.name}
                        </div>
                        <div style={{ fontSize: '12.5px', color: colors.textGray }}>
                          {member.role}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ─── BACKLOG TAB ──────────────────────────────────── */}
          {activeTab === 'Backlog' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
                <button
                  onClick={() => setIsBacklogModalOpen(true)}
                  style={{
                    background: colors.primary,
                    color: '#fff',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '10px 20px',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  Add Backlog
                </button>
              </div>

              <div style={{
                background: colors.cardBg,
                border: `1px solid ${colors.border}`,
                borderRadius: '16px',
                padding: '20px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '16px',
                  flexWrap: 'wrap',
                  gap: '10px',
                }}>
                  <div style={{ position: 'relative' }}>
                    <button
                      onClick={() => setIsFilterOpen(!isFilterOpen)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        background: colors.cardBg,
                        border: `1px solid ${colors.border}`,
                        borderRadius: '8px',
                        padding: '9px 14px',
                        fontSize: '13px',
                        color: colors.textDark,
                        cursor: 'pointer',
                        fontFamily: "'Poppins', sans-serif",
                        minWidth: '170px',
                        justifyContent: 'space-between',
                      }}
                    >
                      Filter by priority
                      <i className="fas fa-chevron-down" style={{ fontSize: '11px', color: colors.textGray }} />
                    </button>
                    {isFilterOpen && (
                      <div style={{
                        position: 'absolute',
                        top: 'calc(100% + 4px)',
                        left: 0,
                        background: colors.cardBg,
                        border: `1px solid ${colors.border}`,
                        borderRadius: '8px',
                        width: '170px',
                        zIndex: 10,
                        overflow: 'hidden',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                      }}>
                        {['Low', 'Medium', 'High'].map((p) => (
                          <div
                            key={p}
                            onClick={() => { setPriorityFilter(p); setIsFilterOpen(false); }}
                            style={{
                              padding: '10px 14px',
                              fontSize: '13px',
                              cursor: 'pointer',
                              background: priorityFilter === p ? colors.primary : 'transparent',
                              color: priorityFilter === p ? '#fff' : colors.textDark,
                              fontFamily: "'Poppins', sans-serif",
                            }}
                            onMouseEnter={(e) => { if (priorityFilter !== p) e.currentTarget.style.background = colors.bg; }}
                            onMouseLeave={(e) => { if (priorityFilter !== p) e.currentTarget.style.background = 'transparent'; }}
                          >
                            {p}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    style={{
                      background: 'transparent',
                      color: colors.primary,
                      border: `1px solid ${colors.primary}`,
                      borderRadius: '8px',
                      padding: '9px 16px',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    Move to sprint
                  </button>
                </div>

                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ background: colors.tableHeaderBg }}>
                        <th style={{ padding: '10px 12px', width: '36px' }}></th>
                        <th style={{ textAlign: 'left', padding: '10px 12px', fontSize: '13px', fontWeight: 600, color: '#fff' }}></th>
                        <th style={{ textAlign: 'left', padding: '10px 12px', fontSize: '13px', fontWeight: 600, color: '#fff' }}>Type</th>
                        <th style={{ textAlign: 'left', padding: '10px 12px', fontSize: '13px', fontWeight: 600, color: '#fff' }}>Priority</th>
                        <th style={{ textAlign: 'left', padding: '10px 12px', fontSize: '13px', fontWeight: 600, color: '#fff' }}>Assignee</th>
                        <th style={{ padding: '10px 12px' }}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {backlogItems.map((item, idx) => {
                        const bpc = priorityColors[item.priority];
                        return (
                          <tr key={item.id} style={{ borderBottom: idx < backlogItems.length - 1 ? `1px solid ${colors.border}` : 'none' }}>
                            <td style={{ padding: '14px 12px' }}>
                              <input type="checkbox" style={{ width: '16px', height: '16px', cursor: 'pointer' }} />
                            </td>
                            <td style={{ padding: '14px 12px', fontSize: '14px', color: colors.textDark }}>
                              {item.title}
                            </td>
                            <td style={{ padding: '14px 12px', fontSize: '14px', color: colors.textDark }}>
                              {item.type}
                            </td>
                            <td style={{ padding: '14px 12px' }}>
                              <span style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                background: bpc.bg,
                                color: bpc.text,
                                fontSize: '12px',
                                fontWeight: 600,
                                padding: '4px 10px',
                                borderRadius: '20px',
                              }}>
                                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: bpc.dot, display: 'inline-block' }} />
                                {item.priority}
                              </span>
                            </td>
                            <td style={{ padding: '14px 12px', fontSize: '14px', color: colors.textDark }}>
                              {item.assignee}
                            </td>
                            <td style={{ padding: '14px 12px', textAlign: 'right' }}>
                              <a href="#" style={{ fontSize: '13px', color: colors.primary, fontWeight: 500, textDecoration: 'underline', cursor: 'pointer' }}>
                                move to sprint
                              </a>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ─── SPRINT INFO TAB ──────────────────────────────────── */}
          {activeTab === 'Sprint info' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
                <button
                  onClick={() => setIsSprintTaskModalOpen(true)}
                  style={{
                    background: colors.primary,
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '8px 18px',
                    fontSize: '13px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    fontFamily: "'Poppins', sans-serif",
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <i className="fas fa-plus" />
                  Add Task
                </button>
              </div>

              <div style={{
                background: colors.cardBg,
                border: `1px solid ${colors.border}`,
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr 1.2fr 1fr 0.5fr',
                  background: colors.tableHeaderBg,
                  padding: '12px 20px',
                  gap: '10px',
                }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#ffffff', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Task</div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#ffffff', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Type</div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#ffffff', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Progress</div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#ffffff', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Assignee</div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#ffffff', letterSpacing: '0.5px', textTransform: 'uppercase', textAlign: 'right' }}>Action</div>
                </div>

                {sprintItems.map((item, idx) => {
                  const spc = progressColors[item.progress];
                  return (
                    <div
                      key={item.id}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '2fr 1fr 1.2fr 1fr 0.5fr',
                        padding: '10px 20px',
                        gap: '10px',
                        borderTop: idx === 0 ? 'none' : `1px solid ${colors.border}`,
                        background: idx % 2 === 0 ? colors.cardBg : colors.bg,
                        transition: 'background 0.15s',
                        alignItems: 'center',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = colors.primaryLight}
                      onMouseLeave={(e) => e.currentTarget.style.background = idx % 2 === 0 ? colors.cardBg : colors.bg}
                    >
                      <div style={{ fontSize: '14px', color: colors.textDark }}>{item.title}</div>
                      <div style={{ fontSize: '14px', color: colors.textDark }}>{item.type}</div>
                      <div>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          background: spc.bg,
                          color: spc.text,
                          fontSize: '12px',
                          fontWeight: 600,
                          padding: '4px 12px',
                          borderRadius: '20px',
                        }}>
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: spc.dot, display: 'inline-block' }} />
                          {item.progress}
                        </span>
                      </div>
                      <div style={{ fontSize: '14px', color: colors.textDark, display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {item.assignee}
                      </div>
                      <div
                        onClick={() => handleViewTask(item)}
                        style={{
                          fontSize: '13px',
                          color: colors.primary,
                          fontWeight: 500,
                          textAlign: 'right',
                          cursor: 'pointer',
                          textDecoration: 'underline',
                        }}
                      >
                        view
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ─── MILESTONES TAB ──────────────────────────────────────── */}
          {activeTab === 'Milestones' && (
            <>
            <div style={{
              background: colors.cardBg,
              border: `1px solid ${colors.border}`,
              borderRadius: '16px',
              padding: 'clamp(20px, 3vw, 28px)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              marginBottom: '20px',
            }}>
              {selectedProject.milestones && selectedProject.milestones.length > 0 ? (
                <div style={{ overflowX: 'auto' }}>
                  <div style={{ minWidth: '900px' }}>
                    {/* Header row */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '40px 1.6fr 1.3fr 1.3fr 1.6fr 0.7fr',
                      gap: '16px',
                      paddingBottom: '14px',
                      marginBottom: '8px',
                      borderBottom: `1px solid ${colors.border}`,
                    }}>
                      <div />
                      <div style={{ fontSize: '13px', fontWeight: 700, color: colors.primary }}>Milestone</div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: colors.primary }}>Status &amp; Progress</div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: colors.primary }}>Schedule</div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: colors.primary }}>Deliverables</div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: colors.primary }}>Comments</div>
                    </div>

                    {/* Milestone rows with connecting timeline */}
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
                            {/* Timeline node + connecting line */}
                            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                              {!isLast && (
                                <div style={{
                                  position: 'absolute',
                                  top: '28px',
                                  bottom: '-16px',
                                  width: '2px',
                                  background: isCompleted ? colors.primary : '#D1D5DB',
                                }} />
                              )}
                              <div style={{
                                width: '26px',
                                height: '26px',
                                borderRadius: '50%',
                                background: isCompleted || isInProgress ? colors.primary : '#E5E7EB',
                                color: isCompleted || isInProgress ? '#fff' : '#9CA3AF',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '12px',
                                fontWeight: 700,
                                flexShrink: 0,
                                zIndex: 1,
                              }}>
                                {isCompleted ? (
                                  <i className="fas fa-check" style={{ fontSize: '11px' }} />
                                ) : (
                                  <span />
                                )}
                              </div>
                            </div>

                            {/* Milestone name */}
                            <div>
                              <div style={{ fontSize: '14px', fontWeight: 700, color: colors.textDark, marginBottom: '4px' }}>
                                {milestone.title}
                              </div>
                              <div style={{ fontSize: '12.5px', color: colors.textGray, marginBottom: '2px' }}>
                                {isCompleted ? `Completed ${milestone.endDate}` : milestone.status}
                              </div>
                              <div style={{ fontSize: '12.5px', color: colors.textGray, marginBottom: '6px' }}>
                                {milestone.assignees.join(', ')}
                              </div>
                              {milestone.description && (
                                <div style={{ fontSize: '12.5px', color: colors.textMuted, lineHeight: '1.5' }}>
                                  {milestone.description}
                                </div>
                              )}
                            </div>

                            {/* Status & Progress */}
                            <div>
                              <span style={{
                                display: 'inline-block',
                                background: spc.bg,
                                color: spc.text,
                                fontSize: '11.5px',
                                fontWeight: 600,
                                padding: '3px 12px',
                                borderRadius: '20px',
                                marginBottom: '8px',
                              }}>
                                {milestone.status}
                              </span>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{
                                  flex: 1,
                                  height: '6px',
                                  background: '#E5E7EB',
                                  borderRadius: '3px',
                                  overflow: 'hidden',
                                }}>
                                  <div style={{
                                    width: `${milestone.progress}%`,
                                    height: '100%',
                                    background: barColor,
                                    borderRadius: '3px',
                                  }} />
                                </div>
                                <span style={{ fontSize: '12px', fontWeight: 600, color: colors.textDark }}>
                                  {milestone.progress}%
                                </span>
                              </div>
                            </div>

                            {/* Schedule */}
                            <div style={{ fontSize: '13px', color: colors.textDark, lineHeight: '1.8' }}>
                              <div>Start: {milestone.startDate}</div>
                              <div>End: {milestone.endDate}</div>
                            </div>

                            {/* Deliverables / Completed so far */}
                            <div>
                              {isInProgress && milestone.completedItems && milestone.completedItems.length > 0 ? (
                                <>
                                  <div style={{ fontSize: '13px', fontWeight: 600, color: colors.textDark, marginBottom: '6px' }}>
                                    Completed so far:
                                  </div>
                                  {milestone.completedItems.map((item, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                                      <i className="fas fa-check-circle" style={{ color: colors.primary, fontSize: '12px' }} />
                                      <span style={{ fontSize: '13px', color: colors.textDark }}>{item}</span>
                                    </div>
                                  ))}
                                </>
                              ) : (
                                milestone.deliverables && milestone.deliverables.map((item, i) => (
                                  <div key={i} style={{ fontSize: '13px', color: colors.textGray, marginBottom: '4px' }}>
                                    • {item}
                                  </div>
                                ))
                              )}
                            </div>

                            {/* Comments */}
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
                <div style={{ padding: '40px', textAlign: 'center', color: colors.textMuted }}>
                  No milestones defined for this project.
                </div>
              )}
            </div>

            {/* ─── GANTT CHART ──────────────────────────────────── */}
            {selectedProject.milestones && selectedProject.milestones.length > 0 && (() => {
              const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
              const parseDate = (str) => {
                const [d, mon, y] = str.split(' ');
                return new Date(parseInt(y), monthNames.indexOf(mon), parseInt(d));
              };

              const starts = selectedProject.milestones.map(m => parseDate(m.startDate));
              const ends = selectedProject.milestones.map(m => parseDate(m.endDate));
              const rangeStart = new Date(Math.min(...starts));
              rangeStart.setDate(1);
              const rangeEndRaw = new Date(Math.max(...ends));
              const rangeEnd = new Date(rangeEndRaw.getFullYear(), rangeEndRaw.getMonth() + 1, 0);

              const months = [];
              let cursor = new Date(rangeStart);
              while (cursor <= rangeEnd) {
                months.push({ label: `${monthNames[cursor.getMonth()]} ${cursor.getFullYear()}`, year: cursor.getFullYear(), month: cursor.getMonth() });
                cursor.setMonth(cursor.getMonth() + 1);
              }
              const totalWeeks = months.length * 4;
              const msPerWeek = 1000 * 60 * 60 * 24 * 7;

              const weekIndexForDate = (date) => {
                const monthIdx = months.findIndex(m => m.year === date.getFullYear() && m.month === date.getMonth());
                const safeMonthIdx = monthIdx === -1 ? 0 : monthIdx;
                const dayOfMonth = date.getDate();
                const weekInMonth = Math.min(3, Math.floor((dayOfMonth - 1) / 7));
                return safeMonthIdx * 4 + weekInMonth;
              };

              const barColorFor = (status) =>
                status === 'Completed' ? '#10B981' :
                status === 'In progress' ? '#3B82F6' : '#9CA3AF';

              return (
                <div style={{
                  background: colors.cardBg,
                  border: `1px solid ${colors.border}`,
                  borderRadius: '16px',
                  padding: 'clamp(20px, 3vw, 28px)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                }}>
                  {/* Header */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '14px',
                    marginBottom: '22px',
                  }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: colors.textDark, margin: 0 }}>
                      Gantt Chart
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '13px', color: colors.textGray }}>Starts on</span>
                        <div style={{
                          border: `1px solid #E5E7EB`,
                          borderRadius: '8px',
                          padding: '7px 12px',
                          fontSize: '13px',
                          color: colors.textDark,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          background: colors.bg,
                        }}>
                          {months[0]?.label}
                          <i className="fas fa-chevron-down" style={{ fontSize: '10px', color: colors.textGray }} />
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '13px', color: colors.textGray }}>View</span>
                        <div style={{
                          border: `1px solid #E5E7EB`,
                          borderRadius: '8px',
                          padding: '7px 12px',
                          fontSize: '13px',
                          color: colors.textDark,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          background: colors.bg,
                        }}>
                          Month
                          <i className="fas fa-chevron-down" style={{ fontSize: '10px', color: colors.textGray }} />
                        </div>
                      </div>
                      <button
                        onClick={() => alert('Exporting Gantt chart...')}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          background: colors.cardBg,
                          border: `1px solid #E5E7EB`,
                          borderRadius: '8px',
                          padding: '8px 16px',
                          fontSize: '13px',
                          fontWeight: 600,
                          color: colors.textDark,
                          cursor: 'pointer',
                          fontFamily: "'Poppins', sans-serif",
                        }}
                      >
                        <i className="fas fa-arrow-down" style={{ fontSize: '11px' }} />
                        Export
                      </button>
                    </div>
                  </div>

                  <div style={{ overflowX: 'auto' }}>
                    <div style={{ minWidth: `${180 + totalWeeks * 34}px` }}>
                      {/* Month header row */}
                      <div style={{ display: 'grid', gridTemplateColumns: `180px repeat(${months.length}, ${34 * 4}px)` }}>
                        <div />
                        {months.map((m, idx) => (
                          <div key={idx} style={{
                            textAlign: 'center',
                            fontSize: '12.5px',
                            fontWeight: 700,
                            color: colors.textDark,
                            padding: '6px 0',
                            borderLeft: idx === 0 ? `1px solid #EEF0F2` : 'none',
                            borderRight: `1px solid #EEF0F2`,
                            borderTop: `1px solid #EEF0F2`,
                          }}>
                            {m.label}
                          </div>
                        ))}
                      </div>

                      {/* Week sub-header row */}
                      <div style={{ display: 'grid', gridTemplateColumns: `180px repeat(${totalWeeks}, 34px)`, marginBottom: '4px' }}>
                        <div style={{ fontSize: '12px', fontWeight: 700, color: colors.textGray, display: 'flex', alignItems: 'center', padding: '8px 4px' }}>
                          Milestone
                        </div>
                        {Array.from({ length: totalWeeks }).map((_, idx) => (
                          <div key={idx} style={{
                            textAlign: 'center',
                            fontSize: '11px',
                            color: colors.textGray,
                            padding: '6px 0',
                            borderRight: `1px solid #F0F1F3`,
                            borderBottom: `1px solid #EEF0F2`,
                          }}>
                            W{(idx % 4) + 1}
                          </div>
                        ))}
                      </div>

                      {/* Milestone rows */}
                      {selectedProject.milestones.map((milestone, idx) => {
                        const startW = weekIndexForDate(parseDate(milestone.startDate));
                        const endW = weekIndexForDate(parseDate(milestone.endDate));
                        const span = Math.max(1, endW - startW + 1);
                        const isCompleted = milestone.status === 'Completed';
                        const isInProgress = milestone.status === 'In progress';
                        const color = barColorFor(milestone.status);

                        return (
                          <div key={idx} style={{
                            display: 'grid',
                            gridTemplateColumns: `180px repeat(${totalWeeks}, 34px)`,
                            alignItems: 'center',
                          }}>
                            <div style={{ fontSize: '13px', color: colors.textDark, padding: '10px 4px', fontWeight: 500 }}>
                              {milestone.title}
                            </div>
                            <div style={{
                              gridColumn: `2 / span ${totalWeeks}`,
                              position: 'relative',
                              height: '38px',
                              borderBottom: `1px solid #F5F6F7`,
                              display: 'grid',
                              gridTemplateColumns: `repeat(${totalWeeks}, 34px)`,
                            }}>
                              {Array.from({ length: totalWeeks }).map((_, wIdx) => (
                                <div key={wIdx} style={{ borderRight: `1px solid #F5F6F7` }} />
                              ))}
                              <div style={{
                                position: 'absolute',
                                left: `${startW * 34}px`,
                                width: `${span * 34 - 6}px`,
                                top: '50%',
                                transform: 'translateY(-50%)',
                                height: '16px',
                                borderRadius: '8px',
                                background: color,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: isCompleted ? 'flex-end' : (isInProgress ? 'flex-start' : 'center'),
                                paddingRight: isCompleted ? '-2px' : 0,
                              }}>
                                {isCompleted && (
                                  <div style={{
                                    width: '18px',
                                    height: '18px',
                                    borderRadius: '50%',
                                    background: color,
                                    border: '2px solid #fff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginRight: '-9px',
                                    boxShadow: '0 0 0 1px ' + color,
                                  }}>
                                    <i className="fas fa-check" style={{ fontSize: '9px', color: '#fff' }} />
                                  </div>
                                )}
                              </div>
                              {isInProgress && (
                                <div style={{
                                  position: 'absolute',
                                  left: `${startW * 34 + span * 34 + 4}px`,
                                  top: '50%',
                                  transform: 'translateY(-50%)',
                                  fontSize: '12px',
                                  fontWeight: 700,
                                  color: colors.textDark,
                                  whiteSpace: 'nowrap',
                                }}>
                                  {milestone.progress}%
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })()}
            </>
          )}

          {/* ─── DOCUMENTS TAB (UPDATED with upload) ───────────────── */}
          {activeTab === 'Documents' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    background: colors.primary,
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '8px 18px',
                    fontSize: '13px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    fontFamily: "'Poppins', sans-serif",
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <i className="fas fa-upload" />
                  Upload Document
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />
              </div>

              <div style={{
                background: colors.cardBg,
                border: `1px solid ${colors.border}`,
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr 0.8fr',
                  background: colors.tableHeaderBg,
                  padding: '12px 20px',
                  gap: '10px',
                }}>
                  <div style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#ffffff',
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                  }}>
                    Document
                  </div>
                  <div style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#ffffff',
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                  }}>
                    Uploaded by
                  </div>
                  <div style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#ffffff',
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                    textAlign: 'right',
                  }}>
                    Action
                  </div>
                </div>

                {(() => {
                  const projectId = selectedProject.id;
                  const originalDocs = selectedProject.documents || [];
                  const uploaded = uploadedDocs[projectId] || [];
                  const allDocs = [...originalDocs, ...uploaded];

                  if (allDocs.length === 0) {
                    return (
                      <div style={{ padding: '40px 20px', textAlign: 'center', color: colors.textMuted }}>
                        <i className="fas fa-folder-open" style={{ fontSize: '32px', display: 'block', marginBottom: '12px' }} />
                        No documents uploaded for this project.
                      </div>
                    );
                  }

                  return allDocs.map((doc, idx) => {
                    const uploaderInitials = doc.uploadedBy.split(' ').map(n => n[0]).join('').toUpperCase();
                    const uploaderColor = avatarColors[uploaderInitials] || '#999';

                    return (
                      <div
                        key={idx}
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '2fr 1fr 0.8fr',
                          padding: '10px 20px',
                          gap: '10px',
                          borderTop: idx === 0 ? 'none' : `1px solid ${colors.border}`,
                          background: idx % 2 === 0 ? colors.cardBg : colors.bg,
                          transition: 'background 0.15s',
                          alignItems: 'center',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = colors.primaryLight}
                        onMouseLeave={(e) => e.currentTarget.style.background = idx % 2 === 0 ? colors.cardBg : colors.bg}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <i className="fas fa-file-alt" style={{ color: colors.primary, fontSize: '16px' }} />
                          <span style={{ fontSize: '14px', color: colors.textDark }}>
                            {doc.name}
                          </span>
                          {doc.isUploaded && (
                            <span style={{ fontSize: '10px', fontWeight: 600, background: colors.primaryLight, color: colors.primary, padding: '1px 8px', borderRadius: '12px' }}>
                              uploaded
                            </span>
                          )}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            background: uploaderColor,
                            color: '#fff',
                            fontSize: '9px',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}>
                            {uploaderInitials}
                          </div>
                          <span style={{ fontSize: '14px', color: colors.textGray }}>
                            {doc.uploadedBy}
                          </span>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <button
                            onClick={() => {
                              alert(`Downloading: ${doc.name}`);
                            }}
                            style={{
                              background: 'transparent',
                              border: 'none',
                              color: colors.primary,
                              fontSize: '13px',
                              fontWeight: 500,
                              cursor: 'pointer',
                              fontFamily: "'Poppins', sans-serif",
                              textDecoration: 'underline',
                              padding: '4px 8px',
                              borderRadius: '4px',
                              transition: 'background 0.15s',
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = colors.primaryLight}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                          >
                            Download
                          </button>
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>
          )}

          {/* ─── OTHER TABS (placeholder) ──────────────────────── */}
          {activeTab !== 'Overview' && activeTab !== 'Backlog' && activeTab !== 'Sprint info' && activeTab !== 'Milestones' && activeTab !== 'Documents' && (
            <div style={{
              background: colors.cardBg,
              border: `1px solid ${colors.border}`,
              borderRadius: '16px',
              padding: '40px 20px',
              textAlign: 'center',
              color: colors.textGray,
            }}>
              <i className="fas fa-construction" style={{ fontSize: '36px', color: colors.textMuted, marginBottom: '12px', display: 'block' }} />
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: colors.textDark, margin: 0 }}>{activeTab}</h3>
              <p style={{ fontSize: '14px', margin: '6px 0 0 0' }}>Content for {activeTab} will be displayed here.</p>
            </div>
          )}

          {/* ─── CREATE BACKLOG MODAL ──────────────────────────────────── */}
          {isBacklogModalOpen && (
            <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
              <div style={{
                background: colors.cardBg,
                borderRadius: '16px',
                padding: 'clamp(24px, 3vw, 36px)',
                width: '460px',
                maxWidth: '90vw',
                maxHeight: '90vh',
                overflowY: 'auto',
                boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
                position: 'relative',
              }}>
                <button
                  onClick={() => setIsBacklogModalOpen(false)}
                  style={{ position: 'absolute', top: '12px', right: '16px', background: 'transparent', border: 'none', fontSize: '24px', cursor: 'pointer', color: colors.textGray }}
                >
                  ×
                </button>

                <h2 style={{ fontSize: '20px', fontWeight: 700, color: colors.textDark, margin: '0 0 4px 0' }}>Create Backlog</h2>
                <p style={{ fontSize: '14px', fontWeight: 600, color: colors.primary, margin: '0 0 20px 0' }}>{selectedProject.title}</p>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: colors.textGray, marginBottom: '4px' }}>Task</label>
                  <input
                    type="text"
                    value={backlogTask}
                    onChange={(e) => setBacklogTask(e.target.value)}
                    placeholder="Enter task name"
                    style={{ width: '100%', padding: '10px 14px', border: `1px solid ${colors.border}`, borderRadius: '8px', fontSize: '14px', outline: 'none', fontFamily: "'Poppins', sans-serif", boxSizing: 'border-box', background: '#fff' }}
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: colors.textGray, marginBottom: '4px' }}>Type</label>
                  <select
                    value={backlogType}
                    onChange={(e) => setBacklogType(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', border: `1px solid ${colors.border}`, borderRadius: '8px', fontSize: '14px', outline: 'none', fontFamily: "'Poppins', sans-serif", boxSizing: 'border-box', background: '#fff', appearance: 'auto' }}
                  >
                    {typeOptions.map((opt) => (<option key={opt} value={opt}>{opt}</option>))}
                  </select>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: colors.textGray, marginBottom: '4px' }}>Priority</label>
                  <select
                    value={backlogPriority}
                    onChange={(e) => setBacklogPriority(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', border: `1px solid ${colors.border}`, borderRadius: '8px', fontSize: '14px', outline: 'none', fontFamily: "'Poppins', sans-serif", boxSizing: 'border-box', background: '#fff', appearance: 'auto' }}
                  >
                    {priorityOptions.map((opt) => (<option key={opt} value={opt}>{opt}</option>))}
                  </select>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: colors.textGray, marginBottom: '4px' }}>Assignee</label>
                  <select
                    value={backlogAssignee}
                    onChange={(e) => setBacklogAssignee(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', border: `1px solid ${colors.border}`, borderRadius: '8px', fontSize: '14px', outline: 'none', fontFamily: "'Poppins', sans-serif", boxSizing: 'border-box', background: '#fff', appearance: 'auto' }}
                  >
                    <option value="">Select assignee</option>
                    {assigneeOptions.map((opt) => (<option key={opt} value={opt}>{opt}</option>))}
                  </select>
                </div>

                <button
                  onClick={handleCreateBacklog}
                  style={{ width: '100%', padding: '12px', background: colors.primary, color: '#fff', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: 600, cursor: 'pointer', fontFamily: "'Poppins', sans-serif", transition: 'background 0.2s' }}
                  onMouseEnter={(e) => e.target.style.background = colors.primaryDark}
                  onMouseLeave={(e) => e.target.style.background = colors.primary}
                >
                  Create Backlog
                </button>
              </div>
            </div>
          )}

          {/* ─── CREATE SPRINT TASK MODAL ────────────────────────────── */}
          {isSprintTaskModalOpen && (
            <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
              <div style={{
                background: colors.cardBg,
                borderRadius: '16px',
                padding: 'clamp(24px, 3vw, 36px)',
                width: '460px',
                maxWidth: '90vw',
                maxHeight: '90vh',
                overflowY: 'auto',
                boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
                position: 'relative',
              }}>
                <button
                  onClick={() => setIsSprintTaskModalOpen(false)}
                  style={{ position: 'absolute', top: '12px', right: '16px', background: 'transparent', border: 'none', fontSize: '24px', cursor: 'pointer', color: colors.textGray }}
                >
                  ×
                </button>

                <h2 style={{ fontSize: '20px', fontWeight: 700, color: colors.textDark, margin: '0 0 4px 0' }}>Create task</h2>
                <p style={{ fontSize: '14px', fontWeight: 600, color: colors.primary, margin: '0 0 20px 0' }}>{selectedProject.title}</p>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: colors.textGray, marginBottom: '4px' }}>Task</label>
                  <input
                    type="text"
                    value={sprintTask}
                    onChange={(e) => setSprintTask(e.target.value)}
                    placeholder="Enter task name"
                    style={{ width: '100%', padding: '10px 14px', border: `1px solid ${colors.border}`, borderRadius: '8px', fontSize: '14px', outline: 'none', fontFamily: "'Poppins', sans-serif", boxSizing: 'border-box', background: '#fff' }}
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: colors.textGray, marginBottom: '4px' }}>Description</label>
                  <textarea
                    value={sprintDescription}
                    onChange={(e) => setSprintDescription(e.target.value)}
                    placeholder="Describe the task..."
                    rows={3}
                    style={{ width: '100%', padding: '10px 14px', border: `1px solid ${colors.border}`, borderRadius: '8px', fontSize: '14px', outline: 'none', fontFamily: "'Poppins', sans-serif", boxSizing: 'border-box', background: '#fff', resize: 'vertical' }}
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: colors.textGray, marginBottom: '4px' }}>Deadline</label>
                  <input
                    type="date"
                    value={sprintDeadline}
                    onChange={(e) => setSprintDeadline(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', border: `1px solid ${colors.border}`, borderRadius: '8px', fontSize: '14px', outline: 'none', fontFamily: "'Poppins', sans-serif", boxSizing: 'border-box', background: '#fff' }}
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: colors.textGray, marginBottom: '4px' }}>Assignee</label>
                  <select
                    value={sprintAssignee}
                    onChange={(e) => setSprintAssignee(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', border: `1px solid ${colors.border}`, borderRadius: '8px', fontSize: '14px', outline: 'none', fontFamily: "'Poppins', sans-serif", boxSizing: 'border-box', background: '#fff', appearance: 'auto' }}
                  >
                    <option value="">Select assignee</option>
                    {assigneeOptions.map((opt) => (<option key={opt} value={opt}>{opt}</option>))}
                  </select>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: colors.textGray, marginBottom: '4px' }}>Priority</label>
                  <select
                    value={sprintPriority}
                    onChange={(e) => setSprintPriority(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', border: `1px solid ${colors.border}`, borderRadius: '8px', fontSize: '14px', outline: 'none', fontFamily: "'Poppins', sans-serif", boxSizing: 'border-box', background: '#fff', appearance: 'auto' }}
                  >
                    {priorityOptions.map((opt) => (<option key={opt} value={opt}>{opt}</option>))}
                  </select>
                </div>

                <button
                  onClick={handleCreateSprintTask}
                  style={{ width: '100%', padding: '12px', background: colors.primary, color: '#fff', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: 600, cursor: 'pointer', fontFamily: "'Poppins', sans-serif", transition: 'background 0.2s' }}
                  onMouseEnter={(e) => e.target.style.background = colors.primaryDark}
                  onMouseLeave={(e) => e.target.style.background = colors.primary}
                >
                  Create task
                </button>
              </div>
            </div>
          )}
        </PMPageLayout>
      </PMLayout>
    );
  }

  // ─── GRID VIEW ──────────────────────────────────────────────────────
  return (
    <PMLayout>
      <PMPageLayout title="Projects">
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
          <button
            onClick={() => setIsModalOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: colors.primary,
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              padding: '10px 18px',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            <i className="fas fa-plus" style={{ fontSize: '14px' }} />
            Create Project
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
          {projects.map((project) => (
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
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: colors.textDark, margin: '0 0 4px 0' }}>{project.title}</h3>
              <p style={{ fontSize: '13px', color: colors.textGray, margin: '0 0 16px 0' }}>{project.subtitle}</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                {project.team.slice(0, 4).map((member, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: avatarColors[member.initials] || '#ccc',
                      color: '#fff',
                      fontSize: '11px',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      {member.initials}
                    </div>
                    <span style={{ fontSize: '13px', color: colors.textDark }}>
                      {member.name} . <span style={{ color: colors.textGray }}>{member.role}</span>
                    </span>
                  </div>
                ))}
                {project.team.length > 4 && (
                  <div style={{ fontSize: '12px', color: colors.textMuted, paddingLeft: '38px' }}>
                    +{project.team.length - 4} more
                  </div>
                )}
              </div>

              <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: `1px solid ${colors.border}`, display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={(e) => { e.stopPropagation(); handleViewProject(project.id); }}
                  style={{
                    background: colors.primary,
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '6px 20px',
                    fontSize: '13px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </PMPageLayout>

      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateProject}
      />
    </PMLayout>
  );
}