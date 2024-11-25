"use client";
import { Button } from "@nextui-org/button";
import { useParams, useRouter } from "next/navigation";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import {
  BadgePercent,
  BookmarkIcon,
  CopyIcon,
  CornerUpRightIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  LinkIcon,
  MessageSquareIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
  TwitterIcon,
} from "lucide-react";
import { Image } from "@nextui-org/image";
import { Divider } from "@nextui-org/divider";
import { Input } from "@nextui-org/input";
import { Avatar } from "@nextui-org/avatar";
import { useEffect, useState } from "react";
import { Chip } from "@nextui-org/chip";
import { useSession } from "next-auth/react";

import { getRateValue } from "@/utils/common";
import { Comment, Program } from "@/types/define";

const sortList = [{ key: "latest_update", label: "Latest update" }];

const socials = {
  facebook: {
    name: "Facebook",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#3b5998" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.895 0 0 .895 0 2.025v19.95C0 23.105.895 24 2.025 24h21.95C23.105 24 24 23.105 24 21.975V2.025C24 .895 23.105 0 22.675 0zM12 24V12h-3v-4h3V6c0-3.1 1.9-4 4-4h3v4h-2c-1.1 0-1 .5-1 1v3h4l-1 4h-3v12H12z"/></svg>`,
  },
  twitter: {
    name: "Twitter",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#1DA1F2" viewBox="0 0 24 24"><path d="M23.643 4.937c-.835.375-1.73.63-2.68.74a4.686 4.686 0 002.042-2.573c-.92.546-1.937.943-3.021 1.155a4.663 4.663 0 00-7.97 4.257A13.215 13.215 0 011.671 3c-.42-.018-.84-.063-1.25-.063-.43 0-.855-.026-1.274-.075a4.663 4.663 0 003.031-5.196c-1 .592-2 .99-3 .99A4.664 4.664 0 0012 .007c2 .001 3 .003z"/></svg>`,
  },
  linkedin: {
    name: "LinkedIn",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#0077B5" viewBox="0 0 24 24"><path d="M22.225 0h-20.45C1.01 0 .001 1 .001 2.225v19.55C0 22.99 1 .001l20 .001c1 .001l20 .001C23 .001l20 .001C23 .001zM6 .001c1 .001l20 .001C6 .001zM8 .003H5v18H8V8zm11 .003h-3v18h3V8zm-11 .003H5V8h3z"/></svg>`,
  },
  instagram: {
    name: "Instagram",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#E1306C" viewBox="0 0 24 24"><path d="M12 .002c3.313-.002 6 .0027,9,3c2,2,2,5,2,9s-.0027,6 -2,9c-3,3 -5,3 -9,3s-6 -.0027 -9 -3c-2 -2 -2 -5 -2 -9s0 -7,2 -9C6,.0027,8,.0027,12,.002zm6,12a6,6,0,1,1,-12,.002a6,6,0,1,1,12,.002zm-.004,-8a1,.9999A10,.9999A10,.9999A10,.9999A10,.9999A10,.9999A10,.9999A10,.9999A10,.9999A10,.9999A10,.9999A10,.9999A10,.9999A10,.9999A10,.9999A10,.9999A10,.9999A10,.9999A10,.9999A10,.9999A10,.9999A10,.9999A10,.9999A10,.9999A10,.9999A10,.9999A10,.9999A10,/></svg>`,
  },
};

export default function Page() {
  const { data: session } = useSession();
  const params = useParams();
  const router = useRouter();

  const [_program, setProgram] = useState<Program>();
  const [samples, setSamples] = useState<Program[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [comment, setComment] = useState<string>();

  const onClose = () => {
    router.back();
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure({
    defaultOpen: true,
    onClose,
  });

  useEffect(() => {
    fetchComments();
  }, [_program?._id]);

  useEffect(() => {
    fetchProgram();
    fetchSamples();
  }, [params.id]);

  const fetchComments = async () => {
    try {
      const response = await fetch("/api/main/get-comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ programId: _program?._id }),
      });
      const data = await response.json();

      if (data.comments) setComments(data.comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const fetchProgram = async () => {
    try {
      const response = await fetch("/api/main/get-program", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uuid: params.id }),
      });
      const data = await response.json();

      setProgram(data.program);
    } catch (error) {
      console.error("Error fetching program:", error);
    }
  };

  const fetchSamples = async () => {
    try {
      const response = await fetch("/api/main/get-sample-programs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uuid: params.id }),
      });
      const data = await response.json();

      setSamples(data.programs);
    } catch (error) {
      console.error("Error fetching program:", error);
    }
  };

  const postComment = async () => {
    if (!comment) return;

    try {
      const response = await fetch("/api/main/post-comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          programId: _program?._id,
          userId: session?.user?.id,
          comment,
        }),
      });

      if (response.ok) {
        const newComment = await response.json();

        setComments([newComment.comment, ...comments]);
        setComment("");
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const addVote2Comment = async (comment_: Comment, voteType: string) => {
    try {
      const response = await fetch("/api/main/add-vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: session?.user?.id,
          commentId: comment_._id,
          voteType,
        }),
      });

      if (response.ok) {
        const { comment } = await response.json();

        setComments(
          comments?.map((c) => (c._id === comment_._id ? comment : c)),
        );
      }
    } catch (error) {
      console.error("Error adding vote:", error);
    }
  };

  const addVote2Program = async (
    program: Program | undefined,
    voteType: string,
  ) => {
    try {
      const response = await fetch("/api/main/add-vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: session?.user?.id,
          programId: program?._id,
          voteType,
        }),
      });

      if (response.ok) {
        const { program } = await response.json();

        setProgram((prev) => {
          if (prev) {
            if (program?.up_votes) prev.up_votes = program?.up_votes;

            return Object.create(prev);
          }
        });
      }
    } catch (error) {
      console.error("Error adding vote:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      scrollBehavior={"outside"}
      size="5xl"
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1" />
            <ModalBody>
              <div className={"flex flex-col md:flex-row space-x-2"}>
                <div className={"flex-1"}>
                  {/* <div className={"flex gap-2"}>
                    <Button isIconOnly size={"md"} variant={"shadow"}>
                      <ArrowUpIcon size={14} />
                    </Button>
                    <Button isIconOnly size={"md"} variant={"shadow"}>
                      <ArrowDownIcon size={14} />
                    </Button>
                  </div> */}
                  <div className={"px-2 py-6"}>
                    <div className={"flex space-x-2 items-center"}>
                      <BadgePercent color={"#ff0000"} size={24} />
                      <h1 className={"font-semibold text-xl"}>
                        {_program?.name}
                      </h1>
                    </div>

                    <div className={"flex flex-col space-y-3 mt-3 text-start"}>
                      {/*  Description*/}
                      <h4 className={"text-md font-medium"}>
                        {_program?.description}
                      </h4>
                      <span className={"text-md font-medium text-divider/60"}>
                        Platform:{" "}
                        {_program?.platform ? _program?.platform.name : "--"}
                      </span>
                      <span className={"text-md font-medium text-divider/60"}>
                        Commision type:{" "}
                        {_program?.commission_type
                          ?.replace(/_/g, " ")
                          .replace(/^\w/, (c: string) => c.toUpperCase())}
                      </span>
                      {/*  Rating*/}
                      <div className="flex items-center gap-1 mt-0">
                        {"★★★★☆".split("").map((star, i) => (
                          <span key={i} className="text-purple-300 text-xl">
                            {i <
                            Math.floor(getRateValue(_program?.average_ratings))
                              ? "★"
                              : "☆"}
                          </span>
                        ))}
                        <span className="text-md text-divider/100 ml-1 font-medium">
                          {getRateValue(_program?.average_ratings)}/5
                        </span>
                      </div>
                      {/*  Tags*/}
                      <div className="flex flex-wrap gap-2 overflow-x-auto">
                        {_program?.tags.map((tag, index) => (
                          <Chip
                            key={index}
                            className="px-3 py-1 text-sm rounded-full whitespace-nowrap font-medium"
                          >
                            {tag.name}
                          </Chip>
                        ))}
                      </div>
                      {/*  Time*/}
                      {/* <span className={"text-md font-medium"}>
                        Oct 18 - 2m read time - From Cosi.com
                      </span> */}
                      {/*  Image*/}
                      <Image
                        alt="NextUI hero Image"
                        className={"my-3"}
                        src={_program?.image}
                        width={400}
                      />
                    </div>
                    {/*  Comment*/}
                    <div className={"flex flex-col space-y-3 py-6 mt-8"}>
                      <div className={"flex space-x-6"}>
                        <span className={"text-lg font-medium"}>
                          {_program?.up_votes ? _program?.up_votes.length : 0}{" "}
                          Upvotes
                        </span>
                        <span className={"text-lg font-medium"}>
                          {comments?.length} Comments
                        </span>
                      </div>
                      <div
                        className={
                          "flex border-divider rounded-xl border space-x-2"
                        }
                      >
                        <div
                          className={"flex bg-divider rounded-xl items-center"}
                        >
                          <Button
                            isIconOnly
                            size={"md"}
                            variant={"light"}
                            onClick={async () => {
                              await addVote2Program(_program, "up");
                            }}
                          >
                            <ThumbsUpIcon size={16} />
                          </Button>
                          <Divider className={"h-6"} orientation={"vertical"} />
                          <Button
                            isIconOnly
                            size={"md"}
                            variant={"light"}
                            onClick={async () => {
                              await addVote2Program(_program, "down");
                            }}
                          >
                            <ThumbsDownIcon size={16} />
                          </Button>
                        </div>
                        <div
                          className={
                            "flex flex-1 items-center space-x-2 justify-between px-4"
                          }
                        >
                          <div className={"flex items-center space-x-2"}>
                            <MessageSquareIcon
                              className={"text-divider/60"}
                              size={18}
                            />
                            <span className={"hidden md:inline"}>Comment</span>
                          </div>
                          <div className={"flex items-center space-x-2"}>
                            <BookmarkIcon
                              className={"text-divider/60"}
                              size={18}
                            />
                            <span className={"hidden md:inline"}>Bookmark</span>
                          </div>
                          <div className={"flex items-center space-x-2"}>
                            <LinkIcon className={"text-divider/60"} size={18} />
                            <span className={"hidden md:inline"}>Copy</span>
                          </div>
                        </div>
                      </div>
                      {/* <div className="md:px-2 flex items-center space-x-4">
                        <div className="flex items-center md:space-x-1.5">
                          <ArrowDownAzIcon size={24} strokeWidth={1} />
                          <span className="hidden md:inline whitespace-nowrap text-divider/60">
                            Sort by:
                          </span>
                        </div>
                        <Select
                          className="w-40"
                          defaultSelectedKeys={["latest_update"]}
                          size={"sm"}
                          variant={"flat"}
                        >
                          {sortList.map((s) => (
                            <SelectItem key={s.key}>{s.label}</SelectItem>
                          ))}
                        </Select>
                      </div> */}
                    </div>
                    {/*  Post comments*/}
                    <Input
                      aria-multiline
                      classNames={{
                        mainWrapper: ["py-6"],
                        inputWrapper: ["px-2"],
                      }}
                      endContent={
                        <Button
                          color={"secondary"}
                          radius={"full"}
                          size={"sm"}
                          onClick={async () => await postComment()}
                        >
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
                            name={session?.user?.name}
                            size={"sm"}
                            src={session?.user?.image}
                          />
                        </div>
                      }
                      value={comment}
                      variant={"bordered"}
                      onChange={(e) => setComment(e.target.value)}
                    />
                    {/*  Last comments*/}
                    <div className={"flex flex-col space-y-3"}>
                      {comments?.map((c) => (
                        <div
                          key={c._id}
                          className={"flex items-start space-x-4"}
                        >
                          <Avatar
                            className={"min-w-10 min-h-10"}
                            name={c.user?.name}
                            src={c.user?.image}
                          />
                          <div className="flex-1">
                            <div className={"flex space-x-2 items-center"}>
                              <h3 className={"font-medium text-lg"}>
                                {c.user?.name}
                              </h3>
                              <span className={"text-sm text-divider/30"}>
                                {c.createdAt}
                              </span>
                            </div>
                            <h6
                              className={
                                "font-medium text-start text-sm text-divider/70"
                              }
                            >
                              {c.content}
                            </h6>
                            <div
                              className={
                                "flex justify-between items-center mt-2"
                              }
                            >
                              <div>
                                <Button
                                  isIconOnly
                                  variant={"light"}
                                  onClick={() => {
                                    addVote2Comment(c, "up");
                                  }}
                                >
                                  <ThumbsUpIcon size={18} />
                                </Button>
                                <Button
                                  isIconOnly
                                  variant={"light"}
                                  onClick={() => {
                                    addVote2Comment(c, "down");
                                  }}
                                >
                                  <ThumbsDownIcon size={18} />
                                </Button>
                              </div>
                              <span
                                className={
                                  "text-divider/60 font-medium text-sm"
                                }
                              >
                                {c.up_votes.length} Upvote
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className={"max-w-[360px] flex-1 w-full px-6"}>
                  <div>
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
                  <div className="flex flex-col space-y-6">
                    {/*  */}
                    <div
                      className={
                        "flex flex-col md:flex-row justify-between mt-6 space-y-6 md:space-y-0"
                      }
                    >
                      <div className="p-1">
                        <h3 className={"text-lg font-medium"}>
                          {_program?.name}
                        </h3>
                        <div className="flex items-center gap-1 mt-0">
                          {"★★★★☆".split("").map((star, i) => (
                            <span key={i} className="text-purple-300 text-xl">
                              {i <
                              Math.floor(
                                getRateValue(_program?.average_ratings),
                              )
                                ? "★"
                                : "☆"}
                            </span>
                          ))}
                          <span className="text-md text-divider/100 ml-1 font-medium">
                            {getRateValue(_program?.average_ratings)}/5
                          </span>
                        </div>
                      </div>
                      <Button
                        className="w-full md:w-auto"
                        color={"secondary"}
                        size={"md"}
                        variant={"light"}
                        onClick={() => router.push(`${_program?.link}`)}
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
                      {_program?.contacts?.map((contact: string, i) => {
                        if (contact.includes("instagram"))
                          return (
                            <div
                              key={i}
                              className={"flex flex-col items-center space-y-2"}
                            >
                              <Button
                                isIconOnly
                                color={"danger"}
                                variant={"light"}
                              >
                                <InstagramIcon size={28} />
                              </Button>
                              <span
                                className={
                                  "text-sm hidden md:block text-divider/30"
                                }
                              >
                                Instagram
                              </span>
                            </div>
                          );
                        if (contact.includes("facebook"))
                          return (
                            <div
                              key={i}
                              className={"flex flex-col items-center space-y-2"}
                            >
                              <Button
                                isIconOnly
                                color={"primary"}
                                variant={"light"}
                              >
                                <FacebookIcon size={28} />
                              </Button>
                              <span
                                className={
                                  "text-sm hidden md:block text-divider/30"
                                }
                              >
                                Facebook
                              </span>
                            </div>
                          );
                        if (contact.includes("twitter"))
                          return (
                            <div
                              key={i}
                              className={"flex flex-col items-center space-y-2"}
                            >
                              <Button
                                isIconOnly
                                color={"default"}
                                variant={"light"}
                              >
                                <TwitterIcon size={28} />
                              </Button>
                              <span
                                className={
                                  "text-sm hidden md:block text-divider/30"
                                }
                              >
                                Twitter
                              </span>
                            </div>
                          );
                        if (contact.includes("linkedin"))
                          return (
                            <div
                              key={i}
                              className={"flex flex-col items-center space-y-2"}
                            >
                              <Button
                                isIconOnly
                                color={"default"}
                                variant={"light"}
                              >
                                <LinkedinIcon size={28} />
                              </Button>
                              <span
                                className={
                                  "text-sm hidden md:block text-divider/30"
                                }
                              >
                                Twitter
                              </span>
                            </div>
                          );

                        return (
                          <div
                            key={i}
                            className={"flex flex-col items-center space-y-2"}
                          >
                            <Button
                              isIconOnly
                              color={"success"}
                              variant={"light"}
                              onClick={async () => {
                                await navigator.clipboard.writeText(contact);
                              }}
                            >
                              <CopyIcon size={28} />
                            </Button>
                            <span
                              className={
                                "text-sm hidden md:block text-divider/30"
                              }
                            >
                              Copy Link
                            </span>
                          </div>
                        );
                      })}
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
                          backgroundImage: "url(images/bg-pcard.png)",
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                        }}
                      >
                        <h3 className="text-lg font-medium ">You Might Like</h3>
                      </div>
                      {samples?.map((sample, i) => (
                        <div key={i} className={"p-4"}>
                          <div className={"flex flex-col items-start"}>
                            <h3 className={"text-lg font-medium"}>
                              {sample.name}
                            </h3>
                            <span className={"text-sm text-divider/60"}>
                              Platform:{" "}
                              {sample.platform ? sample.platform.name : "--"}
                            </span>
                            <span className={"text-sm text-divider/60"}>
                              Commision type:{" "}
                              {sample.commission_type
                                ?.replace(/_/g, " ")
                                .replace(/^\w/, (c: string) => c.toUpperCase())}
                            </span>
                            <div className="flex items-center gap-1 mt-0">
                              {"★★★★☆".split("").map((star, i) => (
                                <span
                                  key={i}
                                  className="text-purple-300 text-xl"
                                >
                                  {i <
                                  Math.floor(
                                    getRateValue(sample.average_ratings),
                                  )
                                    ? "★"
                                    : "☆"}
                                </span>
                              ))}
                              <span className="text-md text-divider/100 ml-1 font-medium">
                                {getRateValue(sample.average_ratings)}/5
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
