import { addToCartApi } from "../helpers/AddToCart";
import { toast } from "react-toastify";
const addToCart = async (e, id) => {
  e?.stopPropagation();
  e?.preventDefault();
  console.log("call addToCart");

  try {
    const responseData = await addToCartApi(id);
    console.log("AddToCart: ", responseData);
    if (responseData?.success) {
      toast.success(responseData?.message);
    }
    if (responseData?.error) {
      toast.error(responseData?.message);
    }
  } catch (error) {}
};

export default addToCart;
