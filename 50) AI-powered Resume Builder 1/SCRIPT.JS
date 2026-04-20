// Configuration
const OPENAI_API_KEY = 'YOUR_API_KEY'; // Replace with your API key
const openai = new OpenAI({ apiKey: OPENAI_API_KEY, dangerouslyAllowBrowser: true });

// AI Content Generation
async function generateAIContent(prompt) {
    try {
        const response = await openai.completions.create({
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 150
        });
        return response.choices[0].text.trim();
    } catch (error) {
        console.error('AI Error:', error);
        return null;
    }
}

// Generate AI Summary
async function generateSummary() {
    const name = document.getElementById('fullName').value;
    const prompt = `Write a professional resume summary for ${name || 'a candidate'} with experience in:`;
    const summary = await generateAIContent(prompt);
    if (summary) document.getElementById('summary').value = summary;
}

// Generate Skill Suggestions
async function generateSkillSuggestions() {
    const jobTitle = prompt("Enter target job title for skill suggestions:");
    if (jobTitle) {
        const prompt = `List 10 technical skills for a ${jobTitle} position:`;
        const skills = await generateAIContent(prompt);
        if (skills) {
            const skillList = skills.split('\n').filter(skill => skill.trim());
            aiSuggestions.skills = skillList;
            alert('AI suggestions updated! Try adding new skills.');
        }
    }
}

// PDF Generation
function downloadResume() {
    if (!validateForm()) return;
    
    const element = document.getElementById('resumePreview');
    const opt = {
        margin: 10,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
}

// Form Validation
function validateForm() {
    let isValid = true;
    const requiredFields = document.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('invalid');
        } else {
            field.classList.remove('invalid');
        }
    });

    return isValid;
}

// New Section Handlers
function addEducationField() {
    const newEducation = document.createElement('div');
    newEducation.className = 'education-entry';
    newEducation.innerHTML = `
        <input type="text" placeholder="Degree" class="degree">
        <input type="text" placeholder="University" class="university">
        <input type="text" placeholder="Years" class="years">
    `;
    document.getElementById('educationFields').appendChild(newEducation);
}

function addSkillField() {
    const newSkill = document.createElement('div');
    newSkill.className = 'skill-entry';
    newSkill.innerHTML = `
        <input type="text" placeholder="Skill" class="skill">
        <button class="remove-skill" onclick="removeSkill(this)">×</button>
    `;
    document.getElementById('skillsContainer').appendChild(newSkill);
}

function removeSkill(button) {
    button.parentElement.remove();
}

function addCertificationField() {
    const newCert = document.createElement('div');
    newCert.className = 'certification-entry';
    newCert.innerHTML = `
        <input type="text" placeholder="Certification Name">
        <input type="text" placeholder="Issuing Organization">
    `;
    document.getElementById('certificationFields').appendChild(newCert);
}

// Real-time Preview Updates
document.addEventListener('input', function(e) {
    if (e.target.matches('.degree, .university, .years')) {
        updateEducationPreview();
    }
    if (e.target.matches('.skill')) {
        updateSkillsPreview();
    }
});

function updateEducationPreview() {
    const entries = Array.from(document.querySelectorAll('.education-entry'));
    const preview = entries.map(entry => {
        return `
            <p><strong>${entry.querySelector('.degree').value}</strong></p>
            <p>${entry.querySelector('.university').value}</p>
            <p>${entry.querySelector('.years').value}</p>
        `;
    }).join('');
    document.getElementById('previewEducation').innerHTML = preview;
}

function updateSkillsPreview() {
    const skills = Array.from(document.querySelectorAll('.skill')).map(s => s.value);
    document.getElementById('previewSkills').innerHTML = skills
        .filter(s => s.trim())
        .map(s => `<span class="skill-tag">${s}</span>`)
        .join('');
}