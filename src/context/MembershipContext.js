import React, { createContext, useState, useEffect } from 'react';

export const MembershipContext = createContext();

const API_URL = 'http://localhost:3001';

export const MEMBERSHIP_TIERS = {
  NONE: 'none',
  BEGINNER: 'beginner',
  PRO: 'pro'
};

export const MEMBERSHIP_PLANS = {
  [MEMBERSHIP_TIERS.BEGINNER]: {
    name: 'Beginner',
    monthlyFee: 29.99,
    joiningFee: 14.99,
    features: [
      'Access to all gym equipment',
      'Group fitness classes',
      'Free personal training session',
      'Locker room access',
      'Online workout plans',
      'Community support'
    ],
    color: 'blue',
    icon: '🌱'
  },
  [MEMBERSHIP_TIERS.PRO]: {
    name: 'Pro',
    monthlyFee: 59.99,
    joiningFee: 19.99,
    features: [
      'Everything in Beginner',
      'Unlimited personal training',
      'Nutrition consultation',
      'Priority booking for classes',
      'Access to premium areas',
      '24/7 gym access',
      'Guest passes (2 per month)',
      'Massage therapy sessions',
      'Advanced analytics tracking'
    ],
    color: 'purple',
    icon: '💎'
  }
};

export function MembershipProvider({ children }) {
  const [membership, setMembership] = useState({ tier: MEMBERSHIP_TIERS.NONE, joinDate: null, expiryDate: null });
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load memberships and payments from JSON server on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [membershipsRes, paymentsRes] = await Promise.all([
          fetch(`${API_URL}/memberships`),
          fetch(`${API_URL}/payments`)
        ]);
        
        if (membershipsRes.ok) {
          const membershipsData = await membershipsRes.json();
          if (membershipsData.length > 0) {
            const latestMembership = membershipsData[membershipsData.length - 1];
            setMembership({
              ...latestMembership,
              joinDate: latestMembership.joinDate ? new Date(latestMembership.joinDate) : null,
              expiryDate: latestMembership.expiryDate ? new Date(latestMembership.expiryDate) : null
            });
          }
        }
        
        if (paymentsRes.ok) {
          const paymentsData = await paymentsRes.json();
          setPayments(paymentsData);
        }
      } catch (error) {
        console.error('Error fetching membership data:', error);
        // Fallback to empty state if server is not running
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const purchaseMembership = async (tier, paymentMethod = 'card') => {
    const plan = MEMBERSHIP_PLANS[tier];
    if (!plan) return false;

    const joinDate = new Date();
    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 1); // 1 month membership

    const newMembership = {
      tier,
      joinDate: joinDate.toISOString(),
      expiryDate: expiryDate.toISOString(),
      paymentMethod
    };

    const payment = {
      type: 'membership',
      tier,
      amount: plan.monthlyFee + plan.joiningFee,
      date: joinDate.toISOString(),
      status: 'completed'
    };

    try {
      // Save membership to JSON server
      const membershipRes = await fetch(`${API_URL}/memberships`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMembership),
      });

      // Save payment to JSON server
      const paymentRes = await fetch(`${API_URL}/payments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payment),
      });

      if (membershipRes.ok && paymentRes.ok) {
        const savedMembership = await membershipRes.json();
        const savedPayment = await paymentRes.json();
        
        setMembership({
          ...savedMembership,
          joinDate: savedMembership.joinDate ? new Date(savedMembership.joinDate) : null,
          expiryDate: savedMembership.expiryDate ? new Date(savedMembership.expiryDate) : null
        });
        setPayments(prev => [...prev, savedPayment]);
        return true;
      }
    } catch (error) {
      console.error('Error purchasing membership:', error);
      // Fallback: update local state if server fails
      setMembership(newMembership);
      setPayments(prev => [...prev, { ...payment, id: Date.now() }]);
      return true;
    }

    return false;
  };

  const cancelMembership = async () => {
    try {
      // In a real app, you might want to update the membership status instead of deleting
      setMembership({ tier: MEMBERSHIP_TIERS.NONE, joinDate: null, expiryDate: null });
    } catch (error) {
      console.error('Error canceling membership:', error);
      setMembership({ tier: MEMBERSHIP_TIERS.NONE, joinDate: null, expiryDate: null });
    }
  };

  const isMember = membership.tier !== MEMBERSHIP_TIERS.NONE;
  const isActive = isMember && membership.expiryDate && new Date(membership.expiryDate) > new Date();

  const value = {
    membership,
    payments,
    purchaseMembership,
    cancelMembership,
    isMember,
    isActive,
    MEMBERSHIP_PLANS,
    MEMBERSHIP_TIERS
  };

  return (
    <MembershipContext.Provider value={value}>
      {children}
    </MembershipContext.Provider>
  );
}


