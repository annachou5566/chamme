import Image from "next/image";
import { supabase } from "../lib/supabase";

// Lấy dữ liệu sản phẩm từ Supabase
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
    <main className="min-h-screen bg-[#fafafa] text-zinc-900 font-sans selection:bg-black selection:text-white">
      {/* HERO SECTION */}
      <section className="relative w-full h-[80vh] flex flex-col items-center justify-center bg-zinc-900 text-white overflow-hidden">
        {/* Lớp phủ mờ nếu sau này bạn chèn ảnh nền */}
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        
        <div className="relative z-20 text-center px-4 flex flex-col items-center">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-6 drop-shadow-lg">
            Chấm Mê
          </h1>
          <p className="text-lg md:text-xl font-light tracking-wide max-w-2xl text-zinc-200 mb-10">
            Tuyệt tác nước chấm thủ công. Bùng nổ vị giác, đa dụng mọi món.
          </p>
          <a 
            href="#shop" 
            className="border border-white px-8 py-3 text-sm tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all duration-300"
          >
            Khám phá sản phẩm
          </a>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section id="shop" className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-16">
          {products.map((product) => (
            <div key={product.id} className="group flex flex-col">
              {/* Vùng chứa ảnh */}
              <div className="relative aspect-[4/5] bg-white rounded-2xl overflow-hidden shadow-sm border border-zinc-100 mb-8 flex items-center justify-center p-8">
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                {product.image_url ? (
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    className="object-contain p-6 transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full bg-zinc-100 flex items-center justify-center text-zinc-400">
                    No Image
                  </div>
                )}
              </div>

              {/* Thông tin */}
              <div className="flex flex-col flex-grow text-center">
                <h2 className="text-2xl font-bold uppercase tracking-tight mb-2">
                  {product.name}
                </h2>
                <p className="text-zinc-500 text-sm mb-4 min-h-[40px] px-4">
                  {product.tagline}
                </p>
                <div className="text-xl font-medium mb-8">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(product.price)}
                </div>
                
                {/* Nút mua hàng */}
                <div className="mt-auto flex flex-col gap-3">
                  {product.shopee_link && (
                    <a
                      href={product.shopee_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#ee4d2d] text-white py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-[#d74326] transition-colors shadow-sm"
                    >
                      Shopee
                    </a>
                  )}
                  {product.tiktok_link && (
                    <a
                      href={product.tiktok_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-black text-white py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors shadow-sm"
                    >
                      TikTok Shop
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}