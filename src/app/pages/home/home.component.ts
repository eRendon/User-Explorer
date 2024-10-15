import { Component } from '@angular/core';
import { SearchComponent } from '../../components/search/search.component'

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  imports: [
    SearchComponent
  ],
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
