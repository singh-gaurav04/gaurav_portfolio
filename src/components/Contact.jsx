import React, { useState } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import animationData from "../assets/contactAnimation - 1742378790563.json";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const submitHandler = (e) => {
    e.preventDefault();

    const templateParams = {
      from_name: data.name, // Replace with your name
      email: data.email,
      message: data.message,
    };

    emailjs
      .send(
        "service_0x3kvfg", // EmailJS service ID
        "template_f4enxoc", // EmailJS template ID
        templateParams,
        "nmD1s7SI76br6RXwv" // EmailJS public key
      )
      .then(
        (response) => {
          toast.success("Email sent successfully! ✅");
          console.log("SUCCESS!", response.status, response.text);
          setData({ name: "", email: "", message: "" }); // Reset all fields
        },
        (error) => {
          toast.error("Failed to send email ❌. Try again!");
          console.error("EmailJS Error:", error.text);
        }
      );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className='py-10 '>
      <div className='container mx-auto px-5 grid grid-cols-1 md:grid-cols-2 gap-10 items-center'>
        {/* Left Side: Image */}
        <motion.div
          className='flex justify-center'
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Lottie animationData={animationData} loop={true} />
        </motion.div>

        {/* Right Side: Form */}
        <motion.div
          className='rounded-lg bg-[#354F52] shadow-lg p-8'
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className='text-3xl font-bold mb-6 text-center text-green-400'>
            Get in Touch
          </h2>
          <form onSubmit={submitHandler} className="text-white">
            <div className='mb-4'>
              <label htmlFor='name' className='block font-semibold mb-2'>
                Name
              </label>
              <motion.input
                type='text'
                id='name'
                name='name'
                value={data.name}
                onChange={handleChange}
                placeholder='Your Name'
                className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CAD2C5]'
                required
                whileFocus={{ scale: 1.02 }}
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='email' className='block font-semibold mb-2'>
                Email
              </label>
              <motion.input
                type='email'
                id='email'
                name='email'
                value={data.email}
                onChange={handleChange}
                placeholder='hiregaurav@gmail.com'
                className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CAD2C5]'
                required
                whileFocus={{ scale: 1.02 }}
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='message' className='block font-semibold mb-2'>
                Message
              </label>
              <motion.textarea
                id='message'
                name='message'
                value={data.message}
                onChange={handleChange}
                placeholder='Your message here...'
                rows='5'
                minLength={4}
                maxLength={1000}
                className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CAD2C5] webkit-scrollbar-none'
                required
                whileFocus={{ scale: 1.02 }}
              ></motion.textarea>
            </div>
            <motion.button
              type='submit'
              className='w-full bg-[#CAD2C5] cursor-pointer py-2 px-4 rounded-lg hover:bg-[#acb4a7] transition duration-300 text-red-400 font-bold'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </div>
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default Contact;
