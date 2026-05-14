import React from "react";
import {
  Truck,
  ShieldCheck,
  Zap,
  Globe,
  Clock,
  PackageCheck,
} from "lucide-react";
import { Link } from "react-router";

const Services = () => {
  const serviceList = [
    {
      id: 1,
      title: "Standard Delivery",
      description:
        "Reliable door-to-door delivery within 24-48 hours. Perfect for everyday items and packages.",
      icon: <Truck className="w-10 h-10 text-primary" />,
      color: "bg-blue-50",
    },
    {
      id: 2,
      title: "Zap-Express",
      description:
        "Need it now? Our express service guarantees same-day delivery within the city limits.",
      icon: <Zap className="w-10 h-10 text-yellow-500" />,
      color: "bg-yellow-50",
    },
    {
      id: 3,
      title: "Secure Documents",
      description:
        "Special handling for sensitive paperwork, legal documents, and certificates with end-to-end tracking.",
      icon: <ShieldCheck className="w-10 h-10 text-green-600" />,
      color: "bg-green-50",
    },
    {
      id: 4,
      title: "Nationwide Coverage",
      description:
        "We reach every corner of the country. From urban centers to rural districts, we've got you covered.",
      icon: <Globe className="w-10 h-10 text-purple-600" />,
      color: "bg-purple-50",
    },
    {
      id: 5,
      title: "Scheduled Pickups",
      description:
        "Plan ahead! Schedule your parcel pickup between 4 PM and 7 PM at your convenience.",
      icon: <Clock className="w-10 h-10 text-orange-500" />,
      color: "bg-orange-50",
    },
    {
      id: 6,
      title: "Bulk Logistics",
      description:
        "Shipping for businesses. Manage large inventory movements with our dedicated corporate tools.",
      icon: <PackageCheck className="w-10 h-10 text-teal-600" />,
      color: "bg-teal-50",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-[#003d3d] py-16 md:py-24 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Our <span className="text-[#c6e871]">Services</span>
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto text-lg">
          Whether it's a critical document or a heavy package, ZapShift provides
          the fastest and most secure logistics solutions in the region.
        </p>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceList.map((service) => (
            <div
              key={service.id}
              className="p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-2"
            >
              <div
                className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
              >
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-[#003d3d] mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-5xl mx-auto px-4 mb-20">
        <div className="bg-[#c6e871] rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-black text-[#003d3d] mb-4">
              Ready to send something?
            </h2>
            <p className="text-[#003d3d]/70 font-medium">
              Calculate your costs and book your first parcel in minutes.
            </p>
          </div>
          <Link
            to="/send-parcel"
            className="btn btn-lg bg-[#003d3d] text-white hover:bg-[#002d2d] border-none px-10 rounded-2xl normal-case"
          >
            Send a Parcel
          </Link>
        </div>
      </section>

      {/* FAQ Sneak Peek */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#003d3d] mb-12">
            Service FAQ
          </h2>
          <div className="space-y-6 text-left">
            <div className="collapse collapse-plus bg-white rounded-2xl shadow-sm">
              <input type="radio" name="my-accordion-3" defaultChecked />
              <div className="collapse-title text-xl font-medium text-[#003d3d]">
                What is the maximum weight per parcel?
              </div>
              <div className="collapse-content text-gray-600">
                <p>
                  We handle parcels from 0.5kg up to 50kg. For anything heavier,
                  please contact our corporate logistics team.
                </p>
              </div>
            </div>
            <div className="collapse collapse-plus bg-white rounded-2xl shadow-sm">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title text-xl font-medium text-[#003d3d]">
                Do you provide packaging materials?
              </div>
              <div className="collapse-content text-gray-600">
                <p>
                  Currently, we require customers to have their items packed.
                  However, our riders can provide ZapShift security tape at
                  pickup.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
