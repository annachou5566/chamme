import Image from "next/image";
import { supabase } from "../lib/supabase";
import ProductGallery from "./ProductGallery";
export const revalidate = 60;

const R2_URL = "https://pub-d641df2617f14733a84528eb2171cf3c.r2.dev";

async function getProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Lỗi kết nối dữ liệu:", error);
    return [];
  }
  return data;
}

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-white text-zinc-900 selection:bg-zinc-900 selection:text-white">
      
      {/* 1. HERO SECTION - Đã chỉnh lại để banner dài và không mất góc */}
      <section className="relative w-full aspect-video md:aspect-[21/9] flex flex-col items-center justify-center bg-zinc-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src={`${R2_URL}/brand/hero-main.webp`}
            alt="Chấm Mê Concept" 
            fill 
            className="object-cover opacity-50" // Giữ object-cover để ảnh luôn đầy khung nhưng khung giờ đã dài hơn
            priority 
            unoptimized
          />
        </div>
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <p className="text-zinc-400 font-medium tracking-[0.3em] text-[10px] mb-4 uppercase">
            Nước chấm thủ công
          </p>
          <h1 className="text-3xl md:text-5xl font-light tracking-tight mb-8 leading-tight">
            Gói trọn hương vị <br/> từ nguyên liệu tự nhiên
          </h1>
          <a href="#shop" className="inline-block border border-white px-8 py-3 text-[10px] tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all duration-500">
            Xem sản phẩm
          </a>
        </div>
      </section>

      {/* 2. PRODUCT LISTING - Rõ ràng & Chuyên nghiệp */}
      <section id="shop" className="max-w-6xl mx-auto py-32 px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
          <div>
            <h2 className="text-3xl font-light uppercase tracking-tighter">Danh mục sản phẩm</h2>
            <p className="text-zinc-500 text-sm mt-2">Được chế biến tỉ mỉ trong từng mẻ nhỏ</p>
          </div>
          <div className="h-px flex-grow bg-zinc-100 hidden md:block mx-8 mb-4"></div>
        </div>

        <ProductGallery products={products} />

      </section>

      {/* 3. LIFESTYLE SECTION - Tinh tế */}
      <section id="story" className="w-full bg-zinc-50 py-32 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-20">
          <div className="relative w-full md:w-1/2 aspect-square md:aspect-[4/5]">
             <Image 
              src={`${R2_URL}/lifestyle/lifestyle-kitchen.webp`} 
              alt="Quy trình thực hiện" 
              fill 
              unoptimized
              className="object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-1000" 
             />
          </div>
          <div className="w-full md:w-1/2 max-w-md">
            <span className="text-zinc-400 text-xs tracking-widest uppercase mb-4 block">Về Chấm Mê</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight uppercase mb-8 leading-tight text-zinc-900">
              Hương vị được cân bằng từ căn bếp
            </h2>
            <p className="text-zinc-500 text-sm mb-8 leading-[1.8] font-light">
              Chúng tôi tin rằng nước chấm ngon bắt nguồn từ những nguyên liệu tươi sạch và sự kiên nhẫn. Mỗi chai xốt là sự kết hợp cân bằng giữa vị cay nồng, chua thanh và ngọt dịu, giúp tôn vinh hương vị đặc trưng của từng món ăn trên bàn tiệc gia đình.
            </p>
            <div className="w-12 h-px bg-zinc-900"></div>
          </div>
        </div>
      </section>

      {/* 4. SOCIAL GRID - Gần gũi */}
      <section className="py-32 px-6">
        <div className="text-center mb-16">
          <h2 className="text-2xl font-light uppercase tracking-[0.2em] mb-3">Khoảnh khắc Chấm Mê</h2>
          <p className="text-zinc-400 text-xs tracking-widest uppercase">@cham.me.food</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {["social-1.webp", "social-2.webp", "social-3.webp", "social-4.webp"].map((fileName) => (
            <div key={fileName} className="relative aspect-square overflow-hidden bg-zinc-50 transition-opacity hover:opacity-90">
              <Image 
                src={`${R2_URL}/social/${fileName}`} 
                alt="Instagram Feed" 
                fill 
                unoptimized
                className="object-cover" 
              />
            </div>
          ))}
        </div>
      </section>
      <footer className="bg-zinc-950 text-white pt-24 pb-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 border-b border-zinc-800 pb-16 mb-8">
          <div>
            <h3 className="text-2xl font-light tracking-widest uppercase mb-6">Chấm Mê</h3>
            <p className="text-zinc-400 text-sm leading-relaxed font-light pr-8 md:pr-12">
              Gói trọn hương vị từ nguyên liệu tự nhiên. Chế biến hoàn toàn thủ công, mang đến trải nghiệm ẩm thực tinh tế cho mọi bữa tiệc gia đình.
            </p>
          </div>
          
          <div>
            <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase mb-6 text-zinc-500">Liên hệ</h4>
            <ul className="space-y-4 text-sm font-light text-zinc-300">
              <li><a href="tel:0938591483" className="hover:text-amber-500 transition-colors">Hotline: 090.123.4567</a></li>
              <li><a href="https://zalo.me/0938591483" target="_blank" className="hover:text-amber-500 transition-colors">Zalo: 090.123.4567</a></li>
              <li>Sản xuất thủ công tại TP.HCM</li>
              <li className="text-zinc-500 pt-2 text-xs uppercase tracking-widest">Thứ 2 - Chủ Nhật: 8:00 - 20:00</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase mb-6 text-zinc-500">Kết nối</h4>
            <ul className="space-y-4 text-sm font-light text-zinc-300 mb-10">
              <li>
                <a href="https://www.tiktok.com/@cham.me.food" target="_blank" className="hover:text-white transition-colors underline underline-offset-4 decoration-zinc-700 hover:decoration-white">
                  TikTok: @cham.me.food
                </a>
              </li>
            </ul>
            
            <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase mb-6 text-zinc-500">Hỗ trợ</h4>
            <ul className="space-y-4 text-sm font-light text-zinc-300">
              <li><a href="#" className="hover:text-white transition-colors">Chính sách mua hàng & Đổi trả</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Thông tin vận chuyển</a></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-[10px] text-zinc-600 font-light tracking-widest uppercase">
          <p>© 2026 Chấm Mê. All rights reserved.</p>
          <p className="mt-4 md:mt-0">Handcrafted in Vietnam</p>
        </div>
      </footer>

      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 group">
        <div className="flex flex-col gap-3 opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300">
          <a href="https://zalo.me/0901234567" target="_blank" className="flex items-center gap-3 bg-white text-zinc-900 px-5 py-3 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:bg-zinc-100 transition-colors">
            <span className="text-[10px] font-bold tracking-widest uppercase">Zalo</span>
          </a>
          <a href="tel:0901234567" className="flex items-center gap-3 bg-white text-zinc-900 px-5 py-3 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:bg-zinc-100 transition-colors">
            <span className="text-[10px] font-bold tracking-widest uppercase">Hotline</span>
          </a>
        </div>
        
        <button className="w-14 h-14 bg-zinc-900 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-black hover:scale-105 transition-all">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
      </div>
    </main>
  );
}