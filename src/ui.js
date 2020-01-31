class UI {
  constructor() {
    this.post = document.querySelector('#posts');

    this.titleInput = document.querySelector('#title');
    this.bodyInput = document.querySelector('#body');
    this.idInput = document.querySelector('#id');
    this.postSubmitBtn = document.querySelector('.post-submit');

    this.formState = 'add';
  }

  showPosts(posts) {
    let output = '';

    posts.forEach((post) => {
      output += `
        <div class="card mb-3">
          <div class="card-body">
            <h4 class="card-title">${post.title}</h4>
            <p class="card-text">${post.body}</p>
            <a href="#" class="edit card-link" data-id="${post.id}">
              <i class="fa fa-pencil"></i>
            </a>
            <a href="#" class="delete card-link" data-id="${post.id}">
              <i class="fa fa-remove"></i>
            </a>
          </div>
        </div>
      `
    });

    this.post.innerHTML = output;
  }


  showAlert(message, className) {
    this.clearAlert();

    // Create div
    const div = document.createElement('div');
    // Add classes
    div.className = className;
    // Add text
    div.appendChild(document.createTextNode(message));

    // Get parent
    const container = document.querySelector('.postContainer');
    // Get posts
    const posts = document.querySelector('#posts');

    // Insert the alert div
    container.insertBefore(div, posts);

    // Timeout
    setTimeout(() => {
      this.clearAlert();
    }, 3000);
  }

  clearAlert() {
    const currentAlert = document.querySelector('.alert');

    if(currentAlert) {
      currentAlert.remove();
    }
  }


  clearFields() {
    this.titleInput.value = '';
    this.bodyInput.value = '';
  }

  clearIdInput(){
    this.idInput.value = '';
  }

  fillForm(data) {
    this.titleInput.value = data.title;
    this.bodyInput.value = data.body;
    this.idInput.value = data.id;

    this.changeFormState('edit');
  }

  changeFormState(type){
    if(type === 'edit'){
      // Change main button
      this.postSubmitBtn.textContent = 'Update Post';
      this.postSubmitBtn.className = 'post-submit btn btn-warning btn-block';

      // Create calcel button
      const button = document.createElement('button');
      button.className = 'post-cancel btn btn-light btn-block';
      button.appendChild(document.createTextNode('Cancel Edit'));

      // Get parent
      const cardForm = document.querySelector('.card-form');
      // Get element to insert before (the span)
      const formEnd = document.querySelector('.form-end');
      // Insert cancel button
      cardForm.insertBefore(button, formEnd);

    } else {
      // Re-set main button
      this.postSubmitBtn.textContent = 'Post It!';
      this.postSubmitBtn.className = 'post-submit btn btn-primary btn-block';

      // Remove cancel button (if there)
      if(document.querySelector('.post-cancel')) {
        document.querySelector('.post-cancel').remove();
      }

      // Clear ID from hidden field
      this.clearIdInput();

      // Clear text fields
      this.clearFields();
    }
  }

}


export const ui = new UI();