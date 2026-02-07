'use client';

import PageLayout from '@/components/layout/page-layout';
import { motion } from 'framer-motion';

const faqs = [
  {
    question: 'What is PrimeTask?',
    answer: 'PrimeTask is a modern task management application designed to help you organize, prioritize, and track your tasks with a beautiful, intuitive interface.',
  },
  {
    question: 'Is PrimeTask free to use?',
    answer: 'Yes! PrimeTask is completely free to use. Simply create an account and start managing your tasks right away.',
  },
  {
    question: 'How do I create a new task?',
    answer: 'After signing in, navigate to your dashboard and click the "Add New Task" button. Fill in the title and an optional description, then click "Create Task".',
  },
  {
    question: 'Can I use PrimeTask on my phone?',
    answer: 'Absolutely. PrimeTask is fully responsive and works seamlessly on desktop, tablet, and mobile devices.',
  },
  {
    question: 'How do I switch between light and dark mode?',
    answer: 'Use the theme toggle button in the navigation bar (the sun/moon icon). You can switch between light, dark, and system-based themes.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes. All data is transmitted over encrypted connections, and your account is protected with secure authentication.',
  },
];

export default function FAQsPage() {
  return (
    <PageLayout
      title="Frequently Asked Questions"
      description="Find answers to the most common questions about PrimeTask."
    >
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6 hover:bg-slate-800/60 hover:border-slate-600/60 transition-all duration-300"
          >
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">
              {faq.question}
            </h2>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
              {faq.answer}
            </p>
          </motion.div>
        ))}
      </div>
    </PageLayout>
  );
}
