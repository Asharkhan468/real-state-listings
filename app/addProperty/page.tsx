"use client";

import { createPost } from "@/libs/api";
import React, { useState } from "react";

export default function AddProperty() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    image: null as File | null,
    type: "",
  });
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log("Property added:", formData);
  //   alert("✅ Property added successfully!");
  // };

// const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();

//   // 🔹 Step 1: naya FormData
//   const data = new FormData();

//   // 🔹 Step 2: Normal fields
//   data.append("title", formData.title);
//   data.append("description", formData.description);
//   data.append("type", formData.type);

//   // 🔹 Step 3: Convert string → number, but ensure it stays number-like
//   // Instead of String(Number(...)), direct Number(...) bhej do
//   data.append("price", Number(formData.price).toString());
//   data.append("bedrooms", Number(formData.bedrooms).toString());
//   data.append("bathrooms", Number(formData.bathrooms).toString());
//   data.append("area", Number(formData.area).toString());

//   // 🔹 Step 4: Image add
//   if (formData.image) {
//     data.append("image", formData.image);
//   }

//   // 🔹 Step 5: Debug
//   for (let [key, value] of data.entries()) {
//     console.log(`${key}:`, typeof(value) , value);
//   }

//   // 🔹 Step 6: API call
//   const result = await createPost(data);

//   if (result.success) {
//     console.log("✅ Post created:", result.data);
//   } else {
//     console.log("❌ Error:", result.message);
//   }
// };

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

   
    const result = await createPost(formData);

    if (result.success) {
      console.log("✅ Post created:", result.data);
    } else {
      console.error("❌ Error:", result.message);
    }
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-white to-blue-100 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-10 transition-all duration-300 hover:shadow-indigo-200">
        <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-10 tracking-tight">
          Add Property
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Title */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-semibold mb-2">
              Property Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Modern 3 Bedroom Apartment"
              className="w-full bg-white/70 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 shadow-sm focus:ring-4 focus:ring-indigo-300 focus:outline-none transition-all"
              required
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-semibold mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Spacious apartment with natural lighting and a city view..."
              rows={4}
              className="w-full bg-white/70 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 shadow-sm focus:ring-4 focus:ring-indigo-300 focus:outline-none resize-none transition-all"
              required
            ></textarea>
          </div>

          {/* Price */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Price ($)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="250000"
              className="w-full bg-white/70 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 shadow-sm focus:ring-4 focus:ring-indigo-300 focus:outline-none transition-all"
              required
            />
          </div>

          {/* Type */}
          <div className="relative">
            <label className="block text-gray-700 font-semibold mb-2">
              Type
            </label>
            <div className="relative">
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full appearance-none bg-white/70 border border-gray-200 rounded-xl px-4 py-3 pr-10 text-gray-800 shadow-sm focus:ring-4 focus:ring-indigo-300 focus:outline-none transition-all cursor-pointer"
                required
              >
                <option value="">Select Type</option>
                <option value="rented">Rented</option>
                <option value="sell">Sell</option>
              </select>

              {/* Custom dropdown arrow */}
              <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500"
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
              </span>
            </div>
          </div>

          {/* Bedrooms */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Bedrooms
            </label>
            <input
              type="number"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
              placeholder="3"
              className="w-full bg-white/70 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 shadow-sm focus:ring-4 focus:ring-indigo-300 focus:outline-none transition-all"
              required
            />
          </div>

          {/* Bathrooms */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Bathrooms
            </label>
            <input
              type="number"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleChange}
              placeholder="2"
              className="w-full bg-white/70 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 shadow-sm focus:ring-4 focus:ring-indigo-300 focus:outline-none transition-all"
              required
            />
          </div>

          {/* Area */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Area (sqft)
            </label>
            <input
              type="number"
              name="area"
              value={formData.area}
              onChange={handleChange}
              placeholder="1800"
              className="w-full bg-white/70 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 shadow-sm focus:ring-4 focus:ring-indigo-300 focus:outline-none transition-all"
              required
            />
          </div>

          {/* Image Upload */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-semibold mb-2">
              Upload Property Image
            </label>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full bg-white/70 text-gray-700 border border-gray-200 rounded-xl px-4 py-3 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-white file:bg-indigo-600 hover:file:bg-indigo-700 file:cursor-pointer focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all"
                required
              />
              {preview && (
                <div className="w-24 h-24 rounded-xl overflow-hidden shadow-md ring-2 ring-indigo-300 hover:scale-105 transition-transform">
                  <img
                    src={preview}
                    alt="Preview"
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Submit */}
          <div className="md:col-span-2 flex justify-center mt-6">
            <button
              type="submit"
              className="relative inline-flex items-center justify-center px-12 py-3 font-semibold text-white bg-gradient-to-r from-indigo-600 to-blue-500 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <span className="relative z-10">Add Property</span>
              <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500 to-blue-400 blur-md opacity-40"></span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
