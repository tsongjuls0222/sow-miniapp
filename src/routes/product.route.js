const { AddProductController, GetAllProductController, GetProductController, UpdateProductController, DeleteProductController } = require("../controllers/product.controller");
const { addProductSchema, updateProductSchema, getProductSchema, getAllProductSchema } = require("../schemas/product.schema");
const validate = require("../middlewares/validate");
const {authGuard} = require("../middlewares/guard");

async function productRoutes(app) {
  app.post(
    "/add",
    {
      preValidation: [validate(addProductSchema, "body")],
      preHandler: [authGuard(true)]
    },
    AddProductController
  );

  app.get(
    "/list",
    {
      preValidation: [validate(getAllProductSchema, "query")],
      preHandler: [authGuard(true)]
    },
    GetAllProductController
  );

  app.get(
    "/:productId",
    {
      preValidation: [validate(getProductSchema, "params")],
      preHandler: [authGuard(true)]
    },
    GetProductController
  );

  app.patch(
    "/:productId",
    {
      preValidation: [
        validate(getProductSchema, "params"),
        validate(updateProductSchema, "body")
      ],
      preHandler: [authGuard(true)]
    },
    UpdateProductController
  );

  app.delete(
    "/:productId",
    {
      preValidation: [validate(getProductSchema, "params")],
      preHandler: [authGuard(true)]
    },
    DeleteProductController
  );
}

module.exports = productRoutes;