import { Frame, TopBar } from "@shopify/polaris";
import ResourceListWithSelection from "./ResourceListWithSelection";

function FrameLayout() {
  const userMenuMarkup = <TopBar.UserMenu name="Dharma" initials="D" />;

  const topBarMarkup = <TopBar userMenu={userMenuMarkup} />;

  return (
    <div style={{ height: "500px" }}>
      <Frame topBar={topBarMarkup}>
        <ResourceListWithSelection />
      </Frame>
    </div>
  );
}

export default FrameLayout;
