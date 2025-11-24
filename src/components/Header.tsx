"use client";
import "../index.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  Battery100Icon,
  DevicePhoneMobileIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon, PlayCircleIcon } from "@heroicons/react/20/solid";

const productPaths = [
  {
    name: "Rent a scooter",
    description: "Use the UKrooze app to rent a Scooter nearby within minutes",
    href: "/rent-scooter",
    icon: DevicePhoneMobileIcon,
    key: "rent",
  },
  {
    name: "Buy a scooter",
    description: "Purchase one of our state-of-the-art Pride Scooters",
    href: "/buy-scooter",
    icon: ShoppingCartIcon,
  },
  {
    name: "Buy a battery",
    description:
      "Buy a high quality replacement battery for your Pride Scooter",
    href: "#",
    icon: Battery100Icon,
  },
];

const callsToAction = [
  {
    name: "Watch demo",
    href: "#",
    icon: PlayCircleIcon,
  },
];

const routes = [
  {
    name: "Services",
    path: "#",
    subPath: productPaths,
  },
  {
    name: "FAQ",
    path: "/faq",
  },
  {
    name: "Locations",
    path: "/locations",
  },
  {
    name: "Rental Agreement",
    path: "/rental-agreement",
  },
  {
    name: "Support",
    path: "/support",
  },
  {
    name: "Government Contracting",
    path: "/government",
  },
  {
    name: "Host a Fleet",
    path: "/host-fleet",
  },
  {
    name: "About Us",
    path: "/about-us",
  },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-[#d9aa1e]">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <Link to="/">
            <span className="sr-only">UKrooze</span>
            <img
              alt="UKrooze logo"
              src="./img/logo-raw.png"
              className="h-6 w-auto scale-250 fade-in-delayed pl-4 md:pl-0"
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-[#023bb3]"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          {routes.map((route) =>
            route.subPath ? (
              <Popover className="relative" key={route.name}>
                <PopoverButton className="flex items-center gap-x-1 text-sm/6 font-semibold text-[#023bb3] fade-in-delayed">
                  {route.name}
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="size-5 flex-none text-[#023bb3]"
                  />
                </PopoverButton>
                <PopoverPanel
                  transition
                  className="absolute top-full -left-8 z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
                >
                  <div className="p-4">
                    {route.subPath.map((item) => {
                      const DemoIcon = callsToAction[0].icon;
                      return (
                        <div key={item.name}>
                          <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-gray-50">
                            <div className="flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                              <item.icon
                                aria-hidden="true"
                                className="size-6 text-gray-600 group-hover:text-indigo-600"
                              />
                            </div>
                            <div className="flex-auto">
                              <Link
                                to={item.href}
                                className="block font-semibold text-gray-900"
                              >
                                {item.name}
                                <span className="absolute inset-0" />
                              </Link>
                              <p className="mt-1 text-gray-600">
                                {item.description}
                              </p>
                            </div>
                          </div>
                          {item.key === "rent" && (
                            <div className="divide-gray-900/5 bg-gray-50">
                              <Link
                                key={callsToAction[0].name}
                                to={callsToAction[0].href}
                                className="flex items-center justify-center gap-x-2.5 p-3 text-sm/6 font-semibold text-gray-900 hover:bg-gray-100"
                              >
                                <DemoIcon
                                  aria-hidden="true"
                                  className="size-5 flex-none text-gray-400"
                                />
                                {callsToAction[0].name}
                              </Link>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </PopoverPanel>
              </Popover>
            ) : (
              <Link
                key={route.name}
                to={route.path}
                className="fade-in-delayed text-sm/6 font-semibold text-[#023bb3]"
              >
                {route.name}
              </Link>
            )
          )}
        </PopoverGroup>
      </nav>

      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-[#d9aa1e] px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">UKrooze</span>
              <img
                alt=""
                src="./img/logo.png"
                className="h-8 w-auto scale-200 pl-2 fade-in-delayed"
              />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {routes.map((route) =>
                  route.subPath ? (
                    <Disclosure as="div" className="-mx-3" key={route.name}>
                      <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                        {route.name}
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="size-5 flex-none group-data-open:rotate-180"
                        />
                      </DisclosureButton>
                      <DisclosurePanel className="mt-2 space-y-2">
                        {[...route.subPath, ...callsToAction].map((item) => (
                          <DisclosureButton
                            key={item.name}
                            as={Link}
                            to={item.href}
                            className="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-100"
                          >
                            {item.name}
                          </DisclosureButton>
                        ))}
                      </DisclosurePanel>
                    </Disclosure>
                  ) : (
                    <Link
                      key={route.name}
                      to={route.path}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      {route.name}
                    </Link>
                  )
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
