import { MdAddShoppingCart } from "react-icons/md";
import { FaBoxOpen } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../shared/Loader";
import { DataGrid } from "@mui/x-data-grid";
import { adminProductTableColumn } from "../../helper/tableColumn";
import { useState } from "react";
import { useDashboardProductFilter } from "../../../hooks/useProductFilter";
import Modal from "../../shared/Modal";
import AddProductForm from "./AddProductForm";
import DeleteModal from "../../shared/DeleteModal";
import { deleteProduct } from "../../../store/actions";
import toast from "react-hot-toast";
import ImageUploadForm from "./ImageUploadForm";
import ProductViewModel from "../../shared/ProductViewModel";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const AdminProducts = () => {
  // const products = [
  //   {
  //     productId: 2,
  //     productName: "Wireless Earbuds Pro",
  //     image:
  //       "http://localhost:8080/images/970634c6-7b10-447f-a0f4-c3e7be529517.jpg",
  //     description:
  //       "Noise-cancelling wireless earbuds with superior sound quality",
  //     quantity: 199,
  //     price: 80.0,
  //     discount: 15.0,
  //     specialPrice: 68.0,
  //   },
  //   {
  //     productId: 102,
  //     productName: "Gaming Laptop GX",
  //     image:
  //       "http://localhost:8080/images/e4e4dcf1-b468-471f-86c1-f57fb2e9ad25.webp",
  //     description:
  //       "High-performance gaming laptop with a 4K display and powerful GPU",
  //     quantity: 29,
  //     price: 1200.0,
  //     discount: 20.0,
  //     specialPrice: 960.0,
  //   },
  // ];

  // const pagination = {
  //   pageNumber: 0,
  //   pageSize: 50,
  //   totalElements: 11,
  //   totalPages: 1,
  //   lastPage: true,
  // };

  const dispatch = useDispatch();

  const { products, pagination } = useSelector((state) => state.products);

  const emptyProducts = !products || products?.length === 0;
  const { isLoading, errorMessage } = useSelector((state) => state.errors);

  const [currentPage, setCurrentPage] = useState(
    pagination?.pageNumber + 1 || 1
  );

  const { user } = useSelector((state) => state.auth);
  const isAdmin = user && user?.roles?.includes("ROLE_ADMIN");

  const [selectedProduct, setSelectedProduct] = useState("");

  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  const [openAddModal, setOpenAddModal] = useState(false);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [openImageUploadModal, setOpenImageUploadModal] = useState(false);

  const [openProductViewModal, setOpenProductViewModal] = useState(false);

  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = useLocation().pathname;

  useDashboardProductFilter();

  const tableRecords = products?.map((item) => {
    return {
      id: item.productId,
      productName: item.productName,
      description: item.description,
      discount: item.discount,
      image: item.image,
      price: item.price,
      quantity: item.quantity,
      specialPrice: item.specialPrice,
    };
  });

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setOpenUpdateModal(true);
  };

  const handelDelete = (product) => {
    setSelectedProduct(product);
    setOpenDeleteModal(true);
  };

  const handleImageUpload = (product) => {
    setSelectedProduct(product);
    setOpenImageUploadModal(true);
  };

  const handleProductView = (product) => {
    setSelectedProduct(product);
    setOpenProductViewModal(true);
  };

  const handlePaginationChange = (paginationModel) => {
    const page = paginationModel.page + 1;
    setCurrentPage(page);
    params.set("page", page.toString());
    navigate(`${pathname}?${params}`);
  };

  const onDeleteHandler = () => {
    dispatch(
      deleteProduct(
        setLoader,
        selectedProduct?.id,
        toast,
        setOpenDeleteModal,
        isAdmin
      )
    );
  };

  return (
    <div>
      <div className="pt-6 pb-10 flex justify-end">
        <button
          onClick={() => setOpenAddModal(true)}
          className="bg-custom-blue hover:bg-blue-600 text-white font-semibold py-2 px-4 flex items-center gap-2 rounded-md shadow-md transition-colors hover:text-slate-300 duration-300"
        >
          <MdAddShoppingCart className="text-xl" /> Add Product
        </button>
      </div>

      {!emptyProducts && (
        <h1 className="text-slate-800 text-3xl text-center font-bold pb-6 uppercase">
          All Products
        </h1>
      )}

      {isLoading ? (
        <Loader />
      ) : (
        <>
          {emptyProducts ? (
            <div className="flex flex-col items-center justify-center text-gray-600 py-10">
              <FaBoxOpen size={50} className="mb-3" />
              <h2 className="text-2xl font-semibold">No product created yet</h2>
            </div>
          ) : (
            <div className="max-w-full">
              <DataGrid
                className="w-full"
                rows={tableRecords}
                columns={adminProductTableColumn(
                  handleEdit,
                  handelDelete,
                  handleImageUpload,
                  handleProductView
                )}
                paginationMode="server"
                rowCount={pagination?.totalElements || 0}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: pagination?.pageSize || 10,
                      page: currentPage - 1,
                    },
                  },
                }}
                onPaginationModelChange={handlePaginationChange}
                disableRowSelectionOnClick
                disableColumnResize
                pageSizeOptions={[pagination?.pageSize || 10]}
                pagination
                paginationOptions={{
                  showFirstButton: true,
                  showLastButton: true,
                  hideNextButton: currentPage === pagination?.totalPages,
                }}
              />
            </div>
          )}
        </>
      )}

      <Modal
        open={openUpdateModal || openAddModal}
        setOpen={openUpdateModal ? setOpenUpdateModal : setOpenAddModal}
        title={openUpdateModal ? "Update Product" : "Add Product"}
      >
        <AddProductForm
          setOpen={openUpdateModal ? setOpenUpdateModal : setOpenAddModal}
          product={selectedProduct}
          isAdmin={isAdmin}
          update={openUpdateModal}
        />
      </Modal>

      <Modal
        open={openImageUploadModal}
        setOpen={setOpenImageUploadModal}
        title="Add Product Image"
      >
        <ImageUploadForm
          setOpen={setOpenImageUploadModal}
          product={selectedProduct}
          isAdmin={isAdmin}
        />
      </Modal>

      <DeleteModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        title="Delete Product"
        onDeleteHandler={onDeleteHandler}
        loader={loader}
      />

      <ProductViewModel
        open={openProductViewModal}
        setOpen={setOpenProductViewModal}
        product={selectedProduct}
      />
    </div>
  );
};

export default AdminProducts;
