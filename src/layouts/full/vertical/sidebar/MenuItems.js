import { IconBoxMultiple, IconPoint, IconReport, IconHistory } from '@tabler/icons';

import { uniqueId } from 'lodash';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Menu',
  },
  {
    id: uniqueId(),
    title: 'Master',
    icon: IconBoxMultiple,
    href: '/menulevel/',
    children: [
      {
        id: uniqueId(),
        title: 'Status Kejadian',
        icon: IconPoint,
        href: '/master/caseStatus',
      },
      {
        id: uniqueId(),
        title: 'Penyebab kejadian',
        icon: IconPoint,
        href: '/master/caseCause',
      },
      {
        id: uniqueId(),
        title: 'Kategori kejadian',
        icon: IconPoint,
        href: '/master/caseCategory',
      },
      {
        id: uniqueId(),
        title: 'No GL/SSL/cost centre',
        icon: IconPoint,
        href: '/master/costCentre',
      },
      {
        id: uniqueId(),
        title: 'Unit kerja',
        icon: IconPoint,
        href: '/master/workUnit',
      },
      {
        id: uniqueId(),
        title: 'Status laporan',
        icon: IconPoint,
        href: '/master/reportStatus',
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'Loss Event Database (LED)',
    icon: IconReport,
    href: '/LED',
  },
  {
    id: uniqueId(),
    title: 'Report',
    icon: IconHistory,
    href: '/report',
  },
  // {
  //   id: uniqueId(),
  //   title: 'Disabled',
  //   icon: IconBan,
  //   href: '/',
  //   disabled: true,
  // },
];

export default Menuitems;
