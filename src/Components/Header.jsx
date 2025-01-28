import { useState } from "react";
import { useSelector } from "react-redux";
import Loader from "./Loader";

const Header = () => {
  const productCounts = useSelector(
    (state) => state.counter.productCounts || {}
  );

  const totalcount = Object.values(productCounts).reduce((a, b) => a + b, 0);

  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://dummyjson.com/products/search?q=${searchQuery}`
      );
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      setProducts(data.products);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const exitHandler = () => {
    setSearchQuery("");
    setProducts([]);
  };

  return (
    <>
      <section className="w-full h-20 bg-purple-300 flex justify-evenly items-center">
        <div className="flex justify-evenly items-center w-full h-full">
          <div className="flex w-1/3 h-full ">
            <div className="flex flex-col items-center mt-2 pl-5 text-gray-900 ">
              <span className="flex i text-5xl font-bold">Essentials</span>
              <div className=" w-full justify-end flex">
                <span className=" text-4xl font-bold pl-5">Emporium</span>
              </div>
            </div>
          </div>

          <div className="flex w-1/3 justify-center">
            <span className="text-3xl font-bold uppercase">Products</span>
          </div>

          <div className="flex w-1/3 justify-evenly items-center">
            <div className="w-2/3">
              <form className="max-w-md mx-auto" onSubmit={handleSearch}>
                <label
                  htmlFor="default-search"
                  className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                  Search
                </label>
                <div className="relative">
                  <input
                    type="search"
                    id="default-search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Search Products..."
                    required
                  />

                  <button
                    type="submit"
                    className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700"
                  >
                    <svg
                      className="size-5 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="white"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
            <button
              type="button"
              className="text-white bg-red-700 hover:bg-red-900  font-medium rounded-lg text-sm p-3  "
              onClick={exitHandler}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button
              type="button"
              className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
              </svg>
              <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                <span>{totalcount}</span>
              </div>
            </button>
          </div>
        </div>
      </section>

      <section className="bg-purple-300  py-6">
        <div className="container mx-auto px-4">
          {loading && (
            <div className="text-center text-lg font-medium text-gray-600">
              <Loader />
            </div>
          )}
          {error && (
            <div className="text-center text-red-500 font-medium">{error}</div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg hover:cursor-pointer hover:scale-105 transition duration-300 ease-in-out"
              >
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h2 className="text-lg font-bold text-gray-800 mb-2">
                  {product.title}
                </h2>
                <p className="text-gray-600 text-sm mb-2">
                  {product.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-purple-700 font-bold text-lg">
                    ${product.price}
                  </span>
                  <div className="flex gap-2 ">
                    <button
                      className="bg-blue-500 text-white size-fit rounded hover:bg-blue-600 "
                      // onClick={() => dispatch(decrement(product.id))}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 12h14"
                        />
                      </svg>
                    </button>
                    {/* <span>{productCounts[product.id]}</span> */}
                    <span>0</span>

                    <button
                      className="bg-blue-500 text-white size-fit rounded hover:bg-blue-600"
                      // onClick={() => dispatch(increment(product.id))}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Header;
