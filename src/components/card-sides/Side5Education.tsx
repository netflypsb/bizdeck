interface Education {
  degree: string;
  institution: string;
  startDate: string;
  graduationDate: string;
  achievements: string;
}

interface Side5Props {
  education: Education[];
}

export default function Side5Education({ education }: Side5Props) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-indigo-600">Education</h3>
      <div className="space-y-6">
        {education.map((edu, index) => (
          <div key={index} className="space-y-2">
            <h4 className="text-md font-semibold text-gray-800">{edu.degree}</h4>
            <p className="text-gray-600">{edu.institution}</p>
            <p className="text-sm text-gray-500">
              {edu.startDate} - {edu.graduationDate}
            </p>
            {edu.achievements && (
              <p className="text-sm text-gray-600 whitespace-pre-wrap">{edu.achievements}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}