import { Event } from '../types/event';

export const events: Event[] = [
  {
    id: '1',
    title: "Eucharistic Revival Conference",
    date: new Date('2024-04-15'),
    time: "9:00 AM - 5:00 PM",
    location: "St. Patrick's Cathedral",
    parish: "Cathedral Parish",
    imageUrl: "https://images.unsplash.com/photo-1548544149-4835e62ee5b3?ixlib=rb-4.0.3",
    category: "Conference",
    description: "Join us for a transformative day of prayer, worship, and inspiring talks focused on deepening our understanding and devotion to the Holy Eucharist.",
    price: 25,
    organizer: {
      name: "Fr. Michael Thomas",
      role: "Conference Director",
      imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3"
    },
    schedule: [
      { time: "9:00 AM", activity: "Registration & Welcome" },
      { time: "9:30 AM", activity: "Opening Mass" },
      { time: "11:00 AM", activity: "Keynote: The Real Presence" },
      { time: "12:30 PM", activity: "Lunch Break" },
      { time: "2:00 PM", activity: "Workshops" },
      { time: "3:30 PM", activity: "Eucharistic Adoration" },
      { time: "4:30 PM", activity: "Closing Ceremony" }
    ]
  },
  {
    id: '2',
    title: "Young Adult Retreat",
    date: new Date('2024-04-20'),
    time: "8:00 AM - 8:00 PM",
    location: "Sacred Heart Monastery",
    parish: "Sacred Heart Parish",
    imageUrl: "https://images.unsplash.com/photo-1543349689-9a4d426bee8e?ixlib=rb-4.0.3",
    category: "Retreat",
    description: "A day of reflection, fellowship, and spiritual growth designed specifically for young adults (ages 18-35).",
    price: 20,
    organizer: {
      name: "Sr. Maria Grace",
      role: "Youth Ministry Director",
      imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3"
    },
    schedule: [
      { time: "8:00 AM", activity: "Arrival & Morning Prayer" },
      { time: "9:00 AM", activity: "Introduction & Ice Breakers" },
      { time: "10:30 AM", activity: "Guided Meditation" },
      { time: "12:00 PM", activity: "Lunch & Fellowship" },
      { time: "2:00 PM", activity: "Small Group Discussions" },
      { time: "4:00 PM", activity: "Personal Reflection Time" },
      { time: "5:30 PM", activity: "Mass" },
      { time: "7:00 PM", activity: "Closing Dinner" }
    ]
  },
  {
    id: '3',
    title: "Parish Mission Week",
    date: new Date('2024-05-01'),
    time: "7:00 PM - 9:00 PM",
    location: "St. Mary's Church",
    parish: "St. Mary's Parish",
    imageUrl: "https://images.unsplash.com/photo-1545987796-200677ee1011?ixlib=rb-4.0.3",
    category: "Parish Events",
    description: "A week-long series of evening talks and prayer services focused on spiritual renewal.",
    price: 0,
    organizer: {
      name: "Fr. James Wilson",
      role: "Parish Pastor",
      imageUrl: "https://images.unsplash.com/photo-1556157382-97eda2f9e2bf?ixlib=rb-4.0.3"
    },
    schedule: [
      { time: "7:00 PM", activity: "Opening Prayer" },
      { time: "7:15 PM", activity: "Praise & Worship" },
      { time: "7:45 PM", activity: "Evening Talk" },
      { time: "8:30 PM", activity: "Confession Available" },
      { time: "9:00 PM", activity: "Closing Prayer" }
    ]
  }
];