import { Component, OnInit } from '@angular/core';
import { Hero, Quest } from '../models/types';
import { ToastController, AlertController } from '@ionic/angular';
import { HeroService } from '../services/hero.services';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  hero!: Hero; 
  quests: Quest[] = [];

  constructor(
    private heroService: HeroService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {
    this.hero = {
      name: 'Loading...',
      codename: 'Loading...',
      level: 1,
      experience: 0,
      avatar: 'assets/default-avatar.png',
      github: '',
      linkedin: '',
      instagram: '',
      twitter: ''
    };
  }

  ngOnInit() {
    this.heroService.getHero().subscribe(hero => {
      if (hero) {
        this.hero = hero;
      }
    });
    this.heroService.getQuests().subscribe(quests => {
      if (quests) {
        this.quests = quests;
      }
    });
  }

  calculateProgress(): number {
    if (!this.hero) return 0;
    return this.hero.experience / (this.hero.level * 1000);
  }

  getXPText(): string {
    if (!this.hero) return 'XP: 0 / 1000';
    return `XP: ${this.hero.experience} / ${this.hero.level * 1000}`;
  }

  async completeQuest(quest: Quest) {
    const alert = await this.alertCtrl.create({
      header: 'Complete Quest',
      message: `Have you completed "${quest.title}"?`,
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Yes',
          handler: () => {
            this.heroService.completeQuest(quest.id);
            this.showToast(`Quest completed! +${quest.experience}XP`);
          }
        }
      ]
    });

    await alert.present();
  }

  async addNewQuest() {
    const alert = await this.alertCtrl.create({
      header: 'Add New Quest',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Quest Title'
        },
        {
          name: 'description',
          type: 'text',
          placeholder: 'Quest Description'
        },
        {
          name: 'experience',
          type: 'number',
          placeholder: 'XP Reward',
          min: 1
        },
        {
          name: 'category',
          type: 'text',
          placeholder: 'Category (health/education)'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: (data) => {
            if (data.title && data.description && data.experience && data.category) {
              const newQuest: Quest = {
                id: Date.now().toString(),
                title: data.title,
                description: data.description,
                category: data.category.toLowerCase(),
                experience: parseInt(data.experience),
                completed: false,
                streak: 0
              };
              this.heroService.addQuest(newQuest);
              this.showToast('New quest added!');
              return true;
            } else {
              this.showToast('Please fill all fields');
              return false;
            }
          }
        }
      ]
    });

    await alert.present();
  }

  private async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }
}