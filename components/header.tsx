import { ICONS } from "@/constants/header";
import { HEADER_QUERYResult } from "@/sanity.types";
import Link from "next/link";

interface HeaderProps {
  data: HEADER_QUERYResult;
}

export function Header({ data }: HeaderProps) {
  const { freeShippingText, leftNavLinks, rightNavLinks } = data || {};

  return (
    <div className="flex flex-col w-full shrink-0">
      <div className="w-full py-1.5 flex items-center justify-center bg-[#F5EBDF]">
        <span className="font-harmonia text-[10px] uppercase tracking-widest text-gray-900 leading-none mt-0.5">
          {freeShippingText || "FREE SHIPPING ON US ORDERS OVER $150"}
        </span>
      </div>

      <div className="relative w-full bg-white border-b border-gray-100">
        <div className="flex md:hidden items-center justify-between px-6 py-6 h-[56px]">
          <div className="w-6">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 12H21M3 6H21M3 18H21"
                stroke="#111111"
                strokeWidth="1.5"
                strokeLinecap="square"
              />
            </svg>
          </div>
          <img
            src="/icons/sahara.svg"
            alt="Sahara"
            className="h-[18px] w-auto"
          />
          <div className="w-6 flex justify-end">
            <div className="relative">
              <img src="/icons/bag.svg" alt="Bag" className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden md:flex items-center justify-between px-14 h-[76px] relative">
          <div className="flex items-center gap-8">
            {leftNavLinks?.map((link) => (
              <Link
                key={link.label}
                href={link.href || "#"}
                className="font-adobe text-[14px] text-gray-900"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <img
              src="/icons/sahara.svg"
              alt="Sahara"
              className="h-[35px] w-auto"
            />
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-6 text-[14px] font-adobe text-gray-900 tracking-wide">
              {rightNavLinks?.map((link) => (
                <Link key={link.label} href={link.href || "#"}>
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-5">
              {ICONS.map((icon) => (
                <img
                  key={icon.alt}
                  src={icon.src}
                  alt={icon.alt}
                  className="w-5 h-5 cursor-pointer"
                />
              ))}
              <div className="relative cursor-pointer">
                <img src="/icons/bag.svg" alt="Bag" className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
