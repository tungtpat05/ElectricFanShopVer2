// import React from "react";
// import { NavLink } from "react-router-dom";
// import { FaSearch } from "react-icons/fa";
// import { useState, useRef, useEffect } from "react";

// const Navbar = () => {
//   const [categories, setCategories] = useState([]);

//   const [open, setOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       const apiUrl = "/api/categories";

//       try {
//         const res = await fetch(apiUrl);
//         const data = await res.json();
//         setCategories(data);
//       } catch (error) {
//         console.log("Error fetching data", error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const linkClass = ({ isActive }) =>
//     isActive
//       ? "text-white bg-black hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
//       : "text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2";

//   return (
//     <nav className="bg-indigo-700 border-b border-indigo-500">
//       <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
//         <div className="flex h-20 items-center justify-between">
//           <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
//             {/* Logo */}
//             <NavLink className="flex flex-shrink-0 items-center mr-4" to="/">
//               <span className="hidden md:block text-white text-2xl font-bold ml-2">
//                 Tung
//               </span>
//               {/* Menu func */}
//             </NavLink>
//             <div>
//               <div className="flex space-x-2">
//                 <NavLink to="/" className={linkClass}>
//                   Home
//                 </NavLink>
//                 <NavLink to="/products" className={linkClass}>
//                   Products
//                 </NavLink>
//                 {/* Dropdown for categories */}
//                 <div className="relative" ref={dropdownRef}>
//                   <button
//                     onClick={() => setOpen(!open)}
//                     className="text-white hover:bg-gray-900 rounded-md px-3 py-2"
//                   >
//                     Danh mục sản phẩm
//                   </button>

//                   {open && (
//                     <div className="absolute bg-white mt-2 w-44 rounded-md shadow-lg z-50">
//                       {categories.map((c) => (
//                         <NavLink
//                           key={c.id}
//                           to={`/category/${c.id}`}
//                           onClick={() => setOpen(false)}
//                           className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
//                         >
//                           {c.categoryName}
//                         </NavLink>
//                       ))}
//                     </div>
//                   )}
                  
//                 </div>
//               </div>
//             </div>
//             {/* Search box */}
//             <div className="relative hidden md:block md:ml-auto">
//               <input
//                 type="text"
//                 placeholder="Search product..."
//                 className="pl-10 pr-3 py-2 rounded-md text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
//               />
//               <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white pointer-events-none" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
