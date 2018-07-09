// import jarallax from "jarallax";
import jarallax from "./jarallax.min.js";
import $ from "jquery";
import CountUp from "countup.js";
import Countdown from "countdown-js";
import waypoints from "../../../node_modules/waypoints/lib/noframework.waypoints";

window.onresize = function() {
    removeLargeStyles();
};

//Preloader

document.onreadystatechange = () => {
    var state = document.readyState;
    if (state == 'interactive') {
         document.getElementById('contents').style.visibility = "hidden";
    } else if (state == 'complete') {
        setTimeout(function(){
            document.getElementById('load').style.opacity = "0";
            document.getElementById('load__animation').style.opacity = "0";
            document.getElementById('contents').style.visibility = "visible";
        }, 2000);
        setTimeout(function(){
            document.getElementById('load').style.display = "none";
            document.getElementById('load__animation').style.display = "none";
        }, 2500)
    }
  }

// Sticky header on scroll

var header = document.querySelector(".main-nav");
var mainMenu = document.querySelector(".main-nav__main-menu");
var mobileWidth = 750;

var stickyHeader = new Waypoint({
    element: document.querySelector(".large-hero__text"),
    handler: function(direction) {
        if (window.innerWidth > mobileWidth && direction == "down") {
            header.classList.add('main-nav--sticky');
            mainMenu.classList.add('main-nav__main-menu--sticky');
            $(header).slideDown(1000);
        } else {
            header.classList.remove('main-nav--sticky');
            mainMenu.classList.remove('main-nav__main-menu--sticky');
            $(header).removeAttr("style");
        }
    }
});

//Mobile Menu

var menuBtn = document.getElementById("main-nav__other__menu-icon");
var mobileNav = document.getElementById("main-nav__nav");
var largeHero = document.getElementById("large-hero");
var dropdownArrows = document.querySelectorAll(".main-nav__arrow");

menuBtn.addEventListener("click", () => {
    if (menuBtn.classList.contains("main-nav__other__menu-icon--close-x")) {
        menuBtn.classList.remove("main-nav__other__menu-icon--close-x");
        largeHero.style.marginTop = "0";
        setTimeout(() => {
            mobileNav.classList.remove("main-nav__nav--mobile");
        }, 1000);
    } else {
        checkSubMenus();
        menuBtn.classList.add("main-nav__other__menu-icon--close-x");
        mobileNav.classList.add("main-nav__nav--mobile");
    }
});

function removeLargeStyles() {
    if (window.innerWidth < mobileWidth) {
        header.classList.remove("main-nav--sticky");
        mainMenu.classList.remove('main-nav__main-menu--sticky');
        menuBtn.classList.remove("main-nav__other__menu-icon--close-x");
        mobileNav.classList.remove("main-nav__nav--mobile");
    }
}

function checkSubMenus() {
    let margin = 340.8;
    for (let dropdownArrow of dropdownArrows) {
        let selectedUl = dropdownArrow.parentNode.nextElementSibling;
        if (selectedUl.classList.contains("main-nav__sub-menu--active")) {
            let addedPixels = selectedUl.childElementCount * 45;
            selectedUl.style.height = `${addedPixels}px`;
            margin += addedPixels;
        }
    }
    largeHero.style.marginTop = `${String(margin)}px`;
}

for (let dropdownArrow of dropdownArrows) {
    dropdownArrow.addEventListener("click", () => {
        let selectedUl = dropdownArrow.parentNode.nextElementSibling;
        if (window.innerWidth < mobileWidth && selectedUl.classList.contains("main-nav__sub-menu--active")) {
            $(selectedUl).animate({
                height: "0px"
            }, 1000, () => {
                selectedUl.classList.remove("main-nav__sub-menu--active");
                checkSubMenus();
            });
        } else if (window.innerWidth < mobileWidth) {
            selectedUl.classList.add("main-nav__sub-menu--active");
            let addedPixels = selectedUl.childElementCount * 45;
            $(selectedUl).animate({
                height: `${addedPixels}px`
            }, 1000, () => {

            });
            checkSubMenus();
        }
    });
}

//Large Hero Slider

var slider = tns({
    container: ".large-hero__slider",
    items: 1,
    slideBy: 1,
    mode: "gallery",
    autoplay: true,
    speed: 2000,
    controlsText: "",
    controlsContainer: ".large-hero__nav",
    nav: false,
    autoplayText: ["", ""],
    autoplayButtonOutput: false,
    autoplayButton: ".large-hero__autoplay",
    autoplayTimeout: 10000
});

//Direction-aware hover

$('.gallery__slider__img').on('mouseenter mouseleave', hoverDirection);
$('.news__items__item__img').on('mouseenter mouseleave', hoverDirection);

function hoverDirection(event) {
  var $overlay = $(this).find('div'),
      side = getMouseDirection(event),
      animateTo,
      positionIn = {
        top: '0%',
        left: '0%'
      },
      positionOut = (function() {
        switch(side) {
          case 0:  return { top: '-100%', left:    '0%' }; break;
          case 1:  return { top:    '0%', left:  '100%' }; break;
          case 2:  return { top:  '100%', left:    '0%' }; break;
          default: return { top:    '0%', left: '-100%' }; break;
        }
      })();
  if ( event.type === 'mouseenter' ) {
    animateTo = positionIn;
    $overlay.css(positionOut);
  } else {
    animateTo = positionOut;
  }
  $overlay.stop(true).animate(animateTo, 200, 'linear');
}

function getMouseDirection(event) {
  var $item = $(event.currentTarget),
      offset = $item.offset(),
      w = $item.outerWidth(),
      h = $item.outerHeight(),
      x = (event.pageX - offset.left - w / 2) * ((w > h) ? h / w: 1),
      y = (event.pageY - offset.top - h / 2) * ((h > w) ? w / h: 1),
      direction = Math.round((Math.atan2(y, x) * (180 / Math.PI) + 180) / 90  + 3) % 4;
  return direction;
}

//Enrollment Slider

var enrollmentSlider = tns({
    container: ".enrollment__steps",
    items: 1,
    slideBy: 1,
    speed: 700,
    controlsText: "",
    controlsContainer: ".enrollment__nav",
    nav: false,
    responsive: {
        448: {
            items: 2
        },
        750: {
            items: 3
        },
        960: {
            items: 4
        }
    }
});

//CountUp

var itemActivities = document.getElementById("item-activities"),
    countActivities = 75,
    itemLessons = document.getElementById("item-lessons"),
    countLessons = 237,
    itemTeachers = document.getElementById("item-teachers"),
    countTeachers = 32,
    itemPencils = document.getElementById("item-pencils"),
    countPencils = 457,
    counterArea = document.querySelector(".current-count");

var options = {
      useEasing: true,
      useGrouping: true,
      separator: '',
      decimal: '.',
  };
  
function createCounter(item, count) {
      var countUp = new CountUp(item, 0, count, 0, 2, options);
      if (!countUp.error) {
          countUp.start();
      } else {
          console.error(countUp.error);
      }
  }

function createAllCounters() {
    createCounter(itemActivities, countActivities);
    createCounter(itemLessons, countLessons);
    createCounter(itemTeachers, countTeachers);
    createCounter(itemPencils, countPencils); 
}

let done = false;

new Waypoint({
    element: counterArea,
    handler: function() {
        if (!done) {
            done = true;
            createAllCounters();
        }
    },
    offset: "70%"
});

//Countdown

var end = new Date("November 18, 2018 08:30:00");
var secs = document.getElementById("time-seconds");
var mins = document.getElementById("time-minutes");
var hours = document.getElementById("time-hours");
var days = document.getElementById("time-days");

var timer = Countdown.timer(end, function(timeLeft) {
    secs.innerText = timeLeft.seconds;
    mins.innerText = timeLeft.minutes;
    hours.innerText = timeLeft.hours;
    days.innerText = timeLeft.days;
    setTimeout(timer, 1000);
});

timer();

//Parallax scrolling

jarallax(document.querySelectorAll('.jarallax'), {
    disableParallax: function () {
        return /iPad|iPhone|iPod|Android/.test(navigator.userAgent);
    },
    disableVideo: function () {
        return /iPad|iPhone|iPod|Android/.test(navigator.userAgent);
    }
});