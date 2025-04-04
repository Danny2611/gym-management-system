// // src/components/user/MembershipSummary.tsx
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useOffline } from "../../hooks/useOffline";
// import { Membership } from "../../types/membership";

// const MembershipSummary: React.FC = () => {
//   const [membership, setMembership] = useState<Membership | null>(null);
//   const [loading, setLoading] = useState(true);
//   const { isOffline } = useOffline();

//   useEffect(() => {
//     // Simulated API call or cached data fetch
//     const fetchMembership = async () => {
//       try {
//         // Replace with actual API call
//         // If offline, this would use cached data from IndexedDB
//         const data = {
//           id: "mem-123",
//           name: "Premium Fitness",
//           startDate: "2024-03-01",
//           endDate: "2024-07-01",
//           daysLeft: 30,
//           features: ["Unlimited Gym Access", "Pool Access", "2 PT Sessions/month"],
//           price: 79.99,
//           status: "active"
//         };
//         setMembership(data);
//       } catch (error) {
//         console.error("Error fetching membership data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMembership();
//   }, [isOffline]);

//   if (loading) {
//     return (
//       <div className="rounded-lg bg-white p-6 shadow-md">
//         <div className="h-6 w-36 animate-pulse rounded bg-gray-200"></div>
//         <div className="mt-4 h-24 animate-pulse rounded bg-gray-200"></div>
//       </div>
//     );
//   }

//   if (!membership) {
//     return (
//       <div className="rounded-lg bg-white p-6 shadow-md">
//         <h2 className="text-xl font-bold text-[#0D2E4B]">Membership Status</h2>
//         <div className="mt-4 rounded-lg bg-gray-100 p-6 text-center">
//           <p className="mb-4 text-gray-600">You don't have an active membership.</p>
//           <Link
//             to="/user/memberships/browse"
//             className="inline-block rounded-full bg-[#0CC6F0] px-6 py-2 font-medium text-white transition-colors hover:bg-[#0aa3c6]"
//           >
//             Browse Memberships
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="rounded-lg bg-white p-6 shadow-md">
//       <div className="flex flex-col justify-between md:flex-row md:items-center">
//         <h2 className="text-xl font-bold text-[#0D2E4B]">Current Membership</h2>
//         {membership.daysLeft <= 7 && (
//           <span className="mt-2 inline-block rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-600 md:mt-0">
//             Expires soon!
//           </span>
//         )}
//       </div>

//       <div className="mt-4 rounded-lg bg-gradient-to-r from-[#0D2E4B] to-[#0CC6F0] p-6 text-white">
//         <div className="flex flex-col justify-between md:flex-row">
//           <div>
//             <h3 className="text-2xl font-bold">{membership.name}</h3>
//             <p className="mt-1 text-white/80">
//               Valid until {new Date(membership.endDate).toLocaleDateString()}
//             </p>
//           </div>
//           <div className="mt-4 md:mt-0 md:text-right">
//             <span className="text-3xl font-bold">{membership.daysLeft}</span>
//             <p className="text-white/80">days left</p>
//           </div>
//         </div>

//         <div className="mt-4">
//           <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
//             {membership.features.map((feature, index) => (
//               <li key={index} className="flex items-center">
//                 <svg
//                   className="mr-2 h-5 w-5 text-white"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M5 13l4 4L19 7"
//                   />
//                 </svg>
//                 {feature}
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div className="mt-6 flex flex-wrap gap-3">
//           <Link
//             to="/user/memberships/renew"
//             className="rounded-full bg-white px-4 py-2 font-medium text-[#0D2E4B] transition-colors hover:bg-gray-100"
//           >
//             Renew Now
//           </Link>
//           <Link
//             to={`/user/memberships/${membership.id}`}
//             className="rounded-full border border-white px-4 py-2 font-medium text-white transition-colors hover:bg-white/10"
//           >
//             View Details
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MembershipSummary;
