export class Slider {
  constructor(images = []) {
    this.images = images
    this.curSlide = 0
    this.totalSlides = 0
    this.slidesPerSlider = 5
    this.touchX = 0
  }

  insertHTML() {
    // console.log(this.images);
    if (this.images.length === 0) {
      document.querySelector(".gallery").style.display = "none"
      return
    }
    const htmlImages = this.images.map((img, i) => {
      return `
        <div class="slider__img">
        <img src="${img.default}" alt="
        screenshot from the game ${i + 1}" data-img='${i}'>
        </div>
        `
    })

    this.totalSlides = Math.ceil(this.images.length / this.slidesPerSlider)
    const htmlSlide = []

    for (let i = 0; i < this.totalSlides; i++) {
      htmlSlide.push(`
        <div class="slider__glide">
        <div class="slider__slide">
          ${htmlImages
            .slice(i * this.slidesPerSlider, (i + 1) * this.slidesPerSlider)
            .join("")}
        </div></div>
        `)
    }

    document
      .querySelector(".slider__glider")
      .insertAdjacentHTML("afterbegin", htmlSlide.join(""))
    this.insertDotsAndArrows()

    document.querySelector(".slider").addEventListener(
      "touchstart",
      (e) => {
        this.touchX = e.changedTouches[0].clientX
      },
      { passive: true }
    )

    document.querySelector(".slider").addEventListener(
      "touchend",
      (e) => {
        const x = e.changedTouches[0].clientX
        console.log(x, this.touchX)
        if (Math.abs(x - this.touchX) > 20) {
          if (x < this.touchX) {
            this.nextSlide()
          } else {
            this.prevSlide()
          }
        }
      },
      { passive: true }
    )
  }

  insertDotsAndArrows() {
    if (this.totalSlides < 2) {
      return
    }
    const dots = []
    for (let i = 0; i < this.totalSlides; i++) {
      dots.push(
        `<div class="slider__dot ${
          i === 0 ? "slider__dot--active" : ""
        }" data-dot='${i}'></div>`
      )
    }

    document
      .querySelector(".slider__controls")
      .insertAdjacentHTML("afterbegin", ` <div class="slider__prev"></div>`)
    document
      .querySelector(".slider__controls")
      .insertAdjacentHTML("beforeend", ` <div class="slider__next"></div>`)

    document
      .querySelector(".slider__dots")
      .insertAdjacentHTML("afterbegin", dots.join(""))

    this.initArrows()
  }

  initArrows() {
    const prev = document.querySelector(".slider__prev")
    const next = document.querySelector(".slider__next")
    this.glider = document.querySelector(".slider__glider")

    // this.slideW = parseInt(getComputedStyle(k).width, 10);
    document.querySelector(".slider__dots").addEventListener("click", (e) => {
      const t = e.target.closest(".slider__dot")

      if (t) {
        this.curSlide = Number(t.dataset.dot)
        this.glider.style.transform = `translateX(${-this.curSlide * 100}%)`
        this.activeDot()
      }
    })

    next.addEventListener("click", this.nextSlide)
    prev.addEventListener("click", this.prevSlide)
  }

  nextSlide = (e) => {
    this.curSlide++
    if (this.curSlide > this.totalSlides - 1) {
      this.curSlide = 0
      this.glider.style.transform = `translateX(0) `
    } else {
      this.glider.style.transform = `translateX(${-this.curSlide * 100.5}%)`
      // 1 + parseInt(getComputedStyle(this.glider).width, 10)
    }
    this.activeDot()
  }

  prevSlide = () => {
    this.curSlide--
    if (this.curSlide < 0) {
      this.curSlide = this.totalSlides - 1

      this.glider.style.transform = `translateX(${-this.curSlide * 100.5}%)`
    } else {
      this.glider.style.transform = `translateX(${this.curSlide * 100.5}%)`
    }

    this.activeDot()
  }

  activeDot = () => {
    document
      .querySelector(".slider__dot--active")
      .classList.remove("slider__dot--active")

    document
      .querySelector(`[data-dot='${this.curSlide}']`)
      .classList.add("slider__dot--active")
  }

  slide = (slide) => {
    this.curSlide = slide
    this.glider.style.transform = `translateX(${-this.curSlide * 100.5}%)`
    this.activeDot()
  }
}
