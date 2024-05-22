import React from 'react';

const LandingPage = () => {
  return (
    <div className="bg-gray-100">
      {/* Header */}
      <header className="text-center py-20">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Automated School Management System</h1>
        <p className="text-lg text-gray-600">Empowering education with innovative technology</p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 mt-8 rounded-md">Get Started</button>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4">
        {/* Features Section */}
        <section className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Key Features</h2>
          <ul className="list-disc list-inside">
            <li>Streamlined application process</li>
            <li>Real-time application tracking</li>
            <li>Secure document submission</li>
            {/* Add more features here */}
          </ul>
        </section>

        {/* Testimonials Section */}
        <section className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">What Our Users Say</h2>
          <div className="max-w-md mx-auto">
            <p className="text-lg mb-2">The school management system has transformed our admissions process. It&apos;s intuitive, efficient, and reliable.</p>
            <cite className="block">- John Doe, Principal</cite>
          </div>
          {/* Add more testimonials here */}
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center py-8">
        <p className="text-gray-600">Contact us: info@example.com</p>
        <nav className="mt-4">
          <ul className="inline-flex">
            <li className="mx-2"><a href="/about" className="text-blue-500 hover:underline">About Us</a></li>
            <li className="mx-2"><a href="/contact" className="text-blue-500 hover:underline">Contact Us</a></li>
            {/* Add more footer links here */}
          </ul>
        </nav>
      </footer>
    </div>
  );
};

export default LandingPage;
