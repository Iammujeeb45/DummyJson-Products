import { useEffect, useState } from "react";
import Loader from "./Loader";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "../Store/Slice";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const productCounts = useSelector((state) => state.counter.productCounts);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setTimeout(() => {
          setProducts(data.products);
          setLoading(false);
        }, 1000);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center text-xl mt-10 ">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex">
      <div className="w-60  text-white h-fit ">
        <Sidebar />
      </div>

      <div className="flex-1 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="rounded-lg shadow-md p-4 hover:shadow-lg hover:cursor-pointer hover:scale-105 transition duration-300 ease-in-out"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-lg font-bold mb-2">{product.title}</h2>
              <p className="text-gray-600 mb-2 truncate">
                {product.description}
              </p>
              <p className="font-bold text-blue-600 mb-2">${product.price}</p>
              <div className="flex gap-2 items-center">
                <button
                  className="bg-blue-500 text-white size-fit rounded hover:bg-blue-600 "
                  onClick={() => dispatch(decrement(product.id))}
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
                <span>{productCounts[product.id]}</span>
                <button
                  className="bg-blue-500 text-white size-fit rounded hover:bg-blue-600"
                  onClick={() => dispatch(increment(product.id))}
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
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
