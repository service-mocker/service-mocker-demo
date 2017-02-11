export default router => {
  router.get('/users', (req, res) => {
    res.send({
      version: 'v1',
      users: [ 'Vincent Bel' ],
    });
  });
};
