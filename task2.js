const carouselPhotos = document.querySelector('.photos ul');
const carouselArrowPrev = document.querySelector('.prev');
const carouselArrowNext = document.querySelector('.next');

let currentSlide = 0;
const slideWidth = 150; 
const slideCount = carouselPhotos.querySelectorAll('li').length; 
const carouselWidth = slideWidth * slideCount; // загальна ширина каруселі
let autoplayInterval;


const config = { // параметри конфігурації
  duration: 500, 
  autoplay: true, 
  showArrows: true, 
  showDots: true, 
};

function setCarouselWidth() {
  carouselPhotos.style.width = `${carouselWidth}px`;
}

// для переміщення каруселі
function moveCarousel(newSlide) {
  carouselPhotos.style.transition = `margin-left ${config.duration}ms ease`; 
  carouselPhotos.style.marginLeft = `-${newSlide * slideWidth}px`;
  currentSlide = newSlide;
  updateDots(); // оновлення активної крапочки
}

function nextSlide() {
  if (currentSlide === slideCount - 1) {
    moveCarousel(0); // до першого слайду, якшо дійшла до кінця
  } else {
    moveCarousel(currentSlide + 1);
    }
}

function prevSlide() {
  if (currentSlide === 0) {
    moveCarousel(slideCount - 1); 
  } else {
    moveCarousel(currentSlide - 1);
    }
}

function autoplay() {
  autoplayInterval = setInterval(nextSlide, 2000); 
}

function stopAutoplay() {
  clearInterval(autoplayInterval);
}

function createDots() {
  const dotsContainer = document.getElementById("dots");

  for (let i = 0; i < slideCount; i++) {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    dot.addEventListener('click', () => moveCarousel(i));
    dotsContainer.appendChild(dot);
  }

  document.querySelector('.carousel').appendChild(dotsContainer);
  updateDots();
}

function updateDots() {
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, index) => {
    if (index === currentSlide) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

carouselArrowPrev.addEventListener('click', prevSlide);
carouselArrowNext.addEventListener('click', nextSlide);

document.addEventListener('keydown', (event) => {
  if (event.code === 'ArrowLeft') {
    prevSlide();
  } else if (event.code === 'ArrowRight') {
    nextSlide();
  }
});

const carousel = document.querySelector('.carousel');
carousel.addEventListener('mouseover', stopAutoplay);
carousel.addEventListener('mouseleave', autoplay);

setCarouselWidth();
moveCarousel(currentSlide);

if (config.showDots) {
  createDots();
}

if (config.showArrows) {
  carouselArrowPrev.style.display = 'block';
  carouselArrowNext.style.display = 'block';
} else {
  carouselArrowPrev.style.display = 'none';
  carouselArrowNext.style.display = 'none';
}

if (config.autoplay) {
  autoplay();
}