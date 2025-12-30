
import React from 'react';
import { HardHat, PaintBucket, Flower, Briefcase } from 'lucide-react';
import { ServiceItem, ContactInfo } from './types';

export const COLORS = {
  primary: '#0F172A', // Dark Blue
  accent: '#EAB308',  // Gold/Yellow
  light: '#F8FAFC',
};

// Logo mis à jour avec le lien fourni
export const LOGO_PATH = 'https://i.ibb.co/84PXpCjY/Chat-GPT-Image-1-nov-2025-14-35-22-1.png'; 

export const CONTACT_DATA: ContactInfo = {
  whatsapp: '0708264720',
  telSecondary: '0618149460',
  email: 'ste.goldgen@gmail.com',
  address: 'N° 4 IMM 3 LOTISS LAMYAA, Safi',
  rc: '13763 (Safi)'
};

export const PROJECTS = [
  {
    id: 1,
    title: 'Résidence Lamy-Safi',
    category: 'civil',
    location: 'Safi',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 2,
    title: 'Showroom Automobile',
    category: 'amenagement',
    location: 'Casablanca',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 3,
    title: 'Parc Industriel OCP',
    category: 'maintenance',
    location: 'Jorf Lasfar',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800'
  }
];

export const TESTIMONIALS = [
  {
    name: 'Youssef El Alami',
    role: 'Chef de Projet',
    content: 'GOLDGEN a su répondre à nos exigences techniques avec une rapidité impressionnante. Leur équipe est très professionnelle.',
    avatar: 'https://i.pravatar.cc/150?u=youssef'
  },
  {
    name: 'Sarah Benani',
    role: 'Architecte d’intérieur',
    content: 'Une finition irréprochable. C’est rare de trouver des entreprises aussi rigoureuses sur les détails au Maroc.',
    avatar: 'https://i.pravatar.cc/150?u=sarah'
  }
];

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
