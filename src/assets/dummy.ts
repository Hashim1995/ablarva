// import { PricingList } from '@/models/common';
import { IAsistanCard } from '@/modules/chat/types';
import { IPricingListData } from '@/modules/pricing/types';

export const asistansList: IAsistanCard[] = [
  {
    id: 1,
    img: 'https://nextui.org/images/hero-card.jpeg',
    title: 'Paylaşımlar üçün mətnlər',
    description: 'Sosial media paylaşımlarınız üçün cəlbedici mətnlər yazın'
  },
  {
    id: 2,
    img: 'https://nextui.org/images/hero-card.jpeg',
    title: 'Paylaşımlar üçün şüarlar',
    description: 'Sosial media paylaşımlarınız üçün şüarlar hazırlayın'
  },
  {
    id: 3,
    img: 'https://nextui.org/images/hero-card.jpeg',
    title: '#Hashtags ',
    description: 'Sosial media paylaşımlarınız üçün şüarlar hazırlayın'
  },
  {
    id: 4,
    img: 'https://nextui.org/images/hero-card.jpeg',
    title: 'Bloq yazısı üçün giriş mətni',
    description: 'Bloq yazısı üçün giriş mətnlər yazın'
  },
  {
    id: 5,
    img: 'https://nextui.org/images/hero-card.jpeg',
    title: 'Bloq yazısı üçün mətnlər yazın',
    description: 'Bloq yazısı üçün maraqlı mətnlər yazın'
  },
  {
    id: 6,
    img: 'https://nextui.org/images/hero-card.jpeg',
    title: 'Bloq yazısı üçün mövzular',
    description: 'Sosial media paylaşımlarınız üçün şüarlar hazırlayın'
  }
];

export const pricingList1: IPricingListData = {
  tHeader: [
    {
      title: 'Tarifə nələr daxildir monica pelengin basini cevir?',
      price: null,
      id: 0,
      desciption: null
    },
    {
      title: 'Söhbət 1',
      price: '15',
      id: 2,
      desciption:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    },
    {
      title: 'Şəkil genaratoru',
      price: '20',
      id: 3,
      desciption:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    },
    {
      title: 'Səsli söhbət',
      price: '10',
      id: 4,
      desciption:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    }
  ],
  tBody: [
    {
      title: 'Sorgu 1',
      chatLimit: 1000,
      imgLimit: null,
      voiceLimit: null
    },
    {
      title: 'Sorğu (Köməkçi ilə)',
      chatLimit: null,
      imgLimit: null,
      voiceLimit: null
    },
    {
      title: 'Şəkil generasiya',
      chatLimit: null,
      imgLimit: 2000,
      voiceLimit: null
    },
    {
      title: 'Səsli sorğu',
      chatLimit: null,
      imgLimit: null,
      voiceLimit: 2000
    }
  ]
};

export const pricingList2: IPricingListData = {
  tHeader: [
    {
      title: 'Tarifə nələr daxildir 2?',
      price: null,
      id: 0,
      desciption: null
    },
    {
      title: 'Söhbət 2',
      price: '15',
      id: 2,
      desciption:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    },
    {
      title: 'Şəkil genaratoru',
      price: '20',
      id: 3,
      desciption:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    },
    {
      title: 'Səsli söhbət',
      price: '10',
      id: 4,
      desciption:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    }
  ],
  tBody: [
    {
      title: 'Sorgu 2',
      chatLimit: 1000,
      imgLimit: null,
      voiceLimit: null
    },
    {
      title: 'Sorğu (Köməkçi ilə)',
      chatLimit: null,
      imgLimit: null,
      voiceLimit: null
    },
    {
      title: 'Şəkil generasiya',
      chatLimit: null,
      imgLimit: 2000,
      voiceLimit: null
    },
    {
      title: 'Səsli sorğu',
      chatLimit: null,
      imgLimit: null,
      voiceLimit: 2000
    }
  ]
};

export const pricingList3: IPricingListData = {
  tHeader: [
    {
      title: 'Tarifə nələr daxildir 3?',
      price: null,
      id: 0,
      desciption: null
    },
    {
      title: 'Söhbət 3',
      price: '15',
      id: 2,
      desciption:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    },
    {
      title: 'Şəkil genaratoru',
      price: '20',
      id: 3,
      desciption:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    },
    {
      title: 'Səsli söhbət',
      price: '10',
      id: 4,
      desciption:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    }
  ],
  tBody: [
    {
      title: 'Sorgu 3',
      chatLimit: 1000,
      imgLimit: null,
      voiceLimit: null
    },
    {
      title: 'Sorğu (Köməkçi ilə)',
      chatLimit: null,
      imgLimit: null,
      voiceLimit: null
    },
    {
      title: 'Şəkil generasiya',
      chatLimit: null,
      imgLimit: 2000,
      voiceLimit: null
    },
    {
      title: 'Səsli sorğu',
      chatLimit: null,
      imgLimit: null,
      voiceLimit: 2000
    }
  ]
};
