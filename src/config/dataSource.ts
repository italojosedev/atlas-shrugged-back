import 'dotenv/config';
import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'postgres',
  url: process.env.DB_URL,
  synchronize: true,
  logging: true,
  entities: [
    `${process.env.NODE_ENV === 'DEV' ? 'src/' : ''}data/models/*.{ts,js}`,
  ],
  migrations: [
    `${
      process.env.NODE_ENV === 'DEV' ? 'src/' : ''
    }infra/database/migrations/*.{ts,js}`,
  ],
  dropSchema: false,
});
