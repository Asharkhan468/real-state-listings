const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const loginUser = async (email, password) => {
  try {
    const res = await fetch(`${BASE_URL}api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, message: data.message || "Login failed" };
    }

    if (data?.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
    }

    return { success: true, data };
  } catch (error) {
    console.error("Login error:", error.message);

    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
};

export const createPost = async (
  title,
  price,
  beds,
  baths,
  area,
  description,
  type,
  imageFile,
  location
) => {
  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("beds", beds);
    formData.append("baths", baths);
    formData.append("area", area);
    formData.append("location", location);
    formData.append("description", description);
    formData.append("type", type);
    formData.append("image", imageFile);
    const res = await fetch(`${BASE_URL}api/v1/createPost`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    const data = await res.json();
    console.log("📩 Server response:", data);

    if (!res.ok) {
      return {
        success: false,
        message: data.message || "❌ Failed to create post",
      };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Create post error:", error.message);
    return {
      success: false,
      message: "⚠️ Something went wrong. Please try again.",
    };
  }
};

export const getAllPosts = async () => {
  try {
    const res = await fetch(`${BASE_URL}api/v1/allPost`, {
      method: "GET",
      credentials: "include", // agar cookies ya auth use ho rahi ho
    });

    const data = await res.json();
    console.log("📩 Server response:", data);

    if (!res.ok) {
      return {
        success: false,
        message: data.message || "❌ Failed to fetch posts",
      };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Get all posts error:", error.message);
    return {
      success: false,
      message: "⚠️ Something went wrong while fetching posts.",
    };
  }
};

export const deletePost = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}api/v1/deletePost/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    const data = await res.json();
    console.log("🗑️ Delete response:", data);

    if (!res.ok) {
      return {
        success: false,
        message: data.message || "❌ Failed to delete post",
      };
    }

    return {
      success: true,
      message: data.message || "✅ Post deleted successfully!",
    };
  } catch (error) {
    console.error("Delete post error:", error.message);
    return {
      success: false,
      message: "⚠️ Something went wrong while deleting the post.",
    };
  }
};

export const updatePost = async (
  id,
  title,
  price,
  bedrooms,
  bathrooms,
  area,
  description,
  type,
  image,
  location
) => {
  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("bedrooms", bedrooms);
    formData.append("bathrooms", bathrooms);
    formData.append("area", area);
    formData.append("description", description);
    formData.append("type", type);
    formData.append("location", location);
    if (image) formData.append("image", image);

    const res = await fetch(`${BASE_URL}api/v1/updatePost/${id}`, {
      method: "PUT",
      credentials: "include",
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) {
      return {
        success: false,
        message: data.message || "Failed to update post",
      };
    }

    return { success: true, message: "Post updated successfully" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
