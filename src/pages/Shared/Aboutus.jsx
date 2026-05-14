import React from "react";
import { Link } from "react-router";
import { Target, Users, Rocket, ShieldCheck } from "lucide-react";

const Aboutus = () => {
  const stats = [
    { label: "Parcels Delivered", value: "1M+" },
    { label: "Active Riders", value: "5,000+" },
    { label: "Cities Covered", value: "64" },
    { label: "Happy Clients", value: "500k+" },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#003d3d] text-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-black mb-6">
            Moving Things <span className="text-[#c6e871]">Better.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            ZapShift is more than just a delivery service. We are a
            technology-driven logistics partner dedicated to bridging the gap
            between businesses and their customers with lightning-fast
            efficiency.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-50 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-3xl md:text-4xl font-bold text-[#003d3d]">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 font-medium uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Section: Mission & Vision */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-[#003d3d]">
              Our Mission is to <span className="text-primary italic">Zap</span>{" "}
              through boundaries.
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Founded in 2024, ZapShift started with a simple problem:
              traditional logistics were too slow for the digital age. We built
              a platform that optimizes routes, empowers riders, and provides
              transparent tracking for every single parcel.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-[#c6e871] p-2 rounded-lg">
                  <Target className="w-5 h-5 text-[#003d3d]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#003d3d]">Efficiency First</h4>
                  <p className="text-sm text-gray-500">
                    We use AI to find the fastest paths to your door.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-[#c6e871] p-2 rounded-lg">
                  <ShieldCheck className="w-5 h-5 text-[#003d3d]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#003d3d]">Total Security</h4>
                  <p className="text-sm text-gray-500">
                    Your parcels are insured and handled with extreme care.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-[#c6e871]/20 rounded-3xl blur-xl group-hover:bg-[#c6e871]/30 transition-all"></div>
            <img
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800"
              alt="Warehouse logistics"
              className="relative rounded-3xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 bg-[#003d3d] text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-16">
            Why People Choose ZapShift
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="flex justify-center">
                <Users className="w-12 h-12 text-[#c6e871]" />
              </div>
              <h3 className="text-xl font-bold">Community Driven</h3>
              <p className="text-gray-400">
                We support our riders with fair pay and flexible hours, creating
                a motivated team.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex justify-center">
                <Rocket className="w-12 h-12 text-[#c6e871]" />
              </div>
              <h3 className="text-xl font-bold">Next-Gen Tech</h3>
              <p className="text-gray-400">
                Real-time GPS tracking and automated notifications keep you in
                the loop 24/7.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex justify-center">
                <ShieldCheck className="w-12 h-12 text-[#c6e871]" />
              </div>
              <h3 className="text-xl font-bold">Safe & Sound</h3>
              <p className="text-gray-400">
                Multiple verification steps ensure that your parcel reaches the
                right hands.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto bg-[#c6e871] rounded-[2rem] p-10 md:p-16 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-[#003d3d] mb-6">
            Join the Shift.
          </h2>
          <p className="text-[#003d3d]/70 text-lg mb-10 font-medium">
            Whether you're a business looking to scale or a rider looking for
            opportunities, ZapShift is the place for you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/send-parcel" className="btn btn-neutral rounded-xl px-8">
              Ship Now
            </Link>
            <Link to="/rider" className="btn btn-outline rounded-xl px-8">
              Become a Rider
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Aboutus;
