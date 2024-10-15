import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultLayoutComponent } from './default-layout.component';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router'
import { ChangeDetectorRef, importProvidersFrom } from '@angular/core'
import { LoaderComponent } from '../../components/ui/loader/loader.component'
import { IconComponent } from '../../components/ui/icon/icon.component'
import { ToastComponent } from '../../components/ui/toast/toast.component'
import { BrowserModule, By } from '@angular/platform-browser'
import { of } from 'rxjs'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

describe('DefaultLayoutComponent', () => {
  let component: DefaultLayoutComponent;
  let fixture: ComponentFixture<DefaultLayoutComponent>;
  let changeDetectorRefSpy: jasmine.SpyObj<ChangeDetectorRef>;

  beforeEach(async () => {
    changeDetectorRefSpy = jasmine.createSpyObj('ChangeDetectorRef', ['detectChanges']);

    await TestBed.configureTestingModule({
      imports: [
        DefaultLayoutComponent,
        RouterOutlet,
        RouterLink,
        LoaderComponent,
        IconComponent,
        ToastComponent
      ],
      providers: [
        importProvidersFrom([BrowserModule, BrowserAnimationsModule]),
        { provide: ChangeDetectorRef, useValue: changeDetectorRefSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({})
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DefaultLayoutComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have the gitHubIcon defined', () => {
    expect(component.gitHubIcon).toBeTruthy();
  });

  it('should render the loader component', () => {
    fixture.detectChanges();
    const loaderComponent = fixture.debugElement.query(By.directive(LoaderComponent));
    expect(loaderComponent).toBeTruthy();
  });

  it('should render the toast component', () => {
    fixture.detectChanges();
    const toastComponent = fixture.debugElement.query(By.directive(ToastComponent));
    expect(toastComponent).toBeTruthy();
  });
});
