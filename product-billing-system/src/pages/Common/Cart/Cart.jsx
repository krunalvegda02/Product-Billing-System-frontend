import React from 'react'
import CartView from './CartView'

const Cart = () => {
  return (
    <div>
    <CartView
    user={{ username: "Krunal", email: "krunal@email.com", contact: "9876543210" }}
    orderItems={[
      { id: 1, name: "Paneer Tikka", price: 250, quantity: 2, thumbnail: "" },
      { id: 2, name: "Butter Naan", price: 40, quantity: 4, thumbnail: "" },
      { id: 2, name: "Butter Naan", price: 40, quantity: 4, thumbnail: "" },

      { id: 2, name: "Butter Naan", price: 40, quantity: 4, thumbnail: "" },

      { id: 2, name: "Butter Naan", price: 40, quantity: 4, thumbnail: "" },

    ]}
    paymentMethods={["UPI", "Credit Card", "Cash on Delivery"]}
    onPaymentChange={(method) => console.log("Selected:", method)}
    onConfirmPayment={(method) => console.log("Confirmed with:", method)}
  />

    </div>
  )
}

export default Cart
