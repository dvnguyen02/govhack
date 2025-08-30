// AI Service for Care Plan Generation
// Note: For demo purposes, we'll mock the OpenAI calls
// In production, you would use: import OpenAI from 'openai';

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

export interface AICarePlanRequest {
  employeeName: string;
  reason: string;
  category: string;
  symptoms?: string[];
  duration: string;
  previousAbsences?: Array<{
    reason: string;
    category: string;
    duration: number;
    outcome: 'successful' | 'extended' | 'recurring';
  }>;
  workEnvironment?: 'office' | 'manufacturing' | 'healthcare' | 'remote';
  location?: string; // NZ region for local resources
}

export interface AICarePlan {
  title: string;
  overview: string;
  estimatedRecoveryTime: string;
  dailyPlan: Array<{
    day: number;
    focus: string;
    tasks: string[];
    checkpoints: string[];
  }>;
  resources: Array<{
    title: string;
    type: 'nz_health_service' | 'acc_resource' | 'wellness_tip' | 'emergency_contact';
    contact?: string;
    description: string;
  }>;
  returnToWorkGuidance: {
    gradualReturn: boolean;
    accommodations: string[];
    checkInSchedule: string[];
  };
  redFlags: string[]; // When to seek immediate medical attention
  followUpReminders: Array<{
    day: number;
    message: string;
    action: string;
  }>;
}

export const generateAICarePlan = async (request: AICarePlanRequest): Promise<AICarePlan> => {
  // For demo purposes, we'll use mock responses based on conditions
  // In production, this would call ChatGPT API
  
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate care plan based on condition
    const carePlan = generateCarePlanByCondition(request);
    return carePlan;
  } catch (error) {
    console.error('Error generating AI care plan:', error);
    return generateFallbackCarePlan(request);
  }
};

const generateCarePlanByCondition = (request: AICarePlanRequest): AICarePlan => {
  const condition = request.reason.toLowerCase();
  const category = request.category;

  // AI-generated care plans based on different conditions
  if (condition.includes('flu') || condition.includes('fever') || condition.includes('cold')) {
    return {
      title: "Flu Recovery & Wellness Plan",
      overview: "A comprehensive approach to flu recovery focusing on rest, hydration, and gradual return to normal activities while preventing transmission to colleagues.",
      estimatedRecoveryTime: "3-5 days",
      dailyPlan: [
        {
          day: 1,
          focus: "Rest & Symptom Management",
          tasks: [
            "Stay home and rest - avoid all work activities",
            "Drink 8-10 glasses of warm fluids (water, herbal tea, broth)",
            "Take paracetamol or ibuprofen for fever and aches as directed",
            "Monitor temperature every 4 hours"
          ],
          checkpoints: ["Fever below 38°C for 24 hours", "Able to keep fluids down"]
        },
        {
          day: 2,
          focus: "Continued Recovery",
          tasks: [
            "Maintain bed rest if fever persists",
            "Eat light, nutritious foods (toast, soup, fruits)",
            "Take warm baths to ease muscle aches",
            "Avoid dairy if experiencing congestion"
          ],
          checkpoints: ["Energy levels stabilizing", "Appetite returning"]
        },
        {
          day: 3,
          focus: "Gradual Activity Return",
          tasks: [
            "Light movement around the house if feeling better",
            "Fresh air outside for 10-15 minutes if no fever",
            "Prepare for return-to-work assessment",
            "Contact manager about return timeline"
          ],
          checkpoints: ["24 hours fever-free", "Feeling 80% normal energy"]
        }
      ],
      resources: [
        {
          title: "Healthline NZ",
          type: "nz_health_service",
          contact: "0800-611-116",
          description: "24/7 health advice from registered nurses for flu management"
        },
        {
          title: "WorkSafe NZ - Infectious Disease Guidelines",
          type: "acc_resource",
          contact: "0800-030-040",
          description: "Workplace guidelines for preventing flu transmission"
        },
        {
          title: "Flu Recovery Nutrition Guide",
          type: "wellness_tip",
          description: "Foods and supplements that support immune system recovery"
        }
      ],
      returnToWorkGuidance: {
        gradualReturn: true,
        accommodations: [
          "Work from home option for first 2 days back",
          "Reduced hours (6 hours) for first week",
          "Frequent breaks for hydration",
          "Avoid meetings with vulnerable colleagues initially"
        ],
        checkInSchedule: ["Day 3: Return-to-work readiness assessment", "Week 1: Energy level evaluation"]
      },
      redFlags: [
        "Difficulty breathing or shortness of breath",
        "Persistent high fever above 39°C for more than 3 days",
        "Severe headache with neck stiffness",
        "Dehydration (dizziness, dry mouth, little/no urination)"
      ],
      followUpReminders: [
        {
          day: 3,
          message: "How are your energy levels? Ready to discuss gradual return to work?",
          action: "Contact manager if feeling 80% better"
        },
        {
          day: 7,
          message: "Follow-up: Any lingering symptoms or concerns?",
          action: "Schedule check-in with occupational health if needed"
        }
      ]
    };
  }

  if (condition.includes('stress') || condition.includes('anxiety') || condition.includes('burnout') || category === 'mental-health') {
    return {
      title: "Mental Health & Stress Recovery Plan",
      overview: "A supportive approach to managing work-related stress and anxiety, focusing on immediate relief and building long-term resilience strategies.",
      estimatedRecoveryTime: "3-7 days",
      dailyPlan: [
        {
          day: 1,
          focus: "Immediate Stress Relief",
          tasks: [
            "Contact Employee Assistance Programme (EAP) for immediate support",
            "Practice deep breathing: 4-7-8 technique (inhale 4, hold 7, exhale 8)",
            "Disconnect from work emails and calls completely",
            "Engage in calming activities (warm bath, gentle music, reading)"
          ],
          checkpoints: ["Feeling less overwhelmed", "Able to focus on breathing exercises"]
        },
        {
          day: 2,
          focus: "Mindfulness & Self-Care",
          tasks: [
            "Try 10-minute guided meditation (Headspace or Calm apps)",
            "Take a 20-minute walk in nature or local park",
            "Journal about stressors and feelings",
            "Ensure 8+ hours of quality sleep"
          ],
          checkpoints: ["Improved sleep quality", "Reduced physical tension"]
        },
        {
          day: 3,
          focus: "Support & Planning",
          tasks: [
            "Speak with trusted friend or family member",
            "Identify specific work stressors for discussion with manager",
            "Plan workload management strategies",
            "Consider flexible work arrangements"
          ],
          checkpoints: ["Clear about return-to-work needs", "Support network activated"]
        }
      ],
      resources: [
        {
          title: "EAP Services NZ",
          type: "nz_health_service",
          contact: "0800-327-669",
          description: "Free confidential counseling for work-related stress"
        },
        {
          title: "Mental Health Foundation NZ",
          type: "nz_health_service",
          contact: "09-623-4704",
          description: "Resources and support for workplace mental health"
        },
        {
          title: "Lifeline Aotearoa",
          type: "emergency_contact",
          contact: "0800-543-354",
          description: "24/7 crisis support for urgent mental health needs"
        },
        {
          title: "Workplace Stress Management Guide",
          type: "wellness_tip",
          description: "Evidence-based strategies for managing work-related stress"
        }
      ],
      returnToWorkGuidance: {
        gradualReturn: true,
        accommodations: [
          "Reduced workload for first 2 weeks",
          "Flexible start/finish times to avoid peak stress",
          "Regular check-ins with manager (weekly initially)",
          "Option to work from home 1-2 days per week",
          "Temporary delegation of high-pressure tasks"
        ],
        checkInSchedule: [
          "Day 3: Readiness and accommodation discussion",
          "Week 1: Workload and stress level assessment",
          "Month 1: Long-term wellness strategy review"
        ]
      },
      redFlags: [
        "Thoughts of self-harm or suicide",
        "Unable to sleep for multiple nights",
        "Panic attacks or severe anxiety episodes",
        "Complete inability to function in daily activities"
      ],
      followUpReminders: [
        {
          day: 3,
          message: "How are you feeling? Ready to talk about return-to-work support?",
          action: "Schedule meeting with manager and HR"
        },
        {
          day: 7,
          message: "Check-in: How are the stress management techniques working?",
          action: "Book follow-up EAP session if needed"
        },
        {
          day: 30,
          message: "Monthly wellness check: How is your work-life balance?",
          action: "Review and adjust accommodation strategies"
        }
      ]
    };
  }

  if (condition.includes('back') || condition.includes('injury') || category === 'injury') {
    return {
      title: "Back Injury Recovery & Return Plan",
      overview: "Evidence-based approach to back injury recovery with focus on pain management, gradual mobility improvement, and workplace ergonomic assessment.",
      estimatedRecoveryTime: "5-10 days",
      dailyPlan: [
        {
          day: 1,
          focus: "Pain Management & Rest",
          tasks: [
            "Apply ice for 15-20 minutes every 2-3 hours for first 48 hours",
            "Take anti-inflammatory medication as prescribed",
            "Avoid bed rest - gentle movement is better",
            "Sleep on firm surface with pillow between knees"
          ],
          checkpoints: ["Pain manageable with medication", "Able to move without severe pain"]
        },
        {
          day: 3,
          focus: "Gentle Movement",
          tasks: [
            "Switch to heat therapy (warm compress) after 48 hours",
            "Begin gentle stretching: knee-to-chest, pelvic tilts",
            "Short walks (5-10 minutes) every few hours",
            "Maintain good posture when sitting"
          ],
          checkpoints: ["Increased mobility", "Reduced stiffness"]
        },
        {
          day: 5,
          focus: "Strengthening & Preparation",
          tasks: [
            "Core strengthening exercises (as tolerated)",
            "Assess home/work ergonomics",
            "Practice proper lifting techniques",
            "Schedule ergonomic assessment for return to work"
          ],
          checkpoints: ["Can perform daily activities", "Confidence in movement returning"]
        }
      ],
      resources: [
        {
          title: "ACC Injury Support",
          type: "acc_resource",
          contact: "0800-101-996",
          description: "Coverage for injury treatment and workplace assessments"
        },
        {
          title: "Physiotherapy Services",
          type: "nz_health_service",
          contact: "Book through GP",
          description: "Professional back injury rehabilitation"
        },
        {
          title: "WorkSafe NZ Ergonomics",
          type: "acc_resource",
          contact: "0800-030-040",
          description: "Workplace ergonomic assessment and guidelines"
        }
      ],
      returnToWorkGuidance: {
        gradualReturn: true,
        accommodations: [
          "Ergonomic workstation assessment before return",
          "Sit-stand desk or regular position changes",
          "No heavy lifting (under 10kg) for 2 weeks",
          "Regular stretching breaks every 30 minutes",
          "Option to work from home if commute is problematic"
        ],
        checkInSchedule: [
          "Day 5: Mobility and readiness assessment",
          "Week 2: Ergonomic setup evaluation",
          "Month 1: Long-term prevention strategy"
        ]
      },
      redFlags: [
        "Severe pain that worsens despite medication",
        "Numbness or tingling in legs",
        "Loss of bladder or bowel control",
        "Inability to bear weight or walk"
      ],
      followUpReminders: [
        {
          day: 5,
          message: "How is your mobility? Ready for ergonomic assessment?",
          action: "Schedule workplace assessment with facilities team"
        },
        {
          day: 14,
          message: "Follow-up: How is your back feeling at work?",
          action: "Adjust ergonomic setup if needed"
        }
      ]
    };
  }

  // Default care plan for other conditions
  return generateFallbackCarePlan(request);
};

const generateFallbackCarePlan = (request: AICarePlanRequest): AICarePlan => {
  return {
    title: `Recovery Plan for ${request.category.replace('-', ' ')}`,
    overview: "A structured approach to recovery and return to wellness.",
    estimatedRecoveryTime: request.duration,
    dailyPlan: [
      {
        day: 1,
        focus: "Rest and Initial Care",
        tasks: ["Focus on rest and recovery", "Stay hydrated", "Monitor symptoms"],
        checkpoints: ["Assess symptom severity", "Note any changes"]
      },
      {
        day: 2,
        focus: "Gradual Activity",
        tasks: ["Light activity as tolerated", "Continue symptom monitoring", "Maintain nutrition"],
        checkpoints: ["Energy levels improving", "Symptoms stabilizing"]
      }
    ],
    resources: [
      {
        title: "Healthline NZ",
        type: "nz_health_service",
        contact: "0800-611-116",
        description: "24/7 health advice from registered nurses"
      }
    ],
    returnToWorkGuidance: {
      gradualReturn: true,
      accommodations: ["Flexible start times", "Regular breaks"],
      checkInSchedule: ["Day 3 manager check-in"]
    },
    redFlags: ["Worsening symptoms", "Severe pain", "Difficulty breathing"],
    followUpReminders: [
      {
        day: 3,
        message: "How are you feeling? Ready to discuss return to work?",
        action: "Contact manager if feeling better"
      }
    ]
  };
};

// Function to trigger care plan generation when absence is reported
export const handleAbsenceWithAICarePlan = async (absenceData: any) => {
  const aiRequest: AICarePlanRequest = {
    employeeName: absenceData.employeeName,
    reason: absenceData.reason,
    category: absenceData.category,
    symptoms: absenceData.details ? [absenceData.details] : [],
    duration: `${absenceData.daysOff} days`,
    workEnvironment: 'office', // Could be derived from employee profile
    location: 'Auckland, NZ' // Could be from employee location
  };

  const aiCarePlan = await generateAICarePlan(aiRequest);
  
  // Store the care plan with the absence record
  return {
    ...absenceData,
    aiCarePlan,
    carePlanActive: true,
    carePlanGeneratedAt: new Date().toISOString()
  };
};
