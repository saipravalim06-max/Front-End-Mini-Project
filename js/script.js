document.querySelectorAll(".traffic-light").forEach(function(light) {
  light.addEventListener("mouseover", function() {
    const message = document.getElementById("lightMessage");
    if (message) message.textContent = light.dataset.message;
  });
  light.addEventListener("mouseout", function() {
    const message = document.getElementById("lightMessage");
    if (message) message.textContent = "Move over a circle.";
  });
});

const registrationForm = document.getElementById("registrationForm");
if (registrationForm) {
  registrationForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const name = document.getElementById("studentName").value.trim();
    const output = document.getElementById("registerMessage");
    if (name === "") {
      output.textContent = "Please enter your name.";
    } else {
      output.textContent = "Thank you, " + name + "! Your registration is complete.";
      alert("Registration submitted successfully!");
    }
  });
}

const galleryImage = document.getElementById("galleryImage");
if (galleryImage) {
  const galleryItems = [
    {src:"https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1000", caption:"Live music and festival lights"},
    {src:"https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1000", caption:"A crowd enjoying the festival"},
    {src:"https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1000", caption:"A night of live performances"}
  ];
  let currentImage = 0;
  function showImage() {
    galleryImage.src = galleryItems[currentImage].src;
    document.getElementById("galleryCaption").textContent = galleryItems[currentImage].caption;
    document.getElementById("imageSelected").textContent = "";
  }
  function nextImage() { currentImage = (currentImage + 1) % galleryItems.length; showImage(); }
  function previousImage() { currentImage = (currentImage - 1 + galleryItems.length) % galleryItems.length; showImage(); }
  document.getElementById("nextImage").addEventListener("click", nextImage);
  document.getElementById("prevImage").addEventListener("click", previousImage);
  document.addEventListener("keydown", function(event) {
    if (event.key.toLowerCase() === "n") nextImage();
    if (event.key.toLowerCase() === "p") previousImage();
    if (event.code === "Space" || event.key === "Enter") {
      event.preventDefault();
      document.getElementById("imageSelected").textContent = "Image Selected";
    }
    if (event.key === "Escape") document.getElementById("imageSelected").textContent = "";
  });
}

const passType = document.getElementById("passType");
if (passType) {
  const quantity = document.getElementById("quantity");
  function updateTotal() {
    let count = Number(quantity.value);
    if (count < 1) count = 1;
    const price = Number(passType.value);
    document.getElementById("unitPrice").textContent = "₹" + price;
    document.getElementById("quantityText").textContent = count;
    document.getElementById("totalPrice").textContent = "₹" + (price * count);
  }
  passType.addEventListener("change", updateTotal);
  quantity.addEventListener("input", updateTotal);
  updateTotal();
  document.getElementById("checkoutButton").addEventListener("click", function() {
    const buyer = document.getElementById("buyerName").value.trim();
    document.getElementById("checkoutMessage").textContent = buyer ? "Thank you, " + buyer + ". Demo checkout ready!" : "Please enter the name on the pass.";
  });
}

const loginPassword = document.getElementById("loginPassword");
if (loginPassword) {
  loginPassword.addEventListener("keydown", function(event) {
    const message = document.getElementById("pinMessage");
    if (event.key === "Enter") message.textContent = "PIN submitted. Press Login to continue.";
    else if (event.key === "Escape") {
      loginPassword.value = "";
      message.textContent = "PIN field cleared.";
    } else if (event.key.length === 1 && !/[0-9a-zA-Z]/.test(event.key)) {
      message.textContent = "Special character entered.";
    } else {
      message.textContent = "PIN Entry Started";
    }
  });
}
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function(event) {
    event.preventDefault();
    document.getElementById("loginMessage").textContent = "Demo login submitted successfully.";
    alert("Welcome to Riviera!");
  });
}

document.querySelectorAll(".photo-card").forEach(function(card) {
  card.addEventListener("mouseover", function() { card.style.outline = "3px solid #f2b36d"; });
  card.addEventListener("mouseleave", function() { card.style.outline = "none"; });
});

document.querySelectorAll(".event-card").forEach(function(card) {
  card.addEventListener("mouseenter", function() {
    card.style.borderColor = "#c98d63";
  });
  card.addEventListener("mouseleave", function() {
    card.style.borderColor = "";
  });
});

function getRivieraProfile() {
  try { return JSON.parse(localStorage.getItem("rivieraProfile") || "null"); }
  catch (error) { return null; }
}
function saveRivieraProfile(profile) {
  localStorage.setItem("rivieraProfile", JSON.stringify(profile));
}
function requireLogin() {
  const protectedPages = ["home.html", "events.html", "register.html", "gallery.html", "cart.html", "profile.html"];
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  if (protectedPages.includes(currentPage) && sessionStorage.getItem("rivieraLoggedIn") !== "yes") {
    window.location.href = "index.html";
  }
}
requireLogin();

const showLogin = document.getElementById("showLogin");
const showSignup = document.getElementById("showSignup");
const entryLoginForm = document.getElementById("entryLoginForm");
const entrySignupForm = document.getElementById("entrySignupForm");
if (showLogin && showSignup) {
  showLogin.addEventListener("click", function() {
    entryLoginForm.classList.remove("d-none");
    entrySignupForm.classList.add("d-none");
    showLogin.classList.add("btn-primary"); showLogin.classList.remove("btn-outline-primary");
    showSignup.classList.remove("btn-primary"); showSignup.classList.add("btn-outline-primary");
  });
  showSignup.addEventListener("click", function() {
    entrySignupForm.classList.remove("d-none");
    entryLoginForm.classList.add("d-none");
    showSignup.classList.add("btn-primary"); showSignup.classList.remove("btn-outline-primary");
    showLogin.classList.remove("btn-primary"); showLogin.classList.add("btn-outline-primary");
  });
}
if (entrySignupForm) {
  entrySignupForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const profile = {
      name: document.getElementById("newName").value.trim(),
      email: document.getElementById("newEmail").value.trim(),
      studentId: document.getElementById("newStudentId").value.trim(),
      password: document.getElementById("newPassword").value
    };
    saveRivieraProfile(profile);
    sessionStorage.setItem("rivieraLoggedIn", "yes");
    window.location.href = "home.html";
  });
}
if (entryLoginForm) {
  entryLoginForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const profile = getRivieraProfile();
    const email = document.getElementById("entryEmail").value.trim();
    const password = document.getElementById("entryPassword").value;
    const message = document.getElementById("entryMessage");
    if (!profile) {
      message.textContent = "No profile found in this browser. Please create a profile first.";
    } else if (profile.email === email && profile.password === password) {
      sessionStorage.setItem("rivieraLoggedIn", "yes");
      window.location.href = "home.html";
    } else {
      message.textContent = "Email or password does not match this browser's demo profile.";
    }
  });
}

const profileForm = document.getElementById("profileForm");
if (profileForm) {
  const profile = getRivieraProfile() || {};
  document.getElementById("profileName").value = profile.name || "";
  document.getElementById("profileEmail").value = profile.email || "";
  document.getElementById("profileStudentId").value = profile.studentId || "";
  document.getElementById("profilePhone").value = profile.phone || "";
  document.getElementById("profileCourse").value = profile.course || "";
  document.getElementById("profileHeading").textContent = profile.name ? profile.name + "'s Profile" : "My Profile";
  document.getElementById("profileInitials").textContent = profile.name ? profile.name.trim().charAt(0).toUpperCase() : "R";
  profileForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const updated = getRivieraProfile() || {};
    updated.name = document.getElementById("profileName").value.trim();
    updated.email = document.getElementById("profileEmail").value.trim();
    updated.studentId = document.getElementById("profileStudentId").value.trim();
    updated.phone = document.getElementById("profilePhone").value.trim();
    updated.course = document.getElementById("profileCourse").value.trim();
    saveRivieraProfile(updated);
    document.getElementById("profileHeading").textContent = updated.name + "'s Profile";
    document.getElementById("profileInitials").textContent = updated.name.charAt(0).toUpperCase();
    document.getElementById("profileMessage").textContent = "Your profile has been updated.";
  });
}

document.querySelectorAll("#logoutLink").forEach(function(link) {
  link.addEventListener("click", function(event) {
    event.preventDefault();
    sessionStorage.removeItem("rivieraLoggedIn");
    window.location.href = "index.html";
  });
});
