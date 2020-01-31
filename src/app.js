import { http } from './http';
import { ui } from './ui';
const url = 'http://localhost:3000/posts'

// Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

// Listen for add post
document.querySelector('.post-submit').addEventListener('click', submitPost);



// FUNCTIONS

// Get Posts
function getPosts() {
  http.get(url)
    .then(data => ui.showPosts(data))
    .catch(error => console.log(error));
}


// Submit posts
function submitPost() {
  const title = document.querySelector('#title').value;
  const body = document.querySelector('#body').value;

  const data = {
    title,
    body
  }

  // Create Post
  http.post(url, data)
    .then(data => {
      ui.showAlert('Post added', 'alert alert-success');
      ui.clearFields();
      getPosts();
    })
    .catch(error => console.log(error));
}