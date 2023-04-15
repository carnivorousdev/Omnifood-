export const dashboardRoutes = {
  label: 'Dashboard',
  labelDisable: true,
  children: [
    {
      name: 'Dashboard',
      active: true,
      icon: 'chart-pie',
      children: [
        {
          name: 'Default',
          to: '/',
          exact: true,
          active: true
        },
        {
          name: 'E Commerce',
          to: '/dashboard/e-commerce',
          active: true
        },
      ]
    }
  ]
};
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
    {
      name: 'E Commerce',
      icon: 'shopping-cart',
      active: true,
      children: [
        {
          name: 'Product',
          active: true,
          children: [
            {
              name: 'Product list',
              to: '/e-commerce/product/product-list',
              active: true
            },
            {
              name: 'Product grid',
              to: '/e-commerce/product/product-grid',
              active: true
            },
            {
              name: 'Product details',
              to: '/e-commerce/product/product-details',
              active: true
            }
          ]
        },
        {
          name: 'Orders',
          active: true,
          children: [
            {
              name: 'Order list',
              to: '/e-commerce/orders/order-list',
              active: true
            },
            {
              name: 'Order details',
              to: '/e-commerce/orders/order-details',
              active: true
            }
          ]
        },
      ]
    },

  ]
};


export default [
  dashboardRoutes,
  appRoutes,
];
