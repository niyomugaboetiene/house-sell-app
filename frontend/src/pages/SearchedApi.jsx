import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const searchProducts = async (
  query = "",
  country = "",
  Activity = "",
  district = "",
  city = "",
  sector = "",
  PropertyType = ""
) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/search`, {
      params: {
        query,
        country,
        Activity,
        district,
        city,
        sector,
        PropertyType,
      },
      withCredentials: true,
    });

    return response.data.Houses;
  } catch (error) {
    console.error("Search failed:", error.message);
    throw error;
  }
};
