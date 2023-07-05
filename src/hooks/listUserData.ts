import axios, { AxiosPromise } from "axios";
import { useQuery } from "@tanstack/react-query";
import { UserDataResponse } from "../interface/UserDataResponse";

const API_URL = 'http://localhost:8080';

const fetchData = async (): AxiosPromise<UserDataResponse[]> => {
    const response = axios.get(API_URL + '/user/list');
    return response;
}

export function useUserData(){
    const query = useQuery ({
        queryFn: fetchData,
        queryKey: ['user-data'],
        retry: 2
    });

    return {
        ...query,
        data: query.data?.data
    };
}