import axios, { AxiosPromise } from "axios";
import { UserData } from "../interface/UserData";
import moment from 'moment';
import { useQueryClient, useMutation } from "@tanstack/react-query";

const API_URL = 'http://localhost:8080';

const postData = async (data: UserData): AxiosPromise<any> => {
    const { image, name, birthday } = data;
    console.log(data);
    const formData = new FormData();
    formData.append('image', image ? image : new Blob(), image?.name);
    formData.append('name', name);
    formData.append('birthday', moment(birthday).format('YYYY-MM-DD'));
    const response = axios.post(API_URL + '/user/new', formData);
    return response;
}

export function useUserDataMutate(){
    const queryClient = useQueryClient();

    const mutate = useMutation ({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries(['user-data'])
        }
    });

    return mutate;
}