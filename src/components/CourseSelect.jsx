import React from 'react'

const CourseSelect = ({ courses, selectedCourse, onSelect }) => {
  return (
    <select
      className="w-full border border-gray-300 rounded-md p-2 
                 focus:outline-none focus:ring-2 focus:ring-purple-500 
                 bg-white text-gray-700"
      value={selectedCourse || ''}
      onChange={(e) => {
        console.log("[CourseSelect] user picked:", e.target.value)
        onSelect(e.target.value)
      }}
    >
      <option value="">Select a Course</option>
      {courses.map((courseObj, idx) => (
        <option key={courseObj.course_id || idx} value={courseObj.name || courseObj.course_name}>
          {courseObj.course_code ? `${courseObj.course_code}: ` : ''}{courseObj.name || courseObj.course_name}
        </option>
      ))}
    </select>
  )
}

export default CourseSelect
