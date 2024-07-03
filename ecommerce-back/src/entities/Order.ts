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
    description: string;
    imgSrc: string;
    price: number;
    quantity: number;
  }[];

  @Column("decimal")
  total!: number;
}
