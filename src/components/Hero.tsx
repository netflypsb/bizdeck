import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { 
  Zap, Clock, Share2, Download, 
  UserCircle, Link, Award, Briefcase, 
  GraduationCap, Send
} from "lucide-react";
import Footer from "./layout/Footer";

export default function Hero() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <UserCircle className="w-8 h-8 text-blue-500" />,
      title: "Unique Digital Identity",
      description: "Craft a personalized, professional digital identity effortlessly"
    },
    {
      icon: <Clock className="w-8 h-8 text-purple-500" />,
      title: "5-Minutes to Create",
      description: "Your BizDeck is ready in just 5 minutes—simple and fast"
    },
    {
      icon: <Zap className="w-8 h-8 text-indigo-500" />,
      title: "100% Free",
      description: "Creating your BizDeck costs nothing—absolutely free to use"
    },
    {
      icon: <Share2 className="w-8 h-8 text-blue-600" />,
      title: "All-in-One Solution",
      description: "Combine your business card, portfolio, CV, and links in one place"
    }
  ];

  const steps = [
    {
      icon: <UserCircle className="w-6 h-6" />,
      title: "Fill Out Your Profile",
      description: "Add your name, profile picture, position, and contact details"
    },
    {
      icon: <Link className="w-6 h-6" />,
      title: "Add Links",
      description: "Include your website, social media, and messaging platforms"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Showcase Expertise",
      description: "Highlight your specialties, skills, products, or services"
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: "Detail Experience",
      description: "Add roles, accomplishments, or significant milestones"
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "List Education",
      description: "Include qualifications, certifications, or training"
    },
    {
      icon: <Send className="w-6 h-6" />,
      title: "Download & Share",
      description: "Export as PDF, image, vCard, or HTML and share anywhere"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white/5 backdrop-blur-lg border-b border-white/10">
        <a href="/" className="flex items-center space-x-2">
          <img 
            src="/lovable-uploads/258520d3-4417-4492-a9ce-2267e06d6c66.png" 
            alt="BizDeck" 
            className="w-12 h-12 object-contain" 
          />
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            BizDeck
          </span>
        </a>
      </header>

      {/* Hero Section */}
      <div className="flex-1">
        <div className="flex flex-col items-center justify-center px-4 py-16 animate-fade-up">
          <h1 className="text-4xl md:text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 mb-6 max-w-4xl">
            Create a Business Card, Portfolio, Link Aggregator, and CV in 5 Minutes
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 text-center max-w-2xl mb-8">
            Share Anywhere
          </p>
          <Button
            onClick={() => navigate("/editor")}
            className="bg-gradient-to-r from-blue-400 to-purple-600 text-white px-8 py-6 rounded-lg text-lg hover:opacity-90 transition-all mb-16"
          >
            Create Your BizDeck
          </Button>

          {/* What is BizDeck? */}
          <Card className="glass-card p-8 mb-16 max-w-3xl">
            <h2 className="text-2xl font-bold text-center mb-4 text-black">What is BizDeck?</h2>
            <p className="text-lg text-gray-600 text-center">
              BizDeck combines the best of digital business cards, professional portfolios, 
              link aggregators, and CVs into a sleek, shareable card package.
            </p>
          </Card>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mb-16">
            {features.map((feature, index) => (
              <Card key={index} className="glass-card p-6 text-center">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>

          {/* Step by Step Guide */}
          <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
            {steps.map((step, index) => (
              <Card key={index} className="glass-card p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-600 flex items-center justify-center text-white">
                    {step.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {step.title}
                  </h3>
                </div>
                <p className="text-gray-600">{step.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
