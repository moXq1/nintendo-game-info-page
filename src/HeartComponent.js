import * as heartImg from "./assets/images/heart-outline.svg"

function template() {
  const btn = document.createElement("button")

  const html = `
  <style>
  .heart{
    width: 23px;
    height: 23px;
    position: relative;
    margin-bottom: 0.2rem;
  cursor:pointer;
  }
  
    .heart img{
      width: 100%;
      height: 100%;
      transition: filter 0.15s ease-in-out;
      filter: invert(17%) sepia(88%) saturate(5644%) hue-rotate(348deg)
        brightness(85%) contrast(116%) grayscale(0);
  }
  .heart:hover img{
          
            filter: invert(12%) sepia(66%) saturate(6500%) hue-rotate(349deg)
              brightness(73%) contrast(110%);
       
        }
  
        
  
        .stripe{
          position: absolute;
  
          width: 2px;
          height: 7px;
          background-color: #ac000d;
          left: calc(50% - 1px);
          top: calc(50% - 4px);
          transition: transform 0.3s ease-in-out;
          transform: rotate(calc(calc(360deg/ 8)  * var(--stripe))) translateY(-20px) scaleY(0);
        }
  
        .heart:hover .stripe{
          animation: stp 0.5s ease-in-out;
        }
  
  
        .stripe:nth-of-type(1){
          --stripe: 1;
        }
        .stripe:nth-of-type(2){
          --stripe: 2;
        }
        .stripe:nth-of-type(3){
          --stripe: 3;
        }
        .stripe:nth-of-type(4){
          --stripe: 4;
        }
        .stripe:nth-of-type(5){
          --stripe: 5;
        }
        .stripe:nth-of-type(6){
          --stripe: 6;
        }
        .stripe:nth-of-type(7){
          --stripe: 7;
        }
        .stripe:nth-of-type(8){
          --stripe: 8;
        }
  
  
        @keyframes stp {
          0% {
            transform: rotate(calc(calc(360deg/ 8)  * var(--stripe))) translateY(-20px) scaleY(0);
          }
          50%,
          70% {
            transform: rotate(calc(calc(360deg/ 8)  * var(--stripe))) translateY(-20px) scaleY(1);
          }
      
          100% {
            transform: rotate(calc(calc(360deg/ 8)  * var(--stripe))) translateY(-20px) scaleY(0);
          }
        }
  
  
  </style>
  
    <div class="heart">
               
    <span class="stripe"></span>
  <span class="stripe"></span>
  <span class="stripe"></span>
  <span class="stripe"></span>
  <span class="stripe"></span>
  <span class="stripe"></span>
  <span class="stripe"></span>
  <span class="stripe"></span>
  
  
  <img src="${heartImg.default}" alt="heart icon">
  </div>
    `

  btn.innerHTML = html

  Object.assign(btn.style, {
    border: "none",
    background: "transparent",
    padding: "0",
    height: "40px",
  })

  return btn
}

export class HeartComponent extends HTMLElement {
  constructor() {
    super()

    this.btn = template().cloneNode(true)
  }

  connectedCallback() {
    let shadow = this.attachShadow({ mode: "open" })
    shadow.appendChild(this.btn)
  }
}
