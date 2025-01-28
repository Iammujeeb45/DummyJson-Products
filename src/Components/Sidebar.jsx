import { useEffect, useState } from "react";

const Sidebar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products/category-list")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  return (
    <div className="w-full h-fit bg-purple-300 p-4">
      <h2 className="text-xl font-extrabold uppercase text-center mb-4 text-black">
        Categories
      </h2>
      <ul className="space-y-2 capitalize">
        {categories.map((category, index) => (
          <li
            key={index}
            className="p-2 bg-purple-500 text-white rounded hover:bg-purple-600 cursor-pointer"
          >
            {category.replace("-", " ")}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
