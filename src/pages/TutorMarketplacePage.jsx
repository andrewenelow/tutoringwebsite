import React, { useContext, useEffect, useState } from 'react';
import { TutorDataContext } from '../context/TutorDataContext.jsx';
import { useNavigate, Link } from 'react-router-dom';

// Star rating component
const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating || 0);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <svg key={`full-${i}`} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      {hasHalfStar && (
        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="half-star" x1="0" x2="100%" y1="0" y2="0">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="#E5E7EB" />
            </linearGradient>
          </defs>
          <path fill="url(#half-star)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <svg key={`empty-${i}`} className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="ml-2 text-sm text-gray-600">
        {rating ? rating.toFixed(1) : 'No ratings'}
      </span>
    </div>
  );
};

function TutorMarketplacePage() {
  const { selectedUniversity, selectedCourse } = useContext(TutorDataContext);
  const [tutorList, setTutorList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const baseUrl = 'https://j3cw863bsl.execute-api.us-east-1.amazonaws.com/dev/tutorfilterresource';
        const queryParams = new URLSearchParams();

        if (selectedUniversity?.id) {
          queryParams.append('school_id', selectedUniversity.id);
        }

        if (selectedCourse) {
          queryParams.append('classes_available_to_teach', selectedCourse);
        }

        const apiUrl = `${baseUrl}?${queryParams.toString()}`;
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch tutors. Status: ${response.status}`);
        }
        
        const data = await response.json();
        setTutorList(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('[Fetch Tutors] error:', err);
        setError('Failed to load tutors. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTutors();
  }, [selectedUniversity, selectedCourse]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-600 mx-auto"></div>
            <p className="mt-4 text-lg text-gray-600">Loading tutors...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Find Your Tutor</h1>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-gray-600">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                  {selectedUniversity?.name || 'All Universities'}
                </span>
                {selectedCourse && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-green-100 text-green-800">
                    {selectedCourse}
                  </span>
                )}
                <button 
                  onClick={() => navigate('/')}
                  className="text-sm text-brand-600 hover:text-brand-800 transition-colors"
                >
                  Change selection
                </button>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 sm:text-sm"
                  placeholder="Search tutors..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="mb-8 bg-white p-4 rounded-lg shadow-sm">
          <div className="flex flex-wrap gap-4">
            <div className="w-full sm:w-auto">
              <label htmlFor="sort-by" className="block text-sm font-medium text-gray-700 mb-1">Sort by</label>
              <select
                id="sort-by"
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-brand-500 focus:border-brand-500 sm:text-sm rounded-md"
              >
                <option>Highest Rated</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Most Reviews</option>
              </select>
            </div>
            <div className="w-full sm:w-auto">
              <label htmlFor="price-range" className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
              <select
                id="price-range"
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-brand-500 focus:border-brand-500 sm:text-sm rounded-md"
              >
                <option>Any Price</option>
                <option>Under $20/hr</option>
                <option>$20 - $40/hr</option>
                <option>Over $40/hr</option>
              </select>
            </div>
            <div className="w-full sm:w-auto">
              <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
              <select
                id="availability"
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-brand-500 focus:border-brand-500 sm:text-sm rounded-md"
              >
                <option>Any Time</option>
                <option>Morning (8am-12pm)</option>
                <option>Afternoon (12pm-5pm)</option>
                <option>Evening (5pm-10pm)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tutor List */}
        {tutorList.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No tutors found</h3>
            <p className="mt-1 text-sm text-gray-500">
              We couldn't find any tutors matching your criteria. Try adjusting your search or filters.
            </p>
            <div className="mt-6">
              <Link
                to="/"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
              >
                Back to Home
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tutorList.map((tutor) => (
              <div key={tutor.tutor_id} className="bg-white overflow-hidden shadow rounded-lg flex flex-col h-full">
                <div className="p-6 flex-1">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="h-16 w-16 rounded-full object-cover"
                        src={tutor.profile_picture || "https://ui-avatars.com/api/?name=" + encodeURIComponent(tutor.name || 'T') + "&background=4f46e5&color=fff"}
                        alt={tutor.name}
                      />
                    </div>
                    <div className="ml-4">
                      <Link to={`/tutor/${tutor.tutor_id}`} className="text-lg font-medium text-brand-primary hover:underline">
  {tutor.name}
</Link>
                      <div className="flex items-center mt-1">
                        <StarRating rating={tutor.average_rating} />
                        <span className="ml-2 text-sm text-gray-500">
                          ({tutor.review_count || 0} reviews)
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-600">
                        {tutor.year_in_school ? `${tutor.year_in_school} Student` : 'Tutor'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {tutor.personal_bio || 'No bio provided.'}
                    </p>
                  </div>
                  
                  {tutor.classes_available_to_teach?.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Teaches</h4>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {tutor.classes_available_to_teach.slice(0, 3).map((course, index) => (
                          <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {course}
                          </span>
                        ))}
                        {tutor.classes_available_to_teach.length > 3 && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            +{tutor.classes_available_to_teach.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">${tutor.rate_per_hour || 'N/A'}</span>
                      <span className="text-sm text-gray-500">/hr</span>
                    </div>
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
                      onClick={() => alert(`Scheduling with ${tutor.name} coming soon...`)}
                    >
                      Book Session
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default TutorMarketplacePage;




