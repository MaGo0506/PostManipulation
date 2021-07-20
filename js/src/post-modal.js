/* eslint-disable linebreak-style */
export default class PostModal {
  constructor() {
    this.shadow = document.querySelector('.js-shadow');
    this.postWrapper = document.querySelector('.js-postWrapper');
  }

  /**
   * Here we are giving out modal class active,
   *  so it is visible on the page
   * @param {*} target - the target we want to show on page
   */
  showModal(target) {
    target.classList.add('active');
    if (this.shadow) {
      this.shadow.classList.add('active');
    }
  }

  /**
   * here we are removing an item from the list,
   * when we hit delete
   * @param {*} id - the target id we are targeting
   */
  deletePost(id) {
    if (this.postWrapper) {
      this.postWrapper.children[id].innerHTML = '';
      this.postWrapper.children[id].classList.add('none');
    }
  }

  /**
   * Closing and hiding the modal
   * @param {*} target - the target we want to show on page
   */
  closeModal(target) {
    target.classList.remove('active');
    if (this.shadow) {
      this.shadow.classList.remove('active');
    }
  }

  /**
   * closing and hiding the modal
   * @param {*} target - the target we want to show on page
   */
  saveModal(target) {
    target.classList.remove('active');
    if (this.shadow) {
      this.shadow.classList.remove('active');
    }
  }
}
