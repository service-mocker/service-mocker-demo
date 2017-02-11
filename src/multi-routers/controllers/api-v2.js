export default router => {
  router.get('/users', (req, res) => {
    res.send({
      version: 'v2',
      users: [ 'Dolphin Wood', 'Vincent Bel' ],
    });
  });
};
