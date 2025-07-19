import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  Target, 
  TrendingUp, 
  Award, 
  BookOpen, 
  Users,
  Lightbulb,
  Calendar,
  CheckCircle,
  ArrowRight,
  Zap,
  Star
} from 'lucide-react';
import { aiService } from '../services/api';
import toast from 'react-hot-toast';

const AICareerAdvisor = () => {
  const [careerAdvice, setCareerAdvice] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState('');
  const [careerPath, setCareerPath] = useState([]);
  const [skillGaps, setSkillGaps] = useState([]);

  const userProfile = {
    skills: ['JavaScript', 'React', 'Node.js', 'Python'],
    experience: 'Entry Level',
    education: 'Computer Science',
    currentRole: 'Student',
    interests: ['Web Development', 'AI/ML', 'Startups']
  };

  const careerGoals = [
    'Software Engineer at FAANG',
    'Full-Stack Developer',
    'Data Scientist',
    'Product Manager',
    'Startup Founder',
    'AI/ML Engineer',
    'DevOps Engineer',
    'Cybersecurity Specialist'
  ];

  useEffect(() => {
    if (selectedGoal) {
      getCareerAdvice();
    }
  }, [selectedGoal]);

  const getCareerAdvice = async () => {
    setIsLoading(true);
    try {
      const response = await aiService.getCareerAdvice(userProfile, selectedGoal, 'demo-user-id');
      if (response.success) {
        setCareerAdvice(response.advice);
        setCareerPath(response.advice.careerPath?.split(' → ') || []);
        setSkillGaps(response.advice.skillGaps || []);
        toast.success('🎯 AI career advice generated!');
      }
    } catch (error) {
      console.error('Career advice error:', error);
      // Mock data for demo
      setCareerAdvice({
        careerPath: "Junior Developer → Senior Developer → Tech Lead → Engineering Manager",
        skillGaps: ["System Design", "Leadership", "Cloud Technologies"],
        recommendations: [
          "Focus on building scalable applications",
          "Contribute to open-source projects",
          "Develop leadership and mentoring skills",
          "Learn cloud platforms like AWS or Azure"
        ],
        timeline: "6-12 months for next role transition",
        successProbability: 85,
        marketDemand: "High",
        salaryRange: "₹8-15 LPA",
        learningResources: [
          "System Design Interview courses",
          "AWS Certified Solutions Architect",
          "Leadership and Management books"
        ],
        networkingTips: [
          "Join tech meetups and conferences",
          "Connect with industry professionals on LinkedIn"
        ],
        nextSteps: [
          "Update your LinkedIn profile",
          "Start a side project using new technologies"
        ]
      });
      setCareerPath(["Junior Developer", "Senior Developer", "Tech Lead", "Engineering Manager"]);
      setSkillGaps(["System Design", "Leadership", "Cloud Technologies"]);
      toast.success('🎯 AI career advice generated! (Demo mode)');
    } finally {
      setIsLoading(false);
    }
  };

  const mockLearningPath = [
    {
      skill: "System Design",
      priority: "High",
      timeToLearn: "3-4 months",
      resources: ["Grokking System Design", "System Design Primer", "High Scalability Blog"],
      progress: 0
    },
    {
      skill: "Cloud Technologies",
      priority: "Medium",
      timeToLearn: "2-3 months",
      resources: ["AWS Certified Solutions Architect", "Azure Fundamentals", "Google Cloud Platform"],
      progress: 25
    },
    {
      skill: "Leadership",
      priority: "Medium",
      timeToLearn: "6+ months",
      resources: ["The Manager's Path", "Leadership courses", "Mentoring junior developers"],
      progress: 10
    }
  ];

  const mockMilestones = [
    {
      title: "Complete React Advanced Course",
      deadline: "Next 2 weeks",
      status: "in-progress",
      importance: "High"
    },
    {
      title: "Build Full-Stack Project",
      deadline: "Next month",
      status: "pending",
      importance: "High"
    },
    {
      title: "Contribute to Open Source",
      deadline: "Next 2 months",
      status: "pending",
      importance: "Medium"
    },
    {
      title: "Network with Industry Professionals",
      deadline: "Ongoing",
      status: "in-progress",
      importance: "Medium"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Career Advisor</h1>
          <p className="text-gray-600">Get personalized career guidance powered by AI</p>
        </div>

        {/* Career Goal Selection */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">What's your career goal?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
            {careerGoals.map((goal) => (
              <button
                key={goal}
                onClick={() => setSelectedGoal(goal)}
                className={`p-3 rounded-lg text-left transition-all ${
                  selectedGoal === goal
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {goal}
              </button>
            ))}
          </div>
        </div>

        {selectedGoal && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Career Path Visualization */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Your AI-Generated Career Path</h3>
                <div className="flex items-center justify-between">
                  {careerPath.map((step, index) => (
                    <div key={index} className="flex items-center">
                      <div className="flex flex-col items-center">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          index === 0 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
                        }`}>
                          {index + 1}
                        </div>
                        <p className="text-sm text-center mt-2 max-w-20">{step}</p>
                      </div>
                      {index < careerPath.length - 1 && (
                        <ArrowRight size={20} className="text-gray-400 mx-4" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Recommendations */}
              {careerAdvice && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Recommendations</h3>
                  <div className="space-y-4">
                    {careerAdvice.recommendations.map((recommendation, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mt-0.5">
                          <Lightbulb size={14} className="text-primary-600" />
                        </div>
                        <p className="text-gray-700">{recommendation}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Learning Path */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Personalized Learning Path</h3>
                <div className="space-y-6">
                  {mockLearningPath.map((item, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">{item.skill}</h4>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.priority === 'High' 
                              ? 'bg-red-100 text-red-600' 
                              : 'bg-yellow-100 text-yellow-600'
                          }`}>
                            {item.priority} Priority
                          </span>
                          <span className="text-sm text-gray-500">{item.timeToLearn}</span>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Progress</span>
                          <span>{item.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${item.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-600 mb-2">Recommended Resources:</p>
                        <div className="flex flex-wrap gap-2">
                          {item.resources.map((resource, idx) => (
                            <span key={idx} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                              {resource}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Milestones */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Career Milestones</h3>
                <div className="space-y-4">
                  {mockMilestones.map((milestone, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        milestone.status === 'completed' 
                          ? 'bg-green-100 text-green-600'
                          : milestone.status === 'in-progress'
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {milestone.status === 'completed' ? (
                          <CheckCircle size={16} />
                        ) : (
                          <Calendar size={16} />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{milestone.title}</h4>
                        <p className="text-sm text-gray-600">{milestone.deadline}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        milestone.importance === 'High' 
                          ? 'bg-red-100 text-red-600' 
                          : 'bg-yellow-100 text-yellow-600'
                      }`}>
                        {milestone.importance}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Career Score */}
              {careerAdvice && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Career Success Score</h3>
                  <div className="flex items-center justify-center mb-4">
                    <div className="relative w-24 h-24">
                      <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="#e5e7eb"
                          strokeWidth="8"
                          fill="none"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="#10b981"
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 40}`}
                          strokeDashoffset={`${2 * Math.PI * 40 * (1 - careerAdvice.successProbability / 100)}`}
                          className="transition-all duration-500"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold text-gray-900">{careerAdvice.successProbability}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Market Demand</span>
                      <span className="text-sm font-medium text-gray-900">{careerAdvice.marketDemand}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Salary Range</span>
                      <span className="text-sm font-medium text-gray-900">{careerAdvice.salaryRange}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Timeline</span>
                      <span className="text-sm font-medium text-gray-900">{careerAdvice.timeline}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Skill Gaps */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Skill Gaps to Address</h3>
                <div className="space-y-3">
                  {skillGaps.map((skill, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                      <span className="text-sm font-medium text-red-700">{skill}</span>
                      <Target size={16} className="text-red-600" />
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Insights */}
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Insights</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <Brain size={16} className="text-purple-600 mt-0.5" />
                    <p className="text-sm text-gray-700">Your profile shows strong technical foundation</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <TrendingUp size={16} className="text-green-600 mt-0.5" />
                    <p className="text-sm text-gray-700">High growth potential in chosen field</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Zap size={16} className="text-blue-600 mt-0.5" />
                    <p className="text-sm text-gray-700">Focus on system design for faster progression</p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors text-sm">
                    Update Learning Plan
                  </button>
                  <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                    Find Mentors
                  </button>
                  <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                    Join Study Groups
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AICareerAdvisor;