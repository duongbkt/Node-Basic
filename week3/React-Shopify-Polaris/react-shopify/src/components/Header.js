// import { TopBar, Frame } from "@shopify/polaris";
// import { useState, useCallback } from "react";

// export const Header = () => {
//   const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

//   const toggleIsUserMenuOpen = useCallback(
//     () => setIsUserMenuOpen((isUserMenuOpen) => !isUserMenuOpen),
//     []
//   );

//   const handleNavigationToggle = useCallback(() => {
//     console.log("toggle navigation visibility");
//   }, []);

//   const userMenuMarkup = (
//     <TopBar.UserMenu
//       name="Xquenda Andreev"
//       initials="XA"
//       open={isUserMenuOpen}
//       onToggle={toggleIsUserMenuOpen}
//     />
//   );

//   const topBarMarkup = (
//     <TopBar
//       showNavigationToggle
//       userMenu={userMenuMarkup}
//       onNavigationToggle={handleNavigationToggle}
//     />
//   );
//   return (
//     <div style={{ height: "80px" }}>
//       <Frame
//         topBar={topBarMarkup}
//       />
//     </div>
//   );
// };
