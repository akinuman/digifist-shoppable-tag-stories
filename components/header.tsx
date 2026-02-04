import Link from "next/link";

export function Header() {
  return (
    <div className="flex flex-col w-full shrink-0">
      <div className="w-full py-1.5 flex items-center justify-center bg-[#F5EBDF]">
        <span className="font-harmonia text-[10px] uppercase tracking-widest text-gray-900 leading-none mt-0.5">
          FREE SHIPPING ON US ORDERS OVER $150
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
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full border border-white bg-gray-900 text-[9px] font-medium text-white">
                2
              </span>
            </div>
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden md:flex items-center justify-between px-14 h-[76px] relative">
          <div className="flex items-center gap-8">
            <Link href="#" className="font-adobe text-sm text-gray-900">
              Swimwear
            </Link>
            <Link href="#" className="font-adobe text-sm text-gray-900">
              Lingerie
            </Link>
            <Link href="#" className="font-adobe text-sm text-gray-900">
              Dresses
            </Link>
            <Link href="#" className="font-adobe text-sm text-gray-900">
              Jumpsuits
            </Link>
          </div>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <img
              src="/icons/sahara.svg"
              alt="Sahara"
              className="h-[35px] w-auto"
            />
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-6 text-[11px] font-harmonia text-gray-900 tracking-wide uppercase">
              <Link href="#">UK|£</Link>
              <Link href="#">Collections</Link>
              <Link href="#">About</Link>
            </div>
            <div className="flex items-center gap-5">
              <img
                src="/icons/search.svg"
                alt="Search"
                className="w-5 h-5 cursor-pointer"
              />
              <img
                src="/icons/whislist.svg"
                alt="Wishlist"
                className="w-5 h-5 cursor-pointer"
              />
              <img
                src="/icons/profile.svg"
                alt="Profile"
                className="w-5 h-5 cursor-pointer"
              />
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
