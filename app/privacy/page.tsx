'use client';

import PageLayout from '@/components/layout/page-layout';
import { motion } from 'framer-motion';

const sections = [
  {
    title: 'Information We Collect',
    content: 'We collect information you provide directly when you create an account, such as your name and email address. We also collect data about the tasks you create and manage within the application.',
  },
  {
    title: 'How We Use Your Information',
    content: 'Your information is used to provide and improve the PrimeTask service, authenticate your identity, and deliver a personalised experience. We do not sell your personal data to third parties.',
  },
  {
    title: 'Data Security',
    content: 'We implement industry-standard security measures to protect your data. All communications are encrypted in transit, and we regularly review our security practices.',
  },
  {
    title: 'Contact Us',
    content: 'If you have questions about this Privacy Policy, please contact us at support@primetask.com.',
  },
];

export default function PrivacyPolicyPage() {
  return (
    <PageLayout
      title="Privacy Policy"
      description={`Last updated: ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`}
    >
      <div className="space-y-6">
        {sections.map((section, index) => (
          <motion.section
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6 hover:bg-slate-800/60 hover:border-slate-600/60 transition-all duration-300"
          >
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-3">
              {section.title}
            </h2>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
              {section.content}
            </p>
          </motion.section>
        ))}
      </div>
    </PageLayout>
  );
}
