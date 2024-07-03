import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Order } from "../entities/Order";

export class OrderController {
  static createOrder = async (req: Request, res: Response) => {
    const { items, total } = req.body;

    try {
      const orderRepository = AppDataSource.getRepository(Order);
      const newOrder = orderRepository.create({
        user: { id: req.userId },
        items,
        total,
      });
      await orderRepository.save(newOrder);

      res
        .status(201)
        .json({ message: "Order created successfully", order: newOrder });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  };

  static getOrdersByUser = async (req: Request, res: Response) => {
    try {
      const orderRepository = AppDataSource.getRepository(Order);
      const orders = await orderRepository.find({
        where: { user: { id: req.userId } },
      });

      res.status(200).json({ orders });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  };
}
