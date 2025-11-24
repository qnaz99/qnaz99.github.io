import Header from "../components/Header";
import { Footer } from "../components/Footer";
import { useEffect, useMemo, useState } from "react";

type StatusState = "idle" | "success" | "error";

const GovernmentContracting = () => {
  useEffect(() => {
    document.title = "Government Contracting | U Krooze";
  }, []);

  const procurementTypes = useMemo(
    () => [
      "RFI / Sources Sought",
      "RFP / Solicitation",
      "IDIQ / BPA",
      "GSA / Schedule",
      "Other",
    ],
    []
  );

  const interestOptions = useMemo(
    () => [
      "Keyless rental scooters (facilities)",
      "Ramps",
      "Lift chairs",
      "Scooters (purchase)",
      "Batteries",
      "Lifts / accessories",
      "Other mobility solutions",
    ],
    []
  );

  const [form, setForm] = useState({
    name: "",
    agency: "",
    email: "",
    phone: "",
    procurementType: "",
    interests: [] as string[],
    timeline: "",
    details: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<StatusState>("idle");

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleInterest = (value: string) => {
    setForm((prev) => {
      const isSelected = prev.interests.includes(value);
      const updated = isSelected
        ? prev.interests.filter((v) => v !== value)
        : [...prev.interests, value];
      return { ...prev, interests: updated };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");
    try {
      const endpoint =
        "https://script.google.com/macros/s/AKfycbxexwpcSUxtxJhAwLL7cSH6DbHpoGBoWmeMZe8EP2SSpdkbi6ybAcXY474BUcmhMjye/exec";

      const data = new FormData();
      data.append("form", "government");
      data.append("name", form.name);
      data.append("agency", form.agency);
      data.append("email", form.email);
      data.append("phone", form.phone);
      data.append("procurementType", form.procurementType);
      data.append("interests", form.interests.join(", "));
      data.append("timeline", form.timeline);
      data.append("details", form.details);
      data.append("ua", navigator.userAgent);

      await fetch(endpoint, {
        method: "POST",
        body: data,
        mode: "no-cors",
      });

      setStatus("success");
      setForm({
        name: "",
        agency: "",
        email: "",
        phone: "",
        procurementType: "",
        interests: [],
        timeline: "",
        details: "",
      });
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

      {/* Hero */}
      <section className="px-10 pt-16 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h1 className="playball text-5xl text-white mb-4">
              Government Contracting
            </h1>
            <p className="text-white/90 max-w-3xl mx-auto text-lg">
              Service-Disabled Veteran-Owned Small Business (SDVOSB) providing mobility
              solutions at scale for Federal, State, County and City procurement.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
              <img src="/img/badges/SDVOSB.avif" alt="SDVOSB" className="h-10 w-auto rounded bg-white/80 p-1" />
              <img src="/img/badges/sam.avif" alt="SAM Registered" className="h-10 w-auto rounded bg-white/80 p-1" />
              <img src="/img/badges/veteran.avif" alt="Veteran Owned" className="h-10 w-auto rounded bg-white/80 p-1" />
              <img src="/img/badges/bbb.avif" alt="BBB" className="h-10 w-auto rounded bg-white/80 p-1" />
              <img src="/img/badges/locally.avif" alt="Locally Owned" className="h-10 w-auto rounded bg-white/80 p-1" />
            </div>
          </div>
        </div>
      </section>

      {/* Two-column: Capability Statement + Lead Form */}
      <section className="px-10 pb-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          {/* Capability Statement */}
          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Capability Statement
            </h2>
            <div className="w-16 h-1 bg-[#f7c01b] mb-6"></div>

            {/* Company Overview */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Company Overview</h3>
                <p className="text-gray-700">
                  U Krooze delivers keyless rental scooters and mobility products for
                  healthcare, government facilities, transportation hubs and public venues.
                  We provide deployment, fleet management, service and large-scale
                  product fulfillment.
                </p>
              </div>

              {/* Core Competencies */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Core Competencies</h3>
                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                  <li>Keyless rental scooter deployment and operations</li>
                  <li>Facility mobility programs (indoor/outdoor)</li>
                  <li>Scooters, ramps, lift chairs, batteries and lifts</li>
                  <li>Preventive maintenance and on-site service</li>
                  <li>Logistics, warehousing and nationwide fulfillment</li>
                </ul>
              </div>

              {/* Differentiators */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Differentiators</h3>
                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                  <li>SDVOSB-owned and operated</li>
                  <li>Keyless rental technology with centralized fleet control</li>
                  <li>End-to-end deployment, training and support</li>
                  <li>Scalable programs tailored to facilities</li>
                  <li>Reliable supply chain for high-volume orders</li>
                </ul>
              </div>

              {/* Past Performance */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Past Performance</h3>
                <p className="text-gray-700">
                  Representative deployments and supply contracts available upon request.
                  Details can be provided to contracting officers and program managers.
                </p>
              </div>

              {/* Company Data */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 rounded-xl p-4">
                <div>
                  <h4 className="text-sm font-semibold text-gray-600">Business Type</h4>
                  <p className="text-gray-800">SDVOSB</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-600">UEI</h4>
                  <p className="text-gray-800">On file</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-600">CAGE</h4>
                  <p className="text-gray-800">On file</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-600">NAICS</h4>
                  <p className="text-gray-800">
                    Mobility equipment, rentals, logistics (detailed codes on file)
                  </p>
                </div>
              </div>

              {/* Contact */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Primary Contact</h3>
                <p className="text-gray-700">
                  Government Contracting Team<br />
                  support@ukrooze.com • 1-888-735-3040
                </p>
              </div>

              {/* Optional: PDF Link */}
              <div className="pt-2">
                <a
                  href="/Capabilities 7 31 25 (2).pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-[#2166fc] font-semibold hover:underline"
                >
                  Download full PDF capability statement
                </a>
              </div>
            </div>
          </div>

          {/* Lead Form */}
          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2 text-center">
              Government Lead Form
            </h2>
            <p className="text-center text-gray-600 mb-6">
              Share your procurement details and our team will respond quickly.
            </p>

            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Full name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2166fc] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Agency / Organization
                  </label>
                  <input
                    type="text"
                    name="agency"
                    value={form.agency}
                    onChange={handleChange}
                    required
                    placeholder="Agency or organization"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2166fc] focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="name@agency.gov"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2166fc] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="(xxx) xxx-xxxx"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2166fc] focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Procurement Type
                  </label>
                  <select
                    name="procurementType"
                    value={form.procurementType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2166fc] focus:border-transparent"
                  >
                    <option value="">Select...</option>
                    {procurementTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timeline
                  </label>
                  <input
                    type="text"
                    name="timeline"
                    value={form.timeline}
                    onChange={handleChange}
                    placeholder="e.g., Q1 award, 30-60 days, ASAP"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2166fc] focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interests
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {interestOptions.map((label) => {
                    const id = `interest-${label}`;
                    return (
                      <label key={label} className="flex items-center gap-2 text-gray-700">
                        <input
                          id={id}
                          type="checkbox"
                          className="rounded border-gray-300 text-[#2166fc] focus:ring-[#2166fc]"
                          checked={form.interests.includes(label)}
                          onChange={() => toggleInterest(label)}
                        />
                        <span>{label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Details
                </label>
                <textarea
                  name="details"
                  value={form.details}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Describe scope, locations, volumes, and any compliance requirements."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2166fc] focus:border-transparent resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#2166fc] hover:bg-[#1a56d4] text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Submitting..." : "Submit Lead"}
              </button>

              <div aria-live="polite" className="text-center">
                {status === "success" && (
                  <p className="text-green-600 font-medium">
                    Thanks! Your information was received.
                  </p>
                )}
                {status === "error" && (
                  <p className="text-red-600 font-medium">
                    Something went wrong. Please try again.
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>

      <div className="h-32"></div>
      <Footer />
    </div>
  );
};

export default GovernmentContracting;


