import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.orders)
  user!: User;

  @Column("simple-json")
  items!: {
    brand: string;
    quantity: number;
    price: number;
    imgSrc: string;
    description: string;
  }[];

  @Column("decimal")
  total!: number;
}
