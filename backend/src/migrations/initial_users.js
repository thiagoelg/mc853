exports.up = knex => {
  return knex.schema
    .createTable('users', table => {
      table.increments('id').primary();
      table.string('name');
      table.string('email');
      table.string('password');
      table.string('createdAt');
      table.string('updatedAt');
    });
}

exports.down = knex => {
  return knex.schema
    .dropTableIfExists('users');
}