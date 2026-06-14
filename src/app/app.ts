import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header';
import { FooterComponent } from './components/footer/footer';
import { WhatsappButtonComponent } from './components/whatsapp-button/whatsapp-button';
import { LanguageService } from './services/language.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, WhatsappButtonComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  constructor(readonly langService: LanguageService) {}
}
