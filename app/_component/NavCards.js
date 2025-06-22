import Link from "next/link";
import React from "react";

function NavCards() {

  const cardData = [
    {
      title: "Become a Dasher",
      description: "As a delivery driver, make money and work on your schedule. Sign up in minutes.",
      image: "https://cdn.doordash.com/media/consumer/home/landing/new/ScootScoot.svg",
      buttonText: "Start earning",
      buttonLink: "https://www.doordash.com/dasher/signup"
    },
    {
      title: "Become a Partner",
      description: "As a delivery driver, make money and work on your schedule. Sign up in minutes.",
      image: "https://cdn.doordash.com/media/consumer/home/landing/new/Storefront.svg",
      buttonText: "SignUp for free",
      buttonLink: "/restaurant"
    },
    {
      title: "Get the best DoorDash experience",
      description: "As a delivery driver, make money and work on your schedule. Sign up in minutes.",
      image: "https://cdn.doordash.com/media/consumer/home/landing/new/iphone.svg",
      buttonText: "Get the app",
      buttonLink: "#"
    }
  ]
  return (
    <div>
      <div className="flex justify-center items-center gap-5 mt-20 md:flex-wrap leading-tight">
        {cardData.map((card, index) => (
          <div
            key={index}
            data-testid="value-prop-card-wrapper"
            className="p-6 bg-white flex flex-col items-center w-[350px] h-[420px]"
          >
          <div className="mb-4">
            <img
              src={card.image}
              alt="Become a Dasher"
              className="w-[154px] h-[154px]"
            />
          </div>
          <div className="text-center">
            <div data-testid="stack-children-wide" className="space-y-2">
              <h2 className="text-[32px] font-bold text-gray-800">
                {card.title}
              </h2>
              <h3 className="text-lg font-semibold text-gray-600">
               {card.description}
              </h3>
            </div>
            <div className="flex justify-center items-center">
            <Link
              href={card.buttonLink}
              data-testid="card-cta-button"
              className="mt-4 px-6 py-2 text-red-600 border-none  flex justify-center items-center gap-2"
            >
              <span data-testid="cta-text-wide" className="font-medium">
                {card.buttonText}
              </span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="inline-block"
              >
                <path
                  d="M8.29289 11.2929C7.90237 11.6834 7.90237 12.3166 8.29289 12.7071C8.68342 13.0976 9.31658 13.0976 9.70711 12.7071L13.7071 8.70711C14.0976 8.31658 14.0976 7.68342 13.7071 7.29289L9.70711 3.29289C9.31658 2.90237 8.68342 2.90237 8.29289 3.29289C7.90237 3.68342 7.90237 4.31658 8.29289 4.70711L10.5858 7L3 7C2.44772 7 2 7.44771 2 8C2 8.55228 2.44772 9 3 9L10.5858 9L8.29289 11.2929Z"
                  fill="currentColor"
                />
              </svg>
            </Link>
          </div>
        </div>
        </div>
        ))}
      </div>
    </div>
  );
}

export default NavCards;
