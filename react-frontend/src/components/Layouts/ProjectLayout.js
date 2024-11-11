import AppSideBar from "./appSideBar/AppSideBar.js";

/*

import ProductsPage from "../ProductsPage/ProductsPage";
import TktCollectionDetailsPage from "../TktCollectionDetailsPage/TktCollectionDetailsPage";
import UserChecklistDetailsPage from "../UserChecklistDetailsPage/UserChecklistDetailsPage";
import TimerDetailsPage from "../TimerDetailsPage/TimerDetailsPage";
~cb-add-import~

~cb-add-services-card~

case "products":
                return <ProductsPage />;
case "tktCollectionDetails":
                return <TktCollectionDetailsPage />;
case "userChecklistDetails":
                return <UserChecklistDetailsPage />;
case "timerDetails":
                return <TimerDetailsPage />;
~cb-add-thurthy~

*/

const AppLayout = (props) => {
  const { children, activeKey, activeDropdown } = props;

  return (
    <div className="flex min-h-[calc(100vh-5rem)] mt-20 bg-white">
      <AppSideBar activeKey={activeKey} activeDropdown={activeDropdown} />
      <div className="flex-1 ml-2">{children}</div>
    </div>
  );
};

export default AppLayout;
