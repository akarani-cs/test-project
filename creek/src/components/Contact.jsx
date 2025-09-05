import React, { useState } from "react";

export default function Contact() {
  // State for form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // State for form submission status 
  const [formStatus, setFormStatus] = useState(null);

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "message":
        setMessage(value);
        break;
      default:
        break;
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); 
    // Form validation 
    if (!firstName || !lastName || !email || !message) {
      setFormStatus("All fields are required.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setFormStatus("Please enter a valid email.");
      return;
    }

    // Simulate successful form submission
    setFormStatus("Thank you for reaching out!");
    //clear form fields
    setFirstName("");
    setLastName("");
    setEmail("");
    setMessage("");
  };

  return (
    <section className="bg-black text-white py-12 px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Panel */}
        <div className="bg-red-600 flex items-center justify-center p-8">
          <h2 className="text-center text-2xl md:text-3xl font-bold leading-relaxed">
            HAVE I MISSED <br />
            ANYTHING GOOD <br />
            LATELY? <br />
            LET ME KNOW
          </h2>
        </div>

        {/* Right Panel - Contact Form */}
        <div className="bg-[#111] p-8 flex flex-col justify-center">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* First and Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">First name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={handleInputChange}
                  className="w-full bg-transparent border-b border-white focus:outline-none focus:border-red-500"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Last name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={handleInputChange}
                  className="w-full bg-transparent border-b border-white focus:outline-none focus:border-red-500"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm mb-1">Email *</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleInputChange}
                className="w-full bg-transparent border-b border-white focus:outline-none focus:border-red-500"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm mb-1">Leave us a message...</label>
              <textarea
                name="message"
                rows="3"
                value={message}
                onChange={handleInputChange}
                className="w-full bg-transparent border-b border-white focus:outline-none focus:border-red-500"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 font-semibold"
            >
              Submit
            </button>

            {/* Form Status */}
            {formStatus && (
              <div className="mt-4 text-center text-sm text-red-500">{formStatus}</div>
            )}
          </form>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-gray-400 mt-6">
        © 2035 by On My Screen.
      </div>
    </section>
  );
}
