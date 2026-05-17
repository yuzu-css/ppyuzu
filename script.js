'use strict';
/* ═══════════════════════════════════════════════════════
   localStorage 유틸
═══════════════════════════════════════════════════════ */
const LS = {
  get(k){ try{ return JSON.parse(localStorage.getItem(k)); }catch(e){ return null; } },
  set(k,v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} },
  del(k){ try{ localStorage.removeItem(k); }catch(e){} }
};

/* ═══════════════════════════════════════════════════════
   DOM 참조
═══════════════════════════════════════════════════════ */
const preview         = document.getElementById('preview');
const svgElement      = document.getElementById('svg-element');
const textElement     = document.getElementById('text-element');
const bgImageLayer    = document.getElementById('bg-image-layer');
const bgImage         = document.getElementById('bg-image');
const gridOverlay     = document.getElementById('grid-overlay');
const toast           = document.getElementById('toast');

// SVG 탭
const svgPresetGrid   = document.getElementById('svg-preset-grid');
const svgCustomGrid   = document.getElementById('svg-custom-grid');
const svgInput        = document.getElementById('svg-input');
const btnAddSvg       = document.getElementById('btn-add-svg');
const svgX            = document.getElementById('svg-x');
const svgY            = document.getElementById('svg-y');
const svgSize         = document.getElementById('svg-size');
const svgRotation     = document.getElementById('svg-rotation');
const svgStrokeWidth  = document.getElementById('svg-stroke-width');
const svgColor        = document.getElementById('svg-color');
const svgEffectToggle = document.getElementById('svg-effect-toggle');
const svgEffectW      = document.getElementById('svg-effect-width');
const svgEffectC      = document.getElementById('svg-effect-color');

// 텍스트 탭
const textInput       = document.getElementById('text-input');
const textX           = document.getElementById('text-x');
const textY           = document.getElementById('text-y');
const textSize        = document.getElementById('text-size');
const textRotation    = document.getElementById('text-rotation');
const textSpacing     = document.getElementById('text-spacing');
const textLineHeight  = document.getElementById('text-line-height');
const textColor       = document.getElementById('text-color');
const textEffectToggle= document.getElementById('text-effect-toggle');
const textEffectW     = document.getElementById('text-effect-width');
const textEffectC     = document.getElementById('text-effect-color');

// 배경 탭
const bgImageInput    = document.getElementById('bg-image-input');
const bgClearBtn      = document.getElementById('bg-clear-btn');
const bgSlotGrid      = document.getElementById('bg-slot-grid');
const bgControlsWrap  = document.getElementById('bg-controls-wrap');
const bgBrightness    = document.getElementById('bg-brightness');
const bgOpacity       = document.getElementById('bg-opacity');
const bgScale         = document.getElementById('bg-scale');
const bgImgRotation   = document.getElementById('bg-img-rotation');
// 배경 위치 슬라이더
const bgPosX          = document.getElementById('bg-pos-x');
const bgPosY          = document.getElementById('bg-pos-y');

// 오른쪽 패널
const solidColor          = document.getElementById('solid-color');
const gradientStartColor  = document.getElementById('gradient-start-color');
const gradientEndColor    = document.getElementById('gradient-end-color');
const gradientAngle       = document.getElementById('gradient-angle');
const gradientAngleValue  = document.getElementById('gradient-angle-value');
const bgTypeSolid         = document.getElementById('bg-type-solid');
const bgTypeGradient      = document.getElementById('bg-type-gradient');
const solidColorArea      = document.getElementById('solid-color-area');
const gradientColorArea   = document.getElementById('gradient-color-area');
const gradientPresetsArea = document.getElementById('gradient-presets-area');

// 액션바
const presetABtn      = document.getElementById('preset-a-btn');
const presetBBtn      = document.getElementById('preset-b-btn');
const presetCBtn      = document.getElementById('preset-c-btn');
const presetDBtn      = document.getElementById('preset-d-btn');
const resetBtn        = document.getElementById('reset-btn');
const undoBtn         = document.getElementById('undo-btn');
const redoBtn         = document.getElementById('redo-btn');
const layerToggleBtn  = document.getElementById('layer-toggle-btn');
const layerLabel      = document.getElementById('layer-label');
const savePresetBtn   = document.getElementById('save-preset-btn');
const loadPresetBtn   = document.getElementById('load-preset-btn');
const savePngBtn      = document.getElementById('save-png-btn');

// 슬롯 앨범
const addSlotBtn      = document.getElementById('add-slot-btn');
const overwriteModeBtn= document.getElementById('overwrite-mode-btn');
const slotAlbum       = document.getElementById('slot-album');
const slotGrid        = document.getElementById('slot-grid');
const slotDlAllBtn    = document.getElementById('slot-dl-all-btn');
const slotClearBtn    = document.getElementById('slot-clear-btn');
const slotOverwriteBar= document.getElementById('slot-overwrite-bar');
const slotOwCancel    = document.getElementById('slot-ow-cancel');

// #6: 커스텀 프리셋
const solidPresetAddBtn    = document.getElementById('solid-preset-add-btn');
const customSolidPresetsEl = document.getElementById('custom-solid-presets');
const gradPresetAddBtn     = document.getElementById('grad-preset-add-btn');
const customGradPresetsEl  = document.getElementById('custom-gradient-presets');

// 모달
const presetModal     = document.getElementById('preset-modal');
const modalTitle      = document.getElementById('modal-title');
const presetSlots     = document.getElementById('preset-slots');
const modalClose      = document.getElementById('modal-close');

// 확인 다이얼로그
const confirmModal    = document.getElementById('confirm-modal');
const confirmCancel   = document.getElementById('confirm-cancel');
const confirmOk       = document.getElementById('confirm-ok');

const gridBtn         = document.getElementById('grid-btn');
const themeToggle     = document.getElementById('theme-toggle');
const themeIcon       = document.getElementById('theme-icon');

/* ═══════════════════════════════════════════════════════
   상태
═══════════════════════════════════════════════════════ */
let state = {
  bgType: 'gradient',
  solidColor: '#6467F2',
  gradStart: '#6467F2',
  gradEnd: '#E0E7FF',
  gradAngle: 45,
  bgImageData: null,
  bgBrightness: 1,
  bgOpacity: 1,
  bgScale: 100,
  bgImgRotation: 0,
  bgFilter: 'none',
  bgImageDragX: 0,
  bgImageDragY: 0,
  bgPosX: 0,
  bgPosY: 0,
  svgCode: '',
  svgVisible: true,
  svgX: 0, svgY: 0, svgSize: 16, svgRotation: 0,
  svgStrokeWidth: 2, svgColor: '#FFFFFF',
  svgEffect: false, svgEffectType: 'glow', svgEffectW: 4, svgEffectC: '#ffffff',
  textContent: '',
  textX: 0, textY: 0, textSize: 24, textRotation: 0,
  textSpacing: 0, textLineHeight: 1.2, textFont: 'Pretendard-Regular', textAlign: 'center', textColor: '#FFFFFF',
  textEffect: false, textEffectType: 'glow', textEffectW: 4, textEffectC: '#000000',
  shape: 'circle',
  layerOrder: 'svg-top',
  activeSvgPresetIdx: -1,
  activeSvgCustomIdx: -1,
};

let slots = [];
let bgSlots = [];
let presets = Array(6).fill(null);
let customSvgs = [];
// 커스텀 색상 프리셋
let customSolidPresets = [];
let customGradPresets  = [];

// 덮어쓰기 모드
let overwriteMode = false;

let undoStack = [];
let redoStack = [];
const MAX_UNDO = 40;

/* ═══════════════════════════════════════════════════════
   유틸
═══════════════════════════════════════════════════════ */
function setRV(id, val){ const el = document.getElementById(id); if(el) el.textContent = val; }

function showToast(msg, dur=1800){
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(()=> toast.classList.remove('show'), dur);
}

function deepClone(obj){ return JSON.parse(JSON.stringify(obj)); }

function pushUndo(){
  undoStack.push(deepClone(state));
  if(undoStack.length > MAX_UNDO) undoStack.shift();
  redoStack = [];
}

/* ═══════════════════════════════════════════════════════
   localStorage 영속화
═══════════════════════════════════════════════════════ */
function saveToStorage(){
  const s = deepClone(state);
  const bgData = s.bgImageData;
  s.bgImageData = null;
  LS.set('app_state', s);
  if(bgData) LS.set('app_bg_image', bgData);
  else LS.del('app_bg_image');
  saveBgSlotsToStorage();
}

function saveBgSlotsToStorage(){
  LS.set('bg_slots_count', bgSlots.length);
  bgSlots.forEach((d,i)=>{ try{ localStorage.setItem('bg_slot_'+i, d); }catch(e){} });
}

function loadFromStorage(){
  const s = LS.get('app_state');
  if(s){
    state = Object.assign(state, s);
    const bgData = LS.get('app_bg_image');
    if(bgData) state.bgImageData = bgData;
  }
  const cnt = LS.get('bg_slots_count') || 0;
  bgSlots = [];
  for(let i=0;i<cnt;i++){
    const d = localStorage.getItem('bg_slot_'+i);
    if(d) bgSlots.push(d);
  }
  const savedSlots = LS.get('app_slots');
  if(savedSlots) slots = savedSlots;
  const savedPresets = LS.get('app_presets');
  if(savedPresets) presets = savedPresets;
  const savedSvgs = LS.get('app_custom_svgs');
  if(savedSvgs) customSvgs = savedSvgs;
  const csp = LS.get('custom_solid_presets');
  if(csp) customSolidPresets = csp;
  const cgp = LS.get('custom_grad_presets');
  if(cgp) customGradPresets = cgp;
}

function saveSlotsToStorage(){
  try{ LS.set('app_slots', slots.slice(0,20)); }catch(e){}
}

/* ═══════════════════════════════════════════════════════
   배경 적용
═══════════════════════════════════════════════════════ */
function applyBackground(){
  if(state.bgType === 'solid'){
    preview.style.background = state.solidColor;
  } else {
    preview.style.background =
      `linear-gradient(${state.gradAngle}deg, ${state.gradStart}, ${state.gradEnd})`;
  }
}

function applyBgImage(){
  if(state.bgImageData){
    bgImageLayer.style.display = 'block';
    bgImage.src = state.bgImageData;
    const filterStr = state.bgFilter && state.bgFilter !== 'none' ? state.bgFilter : 'none';
    bgImage.style.filter = filterStr;
    bgImage.style.opacity = state.bgOpacity;

    const scale = state.bgScale / 100;
    const totalX = state.bgImageDragX + (state.bgPosX || 0);
    const totalY = state.bgImageDragY + (state.bgPosY || 0);
    bgImage.style.transform =
      `translate(calc(-50% + ${totalX}px), calc(-50% + ${totalY}px)) scale(${scale}) rotate(${state.bgImgRotation}deg)`;
    bgControlsWrap.style.display = 'block';
  } else {
    bgImageLayer.style.display = 'none';
    bgImage.src = '';
    bgControlsWrap.style.display = 'none';
  }
}

/* ═══════════════════════════════════════════════════════
   SVG 적용
═══════════════════════════════════════════════════════ */
function updateSvg(){
  const x = parseInt(svgX.value), y = parseInt(svgY.value);
  const sz = parseInt(svgSize.value), r = parseInt(svgRotation.value);
  const sw = parseFloat(svgStrokeWidth.value);
  state.svgX = x; state.svgY = y; state.svgSize = sz;
  state.svgRotation = r; state.svgStrokeWidth = sw;
  state.svgColor = svgColor.value;

  svgElement.style.left      = `${100 + x}px`;
  svgElement.style.top       = `${100 + y}px`;
  svgElement.style.width     = `${sz}px`;
  svgElement.style.height    = `${sz}px`;
  svgElement.style.transform = `translate(-50%,-50%) rotate(${r}deg)`;
  svgElement.style.color     = svgColor.value;

  const svgEl = svgElement.querySelector('svg');
  if(svgEl){
    svgEl.setAttribute('stroke', svgColor.value);
    svgEl.style.stroke = svgColor.value;

    svgEl.querySelectorAll('[stroke]').forEach(el=>{ if(el.getAttribute('stroke')!=='none') el.setAttribute('stroke-width', sw); });
    svgEl.setAttribute('stroke-width', sw);
    svgEl.style.strokeWidth = sw;
  }

  setRV('svg-x-value', `${x}px`);
  setRV('svg-y-value', `${y}px`);
  setRV('svg-size-value', `${sz}px`);
  setRV('svg-rotation-value', `${r}°`);
  setRV('svg-stroke-width-value', `${sw}px`);
  applySvgEffect();
}

function applySvgEffect(){
  svgElement.style.filter = 'none';

  const innerSvg = svgElement.querySelector('svg');
  if(innerSvg){
    innerSvg.style.overflow = 'visible'; 
    const oldDef = innerSvg.querySelector('#dynamic-svg-effect');
    if(oldDef) oldDef.remove();
    innerSvg.removeAttribute('filter');
  }

  if(!svgEffectToggle.checked) { state.svgEffect = false; return; }

  const eff = document.querySelector('#svg-effect-sub .effect-btn.active')?.dataset.effect || 'glow';
  const w = parseInt(svgEffectW.value), ec = svgEffectC.value;
  setRV('svg-effect-width-value', `${w}px`);
  state.svgEffect = true; state.svgEffectType = eff; state.svgEffectW = w; state.svgEffectC = ec;

  if(innerSvg){
    let filterHtml = '';
    if(eff === 'glow'){
      filterHtml = `<filter id="dynamic-svg-effect" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="0" dy="0" stdDeviation="${w/2}" flood-color="${ec}" flood-opacity="1" result="s1"/>
        <feDropShadow in="s1" dx="0" dy="0" stdDeviation="${w}" flood-color="${ec}" flood-opacity="1"/>
      </filter>`;
    } else if(eff === 'shadow'){
      filterHtml = `<filter id="dynamic-svg-effect" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="${w/2}" dy="${w/2}" stdDeviation="${w/2}" flood-color="#000000" flood-opacity="0.6"/>
      </filter>`;
    } else if(eff === 'neon'){
      filterHtml = `<filter id="dynamic-svg-effect" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="0" dy="0" stdDeviation="${w*0.25}" flood-color="#ffffff" flood-opacity="1" result="n1"/>
        <feDropShadow in="n1" dx="0" dy="0" stdDeviation="${w/2}" flood-color="${ec}" flood-opacity="1" result="n2"/>
        <feDropShadow in="n2" dx="0" dy="0" stdDeviation="${w}" flood-color="${ec}" flood-opacity="1"/>
      </filter>`;
    } else if(eff === 'outline'){
      filterHtml = `<filter id="dynamic-svg-effect" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="1" dy="0" stdDeviation="0" flood-color="${ec}" flood-opacity="1" result="o1"/>
        <feDropShadow in="o1" dx="-1" dy="0" stdDeviation="0" flood-color="${ec}" flood-opacity="1" result="o2"/>
        <feDropShadow in="o2" dx="0" dy="1" stdDeviation="0" flood-color="${ec}" flood-opacity="1" result="o3"/>
        <feDropShadow in="o3" dx="0" dy="-1" stdDeviation="0" flood-color="${ec}" flood-opacity="1"/>
      </filter>`;
    } else if(eff === 'blur'){
      filterHtml = `<filter id="dynamic-svg-effect" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="${w*0.4}"/>
      </filter>`;
    }

    if(filterHtml){
      innerSvg.insertAdjacentHTML('afterbegin', filterHtml);
      innerSvg.setAttribute('filter', 'url(#dynamic-svg-effect)');
    }
  }
}

function setSvgContent(code){
  state.svgCode = code;
  state.svgVisible = true;
  svgElement.innerHTML = code;
  svgElement.style.display = '';
  const inner = svgElement.querySelector('svg');
  if(inner){
    inner.style.width = '100%';
    inner.style.height = '100%';
    inner.style.display = 'block';
    inner.setAttribute('stroke', svgColor.value);
    inner.style.stroke = svgColor.value;
  }
  updateSvg();
}

/* SVG 숨기기/보이기 토글 */
function toggleSvgVisibility(){
  if(!state.svgCode) return;
  state.svgVisible = !state.svgVisible;
  svgElement.style.display = state.svgVisible ? '' : 'none';
  showToast(state.svgVisible ? '👁️ SVG 표시됨' : '🙈 SVG 숨겨짐');
}

/* ═══════════════════════════════════════════════════════
   텍스트 적용
═══════════════════════════════════════════════════════ */
function updateText(){
  const x = parseInt(textX.value), y = parseInt(textY.value);
  const sz = parseInt(textSize.value), r = parseInt(textRotation.value);
  const sp = parseFloat(textSpacing.value);
  const lh = parseFloat(textLineHeight.value);
  state.textX = x; state.textY = y; state.textSize = sz;
  state.textRotation = r; state.textSpacing = sp;
  state.textLineHeight = lh;
  state.textColor = textColor.value;

  textElement.style.left          = `${100 + x}px`;
  textElement.style.top           = `${100 + y}px`;
  textElement.style.fontSize      = `${sz}px`;
  textElement.style.transform     = `translate(-50%,-50%) rotate(${r}deg)`;
  textElement.style.color         = textColor.value;
  textElement.style.letterSpacing = `${sp}px`;
  textElement.style.lineHeight = lh;
  // 줄바꿈 허용
  textElement.style.whiteSpace    = 'pre-wrap';
  textElement.style.writingMode   = 'horizontal-tb';
  textElement.style.textOrientation = 'mixed';
  textElement.style.textAlign     = state.textAlign;

  setRV('text-x-value', `${x}px`);
  setRV('text-y-value', `${y}px`);
  setRV('text-size-value', `${sz}px`);
  setRV('text-rotation-value', `${r}°`);
  setRV('text-spacing-value', `${sp}px`);
  setRV('text-line-height-value', lh.toFixed(1));
  applyTextEffect();
}

function applyTextEffect(){
  textElement.style.webkitTextStroke = '0px transparent';
  textElement.style.textShadow = 'none';
  if(!textEffectToggle.checked){ state.textEffect=false; return; }
  const eff = document.querySelector('#text-effect-sub .effect-btn.active')?.dataset.effect || 'glow';
  const w = parseInt(textEffectW.value), ec = textEffectC.value;
  setRV('text-effect-width-value', `${w}px`);
  state.textEffect = true; state.textEffectType = eff; state.textEffectW = w; state.textEffectC = ec;
  const effects = {
    glow:   `0px 0px ${w}px ${ec}, 0px 0px ${w*2}px ${ec}`,
    stroke: '',
    shadow: `${w/2}px ${w/2}px ${w}px rgba(0,0,0,.7)`,
    neon:   `0px 0px ${w*0.5}px #ffffff, 0px 0px ${w}px ${ec}, 0px 0px ${w*2}px ${ec}`,
    emboss: `${w/2}px ${w/2}px ${w/3}px rgba(255,255,255,.4), -${w/2}px -${w/2}px ${w/3}px rgba(0,0,0,.5)`,
    retro:  `2px 2px 0px ${ec}, 4px 4px 0px rgba(0,0,0,.2)`,
  };
  if(eff === 'stroke'){
    textElement.style.webkitTextStroke = `${w/3}px ${ec}`;
  } else {
    textElement.style.textShadow = effects[eff] || effects.glow;
  }
}

function setTextContent(val){
  state.textContent = val;
  textElement.textContent = val;
}

/* ═══════════════════════════════════════════════════════
   모양 적용
═══════════════════════════════════════════════════════ */
const SHAPES = {
  circle:  { borderRadius:'50%',   clipPath:'' },
  square:  { borderRadius:'0',     clipPath:'' },
  rounded: { borderRadius:'18%',   clipPath:'' },
  folder:  { borderRadius:'0',     clipPath:'path("M 16 34 L 100 34 Q 116 34 120 0 L 200 0 Q 200 0 200 16 L 200 184 Q 200 200 184 200 L 16 200 Q 0 200 0 184 L 0 50 Q 0 34 16 34 Z")' },
};

function applyShape(shape){
  state.shape = shape;
  const s = SHAPES[shape] || SHAPES.circle;
  preview.style.borderRadius = s.borderRadius;
  preview.style.clipPath = s.clipPath;
  preview.dataset.shape = shape;
  document.querySelectorAll('.shape-btn').forEach(b=>{
    b.classList.toggle('active', b.dataset.shape === shape);
  });
}

/* ═══════════════════════════════════════════════════════
   배경 타입 (단색/그라데이션)
═══════════════════════════════════════════════════════ */
function setBgType(type){
  state.bgType = type;
  if(type === 'solid'){
    bgTypeSolid.classList.add('active');
    bgTypeGradient.classList.remove('active');
    solidColorArea.style.display = 'block';
    gradientColorArea.style.display = 'none';
    gradientPresetsArea.style.display = 'none';
  } else {
    bgTypeGradient.classList.add('active');
    bgTypeSolid.classList.remove('active');
    solidColorArea.style.display = 'none';
    gradientColorArea.style.display = 'block';
    gradientPresetsArea.style.display = 'block';
  }
  applyBackground();
}

/* ═══════════════════════════════════════════════════════
   SVG 프리셋 목록
═══════════════════════════════════════════════════════ */
const SVG_PRESETS = [
  { name: '별', code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" stroke="currentColor" stroke-width="2" fill="none" stroke-linejoin="round"/></svg>` },
  { name: '하트', code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" stroke-width="2" fill="none" stroke-linejoin="round"/></svg>` },
  { name: '불꽃', code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" stroke="currentColor" stroke-width="2" fill="none" stroke-linejoin="round"/></svg>` },
  { name: '반짝이', code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"/><path d="M20 2v4"/><path d="M22 4h-4"/><circle cx="4" cy="20" r="2"/></svg>` },
  { name: '바나나', code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 13c3.5-2 8-2 10 2a5.5 5.5 0 0 1 8 5"/><path d="M5.15 17.89c5.52-1.52 8.65-6.89 7-12C11.55 4 11.5 2 13 2c3.22 0 5 5.5 5 8 0 6.5-4.2 12-10.49 12C5.11 22 2 22 2 20c0-1.5 1.14-1.55 3.15-2.11Z"/></svg>` },
  { name: '남성', code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 3h5v5"/><path d="m21 3-6.75 6.75"/><circle cx="10" cy="14" r="6"/></svg>` },
  { name: '여성', code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15v7"/><path d="M9 19h6"/><circle cx="12" cy="9" r="6"/></svg>` },
  { name: '성별', code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 20h4"/><path d="M12 16v6"/><path d="M17 2h4v4"/><path d="m21 2-5.46 5.46"/><circle cx="12" cy="11" r="5"/></svg>` },
  { name: '강아지', code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11.25 16.25h1.5L12 17z"/><path d="M16 14v.5"/><path d="M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444a11.702 11.702 0 0 0-.493-3.309"/><path d="M8 14v.5"/><path d="M8.5 8.5c-.384 1.05-1.083 2.028-2.344 2.5-1.931.722-3.576-.297-3.656-1-.113-.994 1.177-6.53 4-7 1.923-.321 3.651.845 3.651 2.235A7.497 7.497 0 0 1 14 5.277c0-1.39 1.844-2.598 3.767-2.277 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5"/></svg>` },
  { name: '고양이', code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z"/><path d="M8 14v.5"/><path d="M16 14v.5"/><path d="M11.25 16.25h1.5L12 17l-.75-.75Z"/></svg>` },
  { name: '로봇', code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>` },
  { name: '유저', code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>` },
  { name: '얼굴 인식', code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><path d="M9 9h.01"/><path d="M15 9h.01"/></svg>` },
  { name: '상자', code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"/><path d="M12 22V12"/><polyline points="3.29 7 12 12 20.71 7"/><path d="m7.5 4.27 9 5.15"/></svg>` },
  { name: '하트 톡', code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"/><path d="M7.828 13.07A3 3 0 0 1 12 8.764a3 3 0 0 1 5.004 2.224 3 3 0 0 1-.832 2.083l-3.447 3.62a1 1 0 0 1-1.45-.001z"/></svg>` },
  { name: '전구', code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>` },
  { name: '언어', code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/></svg>` },
  { name: '둥근 별', code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M11.051 7.616a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.867l-1.156-1.152a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z"/></svg>` },
  { name: '일정', code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 14v2.2l1.6 1"/><path d="M16 2v4"/><path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5"/><path d="M3 10h5"/><path d="M8 2v4"/><circle cx="16" cy="16" r="6"/></svg>` },
  { name: '휴지통', code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>` },
];

function buildSvgPresets(){
  svgPresetGrid.innerHTML = '';
  SVG_PRESETS.forEach((p,i)=>{
    const btn = document.createElement('button');
    btn.className = 'svg-preset-btn';
    btn.title = p.name;
    btn.innerHTML = p.code;
    // 선택된 프리셋 인덱스 복원
    if(state.activeSvgPresetIdx === i) btn.classList.add('active');
    btn.addEventListener('click',()=>{
      // 이미 선택된 프리셋을 다시 누르면 숨기기/삭제
      if(state.activeSvgPresetIdx === i && state.svgCode){
        if(state.svgVisible){
          // 표시 중 → 숨기기
          pushUndo();
          toggleSvgVisibility();
          btn.classList.remove('active');
          state.activeSvgPresetIdx = -1;
          saveToStorage();
        } else {
          // 숨겨진 상태 → 다시 보이기
          pushUndo();
          state.svgVisible = true;
          svgElement.style.display = '';
          btn.classList.add('active');
          showToast('👁️ SVG 표시됨');
          saveToStorage();
        }
        return;
      }
      pushUndo();
      document.querySelectorAll('.svg-preset-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      state.activeSvgPresetIdx = i;
      state.activeSvgCustomIdx = -1;
      setSvgContent(p.code);
      saveToStorage();
    });
    svgPresetGrid.appendChild(btn);
  });
}

function buildCustomSvgGrid(){
  if(customSvgs.length === 0){ svgCustomGrid.style.display='none'; return; }
  svgCustomGrid.style.display='grid';
  svgCustomGrid.innerHTML='';
  customSvgs.forEach((code,i)=>{
    const wrap = document.createElement('div');
    wrap.className='svg-custom-item';
    const btn = document.createElement('button');
    btn.className='svg-preset-btn';
    btn.innerHTML=code;
    if(state.activeSvgCustomIdx === i) btn.classList.add('active');
    btn.addEventListener('click',()=>{
      // 이미 선택된 커스텀 SVG 다시 누르면 숨기기
      if(state.activeSvgCustomIdx === i && state.svgCode){
        if(state.svgVisible){
          pushUndo();
          toggleSvgVisibility();
          btn.classList.remove('active');
          state.activeSvgCustomIdx = -1;
          saveToStorage();
        } else {
          pushUndo();
          state.svgVisible = true;
          svgElement.style.display = '';
          btn.classList.add('active');
          showToast('👁️ SVG 표시됨');
          saveToStorage();
        }
        return;
      }
      pushUndo();
      document.querySelectorAll('.svg-preset-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      state.activeSvgCustomIdx = i;
      state.activeSvgPresetIdx = -1;
      setSvgContent(code);
      saveToStorage();
    });
    const del = document.createElement('button');
    del.className='svg-custom-del';
    del.textContent='×';
    del.addEventListener('click',()=>{
      customSvgs.splice(i,1);
      LS.set('app_custom_svgs',customSvgs);
      buildCustomSvgGrid();
    });
    wrap.appendChild(btn);
    wrap.appendChild(del);
    svgCustomGrid.appendChild(wrap);
  });
}

/* ═══════════════════════════════════════════════════════
   배경 슬롯 (배경 탭)
═══════════════════════════════════════════════════════ */
function renderBgSlots(){
  bgSlotGrid.innerHTML='';
  bgSlots.forEach((data,i)=>{
    const item=document.createElement('div');
    item.className='bg-slot-item';
    const img=document.createElement('img');
    img.src=data;
    img.alt='배경 이미지';
    const del=document.createElement('button');
    del.className='bg-slot-del';
    del.textContent='×';
    del.addEventListener('click',e=>{
      e.stopPropagation();
      bgSlots.splice(i,1);
      saveBgSlotsToStorage();
      renderBgSlots();
    });
    item.appendChild(img);
    item.appendChild(del);
    item.addEventListener('click',()=>{
      pushUndo();
      state.bgImageData=data;
      state.bgImageDragX=0;
      state.bgImageDragY=0;
      applyBgImage();
      saveToStorage();
    });
    bgSlotGrid.appendChild(item);
  });
}

/* ═══════════════════════════════════════════════════════
   #6: 커스텀 색상 프리셋 렌더
═══════════════════════════════════════════════════════ */
function renderCustomSolidPresets(){
  if(!customSolidPresetsEl) return;
  customSolidPresetsEl.innerHTML='';
  if(customSolidPresets.length===0){ customSolidPresetsEl.style.display='none'; return; }
  customSolidPresetsEl.style.display='grid';
  customSolidPresets.forEach((c,i)=>{
    const wrap=document.createElement('div');
    wrap.className='custom-preset-wrap';
    const el=document.createElement('div');
    el.className='sp';
    el.style.background=c;
    el.title=c;
    el.addEventListener('click',()=>{
      pushUndo();
      state.solidColor=c;
      solidColor.value=c;
      if(state.bgType!=='solid') setBgType('solid');
      applyBackground();
      saveToStorage();
    });
    const del=document.createElement('button');
    del.className='custom-preset-del';
    del.textContent='×';
    del.addEventListener('click',e=>{
      e.stopPropagation();
      customSolidPresets.splice(i,1);
      LS.set('custom_solid_presets',customSolidPresets);
      renderCustomSolidPresets();
    });
    wrap.appendChild(el);
    wrap.appendChild(del);
    customSolidPresetsEl.appendChild(wrap);
  });
}

function renderCustomGradPresets(){
  if(!customGradPresetsEl) return;
  customGradPresetsEl.innerHTML='';
  if(customGradPresets.length===0){ customGradPresetsEl.style.display='none'; return; }
  customGradPresetsEl.style.display='grid';
  customGradPresets.forEach((g,i)=>{
    const wrap=document.createElement('div');
    wrap.className='custom-preset-wrap';
    const el=document.createElement('div');
    el.className='gp';
    el.style.background=`linear-gradient(45deg,${g.s},${g.e})`;
    el.title=`${g.s} → ${g.e}`;
    el.addEventListener('click',()=>{
      pushUndo();
      if(state.bgType!=='gradient') setBgType('gradient');
      state.gradStart=g.s;
      state.gradEnd=g.e;
      gradientStartColor.value=g.s;
      gradientEndColor.value=g.e;
      applyBackground();
      saveToStorage();
    });
    const del=document.createElement('button');
    del.className='custom-preset-del';
    del.textContent='×';
    del.addEventListener('click',e=>{
      e.stopPropagation();
      customGradPresets.splice(i,1);
      LS.set('custom_grad_presets',customGradPresets);
      renderCustomGradPresets();
    });
    wrap.appendChild(el);
    wrap.appendChild(del);
    customGradPresetsEl.appendChild(wrap);
  });
}

/* ═══════════════════════════════════════════════════════
   슬롯 앨범
═══════════════════════════════════════════════════════ */
function renderSlots(){
  slotGrid.innerHTML='';
  if(slots.length===0){
    slotAlbum.style.display='none';
    return;
  }
  slotAlbum.style.display='block';
  slots.forEach((slot,i)=>{
    const item=document.createElement('div');
    item.className='slot-item';
    item.draggable=true; // 드래그 가능
    item.dataset.idx=i;

    const img=document.createElement('img');
    img.src=slot.dataUrl;
    img.alt=slot.label||`슬롯 ${i+1}`;

    const label=document.createElement('div');
    label.className='slot-label';
    label.innerHTML=`${slot.label||`#${i+1}`}<span class="slot-size-info">${slot.size||''}</span>`;

    const btns=document.createElement('div');
    btns.className='slot-btns';

    // 복제
    const clone=document.createElement('button');
    clone.className='slot-btn-clone';
    clone.title='슬롯 복제';
    clone.textContent='⧉';
    clone.addEventListener('click',e=>{
      e.stopPropagation();
      const cloned=deepClone(slot);
      cloned.label=`#${slots.length+1}`;
      slots.push(cloned);
      saveSlotsToStorage();
      renderSlots();
      showToast('슬롯이 복제됐어요');
    });

    // 다운로드
    const dl=document.createElement('button');
    dl.className='slot-btn-dl';
    dl.title='PNG 저장';
    dl.textContent='⬇';
    dl.addEventListener('click',e=>{ e.stopPropagation(); downloadDataUrl(slot.dataUrl,`slot_${i+1}.png`); });

    // 삭제
    const del=document.createElement('button');
    del.className='slot-btn-del';
    del.title='삭제';
    del.textContent='×';
    del.addEventListener('click',e=>{ e.stopPropagation(); slots.splice(i,1); saveSlotsToStorage(); renderSlots(); });

    btns.appendChild(clone);
    btns.appendChild(dl);
    btns.appendChild(del);
    item.appendChild(img);
    item.appendChild(label);
    item.appendChild(btns);

    // 덮어쓰기 모드 클릭
    item.addEventListener('click',()=>{
      if(overwriteMode){
        overwriteSlot(i);
        return;
      }
      if(slot.savedState){
        pushUndo();
        state=deepClone(slot.savedState);
        applyStateToUI();
        showToast(`↩ 슬롯 ${i+1} 불러왔어요`);
      }
    });

    // 드래그&드롭 순서 변경
    item.addEventListener('dragstart',e=>{
      e.dataTransfer.setData('text/plain', i);
      item.classList.add('dragging-slot');
    });
    item.addEventListener('dragend',()=> item.classList.remove('dragging-slot'));
    item.addEventListener('dragover',e=>{ e.preventDefault(); item.classList.add('drag-over'); });
    item.addEventListener('dragleave',()=> item.classList.remove('drag-over'));
    item.addEventListener('drop',e=>{
      e.preventDefault();
      item.classList.remove('drag-over');
      const fromIdx = parseInt(e.dataTransfer.getData('text/plain'));
      const toIdx = i;
      if(fromIdx === toIdx) return;
      const moved = slots.splice(fromIdx,1)[0];
      slots.splice(toIdx,0,moved);
      // 라벨 재번호
      slots.forEach((s,idx)=>{ s.label=`#${idx+1}`; });
      saveSlotsToStorage();
      renderSlots();
      showToast('슬롯 순서 변경됨');
    });

    slotGrid.appendChild(item);
  });
}

// 슬롯 덮어쓰기
async function overwriteSlot(idx){
  showToast('🖼️ 덮어쓰는 중...', 9999);
  const dataUrl = await capturePreview();
  if(!dataUrl){ showToast('❌ 실패'); return; }
  slots[idx].dataUrl = dataUrl;
  slots[idx].savedState = deepClone(state);
  saveSlotsToStorage();
  renderSlots();
  exitOverwriteMode();
  showToast(`✅ 슬롯 ${idx+1} 덮어씌웠어요!`);
}

function enterOverwriteMode(){
  overwriteMode = true;
  slotAlbum.classList.add('overwrite-mode');
  slotOverwriteBar.style.display = 'flex';
  overwriteModeBtn.classList.add('active');
  showToast('✏️ 덮어쓸 슬롯을 선택하세요');
}

function exitOverwriteMode(){
  overwriteMode = false;
  slotAlbum.classList.remove('overwrite-mode');
  slotOverwriteBar.style.display = 'none';
  overwriteModeBtn.classList.remove('active');
}

function downloadDataUrl(dataUrl, filename){
  const a=document.createElement('a');
  a.href=dataUrl;
  a.download=filename;
  a.click();
}

/* ═══════════════════════════════════════════════════════
   PNG 저장 (html2canvas) — #1: 200px 고정
   필터를 Canvas에 직접 합성하여 슬롯/다운로드에도 반영
═══════════════════════════════════════════════════════ */
async function capturePreview(){
  try{
    const hasFilter = state.bgImageData && state.bgFilter && state.bgFilter !== 'none';
    const filterStr = hasFilter ? state.bgFilter : null;

    const canvas = await html2canvas(preview, {
      scale: 1, useCORS: true, allowTaint: true,
      backgroundColor: null, logging: false,
      width: 200, height: 200,
      onclone: function(doc){
        var clonedPreview = doc.getElementById('preview');
        if(clonedPreview){
          clonedPreview.style.clipPath = 'none';
          clonedPreview.style.borderRadius = '0';
        }
        var clonedImg = doc.getElementById('bg-image');
        if(clonedImg && filterStr){
          clonedImg.style.cssText += ';filter:' + filterStr + ' !important;-webkit-filter:' + filterStr + ' !important;';
        }
      }
    });

    const shape = state.shape;
    if(shape === 'folder' || shape === 'circle' || shape === 'rounded'){
      const W = 200, H = 200;
      const masked = document.createElement('canvas');
      masked.width = W; masked.height = H;
      const ctx = masked.getContext('2d');
      ctx.save();
      if(shape === 'circle'){
        ctx.beginPath();
        ctx.arc(W/2, H/2, W/2, 0, Math.PI*2);
        ctx.closePath();
        ctx.clip();
      } else if(shape === 'rounded'){
        const r = W * 0.18;
        ctx.beginPath();
        ctx.moveTo(r, 0); ctx.lineTo(W-r, 0);
        ctx.quadraticCurveTo(W, 0, W, r);
        ctx.lineTo(W, H-r);
        ctx.quadraticCurveTo(W, H, W-r, H);
        ctx.lineTo(r, H);
        ctx.quadraticCurveTo(0, H, 0, H-r);
        ctx.lineTo(0, r);
        ctx.quadraticCurveTo(0, 0, r, 0);
        ctx.closePath();
        ctx.clip();
      } else if(shape === 'folder'){
        const p = new Path2D('M 16 34 L 100 34 Q 116 34 120 0 L 200 0 Q 200 0 200 16 L 200 184 Q 200 200 184 200 L 16 200 Q 0 200 0 184 L 0 50 Q 0 34 16 34 Z');
        ctx.clip(p);
    }
      ctx.drawImage(canvas, 0, 0);
      ctx.restore();
      return masked.toDataURL('image/png');
    }

    return canvas.toDataURL('image/png');
  } catch(e){
    showToast('캡처 실패: ' + e.message, 3000);
    return null;
  }
}

async function savePng(){
  showToast('🖼️ 저장 중...',9999);
  const dataUrl=await capturePreview();
  if(!dataUrl){ showToast('❌ 저장 실패'); return; }
  downloadDataUrl(dataUrl,'profile_200px.png');
  showToast('✅ 저장 완료!');
}

async function addToSlot(){
  showToast('🖼️ 슬롯 추가 중...',9999);
  const dataUrl=await capturePreview();
  if(!dataUrl){ showToast('❌ 실패'); return; }
  const label=`#${slots.length+1}`;
  slots.push({ dataUrl, label, savedState: deepClone(state), bgFilter: state.bgFilter });
  saveSlotsToStorage();
  renderSlots();
  showToast('✅ 슬롯에 추가됐어요!');
}

/* ═══════════════════════════════════════════════════════
   레이아웃 A/B/C/D 프리셋
═══════════════════════════════════════════════════════ */
function applyLayoutPreset(preset){
  pushUndo();
  document.querySelectorAll('.abar-btn.layout-btn').forEach(b=>b.classList.remove('active-layout'));

  if(preset==='A'){
    document.getElementById('preset-a-btn').classList.add('active-layout');
    applyShape('circle');
    svgX.value=0; svgY.value=-25; svgSize.value=100; svgRotation.value=0;
    textX.value=0; textY.value=55; textSize.value=40;
    setTextAlign('center');
    updateSvg(); updateText();
    showToast('레이아웃 A 적용');
  } else if(preset==='B'){
    document.getElementById('preset-b-btn').classList.add('active-layout');
    applyShape('square');
    svgX.value=72; svgY.value=-70; svgSize.value=55; svgRotation.value=0;
    textX.value=-0; textY.value=10; textSize.value=80;
    setTextAlign('left');
    updateSvg(); updateText();
    showToast('레이아웃 B 적용');
  } else if(preset==='C'){
    document.getElementById('preset-c-btn').classList.add('active-layout');
    applyShape('rounded');
    svgX.value=0; svgY.value=25; svgSize.value=140;
    textX.value=0; textY.value=-60; textSize.value=36;
    setTextAlign('center');
    updateSvg(); updateText();
    showToast('레이아웃 C 적용');
  } else if(preset==='D'){
    document.getElementById('preset-d-btn').classList.add('active-layout');
    applyShape('folder');
    svgX.value=52; svgY.value=-50; svgSize.value=85; svgRotation.value=0;
    textX.value=-30; textY.value=62; textSize.value=56;
    setTextAlign('left');
    updateSvg(); updateText();
    showToast('레이아웃 D 적용');
  }
  saveToStorage();
}

function setTextAlign(align){
  state.textAlign = align;
  document.querySelectorAll('.align-btn').forEach(b=>{
    b.classList.toggle('active', b.dataset.align===align);
  });
  textElement.style.textAlign = align;
  textElement.style.writingMode = 'horizontal-tb';
}

/* ═══════════════════════════════════════════════════════
   레이어 토글 버튼
═══════════════════════════════════════════════════════ */
function applyLayerOrder(order){
  state.layerOrder = order;
  if(order === 'svg-top'){
    svgElement.style.zIndex = 2;
    textElement.style.zIndex = 1;
    layerLabel.textContent = 'SVG위';
    layerToggleBtn.classList.add('accent');
  } else {
    svgElement.style.zIndex = 1;
    textElement.style.zIndex = 2;
    layerLabel.textContent = '텍스트위';
    layerToggleBtn.classList.remove('accent');
  }
}

/* ═══════════════════════════════════════════════════════
   실행 취소 / 다시 실행
═══════════════════════════════════════════════════════ */
function undo(){
  if(!undoStack.length){ showToast('더 이상 취소할 수 없어요'); return; }
  redoStack.push(deepClone(state));
  state = undoStack.pop();
  applyStateToUI();
  showToast('↩ 취소됐어요');
}
function redo(){
  if(!redoStack.length){ showToast('더 이상 다시 실행할 수 없어요'); return; }
  undoStack.push(deepClone(state));
  state = redoStack.pop();
  applyStateToUI();
  showToast('↪ 다시 실행됐어요');
}

function applyStateToUI(){
  setBgType(state.bgType);
  solidColor.value = state.solidColor;
  gradientStartColor.value = state.gradStart;
  gradientEndColor.value = state.gradEnd;
  gradientAngle.value = state.gradAngle;
  gradientAngleValue.textContent = state.gradAngle+'°';
  applyBackground();
  applyBgImage();
  applyShape(state.shape);

  svgX.value=state.svgX; svgY.value=state.svgY;
  svgSize.value=state.svgSize; svgRotation.value=state.svgRotation;
  svgStrokeWidth.value=state.svgStrokeWidth; svgColor.value=state.svgColor;

// SVG 효과 UI 복원
  svgEffectToggle.checked = state.svgEffect || false;
  document.getElementById('svg-effect-sub').classList.toggle('open', svgEffectToggle.checked);
  if(state.svgEffectW) { svgEffectW.value = state.svgEffectW; setRV('svg-effect-width-value', state.svgEffectW + 'px'); }
  if(state.svgEffectC) svgEffectC.value = state.svgEffectC;
  document.querySelectorAll('#svg-effect-sub .effect-btn').forEach(b => b.classList.toggle('active', b.dataset.effect === (state.svgEffectType || 'glow')));

  // 텍스트 효과 UI 복원
  textEffectToggle.checked = state.textEffect || false;
  document.getElementById('text-effect-sub').classList.toggle('open', textEffectToggle.checked);
  if(state.textEffectW) { textEffectW.value = state.textEffectW; setRV('text-effect-width-value', state.textEffectW + 'px'); }
  if(state.textEffectC) textEffectC.value = state.textEffectC;
  document.querySelectorAll('#text-effect-sub .effect-btn').forEach(b => b.classList.toggle('active', b.dataset.effect === (state.textEffectType || 'glow')));

  const intendedVisibility = state.svgVisible; // 불러온 슬롯에 저장된 진짜 숨김 상태를 미리 기억해둡니다.

  if(state.svgCode){
    setSvgContent(state.svgCode);
    
    // setSvgContent 함수가 무조건 눈에 보이게(true) 바꿔버리므로, 기억해둔 원래 상태로 다시 덮어씌웁니다.
    state.svgVisible = intendedVisibility; 
    
    // 원래 숨겨져 있어야 하는 상태라면 화면에서 완벽하게 숨깁니다.
    if(!state.svgVisible) {
      svgElement.style.display = 'none';
    }
  } else {
    // 아예 SVG가 없는 경우
    svgElement.innerHTML = '';
    svgElement.style.display = 'none';
  }

  textInput.value=state.textContent;
  textX.value=state.textX; textY.value=state.textY;
  textSize.value=state.textSize; textRotation.value=state.textRotation;
  textSpacing.value=state.textSpacing; textColor.value=state.textColor;
  textLineHeight.value=state.textLineHeight || 1.2;
  setTextContent(state.textContent);

  document.querySelector('.font-selected').textContent = getFontLabel(state.textFont);
  document.querySelectorAll('.align-btn').forEach(b=>b.classList.toggle('active', b.dataset.align===state.textAlign));
  textElement.style.fontFamily = `'${state.textFont}',sans-serif`;



  updateText(); updateSvg();

  // 배경 위치 복원
  if(bgPosX){ bgPosX.value = state.bgPosX||0; setRV('bg-pos-x-value',(state.bgPosX||0)+'px'); }
  if(bgPosY){ bgPosY.value = state.bgPosY||0; setRV('bg-pos-y-value',(state.bgPosY||0)+'px'); }

  applyLayerOrder(state.layerOrder);

  // 그라데이션 프리셋 폰트/색상 — 텍스트색 적용
  // (프리셋 버튼의 폰트/색상은 텍스트와 동일하게 CSS 상속)

  // 필터 pill 복원
  document.querySelectorAll('.fpill').forEach(p=>{
    p.classList.toggle('active', p.dataset.filter===state.bgFilter);
  });

  // #10: SVG 선택 버튼 active 복원
  buildSvgPresets();
  buildCustomSvgGrid();

  saveToStorage();
}

function getFontLabel(font){
  const map={
    'Pretendard-Regular':'프리텐다드','notosanskr':'본고딕',
    'NotoSerifKR':'본명조','DOSGothic':'도스고딕',
    'DOSMyungjo':'도스명조','RIDIBatang':'리디바탕',
    'SBAggroB':'어그로체','PyeongchangPeace':'평창평화체',
    'Shilla':'신라문화체','KerisKeduLine':'케리스 케듀체 Line'
  };
  return map[font]||font;
}

/* ═══════════════════════════════════════════════════════
   프리셋 모달
═══════════════════════════════════════════════════════ */
let modalMode='save';

function openPresetModal(mode){
  modalMode=mode;
  modalTitle.textContent = mode==='save'?'프리셋 저장':'프리셋 불러오기';
  presetSlots.innerHTML='';
  presets.forEach((p,i)=>{
    const row=document.createElement('div');
    row.className='preset-row';
    const num=document.createElement('span');
    num.className='preset-num';
    num.textContent=`슬롯 ${i+1}`;
    const lbl=document.createElement('span');
    lbl.className='preset-lbl';
    lbl.textContent=p?`저장됨 (${p._savedAt||'?'})`:'(비어있음)';
    const acts=document.createElement('div');
    acts.className='preset-acts';
    if(mode==='save'){
      const btn=document.createElement('button');
      btn.className='pslot-btn save';
      btn.textContent='저장';
      btn.addEventListener('click',()=>{
        const s=deepClone(state);
        s._savedAt=new Date().toLocaleDateString('ko-KR');
        presets[i]=s;
        LS.set('app_presets',presets);
        showToast(`✅ 슬롯 ${i+1}에 저장됐어요!`);
        closeModal();
      });
      acts.appendChild(btn);
    } else {
      const btn=document.createElement('button');
      btn.className='pslot-btn load';
      btn.textContent='불러오기';
      btn.disabled=!p;
      btn.addEventListener('click',()=>{
        if(!p){ showToast('저장된 프리셋이 없어요'); return; }
        pushUndo();
        state=deepClone(p);
        applyStateToUI();
        showToast(`📂 슬롯 ${i+1} 불러왔어요!`);
        closeModal();
      });
      const del=document.createElement('button');
      del.className='pslot-btn del';
      del.textContent='삭제';
      del.disabled=!p;
      del.addEventListener('click',()=>{
        presets[i]=null;
        LS.set('app_presets',presets);
        openPresetModal(mode);
      });
      acts.appendChild(btn);
      acts.appendChild(del);
    }
    row.appendChild(num);
    row.appendChild(lbl);
    row.appendChild(acts);
    presetSlots.appendChild(row);
  });
  presetModal.style.display='flex';
}

function closeModal(){ presetModal.style.display='none'; }

/* ═══════════════════════════════════════════════════════
   드래그 (SVG / 텍스트)
═══════════════════════════════════════════════════════ */
function makeDraggable(el, xInput, yInput, onDrag){
  let dragging=false, ox=0, oy=0, startX=0, startY=0;
  el.addEventListener('mousedown',e=>{ if(e.button!==0)return; dragging=true; el.classList.add('dragging'); startX=e.clientX-ox; startY=e.clientY-oy; e.preventDefault(); });
  document.addEventListener('mousemove',e=>{ if(!dragging)return; ox=e.clientX-startX; oy=e.clientY-startY; onDrag(ox,oy); });
  document.addEventListener('mouseup',e=>{ if(!dragging)return; dragging=false; el.classList.remove('dragging'); pushUndo(); saveToStorage(); });
  el.addEventListener('touchstart',e=>{ const t=e.touches[0]; dragging=true; el.classList.add('dragging'); startX=t.clientX-ox; startY=t.clientY-oy; e.preventDefault(); },{passive:false});
  document.addEventListener('touchmove',e=>{ if(!dragging)return; const t=e.touches[0]; ox=t.clientX-startX; oy=t.clientY-startY; onDrag(ox,oy); },{passive:false});
  document.addEventListener('touchend',()=>{ if(!dragging)return; dragging=false; el.classList.remove('dragging'); saveToStorage(); });
}

/* ═══════════════════════════════════════════════════════
   배경 이미지 드래그
═══════════════════════════════════════════════════════ */
function initBgImageDrag(){
  let dragging=false, sx=0, sy=0;
  bgImageLayer.style.cursor='grab';
  bgImageLayer.addEventListener('mousedown',e=>{ if(e.button!==0)return; dragging=true; bgImageLayer.style.cursor='grabbing'; sx=e.clientX-state.bgImageDragX; sy=e.clientY-state.bgImageDragY; });
  document.addEventListener('mousemove',e=>{ if(!dragging)return; state.bgImageDragX=e.clientX-sx; state.bgImageDragY=e.clientY-sy; applyBgImage(); });
  document.addEventListener('mouseup',()=>{ if(!dragging)return; dragging=false; bgImageLayer.style.cursor='grab'; saveToStorage(); });
  bgImageLayer.addEventListener('touchstart',e=>{ const t=e.touches[0]; dragging=true; sx=t.clientX-state.bgImageDragX; sy=t.clientY-state.bgImageDragY; },{passive:true});
  document.addEventListener('touchmove',e=>{ if(!dragging)return; const t=e.touches[0]; state.bgImageDragX=t.clientX-sx; state.bgImageDragY=t.clientY-sy; applyBgImage(); },{passive:true});
  document.addEventListener('touchend',()=>{ dragging=false; saveToStorage(); });
}


function getFilterName(f){
  const map = {
    'none':'없음',
    'grayscale(100%)':'흑백',
    'sepia(80%)':'세피아',
    'saturate(200%)':'선명',
    'hue-rotate(180deg)':'색상반전',
    'blur(2px)':'블러',
  };
  return map[f] || (f && f !== 'none' ? f : '없음');
}

/* ═══════════════════════════════════════════════════════
   헬퍼
═══════════════════════════════════════════════════════ */
function hexToRgb(hex){
  const r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16);
  return `${r},${g},${b}`;
}

/* ═══════════════════════════════════════════════════════
   초기화
═══════════════════════════════════════════════════════ */
function resetAll(){
  if(!confirm('모든 설정을 초기값으로 되돌릴까요?')) return;
  pushUndo();
  state={
    bgType:'gradient', solidColor:'#6467F2',
    gradStart:'#6467F2', gradEnd:'#E0E7FF', gradAngle:45,
    bgImageData:null, bgBrightness:1, bgOpacity:1, bgScale:100, bgImgRotation:0, bgFilter:'none',
    bgImageDragX:0, bgImageDragY:0, bgPosX:0, bgPosY:0,
    svgCode:'', svgVisible:true, svgX:0, svgY:0, svgSize:16, svgRotation:0,
    svgStrokeWidth:2, svgColor:'#FFFFFF',
    svgEffect:false, svgEffectType:'glow', svgEffectW:4, svgEffectC:'#ffffff',
    textContent:'', textX:0, textY:0, textSize:24, textRotation:0,
    textSpacing:0, textLineHeight:1.2, textFont:'Pretendard-Regular', textAlign:'center', textColor:'#FFFFFF',
    textEffect:false, textEffectType:'glow', textEffectW:4, textEffectC:'#000000',
    shape:'circle', layerOrder:'svg-top',
    activeSvgPresetIdx:-1, activeSvgCustomIdx:-1,
  };
  svgElement.innerHTML='';
  if(bgPosX){ bgPosX.value=0; setRV('bg-pos-x-value','0px'); }
  if(bgPosY){ bgPosY.value=0; setRV('bg-pos-y-value','0px'); }
  applyStateToUI();
  showToast('↺ 초기화됐어요');
}

/* ═══════════════════════════════════════════════════════
   이벤트 바인딩
═══════════════════════════════════════════════════════ */
function bindEvents(){
  // 탭
  document.querySelectorAll('.ptab').forEach(btn=>{
    btn.addEventListener('click',()=>{
      document.querySelectorAll('.ptab').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.panel-body').forEach(p=>p.style.display='none');
      document.getElementById('section-'+btn.dataset.panel).style.display='block';
    });
  });

  // 배경 타입 토글
  bgTypeSolid.addEventListener('click',()=>{ pushUndo(); setBgType('solid'); saveToStorage(); });
  bgTypeGradient.addEventListener('click',()=>{ pushUndo(); setBgType('gradient'); saveToStorage(); });

  // 단색
  solidColor.addEventListener('input',()=>{ state.solidColor=solidColor.value; applyBackground(); });
  solidColor.addEventListener('change',()=>{ pushUndo(); saveToStorage(); });

  // 단색 프리셋
  document.querySelectorAll('.sp').forEach(sp=>{
    sp.addEventListener('click',()=>{
      pushUndo();
      state.solidColor=sp.dataset.c;
      solidColor.value=sp.dataset.c;
      if(state.bgType!=='solid') setBgType('solid');
      applyBackground();
      saveToStorage();
    });
  });

  // 그라데이션 색상
  gradientStartColor.addEventListener('input',()=>{ state.gradStart=gradientStartColor.value; applyBackground(); });
  gradientStartColor.addEventListener('change',()=>{ pushUndo(); saveToStorage(); });
  gradientEndColor.addEventListener('input',()=>{ state.gradEnd=gradientEndColor.value; applyBackground(); });
  gradientEndColor.addEventListener('change',()=>{ pushUndo(); saveToStorage(); });
  gradientAngle.addEventListener('input',()=>{
    state.gradAngle=parseInt(gradientAngle.value);
    gradientAngleValue.textContent=state.gradAngle+'°';
    applyBackground();
  });
  gradientAngle.addEventListener('change',()=>{ pushUndo(); saveToStorage(); });

  // 그라데이션 프리셋
  document.querySelectorAll('.gp').forEach(gp=>{
    gp.addEventListener('click',()=>{
      pushUndo();
      if(state.bgType!=='gradient') setBgType('gradient');
      state.gradStart=gp.dataset.s;
      state.gradEnd=gp.dataset.e;
      gradientStartColor.value=gp.dataset.s;
      gradientEndColor.value=gp.dataset.e;
      applyBackground();
      saveToStorage();
    });
  });

  // #6: 커스텀 단색 프리셋 추가
  if(solidPresetAddBtn){
    solidPresetAddBtn.addEventListener('click',()=>{
      const c=solidColor.value;
      if(customSolidPresets.includes(c)){ showToast('이미 추가된 색상이에요'); return; }
      customSolidPresets.push(c);
      LS.set('custom_solid_presets',customSolidPresets);
      renderCustomSolidPresets();
      showToast('✅ 단색 프리셋 추가됨!');
    });
  }

  // #6: 커스텀 그라데이션 프리셋 추가
  if(gradPresetAddBtn){
    gradPresetAddBtn.addEventListener('click',()=>{
      const s=gradientStartColor.value, e=gradientEndColor.value;
      const isDup = customGradPresets.some(g=>g.s===s && g.e===e);
      if(isDup){ showToast('이미 추가된 색상이에요'); return; }
      customGradPresets.push({s,e});
      LS.set('custom_grad_presets',customGradPresets);
      renderCustomGradPresets();
      showToast('✅ 그라데이션 프리셋 추가됨!');
    });
  }

  // 모양 버튼
  document.querySelectorAll('.shape-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{ pushUndo(); applyShape(btn.dataset.shape); saveToStorage(); });
  });

  // SVG 컨트롤
  [svgX,svgY,svgSize,svgRotation,svgStrokeWidth].forEach(el=>{
    el.addEventListener('input', updateSvg);
    el.addEventListener('change',()=>{ pushUndo(); saveToStorage(); });
  });
  svgColor.addEventListener('input', updateSvg);
  svgColor.addEventListener('change',()=>{ pushUndo(); saveToStorage(); });

  svgEffectToggle.addEventListener('change',()=>{
    document.getElementById('svg-effect-sub').classList.toggle('open',svgEffectToggle.checked);
    pushUndo(); applySvgEffect(); saveToStorage();
  });
  document.querySelectorAll('#svg-effect-sub .effect-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      document.querySelectorAll('#svg-effect-sub .effect-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      pushUndo(); applySvgEffect(); saveToStorage();
    });
  });
  svgEffectW.addEventListener('input', applySvgEffect);
  svgEffectW.addEventListener('change',()=>{ pushUndo(); saveToStorage(); });
  svgEffectC.addEventListener('input', applySvgEffect);
  svgEffectC.addEventListener('change',()=>{ pushUndo(); saveToStorage(); });

  // 커스텀 SVG 추가
  btnAddSvg.addEventListener('click',()=>{
    const code=svgInput.value.trim();
    if(!code.includes('<svg')){ showToast('올바른 SVG 코드를 붙여넣어 주세요'); return; }
    customSvgs.push(code);
    LS.set('app_custom_svgs',customSvgs);
    buildCustomSvgGrid();
    svgInput.value='';
    showToast('✅ SVG가 추가됐어요!');
  });

  // 텍스트 컨트롤
  textInput.addEventListener('input',()=>{ setTextContent(textInput.value); });
  textInput.addEventListener('change',()=>{ pushUndo(); saveToStorage(); });
  [textX,textY,textSize,textRotation,textSpacing,textLineHeight].forEach(el=>{
    el.addEventListener('input', updateText);
    el.addEventListener('change',()=>{ pushUndo(); saveToStorage(); });
  });
  textColor.addEventListener('input', updateText);
  textColor.addEventListener('change',()=>{ pushUndo(); saveToStorage(); });

  // 정렬 버튼
  document.querySelectorAll('.align-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      document.querySelectorAll('.align-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      state.textAlign=btn.dataset.align;
      textElement.style.textAlign=btn.dataset.align;
      textElement.style.writingMode='horizontal-tb';
      textElement.style.textOrientation='mixed';
      pushUndo(); saveToStorage();
    });
  });

  textEffectToggle.addEventListener('change',()=>{
    document.getElementById('text-effect-sub').classList.toggle('open',textEffectToggle.checked);
    pushUndo(); applyTextEffect(); saveToStorage();
  });
  document.querySelectorAll('#text-effect-sub .effect-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      document.querySelectorAll('#text-effect-sub .effect-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      pushUndo(); applyTextEffect(); saveToStorage();
    });
  });
  textEffectW.addEventListener('input', applyTextEffect);
  textEffectW.addEventListener('change',()=>{ pushUndo(); saveToStorage(); });
  textEffectC.addEventListener('input', applyTextEffect);
  textEffectC.addEventListener('change',()=>{ pushUndo(); saveToStorage(); });

  // 폰트 선택
  const fontSelect=document.querySelector('.font-select');
  const fontSelected=document.querySelector('.font-selected');
  fontSelected.addEventListener('click',()=> fontSelect.classList.toggle('open'));
  document.addEventListener('click',e=>{ if(!fontSelect.contains(e.target)) fontSelect.classList.remove('open'); });
  document.querySelectorAll('.font-option').forEach(opt=>{
    opt.addEventListener('click',()=>{
      pushUndo();
      const font=opt.dataset.font;
      state.textFont=font;
      fontSelected.textContent=opt.textContent;
      fontSelected.style.fontFamily=`'${font}',sans-serif`;
      textElement.style.fontFamily=`'${font}',sans-serif`;
      fontSelect.classList.remove('open');
      saveToStorage();
    });
  });

  // 배경 이미지 업로드
  bgImageInput.addEventListener('change',e=>{
    const file=e.target.files[0];
    if(!file)return;
    const reader=new FileReader();
    reader.onload=ev=>{
      pushUndo();
      const data=ev.target.result;
      state.bgImageData=data;
      state.bgImageDragX=0; state.bgImageDragY=0;
      state.bgPosX=0; state.bgPosY=0;
      if(bgPosX){ bgPosX.value=0; setRV('bg-pos-x-value','0px'); }
      if(bgPosY){ bgPosY.value=0; setRV('bg-pos-y-value','0px'); }
      bgSlots.push(data);
      saveBgSlotsToStorage();
      renderBgSlots();
      applyBgImage();
      saveToStorage();
      showToast('✅ 배경 이미지 추가됐어요!');
    };
    reader.readAsDataURL(file);
    e.target.value='';
  });

  bgClearBtn.addEventListener('click',()=>{
    pushUndo();
    state.bgImageData=null;
    applyBgImage();
    saveToStorage();
    showToast('배경 이미지를 제거했어요');
  });

  // 배경 이미지 컨트롤

  bgOpacity.addEventListener('input',()=>{
    state.bgOpacity=parseFloat(bgOpacity.value);
    setRV('bg-opacity-value', Math.round(state.bgOpacity*100)+'%');
    applyBgImage();
  });
  bgOpacity.addEventListener('change',()=>{ pushUndo(); saveToStorage(); });

  bgScale.addEventListener('input',()=>{
    state.bgScale=parseInt(bgScale.value);
    setRV('bg-scale-value', state.bgScale+'%');
    applyBgImage();
  });
  bgScale.addEventListener('change',()=>{ pushUndo(); saveToStorage(); });

  // 배경 이미지 가로/세로 위치 슬라이더
  if(bgPosX){
    bgPosX.addEventListener('input',()=>{
      state.bgPosX=parseInt(bgPosX.value);
      setRV('bg-pos-x-value', state.bgPosX+'px');
      applyBgImage();
    });
    bgPosX.addEventListener('change',()=>{ pushUndo(); saveToStorage(); });
  }
  if(bgPosY){
    bgPosY.addEventListener('input',()=>{
      state.bgPosY=parseInt(bgPosY.value);
      setRV('bg-pos-y-value', state.bgPosY+'px');
      applyBgImage();
    });
    bgPosY.addEventListener('change',()=>{ pushUndo(); saveToStorage(); });
  }

  bgImgRotation.addEventListener('input',()=>{
    state.bgImgRotation=parseInt(bgImgRotation.value);
    setRV('bg-img-rotation-value', state.bgImgRotation+'°');
    applyBgImage();
  });
  bgImgRotation.addEventListener('change',()=>{ pushUndo(); saveToStorage(); });

  // 배경 이미지 필터
  document.querySelectorAll('.fpill').forEach(pill=>{
    pill.addEventListener('click',()=>{
      document.querySelectorAll('.fpill').forEach(p=>p.classList.remove('active'));
      pill.classList.add('active');
      pushUndo();
      state.bgFilter=pill.dataset.filter;
      applyBgImage();
      saveToStorage();
    });
  });

  // 레이어 토글 버튼 하나
  layerToggleBtn.addEventListener('click',()=>{
    pushUndo();
    const newOrder = state.layerOrder === 'svg-top' ? 'text-top' : 'svg-top';
    applyLayerOrder(newOrder);
    saveToStorage();
    showToast(newOrder === 'svg-top' ? 'SVG가 텍스트 위로' : '텍스트가 SVG 위로');
  });
  applyLayerOrder(state.layerOrder);

  // 레이아웃 버튼
  presetABtn.addEventListener('click',()=> applyLayoutPreset('A'));
  presetBBtn.addEventListener('click',()=> applyLayoutPreset('B'));
  presetCBtn.addEventListener('click',()=> applyLayoutPreset('C'));
  presetDBtn.addEventListener('click',()=> applyLayoutPreset('D'));

  resetBtn.addEventListener('click', resetAll);

  undoBtn.addEventListener('click', undo);
  redoBtn.addEventListener('click', redo);
  document.addEventListener('keydown',e=>{
    if((e.ctrlKey||e.metaKey)&&!e.shiftKey&&e.key==='z'){ e.preventDefault(); undo(); }
    if((e.ctrlKey||e.metaKey)&&(e.shiftKey&&e.key==='z'||e.key==='y')){ e.preventDefault(); redo(); }
  });

  savePresetBtn.addEventListener('click',()=> openPresetModal('save'));
  loadPresetBtn.addEventListener('click',()=> openPresetModal('load'));
  modalClose.addEventListener('click', closeModal);
  presetModal.addEventListener('click',e=>{ if(e.target===presetModal) closeModal(); });

  savePngBtn.addEventListener('click', savePng);

  addSlotBtn.addEventListener('click', addToSlot);

  // 덮어쓰기 모드
  overwriteModeBtn.addEventListener('click',()=>{
    if(!slots.length){ showToast('슬롯이 없어요. 먼저 슬롯을 추가해주세요'); return; }
    if(overwriteMode){ exitOverwriteMode(); }
    else { enterOverwriteMode(); }
  });
  slotOwCancel.addEventListener('click', exitOverwriteMode);

  // 전체 삭제
  slotClearBtn.addEventListener('click',()=>{
    if(slots.length===0){ showToast('슬롯이 비어있어요'); return; }
    confirmModal.style.display='flex';
  });
  confirmCancel.addEventListener('click',()=>{ confirmModal.style.display='none'; });
  confirmOk.addEventListener('click',()=>{
    slots=[];
    saveSlotsToStorage();
    renderSlots();
    exitOverwriteMode();
    confirmModal.style.display='none';
    showToast('🗑️ 슬롯을 모두 삭제했어요');
  });
  confirmModal.addEventListener('click',e=>{ if(e.target===confirmModal) confirmModal.style.display='none'; });

  // 전체 저장
  slotDlAllBtn.addEventListener('click',()=>{
    if(!slots.length){ showToast('슬롯이 비어있어요'); return; }
    slots.forEach((s,i)=> setTimeout(()=> downloadDataUrl(s.dataUrl,`slot_${i+1}.png`), i*200));
    showToast(`⬇ ${slots.length}개 저장 시작!`);
  });

  gridBtn.addEventListener('click',()=>{
    gridOverlay.classList.toggle('active');
    gridBtn.classList.toggle('active');
  });

  themeToggle.addEventListener('click',()=>{
    const isDark=document.body.dataset.theme==='dark';
    document.body.dataset.theme=isDark?'light':'dark';
    LS.set('app_theme', document.body.dataset.theme);
    themeIcon.innerHTML=isDark
      ?`<circle cx="12" cy="12" r="5"></circle><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>`
      :`<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>`;
  });

  // SVG 드래그
  makeDraggable(svgElement, svgX, svgY, (ox,oy)=>{
    const nx=Math.round(ox); const ny=Math.round(oy);
    svgElement.style.left=`${100+nx}px`; svgElement.style.top=`${100+ny}px`;
    state.svgX=nx; state.svgY=ny;
    svgX.value=nx; svgY.value=ny;
    setRV('svg-x-value',nx+'px'); setRV('svg-y-value',ny+'px');
  });

  // 텍스트 드래그
  makeDraggable(textElement, textX, textY, (ox,oy)=>{
    const nx=Math.round(ox); const ny=Math.round(oy);
    textElement.style.left=`${100+nx}px`; textElement.style.top=`${100+ny}px`;
    state.textX=nx; state.textY=ny;
    textX.value=nx; textY.value=ny;
    setRV('text-x-value',nx+'px'); setRV('text-y-value',ny+'px');
  });

  initBgImageDrag();
}

/* ═══════════════════════════════════════════════════════
   앱 시작
═══════════════════════════════════════════════════════ */
function init(){
  const isFirstVisit = !LS.get('app_state');

  loadFromStorage();

  const savedTheme=LS.get('app_theme');
  if(savedTheme){ document.body.dataset.theme=savedTheme; }

  buildSvgPresets();
  buildCustomSvgGrid();

  applyBackground();
  applyBgImage();
  applyShape(state.shape);
  setBgType(state.bgType);

  solidColor.value         = state.solidColor;
  gradientStartColor.value = state.gradStart;
  gradientEndColor.value   = state.gradEnd;
  gradientAngle.value      = state.gradAngle;
  gradientAngleValue.textContent = state.gradAngle+'°';

  svgX.value=state.svgX; svgY.value=state.svgY;
  svgSize.value=state.svgSize; svgRotation.value=state.svgRotation;
  svgStrokeWidth.value=state.svgStrokeWidth; svgColor.value=state.svgColor;

  textInput.value=state.textContent;
  textX.value=state.textX; textY.value=state.textY;
  textSize.value=state.textSize; textRotation.value=state.textRotation;
  textSpacing.value=state.textSpacing; textColor.value=state.textColor;

  // 위치 슬라이더 복원
  if(bgPosX){ bgPosX.value=state.bgPosX||0; setRV('bg-pos-x-value',(state.bgPosX||0)+'px'); }
  if(bgPosY){ bgPosY.value=state.bgPosY||0; setRV('bg-pos-y-value',(state.bgPosY||0)+'px'); }

  if(state.svgCode){
    setSvgContent(state.svgCode);
    if(!state.svgVisible) svgElement.style.display = 'none';
  }
  setTextContent(state.textContent);

  svgEffectToggle.checked = state.svgEffect || false;
  document.getElementById('svg-effect-sub').classList.toggle('open', svgEffectToggle.checked);
  if(state.svgEffectW) { svgEffectW.value = state.svgEffectW; setRV('svg-effect-width-value', state.svgEffectW + 'px'); }
  if(state.svgEffectC) svgEffectC.value = state.svgEffectC;
  document.querySelectorAll('#svg-effect-sub .effect-btn').forEach(b => b.classList.toggle('active', b.dataset.effect === (state.svgEffectType || 'glow')));

  textEffectToggle.checked = state.textEffect || false;
  document.getElementById('text-effect-sub').classList.toggle('open', textEffectToggle.checked);
  if(state.textEffectW) { textEffectW.value = state.textEffectW; setRV('text-effect-width-value', state.textEffectW + 'px'); }
  if(state.textEffectC) textEffectC.value = state.textEffectC;
  document.querySelectorAll('#text-effect-sub .effect-btn').forEach(b => b.classList.toggle('active', b.dataset.effect === (state.textEffectType || 'glow')));
  updateSvg(); updateText();

  document.querySelector('.font-selected').textContent=getFontLabel(state.textFont);
  textElement.style.fontFamily=`'${state.textFont}',sans-serif`;

  document.querySelectorAll('.align-btn').forEach(b=>{
    b.classList.toggle('active', b.dataset.align===state.textAlign);
  });

  // 필터 pill 초기화
  document.querySelectorAll('.fpill').forEach(p=>{
    p.classList.toggle('active', p.dataset.filter===state.bgFilter);
  });

  renderSlots();
  renderBgSlots();
  // #6: 커스텀 프리셋 렌더
  renderCustomSolidPresets();
  renderCustomGradPresets();
  bindEvents();
  if(isFirstVisit){
    applyLayoutPreset('A');
  }
}
document.addEventListener('DOMContentLoaded', init);
