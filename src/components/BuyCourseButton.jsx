import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { useCreateCheckoutSessionMutation } from "@/features/api/purchaseApi";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const BuyCourseButton = ({ courseId }) => {
  const [
    createCheckoutSession,
    { data, isLoading, isSuccess, isError, error },
  ] = useCreateCheckoutSessionMutation();

  const purchaseCourseHandler = async () => {
    try {
      // Pass courseId inside an object to match the API body
      await createCheckoutSession({ courseId }).unwrap();
    } catch (err) {
      console.error("Checkout error:", err);
      toast.error(err?.data?.message || "Something went wrong while creating checkout session");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      if (data?.checkoutUrl) {
        window.location.href = data.checkoutUrl; // Redirect to Stripe checkout
      } else {
        toast.error("Failed to create checkout session.");
      }
    }
    if (isError) {
      toast.error(error?.data?.message || "Something went wrong!");
    }
  }, [isSuccess, data, isError, error]);

  return (
    <Button
      className="w-full -ml-12"
      onClick={purchaseCourseHandler}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </>
      ) : (
        "Purchase Course"
      )}
    </Button>
  );
};

export default BuyCourseButton;
