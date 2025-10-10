import { useForm } from "react-hook-form";
import InputField from "../../shared/InputField";
import { useEffect, useState } from "react";
import Spinners from "../../shared/Spinners";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { updateProductFromDashboard } from "../../../store/actions";
import toast from "react-hot-toast";

const AddProductForm = ({ setOpen, product, update = false }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (update && product) {
      setValue("productName", product?.productName);
      setValue("price", product?.price);
      setValue("quantity", product?.quantity);
      setValue("discount", product?.discount);
      setValue("specialPrice", product?.specialPrice);
      setValue("description", product?.description);
    }
  }, [update, product]);

  const saveProductHandler = (data) => {
    if (!update) {
      // Create new product logic
    } else {
      const sendData = { ...data, id: product.id };
      dispatch(
        updateProductFromDashboard(sendData, toast, reset, setLoader, setOpen)
      );
    }
  };

  return (
    <div className="py-5 relative h-full">
      <form className="space-y-4" onSubmit={handleSubmit(saveProductHandler)}>
        <div className="flex md:flex-row flex-col gap-4 w-full">
          <InputField
            label="Product Name"
            required
            id="productName"
            type="text"
            placeholder="Product Name"
            message="This field is required"
            register={register}
            errors={errors}
          />
        </div>

        <div className="flex md:flex-row flex-col gap-4 w-full">
          <InputField
            label="Price"
            required
            id="price"
            type="number"
            message="This field is required"
            placeholder="Product Price"
            register={register}
            errors={errors}
          />

          <InputField
            label="Quantity"
            required
            id="quantity"
            type="number"
            message="This field is required"
            placeholder="Product Quantity"
            register={register}
            errors={errors}
          />
        </div>

        <div className="flex md:flex-row flex-col gap-4 w-full">
          <InputField
            label="Discount"
            required
            id="discount"
            type="number"
            placeholder="Product Discount"
            message="This field is required"
            register={register}
            errors={errors}
          />

          <InputField
            label="Special Price"
            required
            id="specialPrice"
            type="number"
            placeholder="Product Special Price"
            message="This field is required"
            register={register}
            errors={errors}
          />
        </div>

        <div className="flex flex-col gap-4 w-full">
          <label
            htmlFor="desc"
            className="font-semibold text-slate-800 text-sm"
          >
            Description
          </label>

          <textarea
            id="desc"
            rows={5}
            placeholder={"Add product description...."}
            className={` px-4 py-2 w-full border outline-hidden bg-transparent text-slate-800 rounded-md placeholder:text-slate-400 ${
              errors["description"]?.message
                ? "border-red-500"
                : "border-slate-700"
            }`}
            {...register("description", {
              required: { value: true, message: "Description is required" },
            })}
          />

          {errors["description"]?.message && (
            <p className="text-sm font-semibold text-red-600 mt-0">
              {errors["description"]?.message}
            </p>
          )}
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
              "Update"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
