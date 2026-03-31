async function AddProduct(app, data) {
  try {
    const query = `
      INSERT INTO app.t_products (
        article_no,
        name,
        in_price,
        price,
        unit,
        stock,
        description,
        created_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
      RETURNING *
    `;

    const values = [
      data.article_no,
      data.name,
      data.in_price,
      data.price,
      data.unit || null,
      data.stock ?? 0,
      data.description || null
    ];

    const { rows } = await app.db.query(query, values);

    return rows[0] ?? null;
  } catch (error) {
    console.log(error);
    app.log.error({ error }, "AddProduct failed");
    return null;
  }
}

async function findProductByNo(app, article_no) {
  try {
    const query = `select article_no FROM app.t_products where article_no = $1 LIMIT 1`;

    const { rows } = await app.db.query(query, [article_no]);
    return rows[0] ?? null;
  } catch (error) {
    console.log(error)
    app.log.error({ error }, "findProductByNo failed");
    return null;
  }
}

async function findAllProduct(app, data) {
  try {
    let query = `SELECT * FROM app.t_products WHERE id > 0`;
    const values = [];
    let index = 1;

    if (data.article_no) {
      query += ` AND article_no = $${index++}`;
      values.push(data.article_no);
    }

    if (data.name) {
      query += ` AND name ILIKE $${index++}`; // better for search
      values.push(`%${data.name}%`);
    }

    const { rows } = await app.db.query(query, values);
    return rows ?? [];
  } catch (error) {
    console.log(error);
    app.log.error({ error }, "findAllProduct failed");
    return null;
  }
}

async function findProductById(app, id) {
  try {
    const query = `select * FROM app.t_products where id = $1 LIMIT 1`;

    const { rows } = await app.db.query(query, [id]);
    return rows[0] ?? null;
  } catch (error) {
    console.log(error)
    app.log.error({ error }, "findProductById failed");
    return null;
  }
}

async function UpdateProduct(app, id, data) {
  try {
    if (data.article_no) {
      const checkQuery = `
        SELECT id
        FROM app.t_products
        WHERE article_no = $1
          AND id <> $2
        LIMIT 1
      `;

      const checkValues = [data.article_no, id];
      const checkResult = await app.db.query(checkQuery, checkValues);

      if (checkResult.rows.length > 0) {
        return null;
      }
    }

    const query = `
      UPDATE app.t_products
      SET
        article_no = $1,
        name = $2,
        in_price = $3,
        price = $4,
        unit = $5,
        stock = $6,
        description = $7,
        updated_at = NOW()
      WHERE id = $8
      RETURNING *
    `;

    const values = [
      data.article_no,
      data.name,
      data.in_price,
      data.price,
      data.unit || null,
      data.stock ?? 0,
      data.description || null,
      id
    ];

    const { rows } = await app.db.query(query, values);

    return rows[0] ?? null;
  } catch (error) {
    console.log(error);
    app.log.error({ error }, "UpdateProduct failed");
    return null;
  }
}

async function DeleteProduct(app, id) {
  try {
    const query = `
      DELETE FROM app.t_products
      WHERE id = $1
      RETURNING *
    `;

    const { rows } = await app.db.query(query, [id]);
    return rows[0] ?? null;
  } catch (error) {
    console.log(error);
    app.log.error({ error }, "DeleteProduct failed");
    return null;
  }
}

module.exports = {
  DeleteProduct
};

module.exports = {
  AddProduct,
  findProductByNo,
  findAllProduct,
  findProductById,
  UpdateProduct,
  DeleteProduct
};