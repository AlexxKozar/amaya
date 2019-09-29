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
      const url = e.urlAfterRedirects;

      gtag('config', 'GTM-MF2GCK2', {
        page_path: this.domainName + url
      });

      fbq('track', 'PageView', {
        url: this.domainName + url
      });

      if (url === '/thanks' || url === '/result') {
        fbq('track', 'Lead');
      }
    });
  }
}
