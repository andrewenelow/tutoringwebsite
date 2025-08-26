import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="relative">
          <h1 className="text-9xl font-extrabold text-brand-500 dark:text-brand-400 font-display">
            404
          </h1>
          <div className="absolute -top-4 -right-4 -z-10 w-32 h-32 bg-brand-100 dark:bg-brand-900/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-8 -left-4 -z-10 w-32 h-32 bg-blue-100 dark:bg-blue-900/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -top-8 -left-4 -z-10 w-32 h-32 bg-purple-100 dark:bg-purple-900/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="mt-8">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Page not found
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="mt-8">
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-colors duration-200"
            >
              <svg className="-ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Go back home
            </Link>
          </div>
          <div className="mt-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Or try these pages:
            </p>
            <div className="mt-2 flex justify-center space-x-4">
              <Link to="/marketplace" className="text-sm font-medium text-brand-600 hover:text-brand-500 dark:text-brand-400 dark:hover:text-brand-300">
                Find Tutors
              </Link>
              <span className="text-gray-300 dark:text-gray-600">•</span>
              <Link to="/about" className="text-sm font-medium text-brand-600 hover:text-brand-500 dark:text-brand-400 dark:hover:text-brand-300">
                About Us
              </Link>
              <span className="text-gray-300 dark:text-gray-600">•</span>
              <Link to="/contact-us" className="text-sm font-medium text-brand-600 hover:text-brand-500 dark:text-brand-400 dark:hover:text-brand-300">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Animation keyframes */}
      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default NotFoundPage;
