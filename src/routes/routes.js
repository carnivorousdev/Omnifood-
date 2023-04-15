
export const appRoutes = {
  label: 'app',
  children: [
    {
      name: 'Events',
      icon: 'calendar-day',
      active: true,
      children: [
        {
          name: 'Create an event',
          to: '/events/create-an-event',
          active: true
        },
        {
          name: 'Event detail',
          to: '/events/event-detail',
          active: true
        },
        {
          name: 'Event list',
          to: '/events/event-list',
          active: true
        }
      ]
    },
  ]
};


export default [
  appRoutes,
];
