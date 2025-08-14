import { SubCategory } from '@/types/SubCategory';

export const mockSubCategories: SubCategory[] = [
  // GUNDAM SubCategories
  {
    id: 'hg',
    category_id: 'gundam',
    subCategory_Name: 'High Grade (HG)',
    subCategory_img: '/images/banners/HG.webp',
    description: 'Mô hình Gundam tỷ lệ 1/144, dễ lắp ráp, phù hợp người mới'
  },
  {
    id: 'mg',
    category_id: 'gundam',
    subCategory_Name: 'Master Grade (MG)',
    subCategory_img: '/images/banners/MG.webp',
    description: 'Mô hình Gundam tỷ lệ 1/100, chi tiết cao, có khung bên trong'
  },
  {
    id: 'rg',
    category_id: 'gundam',
    subCategory_Name: 'Real Grade (RG)',
    subCategory_img: '/images/banners/RG.webp',
    description: 'Mô hình Gundam tỷ lệ 1/144, chi tiết siêu cao như Master Grade'
  },
  {
    id: 'pg',
    category_id: 'gundam',
    subCategory_Name: 'Perfect Grade (PG)',
    subCategory_img: '/images/subcategories/pg-gundam.png',
    description: 'Mô hình Gundam tỷ lệ 1/60, cao cấp nhất, có đèn LED'
  },

  // THẺ BÀI SubCategories
  {
    id: 'pokemon',
    category_id: 'cards',
    subCategory_Name: 'Pokémon TCG',
    subCategory_img: '/images/subcategories/pokemon-cards.png',
    description: 'Thẻ bài Pokemon Trading Card Game, các set mới nhất'
  },
  {
    id: 'yugioh',
    category_id: 'cards',
    subCategory_Name: 'Yu-Gi-Oh!',
    subCategory_img: '/images/subcategories/yugioh-cards.png',
    description: 'Thẻ bài Yu-Gi-Oh! chính hãng, các booster pack mới'
  },
  {
    id: 'onepiece',
    category_id: 'cards',
    subCategory_Name: 'One Piece Card Game',
    subCategory_img: '/images/subcategories/onepiece-cards.png',
    description: 'Thẻ bài One Piece Card Game từ Bandai'
  },
  {
    id: 'dragonball',
    category_id: 'cards',
    subCategory_Name: 'Dragon Ball Super',
    subCategory_img: '/images/subcategories/dragonball-cards.png',
    description: 'Thẻ bài Dragon Ball Super Card Game'
  },
  {
    id: 'naruto',
    category_id: 'cards',
    subCategory_Name: 'Naruto Card Game',
    subCategory_img: '/images/subcategories/naruto-cards.png',
    description: 'Thẻ bài Naruto Collectible Card Game'
  },

  // FIGURE SubCategories
  {
    id: 'demon-slayer',
    category_id: 'figure',
    subCategory_Name: 'Demon Slayer',
    subCategory_img: '/images/subcategories/demon-slayer-figure.png',
    description: 'Figure nhân vật từ anime Kimetsu no Yaiba'
  },
  {
    id: 'attack-on-titan',
    category_id: 'figure',
    subCategory_Name: 'Attack on Titan',
    subCategory_img: '/images/subcategories/aot-figure.png',
    description: 'Figure nhân vật từ anime Shingeki no Kyojin'
  },
  {
    id: 'jujutsu-kaisen',
    category_id: 'figure',
    subCategory_Name: 'Jujutsu Kaisen',
    subCategory_img: '/images/subcategories/jujutsu-figure.png',
    description: 'Figure nhân vật từ anime Jujutsu Kaisen'
  },
  {
    id: 'one-piece-figure',
    category_id: 'figure',
    subCategory_Name: 'One Piece',
    subCategory_img: '/images/subcategories/onepiece-figure.png',
    description: 'Figure nhân vật từ anime One Piece'
  },
  {
    id: 'genshin-impact',
    category_id: 'figure',
    subCategory_Name: 'Genshin Impact',
    subCategory_img: '/images/subcategories/genshin-figure.png',
    description: 'Figure nhân vật từ game Genshin Impact'
  },

  // KHÁC SubCategories
  {
    id: 'lego-anime',
    category_id: 'other',
    subCategory_Name: 'LEGO Anime',
    subCategory_img: '/images/subcategories/lego-anime.png',
    description: 'Bộ LEGO với theme anime, custom builds'
  },
  {
    id: 'anime-keyboard',
    category_id: 'other',
    subCategory_Name: 'Bàn phím Anime',
    subCategory_img: '/images/subcategories/anime-keyboard.png',
    description: 'Bàn phím cơ custom với theme anime, keycap đặc biệt'
  },
  {
    id: 'anime-mouse',
    category_id: 'other',
    subCategory_Name: 'Chuột Anime',
    subCategory_img: '/images/subcategories/anime-mouse.png',
    description: 'Chuột gaming với design anime, RGB lighting'
  },
  {
    id: 'anime-accessories',
    category_id: 'other',
    subCategory_Name: 'Phụ kiện Anime',
    subCategory_img: '/images/subcategories/anime-accessories.png',
    description: 'Móc khóa, sticker, badge, poster anime'
  },
  {
    id: 'custom-models',
    category_id: 'other',
    subCategory_Name: 'Mô hình Custom',
    subCategory_img: '/images/subcategories/custom-models.png',
    description: 'Mô hình custom, resin kit, garage kit'
  }
];