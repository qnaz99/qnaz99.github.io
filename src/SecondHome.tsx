// import { AppStoreButton } from "./components/AppStoreButton";
// import { PlayStoreButton } from "./components/PlayStoreButton";
// import Header from "./Header";
// import "aos/dist/aos.css";
// import AOS from "aos";
// import { useEffect } from "react";
// import { Footer } from "./components/Footer";
// import art1 from '/img/art1.avif';
// import art2 from '/img/art2.avif';
// import testimony1 from '/img/testimony1.avif';
// import testimony2 from '/img/testimony2.avif';
// import testimony3 from '/img/testimony3.avif';

// const SecondHome = () => {
//   useEffect(() => {
//     AOS.init({ once: false });
//   }, []);

//   const testimonialBoxes = [
//     {
//       image: testimony1,
//       name: "Bonnie",
//       location: "Boca Raton",
//       testimony:
//         "So nice to have scooters available, lugging mine around is impossible. This allows me to get out more and feel alive!",
//     },
//     {
//       image: testimony2,
//       name: "Chauncy",
//       location: "Del Ray Beach",
//       testimony: "What a great program. I don't miss out on anything anymore",
//     },
//     {
//       image: testimony3,
//       name: "Aya",
//       location: "North Miami Beach",
//       testimony:
//         "These should be everywhere! They are always clean and charged. I love knowing they are available to use",
//     },
//   ];

//   return (
//     <div className="bg-[#023bb3]">
//       <Header />
//       <section id="banner">
//         <div className="w-full h-[500px] bg-[url('/img/banner.png')] bg-cover bg-center bg-no-repeat animate-fade-up">
//           <div className="flex items-center justify-center md:justify-end h-full px-6 md:px-20">
//             <div className="bg-black/50 p-6 max-w-lg w-full ">
//               <h1 className="text-3xl text-white playball pb-4 animate-fade-up">
//                 Explore with ease.
//               </h1>
//               <p className="text-white pb-6 leading-snug animate-fade-up">
//                 Mobility scooter rentals for you to get moving! Rent a scooter
//                 within minutes.
//               </p>
//               <button
//                 type="button"
//                 className="text-black bg-white hover:bg-gray-100 focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center animate-fade-up"
//               >
//                 Learn More
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>
//       <div className="h-12"></div>
//       <section>
//         <h1 className="section-title text-center playball text-5xl animate-fade-up">
//           How it works
//         </h1>

//         <div className="h-8"></div>

//         <div
//           data-aos="zoom-in"
//           className="flex flex-col md:flex-row gap-6 px-10 animate-fade-up"
//         >
//           <div className="flex-1 p-6 bg-[url('/img/downloadapp.jpg')] bg-cover bg-center flex flex-col justify-between relative">
//             <div className="absolute inset-0 bg-black/40"></div>
//             <div className="relative z-10">
//               <h2 className="text-4xl font-semibold mb-2 text-white playball">
//                 Download the app
//               </h2>
//               <div className="w-10 h-[2px] bg-white my-4"></div>
//               <p className="text-white mb-4">
//                 Download our state of the art app, available on both iOS and
//                 Android!
//               </p>
//               <div className="flex flex-col sm:flex-row sm:justify-center px-4 sm:space-x-4 gap-6 mt-4 w-full">
//                 <AppStoreButton />
//                 <PlayStoreButton />
//               </div>
//             </div>
//           </div>

//           <div className="flex-1 p-6 bg-[url('/img/createaccount.png')] bg-cover bg-center relative">
//             <div className="absolute inset-0 bg-black/40"></div>
//             <div className="relative z-10">
//               <h2 className="text-4xl font-semibold mb-2 text-white playball">
//                 Create an account
//               </h2>
//               <div className="w-10 h-[2px] bg-white my-4"></div>
//               <p className="text-white">
//                 Sign up easily and gain access to convenient mobility scooter
//                 rentals anytime!
//               </p>
//             </div>
//           </div>

//           <div className="flex-1 p-6 bg-[url('/img/scanqr.jpeg')] bg-cover bg-center relative">
//             <div className="absolute inset-0 bg-black/40"></div>
//             <div className="relative z-10">
//               <h2 className="text-4xl font-semibold mb-2 text-white playball">
//                 Scan and go!
//               </h2>
//               <div className="w-10 h-[2px] bg-white my-4"></div>
//               <p className="text-white">
//                 Scan the QR code on any of our scooters in the app to unlock it
//                 and start moving!
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       <div className="h-32" />

//       <section>
//         <div
//           data-aos="zoom-in"
//           className="flex flex-col md:flex-row flex-wrap w-full px-10 py-10 bg-[#d9aa1e]"
//         >
//           <div
//             data-aos="flip-left"
//             data-aos-duration="3000"
//             className="md:w-1/4"
//           >
//             <img
//               src={art1}
//               alt="scooter art 1"
//               className="w-full h-full object-cover"
//             />
//           </div>

//           <div
//             data-aos="flip-right"
//             data-aos-duration="3000"
//             className="md:w-1/4"
//           >
//             <img
//               src={art2}
//               alt="scooter art 2"
//               className="w-full h-full object-cover"
//             />
//           </div>

//           <div className="md:w-1/2  p-6">
//             <h2 className="text-4xl font-bold mb-4 playball">Host a fleet</h2>
//             <p className="py-2 pb-8">
//               Are you interested in hosting a U Krooze scooter fleet at your
//               venue, business, or next event? We would love to collaborate with
//               you! Our scooters offer a fun and unique experience for your
//               guests, making any occasion memorable and more accessible!
//             </p>
//             <button
//               type="button"
//               className="text-white bg-black hover:bg-black-100 focus:outline-none font-medium rounded-full text-sm px-5 py-4 text-center"
//             >
//               Learn More
//             </button>
//           </div>
//         </div>
//       </section>

//       <div className="h-32" />

//       <section>
//         <div data-aos="fade-up" data-aos-duration="3000" className="flex flex-col md:flex-row gap-6 px-10 md:px-20 py-10">
//           {testimonialBoxes.map((item) => (
//             <div
//               key={item.name}
//               className="flex-1 bg-white  shadow-lg overflow-hidden flex flex-col"
//             >
//               <div className="h-[80%]">
//                 <img
//                   src={item.image} // Replace with your actual images
//                   alt={item.name}
//                   className="w-full h-full object-cover"
//                   data-aos="flip-up" data-aos-duration="2000"
//                 />
//               </div>

//               <div className="h-[20%] p-4 flex flex-col justify-center text-center">
//                 <p className="text-sm text-gray-600 mb-2">
//                   {item.testimony}
//                 </p>
//                 <h3 className="text-lg ">
//                   {item.name}
//                 </h3>
//                 <h2 className="text-sm text-gray-400">
//                   {item.location}
//                 </h2>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>
//       <div className="h-32" />
//       <Footer />
//     </div>
//   );
// };

// export default SecondHome;
