import jarallax from "jarallax";
import $ from "jquery";
import CountUp from "countup.js";
import Countdown from "countdown-js";
import waypoints from "../../../node_modules/waypoints/lib/noframework.waypoints";

window.onload = function() {
  imageZoom();
}

//Mobile Menu

var menuBtn = document.querySelector(".main-nav__other__menu-icon");

menuBtn.addEventListener("click", function() {
    if (menuBtn.classList.contains("main-nav__other__menu-icon--close-x")) {
        menuBtn.classList.remove("main-nav__other__menu-icon--close-x");
    } else {
        menuBtn.classList.add("main-nav__other__menu-icon--close-x");
    }
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

//Image Zoom

function imageZoom() {
  var images = document.querySelectorAll(".image-zoom");
  for (var i = 0; i < images.length; i++) {
    images[i].classList.add("image-zoom--active");
  }
}

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
  
  new Waypoint({
      element: counterArea,
      handler: function() {
          createCounter(itemActivities, countActivities);
          createCounter(itemLessons, countLessons);
          createCounter(itemTeachers, countTeachers);
          createCounter(itemPencils, countPencils);
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

