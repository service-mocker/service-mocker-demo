export default router => {
  router.get('/', 'Hello from APIv2 route.');

  router.get('/users', 'List of APIv2 users.');
};
