import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import Spinners from "../../shared/Spinners";
import InputField from "../../shared/InputField";
import { useDispatch } from "react-redux";
import { addNewSeller } from "../../../store/actions";
import toast from "react-hot-toast";
import { useState } from "react";

const AddSellerForm = ({ setOpen }) => {
  const [loader, setLoader] = useState(false);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const saveSellerHandler = (data) => {
    dispatch(addNewSeller(data, setLoader, toast, reset, setOpen));
  };

  return (
    <div className="py-5 relative h-full">
      <form className="space-y-4" onSubmit={handleSubmit(saveSellerHandler)}>
        <div className="flex md:flex-row flex-col gap-4 w-full">
          <InputField
            label="UserName"
            required
            id="username"
            type="text"
            placeholder="Enter your username"
            message="*UserName is required"
            register={register}
            errors={errors}
          />
        </div>

        <div className="flex md:flex-row flex-col gap-4 w-full">
          <InputField
            label="Email"
            required
            id="email"
            type="email"
            placeholder="Enter your email"
            message="*Email is required"
            register={register}
            errors={errors}
          />
        </div>

        <div className="flex md:flex-row flex-col gap-4 w-full">
          <InputField
            label="Password"
            required
            id="password"
            type="password"
            placeholder="Enter your password"
            message="Password is required"
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
              "Add New Seller"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddSellerForm;
