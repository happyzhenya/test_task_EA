document.addEventListener("DOMContentLoaded", function () {
  const deadline = new Date(2023, 05, 31);
  let timerId = null;

  const daysTimer = document.querySelector(".timer__day");
  const hoursTimer = document.querySelector(".timer__hour");
  const minutesTimer = document.querySelector(".timer__minute");
  const secondsTimer = document.querySelector(".timer__second");

  const btnSubmit = document.querySelector(".form__submit");
  const emailInput = document.querySelector(".form__input");
  const popup = document.getElementById("popup");
  const body = document.querySelector("body");

  const construction = document.querySelector(".construction");
  construction.classList.add("construction-animate");

  const timer = document.querySelector(".timer");
  timer.classList.add("construction-animate");

  const logo = document.querySelector(".logo");
  logo.classList.add("construction-animate");

  const eventAnim = document.querySelector(".event");
  eventAnim.classList.add("construction-animate");

  const constBody = document.querySelector(".container__body");
  constBody.classList.add("construction-animate2");

  function calcData() {
    const diff = deadline - new Date();
    if (diff <= 0) {
      clearInterval(timerId);
    }
    const days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0;
    const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
    const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
    const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;

    daysTimer.textContent = days < 10 ? "0" + days : days;
    hoursTimer.textContent = hours < 10 ? "0" + hours : hours;
    minutesTimer.textContent = minutes < 10 ? "0" + minutes : minutes;
    secondsTimer.textContent = seconds < 10 ? "0" + seconds : seconds;

    daysTimer.textContent = days;
    hoursTimer.textContent = hours;
    minutesTimer.textContent = minutes;
    secondsTimer.textContent = seconds;
  }

  calcData();
  timerId = setInterval(calcData, 1000);

  /********************************* */
  function submitHandler(e) {
    e.preventDefault();

    let request = new XMLHttpRequest();
    request.open(this.method, this.action, true);
    request.setRequestHeader(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );

    var data = new FormData(this);
    for (var key of data.keys()) console.log(key, data.get(key));

    request.onreadystatechange = function () {
      console.log("readyState=", this.readyState, "status=", this.status);
      if (this.readyState === 4 && this.status === 200) {
        createPopupSucces("yes");
        closePopup();
        popup.style.display = "flex";
        document.body.style.overflow = "hidden";
      } else {
        createPopupSucces("no");
        closePopup();
        popup.style.display = "flex";
        document.body.style.overflow = "hidden";
        // alert("Error Code: " + request.status);
        //alert("Error Message: " + request.statusText);
      }
    };
    request.send(data);
  }

  document
    .querySelector(".form-email")
    .addEventListener("submit", submitHandler);

  function createPopupSucces(flag) {
    if (flag == "yes") {
      popup.innerHTML = `
  <div class="container__popup">
   <div class="popup-content">
   <h3 class="popup-title">Success!</h3>
   <p class="popup-text">You  have successfully subscribed to the email newsletter</p>
   <button class="popup-button">Close</button>
      <div class="popup_close" id="close_popup"><img src="/test_task_EA/images/close.svg" alt=""></div>
    </div>
              
  </div>
  `;
    } else {
      popup.innerHTML = `
    <div class="container__popup">
     <div class="popup-content">
     <h3 class="popup-title">Error!</h3>
     <p class="popup-text">You have not subscribed to the email newsletter</p>
     <button class="popup-button">Close</button>
        <div class="popup_close" id="close_popup"><img src="/test_task_EA/images/close.svg" alt=""></div>
      </div>
                
    </div>
    `;
    }

    let clsPopup = document.getElementById("close_popup");
    clsPopup.addEventListener("click", () => {
      popup.style.display = "none";
      document.body.style.overflow = "";
    });

    let btnClosePopup = document.querySelector(".popup-button");
    btnClosePopup.addEventListener("click", () => {
      popup.style.display = "none";
      document.body.style.overflow = "";
    });
  }

  function closePopup() {
    popup.addEventListener("click", (e) => {
      if (e.target.classList == "popup") {
        popup.style.display = "none";
        document.body.style.overflow = "";
      }
    });
  }

  function look(elemId) {
    var elem = document.getElementById(elemId);
    const containerBody = document.getElementById("ctn-body");
    const containerFooter = document.getElementById("ctn-footer");

    elem.style.display === "none"
      ? (elem.style.display = "flex") &&
        (containerBody.style.paddingBottom = "1191px") &&
        (containerFooter.style.minHeight = "1194px") &&
        elem.scrollIntoView({ behavior: "smooth", block: "start" })
      : (elem.style.display = "none") &&
        (containerBody.style.paddingBottom = "191px") &&
        (containerFooter.style.minHeight = "194px") &&
        elem.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const btnMore = document.querySelector(".button__more-event");
  btnMore.addEventListener("click", function (e) {
    e.preventDefault();
    look("event");
    btnMore.classList.toggle("up");
  });

  const slides = document.querySelectorAll(".slide");

  const images = [
    "/test_task_EA/images/foto/img_9678.png",
    "/test_task_EA/images/foto/2.png",
    "/test_task_EA/images/foto/3.png",
    "/test_task_EA/images/foto/4.png",
    "/test_task_EA/images/foto/5.png",
    "/test_task_EA/images/foto/6.png",
    "/test_task_EA/images/foto/7.png",
    "/test_task_EA/images/foto/8.png",
  ];

  const sliderContent = document.querySelectorAll(".slider__content");

  slides.forEach((slide, index) => {
    slide.style.backgroundImage = `url(${images[index]})`;

    slide.addEventListener("click", () => {
      slides.forEach((el) => {
        if (el.classList.contains("active") && el != slide) {
          el.classList.remove("active");
        }
        sliderContent.forEach((item, j) => {
          if (index == j && el.classList.contains("active") === false) {
            item.classList.add("active");
          } else {
            item.classList.remove("active");
          }
        });
      });

      if (slide.classList.contains("active")) {
        slide.classList.remove("active");
      } else {
        slide.classList.add("active");
      }
    });
  });
});
