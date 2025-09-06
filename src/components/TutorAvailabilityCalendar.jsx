import React, { useState } from 'react';

// Map Teachworks day numbers to weekday names
const dayMap = {
  '0': 'Sunday',
  '1': 'Monday',
  '2': 'Tuesday',
  '3': 'Wednesday',
  '4': 'Thursday',
  '5': 'Friday',
  '6': 'Saturday',
};

function formatTime(timeStr) {
  // Converts "17:00:00" to "5:00 PM"
  const [hour, minute] = timeStr.split(":");
  const h = parseInt(hour, 10);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${minute} ${ampm}`;
}

export default function TutorAvailabilityCalendar({ availability, onBook }) {
  const [selected, setSelected] = useState(null);

  return (
    <div className="w-full max-w-xl mx-auto">
      <h3 className="text-lg font-semibold mb-4">Available Times</h3>
      <div className="space-y-3">
        {availability && availability.length > 0 ? (
          availability.map(slot => (
            <div
              key={slot.id}
              className={`flex items-center justify-between p-4 rounded border ${selected === slot.id ? 'border-brand-primary bg-brand-50' : 'border-gray-200 bg-white'}`}
            >
              <div>
                <span className="font-medium">{dayMap[slot.day]}</span>
                <span className="ml-2 text-gray-700">{formatTime(slot.start_time)} - {formatTime(slot.end_time)}</span>
              </div>
              <a
                href="https://tutormycollege.teachworks.com/b/XAAzYArr6ayieVoX2Ujg6Q"
                target="_blank"
                rel="noopener noreferrer"
                className={`px-4 py-2 rounded ${selected === slot.id ? 'bg-brand-primary text-white' : 'bg-gray-200 text-gray-700 hover:bg-brand-100'}`}
                onClick={() => setSelected(slot.id)}
              >
                {selected === slot.id ? 'Selected' : 'Book'}
              </a>
            </div>
          ))
        ) : (
          <div className="text-gray-500">No availability posted.</div>
        )}
      </div>
    </div>
  );
}
