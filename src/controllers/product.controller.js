const { AddProductService, GetAllProductService, GetProductService, UpdateProductService, DeleteProductService } = require("../services/product.service");

async function AddProductController(req, response) {
  try {
    const product_service = await AddProductService(req);
    if(!product_service || product_service.code !== 1) {
      return response.code(400).send({
        code: 0,
        message: product_service?.message ?? "Add Product Failed"
      });
    }

    return response.code(200).send({
      code: 1,
      data: product_service.data,
      message: "Add Product Success"
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "AddProductController Unknown error";

    return response.code(500).send({
      code: 0,
      message
    });
  }
}

async function GetProductController(req, response) {
  try {
    const product_service = await GetProductService(req);
    if(!product_service || product_service.code !== 1) {
      return response.code(400).send({
        code: 0,
        message: product_service?.message ?? "Get Product Failed"
      });
    }

    return response.code(200).send({
      code: 1,
      data: product_service.data,
      message: "Get Product Success"
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "GetProductController Unknown error";

    return response.code(500).send({
      code: 0,
      message
    });
  }
}

async function GetAllProductController(req, response) {
  try {
    const product_service = await GetAllProductService(req);
    if(!product_service || product_service.code !== 1) {
      return response.code(400).send({
        code: 0,
        message: product_service?.message ?? "Get All Products Failed"
      });
    }

    return response.code(200).send({
      code: 1,
      data: product_service.data,
      message: "Get All Products Success"
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "GetAllProductService Unknown error";

    return response.code(500).send({
      code: 0,
      message
    });
  }
}

async function UpdateProductController(req, response) {
  try {
    const product_service = await UpdateProductService(req);
    if(!product_service || product_service.code !== 1) {
      return response.code(400).send({
        code: 0,
        message: product_service?.message ?? "Update Product Failed"
      });
    }

    return response.code(200).send({
      code: 1,
      data: product_service.data,
      message: "Update Product Success"
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "UpdateProductController Unknown error";

    return response.code(500).send({
      code: 0,
      message
    });
  }
}

async function DeleteProductController(req, response) {
  try {
    const product_service = await DeleteProductService(req);
    if(!product_service || product_service.code !== 1) {
      return response.code(400).send({
        code: 0,
        message: product_service?.message ?? "Delete Product Failed"
      });
    }

    return response.code(200).send({
      code: 1,
      data: product_service.data,
      message: "Delete Product Success"
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "DeleteProductController Unknown error";

    return response.code(500).send({
      code: 0,
      message
    });
  }
}

module.exports = {
  AddProductController,
  GetProductController,
  GetAllProductController,
  UpdateProductController,
  DeleteProductController
};