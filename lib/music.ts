export interface Song {
  title: string;
  artist: string;
  youtube_link: string;
}

export const musicDatabase: Record<string, Song[]> = {
  happy: [
    { title: "Happy", artist: "Pharrell Williams", youtube_link: "https://www.youtube.com/watch?v=ZbZSe6N_BXs" },
    { title: "Can't Stop the Feeling!", artist: "Justin Timberlake", youtube_link: "https://www.youtube.com/watch?v=ru0K8ouAZ-E" },
    { title: "Uptown Funk", artist: "Mark Ronson ft. Bruno Mars", youtube_link: "https://www.youtube.com/watch?v=OPf0YbXqDm0" },
    { title: "Shake It Off", artist: "Taylor Swift", youtube_link: "https://www.youtube.com/watch?v=nfWlot6h_JM" },
    { title: "Walking on Sunshine", artist: "Katrina and the Waves", youtube_link: "https://www.youtube.com/watch?v=iPUmE-tne5U" },
  ],
  sad: [
    { title: "Someone Like You", artist: "Adele", youtube_link: "https://www.youtube.com/watch?v=hLQl3WQQoQ0" },
    { title: "Hurt", artist: "Nine Inch Nails", youtube_link: "https://www.youtube.com/watch?v=8qaIl6RPwGk" },
    { title: "Tears in Heaven", artist: "Eric Clapton", youtube_link: "https://www.youtube.com/watch?v=JxPj3GAYYZ0" },
    { title: "Yesterday", artist: "The Beatles", youtube_link: "https://www.youtube.com/watch?v=NrgmdOz227I" },
    { title: "Nothing Compares 2 U", artist: "Sinéad O'Connor", youtube_link: "https://www.youtube.com/watch?v=0-EF60negXU" },
  ],
  angry: [
    { title: "Break Stuff", artist: "Limp Bizkit", youtube_link: "https://www.youtube.com/watch?v=gPgdM0cSGPM" },
    { title: "Killing in the Name", artist: "Rage Against the Machine", youtube_link: "https://www.youtube.com/watch?v=bWXazVhlyxQ" },
    { title: "Smells Like Teen Spirit", artist: "Nirvana", youtube_link: "https://www.youtube.com/watch?v=hTWKbfoikeg" },
    { title: "American Idiot", artist: "Green Day", youtube_link: "https://www.youtube.com/watch?v=Ee_uujKuJM0" },
    { title: "Bulls on Parade", artist: "Rage Against the Machine", youtube_link: "https://www.youtube.com/watch?v=3L4YrGaR8E4" },
  ],
  anxious: [
    { title: "Breathe Me", artist: "Sia", youtube_link: "https://www.youtube.com/watch?v=3L9YJC5Uw5U" },
    { title: "Weightless", artist: "Marconi Union", youtube_link: "https://www.youtube.com/watch?v=UfcAVejs1Ac" },
    { title: "River", artist: "Joni Mitchell", youtube_link: "https://www.youtube.com/watch?v=4j7UmwfxVXc" },
    { title: "Hurt", artist: "Johnny Cash", youtube_link: "https://www.youtube.com/watch?v=vt1Pwfnh5pc" },
    { title: "The Night We Met", artist: "Lord Huron", youtube_link: "https://www.youtube.com/watch?v=KtlgYxa6BMU" },
  ],
  calm: [
    { title: "Weightless", artist: "Marconi Union", youtube_link: "https://www.youtube.com/watch?v=UfcAVejs1Ac" },
    { title: "The Journey", artist: "The Piano Guys", youtube_link: "https://www.youtube.com/watch?v=8tBJVy8Bm6I" },
    { title: "Experience", artist: "Ludovico Einaudi", youtube_link: "https://www.youtube.com/watch?v=5W8T5jF5VzU" },
    { title: "I Giorni", artist: "Ludovico Einaudi", youtube_link: "https://www.youtube.com/watch?v=4j7UmwfxVXc" },
    { title: "Nuvole Bianche", artist: "Ludovico Einaudi", youtube_link: "https://www.youtube.com/watch?v=6pIu0L1e9z8" },
  ],
  excited: [
    { title: "Uptown Funk", artist: "Mark Ronson ft. Bruno Mars", youtube_link: "https://www.youtube.com/watch?v=OPf0YbXqDm0" },
    { title: "Can't Stop the Feeling!", artist: "Justin Timberlake", youtube_link: "https://www.youtube.com/watch?v=ru0K8ouAZ-E" },
    { title: "Happy", artist: "Pharrell Williams", youtube_link: "https://www.youtube.com/watch?v=ZbZSe6N_BXs" },
    { title: "Shake It Off", artist: "Taylor Swift", youtube_link: "https://www.youtube.com/watch?v=nfWlot6h_JM" },
    { title: "Walking on Sunshine", artist: "Katrina and the Waves", youtube_link: "https://www.youtube.com/watch?v=iPUmE-tne5U" },
  ],
};