import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";
import vCard from "vcf";
import { toast } from "sonner";
import { exportAsHTML } from "../utils/htmlExport";

interface ExportUtilsProps {
  formData: any;
  setCurrentSide: (side: number) => void;
  enabledSides?: number[];
}

export const exportAsImage = async ({ formData, setCurrentSide, enabledSides = [0, 1, 2] }: ExportUtilsProps) => {
  try {
    const sides = [];
    for (const sideIndex of enabledSides) {
      setCurrentSide(sideIndex);
      // Wait for the state to update
      await new Promise(resolve => setTimeout(resolve, 100));
      const cardElement = document.getElementById("business-card");
      if (!cardElement) continue;
      const imageData = await toPng(cardElement);
      sides.push(imageData);
    }
    
    const canvas = document.createElement("canvas");
    canvas.width = sides.length * 500;
    canvas.height = 300;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const images = await Promise.all(sides.map(side => {
      const img = new Image();
      img.src = side;
      return new Promise<HTMLImageElement>((resolve) => {
        img.onload = () => resolve(img);
      });
    }));

    images.forEach((img, index) => {
      ctx.drawImage(img, index * 500, 0, 500, 300);
    });

    const link = document.createElement("a");
    link.href = canvas.toDataURL();
    link.download = "business-card.png";
    link.click();
    toast.success("Business card exported as image!");
  } catch (error) {
    toast.error("Failed to export image");
  }
};

export const exportAsVCard = (formData: any) => {
  try {
    const card = new vCard();
    card.add("fn", formData.name);
    card.add("title", formData.title);
    card.add("email", formData.email);
    card.add("tel", formData.phone);
    card.add("url", formData.website);
    card.add("org", formData.company);
    card.add("adr", formData.address);
    card.add("note", `Specialties: ${formData.specialties}\nServices: ${formData.services}`);
    
    const vcfData = card.toString();
    const blob = new Blob([vcfData], { type: "text/vcard" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "business-card.vcf";
    link.click();
    toast.success("Contact card exported!");
  } catch (error) {
    toast.error("Failed to export contact card");
  }
};

export const exportAsPDF = async ({ formData, setCurrentSide, enabledSides = [0, 1, 2] }: ExportUtilsProps) => {
  try {
    const sides = [];
    for (const sideIndex of enabledSides) {
      setCurrentSide(sideIndex);
      // Wait for the state to update
      await new Promise(resolve => setTimeout(resolve, 100));
      const cardElement = document.getElementById("business-card");
      if (!cardElement) continue;
      const imageData = await toPng(cardElement);
      sides.push(imageData);
    }

    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [300, sides.length * 500],
    });

    sides.forEach((side, index) => {
      if (index > 0) pdf.addPage();
      pdf.addImage(side, "PNG", 0, 0, 500, 300);
    });

    pdf.save("business-card.pdf");
    toast.success("Business card exported as PDF!");
  } catch (error) {
    toast.error("Failed to export PDF");
  }
};

export { exportAsHTML };
