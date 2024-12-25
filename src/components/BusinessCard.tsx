import { Card } from "@/components/ui/card";
import Side1Basic from "./card-sides/Side1Basic";
import Side2Links from "./card-sides/Side2Links";
import Side3Professional from "./card-sides/Side3Professional";
import Side4Experience from "./card-sides/Side4Experience";
import Side5Education from "./card-sides/Side5Education";

interface BusinessCardProps {
  profilePic: string;
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  tagline: string;
  linkedin: string;
  twitter: string;
  whatsapp: string;
  telegram: string;
  tiktok: string;
  specialties: string[];
  skills: string[];
  services: string[];
  ctaButtons: Array<{ text: string; link: string; color: string; enabled: boolean }>;
  otherLinks: Array<{ title: string; url: string }>;
  experiences: Array<{
    jobTitle: string;
    organization: string;
    startDate: string;
    endDate: string;
    currentlyWorking: boolean;
    responsibilities: string;
  }>;
  education: Array<{
    degree: string;
    institution: string;
    startDate: string;
    graduationDate: string;
    achievements: string;
  }>;
  displaySections: {
    specialties: boolean;
    skills: boolean;
    services: boolean;
  };
  currentSide: number;
  enabledSides: number[];
}

export default function BusinessCard({
  currentSide = 0,
  enabledSides = [0, 1, 2, 3, 4],
  ...props
}: BusinessCardProps) {
  const sides = [
    () => <Side1Basic {...props} />,
    () => <Side2Links {...props} />,
    () => <Side3Professional {...props} />,
    () => <Side4Experience experiences={props.experiences} />,
    () => <Side5Education education={props.education} />,
  ];

  const currentSideIndex = enabledSides.indexOf(currentSide);
  const CurrentSideComponent = sides[currentSide];

  return (
    <Card className="glass-card w-full min-h-[300px] p-8 flex flex-col justify-between transform transition-all hover:scale-105">
      {CurrentSideComponent && <CurrentSideComponent />}
    </Card>
  );
}