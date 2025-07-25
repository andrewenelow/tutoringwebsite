import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TutorDataContext } from '../context/TutorDataContext';
import UniversitySelect from '../components/UniversitySelect';
import CourseSelect from '../components/CourseSelect';

// Hero Icons
const AcademicCapIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path d="M12 14l9-5-9-5-9 5 9 5z" />
    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.01a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.01a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
  </svg>
);

const BookOpenIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const UserGroupIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const features = [
  {
    name: 'Expert Tutors',
    description: 'Learn from top students who have excelled in their courses and are trained to teach effectively.',
    icon: UserGroupIcon,
  },
  {
    name: 'Course-Specific Help',
    description: 'Get personalized assistance tailored to your specific course requirements and learning style.',
    icon: BookOpenIcon,
  },
  {
    name: 'Flexible Scheduling',
    description: 'Book sessions at times that work for you, with options for in-person or online tutoring.',
    icon: AcademicCapIcon,
  },
];

function HomePage() {
  const navigate = useNavigate();
  const { selectedUniversity, setSelectedUniversity, selectedCourse, setSelectedCourse } = useContext(TutorDataContext);
  const [universities, setUniversities] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [isLoading, setIsLoading] = useState({ universities: false, courses: false });

  // Fetch Universities
  useEffect(() => {
    const fetchUniversities = async () => {
      setIsLoading(prev => ({ ...prev, universities: true }));
      try {
        const response = await fetch('https://mvokoi9esi.execute-api.us-east-1.amazonaws.com/dev/schoolselect');
        if (!response.ok) throw new Error('Failed to fetch universities');
        const data = await response.json();
        setUniversities(data);
      } catch (error) {
        console.error('Error fetching universities:', error);
        // TODO: Add error state UI
      } finally {
        setIsLoading(prev => ({ ...prev, universities: false }));
      }
    };

    fetchUniversities();
  }, []);

  // Fetch All Courses
  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(prev => ({ ...prev, courses: true }));
      try {
        const response = await fetch('https://bfoctt4eva.execute-api.us-east-1.amazonaws.com/dev/courseSelector');
        if (!response.ok) throw new Error('Failed to fetch courses');
        const data = await response.json();
        setAllCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
        // TODO: Add error state UI
      } finally {
        setIsLoading(prev => ({ ...prev, courses: false }));
      }
    };

    fetchCourses();
  }, []);

  const handleFindTutors = (e) => {
    e.preventDefault();
    if (!selectedUniversity || !selectedCourse) {
      // TODO: Show error to user
      console.error('Please select both university and course');
      return;
    }
    navigate('/marketplace');
  };

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-brand-600 to-brand-800 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 pt-10 pb-16 sm:pt-12 sm:pb-20 md:pt-16 md:pb-24 lg:pt-20 lg:pb-28 xl:pt-24 xl:pb-32">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
              <div className="text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                  <span className="block">Find the perfect tutor</span>
                  <span className="block text-brand-200">for your courses</span>
                </h1>
                <p className="mt-3 text-base text-brand-100 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Connect with expert tutors who have aced the exact courses you're taking. Get personalized 1-on-1 help to boost your grades and understanding.
                </p>
                
                {/* Search Form */}
                <div className="mt-8 sm:max-w-lg sm:mx-auto lg:mx-0">
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                    <form onSubmit={handleFindTutors} className="space-y-4">
                      <div>
                        <label htmlFor="university" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Your University
                        </label>
                        {isLoading.universities ? (
                          <div className="w-full border border-gray-300 rounded-md p-2 bg-gray-100 text-gray-500">
                            Loading universities...
                          </div>
                        ) : (
                          <UniversitySelect
                            universities={universities}
                            selectedUniversity={selectedUniversity}
                            onSelect={setSelectedUniversity}
                          />
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="course" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Course
                        </label>
                        {isLoading.courses ? (
                          <div className="w-full border border-gray-300 rounded-md p-2 bg-gray-100 text-gray-500">
                            Loading courses...
                          </div>
                        ) : (
                          <CourseSelect
                            courses={allCourses}
                            selectedCourse={selectedCourse}
                            onSelect={setSelectedCourse}
                          />
                        )}
                      </div>
                      
                      <button
                        type="submit"
                        disabled={!selectedUniversity || !selectedCourse || isLoading.courses || isLoading.universities}
                        className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 ${
                          (!selectedUniversity || !selectedCourse) ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        {isLoading.courses || isLoading.universities ? (
                          'Loading...'
                        ) : (
                          'Find Tutors'
                        )}
                      </button>
                    </form>
                    
                    <p className="mt-3 text-center text-sm text-gray-600 dark:text-gray-400">
                      Already have an account?{' '}
                      <Link to="/login" className="font-medium text-brand-600 hover:text-brand-500 dark:text-brand-400 dark:hover:text-brand-300">
                        Sign in
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 lg:mt-0">
                <img
                  className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full rounded-lg shadow-xl"
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1951&q=80"
                  alt="Students studying together"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-brand-600 font-semibold tracking-wide uppercase">Why Choose Us</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              A better way to learn
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 lg:mx-auto">
              Our platform connects you with top tutors who can help you succeed in your courses.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
              {features.map((feature) => (
                <div key={feature.name} className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-brand-500 text-white">
                      <feature.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">{feature.name}</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-300">{feature.description}</dd>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-brand-700">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Ready to improve your grades?</span>
            <span className="block text-brand-200">Find your perfect tutor today.</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-brand-100">
            Join thousands of students who are already getting better grades with our tutors.
          </p>
          <Link
            to="/register"
            className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-brand-600 bg-white hover:bg-gray-50 sm:w-auto"
          >
            Get started for free
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
