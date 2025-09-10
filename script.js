$(document).ready(function () {
  // ===================== SMOOTH SCROLL =====================
  $("nav a").on("click", function (e) {
    if (this.hash !== "") {
      e.preventDefault();
      const hash = this.hash;
      $("html, body").animate(
        { scrollTop: $(hash).offset().top - 70 },
        800
      );
    }
  });


// ===================== SERVICE DETAILS (Explore More) =====================
const serviceDetails = {
  spa: {
    title: "Spa & Wellness",
    image: "images/spa.jpg",
    description: "Our Spa & Wellness center offers world-class therapies, massages, and relaxation treatments to rejuvenate your body and mind.",
    price: 2500
  },
  dining: {
    title: "Dining Experience",
    image: "images/dining.jpg",
    description: "Savor gourmet dishes curated by top chefs. From fine dining to casual meals, our restaurants provide an unforgettable culinary journey.",
    price: 1800
  },
  tour: {
    title: "Travel & Tours",
    image: "images/tour.jpg",
    description: "Explore the most beautiful attractions, hidden gems, and guided tours to make your stay truly memorable.",
    price: 3500
  }
};

let selectedService = null;

// ===================== CART (Load from localStorage) =====================
let cart = JSON.parse(localStorage.getItem("cart")) || [];
updateCartUI();

// ===================== EXPLORE SERVICE DETAILS =====================
$(document).on("click", ".btn-explore", function () {
  const serviceKey = $(this).data("service");
  selectedService = serviceDetails[serviceKey];

  $("#serviceModalLabel").text(selectedService.title);
  $("#serviceImage").attr("src", selectedService.image);
  $("#serviceTitle").text(selectedService.title);
  $("#serviceDescription").text(selectedService.description);

  const modal = new bootstrap.Modal(document.getElementById("serviceModal"));
  modal.show();
});

// ===================== ADD TO CART =====================
$("#addToCartBtn").off("click").on("click", function () {
  if (selectedService) {
    cart.push(selectedService);
    saveCart();
    updateCartUI();

    // Close modal
    const serviceModal = bootstrap.Modal.getInstance(document.getElementById("serviceModal"));
    serviceModal.hide();

    alert(selectedService.title + " added to cart!");
  }
});

// ===================== OPEN CART =====================
$("#openCartBtn").off("click").on("click", function () {
  updateCartUI();
  const cartModal = new bootstrap.Modal(document.getElementById("cartModal"));
  cartModal.show();
});

// ===================== CLEAR CART =====================
$("#clearCartBtn").off("click").on("click", function () {
  cart = [];
  saveCart();
  updateCartUI();
});

// ===================== UPDATE CART UI + TOTAL =====================
function updateCartUI() {
  const cartList = $("#cartList");
  cartList.empty();

  let total = 0;

  if (cart.length === 0) {
    cartList.append(`<li class="list-group-item text-center text-muted">Your cart is empty</li>`);
  }

  cart.forEach((item, index) => {
    total += item.price;
    cartList.append(`
      <li class="list-group-item d-flex justify-content-between align-items-center">
        ${item.title} <span class="badge bg-primary rounded-pill">₹${item.price}</span>
        <button class="btn btn-sm btn-danger removeBtn" data-index="${index}">Remove</button>
      </li>
    `);
  });

  $("#cartCount").text(cart.length);
  $("#cartTotal").text("₹" + total);
}

// ===================== REMOVE ITEM (Delegated) =====================
$(document).on("click", ".removeBtn", function () {
  const index = $(this).data("index");
  cart.splice(index, 1);
  saveCart();
  updateCartUI();
});

// ===================== SAVE CART TO LOCALSTORAGE =====================
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// ===================== BOOKING FORM SUBMIT =====================
const bookingForm = document.getElementById("bookingForm");
if (bookingForm) {
  bookingForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const modalEl = document.getElementById("bookingModal");
    const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
    modal.hide();

    this.reset();

    setTimeout(() => {
      alert("Your booking is confirmed! Thank you for choosing " + (selectedService ? selectedService.title : "us") + ".");
    }, 500);
  });
}

// ===================== FIX: RELOAD PAGE WHEN BACK FROM CACHE =====================
window.addEventListener("pageshow", function (event) {
  if (event.persisted) {
    window.location.reload();
  }
});











  // ===================== CONTACT FORM SUBMIT =====================
  $(".contact-form form").on("submit", function (e) {
    e.preventDefault();
    const name = $("input[type='text']").val();
    const email = $("input[type='email']").val();
    const message = $("textarea").val();

    if (name && email && message) {
      alert("Thank you " + name + "! We have received your message.");
      $(this).trigger("reset");
    } else {
      alert("Please fill out all fields before submitting.");
    }
  });

  // ===================== SCROLL TO TOP BUTTON =====================
  $("body").append('<button id="scrollTopBtn"><i class="fa-solid fa-arrow-up"></i></button>');

  $("#scrollTopBtn").css({
    position: "fixed",
    bottom: "20px",
    right: "20px",
    padding: "10px 15px",
    "border-radius": "50%",
    "background-color": "#b80e0e",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    display: "none",
    "z-index": "999"
  });

  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
      $("#scrollTopBtn").fadeIn();
    } else {
      $("#scrollTopBtn").fadeOut();
    }
  });

  $("#scrollTopBtn").on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 800);
  });

  // ===================== COUNTER ANIMATION =====================
  $(".counter").each(function () {
    $(this).prop("Counter", 0).animate(
      { Counter: $(this).text() },
      {
        duration: 2000,
        easing: "swing",
        step: function (now) {
          $(this).text(Math.ceil(now));
        },
      }
    );
  });

  // ===================== SCROLL ANIMATION (Service Cards) =====================
  $(window).on("scroll", function () {
    $(".service-card").each(function () {
      var position = $(this).offset().top;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      if (scroll + windowHeight > position + 100) {
        $(this).addClass("animate__animated animate__fadeInUp");
      }
    });
  });

  // ===================== SCROLL ANIMATION (Generic fade-section) =====================
  $(window).scroll(function () {
    $(".fade-section").each(function () {
      let top_of_element = $(this).offset().top;
      let bottom_of_window = $(window).scrollTop() + $(window).height();

      if (bottom_of_window > top_of_element) {
        $(this).addClass("animate__animated animate__fadeInUp");
      }
    });
  });

  // ===================== ROOM SECTION SCROLL =====================
  $(window).on("scroll", function () {
    $(".room").each(function () {
      let position = $(this).offset().top;
      let scroll = $(window).scrollTop();
      let windowHeight = $(window).height();
      if (scroll + windowHeight > position + 100) {
        $(this).addClass("animate__fadeInUp");
      }
    });
  });
});
