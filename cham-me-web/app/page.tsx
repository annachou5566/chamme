import Image from "next/image";
import { supabase } from "../lib/supabase";
export const revalidate = 60;
const R2_URL = "https://pub-d641df2617f14733a84528eb2171cf3c.r2.dev";

async function getProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Lỗi lấy data:", error);
    return [];
  }
  return data;
}

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-white text-black selection:bg-black selection:text-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[90vh] flex flex-col items-center justify-center bg-zinc-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Huy up ảnh tên 'hero-main.jpg' vào R2 là chỗ này tự hiện */}
          <Image 
            src={`${R2_URL}/hero-main.jpg`} 
            alt="Chấm Mê Banner" 
            fill 
            className="object-cover opacity-60" 
            priority 
          />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
          <p className="text-amber-500 font-bold tracking-[0.2em] text-sm md:text-base mb-4 uppercase">
            Dòng xốt thượng hạng
          </p>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-8">
            Đánh Thức <br/> Mọi Giác Quan
          </h1>
          <a href="#shop" className="border-2 border-amber-500 text-amber-500 px-10 py-4 text-xs font-bold tracking-[0.2em] uppercase hover:bg-amber-500 hover:text-black transition-all">
            Trải nghiệm ngay
          </a>
        </div>
      </section>

      {/* 2. DANH SÁCH SẢN PHẨM */}
      <section id="shop" className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">Bộ Sưu Tập Nước Chấm</h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16">
          {products.map((product) => (
            <div key={product.id} className="group flex flex-col items-center text-center">
              <div className="relative w-full aspect-[4/5] bg-zinc-50 rounded-lg overflow-hidden mb-8 flex items-center justify-center p-8 group-hover:bg-zinc-100 transition-colors">
                <Image 
                  src={product.image_url} // Link này Huy đã dán link R2 vào Supabase rồi nên ko cần sửa
                  alt={product.name} 
                  fill 
                  className="object-contain p-6 transform group-hover:scale-105 transition-transform duration-500" 
                  sizes="33vw" 
                />
              </div>
              <h3 className="text-2xl font-bold uppercase tracking-tight mb-3">{product.name}</h3>
              <p className="text-zinc-500 text-sm mb-4 px-4 line-clamp-2">{product.tagline}</p>
              <div className="text-xl font-medium mb-8 text-amber-600">
                {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(product.price)}
              </div>
              <div className="flex w-full gap-3 px-4">
                <a href={product.shopee_link} target="_blank" className="flex-1 border border-[#ee4d2d] text-[#ee4d2d] py-3 text-xs font-bold uppercase hover:bg-[#ee4d2d] hover:text-white transition-colors">Shopee</a>
                <a href={product.tiktok_link} target="_blank" className="flex-1 bg-black text-white py-3 text-xs font-bold uppercase hover:bg-zinc-800 transition-colors">TikTok</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. MEDIA TEXT BLOCK */}
      <section id="story" className="w-full bg-zinc-950 text-white py-20 px-4 md:px-12 flex flex-col md:flex-row items-center justify-center gap-12">
        <div className="relative w-full md:w-1/2 aspect-video md:aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
           {/* Huy up ảnh 'lifestyle-kitchen.jpg' lên R2 */}
           <Image src={`${R2_URL}/lifestyle-kitchen.jpg`} alt="Chấm Mê trong bếp" fill className="object-cover" />
        </div>
        <div className="w-full md:w-1/2 max-w-lg text-left">
          <p className="text-amber-500 font-bold tracking-widest text-xs uppercase mb-4">Góc Bếp Chấm Mê</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-6">Tuyệt Tác Cho <br/> Mọi Món Ăn</h2>
          <p className="text-zinc-400 text-base mb-8">
            Sự pha trộn hoàn hảo từ nguyên liệu tươi sạch nhất. Không chỉ là nước chấm, đó là linh hồn của bữa tiệc.
          </p>
          <a href="#shop" className="inline-block border-b-2 border-amber-500 text-white font-bold uppercase pb-1 hover:text-amber-500 transition-colors text-sm">
            Khám phá công thức ➔
          </a>
        </div>
      </section>

      {/* 4. INSTAGRAM GRID */}
      <section className="py-24 px-4 bg-zinc-50">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-2">Kết Nối Cùng Chúng Tôi</h2>
          <p className="text-amber-600 font-bold tracking-widest uppercase text-sm">@cham.me.food</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 max-w-7xl mx-auto">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="relative aspect-square overflow-hidden bg-zinc-200 group cursor-pointer">
              {/* Huy up các ảnh 'social-1.jpg', 'social-2.jpg'... lên R2 */}
              <Image 
                src={`${R2_URL}/social/${fileName}`} 
                alt={`Instagram ${item}`} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-500" 
              />
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}