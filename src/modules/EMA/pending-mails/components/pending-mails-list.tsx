/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import AppHandledBorderedButton from '@/components/forms/button/app-handled-bordered-button';
import AppHandledSolidButton from '@/components/forms/button/app-handled-solid-button';
import { setState } from '@/models/common';
import { Pagination } from '@nextui-org/react';
import { t } from 'i18next';
import PendingMailsItem from './pending-mails-item';

interface IProps {
  activeTab: 1 | 2;
  setActiveTab: setState<1 | 2>;
}

const dummy = [
  {
    id: 1,
    to: 'sara@company.com',
    campaignName: 'Holiday Specials',
    language: 'Turkish',
    templateType: 'Seasonal',
    title: 'Yılbaşı için özel fırsatlar',
    createdAt: '2024-04-01',
    description:
      'Yılbaşı sezonunda kazançlı fırsatlarımızdan yararlanın. Şimdi sipariş verin ve hediyenizi ücretsiz alın. Yılbaşı sezonunda kazançlı fırsatlarımızdan yararlanın. Şimdi sipariş verin ve hediyenizi ücretsiz alın.  Yılbaşı sezonunda kazançlı fırsatlarımızdan yararlanın. Şimdi sipariş verin ve hediyenizi ücretsiz alın.  Sezon boyunca geçerli olan özel indirimler, tatil ruhunu daha da anlamlı kılacak. Kaçırmayın!'
  },
  {
    id: 2,
    to: 'james@business.com',
    campaignName: 'New Product Launch',
    language: 'Spanish',
    templateType: 'Product Introduction',
    title: 'Descubre nuestro nuevo producto',
    createdAt: '2023-11-20',
    description:
      'Conozca nuestro nuevo producto innovador que revolucionará la industria.'
  },
  {
    id: 3,
    to: 'kate@enterprise.com',
    campaignName: 'Summer Sales',
    language: 'English',
    templateType: 'Discount Offer',
    title: 'Beat the Heat with Summer Deals',
    createdAt: '2024-06-15',
    description:
      'Stay cool this summer with Order now and save big! Order now and save big! Order now and save big! Order now and save big! exclusive discounts. Order now and save big!'
  },
  {
    id: 4,
    to: 'alex@marketplace.com',
    campaignName: 'Back to School',
    language: 'French',
    templateType: 'Educational Campaign',
    title: 'Préparez-vous pour la rentrée',
    createdAt: '2024-08-01',
    description:
      'Découvrez notre collection spéciale rentrée scolaire et soyez prêts pour une nouvelle année! Offrez à vos enfants le meilleur Découvrez notre collection spéciale rentrée scolaire et soyez prêts pour une nouvelle année! Offrez à vos enfants le meilleur Découvrez notre collection spéciale rentrée scolaire et soyez prêts pour une nouvelle année! Offrez à vos enfants le meilleur Découvrez notre collection spéciale rentrée scolaire et soyez prêts pour une nouvelle année! Offrez à vos enfants le meilleur équipement pour garantir une année académique réussie. Des sacs à dos robustes aux fournitures modernes, tout ce dont vous avez besoin se trouve ici.'
  },
  {
    id: 5,
    to: 'linda@globalcorp.com',
    campaignName: 'Black Friday Deals',
    language: 'German',
    templateType: 'Sales Campaign',
    title: 'Sichern Sie sich die besten Black Friday Angebote',
    createdAt: '2024-11-25',
    description:
      'Nutzen Sie die einmaligen Black Friday Angebote. Jetzt einkaufen und mehr sparen!'
  },
  {
    id: 6,
    to: 'maria@worldtrade.com',
    campaignName: 'Cyber Monday Mega Sale',
    language: 'Portuguese',
    templateType: 'Online Promotion',
    title: 'Mega Descontos na Cyber Monday',
    createdAt: '2024-12-01',
    description:
      'Aproveite os descontos massivos da Cyber Monday.  descontos massivos da Cyber Monday. descontos massivos da Cyber Monday. descontos massivos da Cyber Monday. descontos massivos da Cyber Monday. descontos massivos da Cyber Monday. descontos massivos da Cyber Monday. descontos massivos da Cyber Monday. descontos massivos da Cyber Monday. descontos massivos da Cyber Monday. descontos massivos da Cyber Monday. descontos massivos da Cyber Monday. descontos massivos da Cyber Monday. descontos massivos da Cyber Monday. Compre agora e economize!'
  },
  {
    id: 7,
    to: 'ivan@retailers.com',
    campaignName: 'End of Year Clearance',
    language: 'Russian',
    templateType: 'Clearance Sale',
    title: 'Грандиозная распродажа к концу года',
    createdAt: '2024-12-15',
    description:
      'Покупайте сейчас и получите огромные скидки на все товары в конце года!'
  },
  {
    id: 8,
    to: 'keiko@techcorp.com',
    campaignName: 'New Year New Tech',
    language: 'Japanese',
    templateType: 'Technology Campaign',
    title: '新しい技術で新年を迎えましょう',
    createdAt: '2025-01-01',
    description:
      '新しい年を迎え、最先端の技術製品で生産性を高めましょう。今すぐ購入してお得に!'
  },
  {
    id: 9,
    to: 'oliver@automotive.com',
    campaignName: 'Spring Car Sales',
    language: 'Italian',
    templateType: 'Automotive Promotion',
    title: 'Promozioni primaverili sulle automobili',
    createdAt: '2024-03-20',
    description:
      'Goditi le nostre offerte speciali di primavera sulle auto. Approfittane ora e risparmia!'
  },
  {
    id: 10,
    to: 'noah@fashion.com',
    campaignName: 'Autumn Wardrobe Refresh',
    language: 'Dutch',
    templateType: 'Fashion Campaign',
    title: 'Verfris je garderobe voor de herfst',
    createdAt: '2024-09-10',
    description:
      'Ontdek de nieuwste modetrends voor het herfstseizoen. Bestel nu en upgrade je look!'
  }
];
function PendingMailsList({ activeTab, setActiveTab }: IProps) {
  return (
    <div className="flex flex-col gap-2 w-full h-full">
      <div className="relative flex justify-between">
        <h3 className="font-semibold text-default-800 text-xl dark:text-white">
          {t('pendingMailsList')} 😎
        </h3>
      </div>
      <div className="bg-transparent w-full">
        <div className="flex justify-between mb-3">
          <div className="flex gap-2">
            <AppHandledBorderedButton
              onClick={() => setActiveTab(1)}
              variant={activeTab === 1 ? 'solid' : 'bordered'}
            >
              {t('pending')}
            </AppHandledBorderedButton>
            <AppHandledBorderedButton
              onClick={() => setActiveTab(2)}
              variant={activeTab === 2 ? 'solid' : 'bordered'}
            >
              {t('scheduled')}
            </AppHandledBorderedButton>
          </div>
          {activeTab === 1 && (
            <AppHandledSolidButton>
              {t('scheduleAndSendAll')}
            </AppHandledSolidButton>
          )}
        </div>
        <div className="flex flex-col gap-5">
          {dummy?.map(item => <PendingMailsItem key={item?.id} item={item} />)}
          <div className="flex justify-center">
            <Pagination
              isCompact
              color="secondary"
              showControls
              page={1}
              total={500}
              // onChange={page => setCurrentPage(page)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PendingMailsList;
