import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [
          __dirname + '/../**/*.model{.ts,.js}',
        ],
        synchronize: true,
      });

      return dataSource.initialize()
        .then(() => {
          console.log("Data Source has been initialized! ✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔");
        })
        .catch((err) => {
          console.error("Error during Data Source initialization ❌❌❌❌❌❌❌❌❌", err);
        });
    },
  },
];