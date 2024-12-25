import { Badge } from "@/components/ui/badge";

interface Side1Props {
  profilePic: string;
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  tagline: string;
  ctaButtons: Array<{ text: string; link: string; color: string; enabled: boolean }>;
}

export default function Side1Basic({
  profilePic,
  name,
  title,
  company,
  email,
  phone,
  tagline,
  ctaButtons,
}: Side1Props) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        {profilePic && (
          <img src={profilePic} alt="Profile" className="w-20 h-20 rounded-full object-cover" />
        )}
        <div className="flex-1">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            {name}
          </h2>
          <p className="text-gray-600 font-medium">{title}</p>
          <p className="text-indigo-600 font-semibold">{company}</p>
        </div>
      </div>
      {tagline && <p className="text-sm text-gray-500 italic">{tagline}</p>}
      <div className="space-y-1 text-sm">
        {email && <p className="text-gray-600">{email}</p>}
        {phone && <p className="text-gray-600">{phone}</p>}
      </div>
      <div className="flex gap-2">
        {ctaButtons.filter(button => button.enabled).map((button, index) => (
          <a
            key={index}
            href={button.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`px-4 py-2 rounded-md text-white text-sm font-medium transition-colors ${button.color}`}
          >
            {button.text}
          </a>
        ))}
      </div>
    </div>
  );
}