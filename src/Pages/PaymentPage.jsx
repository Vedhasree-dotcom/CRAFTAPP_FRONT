import { useParams, useNavigate } from "react-router-dom";
import { PayPalButtons } from "@paypal/react-paypal-js";
import api from "../Services/api";
import { useAuth } from "../Context/AuthContext";

export default function PaymentPage() {
  const { craftId } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();   

  const createOrder = async () => {
    const res = await api.post(
      "/payments/create-order",
      { craftId },
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
    );

    return res.data.orderId;
  };

  const onApprove = async (data) => {
    await api.post(
      "/payments/capture-order",
      {
        orderId: data.orderID,
        craftId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

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