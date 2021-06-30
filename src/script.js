import "./styles/style.scss"

import * as img1 from "./assets/images/screenshot01.jpg"
import * as img2 from "./assets/images/screenshot02.jpg"
import * as img3 from "./assets/images/screenshot03.jpg"
import * as img4 from "./assets/images/screenshot04.jpg"
import * as img5 from "./assets/images/screenshot05.jpg"
import * as img6 from "./assets/images/screenshot06.webp"

import * as img1_big from "./assets/images/screenshot01-big.jpg"
import * as img2_big from "./assets/images/screenshot02-big.jpg"
import * as img3_big from "./assets/images/screenshot03-big.jpg"
import * as img4_big from "./assets/images/screenshot04-big.jpg"
import * as img5_big from "./assets/images/screenshot05-big.jpg"
import * as img6_big from "./assets/images/screenshot06-big.jpg"

import { Slider } from "./screenshotsSlider"
import { DialogSlider } from "./DialogSlider"
import { HeartComponent } from "./HeartComponent"
import {
  dropdownIn,
  searchFocusOutline,
  recommendGamesSlider,
  collapse,
} from "./utils.js"

dropdownIn()
searchFocusOutline()
recommendGamesSlider()

const slider = new Slider([img1, img2, img3, img4, img5, img6])
//const slider = new Slider([img1, img2, img3, img4, img5, img6])
slider.insertHTML()

if (!customElements.get("btn-heart")) {
  customElements.define("btn-heart", HeartComponent)
}

const elems = Array.from(document.querySelectorAll(".footer-navigation__links"))

collapse(elems)
window.addEventListener("resize", () => {
  collapse(elems)
})

const dialogSlider = new DialogSlider(
  [img1_big, img2_big, img3_big, img4_big, img5_big, img6_big],
  slider
)

dialogSlider.init()
