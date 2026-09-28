/* ================================================================
   DEVOPS SHOWCASE — js/listing.js
   Reusable "many items" engine for every listing page.
   Given a category it: loads all its .md items, builds the toolbar
   (search + status + technology + sort), filters, paginates
   ("Load more", 9 at a time) and hands each visible slice to the
   page's render function. Scales to hundreds of items unchanged.
   Needs in the page: #toolbar, #result-count, #load-more.
   ================================================================ */
const Listing = (() => {
  const PAGE_SIZE = 9; // cards shown per "Load more" click

  /** @param {{category:string, render:Function}} opts
   *  category = key of CONFIG.categories; render = Render.renderXxx */
  async function init({ category, render }) {
    const bar = document.getElementById('toolbar');
    const count = document.getElementById('result-count');
    const more = document.getElementById('load-more');

    // Load + sort newest-first (missing dates sort last).
    const items = ContentLoader.sortByDateDesc(
      await ContentLoader.loadCategory(CONFIG.categories[category]));

    // Build filter options from the data itself — no hardcoded lists.
    const uniq = (arr) => [...new Set(arr)].sort();
    const statuses = uniq(items.map((i) => i.meta.status).filter(Boolean));
    const techs = uniq(items.flatMap((i) => i.meta.technologies || []));
    const opts = (list, all) => `<option value="">${all}</option>` +
      list.map((v) => `<option>${v}</option>`).join('');

    bar.innerHTML = `
      <input id="f-q" type="search" placeholder="Search title, description, technology…">
      <select id="f-status">${opts(statuses, 'All statuses')}</select>
      <select id="f-tech">${opts(techs, 'All technologies')}</select>
      <select id="f-sort"><option value="new">Newest first</option><option value="old">Oldest first</option></select>`;
    const $ = (id) => document.getElementById(id);
    let shown = PAGE_SIZE;

    /** Filter → sort → paginate → render. Runs on every control change. */
    function apply() {
      const q = $('f-q').value.trim().toLowerCase();
      const list = items.filter(({ meta: m }) => {
        const hay = [m.title, m.description, ...(m.technologies || [])].join(' ').toLowerCase();
        return (!q || hay.includes(q)) &&
          (!$('f-status').value || m.status === $('f-status').value) &&
          (!$('f-tech').value || (m.technologies || []).includes($('f-tech').value));
      });
      if ($('f-sort').value === 'old') list.reverse();
      count.textContent = `Showing ${Math.min(shown, list.length)} of ${list.length} (${items.length} total)`;
      render(list.slice(0, shown));
      more.hidden = shown >= list.length;
    }

    bar.addEventListener('input', () => { shown = PAGE_SIZE; apply(); });
    more.addEventListener('click', () => { shown += PAGE_SIZE; apply(); });
    apply();
  }
  return { init };
})();
