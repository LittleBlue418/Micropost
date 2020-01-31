import { http } from './http';
import { ui } from './ui';
const url = 'http://localhost:3000/posts'


// Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

// Listen for add post
document.querySelector('.post-submit').addEventListener('click', submitPost);

// Listen for delete
document.querySelector('#posts').addEventListener('click', deletePost);

// Listen for edit state
document.querySelector('#posts').addEventListener('click', enableEdit)




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


// Delete Post
function deletePost(e) {
  e.preventDefault();
  if(e.target.parentElement.classList.contains('delete')) {
    const id = e.target.parentElement.dataset.id;
    if(confirm('Are you sure?')) {
      http.delete(`${url}/${id}`)
        .then(data => {
          ui.showAlert('Post deleted', 'alert alert-success');
          getPosts();
        })
        .catch(error => console.log(error))
    }
  }
}

// Enable edit state
function enableEdit(e) {
  e.preventDefault();
  if(e.target.parentElement.classList.contains('edit')){
    // Get the element that has been clicked on
    const id = e.target.parentElement.dataset.id;
    const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
    const body = e.target.parentElement.previousElementSibling.textContent;
    const targetDiv = e.target.parentElement.parentElement.parentElement;

    // combine into object
    const data = {
      id,
      title,
      body
    }

    // Fill in the form with the current post
    ui.toggleEditcolor(targetDiv);
    ui.fillForm(data);
  }
}