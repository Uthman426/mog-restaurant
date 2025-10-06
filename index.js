

window.addEventListener("load", () => {
  var home_images = document.querySelector('.home_images')
  const slider = document.getElementById('slider')
  const menuArray = document.querySelector('.menu_array')
  const imgList = [
    "img/slide-02kitchen.jpg",
    "img/modernkitchendesigninterior.jpg"
  ];

  let current = 0;

  function changeImage() {
    current = (current + 1) % imgList.length;
    slider.src = imgList[current];
  }

  // Change image every 3 seconds (3000 ms)
  setInterval(changeImage, 5000);

  async function menuarray() {
    const url = "./foodmenu.json"
    try {
      const response = await fetch(url)
      const results = await response.json();
      results.foods.map((plate, index) => {
        const foodDiv = document.createElement('div');
        foodDiv.className = 'food'

        const priceContainer = document.createElement('div')
        priceContainer.id = 'price_container'
        const foodprice = document.createElement('p')
        foodprice.id = 'price'

        const greenLine = document.createElement('div');
        greenLine.id = 'green_line';

        const foodDetails = document.createElement('div');
        foodDetails.className = 'food_details';
        const foodna = document.createElement('p')
        foodna.id = 'food_name'
        const foodWrite = document.createElement('p')
        foodWrite.id = 'food_writeup'
        const foodimage = document.createElement('img')
        foodimage.id = 'food_img'
        var { price, src, foodname, foodwriteup } = plate;
        foodimage.src = src;
        foodprice.textContent = price
        foodna.textContent = foodname
        foodWrite.textContent = foodwriteup


        priceContainer.appendChild(foodprice)
        foodDetails.append(foodna, foodWrite);

        foodDiv.append(foodimage)



        foodDiv.append(priceContainer)
        foodDiv.append(greenLine)
        foodDiv.append(foodDetails)
        
        menuArray.append(foodDiv)

      })


    } catch (error) {

    }
  }
  menuarray()
  let isSliding = false;
let itemsPerView = 5; // default for desktop

// Watch for screen size changes
const mediaQuery = window.matchMedia("(max-width: 768px)"); // mobile breakpoint

function handleResize(e) {
  if (e.matches) {
    // Mobile
    itemsPerView = 1;
  } else {
    // Desktop
    itemsPerView = 5;
  }
}
handleResize(mediaQuery); // run once on load
mediaQuery.addEventListener("change", handleResize);

function slideNext() {
  if (isSliding) return;
  isSliding = true;

  // shift depending on itemsPerView
  let shiftPercent = 100 / itemsPerView;

  menuArray.style.transition = "transform 0.5s ease-in-out";
  menuArray.style.transform = `translateX(-${shiftPercent}%)`;

  setTimeout(() => {
    menuArray.appendChild(menuArray.firstElementChild);
    menuArray.style.transition = "none";
    menuArray.style.transform = "translateX(0)";
    isSliding = false;
  }, 500);
}

function slidePrev() {
  if (isSliding) return;
  isSliding = true;

  let shiftPercent = 100 / itemsPerView;

  menuArray.insertBefore(menuArray.lastElementChild, menuArray.firstElementChild);
  menuArray.style.transition = "none";
  menuArray.style.transform = `translateX(-${shiftPercent}%)`;

  setTimeout(() => {
    menuArray.style.transition = "transform 0.5s ease-in-out";
    menuArray.style.transform = "translateX(0)";
    setTimeout(() => (isSliding = false), 500);
  }, 20);
}

// Auto-slide
setInterval(slideNext, 3000);

// Buttons
document.getElementById("nextBtn").addEventListener("click", slideNext);
document.getElementById("prevBtn").addEventListener("click", slidePrev);

  // let isSliding = false;

  // function slideNext() {
  //   if (isSliding) return;
  //   isSliding = true;

  //   // animate shift left
  //   menuArray.style.transition = "transform 0.5s ease-in-out";
  //   menuArray.style.transform = "translateX(-20%)"; // shift by one card width

  //   // after animation
  //   setTimeout(() => {
  //     // move first child to the end
  //     menuArray.appendChild(menuArray.firstElementChild);

  //     // reset position without animation
  //     menuArray.style.transition = "none";
  //     menuArray.style.transform = "translateX(0)";

  //     isSliding = false;
  //   }, 500); // must match transition duration
  // }

  // function slidePrev() {
  //   if (isSliding) return;
  //   isSliding = true;

  //   // move last child to the front (before animating)
  //   menuArray.insertBefore(menuArray.lastElementChild, menuArray.firstElementChild);

  //   // jump left instantly
  //   menuArray.style.transition = "none";
  //   menuArray.style.transform = "translateX(-17.5%)";

  //   // animate back to center
  //   setTimeout(() => {
  //     menuArray.style.transition = "transform 0.5s ease-in-out";
  //     menuArray.style.transform = "translateX(0)";
  //     setTimeout(() => (isSliding = false), 500);
  //   }, 20);
  // }

  // // Auto-slide every 3s
  // setInterval(slideNext, 3000);

  // Optional buttons
  document.getElementById("nextBtn").addEventListener("click", slideNext);
  document.getElementById("prevBtn").addEventListener("click", slidePrev);

  

  const sections = document.querySelectorAll(".allsection")
  const navLinks = document.querySelectorAll(".nav-link")
  const navbar = document.querySelector(".topper1")

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - navbar.offsetHeight; // adjust for fixed navbar
      const sectionHeight = section.clientHeight;

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });


  navLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault(); // stop instant jump

      const targetId = this.getAttribute("href").substring(1); // e.g. "about"
      const targetSection = document.getElementById(targetId);

      const offset = targetSection.offsetTop - navbar.offsetHeight;

      window.scrollTo({
        top: offset,
        behavior: "smooth"
      });
    });
  });
  // for when the home  reservation button is clicked
  //  let it take them to reservation section

  const r_button = document.querySelector('#reservation_button')
  const r_section = document.querySelector('#contact')

  r_button.addEventListener('click', function () {
    if (r_section) {
      r_section.scrollIntoView({ behavior: 'smooth' })
    }
  });

  
  const reservationDiv = document.querySelector('.under_reservation')
  if (reservationDiv) {
    const reservation = document.createElement('button')
    reservation.id = ('submit_reservation')
    reservationDiv.appendChild(reservation)
    reservation.textContent = 'Make A Reservation'
    reservation.addEventListener('click', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('c_name').value;
      const g_number = document.getElementById('g_number').value;
      const r_date = document.getElementById('r_date').value;
      const c_email = document.getElementById('c_email').value;
      const p_number = document.getElementById('p_number').value;
      const r_time = document.getElementById('r_time').value;
      const message = document.getElementById('message_input').value;

      const templateparams = {
        customer_name: name,
        guest_count: g_number,
        reservation_date: r_date,
        customer_email: c_email,
        phone_number: p_number,
        reservation_time: r_time,
        message: message


      }
       

  fetch("/api/reservation", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(templateparams)
})

      
       .then(response => response.json())
    .then(data => {
        if (data.success) {
          alert("✅ Reservation sent successfully!");
          // clear the form
          document.getElementById('c_name').value = '';
          document.getElementById('g_number').value = '';
          document.getElementById('r_date').value = '';
          document.getElementById('c_email').value = '';
          document.getElementById('p_number').value = '';
          document.getElementById('r_time').value = '';
          document.getElementById('message_input').value = '';
        }else{
          alert("Something went wrong. Please try again.");
        }
      }) 
      .catch(error => {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    });
      
      



    })
  }

  const hamburger = document.getElementById("hamburger");
  const Navbar = document.querySelector(".navbar_container");
  const NavLinks = document.querySelectorAll(".navbars a");

hamburger.addEventListener("click", () => {
  Navbar.classList.toggle("active");
hamburger.textContent = Navbar.classList.contains("active") ? "×" : "☰";
});
NavLinks.forEach(link => {
  link.addEventListener("click", () => {
    Navbar.classList.remove("active");
    hamburger.textContent = "☰";
  });
});





}) ;



