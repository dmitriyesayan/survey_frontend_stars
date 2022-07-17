const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const button = document.querySelector('.carousel-btn');
const stars = document.querySelector(".stars");
const starsArray = Array.from(stars.children);

const slideWidth = slides[0].getBoundingClientRect().width;

const mediaQuery = window.matchMedia('(max-width: 768px)')

// Arranging slides next to each other
const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + 'px';
};
slides.forEach(setSlidePosition);

// Function to move the slides
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
    }, "600")
  }
}

//Event listener to turn stars yellow upon hovering for larger devices
if (!mediaQuery.matches) {
  stars.addEventListener('mouseover', (event) => {
    const mousePosition = event.clientX;

    starsArray.forEach((star) => {
      let starPosition = star.getBoundingClientRect().x
      if (mousePosition >= starPosition) {
        star.classList.add("star-yellow");
      } else {
        star.classList.remove("star-yellow");
      }
    })
  })

  //Event listener to turn stars back to white when the mouse is not hovering
  stars.addEventListener('mouseout', (event) => {
    starsArray.forEach((star) => {
      star.classList.remove("star-yellow");
    })
  })

}


//Event listener to move the slide upon clicking on the star
starsArray.forEach((star) => {
  star.addEventListener('click', (event) => {
    // For small devices stars become yellow based on click instead of hover
    if (mediaQuery.matches) {
      const index = star.dataset.indexNumber;
      starsArray.slice(0,index).forEach((s) => {
        s.classList.add("star-yellow");
        setTimeout(() => {
          s.classList.remove("star-yellow")
        }, "600")
      })
    }
    handleCarousel();
  })
})

//Event listener to move the slide upon clicking the next button
button.addEventListener('click', event => {
  handleCarousel();
})
