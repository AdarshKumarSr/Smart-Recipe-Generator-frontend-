import React, { useState } from "react";

const ContactUs = () => {
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    const formData = new FormData(e.target);
    formData.append("access_key", "f2192cd2-aaf5-4fbd-a1ed-8a3745acfb86");

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    }).then((r) => r.json());

    if (res.success) {
      setStatus("Message sent successfully!");
      e.target.reset();
    } else {
      setStatus("Something went wrong. Try again.");
    }
  };

  return (
    <section id="contact" className="pt-30 py-16 px-4">
      <div className=" max-w-xl mx-auto bg-orange-50 p-8 rounded-2xl shadow-lg border border-orange-200">

        <h2 className="text-3xl font-extrabold text-gray-800 mb-2 text-center">
          Contact Us 📬
        </h2>
        <p className="text-gray-600 mb-8 text-center text-base">
          Have questions, feedback, or suggestions? We’d love to hear from you!
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              required
              className="w-full px-3 py-2 rounded-lg border border-gray-300 
                         focus:ring-2 focus:ring-orange-400 outline-none text-sm"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-3 py-2 rounded-lg border border-gray-300 
                         focus:ring-2 focus:ring-orange-400 outline-none text-sm"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm">
              Message
            </label>
            <textarea
              name="message"
              rows="4"
              required
              className="w-full px-3 py-2 rounded-lg border border-gray-300 
                         focus:ring-2 focus:ring-orange-400 outline-none text-sm"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2.5 rounded-lg text-base
                       font-semibold shadow-md hover:bg-orange-600 transition"
          >
            Send Message
          </button>
        </form>

        {status && (
          <p className="text-center mt-4 text-gray-800 font-medium text-sm">{status}</p>
        )}
      </div>
    </section>
  );
};

export default ContactUs;
