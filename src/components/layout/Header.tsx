import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="flex items-center justify-between mb-8">
      <Link to="/" className="flex items-center space-x-2">
        <img 
          src="/lovable-uploads/258520d3-4417-4492-a9ce-2267e06d6c66.png" 
          alt="BizDeck" 
          className="w-12 h-12" 
        />
        <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
          BizDeck
        </span>
      </Link>
    </div>
  );
}