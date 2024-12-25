import { Twitter, Linkedin, MessageCircle, Send, Video } from "lucide-react";

interface Side2Props {
  website: string;
  address: string;
  linkedin: string;
  twitter: string;
  whatsapp: string;
  telegram: string;
  tiktok: string;
  otherLinks: Array<{ title: string; url: string }>;
}

export default function Side2Links({
  website,
  address,
  linkedin,
  twitter,
  whatsapp,
  telegram,
  tiktok,
  otherLinks,
}: Side2Props) {
  return (
    <div className="space-y-4 min-h-[200px]">
      <h3 className="text-lg font-semibold text-indigo-600">Links</h3>
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          {website && (
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <span>🌐</span> {website}
            </div>
          )}
          {address && (
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <span>📍</span> {address}
            </div>
          )}
          {linkedin && (
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <Linkedin className="w-4 h-4" /> {linkedin}
            </div>
          )}
          {twitter && (
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <Twitter className="w-4 h-4" /> {twitter}
            </div>
          )}
          {whatsapp && (
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <MessageCircle className="w-4 h-4" /> {whatsapp}
            </div>
          )}
          {telegram && (
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <Send className="w-4 h-4" /> {telegram}
            </div>
          )}
          {tiktok && (
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <Video className="w-4 h-4" /> {tiktok}
            </div>
          )}
        </div>
      </div>
      {otherLinks.length > 0 && (
        <div className="mt-4">
          <h4 className="text-md font-semibold text-gray-700 mb-2">Other Links</h4>
          <div className="space-y-2">
            {otherLinks.map((link, index) => (
              <div key={index} className="flex items-center gap-2 text-gray-600 text-sm">
                <span>🔗</span>
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600">
                  {link.title}
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}