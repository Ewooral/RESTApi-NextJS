import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table('users', function(table) {
    table.string('initials', 10);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table('users', function(table) {
    table.dropColumn('initials');
  });
}