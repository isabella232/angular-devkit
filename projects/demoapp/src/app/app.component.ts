import { Component } from '@angular/core';
import { AnalyticsTracker } from '@classi/ngx-google-analytics';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private readonly analytics: AnalyticsTracker) {
    this.analytics.startTracking();
  }
}
