// "use client";

// import { useParams, useRouter } from "next/navigation";
// import Image from "next/image";
// import { useEffect, useState } from "react";
// import { getAllPosts } from "@/libs/api";




// const listings = [
//   {
//     id: "1",
//     title: "Modern Family Home with Garden",
//     location: "Bahria Town, Karachi",
//     price: 22000000,
//     beds: 4,
//     baths: 3,
//     area: 2800,
//     image: "/images/house1.jpg",
//     badge: "New",
//     description:
//       "This modern 4-bedroom family home offers a perfect blend of luxury and comfort. Located in Bahria Town, Karachi, it features a spacious garden, modern kitchen, and high-quality finishes throughout. Ideal for families seeking a peaceful and upscale lifestyle.",
//   },
//   {
//     id: "2",
//     title: "Stylish Apartment Downtown",
//     location: "Clifton, Karachi",
//     price: 12500000,
//     beds: 2,
//     baths: 2,
//     area: 1200,
//     image: "/images/house2.jpg",
//     badge: "Featured",
//     description:
//       "An elegant apartment in the heart of Clifton, this 2-bedroom residence offers breathtaking views, modern interiors, and easy access to cafes, shops, and entertainment. Perfect for professionals or small families.",
//   },
  
//   {
//     id: "3",
//     title: "Cozy Studio Near Market",
//     location: "PECHS, Karachi",
//     price: 4200000,
//     beds: 1,
//     baths: 1,
//     area: 450,
//     image: "/images/house3.jpg",
//     description:
//       "Affordable and cozy studio apartment located near major shopping areas. Ideal for singles or students looking for convenience and comfort at a great price.",
//   },
// ];

// function currency(n: number) {
//   return n.toLocaleString("en-PK", { style: "currency", currency: "PKR" });
// }

// export default function PropertyDetails() {

//   const [propertylisting , setPropertylisting] = useState<any[]>([]);

//   useEffect(() => {
//       const fetchPosts = async () => {
//         const result = await getAllPosts();
//         if (result.success) {
//           setPropertylisting(result.data.posts || []);
//           return;
//         } 
//       };
//       fetchPosts();
//     }, []);
//   const params = useParams();
//   const router = useRouter();
//   const property = propertylisting.find((item) => item._id === params.id);

//   if (!property)
//     return (
//       <div className="min-h-screen flex items-center justify-center text-gray-600">
//         Property not found.
//       </div>
//     );

//   return (
//     <main className="min-h-screen bg-gray-50 text-gray-800">
//       {/* Hero Section */}
//       <section className="relative h-[60vh] w-full">
//         <Image
//           src={property.image}
//           alt={property.title}
//           fill
//           className="object-cover brightness-75"
//         />
//         <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
//           <div className="text-center text-white px-6">
//             <h1 className="text-4xl md:text-5xl font-bold">
//               {property.title}
//             </h1>
//             <p className="mt-3 text-lg opacity-90">{property.location}</p>
//             {property.badge && (
//               <span className="mt-4 inline-block bg-gradient-to-r from-indigo-600 to-emerald-500 px-4 py-1 text-sm font-semibold rounded-full shadow">
//                 {property.badge}
//               </span>
//             )}
//           </div>
//         </div>
//       </section>

//       {/* Details Section */}
//       <section className="max-w-6xl mx-auto px-6 py-12">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
//           {/* Left (Info) */}
//           <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-8">
//             <h2 className="text-2xl font-bold text-gray-900 mb-4">
//               {property.title}
//             </h2>
//             <p className="text-gray-700 leading-relaxed mb-6">
//               {property.description}
//             </p>

//             <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
//               <div className="p-4 rounded-xl bg-gray-50 shadow-sm">
//                 <p className="text-sm text-gray-500">Price</p>
//                 <p className="text-lg font-bold text-indigo-600">
//                   {currency(property.price)}
//                 </p>
//               </div>
//               <div className="p-4 rounded-xl bg-gray-50 shadow-sm">
//                 <p className="text-sm text-gray-500">Bedrooms</p>
//                 <p className="text-lg font-bold">{property.beds}</p>
//               </div>
//               <div className="p-4 rounded-xl bg-gray-50 shadow-sm">
//                 <p className="text-sm text-gray-500">Bathrooms</p>
//                 <p className="text-lg font-bold">{property.baths}</p>
//               </div>
//               <div className="p-4 rounded-xl bg-gray-50 shadow-sm">
//                 <p className="text-sm text-gray-500">Area</p>
//                 <p className="text-lg font-bold">{property.area} sqft</p>
//               </div>
//             </div>
//           </div>

//           {/* Right (Contact Card) */}
//           <div className="bg-white rounded-2xl shadow-md p-6 h-fit">
//             <h3 className="text-xl font-semibold text-gray-900 mb-4">
//               Contact Agent
//             </h3>
//             <p className="text-sm text-gray-600 mb-4">
//               Interested in this property? Contact us now to schedule a visit or
//               get more details.
//             </p>

//             <input
//               type="text"
//               placeholder="Your Name"
//               className="w-full px-4 py-2 mb-3 border rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
//             />
//             <input
//               type="email"
//               placeholder="Your Email"
//               className="w-full px-4 py-2 mb-3 border rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
//             />
//             <textarea
//               placeholder="Message"
//               rows={4}
//               className="w-full px-4 py-2 mb-4 border rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
//             />
//             <button className="w-full py-3 bg-gradient-to-r from-indigo-600 to-emerald-500 text-white rounded-lg font-medium shadow hover:opacity-90 transition">
//               Send Message
//             </button>

//             <button
//               onClick={() => router.back()}
//               className="mt-4 w-full py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
//             >
//               Back to Listings
//             </button>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }





"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getAllPosts } from "@/libs/api";

function currency(n: number) {
  return n.toLocaleString("en-PK", { style: "currency", currency: "PKR" });
}

export default function PropertyDetails() {
  const [propertylisting, setPropertylisting] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const result = await getAllPosts();
        if (result.success) {
          setPropertylisting(result.data.posts || []);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // ✅ after fetch completed
      }
    };
    fetchPosts();
  }, []);

  const property = propertylisting.find((item) => item._id === params.id);

  // ✅ Show loading spinner or text
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading property details...
      </div>
    );

  // ✅ After loading completed, check if property exists
  if (!property)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Property not found.
      </div>
    );

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full">
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <h1 className="text-4xl md:text-5xl font-bold">
              {property.title}
            </h1>
            <p className="mt-3 text-lg opacity-90">{property.location}</p>
            {property.badge && (
              <span className="mt-4 inline-block bg-gradient-to-r from-indigo-600 to-emerald-500 px-4 py-1 text-sm font-semibold rounded-full shadow">
                {property.badge}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left (Info) */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {property.title}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              {property.description}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              <div className="p-4 rounded-xl bg-gray-50 shadow-sm">
                <p className="text-sm text-gray-500">Price</p>
                <p className="text-lg font-bold text-indigo-600">
                  {currency(property.price)}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-gray-50 shadow-sm">
                <p className="text-sm text-gray-500">Bedrooms</p>
                <p className="text-lg font-bold">{property.beds}</p>
              </div>
              <div className="p-4 rounded-xl bg-gray-50 shadow-sm">
                <p className="text-sm text-gray-500">Bathrooms</p>
                <p className="text-lg font-bold">{property.baths}</p>
              </div>
              <div className="p-4 rounded-xl bg-gray-50 shadow-sm">
                <p className="text-sm text-gray-500">Area</p>
                <p className="text-lg font-bold">{property.area} sqft</p>
              </div>
            </div>
          </div>

          {/* Right (Contact Card) */}
          <div className="bg-white rounded-2xl shadow-md p-6 h-fit">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Contact Agent
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Interested in this property? Contact us now to schedule a visit or
              get more details.
            </p>

            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-2 mb-3 border rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 mb-3 border rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <textarea
              placeholder="Message"
              rows={4}
              className="w-full px-4 py-2 mb-4 border rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <button className="w-full py-3 bg-gradient-to-r from-indigo-600 to-emerald-500 text-white rounded-lg font-medium shadow hover:opacity-90 transition">
              Send Message
            </button>

            <button
              onClick={() => router.back()}
              className="mt-4 w-full py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              Back to Listings
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
