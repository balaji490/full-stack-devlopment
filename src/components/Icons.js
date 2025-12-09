import React from 'react';

// Steps Icon
export const StepsIcon = ({ className = "w-8 h-8", color = "text-blue-500" }) => (
  <svg className={`${className} ${color}`} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18c-3.31 0-6-2.69-6-6V9l6-3 6 3v5c0 3.31-2.69 6-6 6z"/>
    <path d="M12 4L4 8v4c0 3.31 2.69 6 6 6s6-2.69 6-6V8l-8-4zm0 14c-2.76 0-5-2.24-5-5v-3l5-2.5L17 10v3c0 2.76-2.24 5-5 5z"/>
  </svg>
);

// Calories/Fire Icon
export const CaloriesIcon = ({ className = "w-8 h-8", color = "text-orange-500" }) => (
  <svg className={`${className} ${color}`} fill="currentColor" viewBox="0 0 24 24">
    <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/>
  </svg>
);

// Workout/Dumbbell Icon
export const WorkoutIcon = ({ className = "w-8 h-8", color = "text-purple-500" }) => (
  <svg className={`${className} ${color}`} fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29l-1.43-1.43z"/>
  </svg>
);

// Duration/Clock Icon
export const DurationIcon = ({ className = "w-8 h-8", color = "text-green-500" }) => (
  <svg className={`${className} ${color}`} fill="currentColor" viewBox="0 0 24 24">
    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
  </svg>
);

// Check Icon
export const CheckIcon = ({ className = "w-6 h-6", color = "text-green-500" }) => (
  <svg className={`${className} ${color}`} fill="currentColor" viewBox="0 0 24 24">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
  </svg>
);

// Running Icon
export const RunningIcon = ({ className = "w-8 h-8", color = "text-red-500" }) => (
  <svg className={`${className} ${color}`} fill="currentColor" viewBox="0 0 24 24">
    <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z"/>
  </svg>
);

// Walking Icon
export const WalkingIcon = ({ className = "w-8 h-8", color = "text-green-500" }) => (
  <svg className={`${className} ${color}`} fill="currentColor" viewBox="0 0 24 24">
    <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6.5 6V22h-2v-6h-2l-2-2h2v-2c0-1.1.9-2 2-2h2v2h-2v2h2l1.5 2zM9 12c-2.8 0-5 2.2-5 5v5h2v-5c0-1.7 1.3-3 3-3s3 1.3 3 3v5h2v-5c0-2.8-2.2-5-5-5z"/>
  </svg>
);

// Cycling Icon
export const CyclingIcon = ({ className = "w-8 h-8", color = "text-blue-500" }) => (
  <svg className={`${className} ${color}`} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.18 10l-1.7-4.68C16.19 4.53 15.44 4 14.56 4H12v2h2.56l1.5 4.14c-.56.18-1.06.51-1.5 1l-3.38-9.24C10.86 1.82 10.15 1 9.15 1H6v2h3.15l3.38 9.24c-.18.35-.28.73-.28 1.16 0 1.66 1.34 3 3 3s3-1.34 3-3c0-.43-.1-.81-.28-1.16L19.18 10h-1zM7.15 3l-1.5 4h2.76L10 3H7.15zM17 14c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z"/>
  </svg>
);

// Target/Goal Icon
export const TargetIcon = ({ className = "w-8 h-8", color = "text-orange-500" }) => (
  <svg className={`${className} ${color}`} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
  </svg>
);

// Info Icon
export const InfoIcon = ({ className = "w-6 h-6", color = "text-blue-400" }) => (
  <svg className={`${className} ${color}`} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
  </svg>
);

// Plus/Add Icon
export const PlusIcon = ({ className = "w-6 h-6", color = "text-white" }) => (
  <svg className={`${className} ${color}`} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
  </svg>
);

// Home Icon
export const HomeIcon = ({ className = "w-5 h-5", color = "currentColor" }) => (
  <svg className={`${className} ${color}`} fill="currentColor" viewBox="0 0 24 24">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
  </svg>
);

// Membership Icon
export const MembershipIcon = ({ className = "w-5 h-5", color = "currentColor" }) => (
  <svg className={`${className} ${color}`} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
  </svg>
);

// Dashboard Icon
export const DashboardIcon = ({ className = "w-5 h-5", color = "currentColor" }) => (
  <svg className={`${className} ${color}`} fill="currentColor" viewBox="0 0 24 24">
    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
  </svg>
);

// Add Icon (same as PlusIcon but for navbar)
export const AddIcon = ({ className = "w-5 h-5", color = "currentColor" }) => (
  <svg className={`${className} ${color}`} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
  </svg>
);

// History Icon
export const HistoryIcon = ({ className = "w-5 h-5", color = "currentColor" }) => (
  <svg className={`${className} ${color}`} fill="currentColor" viewBox="0 0 24 24">
    <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
  </svg>
);

// Goals Icon (same as TargetIcon but for navbar)
export const GoalsIcon = ({ className = "w-5 h-5", color = "currentColor" }) => (
  <svg className={`${className} ${color}`} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
  </svg>
);

// Login Icon
export const LoginIcon = ({ className = "w-5 h-5", color = "currentColor" }) => (
  <svg className={`${className} ${color}`} fill="currentColor" viewBox="0 0 24 24">
    <path d="M11 7L9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5-5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8v14z"/>
  </svg>
);