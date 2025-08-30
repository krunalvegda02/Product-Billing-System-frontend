const OrderView = ({ orderItems = [], placeOrder, clearOrderItems, totalAmount }) => {
  // console.log(orderItems);

  return (
    <div className="w-full max-w-md p-4 bg-white rounded-xl shadow-lg">
      <h3 className="text-xl font-semibold mb-4 text-center border-b pb-2">Your Order</h3>

      {orderItems.length === 0 ? (
        <p className="text-center text-gray-500">No items in the order.</p>
      ) : (
        <div className="space-y-4">
          {orderItems.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <img src={item.thumbnail || "https://via.placeholder.com/60"} alt={item.name} className="w-16 h-16 object-cover rounded" />
              <div className="flex-1">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-600">
                  {item.quantity} x ₹{item.price}
                </p>
              </div>
              <div className="font-semibold">₹{item.quantity * item.price}</div>
            </div>
          ))}
        </div>
      )}

      <hr className="my-4" />

      <div className="flex justify-between items-center mb-4">
        <span className="text-lg font-semibold">Total</span>
        <span className="text-lg font-bold text-green-600">₹{totalAmount}</span>
      </div>

      <button
        onClick={placeOrder}
        disabled={orderItems.length === 0}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded disabled:opacity-50"
      >
        Place Order
      </button>
    </div>
  );
};

export default OrderView;
