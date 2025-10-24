// Demo data for testing the search interface
// Use this if you don't have a backend API yet

export const demoDepartments = [
  {
    id: 1,
    name: 'Computer Science',
    description: 'Study of computation, algorithms, and information systems',
    specialites_count: 4
  },
  {
    id: 2,
    name: 'Economics',
    description: 'Analysis of production, distribution, and consumption of goods',
    specialites_count: 3
  },
  {
    id: 3,
    name: 'Languages',
    description: 'Study of languages, linguistics, and cultural communication',
    specialites_count: 3
  },
  {
    id: 4,
    name: 'Sciences',
    description: 'Natural sciences including physics, chemistry, and biology',
    specialites_count: 4
  },
  {
    id: 5,
    name: 'Engineering',
    description: 'Applied sciences and technology for practical solutions',
    specialites_count: 5
  },
  {
    id: 6,
    name: 'Business Administration',
    description: 'Management, finance, and organizational leadership',
    specialites_count: 4
  }
];

export const demoSpecialites = {
  1: [ // Computer Science
    {
      id: 101,
      name: 'Artificial Intelligence',
      description: 'Machine learning, neural networks, and intelligent systems',
      users_count: 45
    },
    {
      id: 102,
      name: 'Data Science',
      description: 'Big data analytics, statistics, and data mining',
      users_count: 38
    },
    {
      id: 103,
      name: 'Cybersecurity',
      description: 'Information security, cryptography, and network protection',
      users_count: 32
    },
    {
      id: 104,
      name: 'Software Engineering',
      description: 'Software development, architecture, and project management',
      users_count: 52
    }
  ],
  2: [ // Economics
    {
      id: 201,
      name: 'Financial Economics',
      description: 'Banking, investment, and financial markets',
      users_count: 28
    },
    {
      id: 202,
      name: 'International Trade',
      description: 'Global commerce, import/export, and trade policies',
      users_count: 24
    },
    {
      id: 203,
      name: 'Development Economics',
      description: 'Economic growth, poverty reduction, and sustainability',
      users_count: 19
    }
  ],
  3: [ // Languages
    {
      id: 301,
      name: 'English Literature',
      description: 'Classic and modern English literary works',
      users_count: 35
    },
    {
      id: 302,
      name: 'Applied Linguistics',
      description: 'Language teaching, translation, and interpretation',
      users_count: 29
    },
    {
      id: 303,
      name: 'Comparative Literature',
      description: 'Cross-cultural literary analysis and criticism',
      users_count: 22
    }
  ],
  4: [ // Sciences
    {
      id: 401,
      name: 'Physics',
      description: 'Classical and quantum physics, mechanics, thermodynamics',
      users_count: 31
    },
    {
      id: 402,
      name: 'Chemistry',
      description: 'Organic, inorganic, and analytical chemistry',
      users_count: 27
    },
    {
      id: 403,
      name: 'Biology',
      description: 'Life sciences, genetics, and molecular biology',
      users_count: 41
    },
    {
      id: 404,
      name: 'Environmental Science',
      description: 'Ecology, conservation, and climate studies',
      users_count: 33
    }
  ],
  5: [ // Engineering
    {
      id: 501,
      name: 'Mechanical Engineering',
      description: 'Design and manufacturing of mechanical systems',
      users_count: 48
    },
    {
      id: 502,
      name: 'Electrical Engineering',
      description: 'Electronics, power systems, and telecommunications',
      users_count: 44
    },
    {
      id: 503,
      name: 'Civil Engineering',
      description: 'Infrastructure, construction, and urban planning',
      users_count: 39
    },
    {
      id: 504,
      name: 'Chemical Engineering',
      description: 'Process engineering and industrial chemistry',
      users_count: 26
    },
    {
      id: 505,
      name: 'Aerospace Engineering',
      description: 'Aircraft and spacecraft design and systems',
      users_count: 21
    }
  ],
  6: [ // Business Administration
    {
      id: 601,
      name: 'Marketing',
      description: 'Brand management, digital marketing, and consumer behavior',
      users_count: 36
    },
    {
      id: 602,
      name: 'Finance',
      description: 'Corporate finance, investments, and risk management',
      users_count: 42
    },
    {
      id: 603,
      name: 'Human Resources',
      description: 'Talent management, organizational behavior, and recruitment',
      users_count: 30
    },
    {
      id: 604,
      name: 'Entrepreneurship',
      description: 'Startups, innovation, and business development',
      users_count: 25
    }
  ]
};

export const demoUsers = {
  101: [ // AI Specialty
    {
      id: 1001,
      name: 'John Smith',
      email: 'john.smith@university.edu',
      role: 'Student',
      profile_image: null,
      cv_url: 'https://example.com/cv/john-smith.pdf',
      portfolio_url: 'https://johnsmith.dev',
      linkedin_url: 'https://linkedin.com/in/johnsmith',
      phone: '+1 234 567 890',
      location: 'New York, USA',
      bio: 'Passionate about machine learning and neural networks. Currently working on computer vision projects.',
      skills: ['Python', 'TensorFlow', 'PyTorch', 'Computer Vision', 'NLP']
    },
    {
      id: 1002,
      name: 'Emma Johnson',
      email: 'emma.j@university.edu',
      role: 'Student',
      profile_image: null,
      cv_url: 'https://example.com/cv/emma-johnson.pdf',
      portfolio_url: null,
      linkedin_url: 'https://linkedin.com/in/emmajohnson',
      phone: '+1 234 567 891',
      location: 'San Francisco, USA',
      bio: 'AI researcher focusing on reinforcement learning and autonomous systems.',
      skills: ['Python', 'Reinforcement Learning', 'Deep Learning', 'Research']
    },
    {
      id: 1003,
      name: 'Michael Chen',
      email: 'michael.chen@university.edu',
      role: 'Alumni',
      profile_image: null,
      cv_url: 'https://example.com/cv/michael-chen.pdf',
      portfolio_url: 'https://michaelchen.ai',
      linkedin_url: 'https://linkedin.com/in/michaelchen',
      phone: '+1 234 567 892',
      location: 'Seattle, USA',
      bio: 'Senior ML Engineer at Tech Corp. Previously researched NLP and chatbots.',
      skills: ['Python', 'NLP', 'Transformers', 'MLOps', 'AWS']
    }
  ],
  102: [ // Data Science Specialty
    {
      id: 1004,
      name: 'Sarah Williams',
      email: 'sarah.w@university.edu',
      role: 'Student',
      profile_image: null,
      cv_url: 'https://example.com/cv/sarah-williams.pdf',
      portfolio_url: 'https://sarahanalytics.com',
      linkedin_url: 'https://linkedin.com/in/sarahwilliams',
      phone: '+1 234 567 893',
      location: 'Boston, USA',
      bio: 'Data analyst specializing in predictive modeling and business intelligence.',
      skills: ['Python', 'R', 'SQL', 'Tableau', 'Statistics']
    },
    {
      id: 1005,
      name: 'David Martinez',
      email: 'david.m@university.edu',
      role: 'Student',
      profile_image: null,
      cv_url: null,
      portfolio_url: 'https://daviddata.io',
      linkedin_url: 'https://linkedin.com/in/davidmartinez',
      phone: '+1 234 567 894',
      location: 'Austin, USA',
      bio: 'Big data enthusiast working with distributed systems and real-time analytics.',
      skills: ['Spark', 'Hadoop', 'Kafka', 'Python', 'Scala']
    }
  ],
  201: [ // Financial Economics
    {
      id: 2001,
      name: 'Sophie Dubois',
      email: 'sophie.dubois@university.edu',
      role: 'Student',
      profile_image: null,
      cv_url: 'https://example.com/cv/sophie-dubois.pdf',
      portfolio_url: null,
      linkedin_url: 'https://linkedin.com/in/sophiedubois',
      phone: '+33 1 23 45 67 89',
      location: 'Paris, France',
      bio: 'Finance student interested in quantitative trading and risk management.',
      skills: ['Financial Modeling', 'Excel', 'Python', 'Risk Analysis', 'Bloomberg']
    },
    {
      id: 2002,
      name: 'Thomas Bernard',
      email: 'thomas.bernard@university.edu',
      role: 'Alumni',
      profile_image: null,
      cv_url: 'https://example.com/cv/thomas-bernard.pdf',
      portfolio_url: null,
      linkedin_url: 'https://linkedin.com/in/thomasbernard',
      phone: '+33 1 23 45 67 90',
      location: 'London, UK',
      bio: 'Investment banker with 5 years experience in M&A and corporate finance.',
      skills: ['Financial Analysis', 'M&A', 'Valuation', 'Excel', 'PowerPoint']
    }
  ],
  301: [ // English Literature
    {
      id: 3001,
      name: 'Emily Taylor',
      email: 'emily.taylor@university.edu',
      role: 'Student',
      profile_image: null,
      cv_url: 'https://example.com/cv/emily-taylor.pdf',
      portfolio_url: 'https://emilywrites.blog',
      linkedin_url: 'https://linkedin.com/in/emilytaylor',
      phone: '+44 20 1234 5678',
      location: 'London, UK',
      bio: 'Literature student and creative writer passionate about Victorian novels.',
      skills: ['Literary Analysis', 'Creative Writing', 'Research', 'Editing']
    }
  ],
  401: [ // Physics
    {
      id: 4001,
      name: 'Ahmed Hassan',
      email: 'ahmed.hassan@university.edu',
      role: 'Student',
      profile_image: null,
      cv_url: 'https://example.com/cv/ahmed-hassan.pdf',
      portfolio_url: null,
      linkedin_url: 'https://linkedin.com/in/ahmedhassan',
      phone: '+20 12 3456 7890',
      location: 'Cairo, Egypt',
      bio: 'Physics student researching quantum mechanics and particle physics.',
      skills: ['Quantum Mechanics', 'Mathematical Physics', 'MATLAB', 'LaTeX', 'Research']
    }
  ]
};

// Helper function to simulate API delay
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API functions
export const mockAPI = {
  async getDepartments() {
    await delay(500);
    return demoDepartments;
  },
  
  async getSpecialites(deptId) {
    await delay(500);
    return demoSpecialites[deptId] || [];
  },
  
  async getUsers(specId) {
    await delay(500);
    return demoUsers[specId] || [];
  }
};
