import * as knex from 'knex';

export const Knex = knex({
    client: 'pg',
    connection: {
        host: 'localhost',
        port: 5433,
        user: 'postgres',
        password: 'docker',
        database: 'dw_alunos',
    },
});