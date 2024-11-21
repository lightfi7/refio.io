import { BadgeCheck } from "lucide-react";
import { Button } from "@nextui-org/button";

const Banner = () => {
  return (
    <div
      className={
        "w-full flex flex-col lg:flex-row justify-between items-center px-6 py-4 bg-purple-400/70 rounded-2xl"
      }
      style={{
        backgroundImage: `url(/images/bg-banner.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className={"flex items-start space-x-2.5"}>
        <div className={"p-2 bg-background rounded-xl"}>
          <BadgeCheck color={"#ff0000"} size={28} />
        </div>
        <div className={"text-white/90"}>
          <h3 className={"text-md font-semibold text-start"}>
            Cosi Affiliate Program
          </h3>
          <h5 className={"text-sm font-medium text-start"}>
            Commission: $49 per sale | Type: One time
          </h5>
          <h5 className={"text-sm font-medium text-start"}>
            This program is a promoted program. More info here.
          </h5>
        </div>
      </div>
      <div className={"flex space-x-2 mt-3 lg:mt-0"}>
        <Button className={"bg-background text-purple-300 dark:text-white"}>
          Apply
        </Button>
        <Button className={"bg-background text-purple-300 dark:text-white"}>
          Details
        </Button>
      </div>
    </div>
  );
};

export default Banner;
