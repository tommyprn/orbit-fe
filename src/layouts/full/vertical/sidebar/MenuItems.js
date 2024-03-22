import { IconBoxMultiple, IconPoint, IconReport, IconHistory } from '@tabler/icons';

import { uniqueId } from 'lodash';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Menu',
  },
  {
    id: '22',
    title: 'Master Data',
    icon: 'IconBoxMultiple',
    href: '/master-data/',
    children: [
      {
        id: '20',
        title: 'Status Kejadian',
        icon: 'IconPoint',
        href: '/master/case-status',
      },
      {
        id: '21',
        title: 'Penyebab kejadian',
        icon: 'IconPoint',
        href: '/master/case-cause',
      },
      {
        id: '22',
        title: 'Kategori kejadian',
        icon: 'IconPoint',
        children: [
          {
            id: '221',
            title: 'Kategori',
            icon: 'IconPoint',
            href: '/master/case-category/level-one',
          },
          {
            id: '222',
            title: 'Sub Kategori',
            icon: 'IconPoint',
            href: '/master/case-category/level-two',
          },
          {
            id: '223',
            title: 'Aktivitas',
            icon: 'IconPoint',
            href: '/master/case-category/level-three',
          },
        ],
      },
      {
        id: '23',
        title: 'No GL/SSL/cost centre',
        icon: 'IconPoint',
        href: '/master/cost-centre',
      },
      {
        id: '24',
        title: 'Unit kerja',
        icon: 'IconPoint',
        href: '/master/work-unit',
      },
      {
        id: '25',
        title: 'Status laporan',
        icon: 'IconPoint',
        href: '/master/report-status',
      },
    ],
  },
  {
    id: '26',
    title: 'Loss Event Database',
    icon: 'IconReport',
    href: '/LED',
    children: [
      {
        id: '261',
        title: 'Inbox',
        icon: 'IconPoint',
        href: '/LED/inbox',
      },
      {
        id: '262',
        title: 'List',
        icon: 'IconPoint',
        href: '/LED/list',
      },
      {
        id: '263',
        title: 'Input LED',
        icon: 'IconPoint',
        href: '/LED/report',
      },
      {
        id: '263',
        title: 'Laporan nihil',
        icon: 'IconPoint',
        href: '/LED/zero-report',
      },
    ],
  },
  {
    id: '27',
    title: 'Report',
    icon: 'IconHistory',
    href: '/report',
  },
];
export default Menuitems;
