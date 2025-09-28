export interface Book {
  title: string;
  author: string;
  description: string;
  genre: string;
  amazonLink?: string;
  goodreadsLink?: string;
}

export const booksDatabase: Record<string, Book[]> = {
  happy: [
    {
      title: "The Happiness Project",
      author: "Gretchen Rubin",
      description: "A personal exploration of how to find happiness in everyday life",
      genre: "Self-help",
      amazonLink: "https://www.amazon.com/dp/0061583251",
      goodreadsLink: "https://www.goodreads.com/book/show/6398634-the-happiness-project"
    },
    {
      title: "The Alchemist",
      author: "Paulo Coelho",
      description: "An inspiring fable about following your dreams and finding your purpose",
      genre: "Philosophical fiction",
      amazonLink: "https://www.amazon.com/dp/0062315005",
      goodreadsLink: "https://www.goodreads.com/book/show/865.The_Alchemist"
    },
    {
      title: "Big Magic",
      author: "Elizabeth Gilbert",
      description: "About living creatively beyond fear",
      genre: "Creativity",
      amazonLink: "https://www.amazon.com/dp/1594634726",
      goodreadsLink: "https://www.goodreads.com/book/show/24453082-big-magic"
    },
    {
      title: "The Book of Joy",
      author: "Dalai Lama & Desmond Tutu",
      description: "Conversations about finding joy in difficult times",
      genre: "Spirituality",
      amazonLink: "https://www.amazon.com/dp/0399185046",
      goodreadsLink: "https://www.goodreads.com/book/show/29496453-the-book-of-joy"
    },
    {
      title: "Eat, Pray, Love",
      author: "Elizabeth Gilbert",
      description: "A journey of self-discovery through Italy, India and Indonesia",
      genre: "Memoir",
      amazonLink: "https://www.amazon.com/dp/0143038419",
      goodreadsLink: "https://www.goodreads.com/book/show/19501.Eat_Pray_Love"
    }
  ],
  sad: [
    {
      title: "The Gifts of Imperfection",
      author: "Brené Brown",
      description: "About embracing vulnerability and cultivating self-compassion",
      genre: "Self-help",
      amazonLink: "https://www.amazon.com/dp/159285849X",
      goodreadsLink: "https://www.goodreads.com/book/show/7015403-the-gifts-of-imperfection"
    },
    {
      title: "Option B",
      author: "Sheryl Sandberg & Adam Grant",
      description: "About facing adversity, building resilience and finding joy",
      genre: "Self-help",
      amazonLink: "https://www.amazon.com/dp/1524732680",
      goodreadsLink: "https://www.goodreads.com/book/show/32938155-option-b"
    },
    {
      title: "The Light We Lost",
      author: "Jill Santopolo",
      description: "A moving story about love and life decisions",
      genre: "Romantic fiction",
      amazonLink: "https://www.amazon.com/dp/0735212740",
      goodreadsLink: "https://www.goodreads.com/book/show/30753738-the-light-we-lost"
    },
    {
      title: "When Breath Becomes Air",
      author: "Paul Kalanithi",
      description: "Deep reflections on life, death and meaning",
      genre: "Memoir",
      amazonLink: "https://www.amazon.com/dp/081298840X",
      goodreadsLink: "https://www.goodreads.com/book/show/25899336-when-breath-becomes-air"
    },
    {
      title: "The Midnight Library",
      author: "Matt Haig",
      description: "A philosophical exploration of life's possibilities",
      genre: "Philosophical fiction",
      amazonLink: "https://www.amazon.com/dp/0525559477",
      goodreadsLink: "https://www.goodreads.com/book/show/52578297-the-midnight-library"
    }
  ],
  angry: [
    {
      title: "Anger: Wisdom for Cooling the Flames",
      author: "Thich Nhat Hanh",
      description: "Buddhist techniques for transforming anger into understanding",
      genre: "Spirituality",
      amazonLink: "https://www.amazon.com/dp/1573229377",
      goodreadsLink: "https://www.goodreads.com/book/show/95747.Anger"
    },
    {
      title: "The Dance of Anger",
      author: "Harriet Lerner",
      description: "A guide for women on how to use anger constructively",
      genre: "Psychology",
      amazonLink: "https://www.amazon.com/dp/0062319043",
      goodreadsLink: "https://www.goodreads.com/book/show/9454.The_Dance_of_Anger"
    },
    {
      title: "Rage Becomes Her",
      author: "Soraya Chemaly",
      description: "The power of women's anger and how it can change the world",
      genre: "Feminism",
      amazonLink: "https://www.amazon.com/dp/1501189565",
      goodreadsLink: "https://www.goodreads.com/book/show/38357122-rage-becomes-her"
    },
    {
      title: "The Righteous Mind",
      author: "Jonathan Haidt",
      description: "Why good people are divided by politics and religion",
      genre: "Social psychology",
      amazonLink: "https://www.amazon.com/dp/0307455777",
      goodreadsLink: "https://www.goodreads.com/book/show/11324722-the-righteous-mind"
    },
    {
      title: "Emotional Freedom Technique",
      author: "Nick Ortner",
      description: "Emotional freedom techniques for healing trauma and stress",
      genre: "Self-help",
      amazonLink: "https://www.amazon.com/dp/1401939422",
      goodreadsLink: "https://www.goodreads.com/book/show/15803800-the-tapping-solution"
    }
  ],
  anxious: [
    {
      title: "The Anxiety and Worry Workbook",
      author: "David A. Clark & Aaron T. Beck",
      description: "Cognitive-behavioral techniques for managing anxiety",
      genre: "Self-help",
      amazonLink: "https://www.amazon.com/dp/1462533841",
      goodreadsLink: "https://www.goodreads.com/book/show/25330878-the-anxiety-and-worry-workbook"
    },
    {
      title: "Dare: The New Way to End Anxiety",
      author: "Barry McDonagh",
      description: "A revolutionary approach to overcoming anxiety and panic attacks",
      genre: "Self-help",
      amazonLink: "https://www.amazon.com/dp/0956596258",
      goodreadsLink: "https://www.goodreads.com/book/show/23398809-dare"
    },
    {
      title: "The Mindful Way Through Anxiety",
      author: "Susan M. Orsillo & Lizabeth Roemer",
      description: "Breaking free from chronic patterns of worry and fear",
      genre: "Mindfulness",
      amazonLink: "https://www.amazon.com/dp/1606234641",
      goodreadsLink: "https://www.goodreads.com/book/show/6411270-the-mindful-way-through-anxiety"
    },
    {
      title: "Maybe You Should Talk to Someone",
      author: "Lori Gottlieb",
      description: "A therapist in therapy: perspectives on mental healing",
      genre: "Memoir",
      amazonLink: "https://www.amazon.com/dp/1328662055",
      goodreadsLink: "https://www.goodreads.com/book/show/37570546-maybe-you-should-talk-to-someone"
    },
    {
      title: "The Power of Now",
      author: "Eckhart Tolle",
      description: "A guide to spiritual enlightenment and living in the present",
      genre: "Spirituality",
      amazonLink: "https://www.amazon.com/dp/1577314808",
      goodreadsLink: "https://www.goodreads.com/book/show/6708.The_Power_of_Now"
    }
  ],
  calm: [
    {
      title: "The Art of Stillness",
      author: "Pico Iyer",
      description: "Adventures in going nowhere: the power of staying still",
      genre: "Philosophy",
      amazonLink: "https://www.amazon.com/dp/1476784728",
      goodreadsLink: "https://www.goodreads.com/book/show/22573506-the-art-of-stillness"
    },
    {
      title: "Wherever You Go, There You Are",
      author: "Jon Kabat-Zinn",
      description: "Mindfulness meditation in everyday life",
      genre: "Mindfulness",
      amazonLink: "https://www.amazon.com/dp/0786881070",
      goodreadsLink: "https://www.goodreads.com/book/show/14096.Wherever_You_Go_There_You_Are"
    },
    {
      title: "The Miracle of Mindfulness",
      author: "Thich Nhat Hanh",
      description: "An introduction to the practice of meditation",
      genre: "Spirituality",
      amazonLink: "https://www.amazon.com/dp/0807012394",
      goodreadsLink: "https://www.goodreads.com/book/show/95747.The_Miracle_of_Mindfulness"
    },
    {
      title: "Atomic Habits",
      author: "James Clear",
      description: "An easy and proven way to build good habits",
      genre: "Productivity",
      amazonLink: "https://www.amazon.com/dp/0735211299",
      goodreadsLink: "https://www.goodreads.com/book/show/40121378-atomic-habits"
    },
    {
      title: "The Untethered Soul",
      author: "Michael A. Singer",
      description: "The journey beyond yourself to inner freedom",
      genre: "Spirituality",
      amazonLink: "https://www.amazon.com/dp/1572245379",
      goodreadsLink: "https://www.goodreads.com/book/show/1963638.The_Untethered_Soul"
    }
  ],
  excited: [
    {
      title: "Big Magic",
      author: "Elizabeth Gilbert",
      description: "Living creatively beyond fear",
      genre: "Creativity",
      amazonLink: "https://www.amazon.com/dp/1594634726",
      goodreadsLink: "https://www.goodreads.com/book/show/24453082-big-magic"
    },
    {
      title: "The 4-Hour Workweek",
      author: "Timothy Ferriss",
      description: "Escape the 9-5, live anywhere and join the new rich",
      genre: "Entrepreneurship",
      amazonLink: "https://www.amazon.com/dp/0307465357",
      goodreadsLink: "https://www.goodreads.com/book/show/368593.The_4_Hour_Workweek"
    },
    {
      title: "Yes Please",
      author: "Amy Poehler",
      description: "Funny and honest memoirs from the comedian",
      genre: "Memoir",
      amazonLink: "https://www.amazon.com/dp/0062268341",
      goodreadsLink: "https://www.goodreads.com/book/show/20910157-yes-please"
    },
    {
      title: "The Lean Startup",
      author: "Eric Ries",
      description: "How today's entrepreneurs use continuous innovation",
      genre: "Business",
      amazonLink: "https://www.amazon.com/dp/0307887898",
      goodreadsLink: "https://www.goodreads.com/book/show/10127019-the-lean-startup"
    },
    {
      title: "Wild",
      author: "Cheryl Strayed",
      description: "From lost to found on the Pacific Coast Trail",
      genre: "Memoir",
      amazonLink: "https://www.amazon.com/dp/0307476073",
      goodreadsLink: "https://www.goodreads.com/book/show/12262741-wild"
    }
  ]
};
