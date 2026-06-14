import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsappButtonComponent } from './whatsapp-button';

describe('WhatsappButtonComponent', () => {
  let component: WhatsappButtonComponent;
  let fixture: ComponentFixture<WhatsappButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhatsappButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WhatsappButtonComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose bilingual aria label', () => {
    expect(component.ariaLabel).toBe('Fale conosco pelo WhatsApp');
  });
});
