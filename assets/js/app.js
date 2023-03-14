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
  setTimeout(() => {
    new Typed(".typed", {
      strings: ["We believe intelligence makes lives better."],
      loop: false,
      backDelay: 1000,
      typeSpeed: 60,
      backSpeed: 30,
      contentType: "html",
    });
  }, 1000)

  // var prevScroll = 0
  // window.addEventListener('scroll', e => {
  //   console.log("SCROLL", document.documentElement.scrollTop)
  //   const direction = prevScroll > document.documentElement.scrollTop ? 1: -1
  //   prevScroll = document.documentElement.scrollTop
  //   if (document.documentElement.scrollTop < 350) {
  //     $('.footer-info').css('transform', `translateY(${direction*20}px)`)
  //   }
  // })
                  
  // var parallax = $('#scene').parallax();

  for (var i = 1; i < 6; i++) {
    // twinkleLoop(i);
  };

  var speed = 400;

  function twinkleLoop(i) {
    var duration = ((Math.random() * 5) + 3)
    duration = duration - ((495 - speed)/100)
    twinkle(i, duration)
    console.log("twinkleloop called", duration)
  
    setTimeout(function() {
      twinkleLoop(i)
    }, duration * 1000);
  }

  function twinkle(id, duration) {
    var top = (Math.floor(Math.random() * 85) + 0) + '%';
    var left = (Math.floor(Math.random() * 85) + 0) + '%';
    console.log("twinkle called", top, left)

    $('#speck' + id).remove();
    $('#specks').append("<div class='speck' id='speck" + id + "'></div>")
    $('#speck' + id).css({
      'top': top,
      'left': left,
      'animation-duration': duration + 's',
      'animation-timing-function': 'cubic-bezier(0.250, 0.250, 0.750, 0.750)',
      'animation-name': 'twinkle',
    })
  }

  // setInterval(() => {
  //   $('.dust-img').css({
  //     'top': '-85px',
  //     'left': '-80px',
  //   });
  //   console.log("SHOULD SET")
  // }, 2000)

  /**
  particlesJS("particles-js", {
    particles: {
      number: {
        value: 125,
        density: {
          enable: false,
          value_area: 800,
        },
      },
      color: {
        value: "#000000",
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#000000",
        },
        polygon: {
          nb_sides: 5,
        },
        image: {
          src: "img/github.svg",
          width: 100,
          height: 100,
        },
      },
      opacity: {
        value: 0.5,
        random: false,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.1,
          sync: false,
        },
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: false,
          speed: 40,
          size_min: 0.1,
          sync: false,
        },
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#000000",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 6,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200,
        },
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: false,
          mode: "repulse",
        },
        onclick: {
          enable: true,
          mode: "push",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 400,
          line_linked: {
            opacity: 1,
          },
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 8,
          speed: 3,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
        push: {
          particles_nb: 4,
        },
        remove: {
          particles_nb: 2,
        },
      },
    },
    retina_detect: true,
  }); */
});


var prevScroll = 0
function parallax() {
  if (document.documentElement.scrollTop < 100 && Math.abs(document.documentElement.scrollTop - prevScroll) > 5) {
    console.log("transform", document.documentElement.scrollTop)
    const direction = prevScroll > document.documentElement.scrollTop ? 1: -1
    $('#footer-info').css('transform', `translateY(${direction*10}px)`)
  }
    prevScroll = document.documentElement.scrollTop
}