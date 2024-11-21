"use client";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { Image } from "@nextui-org/image";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import {
  ArrowDownAzIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  BadgePercent,
  BookmarkIcon,
  CopyIcon,
  CornerUpRightIcon,
  FacebookIcon,
  InstagramIcon,
  LinkIcon,
  MessageSquareIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
  TwitterIcon,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";

function getTagColor(tag: string) {
  const colors: { [key: string]: { bg: string; text: string } } = {
    Marketing: { bg: "#3D978C", text: "#fff" },
    "Affiliate Program": { bg: "#163D55", text: "#fff" },
    "Affiliate Marketing": { bg: "#572064", text: "#fff" },
    SEO: { bg: "#0C232A", text: "#fff" },
    Backlink: { bg: "#6E1C97", text: "#fff" },
    SaaS: { bg: "#e6f7f4", text: "#fff" },
    AI: { bg: "#2F5516", text: "#fff" },
    Automation: { bg: "#551629", text: "#fff" },
    "Content Management": { bg: "#3B6420", text: "#fff" },
    "Text Generation": { bg: "#551629", text: "#fff" },
  };

  return colors[tag] || { bg: "#f3f4f6", text: "#4b5563" };
}

const sortList = [{ key: "latest_update", label: "Latest update" }];

const tags = ["Marketing", "Affiliate Program", "Affiliate Marketing"];

export default function Page() {
  const params = useParams();
  const router = useRouter();

  return (
    <div
      className={"flex flex-col md:flex-row justify-between space-x-2 py-10"}
    >
      <div className={"flex flex-col"}>
        <div className={"flex gap-2"}>
          <Button isIconOnly size={"md"} variant={"shadow"}>
            <ArrowUpIcon size={14} />
          </Button>
          <Button isIconOnly size={"md"} variant={"shadow"}>
            <ArrowDownIcon size={14} />
          </Button>
        </div>
        <div className={"px-2 py-6"}>
          <div className={"flex space-x-2 items-center"}>
            <BadgePercent color={"#ff0000"} size={24} />
            <h1 className={"font-semibold text-xl"}>Cosi Affiliate Program</h1>
          </div>

          <div className={"flex flex-col space-y-4 mt-3 text-start"}>
            {/*  Description*/}
            <h4 className={"text-md font-medium max-w-4xl"}>
              The Cosi Affiliate Program is an exciting opportunity for
              marketers and content creators to earn passive income by promoting
              a brand dedicated to comfort and style. With Cosi’s wide range of
              products—from cozy home textiles to stylish apparel—affiliates can
              find something that resonates with their audience.
            </h4>
            <span className={"text-md font-medium text-divider/60"}>
              Platform: Direct
            </span>
            <span className={"text-md font-medium text-divider/60"}>
              Commision type: One time
            </span>
            {/*  Rating*/}
            <div className="flex items-center gap-1 mt-0">
              {"★★★★☆".split("").map((star, i) => (
                <span key={i} className="text-purple-300 text-xl">
                  {i < Math.floor(4.6) ? "★" : "☆"}
                </span>
              ))}
              <span className="text-md text-divider/100 ml-1 font-medium">
                {4.6}/5
              </span>
            </div>
            {/*  Tags*/}
            <div className="flex flex-wrap gap-2 overflow-x-auto">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm rounded-full whitespace-nowrap font-medium"
                  style={{
                    backgroundColor: getTagColor(tag).bg,
                    color: getTagColor(tag).text,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            {/*  Time*/}
            <span className={"text-md font-medium"}>
              Oct 18 - 2m read time - From Cosi.com
            </span>
            {/*  Image*/}
            <Image
              isZoomed
              alt="NextUI hero Image"
              className={"my-3"}
              src="/images/bg-affiliate.png"
              width={600}
            />
          </div>
          {/*  Comment*/}
          <div className={"flex flex-col space-y-4 py-6 mt-8"}>
            <div className={"flex space-x-6"}>
              <span className={"text-lg font-medium"}>1 Upvote</span>
              <span className={"text-lg font-medium"}>3 Comments</span>
            </div>
            <div className={"flex border-divider rounded-xl border space-x-2"}>
              <div className={"flex bg-divider rounded-xl items-center"}>
                <Button isIconOnly size={"md"} variant={"light"}>
                  <ThumbsUpIcon size={16} />
                </Button>
                <Divider className={"h-6"} orientation={"vertical"} />
                <Button isIconOnly size={"md"} variant={"light"}>
                  <ThumbsDownIcon size={16} />
                </Button>
              </div>
              <div
                className={
                  "flex flex-1 items-center space-x-2 justify-around px-4"
                }
              >
                <div className={"flex items-center space-x-2"}>
                  <MessageSquareIcon className={"text-divider/60"} size={18} />
                  <span className={"hidden md:inline"}>Comment</span>
                </div>
                <div className={"flex items-center space-x-2"}>
                  <BookmarkIcon className={"text-divider/60"} size={18} />
                  <span className={"hidden md:inline"}>Bookmark</span>
                </div>
                <div className={"flex items-center space-x-2"}>
                  <LinkIcon className={"text-divider/60"} size={18} />
                  <span className={"hidden md:inline"}>Copy</span>
                </div>
              </div>
            </div>
            <div className="md:px-2 flex items-center space-x-4">
              <div className="flex items-center md:space-x-1.5">
                <ArrowDownAzIcon size={24} strokeWidth={1} />
                <span className="hidden md:inline whitespace-nowrap text-divider/60">
                  Sort by:
                </span>
              </div>
              <Select
                className="w-40"
                defaultSelectedKeys={["latest_update"]}
                size={"md"}
                variant={"flat"}
              >
                {sortList.map((s) => (
                  <SelectItem key={s.key}>{s.label}</SelectItem>
                ))}
              </Select>
            </div>
          </div>
          {/*  Post comments*/}
          <Input
            className="mt-6"
            classNames={{
              mainWrapper: ["py-6"],
              inputWrapper: ["px-2"],
            }}
            endContent={
              <Button color={"secondary"} radius={"full"} size={"sm"}>
                Post
              </Button>
            }
            placeholder={"Share your thoughts"}
            radius={"full"}
            size={"lg"}
            startContent={
              <div className={"min-w-10 min-h-10 flex items-center"}>
                <Avatar
                  showFallback
                  size={"sm"}
                  src="https://images.unsplash.com/broken"
                />
              </div>
            }
            variant={"bordered"}
          />
          {/*  Last comments*/}
          <div className={"flex flex-col space-y-4"}>
            <div className={"flex items-start space-x-4"}>
              <Avatar className={"min-w-10 min-h-10"} />
              <div>
                <div className={"flex space-x-2 items-center"}>
                  <h3 className={"font-medium text-lg"}>Sidiat Bruma</h3>
                  <span className={"text-sm text-divider/30"}>2 days ago</span>
                </div>
                <h6
                  className={"font-medium text-start text-sm text-divider/70"}
                >
                  The Cosi Affiliate Program sounds like a fantastic
                  opportunity! I love that they offer a diverse range of
                  products, making it easy to find something that fits my
                  audience &apos;s interests. The competitive commissions and
                  access to marketing materials really streamline the process.
                  Its great to see a brand that prioritizes quality and customer
                  satisfaction. I &apos;m excited to explore this further and
                  potentially start promoting Cosi!
                </h6>
                <div className={"flex justify-between items-center mt-2"}>
                  <div>
                    <Button isIconOnly variant={"light"}>
                      <ThumbsUpIcon size={18} />
                    </Button>
                    <Button isIconOnly variant={"light"}>
                      <ThumbsDownIcon size={18} />
                    </Button>
                  </div>
                  <span className={"text-divider/60 font-medium text-sm"}>
                    1 Upvote
                  </span>
                </div>
              </div>
            </div>
            <div className={"flex items-start space-x-4"}>
              <Avatar className={"min-w-10 min-h-10"} />
              <div>
                <div className={"flex space-x-2 items-center"}>
                  <h3 className={"font-medium text-lg"}>Sidiat Bruma</h3>
                  <span className={"text-sm text-divider/30"}>2 days ago</span>
                </div>
                <h6
                  className={"font-medium text-start text-sm text-divider/70"}
                >
                  The Cosi Affiliate Program sounds like a fantastic
                  opportunity! I love that they offer a diverse range of
                  products, making it easy to find something that fits my
                  audience &apos;s interests. The competitive commissions and
                  access to marketing materials really streamline the process.
                  It&apos;s great to see a brand that prioritizes quality and
                  customer satisfaction. I &apos;m excited to explore this
                  further and potentially start promoting Cosi!
                </h6>
                <div className={"flex justify-between items-center mt-2"}>
                  <div>
                    <Button isIconOnly variant={"light"}>
                      <ThumbsUpIcon size={18} />
                    </Button>
                    <Button isIconOnly variant={"light"}>
                      <ThumbsDownIcon size={18} />
                    </Button>
                  </div>
                  <span className={"text-divider/60 font-medium text-sm"}>
                    1 Upvote
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={"flex-1 min-w-96 pl-6"}>
        <div className="flex">
          <Button
            color={"secondary"}
            size={"md"}
            startContent={<CornerUpRightIcon />}
            variant={"flat"}
            onClick={() => {
              router.push(`/affiliates/${params.id}/info`);
            }}
          >
            Read Post
          </Button>
        </div>
        <div className="flex flex-col space-y-8">
          {/*  */}
          <div
            className={
              "flex flex-col md:flex-row justify-between mt-6 space-y-6 md:space-y-0"
            }
          >
            <div>
              <h3 className={"text-lg font-medium"}>Cosi Affiliate Program</h3>
              <div className="flex items-center gap-1 mt-0">
                {"★★★★☆".split("").map((star, i) => (
                  <span key={i} className="text-purple-300 text-xl">
                    {i < Math.floor(4.6) ? "★" : "☆"}
                  </span>
                ))}
                <span className="text-md text-divider/100 ml-1 font-medium">
                  {4.6}/5
                </span>
              </div>
            </div>
            <Button
              className="w-full md:w-auto"
              color={"secondary"}
              size={"md"}
              variant={"faded"}
            >
              Follow
            </Button>
          </div>
          {/*  */}
          <div
            className={
              "rounded-xl bg-default/20 border border-divider p-6 flex justify-between"
            }
          >
            <div className={"flex flex-col items-center space-y-2"}>
              <Button isIconOnly color={"success"} variant={"light"}>
                <CopyIcon size={28} />
              </Button>
              <span className={"text-sm hidden md:block text-divider/30"}>
                Copy Link
              </span>
            </div>
            <div className={"flex flex-col items-center space-y-2"}>
              <Button isIconOnly color={"danger"} variant={"light"}>
                <InstagramIcon size={28} />
              </Button>
              <span className={"text-sm hidden md:block text-divider/30"}>
                Instagram
              </span>
            </div>
            <div className={"flex flex-col items-center space-y-2"}>
              <Button isIconOnly color={"primary"} variant={"light"}>
                <FacebookIcon size={28} />
              </Button>
              <span className={"text-sm hidden md:block text-divider/30"}>
                Facebook
              </span>
            </div>
            <div className={"flex flex-col items-center space-y-2"}>
              <Button isIconOnly color={"default"} variant={"light"}>
                <TwitterIcon size={28} />
              </Button>
              <span className={"text-sm hidden md:block text-divider/30"}>
                Twitter
              </span>
            </div>
          </div>
          {/*  */}
          <div
            className={
              "rounded-xl border border-divider flex flex-col justify-between divide-y divide-divider"
            }
          >
            <div
              className={"p-4 rounded-t-xl"}
              style={{
                backgroundImage: "url(/images/bg-pcard.png)",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            >
              <h3 className="text-lg font-medium ">You Might Like</h3>
            </div>
            <div className={"p-4"}>
              <div className={"flex flex-col items-start"}>
                <h3 className={"text-lg font-medium"}>143Vinly.com</h3>
                <span className={"text-sm text-divider/60"}>
                  Platform: Direct
                </span>
                <span className={"text-sm text-divider/60"}>
                  Commision type: Recurring
                </span>
                <div className="flex items-center gap-1 mt-0">
                  {"★★★★☆".split("").map((star, i) => (
                    <span key={i} className="text-purple-300 text-xl">
                      {i < Math.floor(4.6) ? "★" : "☆"}
                    </span>
                  ))}
                  <span className="text-md text-divider/100 ml-1 font-medium">
                    {4.6}/5
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
