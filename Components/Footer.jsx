import React from "react";

const Footer = () => {
  const productList = ["Market", "ERC20 Token", "Donation"];
  const contactList = [
    "support@cryptoKing.com",
    "info@example.com",
    "Contact Us",
  ];
  const usefulLink = ["Home", "About Us", "Company Bio"];

  return (
    <footer className="text-center text-white backgroundMain lg:text-left">
      <div className="mx-6 py-10 text-center md:text-left">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Section */}
          <div>
            <h6 className="mb-4 flex items-center justify-center font-semibold uppercase md:justify-start">
              Crypto King
            </h6>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          {/* Products Section */}
          <div>
            <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
              Products
            </h6>
            {productList.map((el, i) => (
              <p className="mb-4" key={i}>
                <a href="#!" className="hover:underline">
                  {el}
                </a>
              </p>
            ))}
          </div>

          {/* Contact Section */}
          <div>
            <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
              Contact
            </h6>
            {contactList.map((el, i) => (
              <p className="mb-4" key={i}>
                <a href={`mailto:${el}`} className="hover:underline">
                  {el}
                </a>
              </p>
            ))}
          </div>

          {/* Useful Links Section */}
          <div>
            <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
              Useful Links
            </h6>
            {usefulLink.map((el, i) => (
              <p className="mb-4" key={i}>
                <a href="#!" className="hover:underline">
                  {el}
                </a>
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="backgroundMain p-6 text-center">
        <span>© 2023 Copyright:</span>
        <a className="font-semibold" href="https://tailwind-elements.com">
          CryptoKing
        </a>
      </div>
    </footer>
  );
};

export default Footer;
