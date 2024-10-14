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
import { InputComponent } from '../input/input.component'
import { ButtonComponent } from '../button/button.component'
import { UserListComponent } from '../../user-list/user-list.component'
import { IUser } from '../../../interfaces/IUser'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    ErrorMessageComponent,
    ReactiveFormsModule,
    InputComponent,
    ButtonComponent,
    UserListComponent,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  faSearch = faSearch
  private userRepository = inject(UserRepository);

  // Formulario reactivo
  searchForm = new FormGroup({
    searchTerm: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(4),
      this.forbiddenTermValidator('gcpglobal'), // Cambia a la función correcta
    ]),
  });

  users: IUser[] = [];
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
      const query = this.searchForm.get('searchTerm')?.value || ''
      this.userRepository.searchUsers(query).subscribe({
        next: users => {
          this.users = users
          this.userRepository.setAllUsers(users)
        },
        error: () => {
          this.errorMessage = 'Error al obtener los usuarios'
        }
      })
    }
  }
}
