import React from "react";

const Container = ({ children, className }) => {
  return (
    <div
      className={`${className} 
        p-5
        mx-auto
        sm:w-[640px] 
        md:w-[768px] 
        lg:w-[1024px] 
        xl:w-[1280px] 
        2xl:w-[1536px]`}
    >
      {children}
    </div>
  );
};

export default Container;
