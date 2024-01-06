// Filename: 20240107185427_alter_users_table.ts
import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable('users', table => {
        table.dropColumn('name');
        table.string('firstname').notNullable();
        table.string('lastname').notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable('users', table => {
        table.dropColumn('firstname');
        table.dropColumn('lastname');
        table.string('name').notNullable();
    });
}