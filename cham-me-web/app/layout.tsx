import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
      <body className={`${inter.className} bg-[#fafafa] text-zinc-900 antialiased`}>
        {/* PROMO BAR */}
        <div className="bg-zinc-100 text-center py-2 text-xs font-bold tracking-widest uppercase text-zinc-800 border-b border-zinc-200">
          🚚 Miễn phí vận chuyển cho đơn hàng từ 200.000đ 🚚
        </div>

        {/* HEADER */}
        <header className="sticky top-0 z-50 bg-black text-white px-6 py-4 flex items-center justify-between transition-all duration-300">
          <nav className="hidden md:flex gap-8 text-sm font-bold tracking-widest uppercase">
            <a href="#shop" className="hover:text-amber-500 transition-colors">Cửa Hàng</a>
            <a href="#story" className="hover:text-amber-500 transition-colors">Khám Phá</a>
          </nav>
          
          <a href="/" className="text-3xl font-black tracking-tighter uppercase mx-auto md:mx-0">
            Chấm Mê
          </a>

          <div className="flex items-center gap-6 text-sm font-bold tracking-widest uppercase">
            <a href="#" className="hidden md:block hover:text-amber-500 transition-colors">Tài Khoản</a>
            <button className="flex items-center gap-2 hover:text-amber-500 transition-colors">
              Giỏ (0)
            </button>
          </div>
        </header>

        {/* MAIN CONTENT */}
        {children}

        {/* FOOTER */}
        <footer className="bg-black text-white px-6 py-16 md:py-24">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-1 text-center md:text-left">
              <h2 className="text-4xl font-black tracking-tighter uppercase mb-6">Chấm Mê</h2>
              <p className="text-zinc-400 text-sm mb-6">Hương vị Việt cho bữa ăn thêm ngon.</p>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest mb-6 border-b border-zinc-800 pb-2">Mua Sắm</h3>
              <ul className="space-y-4 text-sm text-zinc-400">
                <li><a href="#shop" className="hover:text-white transition">Tất cả sản phẩm</a></li>
                <li><a href="#" className="hover:text-white transition">Hộp quà tặng</a></li>
                <li><a href="#" className="hover:text-white transition">Ưu đãi</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest mb-6 border-b border-zinc-800 pb-2">Về Chúng Tôi</h3>
              <ul className="space-y-4 text-sm text-zinc-400">
                <li><a href="#" className="hover:text-white transition">Câu chuyện Chấm Mê</a></li>
                <li><a href="#" className="hover:text-white transition">Liên hệ</a></li>
                <li><a href="#" className="hover:text-white transition">Hệ thống đại lý</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest mb-6 border-b border-zinc-800 pb-2">Nhận Tin Mới</h3>
              <p className="text-zinc-400 text-sm mb-4">Đăng ký để nhận công thức nấu ăn và ưu đãi độc quyền.</p>
              <form className="flex flex-col gap-3">
                <input type="email" placeholder="Nhập email của bạn..." className="bg-transparent border-b border-zinc-600 px-0 py-2 text-sm text-white focus:outline-none focus:border-white transition-colors" />
                <button type="button" className="text-left text-amber-500 text-xs font-bold uppercase tracking-widest mt-2 hover:text-amber-400 transition">Đăng ký ngay ➔</button>
              </form>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-zinc-800 text-center text-zinc-500 text-xs">
            © 2026 Chấm Mê. Bảo lưu mọi quyền.
          </div>
        </footer>
      </body>
    </html>
  );
}