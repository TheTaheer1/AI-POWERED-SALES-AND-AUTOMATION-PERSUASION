import { Target, Users, MailCheck, TrendingUp } from 'lucide-react';

export const stats = [
  { title: 'Pipeline Count', value: '42', icon: Users, change: '+12%' },
  { title: 'Avg ICP Score', value: '86/100', icon: Target, change: '+4%' },
  { title: 'Emails Sent', value: '1,240', icon: MailCheck, change: '+28%' },
  { title: 'Reply Rate', value: '14.2%', icon: TrendingUp, change: '+2.1%' },
];

export const topProspects = [
  { name: 'Sarah Jenkins', company: 'Acme Corp', role: 'VP of Engineering', score: 98 },
  { name: 'Michael Chen', company: 'TechFlow', role: 'CTO', score: 95 },
  { name: 'Elena Rodriguez', company: 'DataSync', role: 'Director of IT', score: 92 },
  { name: 'David Kim', company: 'CloudScale', role: 'Lead Architect', score: 89 },
  { name: 'Jessica Taylor', company: 'Innova', role: 'VP of Product', score: 88 },
];

export const pipelineStages = [
  { stage: 'Prospecting', count: 120, color: 'bg-blue-300 dark:bg-blue-800' },
  { stage: 'Qualified', count: 85, color: 'bg-blue-400 dark:bg-blue-700' },
  { stage: 'Demo Scheduled', count: 42, color: 'bg-blue-500 dark:bg-blue-600' },
  { stage: 'Proposal Sent', count: 28, color: 'bg-blue-600 dark:bg-blue-500' },
  { stage: 'Negotiation', count: 12, color: 'bg-blue-700 dark:bg-blue-400' },
  { stage: 'Closed Won', count: 8, color: 'bg-green-500 dark:bg-green-400' },
];

export const emailPerformance = [
  { label: 'Open Rate', value: 48, change: '+5%' },
  { label: 'Click Rate', value: 12, change: '+2%' },
  { label: 'Reply Rate', value: 14.2, change: '+3.1%' },
  { label: 'Bounce Rate', value: 2.1, change: '-0.5%' },
];

export const icpDistribution = [
  { range: '90-100', percentage: 15 },
  { range: '80-89', percentage: 35 },
  { range: '70-79', percentage: 25 },
  { range: '60-69', percentage: 15 },
  { range: '<60', percentage: 10 },
];
