const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [
  ...scope.querySelectorAll(selector),
];
const studies = {
  arrival: {
    title: "The Arrival",
    number: "01",
    category: "ARCHITECTURE",
    image: "exterior",
    description:
      "An invitation to slow down before you step inside. Layered stone, deep shade and a planted edge suggest an arrival that feels both sheltered and open.",
    ideas: [
      "A clear transition from street to private space.",
      "A sheltered entry with a place to pause.",
      "Planting that softens the meeting of architecture and landscape.",
    ],
    related: ["exterior", "materials"],
  },
  stillness: {
    title: "The Stillness",
    number: "02",
    category: "INTERIORS",
    image: "living",
    description:
      "A room with less competing for your attention. Natural light, low furniture and a garden outlook create an idea of living that is generous without feeling formal.",
    ideas: [
      "A quieter corner for reading or conversation.",
      "Windows that frame a view as well as admit light.",
      "A balance of shared living and personal retreat.",
    ],
    related: ["living", "materials"],
  },
  gathering: {
    title: "The Gathering",
    number: "03",
    category: "INTERIORS",
    image: "kitchen",
    description:
      "The kitchen as a place to spend time, rather than simply pass through. Warm timber and pale stone provide a backdrop for cooking, conversation and all the ordinary moments around the table.",
    ideas: [
      "Where people naturally gather while someone is cooking.",
      "Storage that suits the way you use your kitchen.",
      "Connections between preparation, dining and outdoor space.",
    ],
    related: ["kitchen", "living"],
  },
  tactile: {
    title: "The Tactile",
    number: "04",
    category: "DETAILS",
    image: "materials",
    description:
      "A small collection of textures with a shared sense of warmth. The interest comes from their differences — the grain of timber, the softness of linen, a glint of metal against stone.",
    ideas: [
      "Materials that feel comfortable to touch and live with.",
      "A small, connected palette rather than competing finishes.",
      "How natural light changes colour and texture through the day.",
    ],
    related: ["materials", "kitchen"],
  },
};
const images = {
  exterior: {
    src: "/media/generated-exterior-dusk.webp",
    alt: "Generated architectural visualisation: warm stone Melbourne home with timber entry, deep shadows and a planted garden at dusk",
  },
  living: {
    src: "/media/generated-living.webp",
    alt: "Generated interior visualisation: a calm living room with curved furniture, warm natural textures and a garden outlook",
  },
  kitchen: {
    src: "/media/generated-kitchen.webp",
    alt: "Generated interior visualisation: pale stone kitchen island, natural oak joinery and bronze details in warm light",
  },
  materials: {
    src: "/media/generated-materials.webp",
    alt: "Generated material visualisation: limestone, oak, linen and bronze samples composed in raking sunlight",
  },
};
const palettes = {
  sand: {
    name: "Sand & stone",
    number: "01",
    description:
      "Chalky limestone, pale oak and natural linen. A quiet, light-filled foundation with warmth beneath the surface.",
    image: "materials",
    swatches: [
      ["limestone", "Limestone"],
      ["oak", "Pale oak"],
      ["linen", "Linen"],
      ["bronze", "Bronze"],
    ],
  },
  earth: {
    name: "Earth & ember",
    number: "02",
    description:
      "Clay, walnut and soft sand, with a touch of copper. A grounded palette that finds richness in warm, earthy contrasts.",
    image: "kitchen",
    swatches: [
      ["clay", "Clay"],
      ["walnut", "Walnut"],
      ["sand", "Soft sand"],
      ["copper", "Copper"],
    ],
  },
  shadow: {
    name: "Oak & shadow",
    number: "03",
    description:
      "Oiled oak and charcoal against a chalky neutral. A deeper material conversation, balanced by pockets of light and a softer touch.",
    image: "living",
    swatches: [
      ["charcoal", "Charcoal"],
      ["oiled-oak", "Oiled oak"],
      ["chalk", "Chalk"],
      ["blackened-bronze", "Dark bronze"],
    ],
  },
};
const rooms = {
  retreat: {
    label: "Retreat",
    kicker: "01 / THE QUIETER SIDE",
    title: "A little space.\nJust for you.",
    description:
      "A retreat can be a reading nook, a bedroom with a gentle outlook or a separate room away from the busiest part of the home. Think about what helps you switch off.",
    question: "Where would you like to find a quiet moment in your day?",
  },
  living: {
    label: "Living",
    kicker: "02 / COME TOGETHER",
    title: "Room for the\nmoments between.",
    description:
      "A generous shared space can bring the day together — reading in the afternoon, a conversation over dinner, a window that draws you towards the garden.",
    question:
      "Would you prefer one open living space, or a separate room to retreat to?",
  },
  kitchen: {
    label: "Kitchen",
    kicker: "03 / THE DAILY RITUAL",
    title: "The heart of\nthe everyday.",
    description:
      "The best kitchen brief begins with how you cook, store and gather. Consider the things you reach for, where people sit and how meals move from preparation to the table.",
    question: "What works in your current kitchen — and what would you change?",
  },
  outside: {
    label: "Outside",
    kicker: "04 / A BREATH OF AIR",
    title: "Let the outside\nbe part of it.",
    description:
      "An outdoor connection can be as simple as a planted view, a sheltered spot for breakfast or a place to open the doors on a warm evening. Begin with how you want to use it.",
    question:
      "Would you use your outdoor space most for quiet time, entertaining or play?",
  },
};
const state = {
  saved: new Set(),
  palette: null,
  currentPalette: "sand",
  priorities: new Set(),
  currentRoom: "living",
  gallery: [],
  galleryIndex: 0,
  activeStudy: null,
};
let toastTimer;
function toast(message) {
  const el = $("#toast");
  el.textContent = message;
  el.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("is-visible"), 3500);
}
function imageSrcset(src) {
  return `${src.replace(".webp", "-640.webp")} 640w, ${src.replace(".webp", "-960.webp")} 960w, ${src} 1600w`;
}
function setImage(element, key, sizes = "(max-width:760px) 100vw, 55vw") {
  const image = images[key];
  element.src = image.src;
  element.srcset = imageSrcset(image.src);
  element.sizes = sizes;
  element.alt = image.alt;
  element.width = 1600;
  element.height = 900;
}
for (const element of $$("[data-image]"))
  setImage(
    element,
    element.dataset.image,
    element.getAttribute("sizes") ||
      (element.closest(".study-card")
        ? "(max-width:760px) 100vw, 50vw"
        : "(max-width:760px) 100vw, 60vw"),
  );
setImage($("#hero-image"), "exterior", "(max-width:760px) 100vw, 53vw");
for (const link of $$("[data-study]"))
  link.href = images[studies[link.dataset.study].image].src;

const dialogOpeners = new WeakMap();
function dialogFocusables(dialog) {
  return $$(
    'a[href],button,input:not([type="hidden"]),select,textarea,video[controls],[tabindex]',
    dialog,
  ).filter(
    (element) =>
      !element.matches(":disabled") &&
      element.tabIndex >= 0 &&
      element.getClientRects().length > 0 &&
      getComputedStyle(element).visibility !== "hidden",
  );
}
function focusDialogStart(dialog) {
  const close = $("[data-close]", dialog);
  const first = close || dialogFocusables(dialog)[0];
  if (first) first.focus({ preventScroll: true });
  else {
    dialog.tabIndex = -1;
    dialog.focus({ preventScroll: true });
  }
}
function openDialog(dialog) {
  if (dialog.open) return;
  dialogOpeners.set(dialog, document.activeElement);
  $$("dialog[open]").forEach((open) => open.close());
  dialog.showModal();
  dialog.scrollTop = 0;
  document.body.classList.add("has-dialog");
  focusDialogStart(dialog);
}
for (const dialog of $$("dialog")) {
  $$("[data-close]", dialog).forEach((button) =>
    button.addEventListener("click", () => dialog.close()),
  );
  dialog.addEventListener("close", () => {
    if (!document.querySelector("dialog[open]")) {
      document.body.classList.remove("has-dialog");
      const opener = dialogOpeners.get(dialog);
      if (opener?.isConnected && opener.getClientRects().length)
        opener.focus({ preventScroll: true });
    }
  });
  dialog.addEventListener("keydown", (event) => {
    if (event.key !== "Tab") return;
    const focusables = dialogFocusables(dialog);
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const current = document.activeElement;
    if (!first) {
      event.preventDefault();
      focusDialogStart(dialog);
    } else if (
      event.shiftKey &&
      (current === first || !dialog.contains(current))
    ) {
      event.preventDefault();
      last.focus();
    } else if (
      !event.shiftKey &&
      (current === last || !dialog.contains(current))
    ) {
      event.preventDefault();
      first.focus();
    }
  });
  dialog.addEventListener("click", (event) => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    )
      dialog.close();
  });
}
document.addEventListener("focusin", (event) => {
  const dialog = $("dialog[open]");
  if (dialog && !dialog.contains(event.target)) focusDialogStart(dialog);
});
$("#menu-open").setAttribute("aria-controls", "navigation-dialog");
$("#menu-open").setAttribute("aria-expanded", "false");
$("#menu-open").addEventListener("click", () => {
  openDialog($("#navigation-dialog"));
  $("#menu-open").setAttribute("aria-expanded", "true");
});
$("#navigation-dialog").addEventListener("close", () => {
  $("#menu-open").setAttribute("aria-expanded", "false");
});
$$("#navigation-dialog nav a").forEach((link) =>
  link.addEventListener("click", () => $("#navigation-dialog").close()),
);

for (const button of $$("[data-filter]"))
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    let count = 0;
    for (const control of $$("[data-filter]"))
      control.setAttribute("aria-pressed", String(control === button));
    for (const card of $$(".study-card")) {
      card.hidden = filter !== "all" && card.dataset.category !== filter;
      if (!card.hidden) count++;
    }
    $("#study-grid").classList.toggle("is-filtered", filter !== "all");
    $("#filter-status").textContent =
      `Showing ${count} ${count === 1 ? "study" : "studies"}${filter === "all" ? "" : ` in ${filter}`}.`;
  });
function updateSelections() {
  $("#saved-count").textContent = state.saved.size;
  for (const button of $$("[data-save]")) {
    const saved = state.saved.has(button.dataset.save);
    button.setAttribute("aria-pressed", String(saved));
    button.textContent = saved ? "✓" : "+";
    button.setAttribute(
      "aria-label",
      `${saved ? "Remove" : "Save"} ${studies[button.dataset.save].title} ${saved ? "from" : "to"} your brief`,
    );
  }
  const target = $("#brief-selections");
  target.replaceChildren();
  const entries = [
    ...[...state.saved].map((id) => ({
      type: "study",
      id,
      label: studies[id].title,
    })),
    ...(state.palette
      ? [
          {
            type: "palette",
            id: state.palette,
            label: palettes[state.palette].name,
          },
        ]
      : []),
    ...[...state.priorities].map((id) => ({
      type: "priority",
      id,
      label: `${rooms[id].label} priority`,
    })),
  ];
  if (!entries.length) {
    const p = document.createElement("p");
    p.textContent =
      "No ideas saved yet. Explore the collection, or start with your own vision.";
    target.append(p);
  } else {
    const tags = document.createElement("div");
    tags.className = "brief-tags";
    for (const entry of entries) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "brief-tag";
      button.setAttribute(
        "aria-label",
        `Remove ${entry.label} from your brief`,
      );
      button.append(document.createTextNode(entry.label));
      const cross = document.createElement("span");
      cross.textContent = "×";
      cross.setAttribute("aria-hidden", "true");
      button.append(cross);
      button.addEventListener("click", () => {
        if (entry.type === "study") state.saved.delete(entry.id);
        if (entry.type === "palette") state.palette = null;
        if (entry.type === "priority") state.priorities.delete(entry.id);
        updateSelections();
        const remaining = $$(".brief-tag", target);
        (
          remaining[Math.min(entries.indexOf(entry), remaining.length - 1)] ||
          $("#brief-form textarea")
        ).focus();
        toast(`${entry.label} removed.`);
      });
      tags.append(button);
    }
    target.append(tags);
  }
  $("#clear-selections").hidden = !entries.length;
  updateStudySave();
  updatePaletteSave();
  updateRoomSave();
}
function toggleStudy(id) {
  if (state.saved.has(id)) {
    state.saved.delete(id);
    toast(`${studies[id].title} removed from your brief.`);
  } else {
    state.saved.add(id);
    toast(`${studies[id].title} added to your brief.`);
  }
  updateSelections();
}
for (const button of $$("[data-save]"))
  button.addEventListener("click", () => toggleStudy(button.dataset.save));
$("#clear-selections").addEventListener("click", () => {
  state.saved.clear();
  state.palette = null;
  state.priorities.clear();
  updateSelections();
  $("#brief-form textarea").focus();
  toast("Your collected ideas have been cleared.");
});

function updateGallery() {
  const item = state.gallery[state.galleryIndex];
  const image = $("#detail-image");
  image.removeAttribute("srcset");
  image.removeAttribute("sizes");
  if (item.key) setImage(image, item.key, "(max-width:760px) 100vw, 55vw");
  else {
    image.src = item.src;
    image.alt = item.alt;
    image.width = 3360;
    image.height = 2240;
  }
  $("#detail-image-caption").textContent = item.caption;
  $("#gallery-counter").textContent =
    `${String(state.galleryIndex + 1).padStart(2, "0")} / ${String(state.gallery.length).padStart(2, "0")}`;
  $("#gallery-previous").disabled = state.gallery.length < 2;
  $("#gallery-next").disabled = state.gallery.length < 2;
}
function moveGallery(direction) {
  state.galleryIndex =
    (state.galleryIndex + direction + state.gallery.length) %
    state.gallery.length;
  updateGallery();
}
$("#gallery-previous").addEventListener("click", () => moveGallery(-1));
$("#gallery-next").addEventListener("click", () => moveGallery(1));
$("#study-dialog").addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    moveGallery(-1);
  }
  if (event.key === "ArrowRight") {
    event.preventDefault();
    moveGallery(1);
  }
});
let imageTouchX = null;
$("#detail-image").addEventListener("pointerdown", (event) => {
  if (event.pointerType === "touch") imageTouchX = event.clientX;
});
$("#detail-image").addEventListener("pointerup", (event) => {
  if (imageTouchX !== null && Math.abs(event.clientX - imageTouchX) > 60)
    moveGallery(event.clientX < imageTouchX ? 1 : -1);
  imageTouchX = null;
});
function setDetailIdeas(ideas) {
  const list = $("#detail-ideas");
  list.replaceChildren();
  for (const text of ideas) {
    const li = document.createElement("li");
    li.textContent = text;
    list.append(li);
  }
}
function updateStudySave() {
  const button = $("#detail-save");
  if (!state.activeStudy) {
    button.hidden = true;
    button.disabled = true;
    return;
  }
  button.hidden = false;
  button.disabled = false;
  const saved = state.saved.has(state.activeStudy);
  button.textContent = saved
    ? "Remove this idea from my brief −"
    : "Save this idea to my brief +";
  button.setAttribute("aria-pressed", String(saved));
}
for (const link of $$("[data-study]"))
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const id = link.dataset.study;
    const study = studies[id];
    state.activeStudy = id;
    state.galleryIndex = 0;
    state.gallery = study.related.map((key, index) => ({
      key,
      caption:
        index === 0
          ? "ARCHITECTURAL VISUALISATION"
          : "RELATED CONCEPT VISUALISATION",
    }));
    $("#detail-kicker").textContent =
      `THE ATELIER / STUDY ${study.number} / ${study.category}`;
    $("#study-dialog-title").textContent = study.title;
    $("#detail-description").textContent = study.description;
    setDetailIdeas(study.ideas);
    $("#detail-note").textContent =
      "Generated concept visualisations, not approved plans, confirmed inclusions or completed WOLCO homes.";
    updateGallery();
    updateStudySave();
    openDialog($("#study-dialog"));
  });
$("#detail-save").addEventListener("click", () => {
  if (state.activeStudy) toggleStudy(state.activeStudy);
});
$("#detail-enquire").addEventListener("click", () =>
  $("#study-dialog").close(),
);
for (const button of $$("[data-open-project]"))
  button.addEventListener("click", () => {
    state.activeStudy = null;
    state.galleryIndex = 0;
    state.gallery = [
      {
        src: "/media/cookes-kitchen-1800.webp",
        alt: "Cookes Road project photograph: pale island, timber cabinetry and a garden outlook",
        caption: "COOKES ROAD / SUPPLIED PROJECT PHOTOGRAPH",
      },
      {
        src: "/media/cookes-living-1800.webp",
        alt: "Cookes Road project photograph: open living and dining spaces",
        caption: "COOKES ROAD / SUPPLIED PROJECT PHOTOGRAPH",
      },
      {
        src: "/media/cookes-garden-1800.webp",
        alt: "Cookes Road project photograph: landscaped outdoor space",
        caption: "COOKES ROAD / SUPPLIED PROJECT PHOTOGRAPH",
      },
    ];
    $("#detail-kicker").textContent =
      "FROM THE WOLCO ARCHIVE / PROJECT PHOTOGRAPHY";
    $("#study-dialog-title").textContent = "Cookes Road";
    $("#detail-description").textContent =
      "A photographic look at Cookes Road, drawn from the WOLCO project archive. Open-plan spaces, timber-toned cabinetry and planted outlooks connect the interior to the garden.";
    setDetailIdeas([
      "The connection between kitchen, dining and living.",
      "The balance of pale surfaces and warm cabinetry.",
      "Views that bring a little of the garden inside.",
    ]);
    $("#detail-note").textContent =
      "Supplied WOLCO project photography. Image crops preserve the original scenes; no property features have been generated or retouched.";
    updateGallery();
    updateStudySave();
    openDialog($("#study-dialog"));
  });

function updatePaletteSave() {
  const saved = state.palette === state.currentPalette;
  $("#save-palette").textContent = saved
    ? "Remove this palette from your brief −"
    : "Add this palette to your brief +";
  $("#save-palette").setAttribute("aria-pressed", String(saved));
}
function selectPalette(id) {
  state.currentPalette = id;
  const palette = palettes[id];
  for (const tab of $$(".palette-tabs [data-palette]")) {
    const selected = tab.dataset.palette === id;
    tab.setAttribute("aria-selected", String(selected));
    tab.tabIndex = selected ? 0 : -1;
  }
  $("#palette-panel").setAttribute("aria-labelledby", `palette-${id}`);
  $("#palette-panel").dataset.palette = id;
  $("#palette-kicker").textContent = `PALETTE ${palette.number}`;
  $("#palette-name").textContent = palette.name;
  $("#palette-description").textContent = palette.description;
  setImage($("#palette-image"), palette.image, "(max-width:760px) 100vw, 50vw");
  const container = $("#swatches");
  container.replaceChildren();
  for (const [key, label] of palette.swatches) {
    const swatch = document.createElement("span");
    swatch.className = `swatch swatch-${key}`;
    const caption = document.createElement("span");
    caption.textContent = label;
    swatch.append(caption);
    container.append(swatch);
  }
  updatePaletteSave();
}
const paletteTabs = $$(".palette-tabs [data-palette]");
for (const [index, tab] of paletteTabs.entries()) {
  tab.addEventListener("click", () => selectPalette(tab.dataset.palette));
  tab.addEventListener("keydown", (event) => {
    let next;
    if (event.key === "ArrowRight") next = (index + 1) % paletteTabs.length;
    if (event.key === "ArrowLeft")
      next = (index - 1 + paletteTabs.length) % paletteTabs.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = paletteTabs.length - 1;
    if (next !== undefined) {
      event.preventDefault();
      selectPalette(paletteTabs[next].dataset.palette);
      paletteTabs[next].focus();
    }
  });
}
$("#save-palette").addEventListener("click", () => {
  const id = state.currentPalette;
  if (state.palette === id) {
    state.palette = null;
    toast("Material palette removed from your brief.");
  } else {
    state.palette = id;
    toast(`${palettes[id].name} added to your brief.`);
  }
  updateSelections();
});
function updateRoomSave() {
  const saved = state.priorities.has(state.currentRoom);
  $("#save-room").textContent = saved
    ? `Remove ${rooms[state.currentRoom].label.toLowerCase()} from my priorities −`
    : `Add ${rooms[state.currentRoom].label.toLowerCase()} to my priorities +`;
  $("#save-room").setAttribute("aria-pressed", String(saved));
}
for (const button of $$("[data-room]"))
  button.addEventListener("click", () => {
    state.currentRoom = button.dataset.room;
    const room = rooms[state.currentRoom];
    for (const control of $$("[data-room]"))
      control.setAttribute("aria-pressed", String(control === button));
    $("#room-kicker").textContent = room.kicker;
    $("#room-title").textContent = room.title;
    $("#room-title").classList.add("preserve-lines");
    $("#room-description").textContent = room.description;
    $("#room-question").textContent = room.question;
    updateRoomSave();
  });
$("#save-room").addEventListener("click", () => {
  const id = state.currentRoom;
  if (state.priorities.has(id)) {
    state.priorities.delete(id);
    toast(`${rooms[id].label} removed from your priorities.`);
  } else {
    state.priorities.add(id);
    toast(`${rooms[id].label} added to your priorities.`);
  }
  updateSelections();
});

for (const button of $$("[data-open-film]"))
  button.addEventListener("click", () => {
    const video = $("#study-video");
    if (!video.poster)
      video.poster = "/media/generated-architectural-journey-poster.webp";
    if (!video.getAttribute("src"))
      video.src = "/media/generated-architectural-journey.mp4";
    else if (video.error) video.load();
    $("#film-error").hidden = true;
    $("#film-status").textContent =
      "Arrival → Touch → Gather → Dwell. Generated architectural visualisations. No audio.";
    openDialog($("#film-dialog"));
  });
$("#study-video").addEventListener("error", () => {
  $("#film-error").hidden = false;
  $("#film-status").textContent =
    "The architectural film is temporarily unavailable.";
});
$("#film-dialog").addEventListener("close", () => $("#study-video").pause());
$("#film-fallback").addEventListener("click", () => $("#film-dialog").close());
$("#film-return").addEventListener("click", () => $("#film-dialog").close());

const form = $("#brief-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const name = String(data.get("name") || "").trim();
  if (!name) {
    form.elements.name.setCustomValidity("Please enter your name.");
    form.elements.name.reportValidity();
    return;
  }
  const lines = [
    "WOLCO HOMES / MY DESIGN BRIEF",
    "",
    `Name: ${name}`,
    `Email: ${String(data.get("email") || "").trim()}`,
  ];
  if (data.get("phone"))
    lines.push(`Phone: ${String(data.get("phone")).trim()}`);
  if (data.get("suburb"))
    lines.push(`Suburb: ${String(data.get("suburb")).trim()}`);
  lines.push(
    `I am considering: ${data.get("interest")}`,
    "",
    "MY COLLECTED IDEAS",
  );
  if (state.saved.size)
    lines.push(
      `Design studies: ${[...state.saved].map((id) => studies[id].title).join(", ")}`,
    );
  if (state.palette)
    lines.push(`Material mood: ${palettes[state.palette].name}`);
  if (state.priorities.size)
    lines.push(
      `Spaces that matter: ${[...state.priorities].map((id) => rooms[id].label).join(", ")}`,
    );
  if (!state.saved.size && !state.palette && !state.priorities.size)
    lines.push("I would like to explore the possibilities together.");
  lines.push(
    "",
    "MY VISION",
    String(data.get("vision") || "").trim() ||
      "I would like to discuss my ideas with you.",
    "",
    "Prepared in the WOLCO Atelier design demonstration. The saved studies are conceptual inspiration, not approved designs, inclusions or quotations.",
  );
  $("#brief-preview").value = lines.join("\n");
  updateEmail();
  $("#brief-status").textContent =
    "Nothing has been sent. Your email app will handle delivery when you choose to send.";
  openDialog($("#brief-dialog"));
});
form.elements.name.addEventListener("input", () =>
  form.elements.name.setCustomValidity(""),
);
function updateEmail() {
  const subject = "My WOLCO home design brief";
  $("#email-brief").href =
    `mailto:wolcohomes@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent($("#brief-preview").value)}`;
}
$("#brief-preview").addEventListener("input", updateEmail);
$("#email-brief").addEventListener("click", () => {
  $("#brief-status").textContent =
    "An email draft has been requested. Review it in your email app before sending. If nothing opens, use the download option below.";
});
$("#download-brief").addEventListener("click", () => {
  const blob = new Blob([$("#brief-preview").value], {
    type: "text/plain;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "my-wolco-design-brief.txt";
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  $("#brief-status").textContent =
    "Your brief has been downloaded. Nothing has been sent.";
});

const legalContent = {
  privacy: {
    title: "Your brief. Your choice.",
    paragraphs: [
      "This is a static design demonstration. Your name, contact details, saved ideas and written brief are held only in the current page while you use it. They are not submitted to a server or saved in browser storage. Reloading or closing the page clears the page state.",
      "Downloading creates a text file on your device. Choosing “Open email draft” asks your email app to compose a message addressed to wolcohomes@gmail.com. You review and send that email yourself; your email service handles the resulting message.",
      "This demonstration contains no analytics, advertising pixels, third-party fonts, embedded maps or marketing cookies. As with any hosted website, the hosting provider may process request information needed to deliver and protect the site.",
      "For a real enquiry or to ask about information you choose to send, contact WOLCO directly at wolcohomes@gmail.com. This explanation describes this demonstration; the final production site will need its own approved privacy information.",
    ],
  },
  about: {
    title: "An exploration of home.",
    paragraphs: [
      "Atelier is a design demonstration for WOLCO Homes. It explores a warm, material-led direction through architectural imagery, interactive studies and a personal design brief. It is not a finished production service or a property sales catalogue.",
      "The Arrival, The Stillness, The Gathering, The Tactile and the architectural film use generated concept imagery. They do not show completed WOLCO projects, actual studio interiors, approved designs, available lots or confirmed inclusions. The Cookes Road story uses supplied WOLCO project photographs.",
      "The space diagram is illustrative and has no scale. Material palettes suggest colours and textures; they do not specify brands, products, prices or availability. Project feasibility, scope, costs, timing and approvals require an individual discussion.",
      "The original WOLCO Homes logo is retained. Fonts and media are hosted with this demonstration. No enquiry is sent automatically; the brief can be downloaded or opened as a draft in your email app.",
    ],
  },
};
for (const button of $$("[data-legal]"))
  button.addEventListener("click", () => {
    const content = legalContent[button.dataset.legal];
    $("#legal-title").textContent = content.title;
    const container = $("#legal-content");
    container.replaceChildren();
    for (const text of content.paragraphs) {
      const p = document.createElement("p");
      p.textContent = text;
      container.append(p);
    }
    openDialog($("#legal-dialog"));
  });

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries)
        if (entry.isIntersecting) {
          for (const link of $$(".desktop-nav a")) {
            if (link.getAttribute("href") === `#${entry.target.id}`)
              link.setAttribute("aria-current", "location");
            else link.removeAttribute("aria-current");
          }
        }
    },
    { rootMargin: "-15% 0px -65% 0px", threshold: 0 },
  );
  for (const id of ["philosophy", "collection", "materials", "journey"])
    observer.observe(document.getElementById(id));
}
updateSelections();
