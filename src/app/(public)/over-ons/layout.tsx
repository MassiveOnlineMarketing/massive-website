import Footer from "@/website/partials/footer";
import { NavbarWithTopbar } from "@/website/partials/navbar-with-topbar";
import '@/styles/legal.css';


export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <NavbarWithTopbar />

            <main className="py-[60px] md:py-[120px]">
                {children}
            </main>


            <Footer />
        </>
    )
}