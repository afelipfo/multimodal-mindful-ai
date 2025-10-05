/**
 * Music database categorized by mood
 * Shared data source for MCP server resources
 */

import { MusicRecommendation } from '../types.js';

export const musicDatabase: Record<string, MusicRecommendation[]> = {
  happy: [
    { title: 'Happy', artist: 'Pharrell Williams', youtube_link: 'https://www.youtube.com/watch?v=ZbZSe6N_BXs' },
    { title: 'Don\'t Stop Me Now', artist: 'Queen', youtube_link: 'https://www.youtube.com/watch?v=HgzGwKwLmgM' },
    { title: 'Good Vibrations', artist: 'The Beach Boys', youtube_link: 'https://www.youtube.com/watch?v=Eab_beh07HU' },
    { title: 'Walking on Sunshine', artist: 'Katrina and the Waves', youtube_link: 'https://www.youtube.com/watch?v=iPUmE-tne5U' },
    { title: 'I Got You (I Feel Good)', artist: 'James Brown', youtube_link: 'https://www.youtube.com/watch?v=U5TqIdff_DQ' },
  ],
  sad: [
    { title: 'Someone Like You', artist: 'Adele', youtube_link: 'https://www.youtube.com/watch?v=hLQl3WQQoQ0' },
    { title: 'The Scientist', artist: 'Coldplay', youtube_link: 'https://www.youtube.com/watch?v=RB-RcX5DS5A' },
    { title: 'Mad World', artist: 'Gary Jules', youtube_link: 'https://www.youtube.com/watch?v=4N3N1MlvVc4' },
    { title: 'Hurt', artist: 'Johnny Cash', youtube_link: 'https://www.youtube.com/watch?v=8AHCfZTRGiI' },
    { title: 'Yesterday', artist: 'The Beatles', youtube_link: 'https://www.youtube.com/watch?v=wXTJBr9tt8Q' },
  ],
  angry: [
    { title: 'Break Stuff', artist: 'Limp Bizkit', youtube_link: 'https://www.youtube.com/watch?v=ZpUYjpKg9KY' },
    { title: 'Killing in the Name', artist: 'Rage Against the Machine', youtube_link: 'https://www.youtube.com/watch?v=bWXazVhlyxQ' },
    { title: 'In the End', artist: 'Linkin Park', youtube_link: 'https://www.youtube.com/watch?v=eVTXPUF4Oz4' },
    { title: 'Smells Like Teen Spirit', artist: 'Nirvana', youtube_link: 'https://www.youtube.com/watch?v=hTWKbfoikeg' },
    { title: 'Enter Sandman', artist: 'Metallica', youtube_link: 'https://www.youtube.com/watch?v=CD-E-LDc384' },
  ],
  anxious: [
    { title: 'Weightless', artist: 'Marconi Union', youtube_link: 'https://www.youtube.com/watch?v=UfcAVejs1Ac' },
    { title: 'Breathe Me', artist: 'Sia', youtube_link: 'https://www.youtube.com/watch?v=SFGvmrJ5rjM' },
    { title: 'Let It Be', artist: 'The Beatles', youtube_link: 'https://www.youtube.com/watch?v=QDYfEBY9NM4' },
    { title: 'Fix You', artist: 'Coldplay', youtube_link: 'https://www.youtube.com/watch?v=k4V3Mo61fJM' },
    { title: 'Three Little Birds', artist: 'Bob Marley', youtube_link: 'https://www.youtube.com/watch?v=zaGUr6wzyT8' },
  ],
  calm: [
    { title: 'Clair de Lune', artist: 'Claude Debussy', youtube_link: 'https://www.youtube.com/watch?v=CvFH_6DNRCY' },
    { title: 'River Flows in You', artist: 'Yiruma', youtube_link: 'https://www.youtube.com/watch?v=7maJOI3QMu0' },
    { title: 'Spiegel im Spiegel', artist: 'Arvo Pärt', youtube_link: 'https://www.youtube.com/watch?v=TJ6Mzvh3XCc' },
    { title: 'Gymnopédie No. 1', artist: 'Erik Satie', youtube_link: 'https://www.youtube.com/watch?v=S-Xm7s9eGxU' },
    { title: 'Avril 14th', artist: 'Aphex Twin', youtube_link: 'https://www.youtube.com/watch?v=MBFXJw7n-fU' },
  ],
  excited: [
    { title: 'Uptown Funk', artist: 'Mark Ronson ft. Bruno Mars', youtube_link: 'https://www.youtube.com/watch?v=OPf0YbXqDm0' },
    { title: 'Can\'t Stop the Feeling!', artist: 'Justin Timberlake', youtube_link: 'https://www.youtube.com/watch?v=ru0K8uYEZWw' },
    { title: 'Eye of the Tiger', artist: 'Survivor', youtube_link: 'https://www.youtube.com/watch?v=btPJPFnesV4' },
    { title: 'Pump It', artist: 'The Black Eyed Peas', youtube_link: 'https://www.youtube.com/watch?v=ZaI2IlHwmgQ' },
    { title: 'We Will Rock You', artist: 'Queen', youtube_link: 'https://www.youtube.com/watch?v=-tJYN-eG1zk' },
  ],
};

export const moodCategories = Object.keys(musicDatabase);
