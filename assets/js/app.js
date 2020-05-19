$(function () {
  new WOW().init();

  $(".testimonials").owlCarousel({
    margin: 0,
    loop: true,
    autoplay: true,
    autoplayTimeout: 9000,
    autoplayHoverPause: false,
    responsiveClass: true,
    items: 1,
    nav: false,
  });
  $(".hyperion").owlCarousel({
    margin: 0,
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: false,
    responsiveClass: true,
    items: 1,
    nav: false,
    autoHeight: false,
    autoHeightClass: "owl-height",
  });

  $(".hamburger-btn").click(function () {
    $(".main-header").slideToggle();
  });

  let mainSlider = $(".slider-content").html();
  let mainSliderWidth =
    $(".slider-content .mainSlider img").eq(0).innerWidth() +
    10 +
    ($(".slider-content .mainSlider img").eq(3).innerWidth() + 10) +
    ($(".slider-content .mainSlider img").eq(6).innerWidth() + 10) +
    ($(".slider-content .mainSlider img").eq(7).innerWidth() + 10);
  for (let index = 0; index < 10 ; index++) {
    $(".slider-content").append(mainSlider);
    $(".slider-content .mainSlider")
      .eq(index)
      .css({
        "flex":"0 1 "+mainSliderWidth+'px',
        "width":mainSliderWidth+'px',
        // "transform": "translateX(" + mainSliderWidth * -1 * (index + 1) + "px)",
      });
  }
  $(".slider-content").css({
    "width": mainSliderWidth * 10 + "px",
  });

  $.keyframe.define([{
    name: 'animateSlider',
    '100%': {transform:"translateX(" + mainSliderWidth * -9 + "px)"}
}]);

  $(".slider-content").addClass("init");

//   $(window).on("resize", function () {
//     let mainSliderWidth =
//       $(".slider-content .mainSlider img").eq(0).innerWidth() +
//       10 +
//       ($(".slider-content .mainSlider img").eq(3).innerWidth() + 10) +
//       ($(".slider-content .mainSlider img").eq(6).innerWidth() + 10) +
//       ($(".slider-content .mainSlider img").eq(7).innerWidth() + 10);
//     $(".slider-content").css({
//       transform: "translateX(" + mainSliderWidth * 10 + "px)",
//     });
//     $(".slider-content").removeClass("init");
//     $(".slider-content").addClass("init");
//     console.log(mainSliderWidth);
//   });
  particlesJS("particles-js", {
      "particles": {
          "number": {
              "value": 125,
              "density": {
                  "enable": false,
                  "value_area": 800
              }
          },
          "color": {
              "value": "#000000"
          },
          "shape": {
              "type": "circle",
              "stroke": {
                  "width": 0,
                  "color": "#000000"
              },
              "polygon": {
                  "nb_sides": 5
              },
              "image": {
                  "src": "img/github.svg",
                  "width": 100,
                  "height": 100
              }
          },
          "opacity": {
              "value": 0.5,
              "random": false,
              "anim": {
                  "enable": false,
                  "speed": 1,
                  "opacity_min": 0.1,
                  "sync": false
              }
          },
          "size": {
              "value": 3,
              "random": true,
              "anim": {
                  "enable": false,
                  "speed": 40,
                  "size_min": 0.1,
                  "sync": false
              }
          },
          "line_linked": {
              "enable": true,
              "distance": 150,
              "color": "#000000",
              "opacity": 0.4,
              "width": 1
          },
          "move": {
              "enable": true,
              "speed": 6,
              "direction": "none",
              "random": false,
              "straight": false,
              "out_mode": "out",
              "bounce": false,
              "attract": {
                  "enable": false,
                  "rotateX": 600,
                  "rotateY": 1200
              }
          }
      },
      "interactivity": {
          "detect_on": "canvas",
          "events": {
              "onhover": {
                  "enable": false,
                  "mode": "repulse"
              },
              "onclick": {
                  "enable": true,
                  "mode": "push"
              },
              "resize": true
          },
          "modes": {
              "grab": {
                  "distance": 400,
                  "line_linked": {
                      "opacity": 1
                  }
              },
              "bubble": {
                  "distance": 400,
                  "size": 40,
                  "duration": 2,
                  "opacity": 8,
                  "speed": 3
              },
              "repulse": {
                  "distance": 200,
                  "duration": 0.4
              },
              "push": {
                  "particles_nb": 4
              },
              "remove": {
                  "particles_nb": 2
              }
          }
      },
      "retina_detect": true
  });
});
