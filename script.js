// ---- Config: Add/Edit projects here (easy to expand later) ----
const PROJECTS = [
  // Example structure for 15 projects; replace placeholders with your actual images and details.
  // span can be 4, 6, or 8 (visual variety)
  {
    title: "Lunna Coffee Logo",
    subtitle: "Logo • Branding",
    tags: ["Logo", "Branding"],
    span: 6,
    thumb: "media/lunna-coffee-thumb.jpg",
    full: "media/lunna-coffee-full.jpg",
    desc: "Minimalist, warm identity for an artisanal coffee brand.",
    link: "#",
  },
  {
    title: "Concert Poster — Night Bloom",
    subtitle: "Poster • Campaign",
    tags: ["Poster"],
    span: 4,
    thumb: "media/night-bloom-thumb.jpg",
    full: "media/night-bloom-full.jpg",
    desc: "Bold typography and neon contrast for an indie concert series.",
    link: "#",
  },
  {
    title: "Skincare Social Pack",
    subtitle: "Social • Carousel",
    tags: ["Social"],
    span: 4,
    thumb: "media/skincare-pack-thumb.jpg",
    full: "media/skincare-pack-full.jpg",
    desc: "Soft gradients and clean type for a calm, trustworthy feel.",
    link: "#",
  },
  {
    title: "TechHub Rebrand",
    subtitle: "Branding • System",
    tags: ["Branding"],
    span: 8,
    thumb: "media/techhub-thumb.jpg",
    full: "media/techhub-full.jpg",
    desc: "A modular system with grid-based layouts and flexible color scales.",
    link: "#",
  },
  {
    title: "Fashion Lookbook",
    subtitle: "UI/Visual • Editorial",
    tags: ["UI/Visual"],
    span: 6,
    thumb: "media/lookbook-thumb.jpg",
    full: "media/lookbook-full.jpg",
    desc: "High-contrast elegance with editorial pacing and micro-interactions.",
    link: "#",
  },
  // Add the rest until you have 15; placeholders below:
  {
    title: "Vista Real Estate Logo",
    subtitle: "Logo • Brand Mark",
    tags: ["Logo"],
    span: 4,
    thumb: "media/vista-thumb.jpg",
    full: "media/vista-full.jpg",
    desc: "Geometric V monogram with negative space.",
    link: "#",
  },
  {
    title: "Urban Fest Poster",
    subtitle: "Poster • Event",
    tags: ["Poster"],
    span: 6,
    thumb: "media/urbanfest-thumb.jpg",
    full: "media/urbanfest-full.jpg",
    desc: "Brutalist textures with tight grid typography.",
    link: "#",
  },
  {
    title: "Plant Co Social Ads",
    subtitle: "Social • Ads",
    tags: ["Social"],
    span: 4,
    thumb: "media/plantco-thumb.jpg",
    full: "media/plantco-full.jpg",
    desc: "Fresh green palette with bite-sized benefits.",
    link: "#",
  },
  {
    title: "Aura Branding System",
    subtitle: "Branding • System",
    tags: ["Branding"],
    span: 8,
    thumb: "media/aura-thumb.jpg",
    full: "media/aura-full.jpg",
    desc: "Scalable identity with motion-ready assets.",
    link: "#",
  },
  {
    title: "Cinematic UI Frames",
    subtitle: "UI/Visual • Frames",
    tags: ["UI/Visual"],
    span: 6,
    thumb: "media/ui-frames-thumb.jpg",
    full: "media/ui-frames-full.jpg",
    desc: "Cinematic composition and layered depth.",
    link: "#",
  },
  {
    title: "Honeycomb Mark",
    subtitle: "Logo • Mark",
    tags: ["Logo"],
    span: 4,
    thumb: "media/honey-thumb.jpg",
    full: "media/honey-full.jpg",
    desc: "Organic geometry with custom letterforms.",
    link: "#",
  },
  {
    title: "Gallery Poster Set",
    subtitle: "Poster • Set",
    tags: ["Poster"],
    span: 4,
    thumb: "media/gallery-thumb.jpg",
    full: "media/gallery-full.jpg",
    desc: "Muted palettes and grid rhythms for a museum series.",
    link: "#",
  },
  {
    title: "Snack Brand Social",
    subtitle: "Social • Pack",
    tags: ["Social"],
    span: 6,
    thumb: "media/snack-thumb.jpg",
    full: "media/snack-full.jpg",
    desc: "Punchy color, playful type, irresistible CTAs.",
    link: "#",
  },
  {
    title: "Nordic Brand Kit",
    subtitle: "Branding • Kit",
    tags: ["Branding"],
    span: 6,
    thumb: "media/nordic-thumb.jpg",
    full: "media/nordic-full.jpg",
    desc: "Cool minimalism with strong typographic rules.",
    link: "#",
  },
  {
    title: "Product Mock Visuals",
    subtitle: "UI/Visual • Product",
    tags: ["UI/Visual"],
    span: 4,
    thumb: "media/product-thumb.jpg",
    full: "media/product-full.jpg",
    desc: "High-fidelity mockups for launch assets.",
    link: "#",
  },
];

// ---- Render grid ----
const grid = document.getElementById("grid");

function cardTemplate(p) {
  return `
    <article class="card span-${p.span}" data-tags="${p.tags.join(
    ","
  )}" data-title="${p.title.toLowerCase()}">
      <button class="card-click" aria-label="Open ${p.title}">
        <img src="${p.thumb}" alt="${p.title}" />
        <div class="card-body">
          <h3 class="card-title">${p.title}</h3>
          <div class="card-sub">${p.subtitle}</div>
          <div class="tag-row">
            ${p.tags.map((t) => `<span class="tag">${t}</span>`).join("")}
          </div>
        </div>
      </button>
    </article>
  `;
}

function renderGrid(list) {
  grid.innerHTML = list.map(cardTemplate).join("");
  Array.from(grid.querySelectorAll(".card-click")).forEach((btn, i) => {
    btn.addEventListener("click", () => openModal(list[i]));
  });
}

renderGrid(PROJECTS);

// ---- Filtering ----
const filterButtons = document.querySelectorAll(".filter-btn");
let activeFilter = "all";

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    activeFilter = btn.dataset.filter;
    applyFilterSearch();
  });
});

// ---- Search ----
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", applyFilterSearch);

function applyFilterSearch() {
  const q = searchInput.value.trim().toLowerCase();
  const cards = Array.from(grid.children);

  cards.forEach((card) => {
    const tags = card.getAttribute("data-tags");
    const title = card.getAttribute("data-title");
    const matchesFilter = activeFilter === "all" || tags.includes(activeFilter);
    const matchesSearch = !q || title.includes(q);
    card.style.display = matchesFilter && matchesSearch ? "" : "none";
  });
}

// ---- Modal ----
const modal = document.getElementById("modal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalTags = document.getElementById("modalTags");
const modalLink = document.getElementById("modalLink");

function openModal(p) {
  modalImage.src = p.full;
  modalTitle.textContent = p.title;
  modalDesc.textContent = p.desc;
  modalTags.innerHTML = p.tags
    .map((t) => `<span class="tag">${t}</span>`)
    .join("");
  modalLink.href = p.link || "#";
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

modal.addEventListener("click", (e) => {
  if (e.target.hasAttribute("data-close")) closeModal();
});
document
  .querySelectorAll("[data-close]")
  .forEach((el) => el.addEventListener("click", closeModal));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// ---- Footer year ----
document.getElementById("year").textContent = new Date().getFullYear();
