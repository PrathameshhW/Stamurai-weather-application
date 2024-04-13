"use client";

import Loader from "@/components/ui/loader";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { WeatherBackgrounds } from "./weatherData";

const Page = () => {
  const [weather, setWeather] = useState<any>({});
  const [bgUrl, setBgUrl] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);
  const [date] = useState(new Date().toISOString().split("T")[0]);

  const searchParams = useSearchParams();
  const city = searchParams.get("city");
  const lon = searchParams.get("lon");
  const lat = searchParams.get("lat");

  const WEATHER_API = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=4f1ea9ca14035193b22b09dd592bd5b6&units=metric`;

  const getWeather = async () => {
    try {
      const response = await fetch(WEATHER_API);
      const data = await response.json();
      setWeather(data);
      console.log(data);
      setVideoBacground(data.weather[0].main);
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  const setVideoBacground = (condition: string) => {
    if (condition === "Rain") {
      setBgUrl(WeatherBackgrounds.rain);
    } else if (condition === "Thunderstorm") {
      setBgUrl(WeatherBackgrounds.thunderstorm);
    } else if (condition === "Clear") {
      setBgUrl(WeatherBackgrounds.clear);
    } else if (condition === "Clouds") {
      setBgUrl(WeatherBackgrounds.clouds);
    } else if (condition === "Snow") {
      setBgUrl(WeatherBackgrounds.snow);
    } else if (condition === "Drizzle") {
      setBgUrl(WeatherBackgrounds.drizzle);
    } else {
      setBgUrl(WeatherBackgrounds.other);
    }
  };

  useEffect(() => {
    getWeather();
  }, []);

  return isLoading ? (
    <div className="flex items-center justify-center h-screen">
      <Loader />
    </div>
  ) : (
    <div
      className={`mx-auto h-screen bg-cover bg-no-repeat flex justify-center`}
    >
      <video
        autoPlay
        loop
        muted
        className="absolute w-auto min-w-full h-screen object-cover"
      >
        <source src={bgUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="flex flex-wrap items-center justify-center p-4">
        <div className="w-full px-2">
          <div className="bg-gray-900 text-white relative min-w-0 break-words rounded-lg overflow-hidden shadow-sm mb-4 w-full  dark:bg-gray-600">
            <div className="px-6 py-6 relative">
              <div className="flex flex-col sm:flex-row mb-4 sm:justify-between sm:items-center">
                <div className="">
                  <h5 className="mb-0 font-medium text-xl">
                    {city}, {weather.sys.country}
                  </h5>
                  <h6 className="mb-0">{date}</h6>
                  <span className="flex flex-row items-center gap-x-3 my-3 text-sm">
                    {weather.weather[0].description.toUpperCase()}
                    <Image
                      src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                      width="40"
                      height="40"
                      alt="/"
                    />
                  </span>
                </div>
                <div className="text-right">
                  <h3 className="font-bold text-6xl mb-0">
                    <span>
                      {weather.main.temp}
                      <sup>&deg;C</sup>
                    </span>
                  </h3>
                </div>
              </div>
              <div className="block sm:flex justify-between items-center flex-wrap">
                <div className="w-full sm:w-1/2">
                  <div className="flex mb-2 justify-between items-center">
                    <span>Temp</span>
                    <small className="px-2 inline-block">
                      {weather.main.temp}&nbsp;&deg;
                    </small>
                  </div>
                </div>
                <div className="w-full sm:w-1/2">
                  <div className="flex mb-2 justify-between items-center">
                    <span>Feels like</span>
                    <small className="px-2 inline-block">
                      {weather.main.feels_like}&nbsp;&deg;
                    </small>
                  </div>
                </div>
                <div className="w-full sm:w-1/2">
                  <div className="flex mb-2 justify-between items-center">
                    <span>Temp min</span>
                    <small className="px-2 inline-block">
                      {weather.main.temp_min}&nbsp;&deg;
                    </small>
                  </div>
                </div>
                <div className="w-full sm:w-1/2">
                  <div className="flex mb-2 justify-between items-center">
                    <span>Temp max</span>
                    <small className="px-2 inline-block">
                      {weather.main.temp_max}&nbsp;&deg;
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
