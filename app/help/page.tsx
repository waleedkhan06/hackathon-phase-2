import Link from 'next/link';
import Footer from '@/components/layout/footer';
import { Mail, MessageCircle, FileQuestion } from 'lucide-react';

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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-slate-950">
      <header className="sticky top-0 z-50 w-full border-b border-white/20 dark:border-white/10 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex h-16 items-center px-4 md:px-8">
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400 bg-clip-text text-transparent"
          >
            PrimeTask
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto px-4 md:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Help & Support
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-10">
          We are here to help. Choose the support channel that works best for you.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {supportChannels.map((channel, index) => {
            const Icon = channel.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-slate-800/80 rounded-xl border border-gray-100 dark:border-slate-700/60 p-6 text-center"
              >
                 <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-indigo-100 to-blue-100 dark:from-indigo-900/30 dark:to-blue-900/30 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {channel.title}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  {channel.description}
                </p>
                {channel.isLink ? (
                  <Link
                    href={channel.action}
                    className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    View FAQs
                  </Link>
                ) : channel.isEmail ? (
                  <a
                    href={`mailto:${channel.action}`}
                    className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    Contact Us
                  </a>
                ) : (
                  <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                    {channel.action}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
