import axios from "axios";

const favoriteService = {
  getAll() {
    return axios.get("/api/favorites");
  },
  add(recipeId: string) {
    return axios.post("/api/favorites", { recipeId });
  },
  remove(recipeId: string) {
    return axios.delete("/api/favorites", { data: { recipeId } });
  },
};

export default favoriteService;
