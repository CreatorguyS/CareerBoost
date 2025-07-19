// Mock API service for demo purposes
const mockDelay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Create a mock API that simulates real responses
const createMockApi = () => {
  return {
    get: async (url) => {
      await mockDelay(300);
      return { data: { success: true, ...getMockData(url) } };
    },
    post: async (url, data) => {
      await mockDelay(500);
      return { data: { success: true, ...getMockData(url, data) } };
    },
    put: async (url, data) => {
      await mockDelay(400);
      return { data: { success: true, ...getMockData(url, data) } };
    },
    delete: async (url) => {
      await mockDelay(200);
      return { data: { success: true } };
    }
  };
};

const api = createMockApi();

const getMockUniversities = () => [
  {
    id: 1,
    name: 'Stanford University',
    country: 'United States',
    city: 'Stanford, CA',
    ranking: 2,
    programs: ['Computer Science', 'Engineering', 'Business', 'Medicine'],
    tuitionRange: '$50,000 - $60,000',
    admissionRate: '4%',
    requirements: ['GRE/GMAT', 'TOEFL/IELTS', 'Letters of Recommendation', 'Statement of Purpose'],
    image: 'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=400',
    acceptanceRate: '4.3%',
    averageGPA: '3.96',
    studentCount: '17,000'
  },
  {
    id: 2,
    name: 'University of Oxford',
    country: 'United Kingdom',
    city: 'Oxford',
    ranking: 1,
    programs: ['Law', 'Medicine', 'Engineering', 'Liberal Arts', 'Philosophy'],
    tuitionRange: '£25,000 - £35,000',
    admissionRate: '17%',
    requirements: ['IELTS', 'Academic Transcripts', 'Personal Statement', 'References'],
    image: 'https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=400',
    acceptanceRate: '17.5%',
    averageGPA: '3.9',
    studentCount: '24,000'
  },
  {
    id: 3,
    name: 'University of Toronto',
    country: 'Canada',
    city: 'Toronto, ON',
    ranking: 18,
    programs: ['Computer Science', 'Business', 'Medicine', 'Engineering'],
    tuitionRange: 'CAD $45,000 - $55,000',
    admissionRate: '43%',
    requirements: ['TOEFL/IELTS', 'Academic Transcripts', 'Statement of Purpose'],
    image: 'https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=400',
    acceptanceRate: '43%',
    averageGPA: '3.7',
    studentCount: '97,000'
  },
  {
    id: 4,
    name: 'ETH Zurich',
    country: 'Switzerland',
    city: 'Zurich',
    ranking: 8,
    programs: ['Engineering', 'Computer Science', 'Mathematics', 'Physics'],
    tuitionRange: 'CHF 1,200 - 1,500',
    admissionRate: '8%',
    requirements: ['GRE', 'TOEFL/IELTS', 'Academic Transcripts', 'Research Proposal'],
    image: 'https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=400',
    acceptanceRate: '8%',
    averageGPA: '3.8',
    studentCount: '22,000'
  },
  {
    id: 5,
    name: 'University of Melbourne',
    country: 'Australia',
    city: 'Melbourne, VIC',
    ranking: 33,
    programs: ['Medicine', 'Law', 'Business', 'Engineering', 'Arts'],
    tuitionRange: 'AUD $35,000 - $45,000',
    admissionRate: '70%',
    requirements: ['IELTS', 'Academic Transcripts', 'Personal Statement'],
    image: 'https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=400',
    acceptanceRate: '70%',
    averageGPA: '3.5',
    studentCount: '50,000'
  },
  {
    id: 6,
    name: 'Technical University of Munich',
    country: 'Germany',
    city: 'Munich',
    ranking: 50,
    programs: ['Engineering', 'Computer Science', 'Natural Sciences', 'Medicine'],
    tuitionRange: '€0 - €3,000',
    admissionRate: '8%',
    requirements: ['TOEFL/IELTS', 'Academic Transcripts', 'Motivation Letter'],
    image: 'https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=400',
    acceptanceRate: '8%',
    averageGPA: '3.7',
    studentCount: '45,000'
  },
  {
    id: 7,
    name: 'National University of Singapore',
    country: 'Singapore',
    city: 'Singapore',
    ranking: 11,
    programs: ['Engineering', 'Business', 'Computer Science', 'Medicine'],
    tuitionRange: 'SGD $30,000 - $40,000',
    admissionRate: '5%',
    requirements: ['GRE/GMAT', 'TOEFL/IELTS', 'Academic Transcripts'],
    image: 'https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=400',
    acceptanceRate: '5%',
    averageGPA: '3.8',
    studentCount: '38,000'
  },
  {
    id: 8,
    name: 'University of Tokyo',
    country: 'Japan',
    city: 'Tokyo',
    ranking: 23,
    programs: ['Engineering', 'Science', 'Medicine', 'Liberal Arts'],
    tuitionRange: '¥535,800 - ¥800,000',
    admissionRate: '3%',
    requirements: ['Japanese Proficiency', 'Academic Transcripts', 'Research Proposal'],
    image: 'https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=400',
    acceptanceRate: '3%',
    averageGPA: '3.9',
    studentCount: '28,000'
  }
];

const getMockScholarships = () => [
  {
    id: 1,
    name: 'Fulbright Scholarship',
    provider: 'U.S. Government',
    amount: 'Full funding',
    eligibility: ['Outstanding academic record', 'Leadership potential', 'U.S. citizenship'],
    deadline: 'October 15, 2024',
    description: 'Prestigious scholarship for graduate study, research, and teaching abroad.',
    countries: ['United States'],
    level: 'Graduate',
    duration: '1-2 years'
  },
  {
    id: 2,
    name: 'Rhodes Scholarship',
    provider: 'Rhodes Trust',
    amount: '£18,000/year',
    eligibility: ['Academic excellence', 'Leadership', 'Service to others'],
    deadline: 'September 30, 2024',
    description: 'World\'s oldest international scholarship programme for study at Oxford.',
    countries: ['United Kingdom'],
    level: 'Graduate',
    duration: '2-3 years'
  },
  {
    id: 3,
    name: 'Chevening Scholarship',
    provider: 'UK Government',
    amount: 'Full funding',
    eligibility: ['Leadership potential', 'Academic merit', 'UK study commitment'],
    deadline: 'November 7, 2024',
    description: 'UK government scholarship for one-year master\'s degrees in the UK.',
    countries: ['United Kingdom'],
    level: 'Masters',
    duration: '1 year'
  },
  {
    id: 4,
    name: 'DAAD Scholarship',
    provider: 'German Academic Exchange Service',
    amount: '€850-1,200/month',
    eligibility: ['Academic excellence', 'German language skills', 'Research proposal'],
    deadline: 'October 31, 2024',
    description: 'Comprehensive funding for study and research in Germany.',
    countries: ['Germany'],
    level: 'Graduate/PhD',
    duration: '1-4 years'
  },
  {
    id: 5,
    name: 'Australia Awards',
    provider: 'Australian Government',
    amount: 'Full funding',
    eligibility: ['Developing country citizenship', 'Leadership potential', 'Academic merit'],
    deadline: 'April 30, 2024',
    description: 'Long-term development scholarships for study in Australia.',
    countries: ['Australia'],
    level: 'Undergraduate/Graduate',
    duration: '2-4 years'
  }
];

// Mock data generator
const getMockData = (url, requestData = {}) => {
  if (url.includes('/users/dashboard')) {
    return {
      dashboard: {
        applications: { total: 12, byStatus: { applied: 8, interview: 3, offer: 1 }, recent: [] },
        achievements: { applicationsCount: 12, interviewsCount: 3, offersCount: 1, resumeScore: 85 },
        resume: { exists: true, atsScore: 85 }
      }
    };
  }
  
  if (url.includes('/automation/scrape-internships')) {
    return {
      internships: [
        {
          id: 1,
          title: 'Software Engineering Intern',
          company: 'Google',
          location: 'Bangalore, India',
          type: 'Full-time',
          salary: '₹50,000/month',
          duration: '12 weeks',
          posted: '2 hours ago',
          logo: '🟢',
          skills: ['React', 'Python', 'JavaScript'],
          matchPercentage: 95,
          source: 'LinkedIn'
        },
        {
          id: 2,
          title: 'Data Science Intern',
          company: 'Microsoft',
          location: 'Hyderabad, India',
          type: 'Full-time',
          salary: '₹45,000/month',
          duration: '10 weeks',
          posted: '1 day ago',
          logo: '🔵',
          skills: ['Python', 'SQL', 'Machine Learning'],
          matchPercentage: 88,
          source: 'Indeed'
        },
        {
          id: 3,
          title: 'Frontend Developer Intern',
          company: 'Amazon',
          location: 'Chennai, India',
          type: 'Remote',
          salary: '₹40,000/month',
          duration: '8 weeks',
          posted: '3 days ago',
          logo: '🟠',
          skills: ['React', 'JavaScript', 'CSS'],
          matchPercentage: 82,
          source: 'Glassdoor'
        }
      ]
    };
  }
  
  if (url.includes('/automation/auto-apply-status')) {
    return {
      status: {
        isActive: false,
        applicationsCount: 0
      }
    };
  }
  
  if (url.includes('/ai/analyze-resume')) {
    return {
      analysis: {
        atsScore: { overall: 85, keywords: 80, format: 90, experience: 85, education: 88, skills: 82 },
        suggestions: [
          { type: 'keywords', suggestion: 'Add more industry-specific keywords', priority: 'high' },
          { type: 'experience', suggestion: 'Quantify achievements with numbers', priority: 'medium' }
        ]
      }
    };
  }
  
  if (url.includes('/ai/generate-resume')) {
    return {
      content: {
        summary: 'Results-driven software developer with expertise in modern web technologies and a passion for creating innovative solutions.',
        experience: [
          'Developed responsive web applications using React and Node.js, improving user engagement by 40%',
          'Collaborated with cross-functional teams to deliver projects on time'
        ],
        skills: {
          technical: ['JavaScript', 'React', 'Node.js', 'Python'],
          soft: ['Problem Solving', 'Team Collaboration'],
          languages: ['English', 'Hindi']
        }
      }
    };
  }
  
  if (url.includes('/ai/career-advice')) {
    return {
      advice: {
        careerPath: "Junior Developer → Senior Developer → Tech Lead → Engineering Manager",
        skillGaps: ["System Design", "Leadership", "Cloud Technologies"],
        recommendations: [
          "Focus on building scalable applications",
          "Contribute to open-source projects",
          "Develop leadership skills"
        ],
        timeline: "6-12 months",
        successProbability: 85,
        marketDemand: "High",
        salaryRange: "₹8-15 LPA"
      }
    };
  }
  
  if (url.includes('/ai/match-internships')) {
    return {
      matches: [
        {
          id: 1,
          title: 'Software Engineering Intern',
          company: 'Google',
          location: 'Bangalore, India',
          matchPercentage: 95,
          skills: ['React', 'Python', 'JavaScript'],
          salary: '₹50,000/month'
        }
      ]
    };
  }
  
  if (url.includes('/ai/auto-fill-resume')) {
    return {
      data: {
        personalInfo: {
          fullName: 'John Doe',
          email: 'john.doe@email.com',
          phone: '+1 (555) 123-4567',
          linkedin: 'https://linkedin.com/in/johndoe',
          github: 'https://github.com/johndoe',
          location: 'San Francisco, CA'
        },
        summary: 'Passionate software developer with experience in full-stack development.',
        experience: [
          {
            id: 1,
            company: 'Tech Solutions Inc.',
            position: 'Software Developer Intern',
            startDate: '2023-06',
            endDate: '2023-08',
            description: 'Developed web applications using React and Node.js, collaborated with senior developers on feature implementation.'
          },
          {
            id: 2,
            company: 'Digital Innovations',
            position: 'Frontend Developer',
            startDate: '2023-09',
            endDate: 'Present',
            description: 'Built responsive user interfaces and improved application performance by 30%.'
          }
        ],
        education: [
          {
            id: 1,
            institution: 'University of Technology',
            degree: 'Bachelor of Computer Science',
            startDate: '2021-09',
            endDate: '2025-05',
            gpa: '3.8',
            description: 'Relevant coursework: Data Structures, Algorithms, Web Development, Database Systems.'
          }
        ],
        projects: [
          {
            id: 1,
            name: 'E-commerce Platform',
            description: 'Built a full-stack e-commerce application with React, Node.js, and MongoDB.',
            technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
            link: 'https://github.com/johndoe/ecommerce-platform',
            startDate: '2023-03',
            endDate: '2023-05'
          },
          {
            id: 2,
            name: 'Task Management App',
            description: 'Developed a collaborative task management application with real-time updates.',
            technologies: ['React', 'Firebase', 'Material-UI'],
            link: 'https://github.com/johndoe/task-manager',
            startDate: '2023-01',
            endDate: '2023-02'
          }
        ],
        skills: {
          technical: ['JavaScript', 'React', 'Node.js', 'Python'],
          soft: ['Problem Solving', 'Team Collaboration'],
          languages: ['English', 'Spanish']
        }
      }
    };
  }
  
  if (url.includes('/higher-studies/universities')) {
    return {
      universities: getMockUniversities()
    };
  }
  
  if (url.includes('/higher-studies/scholarships')) {
    return {
      scholarships: getMockScholarships()
    };
  }
  
  if (url.includes('/higher-studies/live-search')) {
    // Simulate live search results
    const searchParams = requestData;
    const results = [];
    
    if (searchParams.type === 'universities') {
      // Generate dynamic university results based on search
      const newUniversities = [
        {
          id: Date.now() + Math.random(),
          name: `${searchParams.query || 'Global'} University of Technology`,
          country: searchParams.country || 'United States',
          city: 'Innovation City',
          ranking: Math.floor(Math.random() * 200) + 1,
          programs: ['Computer Science', 'Engineering', 'Business'],
          tuitionRange: '$30,000 - $45,000',
          admissionRate: `${Math.floor(Math.random() * 40) + 10}%`,
          requirements: ['TOEFL/IELTS', 'Academic Transcripts', 'Essays'],
          image: 'https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=400',
          acceptanceRate: `${Math.floor(Math.random() * 40) + 10}%`,
          averageGPA: (Math.random() * 0.5 + 3.5).toFixed(1),
          studentCount: `${Math.floor(Math.random() * 80) + 20},000`,
          website: 'https://www.university.edu',
          admissionPortal: 'https://admissions.university.edu'
        }
      ];
      results.push(...newUniversities);
    } else {
      // Generate dynamic scholarship results
      const newScholarships = [
        {
          id: Date.now() + Math.random(),
          name: `${searchParams.query || 'Excellence'} Scholarship Program`,
          provider: 'International Education Foundation',
          amount: `$${Math.floor(Math.random() * 50000) + 10000}`,
          eligibility: ['Academic Excellence', 'Financial Need', 'Leadership'],
          deadline: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toLocaleDateString(),
          description: 'Comprehensive scholarship for outstanding students pursuing higher education.',
          countries: [searchParams.country || 'Global'],
          level: 'Graduate',
          duration: '2-4 years'
        }
      ];
      results.push(...newScholarships);
    }
    
    return {
      data: Math.random() > 0.3 ? results : [] // 70% chance of finding results
    };
  }
  
  return {};
};

// Auth Services
export const authService = {
  login: async (email, password) => {
    await mockDelay(800);
    const mockUser = { id: '1', email, name: 'Demo User' };
    localStorage.setItem('authToken', 'mock-token');
    localStorage.setItem('user', JSON.stringify(mockUser));
    return { success: true, token: 'mock-token', user: mockUser };
  },

  register: async (userData) => {
    await mockDelay(1000);
    const mockUser = { id: '1', email: userData.email, name: userData.fullName };
    localStorage.setItem('authToken', 'mock-token');
    localStorage.setItem('user', JSON.stringify(mockUser));
    return { success: true, token: 'mock-token', user: mockUser };
  },

  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    window.location.href = '/';
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  }
};

// User Services
export const userService = {
  getProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },

  updateProfile: async (profileData) => {
    const response = await api.put('/users/profile', profileData);
    return response.data;
  },

  getDashboard: async () => {
    const response = await api.get('/users/dashboard');
    return response.data;
  },

  getStats: async () => {
    const response = await api.get('/users/stats');
    return response.data;
  },

  updatePreferences: async (preferences) => {
    const response = await api.put('/users/preferences', preferences);
    return response.data;
  },

  changePassword: async (currentPassword, newPassword) => {
    const response = await api.put('/users/change-password', {
      currentPassword,
      newPassword
    });
    return response.data;
  }
};

// AI Services
export const aiService = {
  analyzeResume: async (resumeContent, userId) => {
    const response = await api.post('/ai/analyze-resume', { resumeContent, userId });
    return response.data;
  },

  generateResume: async (userProfile, jobDescription, userId) => {
    const response = await api.post('/ai/generate-resume', { userProfile, jobDescription, userId });
    return response.data;
  },

  getCareerAdvice: async (userProfile, goals, userId) => {
    const response = await api.post('/ai/career-advice', { userProfile, goals, userId });
    return response.data;
  },

  matchInternships: async (userProfile, internships) => {
    const response = await api.post('/ai/match-internships', { userProfile, internships });
    return response.data;
  },

  autoFillResume: async (userId) => {
    const response = await api.post('/ai/auto-fill-resume', { userId });
    return response.data;
  }
};

// Resume Services
export const resumeService = {
  getResume: async (userId) => {
    const response = await api.get(`/resume/${userId}`);
    return response.data;
  },

  saveResume: async (userId, content) => {
    const response = await api.post('/resume', { userId, content });
    return response.data;
  }
};

// Internship Services
export const internshipService = {
  getInternships: async (filters = {}) => {
    const response = await api.get('/internships');
    return response.data;
  },

  getInternship: async (id) => {
    const response = await api.get(`/internships/${id}`);
    return response.data;
  },

  applyToInternship: async (internshipId, applicationData) => {
    const response = await api.post(`/internships/${internshipId}/apply`, applicationData);
    return response.data;
  },

  getUserApplications: async (userId, filters = {}) => {
    const response = await api.get(`/internships/user/${userId}/applications`);
    return response.data;
  },

  getRecommendations: async (userId) => {
    const response = await api.get(`/internships/user/${userId}/recommendations`);
    return response.data;
  },

  getTrending: async () => {
    const response = await api.get('/internships/trending/popular');
    return response.data;
  },

  updateApplicationStatus: async (applicationId, statusData) => {
    const response = await api.put(`/internships/applications/${applicationId}/status`, statusData);
    return response.data;
  }
};

// Higher Studies Services
export const higherStudiesService = {
  getUniversities: async (filters = {}) => {
    const response = await api.get('/higher-studies/universities');
    return response.data;
  },

  getUniversity: async (id) => {
    const response = await api.get(`/higher-studies/universities/${id}`);
    return response.data;
  },

  getScholarships: async (filters = {}) => {
    const response = await api.get('/higher-studies/scholarships');
    return response.data;
  },

  // Live search functionality
  liveSearch: async (searchParams) => {
    const response = await api.post('/higher-studies/live-search', searchParams);
    return response.data;
  },

  applyToUniversity: async (universityId, applicationData) => {
    const response = await api.post(`/higher-studies/universities/${universityId}/apply`, applicationData);
    return response.data;
  },

  applyToScholarship: async (scholarshipId, applicationData) => {
    const response = await api.post(`/higher-studies/scholarships/${scholarshipId}/apply`, applicationData);
    return response.data;
  },

  getVisaRequirements: async (country) => {
    const response = await api.get(`/higher-studies/visa/${country}`);
    return response.data;
  },

  getUserApplications: async (userId) => {
    const response = await api.get(`/higher-studies/user/${userId}/applications`);
    return response.data;
  },

  getRecommendations: async (userId) => {
    const response = await api.get(`/higher-studies/user/${userId}/recommendations`);
    return response.data;
  }
};

// Automation Services
export const automationService = {
  startAutoApply: async (userId, preferences) => {
    const response = await api.post('/automation/start-auto-apply', { userId, preferences });
    return response.data;
  },

  stopAutoApply: async (userId) => {
    const response = await api.post('/automation/stop-auto-apply', { userId });
    return response.data;
  },

  scrapeInternships: async () => {
    const response = await api.get('/automation/scrape-internships');
    return response.data;
  },

  getAutoApplyStatus: async (userId) => {
    const response = await api.get(`/automation/auto-apply-status/${userId}`);
    return response.data;
  }
};

// Payment Services
export const paymentService = {
  getPlans: async () => {
    const response = await api.get('/payments/plans');
    return response.data;
  },

  createCheckoutSession: async (planId, userId) => {
    const response = await api.post('/payments/create-checkout-session', { planId, userId });
    return response.data;
  },

  getSubscription: async (userId) => {
    const response = await api.get(`/payments/subscription/${userId}`);
    return response.data;
  },

  cancelSubscription: async (userId) => {
    const response = await api.post('/payments/cancel-subscription', { userId });
    return response.data;
  }
};

export default api;