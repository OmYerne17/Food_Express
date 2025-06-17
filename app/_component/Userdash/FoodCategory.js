import React from 'react';
import Image from "next/image"
import { categories } from "../../../lib/data"

const FoodCategories = ({ searchQuery }) => {
  // Filter categories based on the search query
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
    <div className="py-4 sm:py-8 px-2 sm:px-3">
      <h2 className="mb-3 sm:mb-4 text-xl sm:text-2xl font-bold">What's on your mind?</h2>
      <div className="flex space-x-4 sm:space-x-6 overflow-x-auto pb-4 shrink-0 scrollbar-hide">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category) => (
            <div key={category.id} className="flex flex-col items-center min-w-[80px] sm:min-w-[100px]">
              <img
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                width={100}
                height={100}
                className="rounded-full object-cover w-[80px] h-[80px] sm:w-[100px] sm:h-[100px]"
                />
              <span className="mt-2 text-xs sm:text-sm font-medium text-center">{category.name}</span>
            </div>
          ))
        ) : (
          <p>No categories found.</p>
        )}
      </div>
    </div>
    </>
  )
}

export default FoodCategories;