import React from "react";



const DynamicCard = ({data}) => {
  return (
    <div className="flex flex-col">
      {data.map((item, index) => (
        <div key={item.id}>
          <div 
          className={`flex flex-col md:flex-row items-center justify-center gap-4 md:gap-14 px-4 md:px-0`}
          style={{
            flexDirection: index % 2 === 0 ? "row" : "row-reverse",
            backgroundColor: item.bgcolor,
            padding: item.padding,
            marginBottom: item.margin,
            zIndex: item.index,
            position: 'relative'
          }}
          >
          <div
            className="w-full md:w-[400px] text-center md:text-left"
          >
            <div className="flex flex-col gap-3">
              <h1 className="font-bold text-2xl sm:text-3xl md:text-[40px]">{item.title}</h1>
              <span className="font-semibold text-lg sm:text-xl md:text-[20px]">{item.subtitle}</span>
              <span className="font-semibold text-sm sm:text-base">{item.description}</span>
              <button className="bg-red-500 p-2 w-[150px] rounded-3xl text-white font-bold mx-auto md:mx-0">
                {item.buttonText}
              </button>
            </div>
          </div>

          {/* Image Section */}
          <div
            className="w-full md:w-auto"
            style={{
              backgroundColor: index % 2 !== 0 ? "rgb(255, 241, 238 )" : "transparent",
            }}
          >
            <img 
              src={item.imgSrc} 
              alt={item.title} 
              className="w-full h-auto max-w-[500px] mx-auto" 
            />
          </div>
        </div>
        </div>
      ))}
    </div>
  );
};

export default DynamicCard;
