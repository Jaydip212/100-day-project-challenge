// ===== Tool Page Initialization =====
document.addEventListener('DOMContentLoaded', function() {
    // Get tool name from URL
    const urlParams = new URLSearchParams(window.location.search);
    const toolName = urlParams.get('tool');
    
    if (toolName) {
        updateToolInfo(toolName);
    }
    
    // Initialize upload functionality
    initializeUpload();
});

// ===== Update Tool Information =====
function updateToolInfo(tool) {
    const toolData = {
        'merge': {
            name: 'Merge PDF',
            description: 'Combine multiple PDFs into one document',
            icon: 'fa-object-group'
        },
        'split': {
            name: 'Split PDF',
            description: 'Separate one page or a whole set for easy conversion',
            icon: 'fa-scissors'
        },
        'compress': {
            name: 'Compress PDF',
            description: 'Reduce file size while optimizing for maximal quality',
            icon: 'fa-compress'
        },
        'pdf-to-word': {
            name: 'PDF to Word',
            description: 'Easily convert PDF files to editable Word documents',
            icon: 'fa-file-word'
        },
        'word-to-pdf': {
            name: 'Word to PDF',
            description: 'Make DOC and DOCX files easy to read by converting them to PDF',
            icon: 'fa-file-pdf'
        },
        'ppt-to-pdf': {
            name: 'PowerPoint to PDF',
            description: 'Turn your presentations into PDFs instantly',
            icon: 'fa-file-powerpoint'
        },
        'excel-to-pdf': {
            name: 'Excel to PDF',
            description: 'Convert your spreadsheets to PDF format',
            icon: 'fa-file-excel'
        },
        'edit': {
            name: 'Edit PDF',
            description: 'Add text, images, shapes or freehand annotations to PDFs',
            icon: 'fa-edit'
        },
        'rotate': {
            name: 'Rotate PDF',
            description: 'Rotate your PDFs the way you need them',
            icon: 'fa-redo'
        },
        'protect': {
            name: 'Protect PDF',
            description: 'Protect your PDF with a password to prevent unauthorized access',
            icon: 'fa-lock'
        },
        'unlock': {
            name: 'Unlock PDF',
            description: 'Remove password security from your PDF files',
            icon: 'fa-unlock'
        },
        'sign': {
            name: 'Sign PDF',
            description: 'Sign yourself or request electronic signatures',
            icon: 'fa-signature'
        },
        'convert': {
            name: 'Convert PDF',
            description: 'Convert your PDFs to various formats',
            icon: 'fa-exchange-alt'
        }
    };
    
    const data = toolData[tool] || toolData['merge'];
    
    // Update page title
    document.title = `${data.name} - ❤️ PDF`;
    
    // Update breadcrumb
    const toolNameElement = document.getElementById('toolName');
    if (toolNameElement) {
        toolNameElement.textContent = data.name;
    }
    
    // Update tool header
    const toolTitle = document.getElementById('toolTitle');
    const toolDescription = document.getElementById('toolDescription');
    const toolIconLarge = document.getElementById('toolIconLarge');
    
    if (toolTitle) toolTitle.textContent = data.name;
    if (toolDescription) toolDescription.textContent = data.description;
    if (toolIconLarge) {
        toolIconLarge.innerHTML = `<i class="fas ${data.icon}"></i>`;
    }
}

// ===== Initialize Upload Functionality =====
function initializeUpload() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const selectFilesBtn = document.getElementById('selectFilesBtn');
}

// ===== Tool Page Initialization =====
document.addEventListener('DOMContentLoaded', function() {
    // Get tool name from URL
    const urlParams = new URLSearchParams(window.location.search);
    const toolName = urlParams.get('tool');
    
    if (toolName) {
        updateToolInfo(toolName);
    }
    
    // Initialize upload functionality
    initializeUpload();
});

// ===== Update Tool Information =====
function updateToolInfo(tool) {
    const toolData = {
        'merge': {
            name: 'Merge PDF',
            description: 'Combine multiple PDFs into one document',
            icon: 'fa-object-group'
        },
        'split': {
            name: 'Split PDF',
            description: 'Separate one page or a whole set for easy conversion',
            icon: 'fa-scissors'
        },
        'compress': {
            name: 'Compress PDF',
            description: 'Reduce file size while optimizing for maximal quality',
            icon: 'fa-compress'
        },
        'pdf-to-word': {
            name: 'PDF to Word',
            description: 'Easily convert PDF files to editable Word documents',
            icon: 'fa-file-word'
        },
        'word-to-pdf': {
            name: 'Word to PDF',
            description: 'Make DOC and DOCX files easy to read by converting them to PDF',
            icon: 'fa-file-pdf'
        },
        'ppt-to-pdf': {
            name: 'PowerPoint to PDF',
            description: 'Turn your presentations into PDFs instantly',
            icon: 'fa-file-powerpoint'
        },
        'excel-to-pdf': {
            name: 'Excel to PDF',
            description: 'Convert your spreadsheets to PDF format',
            icon: 'fa-file-excel'
        },
        'edit': {
            name: 'Edit PDF',
            description: 'Add text, images, shapes or freehand annotations to PDFs',
            icon: 'fa-edit'
        },
        'rotate': {
            name: 'Rotate PDF',
            description: 'Rotate your PDFs the way you need them',
            icon: 'fa-redo'
        },
        'protect': {
            name: 'Protect PDF',
            description: 'Protect your PDF with a password to prevent unauthorized access',
            icon: 'fa-lock'
        },
        'unlock': {
            name: 'Unlock PDF',
            description: 'Remove password security from your PDF files',
            icon: 'fa-unlock'
        },
        'sign': {
            name: 'Sign PDF',
            description: 'Sign yourself or request electronic signatures',
            icon: 'fa-signature'
        },
        'convert': {
            name: 'Convert PDF',
            description: 'Convert your PDFs to various formats',
            icon: 'fa-exchange-alt'
        }
    };
    
    const data = toolData[tool] || toolData['merge'];
    
    // Update page title
    document.title = `${data.name} - ❤️ PDF`;
    
    // Update breadcrumb
    const toolNameElement = document.getElementById('toolName');
    if (toolNameElement) {
        toolNameElement.textContent = data.name;
    }
    
    // Update tool header
    const toolTitle = document.getElementById('toolTitle');
    const toolDescription = document.getElementById('toolDescription');
    const toolIconLarge = document.getElementById('toolIconLarge');
    
    if (toolTitle) toolTitle.textContent = data.name;
    if (toolDescription) toolDescription.textContent = data.description;
    if (toolIconLarge) {
        toolIconLarge.innerHTML = `<i class="fas ${data.icon}"></i>`;
    }
}

// ===== Initialize Upload Functionality =====
function initializeUpload() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const selectFilesBtn = document.getElementById('selectFilesBtn');
    const fileList = document.getElementById('fileList');
    const fileItems = document.getElementById('fileItems');
    const clearBtn = document.getElementById('clearBtn');
    const processBtn = document.getElementById('processBtn');
    const progressSection = document.getElementById('progressSection');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const downloadSection = document.getElementById('downloadSection');
    const downloadBtn = document.getElementById('downloadBtn');
    const processAnotherBtn = document.getElementById('processAnotherBtn');
    
    let selectedFiles = [];
    
    // Click to select files
    if (selectFilesBtn && fileInput) {
        selectFilesBtn.addEventListener('click', function() {
            fileInput.click();
        });
    }
    
    // Upload area click
    if (uploadArea && fileInput) {
        uploadArea.addEventListener('click', function(e) {
            if (e.target !== selectFilesBtn) {
                fileInput.click();
            }
        });
    }
    
    // File input change
    if (fileInput) {
        fileInput.addEventListener('change', function(e) {
            handleFiles(e.target.files);
        });
    }
    
    // Drag and drop functionality
    if (uploadArea) {
        uploadArea.addEventListener('dragover', function(e) {
            e.preventDefault();
            uploadArea.classList.add('drag-over');
        });
        
        uploadArea.addEventListener('dragleave', function(e) {
            e.preventDefault();
            uploadArea.classList.remove('drag-over');
        });
        
        uploadArea.addEventListener('drop', function(e) {
            e.preventDefault();
            uploadArea.classList.remove('drag-over');
            handleFiles(e.dataTransfer.files);
        });
    }
    
    // Handle selected files
    function handleFiles(files) {
        if (files.length === 0) return;
        
        selectedFiles = Array.from(files);
        displayFiles();
        
        // Hide upload area, show file list
        if (uploadArea) uploadArea.style.display = 'none';
        if (fileList) fileList.style.display = 'block';
    }
    
    // Display files in list
    function displayFiles() {
        if (!fileItems) return;
        
        fileItems.innerHTML = '';
        
        selectedFiles.forEach((file, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <i class="fas fa-file-pdf"></i>
                <span>${file.name}</span>
            `;
            fileItems.appendChild(li);
        });
    }
    
    // Clear all files
    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            selectedFiles = [];
            if (fileInput) fileInput.value = '';
            if (fileList) fileList.style.display = 'none';
            if (uploadArea) uploadArea.style.display = 'block';
        });
    }
    
    // Process files
    if (processBtn) {
        processBtn.addEventListener('click', function() {
            startProcessing();
        });
    }
    
    // Start processing animation
    function startProcessing() {
        // Hide file list
        if (fileList) fileList.style.display = 'none';
        
        // Show progress section
        if (progressSection) progressSection.style.display = 'block';
        
        // Animate progress
        let progress = 0;
        const interval = setInterval(function() {
            progress += Math.random() * 15;
            
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                
                // Show download section after completion
                setTimeout(function() {
                    if (progressSection) progressSection.style.display = 'none';
                    if (downloadSection) downloadSection.style.display = 'block';
                }, 500);
            }
            
            if (progressFill) progressFill.style.width = progress + '%';
            if (progressText) progressText.textContent = Math.floor(progress) + '%';
        }, 300);
    }
    
    // Download button
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            alert('File downloaded successfully! (This is a demo - no actual file is downloaded)');
        });
    }
    
    // Process another file
    if (processAnotherBtn) {
        processAnotherBtn.addEventListener('click', function() {
            resetUpload();
        });
    }
    
    // Reset upload state
    function resetUpload() {
        selectedFiles = [];
        if (fileInput) fileInput.value = '';
        if (fileList) fileList.style.display = 'none';
        if (progressSection) progressSection.style.display = 'none';
        if (downloadSection) downloadSection.style.display = 'none';
        if (uploadArea) uploadArea.style.display = 'block';
        if (progressFill) progressFill.style.width = '0%';
        if (progressText) progressText.textContent = '0%';
    }
}