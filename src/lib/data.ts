import type { Guide, Glossary } from './types';

export const registrationGuide: Guide = {
  title: "Residence Registration Step-by-Step",
  slug: "move/registration",
  excerpt: "How, where, and what to bring with you. Including fees and deadlines.",
  updatedAt: "2024-08-23",
  readingTime: 8,
  tldr: [
    "Book an appointment online at the foreign police or municipal office.",
    "Bring your passport, proof of accommodation, and fee stamps ({glossary:kolky}).",
    "Pay the {currency:200:CZK} fee and receive your confirmation.",
    "Report any changes within 3 working days."
  ],
  requirements: [
    "Passport or National ID card",
    "Proof of accommodation (original document)",
    "Application form (filled out)",
    "{currency:200:CZK} administrative fee (usually as stamps)"
  ],
  links: [
    { label: "Ministry of the Interior – Registration", url: "#" },
    { label: "Online Appointment Booking System", url: "#" }
  ],
  steps: [
    {
      title: "Book Your Appointment",
      details: "Use the official online portal to book a time slot. Appointments fill up fast, so book several weeks in advance. You will receive a confirmation email with your appointment details."
    },
    {
      title: "Prepare Your Documents",
      details: "Gather all required documents: your passport, the original signed proof of accommodation (lease agreement or confirmation from the property owner), and a completed application form. Ensure your passport is valid for your intended stay."
    },
    {
      title: "Visit the Office",
      details: "Arrive at the designated office at least 15 minutes before your appointment. You will submit your documents, pay the administrative fee, and answer any questions. The official will then issue a confirmation of your registration."
    }
  ],
  faq: [
    {
      question: "Does the property owner have to sign the confirmation?",
      answer: "Yes, the proof of accommodation must be signed by the official owner of the property or an authorized representative with a power of attorney."
    },
    {
      question: "What if I can't get an appointment in time?",
      answer: "By law, you must register within 3 working days of arrival if you're a third-country national planning to stay longer than 30 days. If you cannot get an appointment, it's advised to visit the office and explain the situation to avoid potential fines. EU citizens have 30 days."
    },
    {
      question: "Can I pay the fee with a card?",
      answer: "It depends on the office. Many smaller offices only accept fee stamps ('{glossary:kolky}'), which can be purchased at any post office. It's safer to have the stamps ready beforehand."
    }
  ],
  callout: {
    type: 'info',
    text: 'Appointment slots are released periodically. Check the booking system early in the morning for the best chance of securing a spot.'
  }
};


export const glossary: Glossary = {
  'kolky': {
    term: 'Kolky',
    definition: 'Fee stamps used in the Czech Republic for administrative payments. They can be purchased at any post office in various denominations. Think of them as a pre-paid receipt for official fees.'
  }
}
