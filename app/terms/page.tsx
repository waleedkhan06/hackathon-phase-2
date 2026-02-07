'use client';

import PageLayout from '@/components/layout/page-layout';
import { motion } from 'framer-motion';

const sections = [
  {
    title: 'Acceptance of Terms',
    content: 'By accessing and using PrimeTask, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.',
  },
  {
    title: 'Use License',
    content: 'Permission is granted to temporarily download one copy of the materials (information or software) on PrimeTask\'s website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:',
  },
  {
    title: 'Disclaimer',
    content: 'The materials on PrimeTask\'s website are provided on an "as is" basis. PrimeTask makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.',
  },
  {
    title: 'Limitations',
    content: 'In no event shall PrimeTask or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on PrimeTask\'s website.',
  },
  {
    title: 'Accuracy of Materials',
    content: 'The materials appearing on PrimeTask\'s website could include technical, typographical, or photographic errors. PrimeTask does not warrant that any of the materials on the website are accurate, complete, or current.',
  },
  {
    title: 'Modifications',
    content: 'PrimeTask may revise these terms of service for the website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.',
  },
];

export default function TermsPage() {
  return (
    <PageLayout
      title="Terms & Conditions"
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
