import axios from "axios";

const baseUrl = "http://localhost:3004/anecdotes";

const getId = () => (100000 * Math.random()).toFixed(0);

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createAnecAxios = async (content) => {
  const object = { content, votes: 0, id: getId() };
  const response = await axios.post(baseUrl, object);
  return response.data;
};

const increaseVoteAxios = async (content, id, votes) => {
  let currentAnecUrlWithId = `${baseUrl}/${id}`;
  const object = { content, votes: votes + 1 };
  try {
    const response = await axios.put(currentAnecUrlWithId, object);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default { getAll, createAnecAxios, increaseVoteAxios };
