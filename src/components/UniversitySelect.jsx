// src/components/UniversitySelect.jsx

import React from 'react'

const UniversitySelect = ({ universities, selectedUniversity, onSelect }) => {
  // If selectedUniversity is an object, we can store `selectedUniversity.id`
  // But for the <select> "value", we need a string. We'll store the JSON in the 'value'.

  // Build the <option> elements
  return (
    <select
      className="w-full border border-gray-300 rounded-md p-2 
                 focus:outline-none focus:ring-2 focus:ring-purple-500 
                 transition-colors bg-white text-gray-700"
      // If we have an object, we can do:
      value={selectedUniversity ? JSON.stringify(selectedUniversity) : ''}
      onChange={(e) => {
        console.log("[UniversitySelect] user picked:", e.target.value)
        if (e.target.value === '') {
          // The user selected the placeholder "-- Select a University --"
          onSelect(null)
        } else {
          // Parse the JSON string back into an object { id, name }
          const parsed = JSON.parse(e.target.value)
          onSelect(parsed)
        }
      }}
    >
      <option value="">
        Select a University
      </option>
      {universities.map((uniObj) => {
        // We'll create a small object { id, name }
        const optionValue = {
          id: String(uniObj.school_id), // or numeric if you'd like
          name: uniObj.name
        }
        return (
          <option 
            key={uniObj.school_id} 
            value={JSON.stringify(optionValue)}
          >
            {uniObj.name}
          </option>
        )
      })}
    </select>
  )
}

export default UniversitySelect







