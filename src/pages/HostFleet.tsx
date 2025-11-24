import Header from "../components/Header";
import { Footer } from "../components/Footer";
import { useState } from "react";

const HostFleet = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    business: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");
    try {
      const endpoint =
        "https://script.google.com/macros/s/AKfycbxexwpcSUxtxJhAwLL7cSH6DbHpoGBoWmeMZe8EP2SSpdkbi6ybAcXY474BUcmhMjye/exec";

      const data = new FormData();
      data.append("form", "host");
      data.append("firstName", form.firstName);
      data.append("lastName", form.lastName);
      data.append("email", form.email);
      data.append("business", form.business);
      data.append("message", form.message);
      data.append("ua", navigator.userAgent);

      await fetch(endpoint, {
        method: "POST",
        body: data,
        mode: "no-cors",
      });

      setStatus("success");
      setForm({ firstName: "", lastName: "", email: "", business: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#2166fc]">
      <Header />
      <div className="h-12"></div>
      
      <section className="px-10 py-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="section-title text-center playball text-5xl animate-fade-up mb-16 text-white">
            Host a UKrooze Fleet
          </h1>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left side - Content */}
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold text-white playball">
                Get in touch with us
              </h2>
              <div className="w-16 h-1 bg-[#f7c01b] mb-6"></div>
              <p className="text-white text-lg leading-relaxed">
                Are you interested in hosting a UKrooze scooter fleet at your venue, 
                business, or next event? We would love to collaborate with you! 
                Our scooters offer a fun and unique experience for your guests, 
                making any occasion memorable and more accessible.
              </p>
              <div className="bg-[#f7c01b] p-6 rounded-2xl">
                <h3 className="text-xl font-semibold text-black mb-3">Why host with us?</h3>
                <ul className="text-black space-y-2">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                    Increase foot traffic to your venue
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                    Enhance guest experience and accessibility
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                    Generate additional revenue opportunities
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                    Stand out from competitors
                  </li>
                </ul>
              </div>
            </div>

            {/* Right side - Contact Form */}
            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <h3 className="text-2xl font-semibold text-center mb-6 text-gray-800">
                Contact Us
              </h3>
              <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      placeholder="Enter your first name"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2166fc] focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      placeholder="Enter your last name"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2166fc] focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2166fc] focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business/Venue Name
                  </label>
                  <input
                    type="text"
                    name="business"
                    value={form.business}
                    onChange={handleChange}
                    placeholder="Enter your business or venue name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2166fc] focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your venue and how we can help..."
                    rows={4}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2166fc] focus:border-transparent transition-all duration-200 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#2166fc] hover:bg-[#1a56d4] text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#2166fc] focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>

                <div aria-live="polite" className="text-center">
                  {status === "success" && (
                    <p className="text-green-600 font-medium">Thanks! We received your message.</p>
                  )}
                  {status === "error" && (
                    <p className="text-red-600 font-medium">Something went wrong. Please try again.</p>
                  )}
                </div>
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

export default HostFleet;
