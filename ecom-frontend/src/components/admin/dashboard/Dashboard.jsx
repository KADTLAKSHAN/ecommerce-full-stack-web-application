import DashboardOverview from "./DashboardOverview";
import { FaBoxOpen, FaDollarSign, FaShoppingCart } from "react-icons/fa";

const Dashboard = () => {
  const { productCount, totalRevenue, totalOrders } = {
    productCount: "8",
    totalRevenue: "8712.85",
    totalOrders: "7",
  };

  return (
    <div>
      <div className="flex md:flex-row mt-8 flex-col lg:justify-between border border-slate-400 rounded-lg bg-linear-to-r from-blue-50 to-blue-100 shadow-lg">
        <DashboardOverview
          title="Total Products"
          amount={productCount}
          Icon={FaBoxOpen}
        />

        <DashboardOverview
          title="Total Orders"
          amount={totalOrders}
          Icon={FaShoppingCart}
        />

        <DashboardOverview
          title="Total Products"
          amount={totalRevenue}
          Icon={FaDollarSign}
          revenue
        />
      </div>
    </div>
  );
};

export default Dashboard;
