import amazon from "../assets/images/images.png";
import americanExpress from "../assets/images/American-Express-Color.png";
import masterCard from "../assets/images/pngimg.com - mastercard_PNG16.png";
import googlePlay from "../assets/images/download (3).png";
import appStore from "../assets/images/download (4).png";
import { Button } from "../shared/ui/Button";
import { Input } from "../shared/ui/Input";

export const Footer = () => {
  return (
    <footer className="bg-gray-50 px-4 md:px-8 py-10 mt-10">
      <div className="container mx-auto">
        <h3 className="text-2xl font-semibold">Get the ECommerce app</h3>
        <p className="text-gray-500 mb-4">
          We will send you a link, open it on your phone to download the app.
        </p>

        <div className="flex flex-col md:flex-row gap-3 items-center my-6 pb-6 border-b border-gray-300">
          <div className="w-full md:flex-1">
            <Input type="email" placeholder="Email Address" />
          </div>
          <Button className="md:w-fit">Share App Link</Button>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-center py-4 gap-6">
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <p className="font-medium text-gray-700">Payment Partners</p>
            <div className="flex gap-4 items-center">
              <img
                className="w-12 grayscale hover:grayscale-0 transition-all"
                src={amazon}
                alt="amazon"
              />
              <img
                className="w-12 grayscale hover:grayscale-0 transition-all"
                src={americanExpress}
                alt="American Express"
              />
              <img
                className="w-10 grayscale hover:grayscale-0 transition-all"
                src={masterCard}
                alt="MasterCard"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-4 items-center justify-center">
            <p className="font-medium text-gray-700">
              Get deliveries with FreshCart
            </p>
            <div className="flex gap-3">
              <img
                className="h-8 cursor-pointer"
                src={googlePlay}
                alt="Google Play"
              />
              <img
                className="h-8 cursor-pointer"
                src={appStore}
                alt="App Store"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
