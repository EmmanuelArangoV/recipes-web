import axios from "axios";

const recipeService = {
  getAll() {
    return axios.get("/api/recipes");
  },
  getById(id: string) {
    return axios.get(`/api/recipes/${id}`);
  },
};

export default recipeService;
