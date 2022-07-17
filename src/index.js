const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const button = document.querySelector('.carousel-btn');
const catButtons = document.querySelectorAll('.cat-btn');

const slideWidth = slides[0].getBoundingClientRect().width;

const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + 'px';
};

slides.forEach(setSlidePosition);

const handleCarousel = () => {
  const currentSlide = track.querySelector('.current-slide');

  const nextSlide = currentSlide.nextElementSibling;
  const amountToMove = nextSlide.style.left;

  track.style.transform = 'translateX(-' + amountToMove + ')';

  currentSlide.classList.remove('current-slide');
  nextSlide.classList.add('current-slide');
  currentSlide.style.opacity = 0;
  if (nextSlide === slides[slides.length-1]) {
    setTimeout(() => {
      button.disabled = true;
      catButtons.forEach((btn) => {
        btn.disabled = true;
      })
    }, "600")
  }
}


button.addEventListener('click', event => {
  handleCarousel();
})

catButtons.forEach((catBtn) => {
  catBtn.addEventListener('click', event => {
    handleCarousel();
  })
})
