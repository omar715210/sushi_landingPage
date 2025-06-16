import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextPlugin from "gsap/TextPlugin";
gsap.registerPlugin(ScrollTrigger,TextPlugin);

document.addEventListener("DOMContentLoaded", () => {
  gsap.from(".header__logo h4", {
    duration:1,
    y:-50,
    opacity: 0
  })

  gsap.from(".header__menu li",{
    duration:2,
    opacity:0
  })

  const image = document.querySelector('.hero .hero-image .cont img');
  const container = document.querySelector('.hero .hero-image .cont');

  container.addEventListener("mousemove", (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width /2;
    const centerY = rect.height / 2;
    const rotateY = (x - centerX) / centerX*45;
    const rotatex = -(y - centerY) / centerY*45;

    gsap.to(image, {
      rotationY: rotateY,
      rotationX: rotatex,
      transformPrespective: 800,
      transformOrigin: "center",
      duration: 0.3,
      ease: "power2.out"
    });
  });

  container.addEventListener("mouseleave", () => {
    gsap.to(image, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "power3.out"
    })
  })



  const text = document.querySelector(".hero-content .hero-content-info .text-wrapper h1");
  const words = text.textContent.trim().split(" ");

  text.innerHTML = words.map(word => `<span class="word">${word}</span>`).join(" ");

  document.querySelectorAll(".word").forEach(word => {
    word.addEventListener("mouseenter", () => {
      gsap.fromTo(word, 
        { rotationX: -90, opacity: 0 },
        { rotationX: 0, opacity: 1, duration: 2, ease: "power2.out" }
      );
    });
  });




  gsap.from(".about-us__image-sushi3",{
    scrollTrigger:{
      trigger: ".about-us__image-sushi3",
      scrub:true,
      start: "top bottom",
      end: "bottom 50%",
      toggleActions: "play reverse restart reverse",
    },
    x:-100,
    opacity:0.5,
    duration:1,
    ease: "power2.inOut"
  });
  gsap.from(".about-us__image-sushi2",{
    scrollTrigger:{
      trigger: ".about-us__image-sushi2",
      scrub:true,
      start: "top bottom",
      end: "bottom 50%",
      toggleActions: "play reverse restart reverse",
    },
    x:-100,
    opacity:0.5,
    duration:1,
    ease: "power2.inOut"
  });


  gsap.from('.trending__discover',{
     scrollTrigger:{
      trigger: ".trending__discover",
      scrub:true,
      start: "top bottom",
      end:"bottom 50%",
      toggleActions: "play reverse restart reverse",
    },
    scale:0.3,
    duration:1,
  })

  gsap.from('.trending-sushi .trending__image img',{
     scrollTrigger:{
      trigger: ".trending-sushi .trending__image img",
      scrub:true,
      start: "top bottom",
      end:"bottom 50%",
      toggleActions: "play reverse restart reverse",
    },
    x:100,
    opacity: 0.5,
    duration:1,
  })

  gsap.from('.trending-drinks .trending__image img',{
     scrollTrigger:{
      trigger: ".trending-drinks .trending__image img",
      scrub:true,
      start: "top bottom",
      end:"bottom 50%",
      toggleActions: "play reverse restart reverse",
    },
    x:-100,
    opacity: 0.5,
    duration:1,
  })


  scrambleText({
    elementSelector: ".subscription > h2", finalHTML:"Get offers straight <br> to your inbox",
    duration:3})

})

function scrambleText({ elementSelector, finalHTML, duration = 2 }) {
  const el = document.querySelector(elementSelector);
  const scrambleChars = "アイウエオカキクケコサシスセ";

  // Extract text content from final HTML (strip tags like <br>)
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = finalHTML;
  const finalText = tempDiv.textContent;

  gsap.to({}, {
    scrollTrigger: {
      trigger: el,
      start: "top 80%",
      end: "top 70%",
      scrub: true,
    },
    duration,
    ease: "none",
    onUpdate: function () {
      const progress = this.progress();
      const revealCount = Math.floor(progress * finalText.length);

      const revealed = finalText.slice(0, revealCount);
      const scrambled = Array.from({ length: finalText.length - revealCount }, () =>
        scrambleChars[Math.floor(Math.random() * scrambleChars.length)]
      ).join("");

      // Merge scrambled string back into original HTML format
      let combined = revealed + scrambled;

      // Map back the <br> tag positions
      let result = "";
      let index = 0;
      for (const node of tempDiv.childNodes) {
        if (node.nodeType === 3) {
          result += combined.slice(index, index + node.textContent.length);
          index += node.textContent.length;
        } else if (node.nodeName === "BR") {
          result += "<br>";
        }
      }

      el.innerHTML = result;
    }
  });
}
