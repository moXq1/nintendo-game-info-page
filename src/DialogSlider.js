export class DialogSlider {
  constructor(imgs, slider) {
    this.imgs = imgs
    this.curImg = null
    this.boundImg = null
    this.item = null
    this.boundItem = null
    this.curImgIndex = 0
    this.curImgBig = null
    this.curSlide = 0
    this.fullscreenOn = false
    this.imgScaledUp = false
    this.touchX = 0
    this.dragX = 0
    this.dragY = 0
    this.curImgTop = 0
    this.curImgLeft = 0
    this.dragging = false
    this.parentContainer = document.querySelector(".dialog")
    this.slider = slider
  }

  show = (e) => {
    const im = e.target.closest(".slider__img")
    if (im) {
      this.curImg = e.target.closest(".slider__img").querySelector("img")

      this.boundImg = this.curImg.getBoundingClientRect()

      this.parentContainer.style.display = "block"

      this.item = document.querySelector(".dialog__img")
      this.boundItem = this.item.getBoundingClientRect()

      const { scaleX, scaleY } = this.scale()

      this.curImgBig = document.createElement("img")

      this.curImgIndex = this.curImg.dataset.img

      this.curImgBig.src = this.imgs[this.curImgIndex].default
      Object.assign(this.curImgBig.style, {
        position: "absolute",
        top: this.boundImg.y + "px",
        left: this.boundImg.x + "px",
        transform: `scale(${scaleX}%,${scaleY}%)`,
        transition: "transform 2s ease",
      })

      this.item.insertAdjacentElement("afterbegin", this.curImgBig)

      this.curImgBig.classList.add("anim-in")
      document.querySelector(".dialog__bk").style.opacity = 1
      this.oneOf()

      this.curSlide = Math.ceil(this.imgs.length - 1 / this.curImgIndex)
      setTimeout(() => {
        this.parentContainer.focus()
        this.dragEV()
      }, 100)
    } else {
      return
    }
  }

  dragEV = () => {
    document
      .querySelector(".dialog__img")
      .addEventListener("mousedown", (e) => {
        e.preventDefault()

        if (this.imgScaledUp) {
          this.curImgTop = this.boundImg.y
          this.curImgLeft = this.boundImg.x
          e.currentTarget.style.transformOrigin = `${e.clientX}px
           ${e.clientY}px`
          this.dragX = e.clientX
          this.dragY = e.clientY
          this.dragging = true
        } else {
          return
        }
      })

    window.addEventListener("mouseup", (e) => {
      if (this.dragging) {
        document.querySelector(
          ".dialog__img"
        ).style.transform = `translate(${0}px,${0}px) scale(1.4)`
        this.dragging = false
      }
      return
    })

    document
      .querySelector(".dialog__img")
      .addEventListener("mousemove", (e) => {
        if (this.dragging) {
          e.currentTarget.style.transform = `translate(${
            this.dragX - e.clientX
          }px,${this.dragY - e.clientY}px) scale(1.4)`
        } else {
          return
        }
      })
  }

  scale() {
    const scaleX = (this.boundImg.width * 100) / this.boundItem.width
    const scaleY = (this.boundImg.height * 100) / this.boundItem.height

    return { scaleX, scaleY }
  }

  oneOf() {
    document.querySelector(".dialog__number").textContent = `${
      Number(this.curImgIndex) + 1
    }/${this.imgs.length}`
  }

  init() {
    document
      .querySelector(".slider__glider")
      .addEventListener("click", this.show)

    document.querySelector(".dialog__next").addEventListener("click", this.next)
    document.querySelector(".dialog__prev").addEventListener("click", this.prev)

    document.querySelector(".dialog__exit").addEventListener("click", this.exit)

    document.querySelector(".dialog__bk").addEventListener("click", this.exit)
    document
      .querySelector(".dialog__fullscreen")
      .addEventListener("click", (e) => {
        if (!this.fullscreenOn) {
          this.parentContainer.requestFullscreen()
          this.fullscreenOn = true
          e.currentTarget.classList.add("dialog__fullscreen--active")
        } else {
          document.exitFullscreen()
          this.fullscreenOn = false
          e.currentTarget.classList.remove("dialog__fullscreen--active")
        }
      })

    document.querySelector(".dialog__scale").addEventListener("click", (e) => {
      if (!this.imgScaledUp) {
        this.imgScaledUp = true
      } else {
        this.imgScaledUp = false
        document.querySelector(".dialog__img").style.transform = ""
      }

      e.currentTarget.classList.toggle("dialog__scale--active")
      document
        .querySelector(".dialog__img")
        .classList.toggle("dialog__img--scale")
    })

    document.querySelector(".dialog__img").addEventListener(
      "touchstart",
      (e) => {
        this.touchX = e.changedTouches[0].clientX
      },
      { passive: true }
    )
    document.querySelector(".dialog__img").addEventListener(
      "touchend",
      (e) => {
        const touchEndX = e.changedTouches[0].clientX

        if (Math.abs(touchEndX - this.touchX) > 50) {
          if (touchEndX < this.touchX) {
            this.next()
          } else {
            this.prev()
          }
        }
      },
      { passive: true }
    )

    this.parentContainer.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        this.prev()
      }
      if (e.key === "ArrowRight") {
        this.next()
      }
    })
    // document.querySelector(".dialog").addEventListener("click", (e) => {
    //   console.log(e.target)
    // })
  }

  next = () => {
    this.curImgIndex++
    this.curImgIndex =
      this.curImgIndex > this.imgs.length - 1 ? 0 : this.curImgIndex
    this.curImgBig.src = this.imgs[this.curImgIndex].default
    this.curSlide = Math.floor((this.curImgIndex + 1) / this.imgs.length)
    this.oneOf()
    console.log(this.curSlide)
    this.slider.slide(this.curSlide)
  }

  prev = () => {
    this.curImgIndex--
    this.curImgIndex =
      this.curImgIndex < 0 ? this.imgs.length - 1 : this.curImgIndex
    this.curImgBig.src = this.imgs[this.curImgIndex].default
    this.curSlide = Math.floor((this.curImgIndex + 1) / this.imgs.length)
    this.oneOf()
    this.slider.slide(this.curSlide)
  }

  exit = () => {
    this.parentContainer.style.display = "none"
    this.curImg = null
    this.boundImg = null
    this.item = null
    this.boundItem = null
    this.curImgIndex = 0
    this.curImgBig.remove()
    this.curImgBig = null
    this.curSlide = 0
  }
}
