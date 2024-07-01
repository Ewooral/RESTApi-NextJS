"use client";
import SidebarMenu from "@/components/sidebars/SidebarMenu";
import Providers from "../providers";
import userStore from "@/store";
import { useIsClient } from "@/hooks/useIsClient";
import clsx from "clsx";
import { useCssMediaQueries } from "@/hooks/useCssMediaQueries";

export interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { session } = userStore();
  const isClient = useIsClient();
  const { hideAfterLargerScreens, hideSidebarMenu } = useCssMediaQueries();

  return (
    <>
      {session.isLoggedIn && isClient && (
        <div className={clsx("flex h-[100%] bg-[#f9f7f7]")}>
          {/* Left Sidebar */}
          <aside
            style={{ height: " calc(100vh - 3.8rem)" }}
            className={clsx(
              "fixed w-[15%] bg-[#fff] border-r-2 mt-[4.3rem] p-2 overflow-y-auto text-[12px]",
              hideSidebarMenu && "hidden"
            )}
          >
            {/* Sidebar content */}
            <SidebarMenu />
          </aside>

          {/* Main Section */}
          <section
            className={clsx(
              "w-[100%] bg-[#f9f7f7] mt-[4.3rem] pl-[15.4%] text-[12px] mr-[.5rem]",
              hideSidebarMenu && "mr-[0] pl-[2.7%] pr-[2.7%]"
            )}
          >
            <main className="">
              <div id="ewooral-overlay-root"></div>
              <div id="portal-root"></div>
              <Providers>{children}</Providers>
            </main>
          </section>
        </div>
      )}
    </>
  );
};

export default Layout;
