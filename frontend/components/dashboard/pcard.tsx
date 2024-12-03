import Link from "next/link";
import { Chip } from "@nextui-org/chip";

interface PCardProps {
  uuid: string;
  name: string;
  platform: string;
  commissionType: string;
  rating: number;
  commission: string;
  commissionPercent: string;
  cookieDuration: string;
  tags: { id: number; name: string; color: string }[];
  langs: { id: number, country_code: string }[];
  isGrid?: boolean;
}

const PCard = ({
  uuid,
  name,
  platform,
  commissionType,
  rating,
  commission,
  commissionPercent,
  cookieDuration,
  tags,
  langs,
  isGrid,
}: PCardProps) => {
  return (
    <div className="rounded-xl border border-divider">
      <Link href={`/affiliates/${uuid}`}>
        {isGrid ? (
          <>
            <div
              className="rounded-t-xl p-6 border-b-1 dark:border-b-0"
              style={{
                backgroundImage: "url(/images/bg-pcard.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="flex items-start gap-4 ">
                <div className="">
                  <h3 className="font-semibold text-lg text-start mb-1 text-ellipsis ">
                    {name}
                  </h3>
                  <div className="flex flex-col items-start gap-x-2 gap-y-1 text-sm text-divider/100">
                    <span className="truncate font-medium">
                      Platform: {platform}
                    </span>
                    <span className="truncate font-medium">
                      Commission type:{" "}
                      {commissionType
                        ?.replace(/_/g, " ")
                        .replace(/^\w/, (c: string) => c.toUpperCase())}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mt-0">
                    {"★★★★☆".split("").map((star, i) => (
                      <span key={i} className="text-purple-300">
                        {i < Math.floor(rating) ? "★" : "☆"}
                      </span>
                    ))}
                    <span className="text-sm  text-divider/100 ml-1">
                      {rating}/5
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-1 gap-x-4 md:gap-6 p-4">
              <div>
                <p className="text-sm text-start text-divider/50 mb-1">
                  Commission
                </p>
                <p className="font-medium text-start font-base truncate">
                  {commission}
                </p>
              </div>
              <div>
                <p className="text-sm text-start text-divider/50 mb-1">
                  Commission (%)
                </p>
                <p className="font-medium text-start font-base truncate">
                  {commissionPercent}
                </p>
              </div>
              <div>
                <p className="text-sm text-start text-divider/50 mb-1">
                  Cookie Duration
                </p>
                <p className="font-medium text-start font-base truncate">
                  {cookieDuration.replace("_", " ")}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 overflow-x-auto p-4">
              {langs.map((lang, index) => (
                <Chip
                  key={index}
                  size={"sm"}
                >
                  {lang.country_code}
                </Chip>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 overflow-x-auto p-4">
              {tags.map((tag, index) => (
                <Chip
                  key={index}
                  size={"sm"}
                  style={{
                    color: "white",
                    backgroundColor: tag.color,
                  }}
                >
                  {tag.name}
                </Chip>
              ))}
            </div>

          </>
        ) : (
          <div className={"p-2"}>
            <div
              className={
                "flex flex-col lg:flex-row md:space-x-2 justify-between p-4"
              }
            >
              <div
                className="rounded-t-xl p-6"
                style={
                  {
                    // backgroundImage: 'url(/images/bg-pcard.png)',
                    // backgroundSize: 'cover',
                    // backgroundPosition: 'center',
                    // backgroundRepeat: 'no-repeat',
                  }
                }
              >
                <div className="flex items-start gap-4 ">
                  <div className="">
                    <h3 className="font-semibold text-lg text-start truncate mb-1">
                      {name}
                    </h3>
                    <div className="flex flex-col items-start gap-x-2 gap-y-1 text-sm text-divider/100">
                      <span className="truncate font-medium">
                        Platform: {platform}
                      </span>
                      <span className="truncate font-medium">
                        Commission type: {commissionType}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mt-0">
                      {"★★★★☆".split("").map((star, i) => (
                        <span key={i} className="text-purple-300">
                          {i < Math.floor(rating) ? "★" : "☆"}
                        </span>
                      ))}
                      <span className="text-sm  text-divider/100 ml-1">
                        {rating}/5
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-1 gap-y-2 gap-x-4 md:gap-6 p-4">
                <div>
                  <p className="text-sm text-start text-divider/50 mb-1">
                    Commission
                  </p>
                  <p className="font-medium text-start font-base truncate">
                    {commission}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-start text-divider/50 mb-1">
                    Commission (%)
                  </p>
                  <p className="font-medium text-start font-base truncate">
                    {commissionPercent}
                  </p>
                </div>
                <div className={"inline-block sm:hidden"}>
                  <p className="text-sm text-start text-divider/50 mb-1">
                    Cookie Duration
                  </p>
                  <p className="font-medium text-start font-base truncate">
                    {cookieDuration}
                  </p>
                </div>
              </div>
              <div className="hidden sm:grid grid-cols-1 gap-y-1 gap-x-4 md:gap-6 p-4">
                <div>
                  <p className="text-sm text-start text-divider/50 mb-1">
                    Cookie Duration
                  </p>
                  <p className="font-medium text-start font-base truncate">
                    {cookieDuration}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 overflow-x-auto p-4">
              {langs.map((lang, index) => (
                <Chip
                  key={index}
                  size={"sm"}
                >
                  {lang.country_code}
                </Chip>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2 overflow-x-auto px-4">
              {tags.map((tag, index) => (
                <Chip
                  key={index}
                  size={"sm"}
                  style={{
                    color: "white",
                    backgroundColor: tag.color,
                  }}
                >
                  {tag.name}
                </Chip>
              ))}
            </div>
          </div>
        )}
      </Link>
    </div>
  );
};

export default PCard;
