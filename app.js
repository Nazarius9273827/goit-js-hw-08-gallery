const galleryItems = [
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
        description: 'Hokkaido Flower',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
        description: 'Container Haulage Freight',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
        description: 'Aerial Beach View',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
        description: 'Flower Blooms',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
        description: 'Alpine Mountains',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
        description: 'Mountain Lake Sailing',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
        description: 'Alpine Spring Meadows',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
        description: 'Nature Landscape',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
        description: 'Lighthouse Coast Sea',
    },
];

const galleryContainer = document.querySelector('.js-gallery');
const galleryMarkup = createGalleryMarkup(galleryItems);

galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);

function createGalleryMarkup(items) {
    return items.map(({ preview, original, description }) => {
        return `
      <li class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </li>
    `;
    }).join('');
}

galleryContainer.addEventListener('click', onGalleryItemClick);

function onGalleryItemClick(event) {
    event.preventDefault();

    const isImage = event.target.classList.contains('gallery__image');

    if (!isImage) {
        return;
    }

    const originalImageUrl = event.target.dataset.source;
    openModal(originalImageUrl);
}

const modal = document.querySelector('.js-lightbox');
const modalImage = document.querySelector('.lightbox__image');

function openModal(url) {
    modal.classList.add('is-open');
    modalImage.src = url;
    modalImage.alt = event.target.alt;
}

const closeModalBtn = document.querySelector('[data-action="close-lightbox"]');
closeModalBtn.addEventListener('click', closeModal);

function closeModal() {
    modal.classList.remove('is-open');
    modalImage.src = '';
    modalImage.alt = '';
}

const overlay = document.querySelector('.lightbox__overlay');
overlay.addEventListener('click', closeModal);

window.addEventListener('keydown', onEscKeyPress);

function onEscKeyPress(event) {
    if (event.code === 'Escape') {
        closeModal();
    }
}

window.addEventListener('keydown', onArrowKeyPress);

function onArrowKeyPress(event) {
    let currentIndex = galleryItems.findIndex(item => item.original === modalImage.src);

    if (event.code === 'ArrowRight') {
        currentIndex = (currentIndex + 1) % galleryItems.length;
    } else if (event.code === 'ArrowLeft') {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    } else {
        return;
    }

    modalImage.src = galleryItems[currentIndex].original;
    modalImage.alt = galleryItems[currentIndex].description;
}
