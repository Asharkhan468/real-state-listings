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


export const createPost = async (formData) => {
  try {
    const res = await fetch(`${BASE_URL}api/v1/createPost`, {
      method: "POST",
      credentials: "include",
      body: formData, // image aur text dono included honge
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, message: data.message || "Failed to create post" };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Create post error:", error.message);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
};
