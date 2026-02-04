import { ICONS } from "@/constants/header";
import { HEADER_QUERYResult } from "@/sanity.types";
import Image from "next/image";
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
          <Image
            src="/icons/sahara.svg"
            alt="Sahara"
            width={100}
            height={18}
            className="h-[18px] w-auto"
          />
          <div className="w-6 flex justify-end">
            <button className="relative" aria-label="Open Cart">
              <Image
                src="/icons/bag.svg"
                alt="Bag"
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </button>
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
            <Image
              src="/icons/sahara.svg"
              alt="Sahara"
              width={140}
              height={35}
              className="h-[35px] w-auto"
              priority
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
                <button
                  key={icon.alt}
                  type="button"
                  aria-label={icon.alt}
                  className="cursor-pointer"
                >
                  <Image
                    src={icon.src}
                    alt={icon.alt}
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                </button>
              ))}
              <button
                className="relative cursor-pointer"
                aria-label="Open Cart"
              >
                <Image
                  src="/icons/bag.svg"
                  alt="Bag"
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
