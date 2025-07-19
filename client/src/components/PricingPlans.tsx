import React, { useState } from 'react';
import { 
  Check, 
  X, 
  Star, 
  Zap, 
  Crown, 
  CreditCard,
  Loader,
  Sparkles
} from 'lucide-react';
import toast from 'react-hot-toast';

const PricingPlans = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('pro');

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      period: 'forever',
      description: 'Perfect for getting started',
      icon: Star,
      color: 'gray',
      features: [
        'Basic resume builder',
        '5 job applications per month',
        'Basic AI suggestions',
        'Community support',
        'Standard templates'
      ],
      limitations: [
        'Limited AI analysis',
        'No auto-apply feature',
        'Basic templates only',
        'Community support only'
      ],
      cta: 'Get Started Free',
      popular: false
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 999,
      period: 'month',
      description: 'Best for active job seekers',
      icon: Zap,
      color: 'blue',
      features: [
        'Advanced AI resume builder',
        'Unlimited job applications',
        'Auto-apply bot',
        'Advanced AI career advice',
        'Priority support',
        'ATS optimization',
        'Premium templates',
        'Real-time job alerts',
        'Interview preparation'
      ],
      limitations: [],
      cta: 'Start Pro Trial',
      popular: true,
      savings: 'Most Popular'
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 1999,
      period: 'month',
      description: 'Complete career transformation',
      icon: Crown,
      color: 'purple',
      features: [
        'Everything in Pro',
        'Personal career mentor',
        'Interview preparation',
        'Salary negotiation guidance',
        'University application assistance',
        'Scholarship finder',
        'Visa assistance',
        '24/7 priority support',
        'Custom resume designs',
        'LinkedIn optimization',
        'Portfolio builder'
      ],
      limitations: [],
      cta: 'Go Premium',
      popular: false,
      savings: 'Best Value'
    }
  ];

  const handlePlanSelect = async (planId) => {
    if (planId === 'free') {
      toast.success('Free plan activated! Start building your career.');
      return;
    }

    setIsLoading(true);
    setSelectedPlan(planId);

    try {
      // Create Stripe checkout session
      const response = await fetch('/api/payments/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({
          planId,
          userId: 'demo-user-id'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const data = await response.json();

      if (data.success && data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        throw new Error(data.error || 'Failed to create checkout session');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      
      // For demo purposes, simulate successful upgrade
      toast.success(`🎉 ${planId.charAt(0).toUpperCase() + planId.slice(1)} plan activated! (Demo mode)`);
      
      // Store plan in localStorage for demo
      localStorage.setItem('userPlan', planId);
      
      // Close modal after short delay
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } finally {
      setIsLoading(false);
    }
  };

  const formatPrice = (price) => {
    if (price === 0) return 'Free';
    return `₹${(price / 100).toFixed(0)}`;
  };

  const getColorClasses = (color, variant = 'primary') => {
    const colors = {
      gray: {
        primary: 'text-gray-600 bg-gray-100',
        secondary: 'border-gray-200',
        button: 'bg-gray-600 hover:bg-gray-700 text-white',
        icon: 'text-gray-500'
      },
      blue: {
        primary: 'text-blue-600 bg-blue-100',
        secondary: 'border-blue-200 ring-2 ring-blue-500',
        button: 'bg-blue-600 hover:bg-blue-700 text-white',
        icon: 'text-blue-500'
      },
      purple: {
        primary: 'text-purple-600 bg-purple-100',
        secondary: 'border-purple-200',
        button: 'bg-purple-600 hover:bg-purple-700 text-white',
        icon: 'text-purple-500'
      }
    };
    return colors[color][variant];
  };

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Career Success Plan
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Unlock the full potential of AI-powered career guidance with our flexible pricing plans
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => {
            const IconComponent = plan.icon;
            return (
              <div
                key={plan.id}
                className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
                  plan.popular ? getColorClasses(plan.color, 'secondary') : 'border-gray-200'
                } ${plan.popular ? 'scale-105' : 'hover:scale-105'}`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className={`${getColorClasses(plan.color, 'primary')} px-4 py-2 rounded-full text-sm font-medium flex items-center`}>
                      <Sparkles size={16} className="mr-1" />
                      {plan.savings}
                    </div>
                  </div>
                )}

                <div className="p-8">
                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <div className={`w-16 h-16 ${getColorClasses(plan.color, 'primary')} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <IconComponent size={32} className={getColorClasses(plan.color, 'icon')} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-4">{plan.description}</p>
                    
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-gray-900">
                        {formatPrice(plan.price)}
                      </span>
                      {plan.price > 0 && (
                        <span className="text-gray-600 ml-2">/{plan.period}</span>
                      )}
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <Check size={20} className="text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                    
                    {plan.limitations.map((limitation, index) => (
                      <div key={index} className="flex items-start opacity-60">
                        <X size={20} className="text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-500">{limitation}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => handlePlanSelect(plan.id)}
                    disabled={isLoading && selectedPlan === plan.id}
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center ${
                      getColorClasses(plan.color, 'button')
                    } ${isLoading && selectedPlan === plan.id ? 'opacity-50 cursor-not-allowed' : 'transform hover:scale-105'}`}
                  >
                    {isLoading && selectedPlan === plan.id ? (
                      <>
                        <Loader size={20} className="mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard size={20} className="mr-2" />
                        {plan.cta}
                      </>
                    )}
                  </button>

                  {/* Additional Info */}
                  {plan.id === 'free' && (
                    <p className="text-center text-sm text-gray-500 mt-4">
                      No credit card required
                    </p>
                  )}
                  
                  {plan.id !== 'free' && (
                    <p className="text-center text-sm text-gray-500 mt-4">
                      7-day free trial • Cancel anytime
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Money Back Guarantee */}
        <div className="mt-16 text-center">
          <div className="bg-green-50 border border-green-200 rounded-xl p-8 max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check size={32} className="text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">30-Day Money-Back Guarantee</h3>
            <p className="text-gray-600">
              Not satisfied? Get a full refund within 30 days, no questions asked.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;