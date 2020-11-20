import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { GoogleAnalyticsComponent } from './google-analytics/google-analytics.component';
import { GoogleAnalyticsModule } from '@classi/ngx-google-analytics';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        GoogleAnalyticsModule.forRoot({ disableTracking: true }),
      ],
      declarations: [AppComponent, GoogleAnalyticsComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
