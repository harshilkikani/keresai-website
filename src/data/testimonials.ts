// Real customer testimonials. LEAVE EMPTY until you have genuine quotes —
// the testimonial section and Review/AggregateRating schema only render when
// this array has entries. Never add fabricated reviews: Google de-indexes fake
// review markup and it erodes trust.
//
// To publish testimonials, add entries like:
//   {
//     quote: 'Keres booked 14 after-hours jobs in our first month.',
//     author: 'Jane Doe',
//     role: 'Owner',
//     company: 'Acme HVAC',
//     rating: 5, // optional — include only if a genuine star rating was given
//   }
export interface Testimonial {
  quote: string;
  author: string;
  role?: string;
  company: string;
  rating?: number; // 1–5, optional
}

export const testimonials: Testimonial[] = [];
