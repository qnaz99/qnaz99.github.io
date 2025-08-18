import Header from "../components/Header";
import { Footer } from "../components/Footer";

const AboutUs = () => {
  return (
    <div className="bg-[#2166fc]">
      <Header />
      <div className="h-12"></div>
      
      <section className="px-10 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="section-title text-center playball text-5xl animate-fade-up mb-16 text-white">
            About
          </h1>
          
          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">ABOUT US</h2>
              <div className="w-16 h-1 bg-[#f7c01b] mx-auto mb-6"></div>
            </div>
            
            <div className="prose prose-lg max-w-none text-center">
              <p className="text-xl text-gray-700 leading-relaxed">
                Welcome to U Krooze, where we are revolutionizing the Micro Mobility industry with our innovative keyless mobility scooters. Our mission is simple: to provide convenient mobility solutions ready and waiting at your destination, so you can leave your personal equipment behind. We believe in encouraging everyone to go, get out, and explore the world around them. Join us on this journey and experience the freedom of effortless travel with U Krooze!
              </p>
            </div>

            <div className="mt-12 grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#f7c01b] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Innovation</h3>
                <p className="text-gray-600">Revolutionizing micro mobility with keyless technology</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[#f7c01b] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Convenience</h3>
                <p className="text-gray-600">Ready and waiting at your destination</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[#f7c01b] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Exploration</h3>
                <p className="text-gray-600">Encouraging everyone to explore the world</p>
              </div>
            </div>

            <div className="mt-12 bg-[#f7c01b] p-8 rounded-2xl text-center">
              <h3 className="text-2xl font-bold text-black mb-4">Our Mission</h3>
              <p className="text-black text-lg">
                To provide convenient mobility solutions that empower people to explore freely, 
                without the burden of carrying personal equipment. We're making mobility 
                accessible, convenient, and enjoyable for everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="h-32"></div>
      <Footer />
    </div>
  );
};

export default AboutUs;
