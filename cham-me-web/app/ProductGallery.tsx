"use client";
import Image from "next/image";
import { useState, useRef } from "react";

export default function ProductGallery({ products }: { products: any[] }) {
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const closeDrawer = () => setSelectedProduct(null);

  const handleScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth } = carouselRef.current;
    const itemWidth = scrollWidth / products.length;
    const newIndex = Math.round(scrollLeft / itemWidth);
    setActiveIndex(newIndex);
  };

  const scrollToProduct = (index: number) => {
    if (!carouselRef.current) return;
    const itemWidth = carouselRef.current.scrollWidth / products.length;
    carouselRef.current.scrollTo({
      left: index * itemWidth,
      behavior: "smooth",
    });
    setActiveIndex(index);
  };

  const scrollPrev = () => {
    if (!carouselRef.current) return;
    const itemWidth = carouselRef.current.scrollWidth / products.length;
    carouselRef.current.scrollBy({ left: -itemWidth, behavior: "smooth" });
  };

  const scrollNext = () => {
    if (!carouselRef.current) return;
    const itemWidth = carouselRef.current.scrollWidth / products.length;
    carouselRef.current.scrollBy({ left: itemWidth, behavior: "smooth" });
  };

  return (
    <>
      <div className="relative group">
        <button 
          onClick={scrollPrev} 
          className="hidden md:flex absolute -left-6 top-1/3 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.08)] items-center justify-center text-zinc-400 hover:text-black hover:scale-110 transition-all opacity-0 group-hover:opacity-100"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button 
          onClick={scrollNext} 
          className="hidden md:flex absolute -right-6 top-1/3 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.08)] items-center justify-center text-zinc-400 hover:text-black hover:scale-110 transition-all opacity-0 group-hover:opacity-100"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div 
          ref={carouselRef}
          onScroll={handleScroll}
          className="flex gap-6 md:gap-12 overflow-x-auto snap-x snap-mandatory pb-4 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {products.map((product) => (
            <div key={product.id} className="group/item flex flex-col flex-none w-[85%] md:w-[35%] lg:w-[30%] snap-start">
              <div 
                className="cursor-pointer" 
                onClick={() => setSelectedProduct(product)}
              >
                <div className="relative aspect-[4/5] bg-[#f9f9f9] overflow-hidden mb-8 transition-all duration-700">
                  <Image 
                    src={product.image_url} 
                    alt={product.name} 
                    fill 
                    unoptimized
                    className="object-contain p-10 transform group-hover/item:scale-105 transition-transform duration-700" 
                  />
                </div>
                <h3 className="text-lg font-semibold uppercase tracking-tight mb-2 group-hover/item:text-amber-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-zinc-500 text-sm mb-6 leading-relaxed line-clamp-2 font-light">
                  {product.tagline}
                </p>
                <div className="text-sm font-medium mb-8">
                  {new Intl.NumberFormat("vi-VN").format(product.price)} ₫
                </div>
              </div>

              <div className="mt-auto grid grid-cols-2 gap-2">
                <a href={product.shopee_link} target="_blank" className="py-3 text-[10px] font-bold uppercase tracking-widest bg-[#ee4d2d] text-white hover:bg-[#d73211] transition-all text-center">
                  Shopee
                </a>
                <a href={product.tiktok_link} target="_blank" className="py-3 text-[10px] font-bold uppercase tracking-widest bg-zinc-900 text-white hover:bg-black transition-all text-center">
                  TikTok
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center gap-3 mt-12 mb-8">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToProduct(index)}
              className={`transition-all duration-500 rounded-full ${
                activeIndex === index 
                  ? "w-8 h-1.5 bg-zinc-900" 
                  : "w-1.5 h-1.5 bg-zinc-300 hover:bg-zinc-400"
              }`}
              aria-label={`Xem sản phẩm ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {selectedProduct && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 transition-opacity backdrop-blur-sm" 
          onClick={closeDrawer} 
        />
      )}

      <div className={`fixed inset-y-0 right-0 z-50 w-full md:w-[480px] bg-white shadow-2xl transform transition-transform duration-500 ease-in-out ${selectedProduct ? "translate-x-0" : "translate-x-full"} overflow-y-auto`}>
        {selectedProduct && (
          <div className="p-8 md:p-12 relative flex flex-col min-h-full">
            <button onClick={closeDrawer} className="absolute top-6 right-6 text-zinc-400 hover:text-black text-xs uppercase tracking-widest z-10 p-2">
              ✕ Đóng
            </button>

            <div className="relative w-full aspect-square bg-[#f9f9f9] mb-8 mt-4">
              <Image src={selectedProduct.image_url} alt={selectedProduct.name} fill unoptimized className="object-contain p-8" />
            </div>

            <h2 className="text-2xl font-light uppercase tracking-tight mb-2">{selectedProduct.name}</h2>
            <p className="text-amber-600 text-xs font-bold tracking-widest uppercase mb-8 pb-8 border-b border-zinc-100">
              {new Intl.NumberFormat("vi-VN").format(selectedProduct.price)} ₫
            </p>

            <div className="text-sm font-light leading-[1.8] text-zinc-600 whitespace-pre-line mb-12">
              {selectedProduct.description}
            </div>

            <div className="mt-auto pt-8 border-t border-zinc-100 grid grid-cols-2 gap-3">
              <a href={selectedProduct.shopee_link} target="_blank" className="py-4 text-[10px] font-bold uppercase tracking-widest bg-[#ee4d2d] text-white text-center hover:bg-[#d73211] transition-colors">Mua trên Shopee</a>
              <a href={selectedProduct.tiktok_link} target="_blank" className="py-4 text-[10px] font-bold uppercase tracking-widest bg-black text-white text-center hover:bg-zinc-800 transition-colors">Mua trên TikTok</a>
            </div>
          </div>
        )}
      </div>
    </>
  );
}