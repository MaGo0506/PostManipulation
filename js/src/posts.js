/* eslint-disable linebreak-style */
/* eslint-disable import/prefer-default-export */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable one-var */

/**
 * We are fetching all the posts and giving them HTML tags
 * And giving them attributes for later usage
 * logging error if the fetch isnt completed
 */
export const getPosts = async () => {
  const postWrapper = document.querySelector('.js-postWrapper'),
    response = await fetch('https://jsonplaceholder.typicode.com/posts');

  if (response && response.status !== 200) {
    throw new Error('cannot fetch data');
  }

  const data = await response.json()
    .then((data) => {
      localStorage.setItem('data', JSON.stringify(data));
      const retrievedData = localStorage.getItem('data');
      const posts = JSON.parse(retrievedData).map((post) => {
        if (retrievedData) {
          return `
          <div class="col-md-4 my-3 postContainer">
          <div class="card userPost js-userPost">
              <div class="card-body bg-white text-center">
                  <h3 class="bg-white fw-bold card-title js-cardTitle" data-id="${post.id}">${post.id}. ${post.title}</h3>
                  <h5 class="bg-white card-text js-cardText" data-id="${post.id}">${post.body}</h5>
                  <button class="btn btn-primary editPosts js-editPosts" data-id="${post.id}">Edit</button>
                  <button class="btn btn-primary deletePosts js-deletePosts" data-id="${post.id}">Delete</button>
              </div>
          </div>
       </div>
        `;
        }
      }).join('');
      if (postWrapper) {
        postWrapper.innerHTML = posts;
      }
    }).catch((error) => {
      if (error) {
        console.log(error);
      }
    });
};
