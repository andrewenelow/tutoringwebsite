import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TutorAvailabilityCalendar from '../components/TutorAvailabilityCalendar';

// API endpoint base
const API_BASE = 'https://j3cw863bsl.execute-api.us-east-1.amazonaws.com/dev/tutorfilterresource';

const TutorProfilePage = () => {
  // Inject Teachworks booking button script on mount
  useEffect(() => {
    // Prevent duplicate script injection
    if (!document.getElementById('teachworks-booking-script')) {
      const script = document.createElement('script');
      script.id = 'teachworks-booking-script';
      script.type = 'text/javascript';
      script.src = 'https://tutormycollege.teachworks.com/booking_button.js?token=XAaYArr6ayieVoX2Ujg6Q';
      document.body.appendChild(script);
    }
  }, []);

  const { tutorId } = useParams();
  const navigate = useNavigate();
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Teachworks: Replace with your actual booking widget URL or per-tutor link if available
  const teachworksBookingUrl = 'https://tutormycollege.teachworks.com/b/XAAzYArr6ayieVoX2Ujg6Q'; // Real booking page URL

  // Live availability fetched from API
  const [availability, setAvailability] = useState([]);

  // Handle booking a slot
  const handleBookSlot = (slot) => {
    // For now, just alert. Replace with booking logic or modal.
    alert(`You selected: ${slot.day} ${slot.start_time} - ${slot.end_time}`);
  };

  useEffect(() => {
    const fetchTutorAndAvailability = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch tutor
        const res = await fetch(`${API_BASE}?tutor_id=${tutorId}`);
        if (!res.ok) throw new Error('Failed to fetch tutor data.');
        const data = await res.json();
        const found = Array.isArray(data)
          ? data.find(t => String(t.tutor_id) === String(tutorId))
          : null;
        if (!found) throw new Error('Tutor not found.');
        setTutor(found);

        // Debug: log teachworks_id
        console.log('teachworks_id:', found.teachworks_id);

        // Fetch availabilities directly for this tutor using employee_id param
        if (found.teachworks_id) {
          const availRes = await fetch(`https://mx6ezzobak.execute-api.us-east-1.amazonaws.com/dev/availabilities?employee_id=${found.teachworks_id}`);
          if (!availRes.ok) throw new Error('Failed to fetch availabilities.');
          const availData = await availRes.json();
          // Debug: log API response
          console.log('Availabilities API response:', availData);
          setAvailability(Array.isArray(availData) ? availData : []);
        } else {
          setAvailability([]);
        }

        // Debug: log final availability state after fetch
        setTimeout(() => {
          console.log('Final availability state:', availability);
        }, 1000);
      } catch (err) {
        setError(err.message || 'Error loading tutor or availability.');
      } finally {
        setLoading(false);
      }
    };
    fetchTutorAndAvailability();
  }, [tutorId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading tutor profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
              <button className="mt-2 text-brand-primary underline" onClick={() => navigate('/marketplace')}>Back to Marketplace</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Profile picture logic: use profile_picture if valid, else S3 URL from name, else avatar fallback
  const profileImg = tutor.profile_picture && tutor.profile_picture.startsWith('http')
    ? tutor.profile_picture
    : tutor.name
      ? `https://tmc-tutor-profile-pictures-test.s3.us-east-1.amazonaws.com/${tutor.name.replace(/\s+/g, '_')}.jpg`
      : `https://ui-avatars.com/api/?name=${encodeURIComponent(tutor.name || 'T')}&background=4f46e5&color=fff`;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <main className="flex-1 flex flex-col items-center p-8 w-full">
        <div className="w-full max-w-4xl bg-white rounded-xl shadow p-8 flex flex-col md:flex-row gap-8">
          {/* Profile Image */}
          <div className="flex-shrink-0 flex flex-col items-center">
            <img src={profileImg} alt={tutor.name} className="w-40 h-40 rounded-full object-cover border-4 border-brand-primary" />
          </div>
          {/* Profile Details */}
          <div className="flex-1">
            <h1 className="text-4xl font-extrabold mb-2 text-brand-primary">{tutor.name}</h1>
            <div className="text-gray-600 mb-2">
              {tutor.year_in_school ? `${tutor.year_in_school} Student` : 'Tutor'}
              {tutor.major && (
                <> &middot; {Array.isArray(tutor.major) ? tutor.major.join(', ') : tutor.major}</>
              )}
            </div>
            <div className="flex gap-8 mb-4">
              <div>
                <div className="text-xl font-semibold">${tutor.rate_per_hour || '--'}</div>
                <div className="text-xs text-gray-500">Rate/hr</div>
              </div>
              <div>
                <div className="text-xl font-semibold">{tutor.tutor_attendance_rate ? `${tutor.tutor_attendance_rate}%` : '--'}</div>
                <div className="text-xs text-gray-500">Attendance rate</div>
              </div>
              <div>
                <div className="text-xl font-semibold">{tutor.average_rating ? tutor.average_rating.toFixed(1) : '--'}</div>
                <div className="text-xs text-gray-500">Avg. Rating</div>
              </div>
            </div> 
            <div className="flex gap-4 mb-6">
              <a href="https://tutormycollege.teachworks.com/b/XAAzYArr6ayieVoX2Ujg6Q" target="_blank" rel="noopener noreferrer" className="bg-brand-primary text-white px-4 py-2 rounded hover:bg-purple-600 inline-flex items-center justify-center">
                Book a session
              </a>
            </div>
            {/* Tabs */}
            <div className="border-b flex gap-8 mb-4">
              <button className="pb-2 border-b-2 border-black font-medium">Overview</button>
              <button className="pb-2 text-gray-500">Reviews</button>
            </div>

            {/* About */}
            <div className="mb-4">
              <h2 className="font-semibold mb-1">About me</h2>
              <p className="text-gray-700 text-sm">{tutor.personal_bio || 'No bio provided.'}</p>
            </div>
            {/* Preferred Locations */}
            {Array.isArray(tutor.tutors_preferred_locations) && tutor.tutors_preferred_locations.length > 0 && (
              <div className="mb-4">
                <span className="font-semibold">Preferred Locations:</span>
                {tutor.tutors_preferred_locations.map((loc, idx) => (
                  <span key={idx} className="ml-2 text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">{loc}</span>
                ))}
              </div>
            )}

            {/* Tutor Availability Calendar */}
            <div className="my-6">
              <TutorAvailabilityCalendar availability={availability} onBook={handleBookSlot} />
            </div>

            {/* Teachworks Booking Widget */}
            <div className="my-6">
              <h2 className="font-semibold mb-2 text-lg">Schedule a Session</h2>
              {/* Inline Teachworks Booking Button */}
              <div id="teachworks-booking-button"></div>
              {/* Fallback: direct booking page link */}
              <div className="mt-4">
                <a href={teachworksBookingUrl} target="_blank" rel="noopener noreferrer" className="text-brand-primary underline">
                  Go to full booking page
                </a>
              </div>
            </div>

          </div>
        </div>
      </main>
      <footer className="bg-white text-center py-4 mt-8">
        <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} TutorMyCollege. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default TutorProfilePage;
