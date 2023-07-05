import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import moment from "moment";

const API_URL = "http://localhost:8080";

const useUpdateData = () => {
  const queryClient = useQueryClient();

  const updateData = async (
    image: File,
    name: string,
    birthday: Date,
    cdUser: number
  ) => {
    const formData = new FormData();
    if(typeof image !== "string") {
        formData.append('image', image ? image : new Blob(), image?.name);
    }
    formData.append('name', name);
    formData.append('birthday', moment(birthday).format('YYYY-MM-DD'));

    await axios.put(`${API_URL}/user/${cdUser}`, formData);
    queryClient.invalidateQueries(["user-data"]);
  };

  return updateData;
};

export default useUpdateData;
