// ---------- 공통 유틸 (전 페이지 공용) ----------
function pad(n) { return String(n).padStart(2, '0'); }

function toISODate(d) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return toISODate(d);
}

const now = new Date();
const todayISO = toISODate(now);
const todayYear = now.getFullYear();
const todayMonth = now.getMonth() + 1;

function updateClock() {
  const n = new Date();
  const el = document.getElementById('header-clock');
  if (!el) return;
  el.textContent = n.toLocaleString('ko-KR', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
  });
}
updateClock();
setInterval(updateClock, 1000);

// ---------- 아이콘 (같은 폴더에 icon-daily.png 등 추가 시 자동 적용, 없으면 기본 아이콘) ----------
const ICON_FALLBACK = {
  daily: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>',
  monthly: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
  yearly: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19V9l8-5 8 5v10"/><path d="M9 19v-6h6v6"/></svg>'
};

function iconHtml(kind) {
  return `<img src="icon-${kind}.png" alt="" data-icon-kind="${kind}">`;
}

function wireIconFallbacks() {
  document.querySelectorAll('img[data-icon-kind]').forEach(img => {
    img.addEventListener('error', () => {
      const span = document.createElement('span');
      span.innerHTML = ICON_FALLBACK[img.dataset.iconKind];
      img.replaceWith(span.firstElementChild);
    });
  });
}

// CAS NO. 입력칸: 공백은 제거(자동 이어붙이기), 숫자/하이픈만 허용
function wireCasNoInput(input) {
  if (!input) return;
  input.addEventListener('input', () => {
    const caret = input.selectionStart;
    const before = input.value;
    input.value = input.value.replace(/\s+/g, '').replace(/[^0-9-]/g, '');
    const diff = before.length - input.value.length;
    if (caret != null) input.setSelectionRange(caret - diff, caret - diff);
  });
}
