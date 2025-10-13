import { Button } from "@mui/material";
import Spinners from "../../shared/Spinners";
import InputField from "../../shared/InputField";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addNewCategoryFromDashboard,
  updateCategoryFromDashboard,
} from "../../../store/actions";
import toast from "react-hot-toast";

const AddCategoryForm = ({ setOpen, loader, category, update = false }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const dispatch = useDispatch();

  const saveCategoryHandler = (data) => {
    if (!update) {
      const sendData = { ...data };
      dispatch(addNewCategoryFromDashboard(sendData, toast, reset, setOpen));
    } else {
      const sendData = { ...data, id: category.id };
      dispatch(updateCategoryFromDashboard(sendData, toast, reset, setOpen));
    }
  };

  useEffect(() => {
    if (category && update) {
      setValue("categoryName", category?.categoryName);
    }
  }, [update, category]);

  return (
    <div className="py-5 relative h-full">
      <form className="space-y-4" onSubmit={handleSubmit(saveCategoryHandler)}>
        <div className="flex md:flex-row flex-col gap-4 w-full">
          <InputField
            label="Category Name"
            required
            id="categoryName"
            type="text"
            placeholder="Category Name"
            message="This field is required"
            register={register}
            errors={errors}
          />
        </div>

        <div className="flex w-full justify-between items-center absolute bottom-14">
          <Button
            disabled={loader}
            onClick={() => setOpen(false)}
            variant="outlined"
            className="text-white py-[10px] px-4 text-sm font-medium"
          >
            Cancel
          </Button>
          <Button
            disabled={loader}
            type="submit"
            variant="contained"
            color="primary"
            className="bg-custom-blue text-white py-[10px] px-4 text-sm font-medium"
          >
            {loader ? (
              <div className="flex gap-2 items-center">
                <Spinners /> Loading...
              </div>
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddCategoryForm;
