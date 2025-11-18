"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { MoreVertical, Edit, Trash2, X, Plus } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { deletePost, getAllPosts } from "@/libs/api";

type Property = {
  id: number;
  title: string;
  location: string;
  price: number;
  beds: number;
  baths: number;
  area: number;
  image: string;
  badge?: string;
};

export default function AdminProperties() {
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [posts, setPosts] = useState([]);
  const [loadingdata, setLoadingdata] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleAddProperty = () => {
    router.push("/addProperty");
  };

  const handleDelete = async (id: any) => {
    const result = await deletePost(id);
    if (result.success) {
      setShowModal(false);
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  const currency = (value: number) =>
    value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    });

  useEffect(() => {
    const fetchPosts = async () => {
      const result = await getAllPosts();
      if (result.success) {
        setPosts(result.data.posts || []);
      } else {
        setError(result.message);
      }
      setLoadingdata(false);
    };

    fetchPosts();
  }, []);

  const editModal = (item: any) => {
    console.log(item);
    localStorage.setItem("editedData", JSON.stringify(item));
    router.push("/addProperty");
  };


  return (
    
    <main className="min-h-screen bg-gray-50 py-10 px-5 relative">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Admin Property Dashboard
      </h1>

      <div className="p-5 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((item: any) => (
            <article
              key={item._id}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 relative"
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
                <button
                  className="absolute top-3 right-3 bg-white/80 hover:bg-white p-1.5 rounded-full transition"
                  onClick={() =>
                    setOpenMenu(openMenu === item._id ? null : item._id)
                  }
                >
                  <MoreVertical size={18} className="text-gray-700" />
                </button>

                {openMenu === item._id && (
                  <div className="absolute top-10 right-3 bg-white border border-gray-100 rounded-lg shadow-md p-2 w-28 space-y-2 animate-fadeIn z-10">
                    <button
                      onClick={() => editModal(item)}
                      className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 transition"
                    >
                      <Edit size={14} /> Edit
                    </button>
                    <button
                      onClick={() => {
                        setSelectedId(item._id);
                        setShowModal(true);
                      }}
                      className="flex items-center gap-2 text-sm text-red-600 hover:text-red-800 transition"
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                )}
              </div>

              <div className="p-4 sm:p-5">
                <h4 className="font-semibold text-base sm:text-lg text-gray-900 truncate">
                  {item.title}
                </h4>
                <p className="text-sm text-gray-500 mt-1">{item.location}</p>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-indigo-600 font-bold text-base sm:text-lg">
                    {currency(item.price)}
                  </span>
                  <span className="text-xs sm:text-sm text-gray-600">
                    {item.beds}bd · {item.baths}ba · {item.area} sqft
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Floating Add Button */}
      <button
        onClick={handleAddProperty}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-indigo-600 to-emerald-500 text-white rounded-full shadow-lg hover:shadow-2xl transition-all p-4 sm:p-5 flex items-center justify-center"
      >
        <Plus size={28} />
      </button>

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-80 text-center animate-fadeIn relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setShowModal(false)}
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Are you sure?
            </h2>
            <p className="text-gray-600 text-sm mb-6">
              This action cannot be undone.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(selectedId)}
                className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </main>

   
  );
}
