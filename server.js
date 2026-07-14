import express from "express";
import ordersRouter from "./routes/orders.js";
import { middlewareLogger } from "./middleware/log.js";
// import env from "dotenv";

// env.config();
function checkToGo() {
  console.log("num 1");
}
const PORT = 3000; // process.env.PORT;

const app = express();

app.use(express.json());

// logger
app.use(middlewareLogger);

app.use("/orders", ordersRouter);

// app.get("/orders", checkToGo, ordersRouter);

// app.get("orders/:id", ordersRouter);

// app.put("/orders", ordersRouter);

// app.delete("/orders", ordersRouter);

// app.patch("/orders", ordersRouter);

// Error hanler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ success: false, message: err.message });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${process.env.PORT}...`);
});
