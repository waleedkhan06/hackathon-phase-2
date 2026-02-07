'use client';

import PageLayout from '@/components/layout/page-layout';
import Link from 'next/link';
import { Mail, MessageCircle, FileQuestion } from 'lucide-react';
import { motion } from 'framer-motion';

type SupportChannel = {
  icon: React.ElementType;
  title: string;
  description: string;
} & (
  | { isLink: true; action: '/faqs'; isEmail?: false; isAnchor?: false }
  | { isEmail: true; action: string; isLink?: false; isAnchor?: false }
  | { isAnchor: true; action: string; isLink?: false; isEmail?: false }
);

const supportChannels: SupportChannel[] = [
  {
    icon: Mail,
    title: 'Email Support',
    description: 'Send us an email and we will get back to you within 24 hours.',
    action: 'support@primetask.com',
    isEmail: true,
  },
  {
    icon: FileQuestion,
    title: 'FAQs',
    description: 'Browse our frequently asked questions for quick answers.',
    action: '/faqs',
    isLink: true,
  },
  {
    icon: MessageCircle,
    title: 'Community',
    description: 'Join our community to share tips and get help from other users.',
    action: '#',
    isAnchor: true,
  },
];

export default function HelpPage() {
  return (
    <PageLayout
      title="Help & Support"
      description="We are here to help. Choose the support channel that works best for you."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {supportChannels.map((channel, index) => {
          const Icon = channel.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6 text-center hover:bg-slate-800/60 hover:border-slate-600/60 transition-all duration-300"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-indigo-500/20 to-blue-500/20 flex items-center justify-center"
              >
                <Icon className="w-6 h-6 text-indigo-400" />
              </motion.div>
              <h2 className="text-lg font-semibold text-white mb-2">
                {channel.title}
              </h2>
              <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                {channel.description}
              </p>
              {channel.isLink ? (
                <Link
                  href={channel.action}
                  className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  View FAQs
                </Link>
              ) : channel.isEmail ? (
                <a
                  href={`mailto:${channel.action}`}
                  className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  Contact Us
                </a>
              ) : (
                <span className="text-sm font-medium text-indigo-400">
                  {channel.action}
                </span>
              )}
            </motion.div>
          );
        })}
      </div>
    </PageLayout>
  );
}
