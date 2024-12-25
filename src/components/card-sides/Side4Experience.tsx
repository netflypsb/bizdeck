interface WorkExperience {
  jobTitle: string;
  organization: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  responsibilities: string;
}

interface Side4Props {
  experiences: WorkExperience[];
}

export default function Side4Experience({ experiences }: Side4Props) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-indigo-600">Work Experience</h3>
      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <div key={index} className="space-y-2">
            <h4 className="text-md font-semibold text-gray-800">{exp.jobTitle}</h4>
            <p className="text-gray-600">{exp.organization}</p>
            <p className="text-sm text-gray-500">
              {exp.startDate} - {exp.currentlyWorking ? "Present" : exp.endDate}
            </p>
            <p className="text-sm text-gray-600 whitespace-pre-wrap">{exp.responsibilities}</p>
          </div>
        ))}
      </div>
    </div>
  );
}