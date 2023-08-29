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
    const TYPED_STRINGS = [
      "We believe intelligence makes lives better.",
      "We build the future.",
      "We bridge the gap between human and machine.",
      "We unlock the limitless potential of AI.",
      "We commit to responsible AI, shaping a better world for all.",
      "We fuel innovation with data-driven insights.",
      "We empower businesses and individuals to thrive in a digital age.",
      "Together, we propel humanity forward with the power of artificial intelligence.",
    ]
    new Typed(".typed", {
      strings: TYPED_STRINGS,
      loop: true,
      backDelay: 1000,
      typeSpeed: 60,
      backSpeed: 0,
      fadeOutDelay: 0,
      contentType: "html",
      smartBackspace: false,
      // onStringTyped: (arrayPos, self) => {
      // }
    });
  }, 1000)

  /** Three.JS circle animation */
  const container = document.getElementById("particles-js");
  const myCircleAnimation = new CircleAnimation(container);
  myCircleAnimation.loadAssets().then(myCircleAnimation.init);
  var prevWidth = window.innerWidth

  $(window).resize(function() {
    if ($(window).width() > 990) {
      $(".main-header").show()
    } else {
      $(".main-header").hide()
    }
    // iOS somehow call onresize when scrolling on certain point, temporary fix
    if (Math.abs(prevWidth - window.innerWidth) > 100) {
      prevWidth = window.innerWidth
      myCircleAnimation.onWindowResize()
    }
   })
  // if (module && module.hot) {
  //   // module.hot.accept((a, b) => {
  //   //   // For some reason having this function here makes dat gui work correctly
  //   //   // when using hot module replacement
  //   // });
  //   module.hot.dispose(() => {
  //     if (myCircleAnimation) myCircleAnimation.dispose();
  //   });
  // }

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

  parseRSSXML()
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
    const direction = prevScroll > document.documentElement.scrollTop ? 1: -1
    $('#footer-info').css('transform', `translateY(${direction*10}px)`)
  }
    prevScroll = document.documentElement.scrollTop
}

async function downloadRSSFile() {
  // const xmlUrl = "/beehiv-coreintelligence.xml";
  const xmlUrl = "https://app.painta.io/rss-core/xml";
  // const xmlUrl = "https://rss.beehiiv.com/feeds/kfCZgEpgyw.xml";
  let xmlString
  try {
    const response = await fetch(xmlUrl);
    xmlString = await response.text();
  } catch(err) {
    const response = await fetch("/beehiv-coreintelligence.xml");
    xmlString = await response.text();
  }
  return xmlString
}

function getXMLString() {
  

}

async function parseRSSXML() {
  // Parse XML using DOMParser
  const parser = new DOMParser();
  const xmlString = await downloadRSSFile();
  
  const xmlDoc = parser.parseFromString(xmlString, "text/xml");
  // Extract information from XML
  const title = xmlDoc.querySelector("channel > title").textContent;
  const description = xmlDoc.querySelector("channel > description").textContent;
  const link = xmlDoc.querySelector("channel > link").textContent;
  const lastBuildDate = xmlDoc.querySelector("channel > lastBuildDate").textContent;

  // Populate items array
  // const items = Array.from(xmlDoc.querySelectorAll("item")).map((item) => {
  //   const itemTitle = item.querySelector("title").textContent;
  //   const itemDescription = item.querySelector("description").textContent;
  //   const itemLink = item.querySelector("link").textContent;
  //   const itemPubDate = item.querySelector("pubDate").textContent;
  //   // const itemCreator = item.querySelector("dc\\:creator").textContent;
  //   const itemEncodedContent = item.querySelector("content\\:encoded");
    
  //   console.log('item', item.querySelector("content\\:encoded"))
  //   return {
  //     title: itemTitle,
  //     description: itemDescription,
  //     link: itemLink,
  //     pubDate: itemPubDate,
  //     creator: 'itemCreator',
  //     // creator: itemCreator,
  //     // encodedContent: itemEncodedContent,
  //   };
  // });

  let items = []

  $( document ).ready(function() {	   
    const xmlDoc = $.parseXML(xmlString);
    const $xml = $(xmlDoc);
    const itemCount = $xml.find("item");

    itemCount.map(ic => {
      const $item = $(itemCount[ic]);
      const itemTitle = $item.find('title')[0].innerHTML;
      const itemDescription = $item.find('description')[0].innerHTML;
      const itemLink = $item.find('link')[0].innerHTML;
      const itemPubDate = $item.find('pubDate')[0].innerHTML;
      const itemCreator = $item.find('dc\\:creator')[0];
      const itemEncodedContent = $item.find('content\\:encoded')[0].textContent;
      const itemEncodedContentHtml = $.parseHTML(itemEncodedContent);
      const imageSrc = $(itemEncodedContentHtml).find('.image img').attr('src');
      
      items.push({
        title: itemTitle,
        description: itemDescription,
        link: itemLink,
        pubDate: itemPubDate,
        creator: 'itemCreator',
        creator: itemCreator,
        imageSrc: imageSrc
        // encodedContent: itemEncodedContent,
      });
    })

    items.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
  
    const rss = document.getElementById('rss-newsletter')
    items.slice(0,3).forEach((item) => {
      const listItem = document.createElement("a");
      listItem.classList.add("rss-item");    
      listItem.setAttribute('href', item.link)    
      listItem.innerHTML = `
        <div class="image" alt="${item.title}" style="background-image: url(${item.imageSrc})"></div>
        <h4>${item.title}</h4>
        <p>${item.description}</p>
        <a href="${item.link}">Read More</a>
        <span>${new Date(item.pubDate).toLocaleString()}</span>
      `;
      rss.appendChild(listItem);
    });
  });
  

}