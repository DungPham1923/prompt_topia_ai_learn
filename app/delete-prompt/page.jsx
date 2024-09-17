"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Modal from "@components/Modal";

const DeletePrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const [post, setPost] = useState({ prompt: "", tag: "" });
  const [submitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPromptDetails = async () => {
      try {
        if (!promptId) return;

        const response = await fetch(`/api/prompt/${promptId}`);
        if (!response.ok) throw new Error("Failed to fetch prompt details");

        const data = await response.json();
        setPost({ prompt: data.prompt, tag: data.tag });
      } catch (error) {
        console.error("Error fetching prompt:", error);
      } finally {
        setLoading(false);
      }
    };

    getPromptDetails();
  }, [promptId]);

  const deletePrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!promptId) {
      alert("Missing PromptId!");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete prompt");
      }

      router.push("/profile");
    } catch (error) {
      console.error("Error deleting prompt:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <p>Loading prompt details...</p>;

  return (
    <div className="relative">
      <Modal
        name="Delete"
        desc="Are you sure you want to delete this Post?"
        post={post}
        submitting={submitting}
        handleDelete={deletePrompt}
      />
    </div>
  );
};

export default DeletePrompt;
