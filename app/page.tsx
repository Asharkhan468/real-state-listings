"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getAllPosts } from "@/libs/api";


export default function HomePage() {
  const [query, setQuery] = useState("");
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [bedsFilter, setBedsFilter] = useState<number | "">("");
  const [property, setProperty] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [filterType, setFilterType] = useState<
    "all" | "sell" | "rented" | "new"
  >("all");

  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const result = await getAllPosts();
      if (result.success) {
        setProperty(result.data.posts || []);
      } else {
        setError(result.message);
      }
      setLoading(false);
    };
    fetchPosts();
  }, []);

  // --- Filtered Logic ---
  let filtered = property.filter((l) => {
    if (
      query &&
      !`${l.title} ${l.location}`.toLowerCase().includes(query.toLowerCase())
    )
      return false;
    if (minPrice !== "" && l.price < (minPrice as number)) return false;
    if (maxPrice !== "" && l.price > (maxPrice as number)) return false;
    if (bedsFilter !== "" && l.beds < (bedsFilter as number)) return false;

    // Filter by Buy / Rent
    if (filterType === "sell" && l.type !== "sell") return false;
    if (filterType === "rented" && l.type !== "rented") return false;
    return true;
  });

  // Sort Newly Listed (latest first)
  if (filterType === "new") {
    filtered = [...filtered].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  return (
    
    <main className="min-h-screen bg-gray-50 text-gray-800">
      
      <section className="bg-gradient-to-r from-indigo-600 to-emerald-400 text-white py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Find Your Next Home
          </h1>
          <p className="mt-3 text-base sm:text-lg lg:text-xl opacity-90">
            Explore top-rated apartments, houses, and studios across the city.
          </p>

          {/* Search Bar */}
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

          {/* Filter Buttons */}
          <div className="mt-6 flex justify-center flex-wrap gap-3 text-sm">
            <button
              onClick={() => setFilterType("sell")}
              className={`px-4 py-2 rounded-md transition ${
                filterType === "sell"
                  ? "bg-white text-indigo-600 font-semibold"
                  : "bg-white/10 hover:bg-white/20"
              }`}
            >
              Buy
            </button>
            <button
              onClick={() => setFilterType("rented")}
              className={`px-4 py-2 rounded-md transition ${
                filterType === "rented"
                  ? "bg-white text-indigo-600 font-semibold"
                  : "bg-white/10 hover:bg-white/20"
              }`}
            >
              Rent
            </button>
            <button
              onClick={() => setFilterType("new")}
              className={`px-4 py-2 rounded-md transition ${
                filterType === "new"
                  ? "bg-white text-indigo-600 font-semibold"
                  : "bg-white/10 hover:bg-white/20"
              }`}
            >
              Newly Listed
            </button>
            <button
              onClick={() => setFilterType("all")}
              className={`px-4 py-2 rounded-md transition ${
                filterType === "all"
                  ? "bg-white text-indigo-600 font-semibold"
                  : "bg-white/10 hover:bg-white/20"
              }`}
            >
              All
            </button>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Filters */}
          {/* (Your existing aside filter code remains same) */}

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
                <div className="relative">
                  <select
                    value={bedsFilter}
                    onChange={(e) =>
                      setBedsFilter(
                        e.target.value === "" ? "" : Number(e.target.value)
                      )
                    }
                    className="w-full appearance-none px-3 pr-8 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Any</option>
                    <option value={1}>1+</option>
                    <option value={2}>2+</option>
                    <option value={3}>3+</option>
                    <option value={4}>4+</option>
                  </select>

                  {/* Custom dropdown arrow */}
                  <svg
                    className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
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
              <div className="w-full h-56 sm:h-64 md:h-72 overflow-hidden rounded-xl">
                <img
                  src="https://images.unsplash.com/photo-1505761671935-60b3a7427bad"
                  alt="City view"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-5 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 min-h-[200px] items-center justify-center">
                  {loading ? (
                    // Loading Spinner
                    <div className="col-span-full flex justify-center items-center py-10">
                      <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                      <span className="ml-3 text-indigo-600 font-medium">
                        Loading properties...
                      </span>
                    </div>
                  ) : error ? (
                    <div className="col-span-full text-center py-10 text-red-500 font-medium">
                      {error}
                    </div>
                  ) : filtered.length === 0 ? (
                    <div className="col-span-full text-center py-12">
                      <Image
                        src="https://cdn-icons-png.flaticon.com/512/7486/7486754.png"
                        alt="No results"
                        width={120}
                        height={120}
                        className="mx-auto opacity-80"
                      />
                      <h3 className="mt-4 text-gray-700 font-semibold text-lg">
                        No properties found
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Try adjusting your filters or search query.
                      </p>
                    </div>
                  ) : (
                    filtered.map((item: any) => (
                      <article
                        key={item._id}
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
                              Rs {item.price}
                            </span>
                            <span className="text-xs sm:text-sm text-gray-600">
                              {item.beds}bd · {item.baths}ba · {item.area} sqft
                            </span>
                          </div>

                          <div className="mt-4 flex gap-3">
                            <button
                              onClick={() =>
                                router.push(`/property/${item._id}`)
                              }
                              className="flex-1 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-md font-medium hover:opacity-90 transition"
                            >
                              View
                            </button>
                          </div>
                        </div>
                      </article>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* List Property Modal */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="bg-white p-5 rounded-xl shadow flex-1 w-full text-center sm:text-left">
                <h3 className="font-semibold text-gray-900">
                  Want your property featured?
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  List with us and reach thousands of potential buyers.
                </p>
              </div>

              <button
                onClick={() => setShowModal(true)}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-emerald-400 text-white rounded-xl font-semibold shadow hover:opacity-90 w-full sm:w-auto"
              >
                List a Property
              </button>

              {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
                  <div className="bg-white p-6 rounded-2xl shadow-xl max-w-sm w-full text-center relative animate-fadeIn">
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">
                      List Your Property
                    </h2>
                    <p className="text-sm text-gray-600 mb-4">
                      Send your property details to:
                    </p>
                    <div className="bg-gray-100 text-indigo-700 font-medium py-2 px-4 rounded-md select-all">
                      demo@propertyhub.com
                    </div>

                    <button
                      onClick={() => setShowModal(false)}
                      className="mt-6 px-5 py-2 bg-gradient-to-r from-indigo-600 to-emerald-400 text-white rounded-lg hover:opacity-90 transition"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
