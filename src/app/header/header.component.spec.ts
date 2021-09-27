import { TestBed, async } from "@angular/core/testing";
import { StoreModule } from "@ngrx/store";
import { HeaderComponent } from "./header.component";
import { HeaderService } from "./header.service";

describe('Component: Header', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({})
      ],
      declarations: [
        HeaderComponent
      ]
    });
  });
  
  it('should create the app', () => {
    let fixture = TestBed.createComponent(HeaderComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should use the header name from the header service', () => {
    let fixture = TestBed.createComponent(HeaderComponent);
    let app = fixture.debugElement.componentInstance;
    let headerService = fixture.debugElement.injector.get(HeaderService);
    fixture.detectChanges();
    expect(headerService.title).toEqual(app.title);
  });

  it('should display the logout button', () => {
    let fixture = TestBed.createComponent(HeaderComponent);
    let app = fixture.debugElement.componentInstance;
    let headerService = fixture.debugElement.injector.get(HeaderService);
    app.isAuthenticated = true;
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.logout-btn')).toBeTruthy();
  });
});
