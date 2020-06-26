export const PAGES_MENU = [
  {
    path: 'pages',
    children: [
      {
        path: 'dashboard',
        data: {
          menu: {
            title: 'Accueil',
            icon: 'ion-android-home',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'profile',
        data: {
          menu: {
            title: 'Profil',
            icon: 'ion-person',
            selected: false,
            expanded: false,
            order: 0,
            hidden: false
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
        path: 'start-test',
        data: {
          menu: {
            title: 'Test technique',
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
