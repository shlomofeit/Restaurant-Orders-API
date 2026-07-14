import { readFile, writeToFile } from "../database/data.js";
import { custom, success, z } from "zod";

const ORDERS = "./database/orders.json";

export async function getOrders() {
  try {
    const data = await readFile(ORDERS);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getOrderById(orderId) {
  try {
    const allOrders = await getOrders();
    const order = allOrders.find((o) => o.id === +orderId);
    if (!order) {
      const error = new Error("order not found");
      error.status = 404;
      throw error;
    }
    return order;
  } catch (error) {
    throw error;
  }
}

export async function getOrderByQuery(queryOrder) {
  try {
    const allOrders = await getOrders();
    const { status = "all", customer = "all", table = "all" } = queryOrder;
    const querys = { status, customer, table };

    const cleanFilter = Object.fromEntries(
      Object.entries(querys).filter(([key, value]) => value !== "all"),
    );

    const filteredQuerys = allOrders.filter((order) => {
      return Object.entries(cleanFilter).every(([key, value]) => {
        return order[key] == value;
      });
    });

    if (filteredQuerys.length === 0) {
      const error = new Error("order not found");
      error.status = 404;
      throw error;
    }
    return filteredQuerys;
  } catch (error) {
    throw error;
  }
}

export async function createOrder(obj) {
  try {
    const orderSchema = z.object({
      //   status: z.enum(["NEW", "PREPARING", "READY", "DELIVERED", "CANCELLED"]),
      table: z.number(),
      customer: z.string(),
    });

    const orderDetails = orderSchema.safeParse(obj);

    if (!orderDetails.success) {
      const error = new Error(
        `Missing required fields: ${orderDetails.error.message}`,
      );
      error.status = 400;
      throw error;
    }

    const allOrders = await getOrders();
    const order = {
      id: Math.max(0, ...allOrders.map((o) => o.id)) + 1,
      status: "NEW",
      customer: obj.customer,
      table: obj.table,
    };
    allOrders.push(order);
    await writeToFile(ORDERS, allOrders);
    return { success: true };
  } catch (error) {
    throw error;
  }
}
