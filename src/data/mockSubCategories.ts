import { SubCategory } from '@/types/SubCategory';
import { mockCategories } from '@/data/mockCategories';

export const mockSubCategories: SubCategory[] = [
  // GUNDAM SubCategories
  {
    id: 'hg',
    subCategoryName: 'High Grade (HG)',
    subCategoryImg: '/images/banners/HG.webp',
    description: 'Mô hình Gundam tỷ lệ 1/144, dễ lắp ráp, phù hợp người mới',
    mainCategory: mockCategories.find(cat => cat.id === 'gundam')!
  },
  {
    id: 'mg',
    subCategoryName: 'Master Grade (MG)',
    subCategoryImg: '/images/banners/MG.webp',
    description: 'Mô hình Gundam tỷ lệ 1/100, chi tiết cao, có khung bên trong',
    mainCategory: mockCategories.find(cat => cat.id === 'gundam')!
  },
  {
    id: 'rg',
    subCategoryName: 'Real Grade (RG)',
    subCategoryImg: '/images/banners/RG.webp',
    description: 'Mô hình Gundam tỷ lệ 1/144, chi tiết siêu cao như Master Grade',
    mainCategory: mockCategories.find(cat => cat.id === 'gundam')!
  },
  {
    id: 'pg',
    subCategoryName: 'Perfect Grade (PG)',
    subCategoryImg: '/images/banners/PG.webp',
    description: 'Mô hình Gundam tỷ lệ 1/60, cao cấp nhất, có đèn LED',
    mainCategory: mockCategories.find(cat => cat.id === 'gundam')!
  },

  // THẺ BÀI SubCategories
  {
    id: 'pokemon',
    subCategoryName: 'Pokémon TCG',
    subCategoryImg: '/images/subcategories/pokemon-cards.png',
    description: 'Thẻ bài Pokemon Trading Card Game, các set mới nhất',
    mainCategory: mockCategories.find(cat => cat.id === 'cards')!
  },
  {
    id: 'yugioh',
    subCategoryName: 'Yu-Gi-Oh!',
    subCategoryImg: '/images/subcategories/yugioh-cards.png',
    description: 'Thẻ bài Yu-Gi-Oh! chính hãng, các booster pack mới',
    mainCategory: mockCategories.find(cat => cat.id === 'cards')!
  },
  {
    id: 'onepiece',
    subCategoryName: 'One Piece Card Game',
    subCategoryImg: '/images/subcategories/onepiece-cards.png',
    description: 'Thẻ bài One Piece Card Game từ Bandai',
    mainCategory: mockCategories.find(cat => cat.id === 'cards')!
  },
  {
    id: 'dragonball',
    subCategoryName: 'Dragon Ball Super',
    subCategoryImg: '/images/subcategories/dragonball-cards.png',
    description: 'Thẻ bài Dragon Ball Super Card Game',
    mainCategory: mockCategories.find(cat => cat.id === 'cards')!
  },
  {
    id: 'naruto',
    subCategoryName: 'Naruto Card Game',
    subCategoryImg: '/images/subcategories/naruto-cards.png',
    description: 'Thẻ bài Naruto Collectible Card Game',
    mainCategory: mockCategories.find(cat => cat.id === 'cards')!
  },

  // FIGURE SubCategories
  {
    id: 'demon-slayer',
    subCategoryName: 'Demon Slayer',
    subCategoryImg: '/images/subcategories/demon-slayer-figure.png',
    description: 'Figure nhân vật từ anime Kimetsu no Yaiba',
    mainCategory: mockCategories.find(cat => cat.id === 'figure')!
  },
  {
    id: 'attack-on-titan',
    subCategoryName: 'Attack on Titan',
    subCategoryImg: '/images/subcategories/aot-figure.png',
    description: 'Figure nhân vật từ anime Shingeki no Kyojin',
    mainCategory: mockCategories.find(cat => cat.id === 'figure')!
  },
  {
    id: 'jujutsu-kaisen',
    subCategoryName: 'Jujutsu Kaisen',
    subCategoryImg: '/images/subcategories/jujutsu-figure.png',
    description: 'Figure nhân vật từ anime Jujutsu Kaisen',
    mainCategory: mockCategories.find(cat => cat.id === 'figure')!
  },
  {
    id: 'one-piece-figure',
    subCategoryName: 'One Piece',
    subCategoryImg: '/images/subcategories/onepiece-figure.png',
    description: 'Figure nhân vật từ anime One Piece',
    mainCategory: mockCategories.find(cat => cat.id === 'figure')!
  },
  {
    id: 'genshin-impact',
    subCategoryName: 'Genshin Impact',
    subCategoryImg: '/images/subcategories/genshin-figure.png',
    description: 'Figure nhân vật từ game Genshin Impact',
    mainCategory: mockCategories.find(cat => cat.id === 'figure')!
  },

  // KHÁC SubCategories
  {
    id: 'lego-anime',
    subCategoryName: 'LEGO Anime',
    subCategoryImg: '/images/subcategories/lego-anime.png',
    description: 'Bộ LEGO với theme anime, custom builds',
    mainCategory: mockCategories.find(cat => cat.id === 'other')!
  },
  {
    id: 'anime-keyboard',
    subCategoryName: 'Bàn phím Anime',
    subCategoryImg: '/images/subcategories/anime-keyboard.png',
    description: 'Bàn phím cơ custom với theme anime, keycap đặc biệt',
    mainCategory: mockCategories.find(cat => cat.id === 'other')!
  },
  {
    id: 'anime-mouse',
    subCategoryName: 'Chuột Anime',
    subCategoryImg: '/images/subcategories/anime-mouse.png',
    description: 'Chuột gaming với design anime, RGB lighting',
    mainCategory: mockCategories.find(cat => cat.id === 'other')!
  },
  {
    id: 'anime-accessories',
    subCategoryName: 'Phụ kiện Anime',
    subCategoryImg: '/images/subcategories/anime-accessories.png',
    description: 'Móc khóa, sticker, badge, poster anime',
    mainCategory: mockCategories.find(cat => cat.id === 'other')!
  },
  {
    id: 'custom-models',
    subCategoryName: 'Mô hình Custom',
    subCategoryImg: '/images/subcategories/custom-models.png',
    description: 'Mô hình custom, resin kit, garage kit',
    mainCategory: mockCategories.find(cat => cat.id === 'other')! 
  }
];