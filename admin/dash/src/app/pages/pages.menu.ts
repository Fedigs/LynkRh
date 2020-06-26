export const PAGES_MENU = [
  {
    path: 'pages',
    children: [
      {
        path: 'dashboard',
        data: {
          menu: {
            title: 'general.menu.dashboard',
            icon: 'ion-android-home',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'tests',
        data: {
          menu: {
            title: 'Tests',
            icon: 'ion-clipboard',
            selected: false,
            expanded: false,
            order: 0,
          }
        }
      },
      {
        path: 'entretiens',
        data: {
          menu: {
            title: 'Entretiens',
            icon: 'ion-edit',
            selected: false,
            expanded: false,
            order: 0,
          }
        }
      },
      {
        path: 'profile',
        data: {
          menu: {
            title: 'Profile',
            icon: 'ion-user',
            selected: false,
            expanded: false,
            order: 0,
            hidden: true
          }
        }
      },
      
    ]
  }
];
