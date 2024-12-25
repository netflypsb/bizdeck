import { FormData } from "@/types/formTypes";

export const exportAsHTML = (formData: FormData) => {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${formData.name} - Business Card</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        body {
            font-family: 'Inter', sans-serif;
        }
        .business-card {
            max-width: 100%;
            width: 600px;
            margin: 2rem auto;
            padding: 2rem;
            border-radius: 1rem;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        @media (max-width: 640px) {
            .business-card {
                margin: 1rem;
                padding: 1rem;
            }
        }
    </style>
</head>
<body class="bg-gradient-to-br from-indigo-50 to-purple-50 min-h-screen p-4">
    <div class="business-card">
        <div class="flex flex-col md:flex-row items-start md:items-center gap-4">
            ${formData.profilePic ? `<img src="${formData.profilePic}" alt="Profile" class="w-20 h-20 rounded-full object-cover">` : ''}
            <div>
                <h2 class="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                    ${formData.name}
                </h2>
                <p class="text-gray-600 font-medium">${formData.title}</p>
                <p class="text-indigo-600 font-semibold">${formData.company}</p>
            </div>
        </div>
        
        ${formData.tagline ? `<p class="text-sm text-gray-500 italic mt-4">${formData.tagline}</p>` : ''}
        
        <div class="mt-4 space-y-1 text-sm">
            ${formData.email ? `<p class="text-gray-600">${formData.email}</p>` : ''}
            ${formData.phone ? `<p class="text-gray-600">${formData.phone}</p>` : ''}
        </div>

        <div class="flex flex-wrap gap-2 mt-4">
            ${formData.ctaButtons
              .filter(button => button.enabled)
              .map(button => `
                <a href="${button.link}" target="_blank" rel="noopener noreferrer" 
                   class="px-4 py-2 rounded-md text-white text-sm font-medium transition-colors ${button.color}">
                    ${button.text}
                </a>
              `).join('')}
        </div>
    </div>
</body>
</html>`;

  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${formData.name.toLowerCase().replace(/\s+/g, '-')}-business-card.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};