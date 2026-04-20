const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const imageInput = document.getElementById('imageInput');
const downloadBtn = document.getElementById('downloadBtn');

let originalImage = null;
let currentFilter = 'normal';

imageInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const img = new Image();
            img.onload = function() {
                // Set canvas size to match image size
                canvas.width = img.width;
                canvas.height = img.height;
                
                // Store original image for filter resets
                originalImage = img;
                
                // Draw initial image
                ctx.drawImage(img, 0, 0);
                downloadBtn.disabled = false;
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
});

function applyFilter(filter) {
    if (!originalImage) return;
    
    currentFilter = filter;
    ctx.filter = 'none';
    ctx.drawImage(originalImage, 0, 0);

    switch (filter) {
        case 'normal':
            ctx.filter = 'none';
            break;
        case 'grayscale':
            ctx.filter = 'grayscale(100%)';
            break;
        case 'sepia':
            ctx.filter = 'sepia(100%)';
            break;
        case 'invert':
            ctx.filter = 'invert(100%)';
            break;
        case 'saturate':
            ctx.filter = 'saturate(200%)';
            break;
        case 'blur':
            ctx.filter = 'blur(5px)';
            break;
        case 'brightness':
            ctx.filter = 'brightness(150%)';
            break;
        case 'contrast':
            ctx.filter = 'contrast(150%)';
            break;
    }
    
    ctx.drawImage(originalImage, 0, 0);
}

downloadBtn.addEventListener('click', function() {
    const link = document.createElement('a');
    link.download = `filtered-image-${currentFilter}.png`;
    link.href = canvas.toDataURL();
    link.click();
});
