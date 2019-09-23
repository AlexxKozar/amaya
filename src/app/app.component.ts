import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { DOMAIN_NAME } from '@constants/domain-name.constant';

declare var gtag;
declare var fbq;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  domainName = DOMAIN_NAME;

  constructor(private router: Router) {
    this._initRouterTracking();
  }

  private _initRouterTracking() {
    const navEndEvent$ = this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    );
    navEndEvent$.subscribe((e: NavigationEnd) => {
      gtag('config', 'GTM-MF2GCK2', {
        page_path: this.domainName + e.urlAfterRedirects
      });

      fbq('track', 'PageView', {
        url: this.domainName + e.urlAfterRedirects
      });

      if (e.urlAfterRedirects === '/thanks') {
        fbq('track', 'Lead');
      }
    });
  }
}
