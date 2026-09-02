import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import ShopByCategory from "@/components/home/ShopByCategory";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import PromoBanner from "@/components/home/PromoBanner";
import NewArrivals from "@/components/home/NewArrivals";
import RoomShowcase from "@/components/home/RoomShowcase";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import InstagramGallery from "@/components/home/InstagramGallery";
import BlogPreview from "@/components/home/BlogPreview";
import Newsletter from "@/components/home/Newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ShopByCategory />
      <FeaturedProducts />
      <PromoBanner />
      <NewArrivals />
      <RoomShowcase />
      <WhyChooseUs />
      <Testimonials />
      <InstagramGallery />
      <BlogPreview />
      <Newsletter />
    </>
  );
}
