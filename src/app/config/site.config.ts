export const SITE_URL = 'https://skyseed.com.br';
export const SITE_NAME = 'Skyseed Clinical';
export const SITE_EMAIL = 'contato@skyseed.com.br';
export const INSTAGRAM_URL = 'https://www.instagram.com/skyseed.clinical/';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/logo.png`;

/** Número no formato internacional, sem + ou espaços (ex.: 5511987654321). Deixe vazio para ocultar o botão. */
export const WHATSAPP_NUMBER = '5511987654321';

/** Mensagem opcional pré-preenchida ao abrir o chat. */
export const WHATSAPP_DEFAULT_MESSAGE = '';

export function buildWhatsAppUrl(number: string, message = WHATSAPP_DEFAULT_MESSAGE): string | null {
  const digits = number.replace(/\D/g, '');
  if (!digits) return null;

  const base = `https://wa.me/${digits}`;
  const trimmedMessage = message.trim();
  return trimmedMessage ? `${base}?text=${encodeURIComponent(trimmedMessage)}` : base;
}
