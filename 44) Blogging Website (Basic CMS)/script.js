// Sample blog posts data
const posts = [
    {
        title: 'First Blog Post',
        content: 'This is the content of the first blog post.',
        date: 'March 11, 2025'
    },
    {
        title: 'Second Blog Post',
        content: 'This is the content of the second blog post.',
        date: 'March 12, 2025'
    }
];

// Function to display blog posts
function displayPosts() {
    const postsSection = document.getElementById('posts');
    postsSection.innerHTML = ''; // Clear existing posts
    posts.forEach(post => {
        const postElement = document.createElement('article');
        postElement.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.content}</p>
            <small>Posted on: ${post.date}</small>
        `;
        postsSection.appendChild(postElement);
    });
}

// Function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    const newPost = {
        title,
        content,
        date
    };

    posts.push(newPost);
    displayPosts();
    document.getElementById('post-form').reset();
}

// Call the function to display posts when the page loads
window.onload = function() {
    displayPosts();
    document.getElementById('post-form').addEventListener('submit', handleFormSubmit);
}
