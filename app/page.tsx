"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Listing = {
  id: string;
  title: string;
  location: string;
  price: number;
  beds: number;
  baths: number;
  area: number;
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
  const router = useRouter();

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
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-emerald-400 text-white py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Find Your Next Home
          </h1>
          <p className="mt-3 text-base sm:text-lg lg:text-xl opacity-90">
            Explore top-rated apartments, houses, and studios across the city.
          </p>

          <div className="mt-8 bg-white rounded-xl p-3 sm:p-4 shadow-md flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-3xl mx-auto">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by location or title (e.g. Clifton, 3 bed)"
              className="flex-1 px-4 py-3 rounded-md outline-none text-gray-800 border border-gray-200 focus:ring-2 focus:ring-indigo-500"
            />
            <button className="bg-gradient-to-r from-indigo-600 to-emerald-500 hover:opacity-90 text-white px-5 py-3 rounded-md font-medium shadow w-full sm:w-auto">
              Search
            </button>
          </div>

          <div className="mt-6 flex justify-center flex-wrap gap-3 text-sm">
            <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-md">
              Buy
            </button>
            <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-md">
              Rent
            </button>
            <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-md">
              Newly Listed
            </button>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Filters */}
          <aside className="bg-white rounded-xl p-5 shadow-md h-fit lg:sticky top-6 order-2 lg:order-1">
            <h3 className="font-semibold text-lg mb-3">Filters</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Min Price
                </label>
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) =>
                    setMinPrice(
                      e.target.value === "" ? "" : Number(e.target.value)
                    )
                  }
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Max Price
                </label>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) =>
                    setMaxPrice(
                      e.target.value === "" ? "" : Number(e.target.value)
                    )
                  }
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Bedrooms
                </label>
                <select
                  value={bedsFilter}
                  onChange={(e) =>
                    setBedsFilter(
                      e.target.value === "" ? "" : Number(e.target.value)
                    )
                  }
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="">Any</option>
                  <option value={1}>1+</option>
                  <option value={2}>2+</option>
                  <option value={3}>3+</option>
                  <option value={4}>4+</option>
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => {
                    setQuery("");
                    setMinPrice("");
                    setMaxPrice("");
                    setBedsFilter("");
                  }}
                  className="flex-1 py-2 bg-gray-100 rounded-md hover:bg-gray-200 text-sm"
                >
                  Reset
                </button>
                <button className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm">
                  Apply
                </button>
              </div>
            </div>
          </aside>

          {/* Listings */}
          <div className="col-span-1 lg:col-span-3 order-1 lg:order-2">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
              <span className="text-sm text-gray-600">
                {filtered.length} results found
              </span>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="w-full h-56 sm:h-64 md:h-72 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                Map placeholder (Google Map / MapBox integration)
              </div>

              <div className="p-5 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filtered.map((item) => (
                    <article
                      key={item.id}
                      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300"
                    >
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

                      <div className="p-4 sm:p-5">
                        <h4 className="font-semibold text-base sm:text-lg text-gray-900 truncate">
                          {item.title}
                        </h4>
                        <p className="text-sm text-gray-500 mt-1">
                          {item.location}
                        </p>

                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-indigo-600 font-bold text-base sm:text-lg">
                            {currency(item.price)}
                          </span>
                          <span className="text-xs sm:text-sm text-gray-600">
                            {item.beds}bd · {item.baths}ba · {item.area} sqft
                          </span>
                        </div>

                        <div className="mt-4 flex gap-3">
                          <button
                            onClick={() => router.push(`/property/${item.id}`)}
                            className="flex-1 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-md font-medium hover:opacity-90 transition"
                          >
                            View
                          </button>
                          <button className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition">
                            Contact
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="bg-white p-5 rounded-xl shadow flex-1 w-full text-center sm:text-left">
                <h3 className="font-semibold text-gray-900">
                  Want your property featured?
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  List with us and reach thousands of potential buyers.
                </p>
              </div>

              <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-emerald-400 text-white rounded-xl font-semibold shadow hover:opacity-90 w-full sm:w-auto">
                List a Property
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
