/**
 * Places database categorized by mood
 * Shared data source for MCP server resources
 */

import { PlaceRecommendation } from '../types.js';

export const placesDatabase: Record<string, PlaceRecommendation[]> = {
  happy: [
    {
      name: 'Amusement Park',
      location: 'Various locations worldwide',
      description: 'Fun-filled destinations with rides and entertainment',
      type: 'Entertainment',
      activities: ['Roller coasters', 'Shows', 'Games', 'Food experiences'],
      bestTimeToVisit: 'Spring and summer',
    },
    {
      name: 'Music Festival',
      location: 'Various locations',
      description: 'Live music events celebrating various genres',
      type: 'Cultural event',
      activities: ['Live performances', 'Dancing', 'Social gatherings', 'Food vendors'],
      bestTimeToVisit: 'Check seasonal schedules',
    },
  ],
  sad: [
    {
      name: 'Art Gallery',
      location: 'Major cities worldwide',
      description: 'Quiet spaces for contemplation and artistic inspiration',
      type: 'Cultural venue',
      activities: ['Art viewing', 'Meditation', 'Journaling', 'Quiet reflection'],
      bestTimeToVisit: 'Weekday mornings',
    },
    {
      name: 'Botanical Garden',
      location: 'Various cities',
      description: 'Peaceful natural settings for healing and reflection',
      type: 'Nature reserve',
      activities: ['Walking', 'Photography', 'Meditation', 'Nature observation'],
      bestTimeToVisit: 'Year-round',
    },
  ],
  angry: [
    {
      name: 'Gym or Fitness Center',
      location: 'Local facilities',
      description: 'Physical activity spaces for releasing tension',
      type: 'Sports facility',
      activities: ['Weightlifting', 'Boxing', 'Running', 'High-intensity workouts'],
      bestTimeToVisit: 'Anytime',
    },
    {
      name: 'Hiking Trail',
      location: 'National and state parks',
      description: 'Natural environments for physical exertion and mental clarity',
      type: 'Outdoor recreation',
      activities: ['Hiking', 'Trail running', 'Rock climbing', 'Nature immersion'],
      bestTimeToVisit: 'Spring and fall',
    },
  ],
  anxious: [
    {
      name: 'Spa and Wellness Center',
      location: 'Various locations',
      description: 'Spaces designed for relaxation and self-care',
      type: 'Wellness center',
      activities: ['Massages', 'Sauna', 'Jacuzzi', 'Relaxation treatments'],
      bestTimeToVisit: 'Year-round',
    },
    {
      name: 'Meditation Center',
      location: 'Urban and suburban areas',
      description: 'Quiet spaces dedicated to mindfulness and stress relief',
      type: 'Spiritual center',
      activities: ['Guided meditation', 'Breathing exercises', 'Yoga', 'Mindfulness workshops'],
      bestTimeToVisit: 'Year-round',
    },
  ],
  calm: [
    {
      name: 'Library',
      location: 'Cities and towns',
      description: 'Peaceful environments for reading and quiet contemplation',
      type: 'Public facility',
      activities: ['Reading', 'Research', 'Studying', 'Quiet time'],
      bestTimeToVisit: 'Year-round',
    },
    {
      name: 'Lakeside or Beach',
      location: 'Coastal and lakeside areas',
      description: 'Serene water settings for relaxation',
      type: 'Natural environment',
      activities: ['Walking', 'Meditation', 'Bird watching', 'Gentle swimming'],
      bestTimeToVisit: 'Summer and early fall',
    },
  ],
  excited: [
    {
      name: 'Adventure Park',
      location: 'Various locations',
      description: 'High-energy destinations for thrill-seekers',
      type: 'Recreation facility',
      activities: ['Zip-lining', 'Rock climbing', 'Obstacle courses', 'Extreme sports'],
      bestTimeToVisit: 'Spring through fall',
    },
    {
      name: 'Concert Venue',
      location: 'Major cities',
      description: 'Live performance spaces for energetic experiences',
      type: 'Entertainment venue',
      activities: ['Live music', 'Dancing', 'Social interaction', 'Cultural events'],
      bestTimeToVisit: 'Check event schedules',
    },
  ],
};
