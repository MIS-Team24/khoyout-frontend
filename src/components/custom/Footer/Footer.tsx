import miniLogo from "@/assets/mini-logo.svg";
import facebook from "@/assets/socials/facebook.svg";
import instagram from "@/assets/socials/instagram.svg";
import tiktok from "@/assets/socials/tiktok.svg";
import x from "@/assets/socials/x.svg";
import { Link } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import whatsapp from "@/assets/socials/whatsapp.svg";
import phoneIcon from "@/assets/icons/phone.svg";
import { RefObject, forwardRef } from "react";

const Footer = forwardRef(function (_, ref) {
  return (
    <div
      className="absolute bottom-0 mt-auto w-full bg-footer py-8"
      ref={ref as RefObject<HTMLDivElement>}
    >
      <div className="relative mx-auto flex w-full max-w-[1130px] flex-col flex-wrap gap-4">
        <div className="absolute bottom-1 right-1 w-20 lg:static lg:w-auto">
          <img src={miniLogo} className="w-28" />
        </div>
        <div className="flex w-full flex-wrap justify-center gap-4 text-[#F9F4F4] lg:justify-between lg:gap-0">
          <div>
            <p className="max-w-[501px] px-4 text-justify leading-6 lg:px-0">
              Explore Khoyout, where creativity converges with craftsmanship! We
              unite skilled designers and clients in pursuit of bespoke
              clothing, ensuring each garment embodies individual style. Whether
              you're a designer showcasing talent or a client seeking unique
              attire, Khoyout connects you to bespoke possibilities.
            </p>
          </div>
          <div className="flex flex-wrap justify-around gap-4 lg:gap-14">
            <div className="flex flex-col gap-5">
              <h1 className="text-xl font-medium uppercase">Extras</h1>
              <ul className="flex flex-col gap-3">
                <li>
                  <Link className="hover:underline">Brands</Link>
                </li>
                <li>
                  <Link className="hover:underline">Specials</Link>
                </li>
                <li>
                  <Link className="hover:underline">Site Map</Link>
                </li>
                <li>
                  <Link className="hover:underline">Contact Us</Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-5">
              <h1 className="text-xl font-medium uppercase">Information</h1>
              <ul className="flex flex-col gap-3">
                <li>
                  <Link className="hover:underline">About Us</Link>
                </li>
                <li>
                  <Link className="hover:underline">Delivery Information</Link>
                </li>
                <li>
                  <Link className="hover:underline">Privacy Policy</Link>
                </li>
                <li>
                  <Link className="hover:underline">Terms & Conditions</Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-5">
              <h1 className="text-xl font-medium uppercase">Contact Us</h1>
              <ul className="flex flex-col gap-3">
                <li className="flex items-center gap-2">
                  <Mail />
                  contact@khoyout.com
                </li>
                <li className="flex items-center gap-2">
                  <img src={phoneIcon} />
                  +021099702079
                </li>
                <li className="flex items-center gap-2">
                  <img src={whatsapp} />
                  +021200935442
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a href="https://facebook.com">
            <div className="aspect-square w-8 rounded-[8px] bg-white p-1.5">
              <img src={facebook} className="h-full w-full" />
            </div>
          </a>
          <a href="https://instagram.com">
            <div className="aspect-square w-8 rounded-[8px] bg-white p-1.5">
              <img src={instagram} className="w-8" />
            </div>
          </a>
          <a href="https://x.com/">
            <div className="aspect-square w-8 rounded-[8px] bg-white p-1.5">
              <img src={x} className="w-8" />
            </div>
          </a>
          <a href="https://tiktok.com/">
            <div className="aspect-square w-8 rounded-[8px] bg-white p-2">
              <img src={tiktok} className="w-8" />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
});

export default Footer;
