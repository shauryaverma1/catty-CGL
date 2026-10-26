const statusLabels = {
  provisional_previous_cycle: "Provisional for 2027",
  awaiting_official_confirmation: "Awaiting official confirmation",
  verified_official: "Verified for source cycle",
  unresolved: "Needs mapping review",
  out_of_scope: "Out of scope"
};

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
}

function statusClass(status) {
  if (status === "awaiting_official_confirmation") return "status-awaiting";
  if (status === "provisional_previous_cycle") return "status-provisional";
  return "status-awaiting";
}

async function loadSyllabus() {
  const container = document.querySelector("#syllabus-tree");
  const counter = document.querySelector("#syllabus-count");
  const search = document.querySelector("#topic-search");
  try {
    const response = await fetch("public/data/syllabus-seed.json");
    if (!response.ok) throw new Error(`Could not load syllabus data (${response.status}).`);
    const data = await response.json();
    const allItems = data.groups.flatMap(group => group.items.map(item => ({ ...item, groupTitle: group.title })));
    function render(query = "") {
      const term = query.trim().toLocaleLowerCase();
      let visibleCount = 0;
      const html = data.groups.map(group => {
        const items = group.items.filter(item => !term || [
          item.label, item.id, item.reference, item.note, group.title
        ].join(" ").toLocaleLowerCase().includes(term));
        if (!items.length) return "";
        visibleCount += items.length;
        return `<article class="topic-group">
          <h3>${escapeHtml(group.title)}</h3>
          <p class="group-caption">${escapeHtml(group.caption)}</p>
          <ul class="topic-list">${items.map(item => `<li class="topic-row">
            <div><strong>${escapeHtml(item.label)}</strong><small>${escapeHtml(item.reference)}<br>${escapeHtml(item.note)}</small></div>
            <span class="status ${statusClass(item.mapping_status)}">${escapeHtml(statusLabels[item.mapping_status] || "Review status needed")}</span>
          </li>`).join("")}</ul>
        </article>`;
      }).join("");
      container.innerHTML = html || '<div class="empty-state">No matching topics yet. Try another search term.</div>';
      counter.textContent = `${visibleCount} starter ${visibleCount === 1 ? "topic" : "topics"} shown · ${allItems.length} in this compact seed map`;
    }
    render();
    search.addEventListener("input", () => render(search.value));
  } catch (error) {
    container.innerHTML = '<div class="empty-state">The syllabus seed could not be loaded. Run this site from a local web server and check that <code>public/data/syllabus-seed.json</code> is present.</div>';
    counter.textContent = "Syllabus data unavailable";
    console.error(error);
  }
}

async function loadLessonPreview() {
  const button = document.querySelector("#lesson-preview-button");
  const panel = document.querySelector("#lesson-preview");
  let lesson = null;
  button.addEventListener("click", async () => {
    const opening = panel.hidden;
    panel.hidden = !opening;
    button.setAttribute("aria-expanded", String(opening));
    button.textContent = opening ? "Close lesson preview" : "Open lesson preview";
    if (!opening || lesson) return;
    button.disabled = true;
    try {
      const response = await fetch("content/lessons/analogies.starter.json");
      if (!response.ok) throw new Error(`Could not load draft lesson (${response.status}).`);
      lesson = await response.json();
      panel.innerHTML = `<p class="preview-warning"><strong>Draft / not approved.</strong> This preview exists for project review only. The 2026 source supports the topic listing for 2026, not the target-cycle mapping by itself.</p>
        <h3>${escapeHtml(lesson.title)}</h3>
        <p><strong>Mapping:</strong> ${escapeHtml(statusLabels[lesson.mapping_status])} · <strong>Content:</strong> ${escapeHtml(lesson.content_status)}</p>
        <h4>Learning goals</h4>
        <ul class="objectives">${lesson.learning_objectives.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        ${lesson.sections.map(section => `<section><h4>${escapeHtml(section.heading)}</h4><p>${escapeHtml(section.body)}</p></section>`).join("")}
        <p class="small-note">The draft contains ${lesson.questions.length} original practice questions and ${lesson.flashcards.length} flashcards. They remain out of the approved study flow until an independent answer and syllabus review is recorded.</p>
        <p><a href="https://ssc.gov.in/api/attachment/uploads/masterData/NoticeBoards/Notice_of_adv_cgl_2026.pdf" target="_blank" rel="noreferrer">Open the official 2026 SSC notice ↗</a></p>`;
    } catch (error) {
      panel.innerHTML = '<p class="preview-warning">The draft lesson could not be loaded. Check the file path and run the site from a local server.</p>';
      console.error(error);
    } finally {
      button.disabled = false;
    }
  });
}

loadSyllabus();
loadLessonPreview();
