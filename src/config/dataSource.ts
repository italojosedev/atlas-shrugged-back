import 'dotenv/config';
import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'postgres',
  url: process.env.DB_URL,
  synchronize: true,
  logging: false,
  entities: [
    `${process.env.NODE_ENV === 'dev' ? 'src/' : ''}app/models/*.{ts,js}`,
  ],
  migrations: [
    `${
      process.env.NODE_ENV === 'dev' ? 'src/' : ''
    }/database/migrations/*.{ts,js}`,
  ],
  dropSchema: false,
});
