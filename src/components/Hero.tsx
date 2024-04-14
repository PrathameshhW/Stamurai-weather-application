import { Github } from "lucide-react";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <section className="bg-gray-900 h-screen flex items-center justify-center">
      <div className="py-8 px-4 mx-auto max-w-screen-2xl text-center lg:py-16 lg:px-12">
        <Link
          href="https://www.prathamesh.codes"
          target="_blank"
          className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm  rounded-full bg-gray-800 text-white  hover:bg-gray-700"
          role="alert"
        >
          <span className="text-xs bg-primary-600 rounded-full text-white px-4 py-1.5 mr-3">
            New
          </span>{" "}
          <span className="text-sm font-medium">Checkout my Portfolio</span>
          <svg
            className="ml-2 w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </Link>
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl text-white">
          Welcome to Weather application Assignment
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
          This assignment given to me by{" "}
          <Link
            className="text-white hover:underline"
            href="https://stamurai.com/"
            target="_blank"
          >
            stamurai
          </Link>
          . In this application I've given 2 api's to work with, first one is to
          load the city data and second one is to load the weather data. Read
          the Full{" "}
          <Link
            className="text-white hover:underline"
            href="https://docs.google.com/document/d/e/2PACX-1vTG4On_enSQBF1X_Y-q3l_rInHLuRomvF0nZfpNUeSi1QWHSKmrPvqkx8rpOl2T80wn3XdluKOzfkjy/pub"
            target="_blank"
          >
            description
          </Link>
          .
        </p>
        <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <Link
            href="/home"
            className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
          >
            Get started
            <svg
              className="ml-2 -mr-1 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </Link>
          <Link
            href="https://github.com/PrathameshhW/Stamurai-weather-application"
            target="_blank"
            className="inline-flex justify-center items-center bg-gray-600 py-3 px-5 text-base font-medium text-center space-x-2  rounded-lg border   focus:ring-4  text-white border-gray-700 hover:bg-gray-700 focus:ring-gray-800"
          >
            <Github />
            <span>Github Repo</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
