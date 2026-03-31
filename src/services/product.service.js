const { AddProduct, findProductByNo, findAllProduct, findProductById, UpdateProduct, DeleteProduct } = require("../repositories/product.repository");

async function AddProductService(req) {
  try {
    const _body = req.body;
    const article_no = await findProductByNo(req.server, _body.article_no);
    if(article_no) {
      return {
        code: 0,
        message: "Product found."
      };
    }

    const product = await AddProduct(req.server, _body);
    if(!product) {
      return {
        code: 0,
        message: "Add Product failed."
      };
    }

    return {
      code: 1,
      data: product
    };

  } catch (error) {
    const message =
      error instanceof Error
        ? `${error.message} "AddProductService Unknown error"`
        : "AddProductService Unknown error";

    return {
      code: 0,
      message
    };
  }
}

async function GetAllProductService(req) {
  try {
    const _body = req.query;
    const product = await findAllProduct(req.server, _body);
    if(!product) {
      return {
        code: 0,
        message: "No products found."
      };
    }

    return {
      code: 1,
      data: product
    };

  } catch (error) {
    const message =
      error instanceof Error
        ? `${error.message} "GetAllProductService Unknown error"`
        : "GetAllProductService Unknown error";

    return {
      code: 0,
      message
    };
  }
}

async function GetProductService(req) {
  try {
    const _body = req.params;
    const product = await findProductById(req.server, _body.productId);
    if(!product) {
      return {
        code: 0,
        message: "No product found."
      };
    }

    return {
      code: 1,
      data: product
    };

  } catch (error) {
    const message =
      error instanceof Error
        ? `${error.message} "GetProductService Unknown error"`
        : "GetProductService Unknown error";

    return {
      code: 0,
      message
    };
  }
}

async function UpdateProductService(req) {
  try {
    const _body2 = req.body;
    const _body = {
      ..._body2,
      id: req.params.productId
    };

    const product = await UpdateProduct(req.server, _body.id, _body);
    if(!product) {
      return {
        code: 0,
        message: "Update Product failed Or Article No Exist."
      };
    }

    return {
      code: 1,
      data: product
    };

  } catch (error) {
    const message =
      error instanceof Error
        ? `${error.message} "UpdateProductService Unknown error"`
        : "UpdateProductService Unknown error";

    return {
      code: 0,
      message
    };
  }
}

async function DeleteProductService(req) {
  try {
    const _body = req.params;
    const product = await DeleteProduct(req.server, _body.productId);
    console.log(product)
    if(!product) {
      return {
        code: 0,
        message: "Delete Product failed."
      };
    }

    return {
      code: 1,
      data: product
    };

  } catch (error) {
    const message =
      error instanceof Error
        ? `${error.message} "DeleteProductService Unknown error"`
        : "DeleteProductService Unknown error";

    return {
      code: 0,
      message
    };
  }
}


module.exports = { 
  AddProductService,
  GetAllProductService,
  GetProductService,
  UpdateProductService,
  DeleteProductService
};