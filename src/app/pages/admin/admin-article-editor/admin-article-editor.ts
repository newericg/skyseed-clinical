import { Component, inject, signal } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AdminArticlesService } from '../../../services/admin-articles.service';

@Component({
  selector: 'app-admin-article-editor',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './admin-article-editor.html',
  styleUrl: './admin-article-editor.scss',
})
export class AdminArticleEditorComponent {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private articlesService = inject(AdminArticlesService);

  readonly articleId = signal<string | null>(null);
  readonly loading = signal(false);
  readonly saving = signal(false);
  readonly error = signal('');
  readonly success = signal('');

  form = this.fb.nonNullable.group({
    slug: ['', Validators.required],
    titlePt: ['', Validators.required],
    titleEn: ['', Validators.required],
    excerptPt: ['', Validators.required],
    excerptEn: ['', Validators.required],
    metaDescriptionPt: ['', Validators.required],
    metaDescriptionEn: ['', Validators.required],
    publishedAt: [''],
    coverWeb: [''],
    coverMobile: [''],
    coverAltPt: [''],
    coverAltEn: [''],
    sectionsPt: this.fb.array([this.createSectionGroup()]),
    sectionsEn: this.fb.array([this.createSectionGroup()]),
  });

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'new') {
      this.articleId.set(id);
      this.load(id);
    }
  }

  get sectionsPt(): FormArray {
    return this.form.controls.sectionsPt;
  }

  get sectionsEn(): FormArray {
    return this.form.controls.sectionsEn;
  }

  private createSectionGroup() {
    return this.fb.nonNullable.group({
      heading: [''],
      paragraphs: this.fb.nonNullable.control(''),
    });
  }

  addSection(lang: 'pt' | 'en'): void {
    const target = lang === 'pt' ? this.sectionsPt : this.sectionsEn;
    target.push(this.createSectionGroup());
  }

  removeSection(lang: 'pt' | 'en', index: number): void {
    const target = lang === 'pt' ? this.sectionsPt : this.sectionsEn;
    if (target.length === 1) return;
    target.removeAt(index);
  }

  private load(id: string): void {
    this.loading.set(true);
    this.articlesService.get(id).subscribe({
      next: (article) => {
        this.form.patchValue({
          slug: article.slug,
          titlePt: article.title.pt,
          titleEn: article.title.en,
          excerptPt: article.excerpt.pt,
          excerptEn: article.excerpt.en,
          metaDescriptionPt: article.metaDescription.pt,
          metaDescriptionEn: article.metaDescription.en,
          publishedAt: article.publishedAt ?? '',
          coverWeb: article.coverImage.web,
          coverMobile: article.coverImage.mobile,
          coverAltPt: article.coverImage.alt.pt,
          coverAltEn: article.coverImage.alt.en,
        });
        this.setSections('pt', article.sections.pt);
        this.setSections('en', article.sections.en);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Artigo não encontrado.');
        this.loading.set(false);
      },
    });
  }

  private setSections(lang: 'pt' | 'en', sections: { heading?: string; paragraphs: string[] }[]) {
    const target = lang === 'pt' ? this.sectionsPt : this.sectionsEn;
    target.clear();
    for (const section of sections) {
      target.push(
        this.fb.nonNullable.group({
          heading: section.heading ?? '',
          paragraphs: section.paragraphs.join('\n\n'),
        }),
      );
    }
    if (target.length === 0) target.push(this.createSectionGroup());
  }

  private buildPayload() {
    const raw = this.form.getRawValue();
    const mapSections = (sections: { heading: string; paragraphs: string }[]) =>
      sections.map((section) => ({
        heading: section.heading.trim() || undefined,
        paragraphs: section.paragraphs
          .split(/\n\s*\n/)
          .map((p) => p.trim())
          .filter(Boolean),
      }));

    return {
      slug: raw.slug.trim(),
      titlePt: raw.titlePt.trim(),
      titleEn: raw.titleEn.trim(),
      excerptPt: raw.excerptPt.trim(),
      excerptEn: raw.excerptEn.trim(),
      metaDescriptionPt: raw.metaDescriptionPt.trim(),
      metaDescriptionEn: raw.metaDescriptionEn.trim(),
      publishedAt: raw.publishedAt || null,
      coverWeb: raw.coverWeb || null,
      coverMobile: raw.coverMobile || null,
      coverAltPt: raw.coverAltPt || null,
      coverAltEn: raw.coverAltEn || null,
      sections: {
        pt: mapSections(raw.sectionsPt),
        en: mapSections(raw.sectionsEn),
      },
    };
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    this.error.set('');
    this.success.set('');
    const payload = this.buildPayload();
    const id = this.articleId();

    const request = id
      ? this.articlesService.update(id, payload)
      : this.articlesService.create(payload);

    request.subscribe({
      next: (article) => {
        this.success.set('Artigo salvo.');
        this.saving.set(false);
        if (!id) {
          this.router.navigate(['/admin/articles', article.id, 'edit']);
        }
      },
      error: () => {
        this.error.set('Não foi possível salvar o artigo.');
        this.saving.set(false);
      },
    });
  }
}
