import { Product } from '@/types/Product';

export const mockProducts: Product[] = [
  // ✅ RG (Real Grade) Products
  {
    id: "PRD001",
    subCategory_id: "rg",
    product_Name: "RG 1/144 RX-78-2 Gundam",
    price: 650000,
    stock_quantity: 25,
    created_at: "2024-01-15T10:30:00Z",
    description: "Mô hình Gundam RG tỷ lệ 1/144 với chi tiết tinh xảo và khớp cử động linh hoạt",
    thumbnail: "https://ninoma.com/cdn/shop/products/411yPeObPJL.jpg?v=1634721328",
    status: "Còn hàng"
  },
  {
    id: "PRD009",
    subCategory_id: "rg",
    product_Name: "RG 1/144 Nu Gundam",
    price: 750000,
    stock_quantity: 15,
    created_at: "2024-02-25T12:00:00Z",
    description: "Real Grade Nu Gundam với fin funnels effect parts",
    thumbnail: "https://m.media-amazon.com/images/I/71wYVk0NCTL._AC_SL1500_.jpg",
    status: "Còn hàng"
  },
  {
    id: "PRD011",
    subCategory_id: "rg",
    product_Name: "RG 1/144 Strike Freedom Gundam",
    price: 720000,
    stock_quantity: 18,
    created_at: "2024-03-05T09:15:00Z",
    description: "Real Grade Strike Freedom với wings of light và full burst mode",
    thumbnail: "https://www.hobbyco.com.au/cdn/shop/files/G5061617_grande.jpg?v=1720135375",
    status: "Còn hàng"
  },
  {
    id: "PRD012",
    subCategory_id: "rg",
    product_Name: "RG 1/144 Sazabi",
    price: 850000,
    stock_quantity: 12,
    created_at: "2024-03-10T14:20:00Z",
    description: "Real Grade Sazabi với funnel effects và detailed cockpit",
    thumbnail: "https://m.media-amazon.com/images/I/71bP+SvokVL._AC_SL1500_.jpg",
    status: "Còn hàng"
  },
  {
    id: "PRD013",
    subCategory_id: "rg",
    product_Name: "RG 1/144 Unicorn Gundam",
    price: 780000,
    stock_quantity: 0,
    created_at: "2024-03-15T11:45:00Z",
    description: "Real Grade Unicorn với transformation gimmick và psycho frame",
    thumbnail: "https://product.hstatic.net/200000326537/product/10470771a_69247f675b314ead87d6f5122f14ea84_grande.jpg",
    status: "Hết hàng"
  },
  {
    id: "PRD014",
    subCategory_id: "rg",
    product_Name: "RG 1/144 Wing Gundam Zero EW",
    price: 680000,
    stock_quantity: 22,
    created_at: "2024-03-20T16:30:00Z",
    description: "Real Grade Wing Zero Endless Waltz với angel wings",
    thumbnail: "https://bizweb.dktcdn.net/thumb/grande/100/479/026/products/af9637d1-9600-4b70-ab07-d2f7e878d1fb.jpg?v=1679035537963",
    status: "Hàng sắp về"
  },

  // ✅ MG (Master Grade) Products
  {
    id: "PRD002",
    subCategory_id: "mg",
    product_Name: "MG 1/100 Strike Freedom Gundam",
    price: 1200000,
    stock_quantity: 12,
    created_at: "2024-01-20T14:15:00Z",
    description: "Master Grade Strike Freedom với wings of light effect và full armor",
    thumbnail: "/images/products/mg-strike-freedom.jpg",
    status: "Còn hàng"
  },
  {
    id: "PRD015",
    subCategory_id: "mg",
    product_Name: "MG 1/100 Nu Gundam Ver.Ka",
    price: 1350000,
    stock_quantity: 8,
    created_at: "2024-03-25T10:00:00Z",
    description: "Master Grade Nu Gundam phiên bản Katoki với fin funnels",
    thumbnail: "/images/products/mg-nu-verka.jpg",
    status: "Còn hàng"
  },
  {
    id: "PRD016",
    subCategory_id: "mg",
    product_Name: "MG 1/100 Barbatos Lupus Rex",
    price: 1150000,
    stock_quantity: 15,
    created_at: "2024-04-01T13:45:00Z",
    description: "Master Grade Barbatos Lupus Rex với full inner frame",
    thumbnail: "/images/products/mg-barbatos-lupus.jpg",
    status: "Còn hàng"
  },
  {
    id: "PRD017",
    subCategory_id: "mg",
    product_Name: "MG 1/100 Sazabi Ver.Ka",
    price: 1480000,
    stock_quantity: 6,
    created_at: "2024-04-05T15:20:00Z",
    description: "Master Grade Sazabi Katoki version với LED unit compatible",
    thumbnail: "/images/products/mg-sazabi-verka.jpg",
    status: "Hàng sắp về"
  },
  {
    id: "PRD018",
    subCategory_id: "mg",
    product_Name: "MG 1/100 RX-78-2 Gundam 3.0",
    price: 980000,
    stock_quantity: 20,
    created_at: "2024-04-10T09:30:00Z",
    description: "Master Grade RX-78-2 phiên bản 3.0 với core fighter",
    thumbnail: "/images/products/mg-rx78-3.jpg",
    status: "Còn hàng"
  },
  {
    id: "PRD019",
    subCategory_id: "mg",
    product_Name: "MG 1/100 Freedom Gundam 2.0",
    price: 1080000,
    stock_quantity: 0,
    created_at: "2024-04-15T12:15:00Z",
    description: "Master Grade Freedom 2.0 với improved articulation",
    thumbnail: "/images/products/mg-freedom-2.jpg",
    status: "Hết hàng"
  },

  // ✅ HG (High Grade) Products
  {
    id: "PRD003",
    subCategory_id: "hg",
    product_Name: "Action Base 1/144 Clear",
    price: 180000,
    stock_quantity: 50,
    created_at: "2024-01-25T09:45:00Z",
    description: "Đế action base trong suốt cho mô hình tỷ lệ 1/144",
    thumbnail: "/images/products/action-base-clear.jpg",
    status: "Còn hàng"
  },
  {
    id: "PRD006",
    subCategory_id: "hg",
    product_Name: "HG 1/144 Barbatos Lupus Rex",
    price: 480000,
    stock_quantity: 18,
    created_at: "2024-02-10T13:30:00Z",
    description: "High Grade Barbatos Lupus Rex từ series Iron-Blooded Orphans",
    thumbnail: "/images/products/hg-barbatos-lupus.jpg",
    status: "Hàng sắp về"
  },
  {
    id: "PRD020",
    subCategory_id: "hg",
    product_Name: "HG 1/144 RX-78-2 Gundam",
    price: 320000,
    stock_quantity: 35,
    created_at: "2024-04-20T11:00:00Z",
    description: "High Grade RX-78-2 Gundam classic với beam rifle",
    thumbnail: "/images/products/hg-rx78-2.jpg",
    status: "Còn hàng"
  },
  {
    id: "PRD021",
    subCategory_id: "hg",
    product_Name: "HG 1/144 Strike Freedom Gundam",
    price: 420000,
    stock_quantity: 28,
    created_at: "2024-04-25T14:30:00Z",
    description: "High Grade Strike Freedom với dragoon wings",
    thumbnail: "/images/products/hg-strike-freedom.jpg",
    status: "Còn hàng"
  },
  {
    id: "PRD022",
    subCategory_id: "hg",
    product_Name: "HG 1/144 Unicorn Gundam",
    price: 380000,
    stock_quantity: 25,
    created_at: "2024-05-01T10:15:00Z",
    description: "High Grade Unicorn với destroy mode transformation",
    thumbnail: "/images/products/hg-unicorn.jpg",
    status: "Còn hàng"
  },
  {
    id: "PRD023",
    subCategory_id: "hg",
    product_Name: "HG 1/144 Wing Gundam Zero",
    price: 360000,
    stock_quantity: 0,
    created_at: "2024-05-05T16:45:00Z",
    description: "High Grade Wing Zero với twin buster rifle",
    thumbnail: "/images/products/hg-wing-zero.jpg",
    status: "Hết hàng"
  },
  {
    id: "PRD024",
    subCategory_id: "hg",
    product_Name: "HG 1/144 Deathscythe Hell EW",
    price: 390000,
    stock_quantity: 30,
    created_at: "2024-05-10T13:20:00Z",
    description: "High Grade Deathscythe Hell Endless Waltz với active cloak",
    thumbnail: "/images/products/hg-deathscythe.jpg",
    status: "Hàng sắp về"
  },

  // ✅ PG (Perfect Grade) Products
  {
    id: "PRD004",
    subCategory_id: "pg",
    product_Name: "PG 1/60 Unicorn Gundam",
    price: 3500000,
    stock_quantity: 0,
    created_at: "2024-02-01T16:20:00Z",
    description: "Perfect Grade Unicorn với LED kit và transformation mechanism",
    thumbnail: "/images/products/pg-unicorn.jpg",
    status: "Hết hàng"
  },
  {
    id: "PRD025",
    subCategory_id: "pg",
    product_Name: "PG 1/60 RX-78-2 Gundam",
    price: 2800000,
    stock_quantity: 3,
    created_at: "2024-05-15T09:00:00Z",
    description: "Perfect Grade RX-78-2 với full LED lighting system",
    thumbnail: "/images/products/pg-rx78-2.jpg",
    status: "Còn hàng"
  },
  {
    id: "PRD026",
    subCategory_id: "pg",
    product_Name: "PG 1/60 Strike Freedom Gundam",
    price: 4200000,
    stock_quantity: 2,
    created_at: "2024-05-20T11:30:00Z",
    description: "Perfect Grade Strike Freedom với wings of light LED",
    thumbnail: "/images/products/pg-strike-freedom.jpg",
    status: "Còn hàng"
  },
  {
    id: "PRD027",
    subCategory_id: "pg",
    product_Name: "PG 1/60 Wing Gundam Zero Custom",
    price: 3800000,
    stock_quantity: 1,
    created_at: "2024-05-25T15:45:00Z",
    description: "Perfect Grade Wing Zero Custom với LED angel wings",
    thumbnail: "/images/products/pg-wing-zero.jpg",
    status: "Hàng sắp về"
  },

  // ✅ Non-Gundam Products (giữ nguyên)
  {
    id: "PRD005",
    subCategory_id: "pokemon",
    product_Name: "Pokemon Booster Pack - Paldea Evolved",
    price: 120000,
    stock_quantity: 35,
    created_at: "2024-02-05T11:10:00Z",
    description: "Booster pack Pokemon mới nhất từ series Paldea Evolved",
    thumbnail: "/images/products/pokemon-booster.jpg", 
    status: "Còn hàng"
  },
  {
    id: "PRD007",
    subCategory_id: "demon-slayer",
    product_Name: "Tanjiro Kamado Figure - Nendoroid",
    price: 890000,
    stock_quantity: 8,
    created_at: "2024-02-15T15:45:00Z",
    description: "Figure Nendoroid Tanjiro Kamado từ anime Demon Slayer",
    thumbnail: "/images/products/tanjiro-nendoroid.jpg",
    status: "Còn hàng"
  },
  {
    id: "PRD008",
    subCategory_id: "yugioh",
    product_Name: "Yu-Gi-Oh! Structure Deck",
    price: 250000,
    stock_quantity: 22,
    created_at: "2024-02-20T10:15:00Z",
    description: "Structure Deck Yu-Gi-Oh! mới nhất với các lá bài mạnh",
    thumbnail: "/images/products/yugioh-structure.jpg",
    status: "Hàng sắp về"
  },
  {
    id: "PRD010",
    subCategory_id: "anime-accessories",
    product_Name: "Anime Keychain Set",
    price: 150000,
    stock_quantity: 30,
    created_at: "2024-03-01T14:30:00Z",
    description: "Bộ móc khóa anime với nhiều nhân vật nổi tiếng",
    thumbnail: "/images/products/anime-keychain.jpg",
    status: "Còn hàng"
  }
];