'use strict';

const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() { menuToggle.setAttribute('aria-expanded', 'false'); menuToggle.setAttribute('aria-label', 'Abrir menu'); navigation.classList.remove('open'); }
menuToggle.addEventListener('click', () => { const open = menuToggle.getAttribute('aria-expanded') !== 'true'; menuToggle.setAttribute('aria-expanded', String(open)); menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu'); navigation.classList.toggle('open', open); });
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
window.matchMedia('(min-width: 701px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

const origins = {
  brasil: {label: 'A NOSSA RAIZ', title: 'O sabor que nos reúne.', description: 'Nossa história começa aqui. A tradição do churrasco brasileiro inspira uma seleção que valoriza a origem e a personalidade de cada corte, da picanha aos cortes menos óbvios.', image: 'picanha', alt: 'Picanha selecionada sobre uma tábua de madeira', caption: 'BRASIL · A NOSSA RAIZ'},
  uruguai: {label: 'A CULTURA DOS PAMPAS', title: 'Tradição que atravessa fronteiras.', description: 'O olhar para o Uruguai nasce da cultura do gado, do campo e da parrilla. Uma inspiração para buscar carnes com personalidade e cortes que convidam a compartilhar.', image: 'ancho', alt: 'Cortes de ribeye representando a seleção inspirada na tradição uruguaia', caption: 'URUGUAI · TRADIÇÃO DOS PAMPAS'},
  argentina: {label: 'O RITUAL DA PARRILLA', title: 'Intensidade à mesa.', description: 'A Argentina inspira o prazer de escolher um grande corte e reunir pessoas ao redor da mesa. Ancho, chorizo e cortes com osso fazem parte desse repertório que queremos explorar.', image: 'ancho', alt: 'Ribeye com e sem osso representando os cortes de inspiração argentina', caption: 'ARGENTINA · O RITUAL DA PARRILLA'},
  japao: {label: 'A CULTURA DO DETALHE', title: 'O extraordinário está no detalhe.', description: 'A tradição japonesa do Wagyu inspira uma busca por delicadeza, textura e marmoreio. Uma origem que nos convida a valorizar a procedência e a apreciar cada escolha.', image: 'wagyu', alt: 'Marmoreio delicado de dois cortes de Wagyu', caption: 'JAPÃO · A CULTURA DO DETALHE'}
};
const originTabs = [...document.querySelectorAll('.origin-tab')];
function selectOrigin(tab) {
  const origin = origins[tab.dataset.origin];
  originTabs.forEach(item => { const selected = item === tab; item.classList.toggle('active', selected); item.setAttribute('aria-selected', String(selected)); item.tabIndex = selected ? 0 : -1; });
  document.querySelector('#origin-panel').setAttribute('aria-labelledby', tab.id);
  for (const key of ['label', 'title', 'description', 'caption']) document.querySelector('#origin-' + key).textContent = origin[key];
  const img = document.querySelector('#origin-image'); img.src = '' + origin.image + '.webp'; img.alt = origin.alt;
}
originTabs.forEach((tab, index) => { tab.addEventListener('click', () => selectOrigin(tab)); tab.addEventListener('keydown', event => { let next; if (event.key === 'ArrowDown') next = (index + 1) % originTabs.length; if (event.key === 'ArrowUp') next = (index - 1 + originTabs.length) % originTabs.length; if (event.key === 'Home') next = 0; if (event.key === 'End') next = originTabs.length - 1; if (next !== undefined) { event.preventDefault(); originTabs[next].focus(); selectOrigin(originTabs[next]); } }); });

const cuts = {
  wagyu: {title: 'Wagyu', label: 'A EXPRESSÃO DO MARMOREIO', image: 'wagyu', alt: 'Cortes de Wagyu com marmoreio intenso', description: 'Uma escolha para quem aprecia textura e delicadeza. As linhas de gordura entremeadas na carne compõem o marmoreio, característica que torna o universo Wagyu tão especial.', facts: [['O que observar', 'Origem, linhagem e classificação de cada produto.'], ['A experiência', 'Pequenas porções, atenção aos detalhes e sabor para apreciar.']]},
  picanha: {title: 'Picanha', label: 'UM CLÁSSICO, OUTRO OLHAR', image: 'picanha', alt: 'Picanha com capa de gordura e fatias espessas', description: 'Um corte que faz parte da nossa memória afetiva. A capa de gordura, a textura e a escolha da peça constroem a experiência de uma boa picanha. Na BRADO, ela entra no repertório com um olhar atento à origem.', facts: [['A personalidade', 'Presença marcante e a tradição do churrasco brasileiro.'], ['A experiência', 'Uma escolha para reunir pessoas e compartilhar a mesa.']]},
  ancho: {title: 'Ancho & ribeye', label: 'PERSONALIDADE EM CADA CORTE', image: 'ancho', alt: 'Cortes de ribeye com e sem osso', description: 'Nomes que fazem parte do repertório de quem aprecia carne. O ancho, também conhecido como ribeye, reúne diferentes texturas em um corte de sabor marcante, com versões com e sem osso.', facts: [['O que observar', 'A distribuição do marmoreio e a composição do corte.'], ['A experiência', 'Intensidade, textura e possibilidades para o seu próximo encontro.']]}
};
const cutDialog = document.querySelector('#cut-dialog');
let dialogOpener;
document.querySelectorAll('[data-cut]').forEach(trigger => trigger.addEventListener('click', event => {
  event.preventDefault();
  const cut = cuts[trigger.dataset.cut];
  const img = document.querySelector('#dialog-image'); img.src = '' + cut.image + '.webp'; img.alt = cut.alt;
  ['title', 'label', 'description'].forEach(key => { document.querySelector('#dialog-' + key).textContent = cut[key]; });
  const facts = document.querySelector('#dialog-facts'); facts.replaceChildren();
  cut.facts.forEach(([label, text]) => { const item = document.createElement('div'); const heading = document.createElement('strong'); const description = document.createElement('span'); heading.textContent = label; description.textContent = text; item.append(heading, description); facts.append(item); });
  dialogOpener = trigger; cutDialog.showModal(); document.body.classList.add('dialog-open');
}));
document.querySelectorAll('[data-close-dialog]').forEach(button => button.addEventListener('click', () => cutDialog.close()));
const privacyDialog = document.querySelector('#privacy-dialog');
document.querySelector('[data-privacy]').addEventListener('click', event => { dialogOpener = event.currentTarget; privacyDialog.showModal(); document.body.classList.add('dialog-open'); });
document.querySelectorAll('[data-close-privacy]').forEach(button => button.addEventListener('click', () => privacyDialog.close()));
[cutDialog, privacyDialog].forEach(dialog => {
  dialog.addEventListener('click', event => { if (event.target === dialog) { const bounds = dialog.getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close(); } });
  dialog.addEventListener('close', () => { document.body.classList.remove('dialog-open'); if (dialogOpener) dialogOpener.focus(); });
});

const shareButton = document.querySelector('#share-site');
shareButton.addEventListener('click', async () => {
  const shareData = {title: 'BRADO — Carnes de Origem', text: 'Uma nova boutique de carnes nobres está chegando a Marabá. Conheça a BRADO.', url: document.querySelector('link[rel="canonical"]').href};
  const status = document.querySelector('#share-status'); status.textContent = '';
  try {
    if (navigator.share) { await navigator.share(shareData); }
    else if (navigator.clipboard && window.isSecureContext) { await navigator.clipboard.writeText(shareData.url); status.textContent = 'Link copiado. Compartilhe a novidade com quem aprecia uma boa carne.'; }
    else { status.textContent = 'Copie o endereço na barra do navegador para compartilhar a BRADO.'; }
  } catch (error) { if (error.name !== 'AbortError') status.textContent = 'Copie o endereço na barra do navegador para compartilhar a BRADO.'; }
});
document.querySelector('#current-year').textContent = String(new Date().getFullYear());
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.remove('pending'); observer.unobserve(entry.target); } }); }, {threshold: .08});
  document.querySelectorAll('.intro-grid, .section-heading, .cut-card, .experience-grid').forEach(element => { element.classList.add('reveal', 'pending'); observer.observe(element); });
}
