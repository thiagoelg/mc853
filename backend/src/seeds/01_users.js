exports.seed = knex => {
  return knex('users').truncate().then(() => {
    return knex('users').insert([
      { name: 'admin', email: 'admin', password: '$2y$10$.mADKr979TNBWOrdhOHODuceBTe9A8frbgeg8l1iVSvDtWCLn0gUi' }
    ]);
  })
}