import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID, provideEnvironmentInitializer } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

function pathWithoutHash(url: string): string {
  return url.split('#')[0].split('?')[0];
}

function setupAnchorScroll() {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);
  if (!isPlatformBrowser(platformId)) return;

  let previousPath = pathWithoutHash(router.url);

  router.events.pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd)).subscribe(() => {
    const tree = router.parseUrl(router.url);
    const fragment = tree.fragment;
    const currentPath = pathWithoutHash(router.url);

    if (fragment) {
      const samePage = previousPath === currentPath;
      requestAnimationFrame(() => {
        document.getElementById(fragment)?.scrollIntoView({
          behavior: samePage ? 'smooth' : 'instant',
          block: 'start',
        });
      });
    }

    previousPath = currentPath;
  });
}

export const provideAnchorScroll = () => provideEnvironmentInitializer(setupAnchorScroll);
