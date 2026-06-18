import { buildWhatsAppUrl } from './site.config';

describe('site.config', () => {
  describe('buildWhatsAppUrl', () => {
    it('returns null when number has no digits', () => {
      expect(buildWhatsAppUrl('')).toBeNull();
      expect(buildWhatsAppUrl('   ')).toBeNull();
    });

    it('builds wa.me link from international number', () => {
      expect(buildWhatsAppUrl('5511965670462')).toBe('https://wa.me/5511965670462');
    });

    it('strips non-digit characters from number', () => {
      expect(buildWhatsAppUrl('+55 (11) 96567-0462')).toBe('https://wa.me/5511965670462');
    });

    it('appends encoded message when provided', () => {
      expect(buildWhatsAppUrl('5511965670462', 'Olá!')).toBe(
        'https://wa.me/5511965670462?text=Ol%C3%A1!',
      );
    });
  });
});
