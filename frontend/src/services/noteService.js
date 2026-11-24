import api from "./api";

export const getNotes = async ({ search = "", sort = "newest" } = {}) => {
  const { data } = await api.get("/notes", { params: { search, sort } });
  return data;
};

export const getNote = async (id) => {
  const { data } = await api.get(`/notes/${id}`);
  return data;
};

export const createNote = async (payload) => {
  const { data } = await api.post("/notes", payload);
  return data;
};

export const updateNote = async (id, payload) => {
  const { data } = await api.put(`/notes/${id}`, payload);
  return data;
};

export const deleteNote = async (id) => {
  const { data } = await api.delete(`/notes/${id}`);
  return data;
};
