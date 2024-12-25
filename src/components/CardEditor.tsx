import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { QRCodeSVG } from "qrcode.react";
import BusinessCard from "./BusinessCard";
import { Download, Share2, ChevronLeft, ChevronRight, Plus, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { exportAsImage, exportAsVCard, exportAsPDF, exportAsHTML } from "./ExportUtils";
import { Badge } from "./ui/badge";
import { formFields } from "./editor/formFields";
import { FormData } from "@/types/formTypes";
import Header from "./layout/Header";
import Footer from "./layout/Footer";

export default function CardEditor() {
  const [currentSide, setCurrentSide] = useState(0);
  const [enabledSides, setEnabledSides] = useState([0, 1, 2]);
  const [formData, setFormData] = useState<FormData>({
    profilePic: "",
    name: "",
    title: "",
    company: "",
    email: "",
    phone: "",
    website: "",
    address: "",
    tagline: "",
    linkedin: "",
    twitter: "",
    whatsapp: "",
    telegram: "",
    tiktok: "",
    specialties: [] as string[],
    skills: [] as string[],
    services: [] as string[],
    ctaButtons: [
      { text: "", link: "", color: "bg-blue-500 hover:bg-blue-600", enabled: true },
      { text: "", link: "", color: "bg-purple-500 hover:bg-purple-600", enabled: false },
      { text: "", link: "", color: "bg-orange-500 hover:bg-orange-600", enabled: false },
    ],
    otherLinks: [] as Array<{ title: string; url: string }>,
    experiences: [] as Array<{
      jobTitle: string;
      organization: string;
      startDate: string;
      endDate: string;
      currentlyWorking: boolean;
      responsibilities: string;
    }>,
    education: [] as Array<{
      degree: string;
      institution: string;
      startDate: string;
      graduationDate: string;
      achievements: string;
    }>,
    displaySections: {
      specialties: true,
      skills: true,
      services: true,
    }
  });

  const [newTag, setNewTag] = useState({ type: "", value: "" });
  const [newLink, setNewLink] = useState({ title: "", url: "" });
  const [newExperience, setNewExperience] = useState({
    jobTitle: "",
    organization: "",
    startDate: "",
    endDate: "",
    currentlyWorking: false,
    responsibilities: "",
  });

  const [newEducation, setNewEducation] = useState({
    degree: "",
    institution: "",
    startDate: "",
    graduationDate: "",
    achievements: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCtaButtonChange = (index: number, field: "text" | "link", value: string) => {
    setFormData((prev) => {
      const newButtons = [...prev.ctaButtons];
      newButtons[index] = { ...newButtons[index], [field]: value };
      return { ...prev, ctaButtons: newButtons };
    });
  };

  const handleAddTag = (type: keyof Pick<FormData, "specialties" | "skills" | "services">) => {
    if (newTag.value.trim()) {
      setFormData((prev) => ({
        ...prev,
        [type]: [...prev[type], newTag.value.trim()],
      }));
      setNewTag({ type: "", value: "" });
    }
  };

  const handleRemoveTag = (type: keyof Pick<FormData, "specialties" | "skills" | "services">, index: number) => {
    setFormData((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));
  };

  const handleAddOtherLink = () => {
    if (newLink.title && newLink.url) {
      setFormData((prev) => ({
        ...prev,
        otherLinks: [...prev.otherLinks, { ...newLink }],
      }));
      setNewLink({ title: "", url: "" });
    }
  };

  const handleRemoveOtherLink = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      otherLinks: prev.otherLinks.filter((_, i) => i !== index),
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          profilePic: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddExperience = () => {
    if (newExperience.jobTitle && newExperience.organization) {
      setFormData((prev) => ({
        ...prev,
        experiences: [...prev.experiences, { ...newExperience }],
      }));
      setNewExperience({
        jobTitle: "",
        organization: "",
        startDate: "",
        endDate: "",
        currentlyWorking: false,
        responsibilities: "",
      });
    }
  };

  const handleAddEducation = () => {
    if (newEducation.degree && newEducation.institution) {
      setFormData((prev) => ({
        ...prev,
        education: [...prev.education, { ...newEducation }],
      }));
      setNewEducation({
        degree: "",
        institution: "",
        startDate: "",
        graduationDate: "",
        achievements: "",
      });
    }
  };

  const handleRemoveExperience = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((_, i) => i !== index),
    }));
  };

  const handleRemoveEducation = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  const toggleSide = (sideIndex: number) => {
    setEnabledSides((prev) => {
      if (prev.includes(sideIndex)) {
        return prev.filter((side) => side !== sideIndex);
      }
      return [...prev, sideIndex].sort();
    });
  };

  const sideNames = ["Basic Info", "Links", "Professional", "Experience", "Education"];

  const handleCtaButtonToggle = (index: number) => {
    setFormData(prev => {
      const newButtons = [...prev.ctaButtons];
      newButtons[index] = { ...newButtons[index], enabled: !newButtons[index].enabled };
      return { ...prev, ctaButtons: newButtons };
    });
  };

  const handleSectionToggle = (section: keyof typeof formData.displaySections) => {
    setFormData(prev => ({
      ...prev,
      displaySections: {
        ...prev.displaySections,
        [section]: !prev.displaySections[section]
      }
    }));
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Header />
      
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white/5 backdrop-blur-lg rounded-lg p-6 border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Edit Side {currentSide + 1}</h2>
              <div className="flex gap-2">
                <Button
                  onClick={() => setCurrentSide(prev => Math.max(0, prev - 1))}
                  disabled={currentSide === 0}
                  variant="outline"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => setCurrentSide(prev => Math.min(4, prev + 1))}
                  disabled={currentSide === 4}
                  variant="outline"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Enabled Sides</h3>
              <div className="flex flex-wrap gap-2">
                {sideNames.map((name, index) => (
                  <Badge
                    key={index}
                    variant={enabledSides.includes(index) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleSide(index)}
                  >
                    {name}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              {currentSide === 0 && (
                <>
                  {formFields.side1.map((field) => (
                    <div key={field.name}>
                      <Label htmlFor={field.name} className="capitalize text-gray-700">
                        {field.label}
                      </Label>
                      <Input
                        id={field.name}
                        name={field.name}
                        type={field.type}
                        accept={field.type === "file" ? "image/*" : undefined}
                        onChange={field.type === "file" ? handleImageUpload : handleChange}
                        className="w-full mt-1"
                        placeholder={`Enter your ${field.label.toLowerCase()}`}
                      />
                    </div>
                  ))}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-700">Call to Action Buttons</h3>
                    {formData.ctaButtons.map((button, index) => (
                      <div key={index} className="grid grid-cols-2 gap-2">
                        <div className="col-span-2 flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={button.enabled}
                            onChange={() => handleCtaButtonToggle(index)}
                            className="rounded border-gray-300"
                          />
                          <span className="text-sm text-gray-600">Enable Button {index + 1}</span>
                        </div>
                        <Input
                          placeholder="Button Text"
                          value={button.text}
                          onChange={(e) => handleCtaButtonChange(index, "text", e.target.value)}
                        />
                        <Input
                          placeholder="Button Link"
                          value={button.link}
                          onChange={(e) => handleCtaButtonChange(index, "link", e.target.value)}
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}

              {currentSide === 1 && (
                <>
                  {formFields.side2.map((field) => (
                    <div key={field.name}>
                      <Label htmlFor={field.name} className="capitalize text-gray-700">
                        {field.label}
                      </Label>
                      <Input
                        id={field.name}
                        name={field.name}
                        type={field.type}
                        value={formData[field.name as keyof typeof formData] as string}
                        onChange={handleChange}
                        className="w-full mt-1"
                        placeholder={`Enter your ${field.label.toLowerCase()}`}
                      />
                    </div>
                  ))}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-700">Other Links</h3>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Link Title"
                        value={newLink.title}
                        onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                      />
                      <Input
                        placeholder="URL"
                        value={newLink.url}
                        onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                      />
                      <Button onClick={handleAddOtherLink} variant="outline">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {formData.otherLinks.map((link, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                          <span>{link.title}</span>
                          <Button
                            onClick={() => handleRemoveOtherLink(index)}
                            variant="ghost"
                            size="sm"
                            className="text-red-500"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {currentSide === 2 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-700">Display Sections</h3>
                    {Object.entries(formData.displaySections).map(([section, enabled]) => (
                      <div key={section} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={enabled}
                          onChange={() => handleSectionToggle(section as keyof typeof formData.displaySections)}
                          className="rounded border-gray-300"
                        />
                        <span className="text-sm text-gray-600 capitalize">{section}</span>
                      </div>
                    ))}
                  </div>
                  {["specialties", "skills", "services"].map((type) => (
                    <div key={type} className="space-y-2">
                      <Label className="capitalize text-gray-700">{type}</Label>
                      <div className="flex flex-wrap gap-2">
                        <Input
                          placeholder={`Add ${type}`}
                          value={newTag.type === type ? newTag.value : ""}
                          onChange={(e) => setNewTag({ type, value: e.target.value })}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              handleAddTag(type as "specialties" | "skills" | "services");
                            }
                          }}
                        />
                        <Button
                          onClick={() => handleAddTag(type as "specialties" | "skills" | "services")}
                          variant="outline"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {(formData[type as keyof Pick<FormData, "specialties" | "skills" | "services">] as string[]).map((tag: string, index: number) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="flex items-center gap-1 bg-gray-100"
                          >
                            {tag}
                            <Button
                              onClick={() => handleRemoveTag(type as keyof Pick<FormData, "specialties" | "skills" | "services">, index)}
                              variant="ghost"
                              size="sm"
                              className="h-4 w-4 p-0 text-gray-500 hover:text-red-500"
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {currentSide === 3 && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-700">Work Experience</h3>
                  <div className="grid gap-2">
                    <Input
                      placeholder="Job Title"
                      value={newExperience.jobTitle}
                      onChange={(e) => setNewExperience({ ...newExperience, jobTitle: e.target.value })}
                    />
                    <Input
                      placeholder="Organization"
                      value={newExperience.organization}
                      onChange={(e) => setNewExperience({ ...newExperience, organization: e.target.value })}
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        type="date"
                        placeholder="Start Date"
                        value={newExperience.startDate}
                        onChange={(e) => setNewExperience({ ...newExperience, startDate: e.target.value })}
                      />
                      <Input
                        type="date"
                        placeholder="End Date"
                        value={newExperience.endDate}
                        onChange={(e) => setNewExperience({ ...newExperience, endDate: e.target.value })}
                        disabled={newExperience.currentlyWorking}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={newExperience.currentlyWorking}
                        onChange={(e) => setNewExperience({ ...newExperience, currentlyWorking: e.target.checked })}
                      />
                      <span className="text-sm text-gray-600">Currently Working Here</span>
                    </div>
                    <Textarea
                      placeholder="Responsibilities/Accomplishments"
                      value={newExperience.responsibilities}
                      onChange={(e) => setNewExperience({ ...newExperience, responsibilities: e.target.value })}
                    />
                    <Button onClick={handleAddExperience} variant="outline">
                      <Plus className="w-4 h-4" /> Add Experience
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {formData.experiences.map((exp, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                        <span>{exp.jobTitle} at {exp.organization}</span>
                        <Button
                          onClick={() => handleRemoveExperience(index)}
                          variant="ghost"
                          size="sm"
                          className="text-red-500"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {currentSide === 4 && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-700">Education</h3>
                  <div className="grid gap-2">
                    <Input
                      placeholder="Degree/Qualification"
                      value={newEducation.degree}
                      onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
                    />
                    <Input
                      placeholder="Institution"
                      value={newEducation.institution}
                      onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        type="date"
                        placeholder="Start Date"
                        value={newEducation.startDate}
                        onChange={(e) => setNewEducation({ ...newEducation, startDate: e.target.value })}
                      />
                      <Input
                        type="date"
                        placeholder="Graduation Date"
                        value={newEducation.graduationDate}
                        onChange={(e) => setNewEducation({ ...newEducation, graduationDate: e.target.value })}
                      />
                    </div>
                    <Textarea
                      placeholder="Achievements/Activities (Optional)"
                      value={newEducation.achievements}
                      onChange={(e) => setNewEducation({ ...newEducation, achievements: e.target.value })}
                    />
                    <Button onClick={handleAddEducation} variant="outline">
                      <Plus className="w-4 h-4" /> Add Education
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {formData.education.map((edu, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                        <span>{edu.degree} at {edu.institution}</span>
                        <Button
                          onClick={() => handleRemoveEducation(index)}
                          variant="ghost"
                          size="sm"
                          className="text-red-500"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-lg p-6 border border-white/10">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Export Options</h3>
            <div className="flex flex-wrap gap-3">
              <Button 
                onClick={() => exportAsImage({ formData, setCurrentSide, enabledSides })} 
                className="flex items-center gap-2"
              >
                <Download size={16} /> Export as Image
              </Button>
              <Button 
                onClick={() => exportAsPDF({ formData, setCurrentSide, enabledSides })} 
                variant="secondary" 
                className="flex items-center gap-2"
              >
                <Download size={16} /> Export as PDF
              </Button>
              <Button 
                onClick={() => exportAsVCard(formData)} 
                variant="outline" 
                className="flex items-center gap-2"
              >
                <Share2 size={16} /> Export Contact
              </Button>
              <Button 
                onClick={() => exportAsHTML(formData)} 
                variant="outline" 
                className="flex items-center gap-2"
              >
                <Download size={16} /> Export as HTML
              </Button>
            </div>
          </div>
        </div>

        <div className="lg:sticky lg:top-8 space-y-6">
          <div id="business-card" className="w-full">
            <BusinessCard {...formData} currentSide={currentSide} enabledSides={enabledSides} />
          </div>
          
          {currentSide === 1 && (
            <div className="bg-white/5 backdrop-blur-lg rounded-lg p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">QR Code</h3>
              <div className="flex justify-center bg-white p-4 rounded-lg">
                <QRCodeSVG
                  value={`BEGIN:VCARD\nVERSION:3.0\nFN:${formData.name}\nTITLE:${formData.title}\nORG:${formData.company}\nTEL:${formData.phone}\nEMAIL:${formData.email}\nURL:${formData.website}\nEND:VCARD`}
                  size={200}
                  level="H"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
