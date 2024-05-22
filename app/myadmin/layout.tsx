'use client'
import SidebarMenu from "@/components/sidebars/SidebarMenu";
import Providers from "../providers";
import userStore from "@/store";
import {useIsClient} from "@/hooks/useIsClient";

export interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const {session} = userStore();
    const isClient = useIsClient();

  return (
    <>
        {
            session.isLoggedIn && isClient && (
                <div className="flex h-screen bg-[#f9f7f7]">
                    {/* Left Sidebar */}
                    <aside
                        style={{height: " calc(100vh - 3.8rem)"}}
                        className="fixed w-[15%] bg-[#fff] border-r-2
      mt-[3.8rem] p-2 overflow-y-auto text-[12px]">
                        {/* Sidebar content */}
                        <SidebarMenu/>
                    </aside>

                    {/* Main Section */}
                    <section className="w-[100%] bg-[#f9f7f7] mt-[3.8rem] pl-[15.4%] text-[12px] mr-[.5rem]">
                        <main className="">
                            <Providers>{children}</Providers>
                        </main>
                    </section>
                </div>
            )
        }
    </>
  );
};

export default Layout;
