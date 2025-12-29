import React from 'react';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  // Added React import to resolve 'React' namespace for ReactNode
  icon: React.ReactNode;
  details: string[];
  imageUrl: string;
}

export interface ContactInfo {
  whatsapp: string;
  telSecondary: string;
  email: string;
  address: string;
  rc: string;
}