import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer";

function Aboutus() {
  return (
    <div>
      <Header />
      <div className="bg-gray-100">
        <div className="container mx-auto py-12">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
              About Us
            </h1>
            <div className="bg-white rounded-lg shadow-md p-8">
              <p className="text-lg mb-6 leading-relaxed">
                Welcome to our company! We are dedicated to providing the best
                products and services to our customers. Lorem ipsum dolor sit
                amet, consectetur adipiscing elit. Duis at tortor eget ex
                consequat volutpat. Quisque ullamcorper tempus ligula, ac
                gravida neque tincidunt sit amet. Vivamus id diam vitae lorem
                posuere pretium id in eros.
              </p>
              <p className="text-lg mb-6 leading-relaxed">
                In finibus, dui at malesuada vehicula, eros elit varius nisi,
                sed aliquam lacus eros sit amet mi. Donec rutrum viverra elit,
                in lacinia risus congue vel. Nam nec nunc vitae ipsum lobortis
                fringilla. Sed vel nisi eget magna suscipit tincidunt nec eu
                ex.
              </p>
              <p className="text-lg leading-relaxed">
                Integer euismod sapien id orci dignissim, non congue justo
                sollicitudin. Morbi porttitor sed justo eget congue. Nam vel
                eleifend libero, ac suscipit enim. Fusce elementum quam nec orci
                elementum, sit amet cursus neque luctus. Nulla nec sapien erat.
                Maecenas nec quam ut nisi ultricies dignissim vel et massa.
              </p>
              <p>
              Please reach out to us on the below mentioned details

 

Support Helpline 

Number: - 1860-258-3333

Email Address: - support@olx.in

 

Safety Helpline:

Number: - 9999140999

Email Address: - safety@olx.in
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Aboutus;
