import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = "http://localhost:8080";

const useDeleteData = () => {
  const queryClient = useQueryClient();

  const deleteData = async (cdUser: number) => {
    const response = await axios.delete(`${API_URL}/user/${cdUser}`);
    return response.data;
  };

  const { mutate: deleteMutation } = useMutation(deleteData, {
    onSuccess: () => {
      queryClient.invalidateQueries(["user-data"]);
    },
  });

  return deleteMutation;
};

export default useDeleteData;
