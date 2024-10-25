import { Component, OnInit } from '@angular/core';
import { Achievement } from '../models/types';
import { HeroService } from '../services/hero.services';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  achievements!: Achievement[];

  constructor(private heroService: HeroService) {}

  ngOnInit() {
    this.heroService.getAchievements().subscribe(
      achievements => this.achievements = achievements
    );
  }
}