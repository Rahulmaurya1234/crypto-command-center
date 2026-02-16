export interface Service {
  id: string;
  name: string;
  price: number;
  duration: string;
}

export interface Parlour {
  id: string;
  name: string;
  address: string;
  city: string;
  rating: number;
  reviewCount: number;
  image: string;
  services: Service[];
  phone: string;
  openHours: string;
  tags: string[];
}

export const PARLOURS: Parlour[] = [
  {
    id: "1",
    name: "Glow & Grace Salon",
    address: "MG Road, Camp Area",
    city: "Pune",
    rating: 4.6,
    reviewCount: 124,
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80",
    phone: "+91 98765 43210",
    openHours: "10:00 AM – 8:00 PM",
    tags: ["Bridal", "Hair", "Skin"],
    services: [
      { id: "s1", name: "Haircut & Styling", price: 500, duration: "45 min" },
      { id: "s2", name: "Facial (Gold)", price: 1200, duration: "60 min" },
      { id: "s3", name: "Bridal Makeup", price: 8000, duration: "120 min" },
      { id: "s4", name: "Manicure & Pedicure", price: 800, duration: "60 min" },
    ],
  },
  {
    id: "2",
    name: "Blush Beauty Studio",
    address: "Koregaon Park, Lane 5",
    city: "Pune",
    rating: 4.8,
    reviewCount: 89,
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80",
    phone: "+91 91234 56789",
    openHours: "9:30 AM – 7:30 PM",
    tags: ["Skin", "Nails", "Waxing"],
    services: [
      { id: "s5", name: "Cleanup & Facial", price: 900, duration: "50 min" },
      { id: "s6", name: "Full Body Waxing", price: 1500, duration: "75 min" },
      { id: "s7", name: "Nail Art", price: 600, duration: "40 min" },
      { id: "s8", name: "Hair Spa", price: 1100, duration: "60 min" },
    ],
  },
  {
    id: "3",
    name: "Radiance Hair & Beauty",
    address: "FC Road, Shivajinagar",
    city: "Pune",
    rating: 4.3,
    reviewCount: 210,
    image: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=600&q=80",
    phone: "+91 87654 32109",
    openHours: "10:00 AM – 9:00 PM",
    tags: ["Hair", "Makeup", "Spa"],
    services: [
      { id: "s9", name: "Hair Color", price: 2500, duration: "90 min" },
      { id: "s10", name: "Keratin Treatment", price: 5000, duration: "150 min" },
      { id: "s11", name: "Party Makeup", price: 3500, duration: "90 min" },
      { id: "s12", name: "Head Massage", price: 400, duration: "30 min" },
    ],
  },
  {
    id: "4",
    name: "Aura Beauty Lounge",
    address: "Baner Road, Near Highway",
    city: "Pune",
    rating: 4.5,
    reviewCount: 67,
    image: "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=600&q=80",
    phone: "+91 99887 76655",
    openHours: "11:00 AM – 8:30 PM",
    tags: ["Bridal", "Skin", "Hair"],
    services: [
      { id: "s13", name: "Threading & Bleach", price: 350, duration: "30 min" },
      { id: "s14", name: "De-Tan Facial", price: 1000, duration: "50 min" },
      { id: "s15", name: "Engagement Makeup", price: 6000, duration: "120 min" },
      { id: "s16", name: "Hair Straightening", price: 3500, duration: "120 min" },
    ],
  },
];
