import { SubCategory } from '@/types/SubCategory';
import { mockCategories } from '@/data/mockCategories';

export const mockSubCategories: SubCategory[] = [
  // GUNDAM SubCategories
  {
    id: '07658fa7-85e5-491f-a8a5-75b5b0d25e04',
    subCategoryName: 'High Grande (HG)',
    subCategoryImg: 'http://res.cloudinary.com/do833qd1e/image/upload/v1755572579/gundokai/f50d18c1-db0c-4d41-b1d2-f66965a8ff95.webp',
    description: 'Mô hình Gundam tỷ lệ 1/144, dễ lắp ráp, phù hợp người mới',
    mainCategory: mockCategories.find(cat => cat.categoryName === 'GUNDAM')!
  },
  {
    id: 'cd1e12db-de03-42de-b64a-2a6aef8d36f6',
    subCategoryName: 'Real Grade (RG)',
    subCategoryImg: 'http://res.cloudinary.com/do833qd1e/image/upload/v1755572789/gundokai/2cbc9c03-a39f-4a6b-ab6d-cd207461fc16.webp',
    description: 'Mô hình Gundam tỷ lệ 1/144, chi tiết siêu cao như Master Grade',
    mainCategory: mockCategories.find(cat => cat.categoryName === 'GUNDAM')!
  },
  {
    id: '404cd129-81f3-476f-a046-af12d3e5f66c',
    subCategoryName: 'Master Grande (MG)',
    subCategoryImg: 'http://res.cloudinary.com/do833qd1e/image/upload/v1755572659/gundokai/db550321-2400-42e9-89be-ff6b316f2ca6.webp',
    description: 'Mô hình GunDam tỷ lệ 1/100, chi tiết cao, có khung bên trong',
    mainCategory: mockCategories.find(cat => cat.categoryName === 'GUNDAM')!
  },
  {
    id: 'b6ca9989-c4bd-4038-8eff-d801e760d5fb',
    subCategoryName: 'Perfect Grade (PG)',
    subCategoryImg: 'http://res.cloudinary.com/do833qd1e/image/upload/v1755572856/gundokai/e9023e75-cc6a-4a7a-a6c4-d2c28f63acd4.webp',
    description: 'Mô hình GunDam tỷ lệ 1/60, cao cấp nhất, có đèn LED',
    mainCategory: mockCategories.find(cat => cat.categoryName === 'GUNDAM')!
  },
  {
    id: '1bbff0a6-6d0b-4ac2-915b-2140c48a2bc1',
    subCategoryName: 'Super Deformed (SD)',
    subCategoryImg: 'http://res.cloudinary.com/do833qd1e/image/upload/v1755943680/gundokai/6902b6d7-fa6d-46ee-aa00-776fd97e7c42.jpg',
    description: 'SD Gundam (Super Deformed Gundam) là dòng Gundam phong cách chibi với đầu to, thân nhỏ, dễ thương. Mô hình nhỏ gọn, ít chi tiết, dễ lắp ráp, giá rẻ, phù hợp cho người mới và người thích sưu tầm.',
    mainCategory: mockCategories.find(cat => cat.categoryName === 'GUNDAM')!
  },
  

  // THẺ BÀI SubCategories
  {
    id: '61684719-ad29-41d1-ab6d-9539fe81e81f',
    subCategoryName: 'Pokémon TCG',
    subCategoryImg: 'http://res.cloudinary.com/do833qd1e/image/upload/v1755573669/gundokai/2d8cf5d4-9346-4870-9868-2679f81b93d2.jpg',
    description: 'Thẻ bài Pokemon Trading Card Game, các set mới nhất',
    mainCategory: mockCategories.find(cat => cat.categoryName === 'THẺ BÀI')!
  },
  {
    id: 'yugioh',
    subCategoryName: 'Yu-Gi-Oh!',
    subCategoryImg: '/images/subcategories/yugioh-cards.png',
    description: 'Thẻ bài Yu-Gi-Oh! chính hãng, các booster pack mới',
    mainCategory: mockCategories.find(cat => cat.categoryName === 'cards')!
  },
  {
    id: '9390ab9c-cbfd-4a52-81ec-00a8e2b6ec16',
    subCategoryName: 'One Piece Card Game',
    subCategoryImg: 'http://res.cloudinary.com/do833qd1e/image/upload/v1755573730/gundokai/248878cf-2562-4df3-9163-9817123787f7.jpg',
    description: 'Thẻ bài One Piece Card Game từ Bandai',
    mainCategory: mockCategories.find(cat => cat.categoryName === 'THẺ BÀI')!
  },

  // FIGURE SubCategories
  {
    id: 'demon-slayer',
    subCategoryName: 'Demon Slayer',
    subCategoryImg: '/images/subcategories/demon-slayer-figure.png',
    description: 'Figure nhân vật từ anime Kimetsu no Yaiba',
    mainCategory: mockCategories.find(cat => cat.categoryName === 'FIGURE')!
  },
  {
    id: 'attack-on-titan',
    subCategoryName: 'Attack on Titan',
    subCategoryImg: '/images/subcategories/aot-figure.png',
    description: 'Figure nhân vật từ anime Shingeki no Kyojin',
    mainCategory: mockCategories.find(cat => cat.categoryName === 'FIGURE')!
  },
  {
    id: 'jujutsu-kaisen',
    subCategoryName: 'Jujutsu Kaisen',
    subCategoryImg: '/images/subcategories/jujutsu-figure.png',
    description: 'Figure nhân vật từ anime Jujutsu Kaisen',
    mainCategory: mockCategories.find(cat => cat.categoryName === 'FIGURE')!
  },
  {
    id: 'one-piece-figure',
    subCategoryName: 'One Piece',
    subCategoryImg: '/images/subcategories/onepiece-figure.png',
    description: 'Figure nhân vật từ anime One Piece',
    mainCategory: mockCategories.find(cat => cat.categoryName === 'FIGURE')!
  },
  {
    id: 'genshin-impact',
    subCategoryName: 'Genshin Impact',
    subCategoryImg: '/images/subcategories/genshin-figure.png',
    description: 'Figure nhân vật từ game Genshin Impact',
    mainCategory: mockCategories.find(cat => cat.categoryName === 'FIGURE')!
  },
  {
    id: 'eb7e9b95-194c-4252-93b7-ec8f4f907906',
    subCategoryName: 'Dragon Ball Super',
    subCategoryImg: 'http://res.cloudinary.com/do833qd1e/image/upload/v1755573799/gundokai/99ad25c4-d08b-4e85-ba2e-7099e28e1e24.jpg',
    description: 'Mô hình cho Dragon Ball',
    mainCategory: mockCategories.find(cat => cat.categoryName === 'FIGURE')!
  },

  // KHÁC SubCategories
  {
    id: 'lego-anime',
    subCategoryName: 'LEGO Anime',
    subCategoryImg: '/images/subcategories/lego-anime.png',
    description: 'Bộ LEGO với theme anime, custom builds',
    mainCategory: mockCategories.find(cat => cat.categoryName === 'KHÁC')!
  },
  {
    id: 'anime-keyboard',
    subCategoryName: 'Bàn phím Anime',
    subCategoryImg: '/images/subcategories/anime-keyboard.png',
    description: 'Bàn phím cơ custom với theme anime, keycap đặc biệt',
    mainCategory: mockCategories.find(cat => cat.categoryName === 'KHÁC')!
  },
  {
    id: 'anime-mouse',
    subCategoryName: 'Chuột Anime',
    subCategoryImg: '/images/subcategories/anime-mouse.png',
    description: 'Chuột gaming với design anime, RGB lighting',
    mainCategory: mockCategories.find(cat => cat.categoryName === 'KHÁC')!
  },
  {
    id: 'anime-accessories',
    subCategoryName: 'Phụ kiện Anime',
    subCategoryImg: '/images/subcategories/anime-accessories.png',
    description: 'Móc khóa, sticker, badge, poster anime',
    mainCategory: mockCategories.find(cat => cat.categoryName === 'KHÁC')!
  },
  {
    id: 'custom-models',
    subCategoryName: 'Mô hình Custom',
    subCategoryImg: '/images/subcategories/custom-models.png',
    description: 'Mô hình custom, resin kit, garage kit',
    mainCategory: mockCategories.find(cat => cat.categoryName === 'KHÁC')! 
  }
];