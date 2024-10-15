import { ComponentFixture, TestBed } from '@angular/core/testing'

import { IconComponent } from './icon.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { By } from '@angular/platform-browser'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { NO_ERRORS_SCHEMA } from '@angular/core'

describe('IconComponent', () => {
  let component: IconComponent;
  let fixture: ComponentFixture<IconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, IconComponent],
      schemas: [NO_ERRORS_SCHEMA], // Esto evita errores relacionados con componentes de FontAwesome que no se reconocen
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the icon passed as input', () => {
    // Asigna un icono válido
    const mockIcon: IconDefinition = {
      prefix: 'fas',
      iconName: 'home',
      icon: [512, 512, [], 'f015', '...']
    };
    component.icon = mockIcon; // Asigna el icono al componente
    fixture.detectChanges(); // Detecta los cambios

    const iconElement = fixture.debugElement.query(By.css('fa-icon')); // Selector para el componente de icono
    expect(iconElement).toBeTruthy(); // Verifica que el elemento del icono se haya renderizado
  });

  it('should bind the correct icon class', () => {
    const mockIcon: IconDefinition = {
      prefix: 'fas',
      iconName: 'search',
      icon: [512, 512, [], 'f015', '...']
    };
    component.icon = mockIcon; // Asigna el icono al componente
    fixture.detectChanges(); // Detecta los cambios

    const iconElement = fixture.debugElement.query(By.css('fa-icon')); // Busca el elemento fa-icon
    const iconClasses = iconElement.nativeElement.classList;

    // Verifica que la clase del icono se haya aplicado correctamente
    expect(iconClasses).toContain('ng-fa-icon'); // Asegúrate de que el nombre de clase sea correcto
  });
});
