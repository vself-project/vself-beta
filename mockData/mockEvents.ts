import { EventData } from '../models/Event';

export const mockEvent: EventData = {
  event_description:
    'vSelf lauches a series of quests which will keep you motivated while you learn about our project and its place inside NEAR ecosystem',
  event_name: 'vSelf Onboarding Metabuild Quest',
  finish_time: new Date().getTime() * 1000000 + 30 * 24 * 60 * 60 * 1000000,
  quests: [
    {
      qr_prefix: 'https://vself-dev.web.app/vself.apk',
      reward_description: 'Welcome to the vSelf demo!',
      reward_title: 'vSelf: Welcome Badge',
      reward_url: '/nft1.png',
    },
    {
      qr_prefix: 'You have registered in the NEAR community',
      reward_description: 'You have registered in the NEAR community',
      reward_title: 'vSelf: NEAR User Badge',
      reward_url: '/nft2.png',
    },
    {
      qr_prefix: 'Congrats! Now you know more about Web3',
      reward_description: 'Congrats! Now you know more about Web3',
      reward_title: 'vSelf: Early Adopter Badge',
      reward_url: '/nft3.png',
    },
    {
      qr_prefix: 'Thank you <3 and see you soon!',
      reward_description: 'Thank you <3 and see you soon!',
      reward_title: 'vSelf: Metabuidl Badge',
      reward_url: '/nft4.png',
    },
  ],
  start_time: new Date().getTime() * 1000000,
};
