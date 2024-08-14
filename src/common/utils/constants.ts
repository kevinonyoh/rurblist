const PAGINATION = {
    DEFAULT_PAGE_NUMBER: 1,

    DEFAULT_LIMIT: 50
};

const PERMISSIONS = [
    {
      name: 'dashboard',
      description: 'view dashboard',
      resource: ['order', 'location', 'rider']
    },
    {
      name: 'order',
      description: 'view order',
      resource: ['order']
    },
    {
      name: 'rider',
      description: 'view rider',
      resource: ['rider']
    },
    {
      name: 'account',
      description: 'view account',
      resource: ['payment']
    },
    {
      name: 'settings',
      description: 'view account',
      resource: ['rider', 'admin', 'role']
    }
];

export default {
    PAGINATION,

    PERMISSIONS
};