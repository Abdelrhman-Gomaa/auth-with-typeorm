import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5433,
    username: 'postgres',
    password: 'pass123',
    database: 'auth-with-typeOrm',
    entities: ['../**/*/models/*.model.js'],
    migrations: ['dist/db/migrations/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;