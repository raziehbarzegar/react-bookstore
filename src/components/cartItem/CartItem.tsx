function CartItem() {
  return (
    <div className="shadow-md rounded-lg p-4 flex flex-col sm:flex-row sm:items-center gap-4 bg-white dark:bg-gray-800">
      <div className="w-24 sm:w-32">
        <img
          src="/books/book1.jpg"
          alt="Who's there?"
          className="rounded-md w-full h-auto border border-gray-300"
        />
      </div>

      <div className="flex flex-col gap-3 w-full">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
          Who's there?
        </h3>

        <div className="flex items-center gap-2">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
            +
          </button>
          <span className="text-lg font-medium text-gray-700 dark:text-gray-200">4</span>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
            -
          </button>
        </div>

        <button className="w-fit bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-full text-sm mt-2">
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartItem;
