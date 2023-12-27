const userRouter = require("./user.router");
const categoryRouter = require("./category.router");

const errorHandle = require("../middlewares/errorHandle");

module.exports = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/category", categoryRouter);

  app.use(errorHandle);
};
