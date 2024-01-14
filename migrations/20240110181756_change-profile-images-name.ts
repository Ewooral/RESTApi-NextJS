import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.renameTable('profile_images', 'profile');
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.renameTable('profile', 'profile_images');
}


