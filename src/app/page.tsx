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
import React, { Suspense } from "react";

function HomeContent() {
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

export default function Home() {
  return (
    <Suspense fallback={
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#fff"
      }}>
        <div>Đang tải...</div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}

const styles = {
  wrapper: {
    backgroundColor: "#fff",
  },
};