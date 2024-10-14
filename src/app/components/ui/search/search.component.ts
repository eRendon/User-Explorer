import { Component, inject } from '@angular/core'
import { UserRepository } from '../../../core/services/user.repository'
import { RouterLink } from '@angular/router'
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators
} from '@angular/forms'
import { ErrorMessageComponent } from '../error-message/error-message.component'
import { UserDAO } from '../../../core/services/dao/user.dao'

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    ErrorMessageComponent,
    ReactiveFormsModule
  ],
  providers: [
    UserRepository,
    UserDAO
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  private userDAO = inject(UserDAO);

  // Formulario reactivo
  searchForm = new FormGroup({
    searchTerm: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(4),
      this.forbiddenTermValidator('gcpglobal'), // Cambia a la función correcta
    ]),
  });

  users: any[] = [];
  errorMessage: string | null = null;

  // Validación personalizada para evitar "gcpglobal"
  forbiddenTermValidator(term: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const forbidden = control.value?.toLowerCase() === term.toLowerCase();
      return forbidden ? { forbiddenTerm: { value: control.value } } : null;
    };
  }

  // Método para buscar usuarios
  onSearch() {
    if (this.searchForm.valid) {
      const query = this.searchForm.get('searchTerm')?.value || '';
      this.userDAO.searchUsers(query).subscribe(
        (response) => {
          this.users = response.items.slice(0, 10); // Mostrar solo los primeros 10 usuarios
        },
        (error) => {
          this.errorMessage = 'Error al obtener los usuarios';
        }
      );
    }
  }
}
