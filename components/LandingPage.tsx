// 'use client';
// import { useCssMediaQueries } from '@/hooks/useCssMediaQueries';
// import clsx from 'clsx';
// import React from 'react';

// import Link from "next/link";

// const LandingPage = () => {
//   const {hideAfterLargerScreens} = useCssMediaQueries();
//   return (
//     <div className={clsx("bg-gray-100",
//     hideAfterLargerScreens && "pt-[1.3rem] px-[1rem] pb-[1.3rem]",
//     )}>
//       {/* Header */}
//       <header className={clsx("text-center py-20",
//       )}>
//         <h1 className="text-4xl font-bold mb-4">Welcome to Our Automated School Management System</h1>
//         <p className="text-lg text-gray-600">Empowering education with innovative technology</p>
//         <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 mt-8 rounded-md">Get Started</button>
//       </header>

//       {/* Main Content */}
//       <main className="container mx-auto px-4">
//         {/* Features Section */}
//         <section className="text-center py-12">
//           <h2 className="text-2xl font-bold mb-4">Key Features</h2>
//           <ul className="list-disc list-inside">
//             <li>Streamlined application process</li>
//             <li>Real-time application tracking</li>
//             <li>Secure document submission</li>
//             {/* Add more features here */}
//           </ul>
//         </section>

//         {/* Testimonials Section */}
//         <section className="text-center py-12">
//           <h2 className="text-2xl font-bold mb-4">What Our Users Say</h2>
//           <div className="max-w-md mx-auto">
//             <p className="text-lg mb-2">The school management system has transformed our admissions process. It&apos;s intuitive, efficient, and reliable.</p>
//             <cite className="block">- John Doe, Principal</cite>
//           </div>
//           {/* Add more testimonials here */}
//         </section>
//       </main>

//       {/* Footer */}
//       <footer className="text-center py-8">
//         <p className="text-gray-600">Contact us: info@example.com</p>
//         <nav className="mt-4">
//           <ul className="inline-flex">
//             <li className="mx-2"><a href="/about" className="text-blue-500 hover:underline">About Us</a></li>
//             <li className="mx-2"><a href="/contact" className="text-blue-500 hover:underline">Contact Us</a></li>
//             {/* Add more footer links here */}
//           </ul>
//         </nav>
//       </footer>
//     </div>
//   );
// };

// export default LandingPage;

"use client";
import { useCssMediaQueries } from "@/hooks/useCssMediaQueries";
import clsx from "clsx";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const LandingPage = () => {
  const { hideAfterLargerScreens } = useCssMediaQueries();
  return (
    <div
      className={clsx(
        "bg-gray-100",
        hideAfterLargerScreens && "pt-[1.3rem] px-[1rem] pb-[1.3rem]"
      )}
    >
      {/* Hero Section */}
      <header
        className="relative bg-cover bg-center"
        style={{ backgroundImage: "url(/images/school-hero.jpg)" }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60"></div>
        <div className="container mx-auto px-4 py-24 text-center relative z-10">
          <h1 className="text-white text-4xl font-bold mb-4">
            Empowering Education with Innovation
          </h1>
          <p className="text-white text-lg mb-6">
            Streamline school management and application processes with our
            automated system.
          </p>
          <Link href="/sign-up" passHref>
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
              Get Started
            </button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4">
        {/* About the System */}
        <section className="py-12 text-center">
          <h2 className="text-2xl font-bold mb-4">
            What is Our School Management System?
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            Our system is designed to simplify and automate crucial school
            operations, from student applications to administrative tasks,
            freeing up valuable time for educators and administrators.
          </p>
          <div className="flex justify-center space-x-8">
            <Image
              src="/email.jpg"
              alt="Step 1"
              className="w-auto h-auto mx-auto"
              width={200}
              height={200}
            />
            <Image
              src="/email.jpg"
              alt="Step 1"
              className="w-auto h-auto mx-auto"
              width={200}
              height={200}
            />
            <Image
              src="/email.jpg"
              alt="Step 1"
              className="w-auto h-auto mx-auto"
              width={200}
              height={200}
            />
          </div>
        </section>

        {/* Key Features */}
        <section className="py-12">
          <h2 className="text-2xl font-bold text-center mb-4">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-md shadow-md p-6">
              <h3 className="text-xl font-bold mb-2">
                Streamlined Application Process
              </h3>
              <p className="text-gray-600">
                Effortlessly manage student applications, track progress, and
                communicate with applicants efficiently.
              </p>
            </div>
            <div className="bg-white rounded-md shadow-md p-6">
              <h3 className="text-xl font-bold mb-2">
                Real-time Data Analytics
              </h3>
              <p className="text-gray-600">
                Gain valuable insights into student demographics, application
                trends, and program performance with comprehensive analytics.
              </p>
            </div>
            <div className="bg-white rounded-md shadow-md p-6">
              <h3 className="text-xl font-bold mb-2">
                Secure Document Management
              </h3>
              <p className="text-gray-600">
                Store and manage student documents securely and efficiently,
                ensuring compliance and accessibility.
              </p>
            </div>
            {/* Add more features here */}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">What Our Users Say</h2>
          <div className="max-w-md mx-auto">
            <p className="text-lg mb-2">
              The school management system has completely transformed our
              admissions process. It&apos;s intuitive, efficient, and has
              significantly reduced our workload.
            </p>
            <cite className="block">- Apostle Prof. K. Agyapong-Kodua  , Vice Chancellor, [Pentecost University]</cite>
          </div>
          {/* Add more testimonials here */}
        </section>

        {/* How It Works */}
        <section className="py-12 text-center">
          <h2 className="text-2xl font-bold mb-4">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <Image
                src="/email.jpg"
                alt="Step 1"
                className="w-auto h-auto mx-auto"
                width={200}
                height={200}
              />
              <h3 className="text-xl font-bold mt-4">Create an Account</h3>
              <p className="text-gray-600">
                Get started by creating a free account for your school.
              </p>
            </div>
            <div>
              <Image
                src="/email.jpg"
                alt="Step 1"
                className="w-auto h-auto mx-auto"
                width={200}
                height={200}
              />
              <h3 className="text-xl font-bold mt-4">Configure Your System</h3>
              <p className="text-gray-600">
                Customize the system to meet your school&apos;s specific needs
                and preferences.
              </p>
            </div>
            <div>
              <Image
                src="/email.jpg"
                alt="Step 1"
                className="w-auto h-auto mx-auto"
                width={200}
                height={200}
              />
              <h3 className="text-xl font-bold mt-4">Start Using the System</h3>
              <p className="text-gray-600">
                Begin managing your school applications, data, and
                communications with ease.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing and Plans */}
        <section className="py-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Pricing Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Add pricing plans here */}
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Add success stories here */}
          </div>
        </section>

        {/* FAQs and Support */}
        <section className="py-12">
          <h2 className="text-2xl font-bold text-center mb-4">
            Frequently Asked Questions
          </h2>
          <div className="accordion">{/* Add FAQ items here */}</div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 text-center">
        <p>© 2024 PU. All rights reserved.</p>
        <nav className="mt-4">
          <ul className="inline-flex">
            <li className="mx-2">
              <Link href="/about" className="text-blue-500 hover:underline">
                About Us
              </Link>
            </li>
            <li className="mx-2">
              <Link href="/contact" className="text-blue-500 hover:underline">
                Contact Us
              </Link>
            </li>
            {/* Add more footer links here */}
          </ul>
        </nav>
      </footer>
    </div>
  );
};

export default LandingPage;
