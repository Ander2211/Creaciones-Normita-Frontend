import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="relative w-full h-[40vh] rounded-xl shadow-lg overflow-hidden bg-gradient-to-r from-pink-50 via-white to-purple-50">
      <div className="absolute inset-0 bg-white/30 backdrop-blur-sm flex flex-col items-center justify-center text-center px-4">
        <h1
          className="text-3xl md:text-5xl font-bold text-gray-900 drop-shadow-lg"
          tabIndex="-1"
        >
          Creaciones Normita
        </h1>
        <p className="mt-3 text-lg md:text-xl text-gray-800">
          Viste tus momentos más especiales con elegancia ✨
        </p>
        <p className="mt-2 text-base md:text-lg text-pink-400 font-medium">
          Envíos internacionales a EE.UU. 🇺🇸 y Europa 🇪🇺
        </p>
        <Link
          to="/productos"
          className="mt-5 bg-pink-200 text-gray-900 px-6 py-2 rounded-lg font-medium
                       hover:bg-purple-200 transition transform hover:scale-105 duration-300 inline-block"
        >
          Ver catálogo completo
        </Link>
      </div>
    </section>
  );
};



export default Home;
