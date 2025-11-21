import axios from "axios";

const BASE_URL = "http://localhost:5000/house";

export const searchProducts = async (query, country = "", Activity = "", district = "", sector = "", PropertyType="") => {
  try {
    const response = await axios.get(`${BASE_URL}/search`, {
      params: { query, country, Activity, district, city, sector, PropertyType },
      withCredentials: true,
    });
    return response.data.Houses;
  } catch (error) {
    console.error("Search failed:", error.message);
    throw error;
  }
};
