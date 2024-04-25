import axios from "axios";

const onDelete = async (postId, token) => {
  try {
    const response = await axios.delete(`https://bulgarian-atlas.nst.bg/wp-json/wp/v2/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Delete response:", response.data);
    return true;
  } catch (error) {
    console.error("Failed to delete post:", error);
    throw error;
  }
};

export default onDelete;
