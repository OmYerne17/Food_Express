import React from "react";



const DynamicCard = ({data}) => {
  return (
    <div className="flex flex-col">
      {data.map((item, index) => (
        <div key={item.id}>
          <div 
          className={`flex items-center justify-center gap-14 `}
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
            className="w-[400px]"
          >
            <div className="flex flex-col gap-3">
              <h1 className="font-bold text-[40px]">{item.title}</h1>
              <span className="font-semibold text-[20px]">{item.subtitle}</span>
              <span className="font-semibold">{item.description}</span>
              <button className="bg-red-500 p-2 w-[150px] rounded-3xl text-white font-bold">
                {item.buttonText}
              </button>
            </div>
          </div>

          {/* Image Section */}
          <div
            className=""
            style={{
              backgroundColor: index % 2 !== 0 ? "rgb(255, 241, 238 )" : "transparent",
            }}
          >
            <img src={item.imgSrc} alt={item.title} className="w-full h-auto" />
          </div>
        </div>
        </div>
      ))}
    </div>
  );
};

export default DynamicCard;
