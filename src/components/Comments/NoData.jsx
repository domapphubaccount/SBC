import Image from "next/image";
import React from "react";

const NoData = () => {
  return (
    <div className="flex justify-center">
      <div>
        <Image
          src={"/Images/data.svg"}
          width={150}
          height={150}
          alt="No data"
        />
        <div className="text-center text-primary font-semibold mb-4">
          No Data Yet !
        </div>
      </div>
    </div>
  );
};

export default NoData;
