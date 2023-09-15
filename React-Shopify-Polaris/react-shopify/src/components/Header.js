import { TopBar, Frame } from "@shopify/polaris";
import { useState, useCallback } from "react";

export const Header = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleIsUserMenuOpen = useCallback(
    () => setIsUserMenuOpen((isUserMenuOpen) => !isUserMenuOpen),
    []
  );

  const handleNavigationToggle = useCallback(() => {
    console.log("toggle navigation visibility");
  }, []);

  const userMenuMarkup = (
    <TopBar.UserMenu
      name="Xquenda Andreev"
      initials="XA"
      open={isUserMenuOpen}
      onToggle={toggleIsUserMenuOpen}
    />
  );

  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      userMenu={userMenuMarkup}
      onNavigationToggle={handleNavigationToggle}
    />
  );
  return (
    <div style={{ height: "80px" }}>
      <Frame
        topBar={topBarMarkup}
        children={
          <img
            src="https://career.mageplaza.com/images/logo.png"
            width={124}
            style={{
              position: "relative",
              top: "-45px",
              zIndex: 1000,
              left: "20px",
            }}
          />
        }
      />
    </div>
    // {/* <header>
    //   <div className="logoImage">
    //     <img src="image 7.jpg" alt="" />
    //   </div>
    //   <div className="username">
    //     <svg
    //       width="36"
    //       height="36"
    //       viewBox="0 0 36 36"
    //       fill="none"
    //       xmlns="http://www.w3.org/2000/svg"
    //     >
    //       <circle
    //         cx="18"
    //         cy="18"
    //         r="17"
    //         fill="#FFC96B"
    //         stroke="white"
    //         strokeWidth="2"
    //       />
    //       <path
    //         d="M8.72368 22.8L12.5997 17.5773L9.18169 12.7785H10.7608L12.5792 15.3488C12.9574 15.882 13.2263 16.2922 13.3858 16.5793C13.6091 16.2147 13.8734 15.8342 14.1788 15.4377L16.1954 12.7785H17.6377L14.1172 17.5021L17.9112 22.8H16.2706L13.7481 19.2248C13.6068 19.0197 13.461 18.7964 13.3106 18.5549C13.0873 18.9195 12.9278 19.1701 12.8321 19.3068L10.3165 22.8H8.72368ZM17.9795 22.8L21.8282 12.7785H23.2569L27.3584 22.8H25.8477L24.6788 19.7648H20.4883L19.3877 22.8H17.9795ZM20.8711 18.6848H24.2686L23.2227 15.9094C22.9037 15.0663 22.6667 14.3736 22.5118 13.8312C22.3842 14.4738 22.2042 15.1118 21.9717 15.7453L20.8711 18.6848Z"
    //         fill="#3D2800"
    //       />
    //     </svg>
    //     <p>Xquenda Andreev</p>
    //   </div>
    // </header> */}
  );
};
