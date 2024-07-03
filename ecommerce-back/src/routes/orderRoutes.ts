import { Router } from "express";
import { OrderController } from "../controllers/OrderController";
import { auth } from "../middleware/authMiddleware";

const router = Router();

router.post("/", auth, OrderController.createOrder);
router.get("/", auth, OrderController.getOrdersByUser);

export default router;
