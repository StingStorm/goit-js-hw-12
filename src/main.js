// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';
// Описаний у документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

import fetchingGallery from './js/pixabay-api';
import renderGallery from './js/render-functions';

const searchForm = document.querySelector('.search-form');
const galleryList = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('button[data-load]');

const { fetchingGalleryPage, resetNextPageNum, hitsPerPage } =
  fetchingGallery();
let userRequest = '';

const galleryLightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

searchForm.addEventListener('submit', async event => {
  event.preventDefault();

  userRequest = event.target.elements.requestValue.value.trim();

  if (!userRequest) {
    return;
  }

  resetNextPageNum();
  clearGallery();
  showLoader(searchForm);
  hideLoadMoreBtn();

  try {
    const { hits: firstPage } = await fetchingGalleryPage(userRequest);

    if (!firstPage.length) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });

      removeLoader();

      return;
    }

    setTimeout(() => {
      renderGallery(firstPage, galleryList);
      galleryLightbox.refresh();

      removeLoader();
      showLoadMoreBtn();
    }, 1000);
  } catch (error) {
    console.error(error);

    iziToast.error({
      message: 'Ooops! Something went wrong. Try again later',
      position: 'topRight',
    });

    removeLoader();
  }

  searchForm.reset();
});

loadMoreBtn.addEventListener('click', async () => {
  showLoader(galleryList);
  hideLoadMoreBtn();

  try {
    const {
      hits: nextPage,
      totalHits,
      nextPageNumber,
    } = await fetchingGalleryPage(userRequest);

    const currentPage = nextPageNumber - 1;
    const totalPages = Math.ceil(totalHits / hitsPerPage);

    if (currentPage > totalPages) {
      iziToast.error({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
      removeLoader();

      return;
    }

    const { height: itemHeight } = document
      .querySelector('.gallery-item')
      .getBoundingClientRect();

    setTimeout(() => {
      removeLoader();

      renderGallery(nextPage, galleryList);
      galleryLightbox.refresh();

      showLoadMoreBtn();
      window.scrollBy(0, itemHeight * 2);
    }, 500);
  } catch (error) {
    console.error(error);

    iziToast.error({
      message: 'Ooops! Something went wrong. Try again later',
      position: 'topRight',
    });

    removeLoader();
  }
});

function showLoader(leftNeighborNode) {
  leftNeighborNode.insertAdjacentHTML(
    'afterend',
    `<span class='loader'></span>`
  );
}

function removeLoader(loaderNode = document.querySelector('.loader')) {
  if (loaderNode) {
    loaderNode.remove();
  }
}

function showLoadMoreBtn() {
  if (loadMoreBtn.classList.contains('visually-hidden')) {
    loadMoreBtn.classList.remove('visually-hidden');
  }
}

function hideLoadMoreBtn() {
  loadMoreBtn.classList.add('visually-hidden');
}

function clearGallery() {
  galleryList.innerHTML = '';
}
