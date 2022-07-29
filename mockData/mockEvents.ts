import { EventData } from '../models/Event';
import { hash } from '../utils';

export const mockEvent: EventData = {
  event_description:
    'vSelf lauches a series of quests which will keep you motivated while you learn about our project and its place inside NEAR ecosystem',
  event_name: 'vSelf Onboarding Metabuild Quest',
  finish_time: new Date().getTime() * 1000000 + 30 * 24 * 60 * 60 * 1000000,
  start_time: new Date().getTime() * 1000000,
  quests: [
    {
      qr_prefix_enc: `${hash('https://vself-dev.web.app/vself.apk')}`,
      qr_prefix_len: 'https://vself-dev.web.app/vself.apk'.length,
      reward_description: 'Welcome to the vSelf demo!',
      reward_title: 'vSelf: Welcome Badge',
      reward_uri: '/nft1.png',
    },
    {
      qr_prefix_enc: `${hash('You have registered in the NEAR community')}`,
      qr_prefix_len: 'You have registered in the NEAR community'.length,
      reward_description: 'You have registered in the NEAR community',
      reward_title: 'vSelf: NEAR User Badge',
      reward_uri: '/nft2.png',
    },
    {
      qr_prefix_enc: `${hash('Congrats! Now you know more about Web3')}`,
      qr_prefix_len: 'Congrats! Now you know more about Web3'.length,
      reward_description: 'Congrats! Now you know more about Web3',
      reward_title: 'vSelf: Early Adopter Badge',
      reward_uri: '/nft3.png',
    },
    {
      qr_prefix_enc: `${hash('Thank you <3 and see you soon!')}`,
      qr_prefix_len: 'Thank you <3 and see you soon!'.length,
      reward_description: 'Thank you <3 and see you soon!',
      reward_title: 'vSelf: Metabuidl Badge',
      reward_uri: '/nft4.png',
    },
  ],
};

export const mockBarcelonaEvent: EventData = {
  event_description:
    'WOW3 meetup at ETH Barcelona is focusing on inclusivity and diversity in Web3 communities. For our guests, vSelf suggests an interactive experience, supported by our platform and prepared custom attendance certificates and NFT rewards.',
  event_name: 'ETH Barcelona NFTs',
  finish_time: 1657539102000000000,
  quests: [
    {
      qr_prefix_enc: 'https://vself.app/ethbarcelona?1',
      qr_prefix_len: 0,
      reward_description: 'Thank you for joining our event! Enjoy the kudos to WOW3 meetup participants',
      reward_title: 'WOW3 & vSelf Community',
      reward_uri: '',
    },
    {
      qr_prefix_enc: 'https://vself.app/ethbarcelona?2',
      qr_prefix_len: 0,
      reward_description: 'Glad to see you getting to the essence of things. All effort should be rewarded!',
      reward_title: 'Tech Deep Dive',
      reward_uri: '',
    },
    {
      qr_prefix_enc: 'https://vself.app/ethbarcelona?3',
      qr_prefix_len: 0,
      reward_description: 'Thank you for giving us feedback! We appreciate your contribution. ',
      reward_title: 'vSelf Supporter',
      reward_uri: '',
    },
    {
      qr_prefix_enc: 'https://vself.app/ethbarcelona?4',
      qr_prefix_len: 0,
      reward_description: 'Synergy between people makes things possible! Thank you for being a part of this journey. ',
      reward_title: 'Collaboration & Creativity',
      reward_uri: '',
    },
  ],
  start_time: 1656934302915000000,
};
