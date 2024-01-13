import { User } from './types';

/**
 * To generate randomized UUID you can use:
 * @see https://www.uuidgenerator.net/version4
 */
export const AUTH_LIST: User[] = [
  {
    id: '2fb6bf20-dd2b-48cf-8ae4-c8c2192dc7d8',
    email: 'john.doe@email.com',
    password: 'Q!@wertyuiop123',
    name: 'John Doe',
  },
];

/**
 * List of inspirational quotes. Not verified at all, they were produced by ChatGPT.
 */
export const QUOTES = [
  {
    text: 'The best way to predict the future is to create it.',
    author: 'Peter Drucker',
  },
  {
    text: 'Success is not final, failure is not fatal: It is the courage to continue that counts.',
    author: 'Winston Churchill',
  },
  {
    text: 'The only way to do great work is to love what you do.',
    author: 'Steve Jobs',
  },
  {
    text: 'Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work.',
    author: 'Steve Jobs',
  },
  {
    text: 'The only place where success comes before work is in the dictionary.',
    author: 'Vidal Sassoon',
  },
  {
    text: 'Don’t watch the clock; do what it does. Keep going.',
    author: 'Sam Levenson',
  },
  {
    text: 'Success usually comes to those who are too busy to be looking for it',
    author: 'Henry David Thoreau',
  },
  {
    text: "Believe you can and you're halfway there.",
    author: 'Theodore Roosevelt',
  },
  {
    text: 'The expert in anything was once a beginner.',
    author: 'Theodore Roosevelt',
  },
  {
    text: 'The expert in anything was once a beginner.',
    author: 'Helen Hayes',
  },
  {
    text: 'The harder I work, the luckier I get."',
    author: 'Gary Player',
  },
] as const;

/**
 * Very secret key
 */
export const secretKey = 'ssshhhh-it-is-secret-key' as const;

