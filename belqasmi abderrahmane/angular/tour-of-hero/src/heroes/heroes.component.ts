import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { heroes } from '../models/heroes';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css'
})

export class HeroesComponent {
  heros = heroes;
}
