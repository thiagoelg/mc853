exports.up = async knex => {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.string('name');
    table.string('email');
    table.string('password');
    table.string('created_at');
    table.string('updated_at');
  });
}

exports.down = async knex => {
  return knex.schema
    .dropTableIfExists('users');
}