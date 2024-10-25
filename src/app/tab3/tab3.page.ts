import { Component } from '@angular/core';
import { PopoverController, ToastController } from '@ionic/angular';

interface SocialPost {
  user: string;
  avatar: string;
  achievement: string;
  time: string;
  congratulated?: boolean;
}

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  socialFeed: SocialPost[] = [
    {
      user: 'Brian Cahya',
      avatar: 'assets/brian.jpeg',
      achievement: 'Completed 7-day streak!',
      time: '2h ago',
      congratulated: false
    },
    {
      user: 'Dzakwan Irfan',
      avatar: 'assets/dzakwan.jpeg',
      achievement: 'Reached Level 5!',
      time: '5h ago',
      congratulated: false
    }
  ];

  constructor(
    private popoverCtrl: PopoverController,
    private toastCtrl: ToastController
  ) {}

  async congratulate(post: SocialPost, index: number) {
    if (post.congratulated) {
      const toast = await this.toastCtrl.create({
        message: `You've already congratulated ${post.user}!`,
        duration: 2000,
        position: 'bottom',
        color: 'medium'
      });
      await toast.present();
      return;
    }

    this.socialFeed[index].congratulated = true;

    const toast = await this.toastCtrl.create({
      message: `Congratulated ${post.user} on their achievement!`,
      duration: 2000,
      position: 'bottom',
      color: 'success'
    });
    await toast.present();
  }
}