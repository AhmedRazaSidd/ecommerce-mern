import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "../lib/axios";

const stripePromise = loadStripe(
  "pk_test_51RcYkwR3ieS7rZPVaTFFck3Iez0doc7LwRHHsvqp8KeRT2yZICP8hcyl9rKMgzWOPh4Z13vDNxeznljQqwZUCcZB00jPrJXGZy"
);

const OrderSummary = () => {
  const { total, subTotal, coupon, isCouponApplied, cart } = useCartStore();

  const savings = subTotal - total;
  const formattedSubTotal = subTotal?.toFixed(0) || "0";
  const formattedTotal = total?.toFixed(0) || "0";
  const formattedSavings = savings?.toFixed(0) || "0";

  const handlePayment = async () => {
    const stripe = await stripePromise;
    try {
      const res = await axios.post("/payments/create-checkout-session", {
        products: cart,
        couponCode: coupon ? coupon.code : null,
      });

      const session = res.data;

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error("Stripe Checkout error:", result.error);
      }
    } catch (error) {
      console.error("Payment initiation failed:", error);
    }
  };

  return (
    <motion.div
      className="space-y-4 rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-sm sm:p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-xl font-semibold text-emerald-400">Order Summary</p>
      <div className="space-y-4">
        {/* Subtotal */}
        <dl className="flex items-center justify-between gap-4">
          <dt className="text-base font-normal text-gray-300">
            Original Price
          </dt>
          <dd className="text-base font-medium text-white">
            ${formattedSubTotal}
          </dd>
        </dl>

        {/* Savings */}
        {savings > 0 && (
          <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-gray-300">Savings</dt>
            <dd className="text-base font-medium text-emerald-400">
              -${formattedSavings}
            </dd>
          </dl>
        )}

        {/* Applied Coupon */}
        {coupon && isCouponApplied && (
          <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-gray-300">
              Coupon ({coupon.code})
            </dt>
            <dd className="text-base font-medium text-emerald-400">
              -{coupon.discountPercentage}%
            </dd>
          </dl>
        )}

        {/* Total */}
        <dl className="flex items-center justify-between gap-4 border-t border-gray-600 pt-2">
          <dt className="text-base font-bold text-white">Total</dt>
          <dd className="text-base font-bold text-emerald-400">
            ${formattedTotal}
          </dd>
        </dl>

        {/* Checkout Button */}
        <motion.button
          className="flex w-full items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePayment}
        >
          Proceed to Checkout
        </motion.button>

        {/* Continue Shopping Link */}
        <div className="flex items-center justify-center gap-2">
          <span className="text-sm font-normal text-gray-400">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-emerald-400 underline hover:text-emerald-300 hover:no-underline"
            >
              Continue Shopping
              <MoveRight size={16} />
            </Link>
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderSummary;
