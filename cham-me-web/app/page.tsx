import Image from "next/image";
import { supabase } from "../lib/supabase";

// Tự động cập nhật dữ liệu sau mỗi 60 giây
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
      
      {/* 1. HERO SECTION - Tối giản & Tập trung */}
      <section className="relative w-full h-[85vh] flex flex-col items-center justify-center bg-zinc-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src={`${R2_URL}/hero-main.jpg`} 
            alt="Chấm Mê Concept" 
            fill 
            className="object-cover opacity-50" 
            priority 
            unoptimized
          />
        </div>
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <p className="text-zinc-400 font-medium tracking-[0.3em] text-xs mb-6 uppercase">
            Nước chấm thủ công
          </p>
          <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-10 leading-tight">
            Gói trọn hương vị <br/> từ nguyên liệu tự nhiên
          </h1>
          <a href="#shop" className="inline-block border border-white px-10 py-3 text-[10px] tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all duration-500">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-20">
          {products.map((product) => (
            <div key={product.id} className="group flex flex-col">
              <div className="relative aspect-[4/5] bg-[#f9f9f9] overflow-hidden mb-8 transition-all duration-700">
                <Image 
                  src={product.image_url} 
                  alt={product.name} 
                  fill 
                  unoptimized
                  className="object-contain p-10 transform group-hover:scale-105 transition-transform duration-700" 
                />
              </div>
              <h3 className="text-lg font-semibold uppercase tracking-tight mb-2">{product.name}</h3>
              <p className="text-zinc-500 text-sm mb-6 leading-relaxed line-clamp-2 font-light">
                {product.tagline}
              </p>
              <div className="text-sm font-medium mb-8">
                {new Intl.NumberFormat("vi-VN").format(product.price)} ₫
              </div>
              <div className="mt-auto grid grid-cols-2 gap-2">
                <a 
                  href={product.shopee_link} 
                  target="_blank" 
                  className="py-3 text-[10px] font-bold uppercase tracking-widest border border-zinc-200 text-zinc-600 hover:bg-[#ee4d2d] hover:text-white hover:border-[#ee4d2d] transition-all text-center"
                >
                  Shopee
                </a>
                <a 
                  href={product.tiktok_link} 
                  target="_blank" 
                  className="py-3 text-[10px] font-bold uppercase tracking-widest bg-zinc-900 text-white hover:bg-black transition-all text-center"
                >
                  TikTok
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. LIFESTYLE SECTION - Tinh tế */}
      <section id="story" className="w-full bg-zinc-50 py-32 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-20">
          <div className="relative w-full md:w-1/2 aspect-square md:aspect-[4/5]">
             <Image 
              src={`${R2_URL}/lifestyle/lifestyle-kitchen.svg`} 
              alt="Quy trình thực hiện" 
              fill 
              unoptimized
              className="object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-1000" 
             />
          </div>
          <div className="w-full md:w-1/2 max-w-md">
            <span className="text-zinc-400 text-xs tracking-widest uppercase mb-4 block">Về Chấm Mê</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight uppercase mb-8 leading-tight text-zinc-900">
              Sự hài hòa từ bàn tay người làm
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
          {["social-1.svg", "social-2.svg", "social-3.svg", "social-4.svg"].map((fileName) => (
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

    </main>
  );
}