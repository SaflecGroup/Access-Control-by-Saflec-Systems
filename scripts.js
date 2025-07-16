// === DESKTOP DROPDOWN TOGGLE ===
function toggleDropdown(dropdownId, arrowId) {
  const dropdown = document.getElementById(dropdownId);
  const arrow = document.getElementById(arrowId);
  const isHidden = dropdown.classList.contains('hidden');

  document.querySelectorAll('[id$="Dropdown"]').forEach(dd => {
    dd.classList.add('hidden');
    const btn = dd.previousElementSibling;
    if (btn) btn.setAttribute('aria-expanded', 'false');
  });

  document.querySelectorAll('svg[id$="Arrow"]').forEach(svg => {
    svg.style.transform = '';
  });

  if (isHidden) {
    dropdown.classList.remove('hidden');
    dropdown.previousElementSibling.setAttribute('aria-expanded', 'true');
    arrow.style.transform = 'rotate(180deg)';
  }
}

document.addEventListener('click', (event) => {
  const dropdowns = [
    { id: 'desktopProductsDropdown', arrowId: 'productsArrow' },
    { id: 'desktopResourcesDropdown', arrowId: 'resourcesArrow' },
  ];

  dropdowns.forEach(({ id, arrowId }) => {
    const dropdown = document.getElementById(id);
    const button = dropdown.previousElementSibling;
    const arrow = document.getElementById(arrowId);

    if (!dropdown.contains(event.target) && !button.contains(event.target)) {
      dropdown.classList.add('hidden');
      button.setAttribute('aria-expanded', 'false');
      arrow.style.transform = '';
    }
  });
});

['desktopProductsDropdown', 'desktopResourcesDropdown'].forEach(id => {
  const dropdown = document.getElementById(id);
  dropdown?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      dropdown.classList.add('hidden');
      dropdown.previousElementSibling?.setAttribute('aria-expanded', 'false');
      const arrow = dropdown.previousElementSibling?.querySelector('svg');
      if (arrow) arrow.style.transform = '';
    });
  });
});

// === MOBILE NAVIGATION ===
function toggleMobileDropdown(id) {
  const dropdown = document.getElementById(id);
  const btn = dropdown.previousElementSibling;
  const icon = btn.querySelector('svg');
  const isHidden = dropdown.classList.contains('hidden');

  dropdown.classList.toggle('hidden');
  btn.setAttribute('aria-expanded', String(isHidden));
  icon.style.transform = isHidden ? 'rotate(180deg)' : '';
}

const navToggle = document.getElementById('nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');

navToggle.addEventListener('click', () => {
  const isHidden = mobileMenu.classList.contains('hidden');
  mobileMenu.classList.toggle('hidden');
  navToggle.setAttribute('aria-expanded', String(!isHidden));
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    if (!mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.add('hidden');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

document.addEventListener('click', (event) => {
  if (!mobileMenu.contains(event.target) && !navToggle.contains(event.target)) {
    if (!mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.add('hidden');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  }
});

// === HERO SLIDER ===
const slides = document.querySelectorAll('.hero-slide');
const thumbs = document.querySelectorAll('#heroNavigation button.thumb');
const heroSlidesContainer = document.getElementById('heroSlides');
let currentSlide = 0;
let slideInterval;

function showSlide(n) {
  slides.forEach((slide, i) => {
    slide.style.opacity = i === n ? '1' : '0';
    slide.style.zIndex = i === n ? '10' : '0';
    slide.setAttribute('aria-hidden', i === n ? 'false' : 'true');
  });

  thumbs.forEach((thumb, i) => {
    thumb.classList.toggle('scale-125', i === n);
    thumb.setAttribute('aria-current', i === n ? 'true' : 'false');
    thumb.tabIndex = i === n ? 0 : -1;
  });

  currentSlide = n;
}

function nextSlide() {
  let next = (currentSlide + 1) % slides.length;
  showSlide(next);
}

function startSlideShow() {
  slideInterval = setInterval(nextSlide, 10000);
}

function resetSlideShow() {
  clearInterval(slideInterval);
  startSlideShow();
}

thumbs.forEach(thumb => {
  thumb.addEventListener('click', () => {
    const slideIndex = parseInt(thumb.getAttribute('data-slide'));
    showSlide(slideIndex);
    resetSlideShow();
  });
});

let touchStartX = 0;
let touchEndX = 0;
const swipeThreshold = 40;

heroSlidesContainer.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

heroSlidesContainer.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  const diffX = touchEndX - touchStartX;
  if (Math.abs(diffX) > swipeThreshold) {
    if (diffX > 0) {
      let prev = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(prev);
    } else {
      nextSlide();
    }
    resetSlideShow();
  }
}, { passive: true });

showSlide(0);
startSlideShow();

// === MODALS AND SHORTCUTS ===
window.openSupportModal = function () {
  const modal = document.getElementById("supportModal");
  modal.classList.remove("hidden");
  modal.classList.add("flex");
};

window.closeSupportModal = function () {
  const modal = document.getElementById("supportModal");
  modal.classList.remove("flex");
  modal.classList.add("hidden");
};

window.navigateToTeam = () => window.location.href = "#team";
window.navigateToProducts = () => window.location.href = "#products";
window.navigateToFeedback = () => window.location.href = "#feedback";
window.navigateToResources = () => window.location.href = "#resources";

// === INIT AOS ===
AOS.init({
  duration: 800,
  once: true,
});

  // Open Modal Function
  function openModal(id) {
    document.getElementById(id).classList.remove('hidden');
    document.getElementById(id).classList.add('flex');
  }

  // Close Modal Function
  function closeModal(id) {
    document.getElementById(id).classList.add('hidden');
    document.getElementById(id).classList.remove('flex');
  }

  // Close Modal when clicking outside of the modal
  function outsideClick(event, id) {
    if (event.target.id === id) {
      closeModal(id);
    }
  }
  
    // News Modal
    function togglePostContent(card) {
    const para = card.querySelector('p');
    if (!para) return;
    if (window.innerWidth >= 768) return;

    const isHidden = para.classList.contains('hidden');
    para.classList.toggle('hidden', !isHidden);
    card.setAttribute('aria-expanded', isHidden);
  }

  window.addEventListener('resize', () => {
    document.querySelectorAll('#news p').forEach(p => {
      p.classList.toggle('hidden', window.innerWidth < 768);
    });
    document.querySelectorAll('#news article').forEach(card => {
      card.setAttribute('aria-expanded', 'false');
    });
  });

  window.addEventListener('load', () => {
    if (window.innerWidth < 768) {
      document.querySelectorAll('#news p').forEach(p => p.classList.add('hidden'));
      document.querySelectorAll('#news article').forEach(card => card.setAttribute('aria-expanded', 'false'));
    }
  });
    // Close Archive Modal when clicking outside content
  document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('archiveModal');
    const modalContent = modal.querySelector('.glass-strong');

    modal.addEventListener('click', (event) => {
      if (!modalContent.contains(event.target)) {
        modal.classList.add('hidden');
      }
    });
  });
  
  // Team Departments
const teamMembers = [
  { name: "Sheldon", surname: "Da Silva", position: "Technical Support", departments: ["Customer Success"] },
  { name: "Lydon", surname: "De Jager", position: "Technical Support Manager", departments: ["Customer Success"] },
  { name: "Barend", surname: "Keyser", position: "Sales Director", departments: ["Customer Success"] },
  { name: "Hanu", surname: "Keyser", position: "Sales & Marketing", departments: ["Customer Success"] },
  
  { name: "David", surname: "Corder", position: "Managing Director", departments: ["Engineering"] },
  { name: "Tim", surname: "Corder", position: "Engineering & Development", departments: ["Engineering"] },
  { name: "JP", surname: "Du Plessis", position: "Engineering & Development", departments: ["Engineering"] },
  { name: "Quinton", surname: "Dyason", position: "General Manager", departments: ["Engineering"] },
  { name: "Liam", surname: "Dyason", position: "Engineering & Development", departments: ["Engineering"] },
  { name: "Pierre", surname: "Visser", position: "Engineering & Development", departments: ["Engineering"] },
  
  { name: "Deanne", surname: "Daniel", position: "Finance Director", departments: ["Operations"] },
  { name: "Leigh-Ann", surname: "Hopkins", position: "Accounts Assistance", departments: ["Operations"] },
  { name: "Job", surname: "Mbulaheni", position: "Repair Technician", departments: ["Operations"] },
  { name: "Candice", surname: "Viljoen", position: "Receptionist", departments: ["Operations"] },
  { name: "Amos", surname: "Twala", position: "Driver", departments: ["Operations"] },

  { name: "Gordon", surname: "Curr", position: "CEO", departments: ["All Team Members"] },
];

  const teamGrid = document.getElementById("team-grid");

  function renderTeam(department = "all") {
    teamGrid.style.opacity = 0;

    setTimeout(() => {
      teamGrid.innerHTML = "";

      const sorted = [...teamMembers].sort((a, b) => a.surname.localeCompare(b.surname));

      sorted.forEach((member, index) => {
        if (department === "all" || member.departments.includes(department)) {
          const initials = member.name[0] + member.surname[0];

          const card = document.createElement("div");
          card.className = "group glass bg-white/40 backdrop-blur-md text-center rounded-3xl p-6 shadow-xl card-animate transition-transform duration-300 hover:scale-105";

          card.innerHTML = `
            <div class="mx-auto mb-4 w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xl font-bold shadow-md hidden sm:flex">
              ${initials}
            </div>
            <h3 class="text-base sm:text-xl font-bold text-black">${member.name} ${member.surname}</h3>
            <p class="text-xs sm:text-sm text-white font-medium">${member.position}</p>
          `;

          teamGrid.appendChild(card);

          setTimeout(() => {
            card.classList.add("visible");
          }, index * 100);
        }
      });

      teamGrid.style.opacity = 1;
    }, 300);
  }

  // Filter buttons logic
  document.querySelectorAll(".team-filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".team-filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderTeam(btn.dataset.dept);
    });
  });

  // Initial load
  renderTeam("all");
  
    // Contact form submission
  document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const form = this;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const clientType = form.clientType.value;
    const recipient = form.recipient.value;
    const subject = form.subject.value.trim() || "Contact Form Submission";
    const message = form.message.value.trim();

    if (!name || !email || !recipient || !message) {
      alert("Please fill in all required fields marked with *.");
      return;
    }

    let body = `Name: ${name}\nEmail: ${email}`;
    if (phone) body += `\nPhone: ${phone}`;
    if (clientType) body += `\nClient Type: ${clientType}`;
    body += `\n\nMessage:\n${message}`;

    const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;

    form.reset();
  });
  
// === PDF Modal Logic ===
function openBrochureModal(pdfUrl) {
  const modal = document.getElementById('brochureModal');
  const frame = document.getElementById('brochureFrame');

  if (modal && frame) {
    frame.src = pdfUrl;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

function closeBrochureModal() {
  const modal = document.getElementById('brochureModal');
  const frame = document.getElementById('brochureFrame');

  if (modal && frame) {
    frame.src = "";
    modal.classList.remove('flex');
    modal.classList.add('hidden');
  }
}

// Close modal only when clicking on backdrop
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('brochureModal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeBrochureModal();
      }
    });
  }
});

// === Filter Resources by Type ===
function filterResources(type) {
  // Deactivate all tab buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });

  // Activate the clicked tab
  const activeTab = document.querySelector(`.tab-btn[onclick="filterResources('${type}')"]`);
  if (activeTab) {
    activeTab.classList.add('active');
  }

  // Filter resource cards
  document.querySelectorAll('#resourceGrid > div').forEach(card => {
    const isMatch = type === 'all' || card.dataset.type === type;
    card.classList.toggle('hidden', !isMatch);
  });

  // Ensure modal is closed when switching tabs
  closeBrochureModal();
}

// === BACK TO TOP BUTTON ===
const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.remove("hidden");
  } else {
    backToTopBtn.classList.add("hidden");
  }
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}