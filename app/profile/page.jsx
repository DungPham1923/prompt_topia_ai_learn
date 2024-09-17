"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";
import Modal from "@components/Modal";

const MyProfile = () => {
  const { data: session } = useSession();

  const [posts, setPosts] = useState([]);

  const [show, setShow] = useState(false);

  const router = useRouter();
  const handleEdit = async (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    router.push(`/delete-prompt?id=${post._id}`);
    //setShow(true);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`api/users/${session?.user.id}/posts`);
        const data = await response.json();
        console.log(data);
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    if (session?.user.id) {
      console.log(session?.user.id);
      fetchPosts();
    }
  }, [session?.user.id]);


  //Test pop-up
  return (
    <section>
      <Profile
        name="My"
        desc="Welcome to your personalized profile page"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </section>
  );
};

export default MyProfile;
