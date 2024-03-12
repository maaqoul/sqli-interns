import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Hero, heroes } from '../models/heroes';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  hero!: Hero;
  constructor(){
    this.hero = heroes.filter(h => h.id === Number(this.route.snapshot.params['id']))[0];
  }
  onKeyEvent(event: KeyboardEvent) {
      this.hero.name = (event.target as HTMLInputElement).value;
  }
}
