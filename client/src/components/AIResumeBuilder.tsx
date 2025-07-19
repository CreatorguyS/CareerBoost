import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Download, 
  Star, 
  CheckCircle, 
  AlertCircle, 
  Wand2, 
  Bot,
  Loader,
  Sparkles,
  Eye,
  Palette,
  Layout,
  Zap
} from 'lucide-react';
import { aiService } from '../services/api';
import toast from 'react-hot-toast';

const AIResumeBuilder = () => {
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      linkedin: '',
      github: '',
      location: ''
    },
    summary: '',
    experience: [],
    education: [],
    skills: { technical: [], soft: [], languages: [] },
    projects: []
  });

  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [atsScore, setAtsScore] = useState(0);
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAutoFilling, setIsAutoFilling] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showCustomTemplateModal, setShowCustomTemplateModal] = useState(false);
  const [customTemplate, setCustomTemplate] = useState({
    name: '',
    description: '',
    image: null,
    fields: []
  });
  const [customTemplates, setCustomTemplates] = useState([]);
  const [isTemplateLibraryOpen, setIsTemplateLibraryOpen] = useState(false);
  const [uploadedTemplate, setUploadedTemplate] = useState(null);
  const [downloadFormat, setDownloadFormat] = useState('pdf');
  const [isDownloading, setIsDownloading] = useState(false);
  const [showATSResults, setShowATSResults] = useState(false);
  const [missingKeywords, setMissingKeywords] = useState([]);
  const [jobDescription, setJobDescription] = useState('');

  // Load custom templates on component mount
  useEffect(() => {
    const savedTemplates = getCustomTemplates();
    setCustomTemplates(savedTemplates);
  }, []);

  // Helper function to get custom templates
  const getCustomTemplates = () => {
    try {
      const saved = localStorage.getItem('customTemplates');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  };

  // Save custom templates to localStorage
  const saveCustomTemplates = (templates) => {
    try {
      localStorage.setItem('customTemplates', JSON.stringify(templates));
      setCustomTemplates(templates);
    } catch (error) {
      console.error('Failed to save templates:', error);
      toast.error('Failed to save custom template');
    }
  };

  // Resume Templates
  const templates = [
    {
      id: 'modern',
      name: 'Modern Professional',
      description: 'Clean, ATS-friendly design perfect for tech roles',
      preview: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop',
      color: 'blue',
      isPremium: false
    },
    {
      id: 'creative',
      name: 'Creative Designer',
      description: 'Eye-catching layout for creative professionals',
      preview: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop',
      color: 'purple',
      isPremium: true
    },
    {
      id: 'executive',
      name: 'Executive Elite',
      description: 'Sophisticated design for senior positions',
      preview: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop',
      color: 'gray',
      isPremium: true
    },
    {
      id: 'minimal',
      name: 'Minimal Clean',
      description: 'Simple, elegant design that focuses on content',
      preview: 'https://images.pexels.com/photos/590018/pexels-photo-590018.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop',
      color: 'green',
      isPremium: false
    }
  ];

  // All templates including custom ones
  const allTemplates = [
    ...templates,
    ...customTemplates
  ];

  // Custom template upload and parsing
  const handleTemplateUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      setUploadedTemplate(file);
      parseTemplateFields(file);
      toast.success('Template uploaded successfully!');
    } else {
      toast.error('Please upload a PDF or Word document');
    }
  };

  // Parse template fields using AI
  const parseTemplateFields = async (file) => {
    try {
      const formData = new FormData();
      formData.append('template', file);
      
      // Mock AI parsing for now - in production, this would use real AI
      const detectedFields = [
        { name: 'fullName', type: 'text', label: 'Full Name', required: true },
        { name: 'email', type: 'email', label: 'Email', required: true },
        { name: 'phone', type: 'tel', label: 'Phone', required: true },
        { name: 'location', type: 'text', label: 'Location', required: false },
        { name: 'summary', type: 'textarea', label: 'Professional Summary', required: false },
        { name: 'experience', type: 'array', label: 'Work Experience', required: false },
        { name: 'education', type: 'array', label: 'Education', required: false },
        { name: 'skills', type: 'array', label: 'Skills', required: false }
      ];

      setCustomTemplate(prev => ({
        ...prev,
        fields: detectedFields
      }));

      toast.success('Template fields detected and mapped!');
    } catch (error) {
      console.error('Failed to parse template:', error);
      toast.error('Failed to parse template fields');
    }
  };

  // Use selected template
  const useTemplate = (templateId) => {
    const template = allTemplates.find(t => t.id === templateId);
    if (!template) return;

    setSelectedTemplate(templateId);
    
    // If it's a custom template, map fields automatically
    if (template.isCustom && template.fields) {
      mapDataToTemplate(template.fields);
    }
    
    toast.success(`${template.name} template applied!`);
    setIsTemplateLibraryOpen(false);
  };

  // Map user data to template fields
  const mapDataToTemplate = (fields) => {
    const mappedData = { ...resumeData };
    setResumeData(mappedData);
  };

  // Enhanced ATS analysis with job description
  const performEnhancedATSAnalysis = async () => {
    setIsAnalyzing(true);
    setShowATSResults(true);
    
    try {
      const mockAnalysis = {
        score: Math.floor(Math.random() * 40) + 60,
        issues: [
          'Missing keywords: React, TypeScript, Node.js',
          'No quantifiable achievements in experience section',
          'Skills section could be more detailed'
        ],
        suggestions: [
          'Add more technical keywords from job description',
          'Include specific metrics and achievements',
          'Use action verbs in experience descriptions'
        ],
        missingKeywords: ['React', 'TypeScript', 'Node.js', 'AWS', 'Docker']
      };

      setAtsScore(mockAnalysis.score);
      setAiSuggestions(mockAnalysis.suggestions);
      setMissingKeywords(mockAnalysis.missingKeywords);
      
      toast.success('Enhanced ATS analysis complete!');
    } catch (error) {
      console.error('ATS analysis failed:', error);
      toast.error('ATS analysis failed');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Auto-fill missing keywords
  const autoFillKeywords = () => {
    const updatedSkills = {
      ...resumeData.skills,
      technical: [...resumeData.skills.technical, ...missingKeywords.slice(0, 3)]
    };
    
    setResumeData(prev => ({
      ...prev,
      skills: updatedSkills
    }));
    
    setMissingKeywords(prev => prev.slice(3));
    toast.success('Keywords added to skills section!');
  };

  // Generate HTML content for resume
  const generateResumeHTML = () => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Resume - ${resumeData.personalInfo.fullName}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .name { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
            .contact { color: #666; margin-bottom: 5px; }
            .section { margin-bottom: 25px; }
            .section-title { font-size: 18px; font-weight: bold; border-bottom: 2px solid #333; padding-bottom: 5px; margin-bottom: 15px; }
            .experience-item { margin-bottom: 15px; }
            .job-title { font-weight: bold; }
            .company { font-style: italic; color: #666; }
            .skills { display: flex; flex-wrap: wrap; gap: 10px; }
            .skill { background: #f0f0f0; padding: 5px 10px; border-radius: 5px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="name">${resumeData.personalInfo.fullName}</div>
            <div class="contact">${resumeData.personalInfo.email}</div>
            <div class="contact">${resumeData.personalInfo.phone}</div>
            <div class="contact">${resumeData.personalInfo.location}</div>
          </div>
          
          ${resumeData.summary ? `
            <div class="section">
              <div class="section-title">Professional Summary</div>
              <p>${resumeData.summary}</p>
            </div>
          ` : ''}
          
          ${resumeData.experience.length > 0 ? `
            <div class="section">
              <div class="section-title">Work Experience</div>
              ${resumeData.experience.map(exp => `
                <div class="experience-item">
                  <div class="job-title">${exp.position}</div>
                  <div class="company">${exp.company} | ${exp.startDate} - ${exp.endDate}</div>
                  <p>${exp.description}</p>
                </div>
              `).join('')}
            </div>
          ` : ''}
          
          ${resumeData.education.length > 0 ? `
            <div class="section">
              <div class="section-title">Education</div>
              ${resumeData.education.map(edu => `
                <div class="experience-item">
                  <div class="job-title">${edu.degree}</div>
                  <div class="company">${edu.institution} | ${edu.startDate} - ${edu.endDate}</div>
                  ${edu.description ? `<p>${edu.description}</p>` : ''}
                </div>
              `).join('')}
            </div>
          ` : ''}
          
          ${resumeData.skills.technical.length > 0 ? `
            <div class="section">
              <div class="section-title">Technical Skills</div>
              <div class="skills">
                ${resumeData.skills.technical.map(skill => `<span class="skill">${skill}</span>`).join('')}
              </div>
            </div>
          ` : ''}
        </body>
      </html>
    `;
  };

  // Download resume in different formats
  const downloadResume = async (format = downloadFormat) => {
    setIsDownloading(true);
    
    try {
      const resumeHTML = generateResumeHTML();
      
      if (format === 'pdf') {
        downloadAsPDF(resumeHTML);
      } else if (format === 'docx') {
        downloadAsWord(resumeHTML);
      }
      
      toast.success(`Resume downloaded as ${format.toUpperCase()}!`);
    } catch (error) {
      console.error('Download failed:', error);
      toast.error('Download failed');
    } finally {
      setIsDownloading(false);
    }
  };

  // Download as PDF
  const downloadAsPDF = (htmlContent) => {
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${resumeData.personalInfo.fullName || 'Resume'}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Download as Word document
  const downloadAsWord = (htmlContent) => {
    const blob = new Blob([htmlContent], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${resumeData.personalInfo.fullName || 'Resume'}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Save resume data
  const saveResumeData = () => {
    try {
      localStorage.setItem('resumeData', JSON.stringify(resumeData));
      toast.success('Resume saved successfully!');
    } catch (error) {
      console.error('Failed to save resume:', error);
      toast.error('Failed to save resume');
    }
  };

  // Cancel and return to template library
  const cancelEditing = () => {
    const confirmed = window.confirm('Are you sure you want to cancel? Any unsaved changes will be lost.');
    if (confirmed) {
      setIsTemplateLibraryOpen(true);
      setShowPreview(false);
    }
  };

  // Auto-update ATS score when resume data changes
  useEffect(() => {
    const calculatedScore = calculateATSScore(resumeData);
    setAtsScore(calculatedScore);
    const suggestions = generateDynamicSuggestions(resumeData);
    setAiSuggestions(suggestions);
  }, [resumeData]);

  // Calculate ATS score
  const calculateATSScore = (data) => {
    let score = 0;
    
    // Personal info completeness (20 points)
    if (data.personalInfo.fullName) score += 5;
    if (data.personalInfo.email) score += 5;
    if (data.personalInfo.phone) score += 5;
    if (data.personalInfo.location) score += 5;
    
    // Summary (15 points)
    if (data.summary && data.summary.length > 50) score += 15;
    
    // Experience (25 points)
    if (data.experience.length > 0) score += 25;
    
    // Education (15 points)
    if (data.education.length > 0) score += 15;
    
    // Skills (20 points)
    if (data.skills.technical.length >= 5) score += 20;
    else if (data.skills.technical.length > 0) score += 10;
    
    return Math.min(score, 100);
  };

  // Generate dynamic suggestions
  const generateDynamicSuggestions = (data) => {
    const suggestions = [];
    
    if (!data.personalInfo.fullName) {
      suggestions.push('Add your full name');
    }
    
    if (!data.summary) {
      suggestions.push('Include a professional summary');
    }
    
    if (data.experience.length === 0) {
      suggestions.push('Add work experience');
    }
    
    if (data.skills.technical.length < 5) {
      suggestions.push('Add more technical skills');
    }
    
    return suggestions;
  };

  // AI Auto-Fill Resume Data
  const handleAutoFill = async () => {
    setIsAutoFilling(true);
    try {
      const response = await aiService.autoFillResume('demo-user-id');
      if (response.success) {
        setResumeData(response.data);
        toast.success('Resume auto-filled successfully!');
      } else {
        throw new Error('Auto-fill failed');
      }
    } catch (error) {
      console.error('Auto-fill error:', error);
      // Mock auto-fill data
      const mockData = {
        personalInfo: {
          fullName: 'John Doe',
          email: 'john.doe@email.com',
          phone: '+1 (555) 123-4567',
          linkedin: 'https://linkedin.com/in/johndoe',
          github: 'https://github.com/johndoe',
          location: 'San Francisco, CA'
        },
        summary: 'Passionate software developer with 3+ years of experience in full-stack development.',
        experience: [
          {
            id: 1,
            company: 'Tech Solutions Inc.',
            position: 'Software Developer',
            startDate: '2021-06',
            endDate: 'Present',
            description: 'Developed web applications using React and Node.js, improving performance by 30%.'
          }
        ],
        education: [
          {
            id: 1,
            institution: 'University of Technology',
            degree: 'Bachelor of Computer Science',
            startDate: '2017-09',
            endDate: '2021-05',
            gpa: '3.8'
          }
        ],
        skills: {
          technical: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL'],
          soft: ['Problem Solving', 'Team Collaboration'],
          languages: ['English', 'Spanish']
        },
        projects: [
          {
            id: 1,
            name: 'E-commerce Platform',
            description: 'Built a full-stack e-commerce application with React and Node.js.',
            technologies: ['React', 'Node.js', 'MongoDB'],
            link: 'https://github.com/johndoe/ecommerce'
          }
        ]
      };
      setResumeData(mockData);
      toast.success('Resume auto-filled with sample data!');
    } finally {
      setIsAutoFilling(false);
    }
  };

  const saveCustomTemplate = () => {
    if (!customTemplate.name || !customTemplate.description) {
      toast.error('Please fill in all fields');
      return;
    }

    const newTemplate = {
      id: `custom-${Date.now()}`,
      name: customTemplate.name,
      description: customTemplate.description,
      preview: customTemplate.image || 'https://images.pexels.com/photos/590028/pexels-photo-590028.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop',
      color: 'custom',
      isPremium: false,
      isCustom: true,
      fields: customTemplate.fields || []
    };

    const updatedTemplates = [...customTemplates, newTemplate];
    saveCustomTemplates(updatedTemplates);
    
    setCustomTemplate({ name: '', description: '', image: null, fields: [] });
    setShowCustomTemplateModal(false);
    toast.success('Custom template saved successfully!');
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCustomTemplate(prev => ({ ...prev, image: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Resume Builder</h1>
          <p className="text-gray-600">Create your perfect resume with AI-powered suggestions</p>
        </div>

        {/* Template Library Modal */}
        {isTemplateLibraryOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900">Choose Your Template</h2>
                  <button
                    onClick={() => setIsTemplateLibraryOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Upload Custom Template */}
                <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-medium text-blue-900 mb-2">Upload Custom Template</h3>
                  <p className="text-sm text-blue-700 mb-3">Upload your own resume template (PDF or Word) and our AI will detect and map the fields automatically.</p>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleTemplateUpload}
                    className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Template Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allTemplates.map((template) => (
                    <div key={template.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="aspect-[3/4] bg-gray-100 relative">
                        <img
                          src={template.preview}
                          alt={template.name}
                          className="w-full h-full object-cover"
                        />
                        {template.isPremium && (
                          <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded text-xs font-medium">
                            Premium
                          </div>
                        )}
                        {template.isCustom && (
                          <div className="absolute top-2 left-2 bg-green-400 text-green-900 px-2 py-1 rounded text-xs font-medium">
                            Custom
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-1">{template.name}</h3>
                        <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                        <button
                          onClick={() => useTemplate(template.id)}
                          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                          Use Template
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Create Custom Template */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <button
                    onClick={() => setShowCustomTemplateModal(true)}
                    className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium flex items-center justify-center"
                  >
                    <Palette className="w-5 h-5 mr-2" />
                    Create Custom Template
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ATS Results Modal */}
        {showATSResults && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900">ATS Analysis Results</h2>
                  <button
                    onClick={() => setShowATSResults(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* ATS Score */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-medium text-gray-900">ATS Compatibility Score</span>
                    <span className={`text-2xl font-bold ${atsScore >= 80 ? 'text-green-600' : atsScore >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {atsScore}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-300 ${atsScore >= 80 ? 'bg-green-500' : atsScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${atsScore}%` }}
                    ></div>
                  </div>
                </div>

                {/* Missing Keywords */}
                {missingKeywords.length > 0 && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-medium text-gray-900">Missing Keywords</h3>
                      <button
                        onClick={autoFillKeywords}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Auto-Add Keywords
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {missingKeywords.map((keyword, index) => (
                        <span key={index} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* AI Suggestions */}
                {aiSuggestions.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">AI Suggestions</h3>
                    <div className="space-y-2">
                      {aiSuggestions.map((suggestion, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{suggestion}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-end">
                  <button
                    onClick={() => setShowATSResults(false)}
                    className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Custom Template Modal */}
        {showCustomTemplateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Create Custom Template</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Template Name</label>
                    <input
                      type="text"
                      value={customTemplate.name}
                      onChange={(e) => setCustomTemplate(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g., My Professional Template"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      value={customTemplate.description}
                      onChange={(e) => setCustomTemplate(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Describe your template style and use case"
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Template Preview Image (Optional)</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    {customTemplate.image && (
                      <img
                        src={customTemplate.image}
                        alt="Preview"
                        className="mt-2 w-full h-32 object-cover rounded-lg"
                      />
                    )}
                  </div>
                </div>
                
                <div className="flex space-x-3 mt-6">
                  <button
                    onClick={saveCustomTemplate}
                    className="flex-1 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium"
                  >
                    Save Template
                  </button>
                  <button
                    onClick={() => setShowCustomTemplateModal(false)}
                    className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Resume Editor */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Resume Editor</h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsTemplateLibraryOpen(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                >
                  <Layout size={16} className="mr-2" />
                  Choose Template
                </button>
                <button
                  onClick={handleAutoFill}
                  disabled={isAutoFilling}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center disabled:opacity-50"
                >
                  {isAutoFilling ? (
                    <Loader size={16} className="mr-2 animate-spin" />
                  ) : (
                    <Bot size={16} className="mr-2" />
                  )}
                  Auto-Fill
                </button>
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center"
                >
                  <Eye size={16} className="mr-2" />
                  {showPreview ? 'Edit' : 'Preview'}
                </button>
              </div>
            </div>

            {showPreview ? (
              /* Resume Preview */
              <div className="bg-white border border-gray-200 rounded-lg p-8 min-h-[800px]">
                <div className="max-w-2xl mx-auto">
                  {/* Header */}
                  <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {resumeData.personalInfo.fullName || 'Your Name'}
                    </h1>
                    <div className="text-gray-600 space-y-1">
                      <p>{resumeData.personalInfo.email}</p>
                      <p>{resumeData.personalInfo.phone}</p>
                      <p>{resumeData.personalInfo.location}</p>
                    </div>
                  </div>

                  {/* Summary */}
                  {resumeData.summary && (
                    <div className="mb-6">
                      <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
                        Professional Summary
                      </h2>
                      <p className="text-gray-700 leading-relaxed">{resumeData.summary}</p>
                    </div>
                  )}

                  {/* Experience */}
                  {resumeData.experience.length > 0 && (
                    <div className="mb-6">
                      <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
                        Experience
                      </h2>
                      {resumeData.experience.map((exp, index) => (
                        <div key={index} className="mb-4">
                          <h3 className="font-semibold text-gray-800">{exp.position}</h3>
                          <p className="text-gray-600">{exp.company}</p>
                          <p className="text-sm text-gray-500 mb-2">{exp.startDate} - {exp.endDate}</p>
                          <p className="text-gray-700">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Skills */}
                  {resumeData.skills.technical.length > 0 && (
                    <div className="mb-6">
                      <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
                        Technical Skills
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        {resumeData.skills.technical.map((skill, index) => (
                          <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Resume Form */
              <div className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={resumeData.personalInfo.fullName}
                      onChange={(e) => setResumeData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, fullName: e.target.value }
                      }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={resumeData.personalInfo.email}
                      onChange={(e) => setResumeData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, email: e.target.value }
                      }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="tel"
                      placeholder="Phone"
                      value={resumeData.personalInfo.phone}
                      onChange={(e) => setResumeData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, phone: e.target.value }
                      }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Location"
                      value={resumeData.personalInfo.location}
                      onChange={(e) => setResumeData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, location: e.target.value }
                      }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Summary */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Professional Summary</h3>
                  <textarea
                    placeholder="Write a brief summary of your professional background..."
                    value={resumeData.summary}
                    onChange={(e) => setResumeData(prev => ({ ...prev, summary: e.target.value }))}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Skills */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Technical Skills</h3>
                  <input
                    type="text"
                    placeholder="Add skills separated by commas (e.g., React, Node.js, Python)"
                    value={resumeData.skills.technical.join(', ')}
                    onChange={(e) => setResumeData(prev => ({
                      ...prev,
                      skills: { ...prev.skills, technical: e.target.value.split(',').map(s => s.trim()).filter(s => s) }
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Action Buttons */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={performEnhancedATSAnalysis}
                  disabled={isAnalyzing}
                  className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center disabled:opacity-50"
                >
                  {isAnalyzing ? (
                    <Loader size={20} className="mr-2 animate-spin" />
                  ) : (
                    <CheckCircle size={20} className="mr-2" />
                  )}
                  ATS Analysis
                </button>
                
                <button
                  onClick={saveResumeData}
                  className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center"
                >
                  <Star size={20} className="mr-2" />
                  Save Resume
                </button>
                
                <button
                  onClick={cancelEditing}
                  className="w-full bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                
                <div className="border-t pt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Download Format</label>
                  <select 
                    value={downloadFormat} 
                    onChange={(e) => setDownloadFormat(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                  >
                    <option value="pdf">PDF</option>
                    <option value="docx">Word Document</option>
                  </select>
                  <button 
                    onClick={() => downloadResume()}
                    disabled={isDownloading}
                    className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center disabled:opacity-50"
                  >
                    {isDownloading ? (
                      <Loader size={20} className="mr-2 animate-spin" />
                    ) : (
                      <Download size={20} className="mr-2" />
                    )}
                    Download Resume
                  </button>
                </div>
              </div>
            </div>

            {/* ATS Score */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">ATS Score</h3>
              <div className="text-center">
                <div className={`text-4xl font-bold mb-2 ${atsScore >= 80 ? 'text-green-600' : atsScore >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                  {atsScore}%
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${atsScore >= 80 ? 'bg-green-500' : atsScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                    style={{ width: `${atsScore}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600">
                  {atsScore >= 80 ? 'Excellent! Your resume is ATS-friendly.' : 
                   atsScore >= 60 ? 'Good! Some improvements needed.' : 
                   'Needs improvement for better ATS compatibility.'}
                </p>
              </div>
            </div>

            {/* AI Suggestions */}
            {aiSuggestions.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Suggestions</h3>
                <div className="space-y-3">
                  {aiSuggestions.map((suggestion, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{suggestion}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIResumeBuilder;