// Simple AI-generated content samples
const aiSuggestions = {
    summary: [
        "Results-driven professional with 2 years of experience in...",
        "Dynamic individual with proven track record in...",
        "I Am Purchasing in SY BCA AND MY CARRIER IN ETHICAL HACKING...",
        "Innovative thinker with expertise in..."
    ],
    skills: ["Team Leadership", "Project Management", "Data Analysis"]
};

// Generate AI summary
function generateSummary() {
    const summaryField = document.getElementById('summary');
    const randomIndex = Math.floor(Math.random() * aiSuggestions.summary.length);
    summaryField.value = aiSuggestions.summary[randomIndex];
}

// Add new experience field
function addExperienceField() {
    const newExperience = document.createElement('div');
    newExperience.className = 'experience-entry';
    newExperience.innerHTML = `
        <input type="text" placeholder="Job Title" class="job-title">
        <input type="text" placeholder="Company Name" class="company">
        <textarea placeholder="Description"></textarea>
    `;
    document.getElementById('experienceFields').appendChild(newExperience);
}

// Real-time preview updates
document.getElementById('fullName').addEventListener('input', function(e) {
    document.getElementById('previewName').textContent = e.target.value;
});

document.getElementById('summary').addEventListener('input', function(e) {
    document.getElementById('previewSummary').textContent = e.target.value;
});

// Download PDF (placeholder)
function downloadResume() {
    alert('PDF download functionality would go here');
}