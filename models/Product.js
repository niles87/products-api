const db = require('../config/connection');

class Product {
  getAll({ sort }) {
    let orderBy = 'ORDER BY ';

    switch(sort) {
      case 'date':
        orderBy += 'product_date DESC';
        break;
      case 'price':
        orderBy += 'price';
        break;
      case 'rating':
        orderBy += 'rating DESC';
        break;
      default:
        orderBy += 'id';
        break;
    }

    const query = `SELECT products.*,
      COALESCE(AVG(reviews.rating), 0)::NUMERIC(2,1) AS rating 
      FROM products
      LEFT JOIN reviews ON products.id = reviews.product_id
      GROUP BY (products.id) ${orderBy}`;

    return db.query(query);
  }

  getOne({ id }) {
    const query = `SELECT products.*, 
      COALESCE(AVG(reviews.rating), 0)::NUMERIC(2,1) AS rating 
      FROM products
      LEFT JOIN reviews ON products.id = reviews.product_id
      WHERE products.id = $1
      GROUP BY (products.id)`;

    return db.query(query, [ id ]);
  }

  create({ name, description, price, stock }) {
    return db.query(
      `INSERT INTO products (name, description, price, stock) 
      VALUES ($1, $2, $3, $4) RETURNING *, 0 AS rating`, 
      [ name, description, price, stock ]
    );
  }

  update({ name, description, price, stock, id }) {
    return db.query(
      `UPDATE products SET name = $1, description = $2, price = $3,
      stock = $4 WHERE id = $5`, 
      [ name, description, price, stock, id ]
    );
  }

  delete({ id }) {
    return db.query('DELETE FROM products WHERE id = $1', [ id ]);
  }
}

module.exports = new Product();
