/* eslint-disable linebreak-style */
/* eslint-disable import/prefer-default-export */
/* eslint-disable one-var */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
import { getPosts } from './src/posts.js';
import PostModal from './src/post-modal.js';

(function () {
  const modalWrapper = document.querySelector('.js-modalWrapper'),
    titleId = document.querySelector('.js-titleId'),
    editPostTitle = document.querySelector('.js-editPostTitleInput'),
    editPostBody = document.querySelector('.js-editPostBodyInput'),
    saveButton = document.querySelector('.js-saveButton'),
    closeButton = document.querySelector('.js-closeButton'),
    post = new PostModal();

  /**
   * getting all the posts and appending them to local storage
   */
  getPosts();
  const posts = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : [];

  /**
   * Making our document clickable and getting the attribute ID on click
   */
  document.body.addEventListener('click', async (e) => {
    const targetBlock = e.target;
    if (targetBlock.classList.contains('js-postWrapper')) return;
    const id = targetBlock.getAttribute('data-id'),
      currentId = id - 1 - (100 - posts.length);

    /**
     * Fetching the post when we click edit and appending it to modal inputs
     * logging error if we can't fetch
     */
    if (targetBlock.classList.contains('js-editPosts')) {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?id=${id}`);

      if (response && response.status !== 200) {
        throw new Error('cannot fetch data');
      }

      const data = await response.json()
        .then((data) => {
          const modal = data.map((post) => {
            if (titleId && editPostTitle) {
              titleId.innerHTML = `ID: ${post.id}`;
              editPostTitle.value = post.title;
            }
            if (editPostBody && saveButton) {
              editPostBody.value = post.body;
              saveButton.setAttribute('data-id', post.id);
            }
          });
          if (post && modalWrapper) {
            post.showModal(modalWrapper);
          }
        }).catch((error) => {
          if (error) {
            console.log(error);
          }
        });
    }
    /**
     * Closing the modal when we click the X button
     */
    if (targetBlock === closeButton) {
      post.closeModal(modalWrapper);
    }
    const cardText = document.querySelectorAll('.js-cardText'),
      cardTitle = document.querySelectorAll('.js-cardTitle');

    /**
     * Applying saved input to the local storage
     */
    if (targetBlock === saveButton && posts) {
      if (editPostTitle) {
        posts[currentId].title = editPostTitle.value;
      }
      if (editPostBody) {
        posts[currentId].body = editPostBody.value;
      }
      localStorage.setItem('data', JSON.stringify(posts));
      if (modalWrapper) {
        post.saveModal(modalWrapper);
      }
    }

    /**
     * Applying saved input to the document
     */
    if (targetBlock === saveButton) {
      if (cardTitle && cardText) {
        cardTitle[currentId].innerHTML = `${id}. ${posts[currentId].title}`;
        cardText[currentId].innerHTML = posts[currentId].body;
      }
    }

    /**
     * When delete clicked to delete the post from local storage
     */
    if (targetBlock.classList.contains('js-deletePosts') && posts) {
      post.deletePost(id - 1);
      if (id === '1') {
        posts.splice(id - (100 - posts.length), 1);
      } else {
        posts.splice(currentId, 1);
      }
      localStorage.setItem('data', JSON.stringify(posts));
    }
  });
}());
