function dropdownIn() {
  const dropdowns = document.querySelector(".navigation__dropdowns")

  dropdowns.addEventListener("click", (e) => {
    if (e.target.closest(".navigation__dropdown")) {
      const btn = e.target.closest(".navigation__button")

      const close = e.target.closest(".expand-dropdown__close")
      if (close) {
        e.currentTarget
          .querySelector(".navigation__button--open")
          .classList.remove("navigation__button--open")
      }

      const opened = e.target.closest(".navigation__button--open")

      if (btn) {
        if (opened === btn) {
          btn.classList.remove("navigation__button--open")
        } else {
          const o = e.currentTarget.querySelector(".navigation__button--open")
          if (o) {
            o.classList.remove("navigation__button--open")
          }

          btn.classList.add("navigation__button--open")
        }
      }
    }
  })

  document.body.addEventListener("click", (e) => {
    const t = e.target.closest(".navigation")

    if (t) {
      return
    } else {
      const open = e.currentTarget.querySelector(".navigation__button--open")

      if (open) {
        open.classList.remove("navigation__button--open")
      } else {
        return
      }
    }
  })

  const dropdown = document.querySelector(".navigation__dropdowns")

  document.querySelector(".navbar-toggler").addEventListener("click", (e) => {
    dropdown.classList.toggle("navigation__dropdowns--open")
    e.currentTarget.classList.toggle("navbar-toggler--open")
    document
      .querySelector(".backdrop--dropdown")
      .classList.toggle("backdrop--dropdown--open")
  })
  document
    .querySelector(".backdrop--dropdown")
    .addEventListener("click", (e) => {
      e.target.classList.toggle("backdrop--dropdown--open")
      dropdown.classList.toggle("navigation__dropdowns--open")
      document
        .querySelector(".navbar-toggler")
        .classList.toggle("navbar-toggler--open")
    })
}

function searchFocusOutline() {
  document.body.addEventListener("keyup", (e) => {
    if (e.key === "Tab") {
      const el = document.activeElement
      const inp = document.querySelector(".search__input")
      if (el === inp) {
        el.classList.add("dotted")
      }
    }
  })

  document
    .querySelector(".search__input")
    .addEventListener("blur", (e) => e.target.classList.remove("dotted"))

  document
    .querySelector(".navigation__search")
    .addEventListener("click", openSearch)

  document
    .querySelector(".navigation__button--search")
    .addEventListener("click", openSearch)

  const searchContainer = document.querySelector(".search-container")
  const searchBackdrop = document.querySelector(".search__backdrop")

  searchBackdrop.addEventListener("click", closeBackdrop)
  document
    .querySelector(".search__close")
    .addEventListener("click", closeBackdrop)

  function openSearch() {
    searchContainer.classList.add("search-container--open")

    searchBackdrop.classList.add("search__backdrop--open")
  }

  function closeBackdrop() {
    searchContainer.classList.remove("search-container--open")

    searchBackdrop.classList.remove("search__backdrop--open")
  }
}

function recommendGamesSlider() {
  const gameList = document.querySelector(".recommend__list")

  const recommendPrev = document.querySelector(".recommend__prev")
  const recommendNext = document.querySelector(".recommend__next")

  const gameWidth = gameList.querySelector(".game").clientWidth
  const maxWidth = gameList.scrollWidth - gameList.clientWidth

  function checkScrollPos(cW = 0) {
    if (cW > 0) {
      recommendPrev.classList.remove("hideArrow")
    } else {
      recommendPrev.classList.add("hideArrow")
    }

    if (cW < maxWidth) {
      recommendNext.classList.remove("hideArrow")
    } else {
      recommendNext.classList.add("hideArrow")
    }
  }

  let curW = 0

  checkScrollPos()

  recommendNext.addEventListener("click", (e) => {
    curW += gameWidth
    curW = curW > maxWidth ? maxWidth : curW
    gameList.scrollLeft = curW

    checkScrollPos(curW)
  })

  recommendPrev.addEventListener("click", (e) => {
    curW -= gameWidth
    curW = curW <= 0 ? 0 : curW
    gameList.scrollLeft = curW
    checkScrollPos(curW)
  })
}

let lastW = document.documentElement.offsetWidth + 20
function collapse(elements) {
  // const transitions = elements[0].style.transition
  //let lastW = document.documentElement.offsetWidth + 20
  requestAnimationFrame(function () {
    //console.log(document.documentElement.scrollWidth)

    if (document.documentElement.offsetWidth + 20 > 850) {
      if (lastW <= 850) {
        elements.forEach((el) => {
          el.parentNode.querySelector(
            ".footer-navigation__input"
          ).checked = false
        })
      }
      lastW = document.documentElement.offsetWidth + 20
      return
    } else {
      elements.forEach((element) => {
        let inp = element.parentNode.querySelector(".footer-navigation__input")
        if (inp.checked) {
          return
        }
        element.style.setProperty("--height", element.scrollHeight + 20 + "px")
      })
    }
    lastW = document.documentElement.offsetWidth + 20
  })
}

export { dropdownIn, searchFocusOutline, recommendGamesSlider, collapse }
