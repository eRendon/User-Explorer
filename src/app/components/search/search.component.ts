import { Component, inject } from '@angular/core'
import { UserRepository } from '../../core/repository/user.repository'
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
import { ErrorMessageComponent } from '../ui/error-message/error-message.component'
import { InputComponent } from '../ui/input/input.component'
import { ButtonComponent } from '../ui/button/button.component'
import { UserListComponent } from '../user-list/user-list.component'
import { IUser } from '../../interfaces/IUser'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { LoadingService } from '../../core/services/loading-service/loading.service'
import { ModalComponent } from '../ui/modal/modal.component'

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
    ModalComponent
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  faSearch = faSearch
  private readonly userRepository = inject(UserRepository);
  private readonly loadingService = inject(LoadingService)
  isModalOpen: boolean = false
  // Formulario reactivo
  searchForm = new FormGroup({
    searchTerm: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(4),
      this.forbiddenTermValidator('gcpglobal')
    ]),
  });

  users: IUser[] = [];
  errorMessage!: string

  forbiddenTermValidator(term: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const forbidden = control.value?.toLowerCase() === term.toLowerCase();
      return forbidden ? { forbiddenTerm: { value: control.value } } : null;
    };
  }

  onSearch() {
    if (this.searchForm.valid) {
      this.errorMessage = ''
      this.loadingService.setIsLoading(true)
      const query = this.searchForm.get('searchTerm')?.value || ''
      this.userRepository.searchUsers(query).subscribe({
        next: users => {
          this.users = users
          this.userRepository.setAllUsers(users)
        },
        error: () => {
          this.loadingService.setIsLoading(false)
          this.isModalOpen = true
          this.errorMessage = 'Error al obtener los usuarios'
        },
        complete: () => {
          this.loadingService.setIsLoading(false)
        }
      })
    } else {
      this.searchForm.markAllAsTouched()
    }
  }

  onCloseModal(): void {
    this.isModalOpen = false
  }
}
