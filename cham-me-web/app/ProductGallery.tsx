"use client";
import Image from "next/image";
import { useState } from "react";

export default function ProductGallery({ products }: { products: any[] }) {
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  const closeDrawer = () => setSelectedProduct(null);

  return (
    <>
      {/* 1. KHUNG DANH SÁCH SẢN PHẨM */}
      {/* Cải tiến: Dùng flex + overflow-x-auto trên mobile, chuyển về grid 3 cột trên máy tính (md) */}
      <div className="flex md:grid md:grid-cols-3 gap-6 md:gap-x-12 md:gap-y-20 overflow-x-auto snap-x snap-mandatory pb-8 md:pb-0 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        
        {products.map((product) => (
          {/* Trên mobile, mỗi khung chiếm 85% màn hình (w-[85%]). Máy tính tự động chia đều (md:w-auto) */}
          <div key={product.id} className="group flex flex-col flex-none w-[85%] md:w-auto snap-start">
            
            {/* Vùng bấm vào để mở chi tiết */}
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
                  className="object-contain p-10 transform group-hover:scale-105 transition-transform duration-700" 
                />
              </div>
              <h3 className="text-lg font-semibold uppercase tracking-tight mb-2 group-hover:text-amber-600 transition-colors">{product.name}</h3>
              <p className="text-zinc-500 text-sm mb-6 leading-relaxed line-clamp-2 font-light">
                {product.tagline}
              </p>
              <div className="text-sm font-medium mb-8">
                {new Intl.NumberFormat("vi-VN").format(product.price)} ₫
              </div>
            </div>

            {/* Nút mua hàng */}
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

      {/* 2. HIỆU ỨNG KHUNG TRƯỢT (DRAWER) KHI CLICK */}
      
      {/* Nền đen mờ phía sau */}
      {selectedProduct && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 transition-opacity backdrop-blur-sm" 
          onClick={closeDrawer} 
        />
      )}

      {/* Nội dung trượt từ phải sang */}
      <div className={`fixed inset-y-0 right-0 z-50 w-full md:w-[480px] bg-white shadow-2xl transform transition-transform duration-500 ease-in-out ${selectedProduct ? "translate-x-0" : "translate-x-full"} overflow-y-auto`}>
        {selectedProduct && (
          <div className="p-8 md:p-12 relative flex flex-col min-h-full">
            {/* Nút Đóng */}
            <button onClick={closeDrawer} className="absolute top-6 right-6 text-zinc-400 hover:text-black text-xs uppercase tracking-widest z-10 p-2">
              ✕ Đóng
            </button>

            {/* Ảnh sản phẩm trong chi tiết */}
            <div className="relative w-full aspect-square bg-[#f9f9f9] mb-8 mt-4">
              <Image src={selectedProduct.image_url} alt={selectedProduct.name} fill unoptimized className="object-contain p-8" />
            </div>

            {/* Thông tin */}
            <h2 className="text-2xl font-light uppercase tracking-tight mb-2">{selectedProduct.name}</h2>
            <p className="text-amber-600 text-xs font-bold tracking-widest uppercase mb-8 pb-8 border-b border-zinc-100">
              {new Intl.NumberFormat("vi-VN").format(selectedProduct.price)} ₫
            </p>

            {/* Đoạn mô tả dài từ Supabase (giữ nguyên xuống dòng) */}
            <div className="text-sm font-light leading-[1.8] text-zinc-600 whitespace-pre-line mb-12">
              {selectedProduct.description}
            </div>

            {/* Nút Mua ngay ở cuối bảng trượt */}
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