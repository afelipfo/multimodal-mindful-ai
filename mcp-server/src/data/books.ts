/**
 * Books database categorized by mood
 * Shared data source for MCP server resources
 */

import { BookRecommendation } from '../types.js';

export const booksDatabase: Record<string, BookRecommendation[]> = {
  happy: [
    {
      title: 'The Happiness Project',
      author: 'Gretchen Rubin',
      description: 'A year-long journey to discover what leads to true contentment',
      genre: 'Self-help',
      amazonLink: 'https://www.amazon.com/dp/0062414852',
      goodreadsLink: 'https://www.goodreads.com/book/show/6398634-the-happiness-project',
    },
    {
      title: 'The Book of Joy',
      author: 'Dalai Lama & Desmond Tutu',
      description: 'Lasting happiness in a changing world',
      genre: 'Spirituality',
      amazonLink: 'https://www.amazon.com/dp/0399185046',
      goodreadsLink: 'https://www.goodreads.com/book/show/29496453-the-book-of-joy',
    },
  ],
  sad: [
    {
      title: 'The Midnight Library',
      author: 'Matt Haig',
      description: 'A novel about infinite possibilities and second chances',
      genre: 'Fiction',
      amazonLink: 'https://www.amazon.com/dp/0525559477',
      goodreadsLink: 'https://www.goodreads.com/book/show/52578297-the-midnight-library',
    },
    {
      title: 'When Breath Becomes Air',
      author: 'Paul Kalanithi',
      description: 'A memoir about facing mortality and finding meaning',
      genre: 'Memoir',
      amazonLink: 'https://www.amazon.com/dp/081298840X',
      goodreadsLink: 'https://www.goodreads.com/book/show/25899336-when-breath-becomes-air',
    },
  ],
  angry: [
    {
      title: 'The Cow in the Parking Lot',
      author: 'Susan Edmiston & Leonard Scheff',
      description: 'A Zen approach to overcoming anger',
      genre: 'Self-help',
      amazonLink: 'https://www.amazon.com/dp/0761158154',
      goodreadsLink: 'https://www.goodreads.com/book/show/707684.The_Cow_in_the_Parking_Lot',
    },
    {
      title: 'Anger: Wisdom for Cooling the Flames',
      author: 'Thich Nhat Hanh',
      description: 'Buddhist techniques for transforming anger',
      genre: 'Spirituality',
      amazonLink: 'https://www.amazon.com/dp/1573229377',
      goodreadsLink: 'https://www.goodreads.com/book/show/95734.Anger',
    },
  ],
  anxious: [
    {
      title: 'The Anxiety and Worry Workbook',
      author: 'David A. Clark & Aaron T. Beck',
      description: 'Cognitive-behavioral techniques for managing anxiety',
      genre: 'Self-help',
      amazonLink: 'https://www.amazon.com/dp/1462533841',
      goodreadsLink: 'https://www.goodreads.com/book/show/25330878-the-anxiety-and-worry-workbook',
    },
    {
      title: 'Dare: The New Way to End Anxiety',
      author: 'Barry McDonagh',
      description: 'A breakthrough approach to overcoming anxiety',
      genre: 'Self-help',
      amazonLink: 'https://www.amazon.com/dp/0956596258',
      goodreadsLink: 'https://www.goodreads.com/book/show/23342833-dare',
    },
  ],
  calm: [
    {
      title: 'The Power of Now',
      author: 'Eckhart Tolle',
      description: 'A guide to spiritual enlightenment through present-moment awareness',
      genre: 'Spirituality',
      amazonLink: 'https://www.amazon.com/dp/1577314808',
      goodreadsLink: 'https://www.goodreads.com/book/show/6708.The_Power_of_Now',
    },
    {
      title: 'Wherever You Go, There You Are',
      author: 'Jon Kabat-Zinn',
      description: 'Mindfulness meditation in everyday life',
      genre: 'Spirituality',
      amazonLink: 'https://www.amazon.com/dp/1401307787',
      goodreadsLink: 'https://www.goodreads.com/book/show/14096.Wherever_You_Go_There_You_Are',
    },
  ],
  excited: [
    {
      title: 'Big Magic',
      author: 'Elizabeth Gilbert',
      description: 'Creative living beyond fear',
      genre: 'Self-help',
      amazonLink: 'https://www.amazon.com/dp/1594634726',
      goodreadsLink: 'https://www.goodreads.com/book/show/24453082-big-magic',
    },
    {
      title: 'The War of Art',
      author: 'Steven Pressfield',
      description: 'Break through blocks and win your inner creative battles',
      genre: 'Self-help',
      amazonLink: 'https://www.amazon.com/dp/1936891026',
      goodreadsLink: 'https://www.goodreads.com/book/show/1319.The_War_of_Art',
    },
  ],
};
