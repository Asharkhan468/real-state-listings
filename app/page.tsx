"use client";

import React, { useState } from "react";
import Image from "next/image";

type Listing = {
  id: string;
  title: string;
  location: string;
  price: number;
  beds: number;
  baths: number;
  area: number; // sqft
  image: string;
  badge?: string;
};

const sampleListings: Listing[] = [
  {
    id: "1",
    title: "Modern Family Home with Garden",
    location: "Bahria Town, Karachi",
    price: 22000000,
    beds: 4,
    baths: 3,
    area: 2800,
    image: "/images/house1.jpg",
    badge: "New",
  },
  {
    id: "2",
    title: "Stylish Apartment Downtown",
    location: "Clifton, Karachi",
    price: 12500000,
    beds: 2,
    baths: 2,
    area: 1200,
    image: "/images/house2.jpg",
    badge: "Featured",
  },
  {
    id: "3",
    title: "Cozy Studio Near Market",
    location: "PECHS, Karachi",
    price: 4200000,
    beds: 1,
    baths: 1,
    area: 450,
    image: "/images/house3.jpg",
  },
  // add more listings or fetch from API
];

function currency(n: number) {
  return n.toLocaleString("en-PK", { style: "currency", currency: "PKR" });
}

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [bedsFilter, setBedsFilter] = useState<number | "">("");
  const [view, setView] = useState<"grid" | "list">("grid");

  const filtered = sampleListings.filter((l) => {
    if (
      query &&
      !`${l.title} ${l.location}`.toLowerCase().includes(query.toLowerCase())
    )
      return false;
    if (minPrice !== "" && l.price < (minPrice as number)) return false;
    if (maxPrice !== "" && l.price > (maxPrice as number)) return false;
    if (bedsFilter !== "" && l.beds < (bedsFilter as number)) return false;
    return true;
  });

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero */}
      <section className="bg-gradient-to-r from-indigo-600 to-emerald-400 text-white py-16">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Find your next home
            </h1>
            <p className="mt-4 text-lg sm:text-xl opacity-90">
              Explore curated properties — apartments, houses, and studios
              across the city.
            </p>

            <div className="mt-8 bg-white rounded-xl p-4 shadow-md flex flex-col sm:flex-row items-center gap-3">
              <label className="sr-only">Search</label>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by location or title (e.g. Clifton, 3 bed)"
                className="flex-1 px-4 py-3 rounded-md outline-none text-gray-800"
              />

              <button
                onClick={() => {}}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-md font-medium shadow"
              >
                Search
              </button>
            </div>

            <div className="mt-6 flex justify-center gap-3">
              <button className="px-4 py-2 bg-white/20 rounded-md">Buy</button>
              <button className="px-4 py-2 bg-white/10 rounded-md">Rent</button>
              <button className="px-4 py-2 bg-white/10 rounded-md">
                Newly Listed
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-6 lg:px-8 -mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters / Sidebar */}
          <aside className="col-span-1 bg-white rounded-xl p-4 shadow-md sticky top-6 h-fit">
            <h3 className="font-semibold text-lg">Filters</h3>

            <div className="mt-4">
              <label className="block text-sm font-medium">Min price</label>
              <input
                type="number"
                value={minPrice}
                onChange={(e) =>
                  setMinPrice(
                    e.target.value === "" ? "" : Number(e.target.value)
                  )
                }
                placeholder="0"
                className="mt-1 w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div className="mt-3">
              <label className="block text-sm font-medium">Max price</label>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) =>
                  setMaxPrice(
                    e.target.value === "" ? "" : Number(e.target.value)
                  )
                }
                placeholder="Any"
                className="mt-1 w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div className="mt-3">
              <label className="block text-sm font-medium">Bedrooms</label>
              <select
                value={bedsFilter}
                onChange={(e) =>
                  setBedsFilter(
                    e.target.value === "" ? "" : Number(e.target.value)
                  )
                }
                className="mt-1 w-full px-3 py-2 border rounded-md"
              >
                <option value="">Any</option>
                <option value={1}>1+</option>
                <option value={2}>2+</option>
                <option value={3}>3+</option>
                <option value={4}>4+</option>
              </select>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => {
                  setQuery("");
                  setMinPrice("");
                  setMaxPrice("");
                  setBedsFilter("");
                }}
                className="flex-1 py-2 bg-gray-100 rounded-md"
              >
                Reset
              </button>
              <button
                onClick={() => {}}
                className="flex-1 py-2 bg-indigo-600 text-white rounded-md"
              >
                Apply
              </button>
            </div>

            <div className="mt-6 text-sm text-gray-600">
              <p>
                Tip: use the search box to quickly find properties by area or
                feature.
              </p>
            </div>
          </aside>

          {/* Listings + Map */}
          <div className="col-span-1 lg:col-span-3">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">
                  {filtered.length} results
                </span>
                <div className="border-l h-6" />
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setView("grid")}
                    className={`px-3 py-1 rounded-md ${
                      view === "grid" ? "bg-indigo-600 text-white" : "bg-white"
                    }`}
                  >
                    Grid
                  </button>
                  <button
                    onClick={() => setView("list")}
                    className={`px-3 py-1 rounded-md ${
                      view === "list" ? "bg-indigo-600 text-white" : "bg-white"
                    }`}
                  >
                    List
                  </button>
                </div>
              </div>

             

              
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              {/* Map placeholder */}
              <div className="w-full h-64 sm:h-72 md:h-80 bg-gray-100 flex items-center justify-center text-gray-400">
                Map placeholder (Google Map / MapBox integration)
              </div>

              {/* Listings */}
              <div className="p-6">
                {view === "grid" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((item) => (
                      <article
                        key={item.id}
                        className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                      >
                        {/* Image Section */}
                        <div className="relative h-52 w-full">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          {item.badge && (
                            <span className="absolute top-3 left-3 bg-gradient-to-r from-indigo-600 to-emerald-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                              {item.badge}
                            </span>
                          )}
                        </div>

                        {/* Details Section */}
                        <div className="p-5">
                          <h4 className="font-semibold text-lg text-gray-900 truncate">
                            {item.title}
                          </h4>
                          <p className="text-sm text-gray-500 mt-1">
                            {item.location}
                          </p>

                          <div className="mt-4 flex items-center justify-between">
                            <span className="text-xl font-bold text-indigo-600">
                              {currency(item.price)}
                            </span>
                            <span className="text-sm text-gray-600">
                              {item.beds}bd · {item.baths}ba · {item.area} sqft
                            </span>
                          </div>

                          <div className="mt-5 flex gap-3">
                            <button className="flex-1 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg font-medium shadow hover:opacity-90 transition">
                              View
                            </button>
                            <button className="flex-1 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition">
                              Contact
                            </button>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col gap-5">
                    {filtered.map((item) => (
                      <div
                        key={item.id}
                        className="flex flex-col sm:flex-row gap-4 p-4 bg-white border border-gray-100 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
                      >
                        <div className="relative w-full sm:w-44 h-36 rounded-lg overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform duration-500 hover:scale-105"
                          />
                        </div>

                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className="font-semibold text-gray-900 text-lg">
                              {item.title}
                            </h4>
                            <p className="text-sm text-gray-500 mt-1">
                              {item.location}
                            </p>
                            <div className="mt-2 text-indigo-600 font-bold text-lg">
                              {currency(item.price)}
                            </div>
                            <p className="text-sm text-gray-600">
                              {item.beds}bd · {item.baths}ba · {item.area} sqft
                            </p>
                          </div>

                          <div className="flex gap-3 mt-4 sm:mt-0">
                            <button className="flex-1 sm:flex-none py-2 px-5 bg-indigo-600 text-white rounded-lg font-medium shadow hover:bg-indigo-700 transition">
                              View
                            </button>
                            <button className="flex-1 sm:flex-none py-2 px-5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition">
                              Contact
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Pagination (simple) */}
              <div className="p-4 border-t flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Showing 1 - {Math.min(filtered.length, 9)} of{" "}
                  {filtered.length}
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 border rounded">Prev</button>
                  <button className="px-3 py-1 border rounded">1</button>
                  <button className="px-3 py-1 border rounded">2</button>
                  <button className="px-3 py-1 border rounded">Next</button>
                </div>
              </div>
            </div>

            {/* Quick CTA */}
            <div className="mt-6 flex items-center justify-between gap-4">
              <div className="bg-white p-4 rounded-xl shadow flex-1">
                <h3 className="font-semibold">Want your property featured?</h3>
                <p className="text-sm text-gray-600 mt-1">
                  List with us and reach thousands of buyers & renters.
                </p>
              </div>

              <div className="flex-none">
                <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-emerald-400 text-white rounded-xl font-semibold">
                  List a Property
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
