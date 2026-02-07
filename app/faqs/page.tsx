import Link from 'next/link';
import Footer from '@/components/layout/footer';

const faqs = [
  {
    question: 'What is PrimeTask?',
    answer:
      'PrimeTask is a modern task management application designed to help you organize, prioritize, and track your tasks with a beautiful, intuitive interface.',
  },
  {
    question: 'Is PrimeTask free to use?',
    answer:
      'Yes! PrimeTask is completely free to use. Simply create an account and start managing your tasks right away.',
  },
  {
    question: 'How do I create a new task?',
    answer:
      'After signing in, navigate to your dashboard and click the "Add New Task" button. Fill in the title and an optional description, then click "Create Task".',
  },
  {
    question: 'Can I use PrimeTask on my phone?',
    answer:
      'Absolutely. PrimeTask is fully responsive and works seamlessly on desktop, tablet, and mobile devices.',
  },
  {
    question: 'How do I switch between light and dark mode?',
    answer:
      'Use the theme toggle button in the navigation bar (the sun/moon icon). You can switch between light, dark, and system-based themes.',
  },
  {
    question: 'Is my data secure?',
    answer:
      'Yes. All data is transmitted over encrypted connections, and your account is protected with secure authentication.',
  },
];

export default function FAQsPage() {
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
          Frequently Asked Questions
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-10">
          Find answers to the most common questions about PrimeTask.
        </p>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-800/80 rounded-xl border border-gray-100 dark:border-slate-700/60 p-6"
            >
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {faq.question}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
