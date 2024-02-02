import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById('container');
  const containerLoader = document.getElementById('container-loader');
  let galleryItem;

  let totalHits;
  let defaultImages = [];
  let page = 1;
  let searchResult;
  removeLoader(containerLoader);

  const formSearching = document.getElementById('formSearching');
  const loadMoreBtn = document.createElement('button');
  const inputSearch = document.getElementById('inputSearch');
  const gallery = document.getElementById('gallery');

  loadMoreBtn.textContent = 'Load more';
  loadMoreBtn.classList.add('load-more-btn');
  loadMoreBtn.id = 'load-more';

  const apiKey = '42167626-5dd4d1124df4d491f669cdb42';

  formSearching.addEventListener('submit', function (e) {
    e.preventDefault();
    defaultImages = [];

    addLoader(containerLoader);
    if (defaultImages.length) {
      removeLoadBtn();
    }

    searchResult = inputSearch.value.trim();
    if (!searchResult) {
      iziToast.error({
        title: 'Error',
        message: 'The field is not allowed to be empty ',
        position: 'topRight',
      });
      removeLoader(containerLoader);
      return;
    }
    page = 1;
    getGallery();
  });

  loadMoreBtn.addEventListener('click', async () => {
    page++;
    await getGallery();

    const galleryItems = document.querySelectorAll('.gallery-item');
    const lastGalleryItem = galleryItems[galleryItems.length - 1];
    const height = lastGalleryItem.getBoundingClientRect().height * 2;

    window.scrollBy({
      top: height,
      behavior: 'smooth',
    });
  });

  async function getGallery() {
    const apiUrl = 'https://pixabay.com/api/';
    const requestData = {
      key: apiKey,
      q: searchResult,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 15,
      page,
    };
    galleryItem = document.getElementById('gallery-item');
    try {
      const response = await axios.get(
        `${apiUrl}?${new URLSearchParams(requestData)}`
      );
      if (response.data.hits.length === 0) {
        iziToast.error({
          title: 'Error',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });

        if (!defaultImages.length) {
          gallery.innerHTML = '';
          return;
        }
        removeLoadBtn();
        return;
      }
      totalHits = response.data.totalHits;
      renderImages(response.data.hits);
    } catch (error) {
      iziToast.error({
        title: 'Error',
        message: 'Something went wrong. Please try again later.',
        position: 'topRight',
      });
      removeLoadBtn();
    } finally {
      removeLoader(containerLoader);
    }
  }

  function removeLoadBtn() {
    container.removeChild(loadMoreBtn);
  }

  function addLoadBtn() {
    containerLoader.before(loadMoreBtn);
  }

  function removeLoader(containerLoader) {
    if (containerLoader) {
      containerLoader.style.display = 'none';
    }
  }

  function addLoader(containerLoader) {
    if (containerLoader) {
      containerLoader.style.display = 'block';
    }
  }
  function renderImages(images) {
    const newArray = defaultImages.concat(images);
    const newListImage = newArray.map(
      image =>
        `
        <div class="gallery-item" id="gallery-item">
      <a href="${image.largeImageURL}" data-lightbox="gallery" data-title="Likes: ${image.likes}, Views: ${image.views}, Comments: ${image.comments}, Downloads: ${image.downloads}">
          <img src="${image.webformatURL}" alt="${image.tags}" data-src="${image.largeImageURL}" data-caption="Likes: ${image.likes}, Views: ${image.views}, Comments: ${image.comments}, Downloads: ${image.downloads}">
        </a>
        <div class="image-block">
      <div class="block-item">
        <p class="block-label">Likes:</p>
        <p class="block-value">${image.likes}</p>
      </div>
      <div class="block-item">
        <p class="block-label">Views:</p>
        <p class="block-value">${image.views}</p>
      </div>
      <div class="block-item">
        <p class="block-label">Comments:</p>
        <p class="block-value">${image.comments}</p>
      </div>
      <div class="block-item">
        <p class="block-label">Downloads:</p>
        <p class="block-value">${image.downloads}</p>
      </div>
    </div>
    </div>
      `
    );

    gallery.innerHTML = newListImage.join('');
    defaultImages = newArray;

    if (newArray.length === totalHits) {
      if (document.getElementById('load-more')) {
        removeLoadBtn();
      }
      iziToast.error({
        title: 'Error',
        message: `We're sorry, but you've reached the end of search results.`,
        position: 'topRight',
      });
    } else {
      addLoadBtn();
    }

    const lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
    lightbox.refresh();
  }
});
