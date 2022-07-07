/**
 * Define Global Variables
 *
 */

// get reference to the navbar list and all sections.
const nav = document.getElementById("navbar__list");
const sections = document.getElementsByTagName("section");
const virtualDom = document.createDocumentFragment();

// Mobile Navbar
const toggleNav = document.getElementById("toggle__nav");
// Call to action button on the landing page to add listener for click on it.
const transferToContact = document.querySelector(".contact__button");
// reference for the form to add listener fro submit on it.
const formSubmit = document.querySelector("form");

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

/**
 * @description By using getBoundingClientRect() & scrollY and scrollTo()
 * to scroll to any section id.
 *
 * @param {object}event
 *
 * @returns No return.
 */
function scrollToSection(event) {
  event.preventDefault();
  toggleNavbar();
  const elementToScroll = document.getElementById(
    event.target.getAttribute("data-id")
  );
  // get element hight from the start of viewing area only and added to scrolled area
  // to get the total hight and deducted 52 for the navbar.
  const elementHightFromTop = elementToScroll.getBoundingClientRect();
  const currentScrollValue = window.scrollY;
  // Scroll to the selected section.
  window.scrollTo({
    top: elementHightFromTop.top + currentScrollValue - 52,
    behavior: "smooth",
  });
}

/**
 * @description handle open and close mobile navbar.
 *
 * @param No params
 *
 * @returns No return.
 */
function toggleNavbar() {
  const listItems = document.querySelectorAll(".navbar__menu ul li");
  if (nav.classList.contains("animate__nav")) {
    nav.classList.remove("animate__nav");
    listItems.forEach(function (listItem) {
      listItem.style.opacity = 1;
    });
  } else {
    nav.classList.add("animate__nav");
  }
}

/**
 * @description Function providing information about the size of an element and
 * its position relative to the viewport.
 *
 * @param {HTML element} element
 *
 * @returns boolean
 */
function inViewport(element) {
  // Get the elements position relative to the viewport
  var elementRec = element.getBoundingClientRect();
  // Check if the element is outside the viewport
  // Then invert the returned value because I want to know the opposite
  return !(elementRec.top > innerHeight || elementRec.bottom < 0);
}

/**
 * @description Function to add focus to the navbar links.
 * looping over all navbar links and add focus to the active section and remove focus
 * from none active one's.
 *
 * @param {string} id
 *
 * @returns no return
 */
function checkFocusLink(id) {
  const allLinks = document.getElementsByClassName("menu__link");
  for (const link of allLinks) {
    if (link.getAttribute("data-id") === id) {
      link.focus();
    } else {
      link.blur();
    }
  }
}

/**
 * @description back to top functionality.
 * Adding event listener to the backToTop button to scroll to the top of the page
 * in a smooth way.
 */
const backToTop = document.getElementById("back__to__top");
backToTop.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

/**
 * @description Function to get all cards existing inside the active section for
 * for animation purpose.
 *
 * @param {string} id
 *
 * @returns return the cards list to animate them when be in view or
 * null if there is no match.
 */
function getCards(id) {
  let result;
  switch (id) {
    case "section1":
      result = document.getElementsByClassName("about__card");
      return result;
    case "section2":
      result = document.getElementsByClassName("service__card");
      return result;
    case "section3":
      result = document.getElementsByClassName("portfolio__card");
      return result;
    default:
      return null;
  }
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

/**
 * @description Create the Navbar by extracting the data from the sections and
 * data attribute called data-nav and get the name to create Dynamic Navbar.
 *
 * get reference to the navbar list and all sections.
 *
 * Using Document Fragment and appendChild and innerHtml and createElement to get
 * the expected results.
 */

for (const section of sections) {
  // create list and anchor tags which will append together to get the navbar link.
  const listItem = document.createElement("li");
  // adding eventListener to interact with click on links and direct to section hash.
  listItem.addEventListener("click", scrollToSection);
  // Using the template literal to create an HTML string to achieve Nav links.
  const listItemLink = `<a class="menu__link" href="#${section.getAttribute(
    "id"
  )}" data-id="${section.getAttribute("id")}">${section.getAttribute(
    "data-nav"
  )}</a>`;
  listItem.innerHTML = listItemLink;
  virtualDom.appendChild(listItem);
}
// Append the fragment to the page once.
nav.appendChild(virtualDom);

/**
 * @description Function to Hide the navbar when the user is not scrolling for 4 sec.
 * time can be modified inside the function by changing 4000 to ? or even add a variable.
 *
 * @param no params
 *
 * @returns no return
 */
function hideNavbar() {
  let oldScroll = window.scrollY;
  setTimeout(function () {
    let newScroll = window.scrollY;
    if (window.innerWidth <= 520) {
      document.getElementsByClassName("page__header")[0].style.transform =
        "translateY(0)";
    } else if (newScroll === oldScroll) {
      document.getElementsByClassName("page__header")[0].style.transform =
        "translateY(-100px)";
    } else {
      document.getElementsByClassName("page__header")[0].style.transform =
        "translateY(0)";
    }
  }, 4000);
}

/**
 * @description Function to Hide the navbar when the user is not scrolling for 4 sec.
 * time can be modified inside the function by changing 4000 to ? or even add a variable.
 *
 * @param no params
 *
 * @returns no return
 */
// Handle scroll event and all active section functionality.
function handleScroll() {
  // get the navbar back to the viewport after hiding it to keep it shown while user scroll.
  document.getElementsByClassName("page__header")[0].style.transform =
    "translateY(0)";
  // showing and hiding the back to top button after {show > 100px} can be modified.
  let scrollValue = window.scrollY;
  // remove the one for the mobile we need it the mobile
  if (window.innerWidth <= 320) {
    backToTop.style.display = "none";
  } else if (scrollValue > 100) {
    backToTop.style.display = "grid";
  } else {
    backToTop.style.display = "none";
  }

  /**
   * loop over all sections to check and do the following:
   *
   *  1. Add the active class to the current on view section when scroll reach
   *  to any section of them.
   *
   *  2. Adding the focus state to the selected navbar link according to the active class.
   *
   *  3. If there no scrollY === 0 (no scroll yet OR client back to the top of the page)
   *  will remove the focus color from all likes in navbar.
   *
   *  4. Adding animation to the active section cards to popup to the screen.
   */
  for (const section of sections) {
    let sectionReference = document.getElementById(section.getAttribute("id"));
    // reset the navbar focus if the scroll === 0;
    if (scrollValue === 0) checkFocusLink(null);
    // Adding All functionality to the current active section.
    if (inViewport(sectionReference)) {
      sectionReference.classList.add("active");
      // make the navbar responsive to the scroll and change with active section.
      checkFocusLink(section.getAttribute("id"));
      // Get all cards inside the active section if any to animate them.
      const animateCards = getCards(section.getAttribute("id"));
      if (animateCards !== null) {
        for (card of animateCards) {
          card.classList.add("animate__sections");
        }
      }
    } else {
      // reverse the top processes.
      sectionReference.classList.remove("active");
      const staticCards = getCards(section.getAttribute("id"));
      if (staticCards !== null) {
        for (card of staticCards) {
          card.classList.remove("animate__sections");
        }
      }
    }
  }
  // make sure of hide and show navbar is properly when scroll or not.
  hideNavbar();
}
/**
 * calling handleScroll function at the first load for the site which will help
 * prepare the page for scroll event activate the remaining features which don't
 * require the scroll to activate them like hide scroll bar if no scroll.
 */
handleScroll();

/**
 * End Main Functions
 * Begin Events
 *
 */

// Event to open the navbar menu when click on nav icon.
toggleNav.addEventListener("click", toggleNavbar);

// hide or show the navbar when resize the screen.
window.addEventListener("resize", hideNavbar);

// Adding eventListener to the scroll event.
document.addEventListener("scroll", handleScroll);

// adding event to call to action button to transfer user to contact form.
transferToContact.addEventListener("click", scrollToSection);

// Handle form submit to show success or failure messages.
formSubmit.addEventListener("submit", function (e) {
  e.preventDefault();
  const success = document.querySelector(".contact__message__success");
  const failed = document.querySelector(".contact__message__failed");
  if (
    e.target.email.value.trim() !== "" &&
    e.target.message.value.trim() !== ""
  ) {
    // showing success message for 2 sec.
    success.style.display = "flex";
    e.target.reset();
    setTimeout(() => {
      success.style.display = "none";
    }, 4000);
  } else {
    // showing failed message for 2 sec.
    failed.style.display = "flex";
    setTimeout(() => {
      failed.style.display = "none";
    }, 4000);
  }
});
