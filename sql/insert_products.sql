-- 插入产品数据
USE cake_selling_system;

-- 清空现有产品数据（可选）
-- TRUNCATE TABLE products;

-- 插入蛋糕产品
INSERT INTO products (name, category, price, description, image_url, is_featured, stock_quantity) VALUES
('经典草莓蛋糕', 'birthday', 168.00, '新鲜草莓配上香浓奶油，经典美味', '🍓', TRUE, 50),
('巧克力慕斯蛋糕', 'birthday', 188.00, '浓郁巧克力慕斯，入口即化', '🍫', TRUE, 45),
('芒果千层蛋糕', 'special', 198.00, '层层薄饼夹着新鲜芒果和奶油', '🥭', TRUE, 30),
('抹茶红豆蛋糕', 'special', 178.00, '日式抹茶配上香甜红豆', '🍵', FALSE, 40),
('提拉米苏', 'special', 158.00, '意式经典甜品，咖啡与奶酪的完美结合', '☕', TRUE, 35),
('彩虹纸杯蛋糕', 'cupcake', 88.00, '6个装彩虹纸杯蛋糕，色彩缤纷', '🧁', FALSE, 100),
('香草纸杯蛋糕', 'cupcake', 68.00, '6个装经典香草纸杯蛋糕', '🧁', FALSE, 120),
('巧克力纸杯蛋糕', 'cupcake', 78.00, '6个装浓郁巧克力纸杯蛋糕', '🧁', FALSE, 110),
('三层婚礼蛋糕', 'wedding', 1888.00, '精致三层婚礼蛋糕，可定制装饰', '💒', FALSE, 10),
('浪漫玫瑰婚礼蛋糕', 'wedding', 2288.00, '装饰精美玫瑰花的豪华婚礼蛋糕', '🌹', FALSE, 8),
('卡通生日蛋糕', 'birthday', 228.00, '可爱卡通造型，孩子们的最爱', '🎂', FALSE, 25),
('水果拼盘蛋糕', 'birthday', 208.00, '多种新鲜水果装饰，健康美味', '🍇', FALSE, 30),
('黑森林蛋糕', 'birthday', 198.00, '德式经典，巧克力与樱桃的完美搭配', '🍒', TRUE, 40),
('榴莲千层蛋糕', 'special', 218.00, '浓郁榴莲果肉，榴莲爱好者必选', '🍈', FALSE, 20),
('奶酪蛋糕', 'special', 168.00, '轻盈细腻的奶酪口感', '🧀', FALSE, 35);

-- 验证插入
SELECT COUNT(*) as total_products FROM products;
SELECT category, COUNT(*) as count FROM products GROUP BY category;
