import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import FloatingContact from "./FloatingContact";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chấm Mê | Nước Chấm Thủ Công Thơm Ngon",
  description: "Tâm huyết nước chấm thủ công. Bùng nổ vị giác, đa dụng mọi món.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className="scroll-smooth">
      <body className={`${inter.className} bg-white text-zinc-900 antialiased`}>
        <div className="bg-zinc-100 text-center py-2 text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-800 border-b border-zinc-200">
          🚚 Miễn phí vận chuyển cho đơn hàng từ 100.000đ 🚚
        </div>

        <header className="sticky top-0 z-40 bg-zinc-950 text-white px-6 py-4 flex items-center justify-between transition-all duration-300 border-b border-zinc-900">
          <nav className="hidden md:flex gap-8 text-sm font-light tracking-widest uppercase">
            <a href="#shop" className="hover:text-amber-500 transition-colors">Cửa Hàng</a>
            <a href="#story" className="hover:text-amber-500 transition-colors">Khám Phá</a>
          </nav>
          
          <a href="/" className="text-3xl font-light tracking-widest uppercase mx-auto md:mx-0">
            Chấm Mê
          </a>

          <div className="flex items-center gap-6 text-[10px] font-bold tracking-[0.2em] uppercase">
            <a 
              href="https://zalo.me/0938591483" 
              target="_blank" 
              className="border border-zinc-700 px-5 py-2.5 hover:bg-white hover:text-black transition-all duration-500"
            >
              Liên hệ mua sỉ
            </a>
          </div>
        </header>

        {children}

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
                <li><a href="tel:0938591483" className="hover:text-amber-500 transition-colors">Hotline: 093.859.1483</a></li>
                <li><a href="https://zalo.me/0938591483" target="_blank" className="hover:text-amber-500 transition-colors">Zalo: 093.859.1483</a></li>
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

        <FloatingContact />
      </body>
    </html>
  );
}