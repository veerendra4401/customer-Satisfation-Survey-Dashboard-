-- Clear existing data
DELETE FROM survey_responses;
DELETE FROM products;
DELETE FROM surveys;

-- Insert products
INSERT INTO products (id, name, category, description, active, created_date, last_modified) VALUES
(1, 'Smartphone X', 'Electronics', 'Latest smartphone with advanced features', 1, NOW(), NOW()),
(2, 'Laptop Pro', 'Electronics', 'Professional laptop with high performance', 1, NOW(), NOW()),
(3, 'Smart Watch', 'Electronics', 'Fitness and health tracking smartwatch', 1, NOW(), NOW()),
(4, 'Coffee Maker', 'Home Appliances', 'Automatic coffee maker with multiple brewing options', 1, NOW(), NOW()),
(5, 'Wireless Headphones', 'Audio', 'Noise cancelling wireless headphones', 1, NOW(), NOW());

-- Insert surveys
INSERT INTO surveys (id, name, category, description, active, question_count, created_date, last_modified) VALUES
(1, 'Product Satisfaction Survey', 'Electronics', 'Survey to measure customer satisfaction with electronics products', 1, 5, NOW(), NOW()),
(2, 'Feature Feedback Survey', 'Electronics', 'Survey to collect feedback on product features', 1, 6, NOW(), NOW()),
(3, 'User Experience Survey', 'General', 'Survey to evaluate user experience across all products', 1, 4, NOW(), NOW());

-- Insert survey responses for Product 1
INSERT INTO survey_responses (name, email, survey_id, product_id, satisfaction, usability, performance, value_for_money, recommendations, comments, submission_date) VALUES
('John Doe', 'john@example.com', 1, 1, 4, 5, 4, 3, 4, 'Great product, a bit pricey though', NOW() - INTERVAL 2 DAY),
('Jane Smith', 'jane@example.com', 1, 1, 5, 5, 5, 4, 5, 'Excellent smartphone, would recommend!', NOW() - INTERVAL 5 DAY),
('Michael Brown', 'michael@example.com', 1, 1, 3, 4, 3, 2, 3, 'Average product, expected more features', NOW() - INTERVAL 10 DAY);

-- Insert survey responses for Product 2
INSERT INTO survey_responses (name, email, survey_id, product_id, satisfaction, usability, performance, value_for_money, recommendations, comments, submission_date) VALUES
('Emily Johnson', 'emily@example.com', 1, 2, 5, 4, 5, 4, 5, 'Best laptop I have ever owned', NOW() - INTERVAL 3 DAY),
('Robert Wilson', 'robert@example.com', 1, 2, 4, 4, 5, 3, 4, 'Great performance, but battery life could be better', NOW() - INTERVAL 7 DAY);

-- Insert survey responses for Product 3
INSERT INTO survey_responses (name, email, survey_id, product_id, satisfaction, usability, performance, value_for_money, recommendations, comments, submission_date) VALUES
('Sarah Davis', 'sarah@example.com', 1, 3, 4, 5, 3, 4, 4, 'Love the fitness tracking features', NOW() - INTERVAL 4 DAY),
('David Miller', 'david@example.com', 1, 3, 3, 4, 3, 3, 3, 'Good but needs more battery life', NOW() - INTERVAL 6 DAY);

-- Insert survey responses for Product 4
INSERT INTO survey_responses (name, email, survey_id, product_id, satisfaction, usability, performance, value_for_money, recommendations, comments, submission_date) VALUES
('Susan Wilson', 'susan@example.com', 2, 4, 5, 5, 4, 5, 5, 'Makes perfect coffee every time', NOW() - INTERVAL 8 DAY),
('James Thompson', 'james@example.com', 2, 4, 4, 4, 4, 4, 4, 'Very good appliance, easy to clean', NOW() - INTERVAL 12 DAY);

-- Insert survey responses for Product 5
INSERT INTO survey_responses (name, email, survey_id, product_id, satisfaction, usability, performance, value_for_money, recommendations, comments, submission_date) VALUES
('Jennifer Adams', 'jennifer@example.com', 3, 5, 5, 5, 5, 4, 5, 'Incredible sound quality and noise cancellation', NOW() - INTERVAL 1 DAY),
('Thomas Anderson', 'thomas@example.com', 3, 5, 4, 4, 5, 3, 4, 'Great headphones but a bit expensive', NOW() - INTERVAL 15 DAY); 