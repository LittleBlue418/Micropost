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
    console.log(posts)
  }
}


export const ui = new UI();