'use strict';
const CARD_URL = 'https://bradocarnes.com.br/contatos/';
const byId = id => document.getElementById(id);
const text = value => typeof value === 'string' ? value.trim() : '';
const email = value => /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(text(value)) ? text(value) : '';
const digits = value => text(value).replace(/[\s()+.-]/g, '');
const phone = value => /^\d{10,15}$/.test(digits(value)) ? digits(value) : '';
const mapsHosts = new Set(['maps.app.goo.gl', 'goo.gl', 'maps.google.com', 'www.google.com', 'google.com', 'www.google.com.br', 'google.com.br', 'maps.apple.com']);
function mapLink(value) {
  try { const url = new URL(value); return url.protocol === 'https:' && !url.username && !url.password && mapsHosts.has(url.hostname) ? url.href : ''; } catch { return ''; }
}
function updateLink(id, href, labelId, label) {
  const link = byId(id); link.hidden = !href;
  if (href) link.href = href; else link.removeAttribute('href');
  if (labelId) byId(labelId).textContent = label;
}
function downloadContact(data) {
  const escape = value => text(value).replace(/\\/g, '\\\\').replace(/\r?\n/g, '\\n').replace(/;/g, '\\;').replace(/,/g, '\\,');
  const lines = ['BEGIN:VCARD', 'VERSION:3.0', 'FN:' + escape(data.nome), 'ORG:' + escape(data.nome), 'URL:' + CARD_URL];
  if (email(data.email)) lines.push('EMAIL;TYPE=WORK:' + email(data.email));
  if (phone(data.telefone)) lines.push('TEL;TYPE=WORK,VOICE:+' + phone(data.telefone));
  if (text(data.endereco)) lines.push('ADR;TYPE=WORK:;;' + escape(data.endereco) + ';;;;');
  lines.push('NOTE:' + escape(data.mensagem), 'END:VCARD');
  const url = URL.createObjectURL(new Blob([lines.join('\r\n') + '\r\n'], {type: 'text/vcard;charset=utf-8'}));
  const link = document.createElement('a'); link.href = url; link.download = 'Brado-Carnes.vcf'; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
  byId('feedback').textContent = 'Abra o arquivo baixado para salvar a Brado na sua agenda. Consulte esta página para ver futuras atualizações.';
}
async function shareContact() {
  byId('feedback').textContent = '';
  try {
    if (navigator.share) { await navigator.share({title: 'BRADO — Carnes de Origem', url: CARD_URL}); return; }
    if (!navigator.clipboard) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(CARD_URL);
    byId('feedback').textContent = 'Link copiado. Compartilhe a Brado com quem aprecia uma boa origem.';
  } catch (error) {
    if (error.name === 'AbortError') return;
    byId('copy-link').hidden = false; byId('copy-link').focus(); byId('copy-link').select();
    byId('feedback').textContent = 'Copie o link abaixo para compartilhar.';
  }
}
async function loadContacts() {
  try {
    const response = await fetch('dados.json', {cache: 'no-store'});
    if (!response.ok) throw new Error('Contact data unavailable');
    const data = await response.json();
    if (!text(data.nome)) throw new Error('Invalid contact data');
    byId('city').textContent = text(data.cidade);
    byId('description').textContent = text(data.mensagem);
    byId('notice').textContent = text(data.aviso); byId('notice').hidden = !text(data.aviso);
    const inbox = email(data.email), commercial = email(data.emailComercial);
    updateLink('email-link', inbox ? 'mailto:' + inbox : '', 'email-label', inbox);
    updateLink('commercial-link', commercial ? 'mailto:' + commercial : '', 'commercial-label', commercial);
    const instagram = /^[a-zA-Z0-9_.]{1,30}$/.test(text(data.instagram)) ? text(data.instagram) : '';
    updateLink('instagram-link', instagram ? 'https://www.instagram.com/' + instagram + '/' : '', 'instagram-label', '@' + instagram);
    const whatsapp = phone(data.whatsapp);
    updateLink('whatsapp-link', whatsapp ? 'https://wa.me/' + whatsapp + '?text=' + encodeURIComponent(text(data.mensagemWhatsapp)) : '');
    byId('email-link').classList.toggle('primary', !whatsapp);
    updateLink('phone-link', phone(data.telefone) ? 'tel:+' + phone(data.telefone) : '', 'phone-label', text(data.telefone));
    updateLink('map-link', mapLink(data.mapa), 'map-label', text(data.endereco) || 'Abrir localização');
    for (const [id, value] of [['address', data.endereco], ['hours', data.horarios]]) { byId(id).textContent = text(value); byId(id).hidden = !text(value); }
    byId('visit').hidden = !text(data.endereco) && !text(data.horarios);
    byId('utilities').hidden = false;
    byId('save-contact').addEventListener('click', () => downloadContact(data));
    byId('share-contact').addEventListener('click', shareContact);
  } catch {
    byId('feedback').textContent = 'Não foi possível atualizar os contatos agora. Recarregue a página para tentar novamente.';
  }
}
loadContacts();
