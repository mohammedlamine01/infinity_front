// Test script to create sample events
// Run this in your browser console or create a test page

const API_URL = 'http://localhost:8000/api';

// Sample events data
const sampleEvents = [
  {
    name: "AI & Machine Learning Workshop",
    type: "workshop",
    date: "2025-11-01",
    location: "Computer Lab A",
    time: "2:00 PM",
    description: "Hands-on workshop covering the fundamentals of AI and machine learning. Learn to build your first neural network!",
    id_dep: 1,
    image: ""
  },
  {
    name: "Cybersecurity Seminar 2025",
    type: "seminar",
    date: "2025-11-05",
    location: "Main Auditorium",
    time: "10:00 AM",
    description: "Industry experts discuss the latest trends in cybersecurity and how to protect your digital assets.",
    id_dep: 1,
    image: ""
  },
  {
    name: "Web Development Conference",
    type: "conference",
    date: "2025-11-10",
    location: "Conference Hall B",
    time: "9:00 AM",
    description: "Full-day conference featuring the latest in web technologies including React, Next.js, and modern frameworks.",
    id_dep: 1,
    image: ""
  },
  {
    name: "Hackathon 2025",
    type: "competition",
    date: "2025-11-15",
    location: "Innovation Space",
    time: "8:00 AM",
    description: "24-hour coding competition. Form teams, solve challenges, and win amazing prizes!",
    id_dep: 1,
    image: ""
  },
  {
    name: "Mobile App Development Workshop",
    type: "workshop",
    date: "2025-11-20",
    location: "Tech Lab 3",
    time: "3:00 PM",
    description: "Learn to build cross-platform mobile apps using React Native. From zero to app store!",
    id_dep: 1,
    image: ""
  },
  {
    name: "Data Science Bootcamp",
    type: "seminar",
    date: "2025-11-25",
    location: "Room 301",
    time: "1:00 PM",
    description: "Comprehensive introduction to data science, including Python, pandas, and data visualization.",
    id_dep: 1,
    image: ""
  }
];

// Function to create events
async function createSampleEvents(token) {
  console.log('🚀 Starting to create sample events...\n');
  
  for (let i = 0; i < sampleEvents.length; i++) {
    const event = sampleEvents[i];
    console.log(`Creating event ${i + 1}/${sampleEvents.length}: ${event.name}`);
    
    try {
      const response = await fetch(`${API_URL}/auth/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(event)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        console.log(`✅ Created: ${event.name}`);
      } else {
        console.log(`❌ Failed: ${event.name}`, data);
      }
    } catch (error) {
      console.log(`❌ Error creating ${event.name}:`, error);
    }
    
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log('\n✨ Finished creating sample events!');
}

// Function to fetch and display all events
async function getAllEvents() {
  console.log('📋 Fetching all events...\n');
  
  try {
    const response = await fetch(`${API_URL}/events`);
    const data = await response.json();
    
    console.log(`Found ${data.length} events:`);
    data.forEach((event, index) => {
      console.log(`\n${index + 1}. ${event.name}`);
      console.log(`   Type: ${event.type}`);
      console.log(`   Date: ${event.date}`);
      console.log(`   Location: ${event.location}`);
    });
  } catch (error) {
    console.log('❌ Error fetching events:', error);
  }
}

// Instructions
console.log(`
🎉 Event Creation Test Script
==============================

USAGE:
------

1. Get your auth token:
   - Login to the dashboard
   - Open browser console (F12)
   - Type: localStorage.getItem('token')
   - Copy the token

2. Create sample events:
   createSampleEvents('YOUR_TOKEN_HERE')

3. View all events:
   getAllEvents()

4. Or create a single event:
   fetch('${API_URL}/auth/events', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       'Authorization': 'Bearer YOUR_TOKEN'
     },
     body: JSON.stringify({
       name: "Test Event",
       type: "seminar",
       date: "2025-12-01",
       location: "Test Location",
       description: "Test description",
       id_dep: 1,
       image: ""
     })
   })

Example:
--------
createSampleEvents('eyJ0eXAiOiJKV1QiLCJhbGc...')

`);

// Export functions
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { createSampleEvents, getAllEvents, sampleEvents };
}
