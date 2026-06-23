// =============================================
// BAACO PROPERTIES - SCRIPT
// =============================================

const header = document.getElementById('header');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const page = document.body.dataset.page;

window.addEventListener('scroll', () => {
  if (header) {
    if (window.scrollY > 20) {// the if statement is used to see if the window.scrollY is greater than 20, which means that the user has scrolled down the page. If this condition is true, it adds the "scrolled" class to the header element, which can be used to apply different styles (like a background color or shadow) to the header when the user scrolls down. If the condition is false (the user is at the top of the page), it removes the "scrolled" class from the header.
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
});

const pageMap = {/// the page map is used to map the page names to their corresponding HTML file names. It allows for easy navigation and identification of the current page based on the data-page attribute in the body element. This mapping is useful for highlighting the active navigation link and providing a better user experience by indicating which page the user is currently on.
  home: 'index.html',
  about: 'about.html',
  team: 'team.html',
  acquisition: 'acquisition.html',
  properties: 'properties.html',
  contact: 'contact.html'
};

const currentPath = pageMap[page];

if (currentPath) {/// the if statement sees if the currentPath variable is defined, which means that the current page has a corresponding entry in the pageMap object. If it is defined, the code proceeds to select all navigation links (both desktop and mobile) and checks if their href attribute matches the currentPath. If a match is found, it adds the "active" class to that link, indicating to the user which page they are currently on.
  document.querySelectorAll('.nav-link, .mobile-link').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentPath) {
      link.classList.add('active');
    }
  });
}

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open');/// the hamburger toggle is used to toggle the "open" class on the hamburger menu and mobile menu when the hamburger icon is clicked. This allows for a responsive navigation experience, where clicking the hamburger icon will show or hide the mobile menu, providing a better user interface for mobile users.
  });

  document.querySelectorAll('.mobile-link').forEach((link) => {
    link.addEventListener('click', () => {/// the link event listener is used to add an event listener to each mobile link in the mobile menu. When a mobile link is clicked, it removes the "open" class from both the mobile menu and the hamburger icon, effectively closing the mobile menu. This ensures that after a user selects a link from the mobile menu, the menu will close, providing a smoother navigation experience on mobile devices.
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');// the hamburger class remove is used to remove the "open" class from the hamburger icon when a mobile link is clicked. This ensures that the hamburger icon returns to its default state (not showing the "X" or open state) after the mobile menu is closed, providing a clear visual indication to the user that the menu is no longer open.
    });
  });
}

const contactForm = document.getElementById('contactForm');/// the contact form variable is used to get the contact information
const formSuccess = document.getElementById('formSuccess');

if (contactForm && formSuccess && contactForm.dataset.firebaseForm !== 'true') {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.submit-btn');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    setTimeout(() => {/// the set timeout is used to simulate sort of delay within the system
      formSuccess.classList.add('visible');
      contactForm.reset();///the contact form reset(); line resets the contact form fields to their default values after a successful submission. This is typically done to clear the form and prepare it for a new submission, providing a better user experience by indicating that the previous submission was successful and allowing the user to enter new information if desired.
      btn.textContent = 'Send Message';
      btn.disabled = false;
      setTimeout(() => formSuccess.classList.remove('visible'), 6000);
    }, 900);
  });
}

const fadeEls = document.querySelectorAll(
  '.feature-card, .stat-card, .team-card, .criteria-card, .property-card, .overview-text, .overview-stats, .contact-info, .contact-form, .featured-property-card, .grid-card, .section-title, .section-label'
);

if (fadeEls.length) {/// this if statement checks if there are any elements with the specified classes in the fadeEls NodeList. If there are elements present, it proceeds to create an IntersectionObserver to observe these elements and apply a fade-up effect when they come into view as the user scrolls down the page. This enhances the visual experience by animating the appearance of these elements.
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {// the entries.forEach((entry) => { line iterates over each entry in the IntersectionObserver's entries array. Each entry represents an observed element and contains information about its intersection with the viewport. The forEach method allows the code to apply specific actions, such as adding a "visible" class, to each observed element when it becomes visible in the viewport, creating a fade-up effect as the user scrolls.
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  fadeEls.forEach((el) => {
    el.classList.add('fade-up');
    observer.observe(el);
  });
}

/* =============================================
   ADVANCED SCROLL & PARALLAX EFFECTS
   ============================================= */

// Parallax effect for hero sections
const heroes = document.querySelectorAll('.page-hero');///the const heroes = document.querySelectorAll('.page-hero'); line selects all elements with the class "page-hero" and stores them in the heroes variable. This is typically used to apply a parallax scrolling effect to hero sections on the webpage, where the background image moves at a different speed than the foreground content as the user scrolls down the page.
if (heroes.length) {
  window.addEventListener('scroll', () => {
    heroes.forEach((hero) => {
      const scrollPosition = window.pageYOffset;
      const elementOffset = hero.offsetTop;
      const distance = scrollPosition - elementOffset;
      
      if (distance < window.innerHeight && distance > -hero.offsetHeight) {///the if statement checks if the distance between the scroll position and the element's offset is within the viewport height and not above the element's height. This ensures that the parallax effect is only applied when the hero section is visible on the screen, preventing unnecessary calculations and visual glitches when the section is out of view.
        hero.style.backgroundPosition = `center ${distance * 0.5}px`;
      }
    });
  });
}

// Add hover glow effect to cards
document.querySelectorAll('.featured-property-card, .team-card, .stat-card, .feature-card').forEach((card) => {
  card.addEventListener('mouseenter', function() {///this function adds an event listener to each card element that listens for the "mouseenter" event. When the user hovers over a card, it triggers the function that applies a glow effect by modifying the card's style properties, enhancing the visual feedback and interactivity of the card elements on the webpage.
    this.style.animation = 'none';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.animation = '';
  });
});

// Smooth scroll anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {/// the document is used to select all anchor elements on the page that have an href attribute starting with "#", indicating they are internal links to sections within the same page. The forEach method is then used to iterate over each of these anchor elements, allowing the addition of an event listener that enables smooth scrolling behavior when the user clicks on these links, enhancing the user experience by providing a visually appealing transition to the target section.
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add stagger effect to grid items on load
window.addEventListener('load', () => {/// the window is used to add an event listener that listens for the "load" event, which is triggered when the entire page, including all dependent resources such as images and stylesheets, has finished loading. This ensures that the subsequent code for adding a stagger effect to grid items is executed only after the page is fully loaded, allowing for a smooth and visually appealing animation effect on the grid items as they appear on the screen.
  const gridItems = document.querySelectorAll('.grid-card, .property-card');
  gridItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.05}s`;/// the item style animation is used to set the animation delay for each grid item based on its index in the NodeList. By multiplying the index by 0.05 seconds, each subsequent item will have a slightly longer delay before its animation starts, creating a staggered effect where the items appear one after another in a visually appealing manner as they are loaded onto the page.
  });
});
