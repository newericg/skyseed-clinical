import { Component, effect, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { LanguageService } from '../../services/language.service';

export type ContactFormLayout = 'page' | 'band';
export type ContactFormVariant = 'full' | 'capture';

@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.scss',
})
export class ContactFormComponent {
  layout = input<ContactFormLayout>('page');
  variant = input<ContactFormVariant>('full');
  submitLabel = input<string | null>(null);
  idPrefix = input('contact');

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
    message: [''],
  });

  constructor() {
    effect(() => {
      const capture = this.variant() === 'capture';
      const phoneControl = this.form.controls.phone;
      const messageControl = this.form.controls.message;

      if (capture) {
        phoneControl.setValidators([Validators.required, Validators.minLength(8)]);
        messageControl.clearValidators();
      } else {
        phoneControl.clearValidators();
        messageControl.setValidators([Validators.required, Validators.minLength(10)]);
      }

      phoneControl.updateValueAndValidity({ emitEvent: false });
      messageControl.updateValueAndValidity({ emitEvent: false });
    });
  }

  get isCapture() {
    return this.variant() === 'capture';
  }

  get lang() {
    return this.langService.lang();
  }

  get t() {
    const pt = this.lang === 'pt';
    return {
      name: pt ? 'Nome' : 'Name',
      email: pt ? 'E-mail' : 'Email',
      phone: pt ? 'Telefone' : 'Phone',
      message: pt ? 'Mensagem' : 'Message',
      optional: pt ? '(opcional)' : '(optional)',
      submit: pt ? 'Enviar mensagem' : 'Send message',
      success: this.isCapture
        ? pt
          ? 'Cadastro realizado! Em breve você receberá nossas novidades.'
          : 'Signed up! You will hear from us soon.'
        : pt
          ? 'Mensagem recebida! Em breve entraremos em contato.'
          : 'Message received! We will be in touch soon.',
      error: this.isCapture
        ? pt
          ? 'Não foi possível concluir o cadastro. Tente novamente em instantes.'
          : 'Could not complete sign-up. Please try again in a moment.'
        : pt
          ? 'Não foi possível enviar sua mensagem. Tente novamente em instantes.'
          : 'Could not send your message. Please try again in a moment.',
      sending: pt ? 'Enviando...' : 'Sending...',
      nameError: pt ? 'Informe seu nome com pelo menos 2 caracteres.' : 'Enter your name with at least 2 characters.',
      emailError: pt ? 'Informe um e-mail válido.' : 'Enter a valid email address.',
      phoneError: pt ? 'Informe um telefone válido.' : 'Enter a valid phone number.',
      messageError: pt ? 'Informe uma mensagem com pelo menos 10 caracteres.' : 'Enter a message with at least 10 characters.',
    };
  }

  get resolvedSubmitLabel() {
    return this.submitLabel() ?? this.t.submit;
  }

  fieldId(name: string) {
    return `${this.idPrefix()}-${name}`;
  }

  fieldError(controlName: 'name' | 'email' | 'phone' | 'message'): string | null {
    const control = this.form.controls[controlName];
    if (!control.touched || !control.invalid) return null;
    if (controlName === 'name') return this.t.nameError;
    if (controlName === 'email') return this.t.emailError;
    if (controlName === 'phone') return this.t.phoneError;
    return this.t.messageError;
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
        message: message || undefined,
        capture: this.isCapture,
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
