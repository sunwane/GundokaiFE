import { Product } from '@/types/Product';
import { mockSubCategories } from './mockSubCategories';

export const mockProducts: Product[] = [
  // ✅ RG (Real Grade) Products
  {
    id: "PRD001",
    productName: "RG 1/144 RX-78-2 Gundam",
    price: 650000,
    stockQuantity: 25,
    createdAt: "2024-01-15T10:30:00Z",
    description: "Mô hình Gundam RG tỷ lệ 1/144 với chi tiết tinh xảo và khớp cử động linh hoạt",
    thumbnail: "https://ninoma.com/cdn/shop/products/411yPeObPJL.jpg?v=1634721328",
    status: "Còn hàng",
    subcategory: mockSubCategories.find(sub => sub.id === "rg")!
  },
  {
    id: "PRD009",
    productName: "RG 1/144 Nu Gundam",
    price: 750000,
    stockQuantity: 15,
    createdAt: "2024-02-25T12:00:00Z",
    description: "Real Grade Nu Gundam với fin funnels effect parts",
    thumbnail: "https://m.media-amazon.com/images/I/71wYVk0NCTL._AC_SL1500_.jpg",
    status: "Còn hàng",
    subcategory: mockSubCategories.find(sub => sub.id === "rg")!
  },
  {
    id: "PRD011",
    productName: "RG 1/144 Strike Freedom Gundam",
    price: 720000,
    stockQuantity: 18,
    createdAt: "2024-03-05T09:15:00Z",
    description: "Real Grade Strike Freedom với wings of light và full burst mode",
    thumbnail: "https://www.hobbyco.com.au/cdn/shop/files/G5061617_grande.jpg?v=1720135375",
    status: "Còn hàng",
    subcategory: mockSubCategories.find(sub => sub.id === "rg")!
  },
  {
    id: "PRD012",
    productName: "RG 1/144 Sazabi",
    price: 850000,
    stockQuantity: 12,
    createdAt: "2024-03-10T14:20:00Z",
    description: "Real Grade Sazabi với funnel effects và detailed cockpit",
    thumbnail: "https://m.media-amazon.com/images/I/71bP+SvokVL._AC_SL1500_.jpg",
    status: "Còn hàng",
    subcategory: mockSubCategories.find(sub => sub.id === "rg")!
  },
  {
    id: "PRD013",
    productName: "RG 1/144 Unicorn Gundam",
    price: 780000,
    stockQuantity: 0,
    createdAt: "2024-03-15T11:45:00Z",
    description: "Real Grade Unicorn với transformation gimmick và psycho frame",
    thumbnail: "https://product.hstatic.net/200000326537/product/10470771a_69247f675b314ead87d6f5122f14ea84_grande.jpg",
    status: "Hết hàng",
    subcategory: mockSubCategories.find(sub => sub.id === "rg")!
  },
  {
    id: "PRD014",
    productName: "RG 1/144 Wing Gundam Zero EW",
    price: 680000,
    stockQuantity: 22,
    createdAt: "2024-03-20T16:30:00Z",
    description: "Real Grade Wing Zero Endless Waltz với angel wings",
    thumbnail: "https://bizweb.dktcdn.net/thumb/grande/100/479/026/products/af9637d1-9600-4b70-ab07-d2f7e878d1fb.jpg?v=1679035537963",
    status: "Hàng sắp về",
    subcategory: mockSubCategories.find(sub => sub.id === "rg")!
  },

  // ✅ MG (Master Grade) Products
  {
    id: "PRD002",
    productName: "MG 1/100 Strike Freedom Gundam",
    price: 1200000,
    stockQuantity: 12,
    createdAt: "2024-01-20T14:15:00Z",
    description: "Master Grade Strike Freedom với wings of light effect và full armor",
    thumbnail: "https://product.hstatic.net/200000326537/product/10896999a_f18ecd16c3d341319b81414c76e23c0c_grande.jpg",
    status: "Còn hàng",
    subcategory: mockSubCategories.find(sub => sub.id === "mg")!
  },
  {
    id: "PRD015",
    productName: "MG 1/100 Nu Gundam Ver.Ka",
    price: 1350000,
    stockQuantity: 8,
    createdAt: "2024-03-25T10:00:00Z",
    description: "Master Grade Nu Gundam phiên bản Katoki với fin funnels",
    thumbnail: "https://product.hstatic.net/200000326537/product/mg-rx-93-nu-gundam-ver-ka-01_6d373af6eb7b444691ba2c78a93c2790_master.jpg",
    status: "Còn hàng",
    subcategory: mockSubCategories.find(sub => sub.id === "mg")!
  },
  {
    id: "PRD016",
    productName: "MG 1/100 Barbatos Lupus Rex",
    price: 1150000,
    stockQuantity: 15,
    createdAt: "2024-04-01T13:45:00Z",
    description: "Master Grade Barbatos Lupus Rex với full inner frame",
    thumbnail: "https://bizweb.dktcdn.net/thumb/grande/100/479/026/products/vn-11134207-7ras8-m4n0av5lv5wgfd-1736068090042.jpg?v=1736068096253",
    status: "Còn hàng",
    subcategory: mockSubCategories.find(sub => sub.id === "mg")!
  },
  {
    id: "PRD017",
    productName: "MG 1/100 Sazabi Ver.Ka",
    price: 1480000,
    stockQuantity: 6,
    createdAt: "2024-04-05T15:20:00Z",
    description: "Master Grade Sazabi Katoki version với LED unit compatible",
    thumbnail: "https://product.hstatic.net/200000326537/product/mg-sazabi_ver_ka_5cbb84798b8148fe905d02c969be4625_master.jpg",
    status: "Hàng sắp về",
    subcategory: mockSubCategories.find(sub => sub.id === "mg")!
  },
  {
    id: "PRD018",
    productName: "MG 1/100 RX-78-2 Gundam 3.0",
    price: 980000,
    stockQuantity: 20,
    createdAt: "2024-04-10T09:30:00Z",
    description: "Master Grade RX-78-2 phiên bản 3.0 với core fighter",
    thumbnail: "https://product.hstatic.net/200000326537/product/image_1607b2e0-99fe-480d-8fee-fe1b6ad27e2b_900x_83e67070cb9141af954b6a93561ef1c1_master.jpg",
    status: "Còn hàng",
    subcategory: mockSubCategories.find(sub => sub.id === "mg")!
  },
  {
    id: "PRD019",
    productName: "MG 1/100 Freedom Gundam 2.0",
    price: 1080000,
    stockQuantity: 0,
    createdAt: "2024-04-15T12:15:00Z",
    description: "Master Grade Freedom 2.0 với improved articulation",
    thumbnail: "https://product.hstatic.net/200000326537/product/10371551a8_f8bced0872904c2eb9af31623cf6a39a_master.jpg",
    status: "Hết hàng",
    subcategory: mockSubCategories.find(sub => sub.id === "mg")!
  },

  // ✅ HG (High Grade) Products
  {
    id: "PRD003",
    productName: "Action Base 1/144 Clear",
    price: 180000,
    stockQuantity: 50,
    createdAt: "2024-01-25T09:45:00Z",
    description: "Đế action base trong suốt cho mô hình tỷ lệ 1/144",
    thumbnail: "/images/products/action-base-clear.jpg",
    status: "Còn hàng",
    subcategory: mockSubCategories.find(sub => sub.id === "hg")!
  },
  {
    id: "PRD006",
    subcategory: mockSubCategories.find(sub => sub.id === "hg")!,
    productName: "HG 1/144 Barbatos Lupus Rex",
    price: 480000,
    stockQuantity: 18,
    createdAt: "2024-02-10T13:30:00Z",
    description: "High Grade Barbatos Lupus Rex từ series Iron-Blooded Orphans",
    thumbnail: "/images/products/hg-barbatos-lupus.jpg",
    status: "Hàng sắp về"
  },
  {
    id: "PRD020",
    subcategory: mockSubCategories.find(sub => sub.id === "hg")!,
    productName: "HG 1/144 RX-78-2 Gundam",
    price: 320000,
    stockQuantity: 35,
    createdAt: "2024-04-20T11:00:00Z",
    description: "High Grade RX-78-2 Gundam classic với beam rifle",
    thumbnail: "/images/products/hg-rx78-2.jpg",
    status: "Còn hàng"
  },
  {
    id: "PRD021",
    subcategory: mockSubCategories.find(sub => sub.id === "hg")!,
    productName: "HG 1/144 Strike Freedom Gundam",
    price: 420000,
    stockQuantity: 28,
    createdAt: "2024-04-25T14:30:00Z",
    description: "High Grade Strike Freedom với dragoon wings",
    thumbnail: "/images/products/hg-strike-freedom.jpg",
    status: "Còn hàng"
  },
  {
    id: "PRD022",
    subcategory: mockSubCategories.find(sub => sub.id === "hg")!,
    productName: "HG 1/144 Unicorn Gundam",
    price: 380000,
    stockQuantity: 25,
    createdAt: "2024-05-01T10:15:00Z",
    description: "High Grade Unicorn với destroy mode transformation",
    thumbnail: "/images/products/hg-unicorn.jpg",
    status: "Còn hàng"
  },
  {
    id: "PRD023",
    subcategory: mockSubCategories.find(sub => sub.id === "hg")!,
    productName: "HG 1/144 Wing Gundam Zero",
    price: 360000,
    stockQuantity: 0,
    createdAt: "2024-05-05T16:45:00Z",
    description: "High Grade Wing Zero với twin buster rifle",
    thumbnail: "/images/products/hg-wing-zero.jpg",
    status: "Hết hàng"
  },
  {
    id: "PRD024",
    subcategory: mockSubCategories.find(sub => sub.id === "hg")!,
    productName: "HG 1/144 Deathscythe Hell EW",
    price: 390000,
    stockQuantity: 30,
    createdAt: "2024-05-10T13:20:00Z",
    description: "High Grade Deathscythe Hell Endless Waltz với active cloak",
    thumbnail: "/images/products/hg-deathscythe.jpg",
    status: "Hàng sắp về"
  },

  // ✅ PG (Perfect Grade) Products
  {
    id: "PRD004",
    subcategory: mockSubCategories.find(sub => sub.id === "pg")!,
    productName: "PG 1/60 Unicorn Gundam",
    price: 3500000,
    stockQuantity: 0,
    createdAt: "2024-02-01T16:20:00Z",
    description: "Perfect Grade Unicorn với LED kit và transformation mechanism",
    thumbnail: "/images/products/pg-unicorn.jpg",
    status: "Hết hàng"
  },
  {
    id: "PRD025",
    subcategory: mockSubCategories.find(sub => sub.id === "pg")!,
    productName: "PG 1/60 RX-78-2 Gundam",
    price: 2800000,
    stockQuantity: 3,
    createdAt: "2024-05-15T09:00:00Z",
    description: "Perfect Grade RX-78-2 với full LED lighting system",
    thumbnail: "/images/products/pg-rx78-2.jpg",
    status: "Còn hàng"
  },
  {
    id: "PRD026",
    subcategory: mockSubCategories.find(sub => sub.id === "pg")!,
    productName: "PG 1/60 Strike Freedom Gundam",
    price: 4200000,
    stockQuantity: 2,
    createdAt: "2024-05-20T11:30:00Z",
    description: "Perfect Grade Strike Freedom với wings of light LED",
    thumbnail: "/images/products/pg-strike-freedom.jpg",
    status: "Còn hàng"
  },
  {
    id: "PRD027",
    subcategory: mockSubCategories.find(sub => sub.id === "pg")!,
    productName: "PG 1/60 Wing Gundam Zero Custom",
    price: 3800000,
    stockQuantity: 1,
    createdAt: "2024-05-25T15:45:00Z",
    description: "Perfect Grade Wing Zero Custom với LED angel wings",
    thumbnail: "/images/products/pg-wing-zero.jpg",
    status: "Hàng sắp về"
  },

  // ✅ Non-Gundam Products (giữ nguyên)
  {
    id: "PRD005",
    subcategory: mockSubCategories.find(sub => sub.id === "pokemon")!,
    productName: "Pokemon Booster Pack - Paldea Evolved",
    price: 120000,
    stockQuantity: 35,
    createdAt: "2024-02-05T11:10:00Z",
    description: "Booster pack Pokemon mới nhất từ series Paldea Evolved",
    thumbnail: "/images/products/pokemon-booster.jpg", 
    status: "Còn hàng"
  },
  {
    id: "PRD007",
    subcategory: mockSubCategories.find(sub => sub.id === "demon-slayer")!,
    productName: "Tanjiro Kamado Figure - Nendoroid",
    price: 890000,
    stockQuantity: 8,
    createdAt: "2024-02-15T15:45:00Z",
    description: "Figure Nendoroid Tanjiro Kamado từ anime Demon Slayer",
    thumbnail: "/images/products/tanjiro-nendoroid.jpg",
    status: "Còn hàng"
  },
  {
    id: "PRD008",
    subcategory: mockSubCategories.find(sub => sub.id === "yugioh")!,
    productName: "Yu-Gi-Oh! Structure Deck",
    price: 250000,
    stockQuantity: 22,
    createdAt: "2024-02-20T10:15:00Z",
    description: "Structure Deck Yu-Gi-Oh! mới nhất với các lá bài mạnh",
    thumbnail: "/images/products/yugioh-structure.jpg",
    status: "Hàng sắp về"
  },
  {
    id: "PRD010",
    subcategory: mockSubCategories.find(sub => sub.id === "anime-accessories")!,
    productName: "Anime Keychain Set",
    price: 150000,
    stockQuantity: 30,
    createdAt: "2024-03-01T14:30:00Z",
    description: "Bộ móc khóa anime với nhiều nhân vật nổi tiếng",
    thumbnail: "/images/products/anime-keychain.jpg",
    status: "Còn hàng"
  }
];