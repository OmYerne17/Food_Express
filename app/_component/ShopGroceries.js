import React from 'react'

function ShopGroceries() {
  return (
    <div>
       <div
  className="relative flex flex-col items-center p-6 rounded-lg shadow-lg text-white h-[600px] "
  style={{
    backgroundImage: `url('https://img.cdn4dd.com/cdn-cgi/image/fit=cover,format=auto,quality=60/https://cdn.doordash.com/managed/consumer/seo/home/landing_cta/grocery_desktop.png')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }}
>
  {/* Overlay for reduced opacity */}
  <div className="absolute inset-0 bg-black bg-opacity-60 rounded-lg"></div>
  
  {/* Content */}
  <div className="relative flex flex-col justify-center items-center pt-[100px]">
    <h2 className="text-[40px] w-[400px] font-bold mb-2 text-white text-center">
      Get grocery and convenience store essentials
    </h2>
    <span className="text-[20px] font-semibold text-white mb-2">
      Grocery delivery, exactly how you want it.
    </span>
    <span className=" text-[16px] text-white text-sm mb-4 text-center">
      Shop from home and fill your cart with fresh produce, frozen entrees, deli delights and more.
    </span>
    <div>
      <a
        href="https://www.doordash.com/p/grocery-delivery/"
        className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
      >
        Shop Groceries
      </a>
    </div>
  </div>
</div>
    </div>
  )
}

export default ShopGroceries
