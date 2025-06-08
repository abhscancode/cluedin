import type { Event } from '@/types/event';

// Helper function to get date strings relative to today
const getDateString = (daysOffset: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + daysOffset);
  return date.toISOString();
};

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'India Signs Strategic Treaty with UAE',
    description: 'A landmark agreement to enhance trade, security, and cultural exchange between India and UAE. This comprehensive treaty is expected to boost bilateral cooperation significantly across multiple sectors including technology, renewable energy, and defense partnerships.',
    date: getDateString(25),
    category: 'Governance',
    source: 'Ministry of External Affairs',
  },
  {
    id: '2',
    title: 'Team India Tour of Australia 2025',
    description: 'India\'s national cricket team will embark on a crucial tour of Australia starting next month. The tour includes 5 Test matches, 3 ODIs, and 4 T20Is across major Australian cities, promising intense competition and high-stakes cricket.',
    date: getDateString(35),
    category: 'Sports',
    source: 'BCCI',
  },
  {
    id: '3',
    title: 'Ambassador Liu Wei to Visit India',
    description: 'Chinese diplomat Liu Wei scheduled to visit India for high-level discussions on bilateral trade, border management, and cultural ties. The visit aims to strengthen diplomatic relations and resolve ongoing trade disputes between the two nations.',
    date: getDateString(15),
    category: 'Diplomacy',
    source: 'External Affairs Ministry',
  },
  {
    id: '4',
    title: 'International Film Festival Mumbai',
    description: 'Mumbai\'s prestigious film festival returns with a week-long celebration showcasing 200+ films from 50 countries. The event features new releases, retrospectives, masterclasses, and panel discussions with renowned global filmmakers and stars.',
    date: getDateString(10),
    category: 'Culture',
    source: 'Mumbai Film Society',
  },
  {
    id: '5',
    title: 'Global Climate Summit 2025',
    description: 'World leaders, environmental activists, and climate scientists will gather to set ambitious new targets for climate change mitigation. Focus areas include renewable energy transition, carbon neutrality goals, and innovative sustainability solutions.',
    date: getDateString(40),
    category: 'Environment',
    source: 'UN Climate Council',
  },
  {
    id: '6',
    title: 'AI & Robotics Expo 2025',
    description: 'Explore cutting-edge breakthroughs in artificial intelligence, robotics, and automation at the year\'s largest technology exposition. The event features live demonstrations, hands-on workshops, startup showcases, and keynote speeches from industry pioneers.',
    date: getDateString(20),
    category: 'Technology',
    source: 'TechWorld',
  },
  {
    id: '7',
    title: 'India-Japan Economic Partnership Meeting',
    description: 'Strategic economic dialogue between India and Japan focusing on enhancing bilateral investment, technology transfer, infrastructure development, and supply chain collaboration. The meeting aims to strengthen the Act East policy framework.',
    date: getDateString(30),
    category: 'Governance',
    source: 'Commerce Ministry',
  },
  {
    id: '8',
    title: 'Youth Digital Literacy Program Launch',
    description: 'National initiative to boost digital skills among youth aged 16-25 across rural and urban areas. The program includes free workshops, online certification courses, and digital entrepreneurship training in partnership with leading tech companies.',
    date: getDateString(5),
    category: 'Society',
    source: 'Ministry of Education',
  },
  {
    id: '9',
    title: 'Nobel Prize Announcements 2025',
    description: 'The Nobel Committee prepares to announce this year\'s laureates across six categories including Peace, Literature, Physics, Chemistry, Medicine, and Economic Sciences. Global attention focuses on potential breakthrough discoveries and humanitarian contributions.',
    date: getDateString(27),
    category: 'World Affairs',
    source: 'Nobel Committee',
  },
  {
    id: '10',
    title: 'Mumbai International Fashion Week',
    description: 'India\'s premier fashion event showcasing upcoming trends from 100+ designers. The week-long extravaganza features runway shows, designer exhibitions, sustainable fashion initiatives, and networking events with fashion industry leaders.',
    date: getDateString(18),
    category: 'Culture',
    source: 'Fashion Council of India',
  },
  {
    id: '11',
    title: 'G20 Finance Ministers Meeting',
    description: 'Finance ministers from G20 nations convene to discuss global economic recovery, digital currency regulations, and sustainable finance frameworks. Key topics include inflation control, trade policy reforms, and economic cooperation strategies.',
    date: getDateString(45),
    category: 'World Affairs',
    source: 'G20 Secretariat',
  },
  {
    id: '12',
    title: 'India Space Research Organization Mars Mission',
    description: 'ISRO announces the launch timeline for its ambitious Mars exploration mission, featuring advanced rover technology and atmospheric studies. This mission positions India as a major player in interplanetary space exploration.',
    date: getDateString(60),
    category: 'Technology',
    source: 'ISRO',
  },
  {
    id: '13',
    title: 'Commonwealth Games 2026 Preparation Summit',
    description: 'Indian Olympic Association hosts planning summit for Commonwealth Games 2026 participation strategy. The event covers athlete selection, training programs, infrastructure development, and medal target discussions.',
    date: getDateString(12),
    category: 'Sports',
    source: 'Indian Olympic Association',
  },
  {
    id: '14',
    title: 'National Education Policy Implementation Review',
    description: 'Comprehensive review of NEP 2020 implementation across Indian states, focusing on digital learning integration, vocational training programs, and multilingual education initiatives. Key stakeholders include educators, policymakers, and student representatives.',
    date: getDateString(8),
    category: 'Society',
    source: 'Ministry of Education',
  },
  {
    id: '15',
    title: 'International Yoga Day Global Celebration',
    description: 'Global celebration of International Yoga Day with simultaneous events across 190+ countries. The theme focuses on yoga for mental health and wellness, featuring master classes, wellness workshops, and cultural performances.',
    date: getDateString(22),
    category: 'Culture',
    source: 'Ministry of AYUSH',
  }
];