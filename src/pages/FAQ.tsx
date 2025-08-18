import Header from "../components/Header";
import { FAQAccordion, Footer } from "../components";
import { faqs } from "../assets/faq";

const FAQ = () => {
  return (
    <div className="bg-[#2166fc]">
      <Header />
      <div className="h-12"></div>
      
      <section className="px-10 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="section-title text-center playball text-5xl animate-fade-up mb-16 text-white">
            Frequently Asked Questions
          </h1>
          
          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Need Help? Find Answers Here
              </h2>
              <p className="text-gray-600">
                Browse through our most commonly asked questions to get quick answers about our services.
              </p>
            </div>
            
            <FAQAccordion data={faqs} />
          </div>
        </div>
      </section>

      <div className="h-32"></div>
      <Footer />
    </div>
  );
};

export default FAQ;
