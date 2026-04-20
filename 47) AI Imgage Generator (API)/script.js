document.getElementById('image-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const prompt = document.getElementById('prompt-input').value;
    const imageContainer = document.getElementById('image-container');
  
    // Clear previous image
    imageContainer.innerHTML = '';
  
    // Show loading message
    imageContainer.innerHTML = '<p>Generating image... Please wait.</p>';
  
    try {
      // Replace with your API endpoint and key
      const apiKey = 'sk-nsyuuNzoWVNn9eVRk2c4S1cOCxZutr1lWvhZbgZxPsp64Lm8';
      const apiUrl = 'https://api.stability.ai/v2beta/stable-image/generate/sd3'; // Example for OpenAI DALL·E
  
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          prompt: prompt,
          n: 1, // Number of images to generate
          size: '512x512' // Image size
        })
      });
  
      const data = await response.json();
  
      if (data.data && data.data[0].url) {
        const imageUrl = data.data[0].url;
        imageContainer.innerHTML = `<img src="${imageUrl}" alt="Generated Image">`;
      } else {
        imageContainer.innerHTML = '<p>Error: Unable to generate image. Please try again.</p>';
      }
    } catch (error) {
      console.error('Error:', error);
      imageContainer.innerHTML = '<p>Error: Something went wrong. Please try again.</p>';
    }
  });