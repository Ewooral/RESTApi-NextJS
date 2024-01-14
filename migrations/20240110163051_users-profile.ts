import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('profile_images', table => {
    table.increments('id');
    table.string('image', 255).notNullable();
    table.uuid('user_id').references('users.id'); // Change this line
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('profile_images');
}