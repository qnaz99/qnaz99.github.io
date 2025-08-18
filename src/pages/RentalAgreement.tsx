import Header from "../components/Header";
import { Footer } from "../components/Footer";

const RentalAgreement = () => {
  return (
    <div className="bg-[#2166fc]">
      <Header />
      <div className="h-12"></div>
      
      <section className="px-10 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="section-title text-center playball text-5xl animate-fade-up mb-16 text-white">
            Rental Agreement
          </h1>
          
          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <div className="prose prose-lg max-w-none">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">RENTAL AGREEMENT</h2>
                <p className="text-lg text-gray-600">
                  PLEASE READ THIS AGREEMENT CAREFULLY. IT CONTAINS IMPORTANT TERMS AND CONDITIONS GOVERNING YOUR USE OF U KROOZE SERVICES.
                </p>
              </div>

              <div className="space-y-6 text-gray-700">
                <p>
                  This Rental Agreement, Waiver of Liability, and Release (the "Agreement") establishes the legally binding terms between you ("Rider," "You," or "Your") and U Krooze, LLC ("U Krooze") regarding your use of U Krooze's services. In exchange for your use of the U Krooze services, including the U Krooze mobile application (the "U Krooze App"), the U Krooze website (the "U Krooze Site"), and U Krooze Electric Vehicles (the "Vehicles") (collectively, the "U Krooze Services"), you agree to comply with all terms and conditions outlined in this Agreement.
                </p>

                <p>
                  By accessing or using any of the U Krooze Services, you acknowledge and accept the terms of this Agreement. In addition to the terms of service you agreed to when registering for the U Krooze Services, please read this Agreement carefully, as it includes provisions concerning the assumption of risk, releases, disclaimers, and a binding arbitration agreement that limit your legal rights and remedies. For further details, please refer to Sections 9 and 15 below.
                </p>

                <p>
                  U Krooze agrees to rent you the Vehicle, and you, as the Rider, agree to accept the rental subject to the terms and conditions outlined herein. Unless otherwise stated, all monetary values in this Agreement are expressed in U.S. dollars.
                </p>

                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">1. GENERAL RENTAL TERMS AND CONDITIONS</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-800">1.1 Rider is the Sole User.</h4>
                      <p>You are the sole renter of the Vehicle and are solely responsible for compliance with all terms and conditions of this Agreement. When you activate a Vehicle, it may only be used by you; you may not permit others to operate the Vehicle under any circumstances.</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-800">1.2 Rider is at Least 18 Years Old.</h4>
                      <p>You represent and warrant that you are at least 18 years of age. Persons under the age of 18 are prohibited from using or accessing U Krooze Services.</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-800">1.3 Rider is a Competent Vehicle Operator.</h4>
                      <p>You represent and warrant that you are competent in operating the Vehicle and are physically capable of safely using it. You accept full responsibility for any injuries, medical conditions, including death, or property damage resulting from your use of the U Krooze Services, as detailed in Section 15 of this Agreement.</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-800">1.4 Vehicle is the Exclusive Property of U Krooze.</h4>
                      <p>You acknowledge that the Vehicle, and any attached equipment, are the exclusive property of U Krooze at all times. You agree not to modify, damage, deface, or otherwise tamper with the Vehicle, nor use it for any commercial purposes, including advertising, without prior written consent from U Krooze.</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-800">1.5 Vehicle Operating Hours and Availability.</h4>
                      <p>You acknowledge that Vehicle availability is not guaranteed 24 hours a day, 7 days a week. U Krooze operates within a limited number of Vehicles and does not guarantee their availability at all times.</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-800">1.6 Vehicle Use Restrictions.</h4>
                      <p>The Vehicle is only to be used within the defined operational areas designated by U Krooze.</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-800">1.7 Compliance with Laws.</h4>
                      <p>You agree to comply with all local, state, and federal laws applicable to the use, operation, parking, and charging of the Vehicle, including, but not limited to, any helmet laws and traffic regulations.</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-800">1.8 Prohibited Acts.</h4>
                      <p>You agree to the following prohibited acts:</p>
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Do not operate the Vehicle while carrying items that may impair your ability to control it safely.</li>
                        <li>Refrain from placing objects on the Vehicle's handlebars that could interfere with its safe operation.</li>
                        <li>Using mobile phones, music players, or other distractions while operating the Vehicle is prohibited.</li>
                        <li>You must not operate the Vehicle under the influence of alcohol, drugs, or any substances that could impair your judgment or motor skills.</li>
                        <li>Only one rider is permitted per Vehicle.</li>
                        <li>Animals or pets are not permitted on the Vehicle.</li>
                        <li>Use only U Krooze-approved locks and parking mechanisms. Do not add or modify locks.</li>
                        <li>Vehicles must be parked in designated spots and must remain upright.</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-800">1.9 Appropriate Vehicle Use.</h4>
                      <p>You agree that the Vehicle is not intended for racing, stunt riding, or use in hazardous conditions such as unpaved roads, water, or areas where Vehicle use is restricted or prohibited.</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-800">1.10 Weight and Cargo Limits.</h4>
                      <p>The maximum allowable weight for the Rider and any cargo is 350 lbs. Exceeding this limit may result in unsafe operation of the Vehicle.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">2. PAYMENT AND FEES</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-800">2.1 Fees</h4>
                      <p>Riders may access and use the Vehicle on a pay-per-ride basis or according to the pricing outlined on the U Krooze App or Website. All fees and charges may be subject to applicable taxes and local government levies.</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-800">2.2 Promo Codes</h4>
                      <p>Promo codes offering discounts are one-time-use only and must be redeemed through the U Krooze App. U Krooze reserves the right to modify or cancel any discount at its discretion.</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-800">2.3 Maximum Rental Time and Charges</h4>
                      <p>The maximum daily charge for any Vehicle is $100.00. Vehicles not returned to the Original Rental Location within 48 hours of rental will be considered lost or stolen, and the Rider may incur a charge of up to $2,500.00.</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-800">2.4 Security Deposit</h4>
                      <p>A refundable security deposit of $75.00 will be charged upon renting a Vehicle. The deposit will be refunded upon the return of the Vehicle in the same condition as when it was rented, excluding normal wear and tear.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">3. ADDITIONAL TERMS OF USE</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-800">3.1 Safety Check</h4>
                      <p>Before using the Vehicle, the Rider is required to perform a basic safety inspection, including checking wheel alignment, brakes and lights functionality, the condition of the frame, sufficient battery charge, and any visible damage or signs of excessive wear.</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-800">3.2 Helmets and Safety</h4>
                      <p>While helmets are not legally required for class 2 medical devices, U Krooze strongly recommends that all Riders wear an appropriately certified helmet (Snell, CPSC, ANSI, or ASTM approved).</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-800">3.3 Vehicle Routes</h4>
                      <p>The Rider acknowledges that U Krooze does not provide or maintain designated routes for Vehicle use, and it cannot guarantee that safe riding conditions will always exist.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">4. TERMINATION</h3>
                  <p>U Krooze reserves the right to unilaterally terminate a Rider's access to the U Krooze Services, at its sole discretion, without prior notice or cause.</p>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">5. PRIVACY AND CONFIDENTIALITY</h3>
                  <p>You acknowledge and agree that U Krooze will maintain all personal information relating to Riders in accordance with its privacy policy.</p>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">6. LICENSE TO IMAGE AND LIKENESS</h3>
                  <p>In consideration of the opportunity to use U Krooze Services, you hereby grant U Krooze and its affiliates the full and unconditional right to use your appearance and voice in photographs, videos, and other recordings related to your use of the U Krooze Services for promotional and commercial purposes.</p>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">7. NOTICE</h3>
                  <p>U Krooze may be contacted at:</p>
                  <div className="mt-2 space-y-1">
                    <p><strong>Email:</strong> info@UKrooze.com</p>
                    <p><strong>Phone:</strong> (888) 735-3040</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">8. CHOICE OF LAW; DISPUTE RESOLUTION</h3>
                  <p>This Agreement shall be governed by the laws of the State of Florida, without regard to its conflict of laws principles. Both parties consent to the exclusive jurisdiction of the courts in the State of Florida, specifically Palm Beach County.</p>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">9. BINDING ARBITRATION AND CLASS ACTION WAIVER</h3>
                  <p className="font-semibold text-red-600">PLEASE READ THIS SECTION CAREFULLY—IT MAY SIGNIFICANTLY AFFECT YOUR LEGAL RIGHTS, INCLUDING YOUR RIGHT TO SUE IN COURT.</p>
                  <p className="mt-2">If the parties are unable to resolve the dispute through the U Krooze Support Process, the dispute shall be resolved through binding arbitration before a single arbitrator. The parties agree that any arbitration will be conducted solely on an individual basis and not as part of any class or representative action.</p>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">15. RELEASES; DISCLAIMERS; ASSUMPTION OF RISK</h3>
                  <p>In exchange for the privilege of using U Krooze Services and related equipment, Rider agrees to release and hold harmless U Krooze, its affiliates, employees, agents, contractors, and any third parties involved in providing the Services from any and all claims, damages, injuries, or liabilities arising from the use of the Services, Vehicles, or related equipment, except in cases of gross negligence or willful misconduct by the Released Persons.</p>
                </div>

                <div className="bg-[#f7c01b] p-6 rounded-xl text-center">
                  <h3 className="text-xl font-bold text-black mb-4">RIDER ACCEPTANCE OF AGREEMENT</h3>
                  <p className="text-black">
                    By signing below, I certify that I have read, understood, and voluntarily agree to the terms and conditions of this Agreement, including the release and assumption of risk clauses. I acknowledge the limitations of my legal rights and remedies under this Agreement and confirm that I am physically fit to operate the Vehicle. I agree to abide by all applicable laws and to ride at my own risk.
                  </p>
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

export default RentalAgreement;
