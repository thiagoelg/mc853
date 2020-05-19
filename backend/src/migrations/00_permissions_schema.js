exports.up = knex => {
  return knex.schema.createTable('permissions', table => {
    table.increments('id').primary();
    table.string('name');
    table.string('short_name');
    table.string('created_at');
    table.string('updated_at');
  });
}

exports.down = async knex => {
  return knex.schema
    .dropTableIfExists('permissions');
}