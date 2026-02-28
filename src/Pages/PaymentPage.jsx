import { useParams, useNavigate, Link } from "react-router-dom";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useState, useEffect } from "react";
import api from "../Services/api";
import { useAuth } from "../Context/AuthContext";

export default function PaymentPage() {
  const { craftId } = useParams();
  const navigate = useNavigate();
  const [craft, setCraft] = useState(null);
  const { token } = useAuth();
  

  useEffect(() => {
  const fetchCraft = async () => {
    try {
      const res = await api.get(`/crafts/${craftId}`);
      setCraft(res.data);
    } catch (err) {
      console.error("Error fetching craft:", err);
    }
  };

  fetchCraft();
}, [craftId]);

  const createOrder = async () => {
    const res = await api.post(
      "/payments/create-order",
      { craftId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log("Order response:", res.data); 

    return res.data.orderId;
  };

  const onApprove = async (data) => {
    await api.post(
      "/payments/capture-order",
      { orderId: data.orderID, craftId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    navigate(`/crafts/${craftId}/tutorial`);
  };

  return (
    <div className="pay-page">

      <div className="pay-left">
        <div className="pay-left-inner">
          <Link to="/" className="pay-brand">CraftMate</Link>
          <p className="pay-brand-tag">Unlock your creative potential</p>

          <div className="pay-decor">
            <div className="pay-decor-card pay-card-1">
              <div className="pay-decor-line" />
              <div className="pay-decor-line pay-line-short" />
            </div>
            <div className="pay-decor-card pay-card-2">
              <div className="pay-decor-line" />
              <div className="pay-decor-line pay-line-short" />
            </div>
            <div className="pay-decor-card pay-card-3">
              <div className="pay-decor-dot" />
            </div>
          </div>

          <div className="pay-trust">
            <div className="pay-trust-item">
              <span className="pay-trust-icon">✦</span>
              <div>
                <p className="pay-trust-title">Instant Access</p>
                <p className="pay-trust-sub">Start your tutorial immediately after payment</p>
              </div>
            </div>
            <div className="pay-trust-item">
              <span className="pay-trust-icon">◎</span>
              <div>
                <p className="pay-trust-title">HD Tutorial Included</p>
                <p className="pay-trust-sub">Step-by-step guide with materials list</p>
              </div>
            </div>
            <div className="pay-trust-item">
              <span className="pay-trust-icon">◈</span>
              <div>
                <p className="pay-trust-title">Secure Payment</p>
                <p className="pay-trust-sub">Powered by PayPal — safe &amp; encrypted</p>
              </div>
            </div>
          </div>

          <div className="pay-left-footer">
            <p>"Every great craft starts<br />with a single step."</p>
          </div>
        </div>
      </div>

      <div className="pay-right">
        <div className="pay-form-wrap">

          <Link to={`/crafts/${craftId}`} className="pay-back">← Back to Craft</Link>

          <span className="pay-eyebrow">Checkout</span>
          <h1 className="pay-title">Complete <em>Payment</em></h1>
          <p className="pay-subtitle">
            You're one step away from unlocking the full tutorial and materials guide.
          </p>

          <div className="pay-paypal-card">
            <div className="pay-paypal-header">
              <span className="pay-secure-badge">🔒 Secure Checkout</span>
            </div>

            <div className="pay-paypal-body">

              {craft && (
                <div className="pay-summary">
                  <h3 className="pay-craft-title">{craft.title}</h3>
                  <p className="pay-craft-price">
                    ${craft.price.toFixed(2)}
                  </p>
                </div>
              )}

              <PayPalButtons
                createOrder={createOrder}
                onApprove={onApprove}
                style={{
                  layout: "vertical",
                  color: "gold",
                  shape: "pill",
                  label: "pay",
                }}
              />
            </div>

            <p className="pay-paypal-note">
              By completing this payment you agree to our{" "}
              <Link to="/terms" className="pay-link">Terms of Service</Link>.
              All transactions are secured and encrypted.
            </p>
          </div>

          <div className="pay-badges">
            <div className="pay-badge">✦ Instant Access</div>
            <div className="pay-badge">◎ HD Tutorial</div>
            <div className="pay-badge">◈ Secure Pay</div>
          </div>

        </div>
      </div>

    </div>
  );
}