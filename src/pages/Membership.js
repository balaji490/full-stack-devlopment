import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { MembershipContext, MEMBERSHIP_TIERS, MEMBERSHIP_PLANS } from '../context/MembershipContext';
import FitnessLogo from '../components/FitnessLogo';

export default function Membership() {
  const { membership, purchaseMembership, isActive, MEMBERSHIP_PLANS } = useContext(MembershipContext);
  const [selectedTier, setSelectedTier] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');

  const handleSelectPlan = (tier) => {
    if (isActive && membership.tier === tier) {
      return; // Already has this plan
    }
    setSelectedTier(tier);
    setShowPaymentModal(true);
  };

  const handlePurchase = () => {
    if (selectedTier && purchaseMembership(selectedTier, paymentMethod)) {
      setShowPaymentModal(false);
      setSelectedTier(null);
      alert('Membership activated successfully! Welcome to FitFlex!');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const plans = [MEMBERSHIP_TIERS.BEGINNER, MEMBERSHIP_TIERS.PRO];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-black via-gray-900 to-black text-white py-20 border-b border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-gray-200 to-orange-500 bg-clip-text text-transparent">
            Choose Your Membership
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto">
            Transform your fitness journey with our flexible membership plans
          </p>
        </div>
      </div>

      {/* Current Membership Status */}
      {isActive && (
        <div className="container mx-auto px-4 py-8">
          <div className="bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 rounded-2xl shadow-2xl shadow-orange-500/50 p-6 text-white mb-8 border border-orange-500/50">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h3 className="text-2xl font-bold mb-2">Active Membership</h3>
                <p className="text-orange-100">
                  {MEMBERSHIP_PLANS[membership.tier]?.name} Plan • Expires {formatDate(membership.expiryDate)}
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl mb-1">{MEMBERSHIP_PLANS[membership.tier]?.icon}</div>
                <p className="text-sm text-orange-100">Member Since</p>
                <p className="font-semibold">{formatDate(membership.joinDate)}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pricing Cards */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((tier) => {
            const plan = MEMBERSHIP_PLANS[tier];
            const isCurrentPlan = isActive && membership.tier === tier;
            const isPopular = tier === MEMBERSHIP_TIERS.PRO;

            return (
              <div
                key={tier}
                className={`relative bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl shadow-2xl overflow-hidden transform transition-all hover:scale-105 border ${
                  isPopular 
                    ? 'ring-4 ring-orange-500/50 border-orange-500/50' 
                    : 'border-gray-800 hover:border-orange-500/50'
                } ${isCurrentPlan ? 'opacity-75' : ''}`}
              >
                {isPopular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-2 rounded-bl-2xl font-bold text-sm z-10">
                    MOST POPULAR
                  </div>
                )}

                <div className={`relative bg-gradient-to-r ${
                  tier === MEMBERSHIP_TIERS.BEGINNER 
                    ? 'from-blue-900 via-blue-800 to-gray-900' 
                    : 'from-orange-600 via-red-600 to-orange-700'
                } p-8 text-white overflow-hidden`}>
                  {/* Background Logo with fade effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${
                    tier === MEMBERSHIP_TIERS.BEGINNER 
                      ? 'from-blue-900/20 via-blue-800/10 to-black' 
                      : 'from-orange-900/20 via-red-800/10 to-black'
                  } opacity-30 group-hover:opacity-50 transition-opacity duration-500`}>
                    <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity">
                      <div className="scale-150 opacity-30">
                        <FitnessLogo showText={false} size="normal" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="mb-4 flex justify-center">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
                        <FitnessLogo showText={false} size="small" />
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold mb-2">{plan.name}</h3>
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-5xl font-bold">${plan.monthlyFee}</span>
                      <span className={`text-xl ${
                        tier === MEMBERSHIP_TIERS.BEGINNER ? 'text-blue-200' : 'text-orange-200'
                      }`}>/month</span>
                    </div>
                    <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-3 mb-4 border border-white/30">
                      <p className="text-sm">Joining Fee: <span className="font-bold">${plan.joiningFee}</span></p>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-orange-500 text-xl mt-0.5">✓</span>
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {isCurrentPlan ? (
                    <button
                      disabled
                      className="w-full bg-gray-700 text-gray-500 py-4 rounded-lg font-semibold text-lg cursor-not-allowed"
                    >
                      Current Plan
                    </button>
                  ) : (
                    <button
                      onClick={() => handleSelectPlan(tier)}
                      className={`w-full py-4 rounded-lg font-semibold text-lg text-white transition-all shadow-lg hover:shadow-xl ${
                        isPopular
                          ? 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 shadow-orange-500/50'
                          : 'bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900'
                      }`}
                    >
                      Select Plan
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Benefits Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-white via-gray-200 to-orange-500 bg-clip-text text-transparent mb-12">
            Why Choose FitFlex?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                icon: (
                  <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29l-1.43-1.43z"/>
                  </svg>
                ),
                title: 'State-of-the-Art Equipment', 
                desc: 'Latest fitness technology' 
              },
              { 
                icon: (
                  <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                  </svg>
                ),
                title: 'Expert Trainers', 
                desc: 'Certified professionals' 
              },
              { 
                icon: (
                  <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/>
                    <path d="M14 11h-4v1h3c.55 0 1 .45 1 1v3c0 .55-.45 1-1 1h-1v1h-2v-1H9v-2h4v-1h-3c-.55 0-1-.45-1-1v-3c0-.55.45-1 1-1h1V8h2v1h2v2z"/>
                  </svg>
                ),
                title: 'Mobile App Access', 
                desc: 'Track your progress anywhere' 
              }
            ].map((benefit, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-xl p-6 shadow-2xl text-center border border-gray-800 hover:border-orange-500/50 transition-all group">
                <div className="mb-4 flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500/20 via-red-500/20 to-orange-600/20 flex items-center justify-center border border-orange-500/30 group-hover:border-orange-500/50 group-hover:from-orange-500/30 group-hover:via-red-500/30 group-hover:to-orange-600/30 transition-all">
                    <div className="text-orange-400 group-hover:text-orange-300 transition-colors">
                      {benefit.icon}
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                <p className="text-gray-400">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedTier && (
        <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl shadow-2xl max-w-md w-full p-8 border border-gray-800">
            <h3 className="text-2xl font-bold text-white mb-6">
              Complete Your Purchase
            </h3>
            
            <div className="mb-6 p-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-gray-700">
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Plan:</span>
                <span className="font-semibold text-white">{MEMBERSHIP_PLANS[selectedTier].name}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Monthly Fee:</span>
                <span className="font-semibold text-white">${MEMBERSHIP_PLANS[selectedTier].monthlyFee}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Joining Fee:</span>
                <span className="font-semibold text-white">${MEMBERSHIP_PLANS[selectedTier].joiningFee}</span>
              </div>
              <div className="border-t border-gray-700 pt-2 mt-2 flex justify-between text-lg font-bold">
                <span className="text-gray-300">Total:</span>
                <span className="text-orange-500">
                  ${(MEMBERSHIP_PLANS[selectedTier].monthlyFee + MEMBERSHIP_PLANS[selectedTier].joiningFee).toFixed(2)}
                </span>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Payment Method
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="card">Credit/Debit Card</option>
                <option value="paypal">PayPal</option>
                <option value="bank">Bank Transfer</option>
              </select>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowPaymentModal(false);
                  setSelectedTier(null);
                }}
                className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg font-semibold text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handlePurchase}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white rounded-lg font-semibold transition-all shadow-lg shadow-orange-500/50"
              >
                Confirm Purchase
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

