import { useEffect, useState } from "react";
import { FaBoxOpen, FaListAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../shared/Loader";
import { DataGrid } from "@mui/x-data-grid";
import { adminCategoryTableColumn } from "../../helper/tableColumn";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import useCategoryFilter from "../../../hooks/useCategoryFilter";
import Modal from "../../shared/Modal";
import AddCategoryForm from "./AddCategoryForm";
import DeleteModal from "../../shared/DeleteModal";
import { deleteCategory } from "../../../store/actions";
import toast from "react-hot-toast";

const Category = () => {
  // const categories = [
  //   {
  //     categoryId: 1,
  //     categoryName: "Smartwatch",
  //   },
  //   {
  //     categoryId: 2,
  //     categoryName: "Headphone",
  //   },
  //   {
  //     categoryId: 3,
  //     categoryName: "Laptop",
  //   },
  // ];

  // const pagination = {
  //   pageNumber: 0,
  //   pageSize: 50,
  //   totalElements: 11,
  //   totalPages: 1,
  //   lastPage: true,
  // };

  const { categories, pagination } = useSelector((state) => state.products);

  // const { isLoading, errorMessage } = useSelector((state) => state.errors);

  const [selectedCategory, setSelectedCategory] = useState("");

  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  const [openAddModal, setOpenAddModal] = useState(false);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  // const [loader, setLoader] = useState(false);
  const { categoryLoader, errorMessage } = useSelector((state) => state.errors);

  const emptyCategory = !categories || categories?.length === 0;

  const [currentPage, setCurrentPage] = useState(
    pagination?.pageNumber + 1 || 1
  );

  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = useLocation().pathname;
  const navigate = useNavigate();

  const tableRecords = categories?.map((item) => {
    return {
      id: item.categoryId,
      categoryName: item.categoryName,
    };
  });

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setOpenUpdateModal(true);
  };

  const handleDelete = (category) => {
    setSelectedCategory(category);
    setOpenDeleteModal(true);
  };

  const handlePaginationChange = (paginationModel) => {
    const page = paginationModel.page + 1;
    setCurrentPage(page);
    params.set("page", page.toString());
    navigate(`${pathname}?${params}`);
  };

  const onDeleteHandler = () => {
    dispatch(deleteCategory(selectedCategory?.id, toast, setOpenDeleteModal));
  };

  useCategoryFilter();

  return (
    <div>
      <div className="pt-6 pb-10 flex justify-end">
        <button
          onClick={() => setOpenAddModal(true)}
          className="bg-custom-blue hover:bg-blue-600 text-white font-semibold py-2 px-4 flex items-center gap-2 rounded-md shadow-md transition-colors hover:text-slate-300 duration-300"
        >
          <FaListAlt className="text-xl" /> Add Category
        </button>
      </div>

      {!emptyCategory && (
        <h1 className="text-slate-800 text-3xl text-center font-bold pb-6 uppercase">
          All Categories
        </h1>
      )}

      {categoryLoader ? (
        <Loader />
      ) : (
        <>
          {emptyCategory ? (
            <div className="flex flex-col items-center justify-center text-gray-600 py-10">
              <FaBoxOpen size={50} className="mb-3" />
              <h2 className="text-2xl font-semibold">
                No Categories cateated yet
              </h2>
            </div>
          ) : (
            <div className="max-w-full ms-auto">
              <DataGrid
                className="w-full"
                rows={tableRecords}
                columns={adminCategoryTableColumn(handleEdit, handleDelete)}
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
              ></DataGrid>
            </div>
          )}
        </>
      )}

      <Modal
        open={openUpdateModal || openAddModal}
        setOpen={openUpdateModal ? setOpenUpdateModal : setOpenAddModal}
        title={openUpdateModal ? "Update Category" : "Add Catogry"}
      >
        <AddCategoryForm
          setOpen={openUpdateModal ? setOpenUpdateModal : setOpenAddModal}
          loader={categoryLoader}
          category={selectedCategory}
          update={openUpdateModal}
        />
      </Modal>

      <DeleteModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        title="Delete category"
        onDeleteHandler={onDeleteHandler}
        loader={categoryLoader}
      />
    </div>
  );
};

export default Category;
