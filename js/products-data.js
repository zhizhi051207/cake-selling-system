// 产品数据
const products = [
    {
        id: 1,
        name: "经典草莓蛋糕",
        category: "birthday",
        price: 168,
        description: "新鲜草莓配上香浓奶油，经典美味",
        image: "🍓",
        featured: true
    },
    {
        id: 2,
        name: "巧克力慕斯蛋糕",
        category: "birthday",
        price: 188,
        description: "浓郁巧克力慕斯，入口即化",
        image: "🍫",
        featured: true
    },
    {
        id: 3,
        name: "芒果千层蛋糕",
        category: "special",
        price: 198,
        description: "层层薄饼夹着新鲜芒果和奶油",
        image: "🥭",
        featured: true
    },
    {
        id: 4,
        name: "抹茶红豆蛋糕",
        category: "special",
        price: 178,
        description: "日式抹茶配上香甜红豆",
        image: "🍵",
        featured: false
    },
    {
        id: 5,
        name: "提拉米苏",
        category: "special",
        price: 158,
        description: "意式经典甜品，咖啡与奶酪的完美结合",
        image: "☕",
        featured: true
    },
    {
        id: 6,
        name: "彩虹纸杯蛋糕",
        category: "cupcake",
        price: 88,
        description: "6个装彩虹纸杯蛋糕，色彩缤纷",
        image: "🧁",
        featured: false
    },
    {
        id: 7,
        name: "香草纸杯蛋糕",
        category: "cupcake",
        price: 68,
        description: "6个装经典香草纸杯蛋糕",
        image: "🧁",
        featured: false
    },
    {
        id: 8,
        name: "巧克力纸杯蛋糕",
        category: "cupcake",
        price: 78,
        description: "6个装浓郁巧克力纸杯蛋糕",
        image: "🧁",
        featured: false
    },
    {
        id: 9,
        name: "三层婚礼蛋糕",
        category: "wedding",
        price: 1888,
        description: "精致三层婚礼蛋糕，可定制装饰",
        image: "💒",
        featured: false
    },
    {
        id: 10,
        name: "浪漫玫瑰婚礼蛋糕",
        category: "wedding",
        price: 2288,
        description: "装饰精美玫瑰花的豪华婚礼蛋糕",
        image: "🌹",
        featured: false
    },
    {
        id: 11,
        name: "卡通生日蛋糕",
        category: "birthday",
        price: 228,
        description: "可爱卡通造型，孩子们的最爱",
        image: "🎂",
        featured: false
    },
    {
        id: 12,
        name: "水果拼盘蛋糕",
        category: "birthday",
        price: 208,
        description: "多种新鲜水果装饰，健康美味",
        image: "🍇",
        featured: false
    },
    {
        id: 13,
        name: "黑森林蛋糕",
        category: "birthday",
        price: 198,
        description: "德式经典，巧克力与樱桃的完美搭配",
        image: "🍒",
        featured: true
    },
    {
        id: 14,
        name: "榴莲千层蛋糕",
        category: "special",
        price: 218,
        description: "浓郁榴莲果肉，榴莲爱好者必选",
        image: "🍈",
        featured: false
    },
    {
        id: 15,
        name: "奶酪蛋糕",
        category: "special",
        price: 168,
        description: "轻盈细腻的奶酪口感",
        image: "🧀",
        featured: false
    }
];

// 获取所有产品
function getAllProducts() {
    return products;
}

// 根据分类获取产品
function getProductsByCategory(category) {
    if (category === 'all') {
        return products;
    }
    return products.filter(product => product.category === category);
}

// 获取特色产品
function getFeaturedProducts() {
    return products.filter(product => product.featured);
}

// 根据ID获取产品
function getProductById(id) {
    return products.find(product => product.id === id);
}
