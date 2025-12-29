
import React from 'react';
import { HardHat, PaintBucket, Flower, Briefcase } from 'lucide-react';
import { ServiceItem, ContactInfo } from './types';

export const COLORS = {
  primary: '#0F172A', // Dark Blue
  accent: '#EAB308',  // Gold/Yellow
  light: '#F8FAFC',
};

// Lien direct vers le logo PNG
export const LOGO_PATH = 'https://i.ibb.co/qL15kCPJ/logo-goldgen.png'; 

export const CONTACT_DATA: ContactInfo = {
  whatsapp: '0708264720',
  telSecondary: '0618149460',
  email: 'ste.goldgen@gmail.com',
  address: 'N° 4 IMM 3 LOTISS LAMYAA, Safi',
  rc: '13763 (Safi)'
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'genie-civil',
    title: 'Génie Civil & Construction',
    description: 'De la conception à la livraison, nous gérons tous les aspects du gros et second œuvre avec précision.',
    icon: <HardHat className="w-8 h-8" />,
    details: [
      'Gros Œuvre : Fondations, béton armé, structure',
      'Second Œuvre : Maçonnerie, plomberie, électricité, étanchéité'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'amenagement',
    title: 'Aménagement & Décoration',
    description: 'Création d\'espaces fonctionnels, esthétiques et conformes à vos exigences architecturales.',
    icon: <PaintBucket className="w-8 h-8" />,
    details: [
      'Intérieur : Menuiserie, Faux plafonds, Peinture, Décoration',
      'Extérieur : VRD, Revêtement extérieur'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'nettoyage',
    title: 'Nettoyage & Jardinage',
    description: 'Entretien professionnel de vos espaces verts et de vos locaux pour un environnement sain.',
    icon: <Flower className="w-8 h-8" />,
    details: [
      'Nettoyage : Entretien de locaux, Bureaux, Résidences',
      'Espaces Verts : Aménagement paysager et tonte régulière'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'fourniture',
    title: 'Fourniture de Bureau',
    description: 'Solutions complètes pour aménager et équiper vos espaces de travail professionnels.',
    icon: <Briefcase className="w-8 h-8" />,
    details: [
      'Mobilier : Bureaux ergonomiques, Sièges, Armoires',
      'Informatique : Matériel réseau et bureautique de pointe'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800'
  }
];
