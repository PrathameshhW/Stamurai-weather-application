"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Combobox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { SquareMenu, X } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import ScrollToTop from "react-scroll-to-top";
import MaxWidthWraper from "./MaxWidthWraper";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const HomePage = () => {
  const [countryData, setCountryData] = useState<any>([]);
  const [offSet, setOffSet] = useState(1);
  const [sortColumn, setSortColumn] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<any>();
  const [valueSelected, setValueSelected] = useState(false);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    name: "",
    country_code: "",
    cou_name_en: "",
    timezone: "",
  });

  useEffect(() => {
    const ogApiUrl = `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=100&offset=${offSet}`;

    const fetchApiData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(ogApiUrl);
        const newApiData = response.data.results;
        setCountryData((data: any) => [...data, ...newApiData]);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    fetchApiData();
  }, [offSet]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight
      ) {
        return;
      }
      setOffSet((prev) => prev + 1);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const handleFilterChange = (column: string, value: string) => {
    setFilters({ ...filters, [column]: value });
  };

  const sortedData = countryData.slice().sort((a: any, b: any) => {
    if (sortColumn) {
      const order = sortOrder === "asc" ? 1 : -1;
      return a[sortColumn].localeCompare(b[sortColumn]) * order;
    }
    return 0;
  });
  const searchedCountryData = countryData.filter((person: any) => {
    const asciiName = person.ascii_name.toLowerCase().replace(/\s+/g, "");
    const couNameEn = person.cou_name_en.toLowerCase().replace(/\s+/g, "");
    const timezone = person.timezone.toLowerCase().replace(/\s+/g, "");

    return (
      query === "" ||
      asciiName.includes(query.toLowerCase().replace(/\s+/g, "")) ||
      couNameEn.includes(query.toLowerCase().replace(/\s+/g, "")) ||
      timezone.includes(query.toLowerCase().replace(/\s+/g, ""))
    );
  });
  const sortedAndFilteredData = searchedCountryData
    .slice()
    .sort((a: any, b: any) => {
      if (sortColumn) {
        const order = sortOrder === "asc" ? 1 : -1;
        return a[sortColumn].localeCompare(b[sortColumn]) * order;
      }
      return 0;
    });

  const filteredData = sortedAndFilteredData.filter((item: any) => {
    return Object.keys(filters).every((key: string) =>
      item[key].toLowerCase().includes(filters[key].toLowerCase())
    );
  });

  const handleValueSelection = () => {
    if (selected) {
      setQuery(selected.ascii_name);
      setValueSelected(true);
    } else {
      setValueSelected(false);
    }
  };

  useEffect(() => {
    handleValueSelection();
  }, [selected]);

  return (
    <>
      <div className="w-full">
        <div className="w-full h-80 bg-[#00224D]">
          <MaxWidthWraper className="">
            <Combobox value={selected} onChange={setSelected}>
              <div className="relative pt-12 pb-4">
                <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                  <Combobox.Input
                    className="w-full border-none py-3 pl-3 pr-10 h-12 text-base leading-5 text-gray-900 focus:ring-0"
                    displayValue={(selected) => selected?.ascii_name}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search in table for Country, City or Timezone"
                  />
                  <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </Combobox.Button>
                </div>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                  afterLeave={() => setQuery("")}
                >
                  <Combobox.Options className="absolute z-[99] mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                    {searchedCountryData.length === 0 && query !== "" ? (
                      <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                        Nothing found.
                      </div>
                    ) : (
                      searchedCountryData.map((country: any, index: number) => (
                        <Combobox.Option
                          key={index}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 px-4 ${
                              active
                                ? "bg-[#5D0E41] text-white"
                                : "text-gray-900"
                            }`
                          }
                          value={country}
                        >
                          {({ selected, active }) => (
                            <>
                              <span
                                className={`flex text-xs sm:text-base justify-between items-center flex-row truncate ${
                                  selected ? "font-medium" : "font-normal"
                                }`}
                              >
                                <span>
                                  {country.ascii_name} | {country.cou_name_en}
                                </span>
                                <span className="text-right">
                                  {country.timezone}
                                </span>
                              </span>
                            </>
                          )}
                        </Combobox.Option>
                      ))
                    )}
                  </Combobox.Options>
                </Transition>
              </div>
            </Combobox>
          </MaxWidthWraper>
        </div>
        <MaxWidthWraper className="">
          <div className="flex flex-col items-end">
            <button
              className={`border mt-4 flex gap-x-1 items-center  flex-row border-solid ${
                valueSelected
                  ? "border-[#FF204E] text-[#FF204E] cursor-pointer font-medium"
                  : "border-slate-400 text-slate-400 cursor-not-allowed"
              }  rounded-md px-2 py-1 text-xs`}
              onClick={() => {
                if (selected) {
                  setValueSelected(false);
                  setQuery("");
                  setSelected(null);
                }
              }}
            >
              <X className="w-4 " />
              Clear Filter
            </button>
            <div className="w-full my-4">
              <Table className="border border-solid">
                <TableHeader className="">
                  <TableRow className="border border-solid">
                    <TableHead className="">
                      <p className="text-sm sm:text-lg mb-1">Name</p>{" "}
                      <Popover>
                        <PopoverTrigger>
                          <SquareMenu className="md:hidden block w-5 text-black/50" />
                          <button className="border md:flex gap-x-2 md:flex-row hidden md:items-center border-black rounded-xl px-1 mb-2 border-solid">
                            <SquareMenu className="w-4 text-black/50" />
                            Sort By
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="bg-black text-white cursor-pointer w-fit p-1">
                          <button onClick={() => handleSort("name")}>
                            Ascending/Descending
                          </button>
                        </PopoverContent>
                      </Popover>
                    </TableHead>
                    <TableHead>
                      <p className="text-sm sm:text-lg mb-1  w-[150px]">
                        Country Code
                      </p>{" "}
                      <Popover>
                        <PopoverTrigger>
                          <SquareMenu className="md:hidden block w-5 text-black/50" />
                          <button className="border md:flex gap-x-2 md:flex-row hidden md:items-center border-black rounded-xl px-1 mb-2 border-solid">
                            <SquareMenu className="w-4 text-black/50" />
                            Sort By
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="bg-black text-white cursor-pointer w-fit p-1">
                          <button onClick={() => handleSort("country_code")}>
                            Ascending/Descending
                          </button>
                        </PopoverContent>
                      </Popover>
                    </TableHead>
                    <TableHead>
                      <p className="text-sm sm:text-lg mb-1 w-[200px]">
                        Country
                      </p>{" "}
                      <Popover>
                        <PopoverTrigger>
                          <SquareMenu className="md:hidden block w-5 text-black/50" />
                          <button className="border md:flex gap-x-2 md:flex-row hidden md:items-center border-black rounded-xl px-1 mb-2 border-solid">
                            <SquareMenu className="w-4 text-black/50" />
                            Sort By
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="bg-black text-white cursor-pointer w-fit p-1">
                          <button onClick={() => handleSort("cou_name_en")}>
                            Ascending/Descending
                          </button>
                        </PopoverContent>
                      </Popover>
                    </TableHead>
                    <TableHead>
                      <p className="text-sm sm:text-lg mb-1">Time Zone</p>{" "}
                      <Popover>
                        <PopoverTrigger>
                          <SquareMenu className="md:hidden block w-5 text-black/50" />
                          <button className="border md:flex gap-x-2 md:flex-row hidden md:items-center border-black rounded-xl px-1 mb-2 border-solid">
                            <SquareMenu className="w-4 text-black/50" />
                            Sort By
                          </button>
                        </PopoverTrigger>
                        <PopoverContent
                          onClick={() => handleSort("timezone")}
                          className="bg-black text-white cursor-pointer w-fit p-1"
                        >
                          <button onClick={() => handleSort("timezone")}>
                            Ascending/Descending
                          </button>
                        </PopoverContent>
                      </Popover>
                    </TableHead>
                    <TableHead>
                      <p className="text-sm sm:text-lg">Co-Ordinates</p>
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody className="w-full">
                  {!valueSelected ? (
                    filteredData.map((item: any, index: number) => (
                      <TableRow
                        key={index}
                        className="border border-solid border-gray-400"
                      >
                        <TableCell className="font-medium">
                          {item.ascii_name}
                        </TableCell>
                        <TableCell className="">{item.country_code}</TableCell>
                        <TableCell>{item.cou_name_en}</TableCell>
                        <TableCell>{item.timezone}</TableCell>
                        <TableCell className="">
                          lon: <span>{item.coordinates.lon}</span> <br /> lat:{" "}
                          <span>{item.coordinates.lat}</span>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow className="border border-solid border-gray-400">
                      <TableCell className="font-medium">
                        {selected.ascii_name}
                      </TableCell>
                      <TableCell className="">
                        {selected.country_code}
                      </TableCell>
                      <TableCell>{selected.cou_name_en}</TableCell>
                      <TableCell>{selected.timezone}</TableCell>
                      <TableCell className="">
                        lon: <span>{selected.coordinates.lon}</span> <br /> lat:{" "}
                        <span>{selected.coordinates.lat}</span>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
          {loading && <span>loading...</span>}
          <ScrollToTop smooth className="flex items-center justify-center " />
        </MaxWidthWraper>
      </div>
    </>
  );
};

export default HomePage;
