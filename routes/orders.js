import express from "express";
import {
  getOrderById,
  getOrderByQuery,
  getOrders,
  createOrder,
} from "../controllers/orderController.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await getOrderByQuery(req.query);

    return res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const result = await getOrderById(orderId);

    return res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const result = await createOrder(req.body);

    return res.json(result);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    //
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

router.patch("/:id/status", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

export default router;
