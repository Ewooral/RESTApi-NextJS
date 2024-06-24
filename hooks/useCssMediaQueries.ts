import { useMediaQuery } from "react-responsive";

export const useCssMediaQueries = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 1025px) and (max-width: 1440px)",
  });
  const isDesktop = useMediaQuery({ query: "(min-width: 1441px)" });
  const hideAfterMedium = useMediaQuery({ minWidth: 768 });
  const showAfterMedium = useMediaQuery({ maxWidth: 768 });
  const hideAfterLargerScreens = useMediaQuery({
    query: "(max-width: 1024px)",
  });
  const hideSidebarMenu = useMediaQuery({maxWidth: "640px"})
  return {
    isMobile,
    isTablet,
    isDesktop,
    hideAfterLargerScreens,
    hideAfterMedium,
    showAfterMedium,
    hideSidebarMenu
  };
};
