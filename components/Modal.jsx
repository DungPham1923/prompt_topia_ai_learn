"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

const Modal = ({ name, desc, post, submitting, handleDelete }) => {
  const [copied, setCopied] = useState("");
  const { data: session, status } = useSession();

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  };

  const isLoggedIn = status === "authenticated";

  return (
    <section className="w-full z-10">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name}</span> Post
      </h1>
      <p className="desc text-left mb-5">{desc}</p>

      <div className="prompt_card">
        {isLoggedIn && (
          <div className="flex justify-between items-start gap-5">
            <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
              <Image
                src={session.user.image || "/default-avatar.png"}
                width={40}
                height={40}
                className="rounded-full object-contain"
                alt="User profile"
              />
            </div>

            <div className="flex flex-col">
              <h3 className="font-satoshi font-semibold text-gray-900">
                {session.user.name}
              </h3>
              <p className="font-inter text-sm text-gray-500">
                {session.user.email}
              </p>
            </div>

            <div className="copy_btn" onClick={handleCopy}>
              <Image
                src={copied === post.prompt ? "/assets/icons/tick.svg" : "/assets/icons/copy.svg"}
                width={15}
                height={15}
                alt="Copy icon"
              />
            </div>
          </div>
        )}

        <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
        <p className="font-inter text-sm blue_gradient cursor-pointer">
          {post.tag}
        </p>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/profile" className="text-gray-500 text-sm">
            Cancel
          </Link>
          <button
            onClick={handleDelete}
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {submitting ? `${name}ing...` : name}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Modal;
