import { Absence, CarePlan, HealthArticle, SupportService } from '../types';

export const sampleAbsences: Absence[] = [
  {
    id: 1,
    employeeName: 'Employee A',
    reason: 'Flu symptoms',
    category: 'illness',
    startDate: '2025-01-15',
    endDate: '2025-01-17',
    status: 'approved',
    details: 'High fever and body aches',
    carePlanActive: true,
    daysOff: 3
  },
  {
    id: 2,
    employeeName: 'Employee B',
    reason: 'Mental health support',
    category: 'mental-health',
    startDate: '2025-01-14',
    endDate: '2025-01-16',
    status: 'approved',
    details: 'Stress and anxiety',
    carePlanActive: true,
    daysOff: 3
  },
  {
    id: 3,
    employeeName: 'Employee C',
    reason: 'Back injury',
    category: 'injury',
    startDate: '2025-01-16',
    endDate: '2025-01-18',
    status: 'pending',
    details: 'Lower back pain from lifting',
    carePlanActive: false,
    daysOff: 3
  },
  {
    id: 4,
    employeeName: 'Employee D',
    reason: 'Migraine',
    category: 'illness',
    startDate: '2025-01-20',
    endDate: '2025-01-21',
    status: 'approved',
    details: 'Severe headache and nausea',
    carePlanActive: true,
    daysOff: 2
  },
  {
    id: 5,
    employeeName: 'Employee E',
    reason: 'Medical appointment',
    category: 'medical-appointment',
    startDate: '2025-01-22',
    endDate: '2025-01-22',
    status: 'approved',
    details: 'Routine check-up',
    carePlanActive: false,
    daysOff: 1
  },
  {
    id: 6,
    employeeName: 'Employee F',
    reason: 'Family care',
    category: 'family-care',
    startDate: '2025-01-18',
    endDate: '2025-01-19',
    status: 'approved',
    details: 'Caring for sick child',
    carePlanActive: false,
    daysOff: 2
  },
  {
    id: 7,
    employeeName: 'Employee G',
    reason: 'Anxiety support',
    category: 'mental-health',
    startDate: '2025-01-23',
    endDate: '2025-01-25',
    status: 'pending',
    details: 'Work-related stress',
    carePlanActive: true,
    daysOff: 3
  },
  {
    id: 8,
    employeeName: 'Employee H',
    reason: 'Workplace injury',
    category: 'injury',
    startDate: '2025-01-19',
    endDate: '2025-01-22',
    status: 'approved',
    details: 'Slipped and twisted ankle',
    carePlanActive: true,
    daysOff: 4
  },
  {
    id: 9,
    employeeName: 'Employee I',
    reason: 'Cold symptoms',
    category: 'illness',
    startDate: '2025-01-24',
    endDate: '2025-01-25',
    status: 'approved',
    details: 'Runny nose and cough',
    carePlanActive: false,
    daysOff: 2
  },
  {
    id: 10,
    employeeName: 'Employee J',
    reason: 'Dental surgery',
    category: 'medical-appointment',
    startDate: '2025-01-26',
    endDate: '2025-01-27',
    status: 'approved',
    details: 'Wisdom tooth removal',
    carePlanActive: true,
    daysOff: 2
  },
  {
    id: 11,
    employeeName: 'Employee K',
    reason: 'Stomach flu',
    category: 'illness',
    startDate: '2025-01-21',
    endDate: '2025-01-23',
    status: 'approved',
    details: 'Nausea and vomiting',
    carePlanActive: true,
    daysOff: 3
  },
  {
    id: 12,
    employeeName: 'Employee L',
    reason: 'Burnout support',
    category: 'mental-health',
    startDate: '2025-01-28',
    endDate: '2025-01-30',
    status: 'pending',
    details: 'Exhaustion and overwhelm',
    carePlanActive: true,
    daysOff: 3
  }
];

export const carePlans: Record<string, CarePlan> = {
  'flu symptoms': {
    title: 'Flu Recovery Plan',
    days: [
      { day: 1, focus: 'Rest & Hydration', tasks: ['Stay hydrated with warm fluids', 'Get 8-10 hours sleep', 'Take temperature regularly'] },
      { day: 2, focus: 'Symptom Management', tasks: ['Continue rest', 'Light stretching if feeling better', 'Eat nutritious foods'] },
      { day: 3, focus: 'Gradual Recovery', tasks: ['Short walks if energy permits', 'Monitor symptoms', 'Prepare for return to work'] }
    ],
    resources: ['NHS Flu Guide', 'Nutrition During Illness', 'When to See a Doctor']
  },
  'mental health support': {
    title: 'Mental Wellbeing Support Plan',
    days: [
      { day: 1, focus: 'Immediate Support', tasks: ['Contact EAP counselor', 'Practice breathing exercises', 'Reach out to trusted friend'] },
      { day: 2, focus: 'Stress Management', tasks: ['Try mindfulness meditation', 'Light physical activity', 'Journal your feelings'] },
      { day: 3, focus: 'Building Resilience', tasks: ['Review coping strategies', 'Plan gradual work return', 'Schedule follow-up support'] }
    ],
    resources: ['Mental Health Foundation', 'Employee Assistance Program', 'Mindfulness Apps', 'Crisis Helplines']
  }
};

export const healthLibrary: HealthArticle[] = [
  { title: 'Managing Work Stress in NZ Workplace', category: 'Mental Health', readTime: '5 min' },
  { title: 'Preventing Back Injury at Work', category: 'Physical Health', readTime: '4 min' },
  { title: 'Winter Wellness in New Zealand', category: 'Illness Prevention', readTime: '3 min' },
  { title: 'Sleep Hygiene for Shift Workers', category: 'Wellness', readTime: '6 min' },
  { title: 'Nutrition for Recovery - NZ Guidelines', category: 'Physical Health', readTime: '7 min' },
  { title: 'Building Resilience at Work', category: 'Mental Health', readTime: '8 min' },
  { title: 'Understanding ACC Claims Process', category: 'Workplace Safety', readTime: '5 min' },
  { title: 'Mental Health Awareness Week NZ', category: 'Mental Health', readTime: '4 min' },
  { title: 'Workplace Ergonomics Guide', category: 'Physical Health', readTime: '6 min' },
  { title: 'Dealing with Workplace Bullying', category: 'Mental Health', readTime: '7 min' },
  { title: 'First Aid Basics for Office Workers', category: 'Workplace Safety', readTime: '8 min' },
  { title: 'Healthy Eating on a Budget NZ', category: 'Wellness', readTime: '5 min' }
];

export const supportServices: SupportService[] = [
  { name: 'EAP Services NZ', type: 'Counseling', contact: '0800-327-669', available: '24/7' },
  { name: 'WorkSafe NZ Health Line', type: 'Workplace Safety', contact: '0800-030-040', available: 'Mon-Fri 8:30-5' },
  { name: 'Mental Health Foundation NZ', type: 'Mental Health Support', contact: '09-623-4704', available: 'Mon-Fri 9-5' },
  { name: 'ACC Injury Support', type: 'Injury & Recovery', contact: '0800-101-996', available: '24/7' },
  { name: 'Healthline NZ', type: 'Medical Advice', contact: '0800-611-116', available: '24/7' },
  { name: 'Lifeline Aotearoa', type: 'Crisis Support', contact: '0800-543-354', available: '24/7' }
];

export const navigationItems = [
  { id: 'dashboard', name: 'Dashboard', icon: 'Activity' },
  { id: 'absences', name: 'Absences', icon: 'Calendar' },
  { id: 'reports', name: 'Analytics', icon: 'TrendingUp' },
  { id: 'employees', name: 'Employees', icon: 'Users' },
  { id: 'care-plans', name: 'Care Plans', icon: 'Heart' },
  { id: 'library', name: 'Health Library', icon: 'BookOpen' },
  { id: 'support', name: 'Support Services', icon: 'Phone' },
  { id: 'settings', name: 'Settings', icon: 'Settings' }
];
