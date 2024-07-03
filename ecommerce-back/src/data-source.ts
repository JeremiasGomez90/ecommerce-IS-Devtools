import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Order } from "./entities/Order";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true,
  logging: false,
  entities: [User, Order],
  migrations: [],
  subscribers: [],
});
