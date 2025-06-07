import type { Event } from '@/types/event';

// Helper function to get date strings
const getDateString = (daysOffset: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + daysOffset);
  return date.toISOString();
};

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Global Economic Summit 2024',
    description: 'Leaders from around the world convene to discuss pressing economic challenges and future growth strategies. Key topics include sustainable development, digital transformation, and international trade policies. This summit aims to foster collaboration and innovative solutions for a resilient global economy.',
    date: getDateString(30), // Upcoming
    category: 'Governance',
    image: 'https://placehold.co/600x400.png',
    source: 'World Economic Forum',
  },
  {
    id: '2',
    title: 'International Film Festival "CineMagic"',
    description: 'A week-long celebration of cinema featuring premieres from acclaimed directors and emerging talents. Includes workshops, panel discussions, and red carpet events. CineMagic showcases a diverse range of genres, promoting artistic expression and cultural exchange through film.',
    date: getDateString(7), // Upcoming
    category: 'Entertainment',
    image: 'https://placehold.co/600x400.png',
    source: 'CineMagic Organization',
  },
  {
    id: '3',
    title: 'Tech Innovators Conference (TIC 2024)',
    description: 'The annual TIC brings together tech enthusiasts, developers, and entrepreneurs to explore the latest advancements in AI, blockchain, and IoT. Features keynote speeches, hands-on labs, and networking opportunities. Discover the future of technology and its impact on various industries.',
    date: getDateString(15), // Upcoming
    category: 'Public Interest', // Could also be Entertainment or Society
    image: 'https://placehold.co/600x400.png',
    source: 'TechCrunch',
  },
  {
    id: '4',
    title: 'Modern Art Exhibition: "FutureScapes"',
    description: 'An immersive art exhibition showcasing contemporary artists who explore themes of future societies and technological impact through various mediums. Interactive installations and thought-provoking pieces invite visitors to reflect on the evolving human experience.',
    date: getDateString(-5), // Past
    category: 'Culture',
    image: 'https://placehold.co/600x400.png',
    source: 'City Art Museum',
  },
  {
    id: '5',
    title: 'National Youth Climate Action Forum',
    description: 'Young activists and environmental experts gather to discuss strategies for climate change mitigation and adaptation. The forum aims to empower youth voices and drive policy change for a sustainable future. Workshops focus on community organizing and green initiatives.',
    date: getDateString(45), // Upcoming
    category: 'Society',
    image: 'https://placehold.co/600x400.png',
    source: 'Youth Climate Council',
  },
  {
    id: '6',
    title: 'Unity Music Festival',
    description: 'A three-day outdoor music festival featuring a diverse lineup of international and local artists across multiple genres. Celebrating music, community, and cultural diversity with food stalls, art installations, and interactive experiences.',
    date: getDateString(60), // Upcoming
    category: 'Entertainment',
    image: 'https://placehold.co/600x400.png',
    source: 'Unity Events Co.',
  },
  {
    id: '7',
    title: 'Urban Planning & Development Symposium',
    description: 'Experts in urban design, architecture, and public policy discuss sustainable urban development, smart city technologies, and community engagement. Case studies and innovative solutions for future cities will be presented.',
    date: getDateString(-10), // Past
    category: 'Governance',
    image: 'https://placehold.co/600x400.png',
    source: 'Institute for Urban Futures',
  },
  {
    id: '8',
    title: 'Heritage Conservation Workshop',
    description: 'A hands-on workshop focused on preserving cultural heritage sites and artifacts. Participants will learn about conservation techniques, historical research, and the importance of safeguarding cultural identity for future generations.',
    date: getDateString(20), // Upcoming
    category: 'Culture',
    image: 'https://placehold.co/600x400.png',
    source: 'National Trust',
  },
  {
    id: '9',
    title: 'Digital Literacy for All Initiative Launch',
    description: 'Launch event for a nationwide initiative aimed at improving digital literacy skills across all age groups. The program will offer free workshops, online resources, and community support to bridge the digital divide.',
    date: getDateString(2), // Upcoming soon
    category: 'Society',
    image: 'https://placehold.co/600x400.png',
    source: 'Ministry of Education & Technology',
  },
  {
    id: '10',
    title: 'Open Source Software Summit',
    description: 'A gathering of developers, contributors, and advocates for open source software. Discussions on the latest trends, challenges, and collaborative projects in the open source ecosystem. Promoting innovation and knowledge sharing.',
    date: getDateString(-2), // Just Past
    category: 'Public Interest',
    image: 'https://placehold.co/600x400.png',
    source: 'Open Source Foundation',
  }
];
