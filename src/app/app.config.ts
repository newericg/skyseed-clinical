import { ApplicationConfig, inject, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import {
  provideRouter,
  Router,
  withInMemoryScrolling,
  withViewTransitions,
} from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnchorScroll } from './config/scroll.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    provideRouter(
      routes,
      withInMemoryScrolling({
        anchorScrolling: 'disabled',
        scrollPositionRestoration: 'enabled',
      }),
      withViewTransitions({
        onViewTransitionCreated: ({ transition }) => {
          const router = inject(Router);
          const targetUrl = router.currentNavigation()?.finalUrl;
          if (!targetUrl) return;

          const sameRouteConfig = {
            paths: 'exact' as const,
            matrixParams: 'exact' as const,
            fragment: 'ignored' as const,
            queryParams: 'ignored' as const,
          };

          if (router.isActive(targetUrl, sameRouteConfig)) {
            transition.skipTransition();
          }
        },
      }),
    ),
    provideAnchorScroll(),
    provideClientHydration(withEventReplay()),
  ],
};
