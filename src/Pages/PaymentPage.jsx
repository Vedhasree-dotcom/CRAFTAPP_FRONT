import { useParams, useNavigate } from "react-router-dom";
import { PayPalButtons } from "@paypal/react-paypal-js";
import api from "../Services/api";

export default function PaymentPage() {
  const { craftId } = useParams();
  const navigate = useNavigate();

  const createOrder = async () => {
    const res = await api.post("/payments/create-order", { craftId });
    return res.data.orderId;
  };

  const onApprove = async (data) => {
    await api.post("/payments/capture-order", {
      orderId: data.orderID,
      craftId
    });

    navigate(`/crafts/${craftId}/tutorial`);
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Complete Payment</h2>

      <PayPalButtons
        createOrder={createOrder}
        onApprove={onApprove}
      />
    </div>
  );
}