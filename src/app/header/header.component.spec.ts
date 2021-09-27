import { TestBed, async } from "@angular/core/testing";
import { StoreModule } from "@ngrx/store";
import { HeaderComponent } from "./header.component";

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
});
