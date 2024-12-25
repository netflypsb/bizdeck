import { Badge } from "@/components/ui/badge";

interface Side3Props {
  specialties: string[];
  skills: string[];
  services: string[];
  displaySections: {
    specialties: boolean;
    skills: boolean;
    services: boolean;
  };
}

export default function Side3Professional({ specialties, skills, services, displaySections }: Side3Props) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-indigo-600">Professional Details</h3>
      
      {displaySections.specialties && specialties.length > 0 && (
        <div>
          <h4 className="text-md font-semibold text-gray-700 mb-2">Specialties & Interests</h4>
          <div className="flex flex-wrap gap-2">
            {specialties.map((specialty, index) => (
              <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-800">
                {specialty}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {displaySections.skills && skills.length > 0 && (
        <div>
          <h4 className="text-md font-semibold text-gray-700 mb-2">Skills</h4>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-800">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {displaySections.services && services.length > 0 && (
        <div>
          <h4 className="text-md font-semibold text-gray-700 mb-2">Products & Services</h4>
          <div className="flex flex-wrap gap-2">
            {services.map((service, index) => (
              <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-800">
                {service}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}