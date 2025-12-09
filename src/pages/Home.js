import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { MembershipContext, MEMBERSHIP_TIERS, MEMBERSHIP_PLANS } from '../context/MembershipContext';
import BMICalculator from '../components/BMICalculator';
import FitnessLogo from '../components/FitnessLogo';

export default function Home() {
  const { isActive, membership } = useContext(MembershipContext);

  const galleryImages = [
    { 
      id: 1, 
      title: 'State-of-the-Art Equipment', 
      description: 'Premium gym equipment for all fitness levels',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80'
    },
    { 
      id: 2, 
      title: 'Personal Training', 
      description: 'Expert trainers guiding your fitness journey',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80'
    },
    { 
      id: 3, 
      title: 'Group Classes', 
      description: 'Motivating group fitness sessions',
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80'
    },
    { 
      id: 4, 
      title: 'Cardio Zone', 
      description: 'Advanced cardiovascular training equipment',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80'
    },
    { 
      id: 5, 
      title: 'Strength Training', 
      description: 'Comprehensive strength building facilities',
      image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80'
    },
    { 
      id: 6, 
      title: 'Recovery Area', 
      description: 'Premium recovery and relaxation spaces',
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80'
    },
    { 
      id: 7, 
      title: 'Locker Rooms', 
      description: 'Luxury locker room facilities',
      image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80'
    },
    { 
      id: 8, 
      title: 'Yoga Studio', 
      description: 'Peaceful yoga and meditation space',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80'
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ff6b00' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center py-32">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight bg-gradient-to-r from-white via-gray-200 to-orange-500 bg-clip-text text-transparent">
              Transform Your Body,
              <span className="block bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 bg-clip-text text-transparent">Transform Your Life</span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-gray-300 max-w-2xl mx-auto">
              Join FitFlex Gym and unlock your full potential with state-of-the-art equipment and expert trainers
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/membership"
                className="bg-gradient-to-r from-orange-500 via-red-600 to-orange-600 hover:from-orange-600 hover:via-red-700 hover:to-orange-700 text-white font-bold px-10 py-4 rounded-lg text-lg shadow-2xl hover:shadow-orange-500/50 transition-all transform hover:scale-105"
              >
                Join Now
              </Link>
              <Link
                to="/dashboard"
                className="bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white font-bold px-10 py-4 rounded-lg text-lg border border-gray-700 shadow-xl transition-all transform hover:scale-105"
              >
                Explore Features
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-orange-500 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-orange-500 rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* BMI Calculator Section */}
      <section className="py-20 bg-gradient-to-b from-black via-gray-900 to-black border-y border-gray-800">
        <div className="container mx-auto px-4">
          <BMICalculator />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 via-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-orange-500 bg-clip-text text-transparent">
              Why FitFlex?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Experience fitness redefined with our premium facilities and personalized training programs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: (
                  <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29l-1.43-1.43z"/>
                  </svg>
                ),
                title: 'State-of-the-Art Equipment',
                desc: 'Latest fitness technology and premium equipment to maximize your workout potential'
              },
              {
                icon: (
                  <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                  </svg>
                ),
                title: 'Expert Trainers',
                desc: 'Certified professionals dedicated to helping you achieve your fitness goals'
              },
              {
                icon: (
                  <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/>
                    <path d="M14 11h-4v1h3c.55 0 1 .45 1 1v3c0 .55-.45 1-1 1h-1v1h-2v-1H9v-2h4v-1h-3c-.55 0-1-.45-1-1v-3c0-.55.45-1 1-1h1V8h2v1h2v2z"/>
                  </svg>
                ),
                title: 'Mobile App Access',
                desc: 'Track your progress, book classes, and manage your membership on the go'
              },
              {
                icon: (
                  <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Flexible Schedules',
                desc: 'Open 24/7 for Pro members, with flexible class schedules for all members'
              },
              {
                icon: (
                  <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                title: 'Nutrition Support',
                desc: 'Get personalized nutrition plans and consultations (Pro members)'
              },
              {
                icon: (
                  <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
                title: 'Goal Tracking',
                desc: 'Advanced analytics and progress tracking to monitor your fitness journey'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8 rounded-2xl shadow-2xl hover:shadow-orange-500/20 transition-all border border-gray-800 hover:border-orange-500/50 transform hover:-translate-y-2 group"
              >
                <div className="mb-6 mt-4 flex justify-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-500/20 via-red-500/20 to-orange-600/20 flex items-center justify-center border border-orange-500/30 group-hover:border-orange-500/50 group-hover:from-orange-500/30 group-hover:via-red-500/30 group-hover:to-orange-600/30 transition-all">
                    <div className="text-orange-400 group-hover:text-orange-300 transition-colors">
                      {feature.icon}
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-gradient-to-b from-black via-gray-900 to-black border-y border-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-orange-500 bg-clip-text text-transparent">
              Our Facilities
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Explore our world-class gym facilities and premium amenities
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {galleryImages.map((image, index) => {
              // Background gradient colors for each facility
              const bgGradients = [
                'from-blue-900/30 via-blue-800/20 to-black',
                'from-red-900/30 via-red-800/20 to-black',
                'from-purple-900/30 via-purple-800/20 to-black',
                'from-green-900/30 via-green-800/20 to-black',
                'from-orange-900/30 via-orange-800/20 to-black',
                'from-pink-900/30 via-pink-800/20 to-black',
                'from-cyan-900/30 via-cyan-800/20 to-black',
                'from-yellow-900/30 via-yellow-800/20 to-black',
              ];
              
              return (
                <div
                  key={image.id}
                  className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-orange-500/50 transition-all transform hover:scale-105 shadow-2xl animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Background Image with low opacity - Special handling for Yoga Studio */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
                    style={{ 
                      backgroundImage: image.title === 'Yoga Studio' 
                        ? `url('https://images.unsplash.com/photo-1506126613408-07c5c86b32e8?w=800&q=80')`
                        : `url(${image.image})`,
                      opacity: image.title === 'Yoga Studio' ? 0.35 : 0.20
                    }}
                  ></div>
                  
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${bgGradients[index % bgGradients.length]} opacity-60 group-hover:opacity-70 transition-opacity duration-500`}></div>
                  
                  {/* Content */}
                  <div className="relative z-10 aspect-square flex items-center justify-center p-8">
                    <div className="text-center">
                      <h3 className="text-white font-bold text-lg mb-2 group-hover:text-orange-400 transition-colors drop-shadow-lg">{image.title}</h3>
                      <p className="text-gray-300 text-sm group-hover:text-gray-200 transition-colors drop-shadow-md">{image.description}</p>
                    </div>
                  </div>
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Membership Plans Preview */}
      <section className="py-20 bg-gradient-to-b from-gray-900 via-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-orange-500 bg-clip-text text-transparent">
              Choose Your Plan
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Flexible membership options designed to fit your fitness journey
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[MEMBERSHIP_TIERS.BEGINNER, MEMBERSHIP_TIERS.PRO].map((tier) => {
              const plan = MEMBERSHIP_PLANS[tier];
              const isPopular = tier === MEMBERSHIP_TIERS.PRO;

              return (
                <div
                  key={tier}
                  className={`relative bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl shadow-2xl overflow-hidden transform transition-all hover:scale-105 border ${
                    isPopular 
                      ? 'ring-4 ring-orange-500/50 border-orange-500/50' 
                      : 'border-gray-800 hover:border-orange-500/50'
                  }`}
                >
                  {isPopular && (
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-2 rounded-bl-2xl font-bold text-sm z-10">
                      MOST POPULAR
                    </div>
                  )}
                  <div className={`bg-gradient-to-r ${
                    tier === MEMBERSHIP_TIERS.BEGINNER 
                      ? 'from-blue-900 via-blue-800 to-gray-900' 
                      : 'from-orange-600 via-red-600 to-orange-700'
                  } p-8 text-white text-center`}>
                    <div className="mb-4 flex justify-center">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
                        <FitnessLogo showText={false} size="small" />
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold mb-4">{plan.name}</h3>
                    <div className="flex items-baseline justify-center gap-2 mb-4">
                      <span className="text-5xl font-bold">${plan.monthlyFee}</span>
                      <span className="text-xl opacity-90">/month</span>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 border border-white/30">
                      <p className="text-sm">Joining Fee: <span className="font-bold">${plan.joiningFee}</span></p>
                    </div>
                  </div>
                  <div className="p-8">
                    <ul className="space-y-3 mb-8">
                      {plan.features.slice(0, 4).map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-orange-500 text-lg">✓</span>
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      to="/membership"
                      className={`w-full block text-center py-4 rounded-lg font-semibold text-lg text-white transition-all shadow-lg hover:shadow-xl ${
                        isPopular
                          ? 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700'
                          : 'bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900'
                      }`}
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-b from-black via-gray-900 to-black border-y border-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-orange-500 bg-clip-text text-transparent">
              Success Stories
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              See what our members have achieved
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: 'Sarah Johnson',
                result: 'Lost 30lbs in 3 months',
                quote: 'FitFlex changed my life! The trainers are amazing and the community is so supportive.'
              },
              {
                name: 'Mike Chen',
                result: 'Gained 20lbs of muscle',
                quote: 'The Pro membership was worth every penny. The personal training sessions are incredible.'
              },
              {
                name: 'Emily Davis',
                result: 'Ran her first marathon',
                quote: 'The workout tracking and goal setting features helped me stay motivated throughout my journey.'
              }
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8 rounded-2xl shadow-2xl border border-gray-800 hover:border-orange-500/50 transition-all"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">⭐</span>
                  <span className="text-2xl">⭐</span>
                  <span className="text-2xl">⭐</span>
                  <span className="text-2xl">⭐</span>
                  <span className="text-2xl">⭐</span>
                </div>
                <p className="text-gray-300 mb-4 italic">"{testimonial.quote}"</p>
                <div className="border-t border-gray-800 pt-4">
                  <p className="font-bold text-white">{testimonial.name}</p>
                  <p className="text-sm text-orange-500">{testimonial.result}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-black via-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 via-red-600/10 to-orange-600/10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-orange-500 bg-clip-text text-transparent">
            Ready to Start Your Fitness Journey?
          </h2>
          <p className="text-xl mb-12 text-gray-300 max-w-2xl mx-auto">
            Join FitFlex today and take the first step towards a healthier, stronger you
          </p>
          <Link
            to="/membership"
            className="inline-block bg-gradient-to-r from-orange-500 via-red-600 to-orange-600 hover:from-orange-600 hover:via-red-700 hover:to-orange-700 text-white font-bold px-12 py-5 rounded-lg text-xl shadow-2xl hover:shadow-orange-500/50 transition-all transform hover:scale-105"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
}
