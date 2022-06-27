\c product_db;

SET CLIENT_ENCODING TO 'utf8';

BEGIN;

INSERT INTO
    categories (name, icon)
VALUES
    ('Electronics', '💻'),
    ('Toys', '🎲'),
    ('Household', '🏠');

INSERT INTO
    products (
        name,
        description,
        price,
        quantity,
        category_id,
        product_date
    )
SELECT
    CONCAT('Product #', p_id),
    CONCAT('Description for Product #', p_id),
    random_between(1, 9000) * RANDOM(),
    random_between(1, 100),
    random_between(1, 3),
    NOW() - ('1 month' :: INTERVAL * random_between(1, 100))
FROM
    generate_series(1, 100) AS p_id;

WITH get_ids AS (
    SELECT
        random_between(1, 10) AS p_id,
        r_id
    FROM
        generate_series(1, 100) AS r_id
)
INSERT INTO
    reviews (
        title,
        review_text,
        rating,
        product_id,
        helpful_votes,
        review_date
    )
SELECT
    CONCAT('Review #', r_id),
    CONCAT('Detailed review of Product #', p_id),
    random_between(1, 5),
    p_id,
    random_between(0, 100),
    NOW() - ('1 month' :: INTERVAL * random_between(1, 100))
FROM
    get_ids;

COMMIT;