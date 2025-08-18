import Header from "../components/Header";
import { Footer } from "../components/Footer";
import { AppStoreButton } from "../components/AppStoreButton";
import { PlayStoreButton } from "../components/PlayStoreButton";

const RentScooter = () => {
  return (
    <div className="bg-[#2166fc]">
      <Header />
      <div className="h-12"></div>
      
      <section className="px-10 py-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="section-title text-center playball text-5xl animate-fade-up mb-16 text-white">
            Rent a Scooter
          </h1>
          
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            {/* Left side - Main content */}
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold text-white playball">
                Get Moving in Minutes
              </h2>
              <div className="w-16 h-1 bg-[#f7c01b] mb-6"></div>
              <p className="text-white text-lg leading-relaxed">
                Experience the freedom of convenient mobility with our innovative keyless scooters. 
                No more carrying heavy equipment - our scooters are ready and waiting at your destination.
              </p>
              
              <div className="bg-[#f7c01b] p-6 rounded-2xl">
                <h3 className="text-xl font-semibold text-black mb-4">Why Choose U Krooze?</h3>
                <ul className="text-black space-y-2">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                    Keyless access - no keys to carry or lose
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                    Always charged and ready to go
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                    Convenient locations at popular destinations
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                    Support up to 350 lbs weight capacity
                  </li>
                </ul>
              </div>
            </div>

            {/* Right side - App download */}
            <div className="bg-white rounded-3xl p-8 shadow-2xl text-center">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                Download the App
              </h3>
              <p className="text-gray-600 mb-8">
                Get started with U Krooze by downloading our mobile app. 
                Available on both iOS and Android devices.
              </p>
              <div className="grid grid-cols-1 gap-4">
                <AppStoreButton />
                <PlayStoreButton />
              </div>
            </div>
          </div>

          {/* How it works section */}
          <div className="bg-white rounded-3xl p-8 shadow-2xl mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
              How It Works
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-[#f7c01b] rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl font-bold text-black">1</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Download & Sign Up</h3>
                <p className="text-gray-600">
                  Download the U Krooze app and create your account in minutes. 
                  Add your payment method and you're ready to go.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-[#f7c01b] rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl font-bold text-black">2</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Find & Scan</h3>
                <p className="text-gray-600">
                  Locate available scooters on the map, scan the QR code, 
                  and unlock your ride instantly.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-[#f7c01b] rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl font-bold text-black">3</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Ride & Return</h3>
                <p className="text-gray-600">
                  Enjoy your ride and return the scooter to any designated 
                  station when you're done.
                </p>
              </div>
            </div>
          </div>

          {/* Pricing and details */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                Pricing
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                  <span className="font-medium text-gray-700">Pay-per-ride</span>
                  <span className="text-lg font-semibold text-gray-800">Variable</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                  <span className="font-medium text-gray-700">Maximum daily charge</span>
                  <span className="text-lg font-semibold text-gray-800">$100.00</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                  <span className="font-medium text-gray-700">Security deposit</span>
                  <span className="text-lg font-semibold text-gray-800">$75.00</span>
                </div>
              </div>
              <p className="text-sm text-gray-500 text-center mt-4">
                *Refundable upon return in good condition
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                Requirements
              </h3>
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                  <svg className="w-6 h-6 text-[#2166fc] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700">Must be 18 years or older</span>
                </div>
                <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                  <svg className="w-6 h-6 text-[#2166fc] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700">Valid credit/debit card</span>
                </div>
                <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                  <svg className="w-6 h-6 text-[#2166fc] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700">Maximum weight: 350 lbs</span>
                </div>
                <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                  <svg className="w-6 h-6 text-[#2166fc] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700">U Krooze mobile app</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-32"></div>
      <Footer />
    </div>
  );
};

export default RentScooter;
