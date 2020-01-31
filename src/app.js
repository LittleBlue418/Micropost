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
document.querySelector('#posts').addEventListener('click', enableEdit);

// Listen for cancel edit
document.querySelector('.card-form').addEventListener('click', cancelEdit);




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
  const id = document.querySelector('#id').value;

  const data = {
    title,
    body
  }

  // Validate Input
  if (title === '' || body === '') {

    ui.showAlert('Please fill in all fields', 'alert alert-danger');

  } else {

    // Check for id
    if (id === '') {

      // Create Post
      http.post(url, data)
        .then(data => {
          ui.showAlert('Post added', 'alert alert-success');
          ui.clearFields();
          getPosts();
        })
        .catch(error => console.log(error));

    } else {

      // Update the post
      http.put(`${url}/${id}`, data)
        .then(data => {
          ui.showAlert('Post updated', 'alert alert-success');
          ui.changeFormState('add');
          getPosts();
        })
        .catch(error => console.log(error));

    }
  }
}


// Delete Post
function deletePost(e) {
  e.preventDefault();
  if (e.target.parentElement.classList.contains('delete')) {
    const id = e.target.parentElement.dataset.id;
    if (confirm('Are you sure?')) {
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
  if (e.target.parentElement.classList.contains('edit')) {
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
    ui.fillForm(data);
  }
}


// Cancel edit state
function cancelEdit(e) {
  e.preventDefault();
  if (e.target.classList.contains('post-cancel')) {
    ui.changeFormState('add');
  }
}