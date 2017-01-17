export default router => {
  router.get('/', 'Hello from APIv1 route.');

  router.get('/users', 'List of APIv1 users.');
};
