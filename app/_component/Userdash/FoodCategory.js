import React from 'react';
import Image from "next/image"
import { categories } from "@/lib/data"

const FoodCategories = ({ searchQuery }) => {
  // Filter categories based on the search query
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
    <div className="py-8">
      <h2 className="mb-4 text-2xl font-bold">What's on your mind?</h2>
      <div className="flex space-x-6 overflow-x-auto pb-4">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category) => (
            <div key={category.id} className="flex flex-col items-center">
              <img
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                width={100}
                height={100}
                className="rounded-full object-cover"
                style={{ width: '100px', height: '100px' }}
                />
              <span className="mt-2 text-sm font-medium">{category.name}</span>
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