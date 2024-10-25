import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Achievement, Hero, Quest } from '../models/types';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private hero = new BehaviorSubject<Hero>({
    name: 'Jehian Athaya',
    codename: 'H1D022006',
    level: 9,
    experience: 3500,
    avatar: 'assets/jehian.jpeg',
    github: 'https://github.com/send0moka',
    linkedin: 'https://www.linkedin.com/in/jehianth',
    instagram: 'https://www.instagram.com/jehianth',
    twitter: 'https://twitter.com/sendomoka',
  });

  private quests = new BehaviorSubject<Quest[]>([
    {
      id: '1',
      title: 'Jogging Pagi',
      description: 'Selama 30 menit rute arah stasiun',
      category: 'health',
      experience: 500,
      completed: false,
      streak: 0
    },
    {
      id: '2',
      title: 'Push Rank Valorant',
      description: 'Solo dari Gold 3 ke Diamond 1',
      category: 'education',
      experience: 750,
      completed: false,
      streak: 0
    }
  ]);

  private achievements = new BehaviorSubject<Achievement[]>([
    {
      id: '1',
      title: 'First Quest',
      description: 'Selesaikan 2 quest',
      icon: 'trophy',
      unlocked: false
    },
    {
      id: '2',
      title: 'Streak Master',
      description: 'Pertahankan 7 hari beruntun',
      icon: 'flame',
      unlocked: false
    }
  ]);

  getHero() {
    return this.hero.asObservable();
  }

  getQuests() {
    return this.quests.asObservable();
  }

  getAchievements() {
    return this.achievements.asObservable();
  }

  private checkAndUpdateAchievements() {
    const currentQuests = this.quests.value;
    const currentAchievements = this.achievements.value;
    let achievementsUpdated = false;

    const completedQuests = currentQuests.filter(q => q.completed);
    if (completedQuests.length > 0) {
      const firstQuestAchievement = currentAchievements.find(a => a.id === '1');
      if (firstQuestAchievement && !firstQuestAchievement.unlocked) {
        firstQuestAchievement.unlocked = true;
        achievementsUpdated = true;
      }
    }

    const hasSevenDayStreak = currentQuests.some(q => q.streak >= 7);
    if (hasSevenDayStreak) {
      const streakAchievement = currentAchievements.find(a => a.id === '2');
      if (streakAchievement && !streakAchievement.unlocked) {
        streakAchievement.unlocked = true;
        achievementsUpdated = true;
      }
    }

    if (achievementsUpdated) {
      this.achievements.next(currentAchievements);
    }
  }

  completeQuest(questId: string) {
    const currentQuests = this.quests.value;
    const questIndex = currentQuests.findIndex(q => q.id === questId);
    
    if (questIndex !== -1) {
      currentQuests[questIndex].completed = true;
      currentQuests[questIndex].streak++;
      this.quests.next(currentQuests);

      const currentHero = this.hero.value;
      currentHero.experience += currentQuests[questIndex].experience;
      if (currentHero.experience >= currentHero.level * 1000) {
        currentHero.level++;
      }
      this.hero.next(currentHero);

      this.checkAndUpdateAchievements();
    }
  }

  addQuest(quest: Quest) {
    const currentQuests = this.quests.value;
    currentQuests.push(quest);
    this.quests.next(currentQuests);
  }
}