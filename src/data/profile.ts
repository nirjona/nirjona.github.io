/**
 * All portfolio content lives here.
 * Edit this file to update the site — components only render this data.
 */

export interface SocialLink {
  label: string
  /** Font Awesome class, e.g. "fas fa-envelope" */
  icon: string
  url: string
}

export interface EducationEntry {
  degree: string
  institution: string
}

export interface Publication {
  authors: string[]
  /** Author name to render in bold */
  highlighted: string
  year: number
  title: string
  url: string
  venue: string
  links: { label: string; url: string }[]
}

export interface ExperienceEntry {
  role: string
  company: string
  companyUrl: string
  period: string
  location: string
  /** Whether this is a current position (filled timeline dot) */
  current: boolean
  highlights: string[]
}

export interface Project {
  name: string
  url: string
  stack: string
  meta?: string
  description: string
  links: { label: string; url: string }[]
}

export interface Award {
  title: string
  org: string
  year: number
  url?: string
}

export interface SkillGroup {
  category: string
  items: string[]
}

export interface Activity {
  title: string
  detail: string
  url?: string
}

export const profile = {
  name: 'Tasnim Fariha',
  role: 'Software Engineer',
  organization: { name: 'RocketPhone.ai', url: 'https://rocketphone.ai' },
  avatar: './media/avatar.png',

  social: [
    { label: 'Email', icon: 'fas fa-envelope', url: 'mailto:nirjonafariha@gmail.com' },
    { label: 'GitHub', icon: 'fab fa-github', url: 'https://github.com/nirjona' },
    {
      label: 'LinkedIn',
      icon: 'fab fa-linkedin',
      url: 'https://www.linkedin.com/in/tasnim-fariha-a71980202/',
    },
  ] as SocialLink[],

  bio: {
    greeting: 'Hi! Welcome to my website! :)',
    paragraphs: [
      {
        text: 'I am a Software Engineer at {org}, where I build the frontend of the admin portal and RocketPhone for Salesforce using React, TypeScript, and Salesforce Lightning Web Components. I obtained my B.Sc. in Computer Science & Engineering from the {mist}.',
      },
      {
        text: 'My research focuses on computer vision and deep learning for autonomous vehicles and intelligent transportation systems, particularly in heterogeneous traffic conditions. I have worked on monocular vision-based vehicle distance prediction and on building large-scale annotated datasets for autonomous driving in non-lane-based traffic, published at IEEE EICT and on arXiv. I am actively seeking research opportunities in computer vision, machine learning, and autonomous systems.',
      },
    ],
    linkTargets: {
      org: { label: 'RocketPhone.ai', url: 'https://rocketphone.ai' },
      mist: {
        label: 'Military Institute of Science & Technology (MIST)',
        url: 'https://mist.ac.bd',
      },
    },
  },

  education: [
    {
      degree: 'B.Sc. in Computer Science & Engineering, 2023',
      institution: 'Military Institute of Science & Technology (MIST)',
    },
  ] as EducationEntry[],

  interests: [
    'Computer Vision',
    'Deep Learning',
    'Autonomous Vehicles',
    'Software Engineering',
  ],

  publications: [
    {
      authors: [
        'Mahedi Kamal',
        'Tasnim Fariha',
        'Afrina Kabir Zinia',
        'Md. Abu Syed',
        'Fahim Hasan Khan',
        'Md. Mahbubur Rahman',
      ],
      highlighted: 'Tasnim Fariha',
      year: 2024,
      title: 'ANNA: A Deep Learning Based Dataset in Heterogeneous Traffic for Autonomous Vehicles',
      url: 'https://arxiv.org/abs/2401.11358',
      venue: 'arXiv preprint arXiv:2401.11358',
      links: [
        { label: 'arXiv', url: 'https://arxiv.org/abs/2401.11358' },
        { label: 'PDF', url: 'https://arxiv.org/pdf/2401.11358' },
      ],
    },
    {
      authors: [
        'Mahedi Kamal',
        'Md. Abu Syed',
        'Tasnim Fariha',
        'Afrina Kabir Zinia',
        'Fahim Hasan Khan',
        'Md. Mahbubur Rahman',
      ],
      highlighted: 'Tasnim Fariha',
      year: 2023,
      title: 'Monocular Vision-Based Vehicle Distance Prediction utilizing Number Plate',
      url: 'https://ieeexplore.ieee.org/document/10427654',
      venue:
        '2023 6th International Conference on Electrical Information and Communication Technology (EICT), IEEE',
      links: [{ label: 'IEEE Xplore', url: 'https://ieeexplore.ieee.org/document/10427654' }],
    },
  ] as Publication[],

  experience: [
    {
      role: 'Software Engineer',
      company: 'RocketPhone.ai',
      companyUrl: 'https://rocketphone.ai',
      period: 'Jun 2023 – Present',
      location: 'Dhaka, Bangladesh',
      current: true,
      highlights: [
        'Developed the frontend of the admin portal with React & TypeScript, and the Rocket Native SIP Dialler with Salesforce LWC, enabling a softphone inside Salesforce CRM for VoIP calls over SIP.',
        'Collaborated on RocketPhone for Salesforce (RP4S) with React, TypeScript & Redux Toolkit, serving 1,000+ users, and on the RocketPhone Web App, reducing latency and regression bugs.',
        "Built the admin portal proxy server with FastAPI, designed Role-Based Access Control, and developed reusable web components for @voiceiq/viq.web.components, RocketPhone's design library.",
      ],
    },
    {
      role: 'Intern',
      company: 'RedDot Digital Limited',
      companyUrl: 'https://reddotdigitalit.com',
      period: 'May 2023 – Jun 2023',
      location: 'Dhaka, Bangladesh',
      current: false,
      highlights: [
        'Designed and implemented a Student Attendance Management System using React and Flask.',
      ],
    },
    {
      role: 'Industrial Trainee',
      company: 'Robi Axiata Limited',
      companyUrl: 'https://www.robi.com.bd',
      period: 'Jan 2022 – Feb 2022',
      location: 'Dhaka, Bangladesh',
      current: false,
      highlights: [
        'Completed training covering 5G technology, network security, and Value Added Services.',
      ],
    },
  ] as ExperienceEntry[],

  projects: [
    {
      name: 'Blueberry Auto',
      url: 'https://blueberry-auto.vercel.app/',
      stack: 'React, TypeScript, Axiom Design Library, Supabase',
      meta: 'Ongoing',
      description:
        'A leading car buying and selling website — designed and developed the user interface, API calls, and backend architecture, including a live currency converter with database caching and a Supabase edge function with daily auto-refreshing exchange rates.',
      links: [{ label: 'Demo', url: 'https://blueberry-auto.vercel.app/' }],
    },
    {
      name: 'Agro Drone',
      url: 'https://www.youtube.com/watch?v=0nTdDAE_43Q',
      stack: 'HTML, CSS, JavaScript, Flask, SQLite',
      meta: 'YOLOv5, VGG-16',
      description:
        'Integrated Design Project where the FPV camera on a drone detects mango leaf diseases using computer vision, powered by YOLOv5 and VGG-16 deep learning models.',
      links: [{ label: 'Demo', url: 'https://www.youtube.com/watch?v=0nTdDAE_43Q' }],
    },
    {
      name: 'Multi-Object Detection using Deep Learning',
      url: 'https://drive.google.com/file/d/1a3CcWiCC8e_eLTKSu6F2Myg9OCL3RZ9r/view',
      stack: 'Python, YOLOv5',
      meta: 'COCO dataset',
      description:
        'Used YOLOv5 for multi-object detection and compared the evaluation metrics against the COCO dataset benchmark.',
      links: [
        {
          label: 'Demo',
          url: 'https://drive.google.com/file/d/1a3CcWiCC8e_eLTKSu6F2Myg9OCL3RZ9r/view',
        },
      ],
    },
    {
      name: 'Orphanage Management System',
      url: 'https://github.com/nirjona/Orphanage-Management-System',
      stack: 'HTML, CSS, JavaScript, PHP, OracleDB',
      description:
        'A web app that securely stores the information of orphans and the foster parents of adopted kids of an orphanage.',
      links: [
        { label: 'GitHub', url: 'https://github.com/nirjona/Orphanage-Management-System' },
      ],
    },
    {
      name: "Fariha's Movie Blog",
      url: 'https://nirjona.github.io/nirjonas_movieBlog/',
      stack: 'HTML, CSS, JavaScript',
      description: 'A movie blog where I share my thoughts and reviews.',
      links: [{ label: 'Demo', url: 'https://nirjona.github.io/nirjonas_movieBlog/' }],
    },
  ] as Project[],

  awards: [
    {
      title: 'Champion — Salesforce Hackathon Bangladesh',
      org: 'Team Rocket Native',
      year: 2025,
    },
    {
      title: '2nd Runners Up — Anatolian Rover Challenge, Turkey',
      org: 'Team MIST Mongol Barota',
      year: 2022,
      url: 'https://drive.google.com/file/d/1AUt2ruH7G2l7iKODbuHLHqAYi_FlOnhK/view?usp=sharing',
    },
    {
      title: '1st Runners Up — Hackathon, ICT Innovation Fest',
      org: 'MIST',
      year: 2021,
      url: 'https://drive.google.com/file/d/1meVsvowoOg7B9dT66NhhKa0_tB-pOwX4/view?usp=sharing',
    },
    {
      title: '1st Runners Up — App Contest, ICT Innovation Fest',
      org: 'MIST',
      year: 2021,
      url: 'https://drive.google.com/file/d/1mX-1R3groQS88CYLPBHzRWYXX-ierzr2/view',
    },
  ] as Award[],

  skills: [
    { category: 'Languages', items: ['C/C++', 'JavaScript', 'TypeScript', 'Python', 'SQL', 'MATLAB'] },
    { category: 'Frameworks', items: ['Node.js', 'React.js', 'FastAPI', 'OpenCV', 'PyTorch', 'TensorFlow'] },
    { category: 'Databases', items: ['OracleDB', 'Supabase', 'MongoDB'] },
    { category: 'Tools', items: ['Git', 'Bitbucket', 'Cursor', 'Postman', 'Google Colab'] },
  ] as SkillGroup[],

  activities: [
    {
      title: 'Project Showcasing',
      detail: 'at Mind Sparks 2022, AUST.',
      url: 'https://drive.google.com/file/d/1motRzQqgc-Vun9wJaPK-T5JGQHgbPqow/view',
    },
    {
      title: 'Idea Contest',
      detail: 'at RUET CSE Fest 2022, RUET.',
      url: 'https://drive.google.com/file/d/1mmZalquVFgw26qgqkQ3fkRNblGEY0THQ/view',
    },
    {
      title: 'Business Case Competition',
      detail: 'at Biznation 2020, IUT.',
      url: 'https://drive.google.com/file/d/1pRAltB65kApXU9G6q1Sry_NAZhwPDTiz/view',
    },
    {
      title: 'App UI Design for farmers',
      detail: 'Human-Computer Interaction contest, MIST.',
    },
  ] as Activity[],

  nav: [
    { label: 'Home', target: 'about' },
    { label: 'Research', target: 'publications' },
    { label: 'Experience', target: 'experience' },
    { label: 'Projects', target: 'projects' },
    { label: 'Awards', target: 'accomplishments' },
    { label: 'Skills', target: 'skills' },
    { label: 'Activities', target: 'activities' },
  ],

  copyrightYear: 2026,
}

export type Profile = typeof profile
