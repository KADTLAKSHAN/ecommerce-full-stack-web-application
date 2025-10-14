import { useState } from "react";
import { FaBoxOpen } from "react-icons/fa";
import { MdPersonAdd } from "react-icons/md";
import Loader from "../../shared/Loader";
import { useSelector } from "react-redux";
import useSellerFilter from "../../../hooks/useSellerFilter";
import Modal from "../../shared/Modal";
import AddSellerForm from "./AddSellerForm";
import ErrorPage from "../../shared/ErrorPage";
import SellerTable from "./SellerTable";

const Sellers = () => {
  // const sellers = [
  //   {
  //     userId: 3,
  //     username: "admin",
  //     email: "admin@example.com",
  //     password: "$2a$10$pUi1E1N6SSm3mr3mUmVrT.BPeciP/pMIP52H72lqfmE.Nx2a22Jey",
  //     roles: [
  //       {
  //         roleId: 2,
  //         roleName: "ROLE_SELLER",
  //       },
  //       {
  //         roleId: 3,
  //         roleName: "ROLE_ADMIN",
  //       },
  //       {
  //         roleId: 1,
  //         roleName: "ROLE_USER",
  //       },
  //     ],
  //     address: null,
  //     cart: {
  //       cartId: 3,
  //       totalPrice: 0.0,
  //       products: [],
  //     },
  //   },
  //   {
  //     userId: 2,
  //     username: "seller1",
  //     email: "seller1@example.com",
  //     password: "$2a$10$BZd4Fbpxs.rse0Ttniq7E.ZhPA.91Z6pD0lZN6KQ7mO7LFH3LoDbS",
  //     roles: [
  //       {
  //         roleId: 2,
  //         roleName: "ROLE_SELLER",
  //       },
  //     ],
  //     address: null,
  //     cart: null,
  //   },
  // ];

  // const pagination = {
  //   pageNumber: 0,
  //   pageSize: 50,
  //   totalElements: 11,
  //   totalPages: 1,
  //   lastPage: true,
  // };

  const { sellers, pagination } = useSelector((state) => state.sellers);
  const [openAddModal, setOpenAddModal] = useState(false);
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const emptyUsers = !sellers || sellers.length === 0;

  useSellerFilter();

  if (errorMessage) {
    return <ErrorPage message={errorMessage} />;
  }

  return (
    <div>
      <div className="pt-6 pb-10 flex justify-end">
        <button
          onClick={() => setOpenAddModal(true)}
          className="bg-custom-blue hover:bg-blue-600 text-white font-semibold py-2 px-4 flex items-center gap-2 rounded-md shadow-md transition-colors hover:text-slate-300 duration-300"
        >
          <MdPersonAdd className="text-xl" /> Add Seller
        </button>
      </div>

      {!emptyUsers && (
        <h1 className="text-slate-800 text-3xl text-center font-bold pb-6 uppercase">
          All Sellers
        </h1>
      )}

      {isLoading ? (
        <Loader />
      ) : (
        <>
          {emptyUsers ? (
            <div className="flex flex-col items-center justify-center text-gray-600 py-10">
              <FaBoxOpen size={50} className="mb-3" />
              <h2 className="text-2xl font-semibold">No Sellers created yet</h2>
            </div>
          ) : (
            <SellerTable sellers={sellers} pagination={pagination} />
          )}
        </>
      )}

      <Modal
        open={openAddModal}
        setOpen={setOpenAddModal}
        title="Add New Seller"
      >
        <AddSellerForm setOpen={setOpenAddModal} />
      </Modal>
    </div>
  );
};

export default Sellers;
