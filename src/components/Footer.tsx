const footerSections = [
  {
    title: "UKRooze",
    links: [
      { label: "About", href: "#" },
      { label: "FAQ", href: "#" },
      { label: "Support", href: "#" },
      { label: "Contact Us", href: "#" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Rent a scooter", href: "#" },
      { label: "Buy a scooter", href: "#" },
      { label: "Buy scooter accessories", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Rental Agreenment", href: "#" },
      { label: "Warranty Terms & Conditions", href: "#" },
    ],
  },
  {
    title: "Download",
    links: [
      { label: "iOS", href: "#" },
      { label: "Android", href: "#" },
    ],
  },
];

// const socialIcons = [
//   {
//     label: "Facebook",
//     href: "#",
//     svg: (
//       <svg
//         className="w-4 h-4"
//         aria-hidden="true"
//         xmlns="http://www.w3.org/2000/svg"
//         fill="currentColor"
//         viewBox="0 0 8 19"
//       >
//         <path
//           fillRule="evenodd"
//           d="M6.563 3.14H8V.133H5.965C3.85.133 3.46 1.276 3.46 2.794V4.26H2V6.785h1.46v7.964h2.533V6.785h2.025l.26-2.524H5.993V3.137c0-.39.13-.997.57-.997Z"
//           clipRule="evenodd"
//         />
//       </svg>
//     ),
//   },
//   {
//     label: "Instagram",
//     href: "#",
//     svg: (
//       <svg
//         className="w-4 h-4"
//         aria-hidden="true"
//         xmlns="http://www.w3.org/2000/svg"
//         fill="currentColor"
//         viewBox="0 0 20 20"
//       >
//         <path d="M10 2.7c2.6 0 2.9 0 3.9.1.9.1 1.4.2 1.8.4.5.2.8.4 1.1.7.3.3.5.6.7 1.1.2.4.3.9.4 1.8.1 1 .1 1.3.1 3.9s0 2.9-.1 3.9c-.1.9-.2 1.4-.4 1.8a2.8 2.8 0 0 1-.7 1.1 2.8 2.8 0 0 1-1.1.7c-.4.2-.9.3-1.8.4-1 .1-1.3.1-3.9.1s-2.9 0-3.9-.1c-.9-.1-1.4-.2-1.8-.4a2.8 2.8 0 0 1-1.1-.7 2.8 2.8 0 0 1-.7-1.1c-.2-.4-.3-.9-.4-1.8C2.7 12.9 2.7 12.6 2.7 10s0-2.9.1-3.9c.1-.9.2-1.4.4-1.8a2.8 2.8 0 0 1 .7-1.1 2.8 2.8 0 0 1 1.1-.7c.4-.2.9-.3 1.8-.4C7.1 2.7 7.4 2.7 10 2.7Zm0 1.6c-2.5 0-2.8 0-3.8.1-.7.1-1 .2-1.3.3a1.2 1.2 0 0 0-.7.4c-.2.2-.3.4-.4.7-.1.3-.2.6-.3 1.3-.1 1-.1 1.3-.1 3.8s0 2.8.1 3.8c.1.7.2 1 .3 1.3.1.3.3.5.4.7.2.2.4.3.7.4.3.1.6.2 1.3.3 1 .1 1.3.1 3.8.1s2.8 0 3.8-.1c.7-.1 1-.2 1.3-.3a1.2 1.2 0 0 0 .7-.4c.2-.2.3-.4.4-.7.1-.3.2-.6.3-1.3.1-1 .1-1.3.1-3.8s0-2.8-.1-3.8c-.1-.7-.2-1-.3-1.3a1.2 1.2 0 0 0-.4-.7 1.2 1.2 0 0 0-.7-.4c-.3-.1-.6-.2-1.3-.3-1-.1-1.3-.1-3.8-.1ZM10 6a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm0 1.6a2.4 2.4 0 1 0 0 4.8 2.4 2.4 0 0 0 0-4.8Zm4.3-2a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z" />
//       </svg>
//     ),
//   },
//   {
//     label: "Twitter",
//     href: "#",
//     svg: (
//       <svg
//         className="w-4 h-4"
//         aria-hidden="true"
//         xmlns="http://www.w3.org/2000/svg"
//         fill="currentColor"
//         viewBox="0 0 20 17"
//       >
//         <path d="M20 1.9c-.7.3-1.4.6-2.1.7.8-.5 1.3-1.2 1.6-2.1-.8.5-1.6.8-2.5 1a4.3 4.3 0 0 0-7.3 3.9A12.2 12.2 0 0 1 1.4.8a4.2 4.2 0 0 0-.6 2.1c0 1.5.8 2.8 2 3.5-.7 0-1.4-.2-2-.5 0 2.1 1.4 3.9 3.3 4.3-.6.1-1.2.2-1.8.2-.4 0-.9 0-1.3-.1.9 2.1 2.8 3.5 5.2 3.5A8.7 8.7 0 0 1 0 15c1.9 1.2 4.2 1.8 6.6 1.8 7.9 0 12.3-6.6 12.3-12.3v-.6c.8-.6 1.4-1.2 2-2Z" />
//       </svg>
//     ),
//   },
//   {
//     label: "GitHub",
//     href: "#",
//     svg: (
//       <svg
//         className="w-4 h-4"
//         aria-hidden="true"
//         xmlns="http://www.w3.org/2000/svg"
//         fill="currentColor"
//         viewBox="0 0 20 20"
//       >
//         <path
//           fillRule="evenodd"
//           d="M10 .3a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-2c-2.8.6-3.4-1.2-3.4-1.2a2.7 2.7 0 0 0-1.2-1.5c-1-.7.1-.7.1-.7a2.1 2.1 0 0 1 1.6 1.1 2.2 2.2 0 0 0 3 1 2.2 2.2 0 0 1 .7-1.4c-2.3-.2-4.7-1.2-4.7-5.2a4 4 0 0 1 1.1-2.8 3.7 3.7 0 0 1 .1-2.8s.9-.3 3 1.1a10.3 10.3 0 0 1 5.4 0c2-1.4 3-1.1 3-1.1.6 1.5.2 2.6.1 2.8a4 4 0 0 1 1.1 2.8c0 4-2.4 5-4.8 5.2a2.5 2.5 0 0 1 .8 2v2.9c0 .3.2.6.7.5A10 10 0 0 0 10 .3Z"
//           clipRule="evenodd"
//         />
//       </svg>
//     ),
//   },
// ];

export function Footer() {
  return (
    <footer className="bg-[#f7c01b]">
      <div className="mx-auto w-full max-w-screen-xl">
        <div className="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                {section.title}
              </h2>
              <ul className="text-white dark:text-whitefont-medium">
                {section.links.map((link) => (
                  <li key={link.label} className="mb-4">
                    <a href={link.href} className="hover:underline">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Badge Images Section */}
        <div className="px-4 py-6 border-t border-yellow-600">
          <div className="flex flex-wrap justify-center items-center gap-6">
            <img 
              src="./img/badges/veteran.avif" 
              alt="Veteran Owned Business" 
              className="h-16 w-auto object-contain"
            />
            <img 
              src="./img/badges/SDVOSB.avif" 
              alt="Service Disabled Veteran Owned Small Business" 
              className="h-16 w-auto object-contain"
            />
            <img 
              src="./img/badges/sam.avif" 
              alt="SAM Registered" 
              className="h-16 w-auto object-contain"
            />
            <a 
              href="https://www.bbb.org/us//fort-lauderdale/profile/mobility-scooters/u-krooze-llc-0633-92053006" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity duration-200"
            >
              <img 
                src="./img/badges/bbb.avif" 
                alt="Better Business Bureau" 
                className="h-16 w-auto object-contain"
              />
            </a>
            <img 
              src="./img/badges/locally.avif" 
              alt="Locally Owned" 
              className="h-16 w-auto object-contain"
            />
          </div>
        </div>

        <div className="px-4 py-6 md:flex md:items-center md:justify-between">
          <span className="text-sm text-white dark:white sm:text-center">
            © 2025{" "}
            <a href="#" className="hover:underline">
              UKrooze
            </a>
            . All Rights Reserved.
          </span>
          {/* <div className="flex mt-4 space-x-5 sm:justify-center md:mt-0">
            {socialIcons.map(({ label, href, svg }) => (
              <a
                key={label}
                href={href}
                className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                {svg}
              </a>
            ))}
          </div> */}
        </div>
      </div>
    </footer>
  );
}
