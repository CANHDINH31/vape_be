const userRouter = require("./user.router");
const categoryRouter = require("./category.router");
const productRouter = require("./product.router");

const errorHandle = require("../middlewares/errorHandle");

module.exports = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/category", categoryRouter);
  app.use("/api/product", productRouter);

  app.use(errorHandle);
};
