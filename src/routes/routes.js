
export const appRoutes = {
  label: 'app',
  children: [
    {
      name: 'Categories',
      icon: 'category',
      active: true,
      children: [
        {
          name: 'Event detail',
          to: '/events/event-detail',
          active: true
        },
      ]
    },
    {
      name: 'Area',
      icon: 'area',
      active: true,
      children: [
        {
          name: 'Event detail',
          to: '/events/event-detail',
          active: true
        }
      ]
    },
  ]
};


export default [
  appRoutes,
];
