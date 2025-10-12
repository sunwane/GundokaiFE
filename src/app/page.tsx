'use client';
export const dynamic = "force-dynamic";

import PageHeader from "@/component/layout/header/PageHeader";
import BannerList from "@/component/features/home/BannerList";
import ProductCategoryIntro from "@/component/features/home/ProductCategoryIntro";
import GundamModelShowcase from "@/component/features/home/GundamModelShowcase";
import ProductShowcase from "@/component/features/home/ProductShowcase";
import Footer from "@/component/layout/footer/Footer";
import { useResponsive } from "@/hooks/useResponsive";
import { banners, categories, gundamModels } from "@/data/homeData";

export default function Home() {
  const { isMobile } = useResponsive({ mobile: 400 });

  return (
    <div style={styles.wrapper}>
      <PageHeader />
      <BannerList banners={banners} isMobile={isMobile} />
      <ProductCategoryIntro categories={categories} isMobile={isMobile}/>
      <GundamModelShowcase models={gundamModels} isMobile={isMobile} />
      <ProductShowcase isMobile={isMobile} />
      <Footer />
    </div>
  );
}

const styles = {
  wrapper: {
    backgroundColor: "#fff",
  },
};