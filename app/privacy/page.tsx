import Link from 'next/link';
import Footer from '@/components/layout/footer';

export default function PrivacyPolicyPage() {
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
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-10">
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>

        <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
          <section className="bg-white dark:bg-slate-800/80 rounded-xl border border-gray-100 dark:border-slate-700/60 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Information We Collect
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              We collect information you provide directly when you create an account, such as your name and email address. We also collect data about the tasks you create and manage within the application.
            </p>
          </section>

          <section className="bg-white dark:bg-slate-800/80 rounded-xl border border-gray-100 dark:border-slate-700/60 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              How We Use Your Information
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Your information is used to provide and improve the PrimeTask service, authenticate your identity, and deliver a personalised experience. We do not sell your personal data to third parties.
            </p>
          </section>

          <section className="bg-white dark:bg-slate-800/80 rounded-xl border border-gray-100 dark:border-slate-700/60 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Data Security
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              We implement industry-standard security measures to protect your data. All communications are encrypted in transit, and we regularly review our security practices.
            </p>
          </section>

          <section className="bg-white dark:bg-slate-800/80 rounded-xl border border-gray-100 dark:border-slate-700/60 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Contact Us
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              If you have questions about this Privacy Policy, please contact us at{' '}
              <span className="text-indigo-600 dark:text-indigo-400">support@primetask.com</span>.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
