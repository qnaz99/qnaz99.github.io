import Header from "../components/Header";
import { Footer } from "../components/Footer";

const Support = () => {
  return (
    <div className="bg-[#2166fc]">
      <Header />
      <div className="h-12"></div>
      
      <section className="px-10 py-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="section-title text-center playball text-5xl animate-fade-up mb-16 text-white">
            Support & Contact
          </h1>
          
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left side - Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-semibold text-white playball mb-6">
                  Need Help?
                </h2>
                <div className="w-16 h-1 bg-[#f7c01b] mb-6"></div>
                <p className="text-white text-lg leading-relaxed">
                  Have questions or need assistance? Contact us for support. Our team is here to help you.
                </p>
              </div>

              <div className="bg-[#f7c01b] p-8 rounded-2xl">
                <h3 className="text-2xl font-semibold text-black mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-[#2166fc] rounded-full flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">CALL US</p>
                      <p className="text-xl font-bold text-black">1-888-735-3040</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-[#2166fc] rounded-full flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">EMAIL US</p>
                      <p className="text-xl font-bold text-black">SUPPORT@UKROOZE.COM</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
                <h4 className="text-lg font-semibold text-white mb-3">Business Hours</h4>
                <p className="text-white">
                  Monday - Friday: 9:00 AM - 6:00 PM EST<br />
                  Saturday: 10:00 AM - 4:00 PM EST<br />
                  Sunday: Closed
                </p>
              </div>
            </div>

            {/* Right side - Support Form */}
            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <h3 className="text-2xl font-semibold text-center mb-6 text-gray-800">
                Send us a Message
              </h3>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2166fc] focus:border-transparent transition-all duration-200"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2166fc] focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="What can we help you with?"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2166fc] focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    placeholder="Please describe your issue or question in detail..."
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2166fc] focus:border-transparent transition-all duration-200 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#2166fc] hover:bg-[#1a56d4] text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#2166fc] focus:ring-offset-2"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <div className="h-32"></div>
      <Footer />
    </div>
  );
};

export default Support;
