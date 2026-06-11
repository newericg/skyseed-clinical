import { Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { LanguageService } from '../../services/language.service';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-contato',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contato.html',
  styleUrl: './contato.scss',
})
export class ContatoComponent {
  private seo = inject(SeoService);
  private fb = inject(FormBuilder);
  private contact = inject(ContactService);
  langService = inject(LanguageService);

  submitted = signal(false);
  sending = signal(false);
  error = signal(false);

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  get lang() {
    return this.langService.lang();
  }

  private readonly syncSeo = effect(() => {
    this.seo.setContatoMeta(this.langService.lang());
  });

  get t() {
    const pt = this.lang === 'pt';
    return {
      label: pt ? 'Fale Conosco' : 'Contact Us',
      title: pt ? 'Estamos aqui para ouvir você' : 'We are here to hear from you',
      lead: pt
        ? 'Envie sua mensagem e nossa equipe retornará o contato o mais breve possível.'
        : 'Send your message and our team will get back to you as soon as possible.',
      name: pt ? 'Nome' : 'Name',
      email: pt ? 'E-mail' : 'Email',
      phone: pt ? 'Telefone' : 'Phone',
      message: pt ? 'Mensagem' : 'Message',
      optional: pt ? '(opcional)' : '(optional)',
      submit: pt ? 'Enviar mensagem' : 'Send message',
      success: pt
        ? 'Mensagem recebida! Em breve entraremos em contato.'
        : 'Message received! We will be in touch soon.',
      error: pt
        ? 'Não foi possível enviar sua mensagem. Tente novamente em instantes.'
        : 'Could not send your message. Please try again in a moment.',
      sending: pt ? 'Enviando...' : 'Sending...',
      contactInfo: pt ? 'Outros canais' : 'Other channels',
      whatsapp: 'WhatsApp',
      emailLabel: 'E-mail',
      social: pt ? 'Redes sociais' : 'Social media',
      whatsappSoon: pt ? 'Em breve' : 'Coming soon',
      emailValue: 'contato@skyseed.com.br',
    };
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { name, email, phone, message } = this.form.getRawValue();

    this.sending.set(true);
    this.error.set(false);
    this.submitted.set(false);

    this.contact
      .send({
        name: name!,
        email: email!,
        phone: phone || undefined,
        message: message!,
      })
      .subscribe({
        next: () => {
          this.sending.set(false);
          this.submitted.set(true);
          this.form.reset();
        },
        error: () => {
          this.sending.set(false);
          this.error.set(true);
        },
      });
  }
}
