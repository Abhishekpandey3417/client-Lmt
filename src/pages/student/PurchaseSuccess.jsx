import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useEffect } from "react";
import { useConfirmPurchaseMutation } from "@/features/api/purchaseApi";
import { useLoadUserQuery } from "@/features/api/authApi";

const PurchaseSuccess = () => {
  const [searchParams] = useSearchParams();
  const purchaseId = searchParams.get("purchaseId");

  const [confirmPurchase] = useConfirmPurchaseMutation();

  // Start the query immediately so refetch will work
  const { refetch } = useLoadUserQuery(undefined, { skip: false });

  useEffect(() => {
    if (!purchaseId) return;

    const confirm = async () => {
      try {
        await confirmPurchase({ purchaseId }).unwrap();

        // Only call refetch if it exists
        if (refetch) await refetch();
      } catch (err) {
        console.error("Confirm purchase failed", err);
      }
    };

    confirm();
  }, [purchaseId, confirmPurchase, refetch]);

  return (
    <div className="max-w-7xl mx-auto p-4 mt-20">
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow p-6 text-center">
        <CheckCircle className="mx-auto text-green-600 mb-4" size={48} />

        <h1 className="text-2xl font-bold mb-2">Purchase Successful</h1>

        <p className="text-gray-600 mb-4">
          Your payment was completed successfully. You now have full access to
          the course.
        </p>

        {purchaseId && (
          <p className="text-sm text-gray-500 mb-6">
            Purchase ID: <span className="font-medium">{purchaseId}</span>
          </p>
        )}

        <div className="flex gap-3 justify-center">
          <Link to="/profile">
            <Button variant="outline">Go to Profile</Button>
          </Link>

          <Link to="/">
            <Button>Continue Browsing</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PurchaseSuccess;
