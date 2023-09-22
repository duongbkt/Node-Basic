import { AppProvider, Frame, TopBar } from "@shopify/polaris";
import ResourceListWithSelection from "./ResourceListWithSelection";

function FrameExample() {
  const userMenuActions = [
    {
      items: [{ content: "Community forums" }],
    },
  ];

  const userMenuMarkup = (
    <TopBar.UserMenu actions={userMenuActions} name="Dharma" initials="D" />
  );

  const topBarMarkup = (
    <TopBar showNavigationToggle userMenu={userMenuMarkup} />
  );

  return (
    <div style={{ height: "500px" }}>
      <Frame topBar={topBarMarkup}>
        <ResourceListWithSelection />
      </Frame>
    </div>
  );
}

export default FrameExample;
