import React from "react";
import axios from "axios";
import {TOTAL_COIN_API} from "@/constant/api-data.ts";
import Container from "@/components/Container.tsx";
import {useQuery} from "react-query";

function useTotalCoin(queryKeys: string[])
{
    return useQuery({
        queryKey: queryKeys,
        queryFn: async (): Promise<T> => {
            return axios.get(TOTAL_COIN_API)
                .then(({data}: {
                    data: unknown
                }) => data);
        }
    });
}

function App() {
    const {data, isLoading, isSuccess, isError} = useTotalCoin(["total"]);
    console.log(isLoading, isSuccess, isError, data);
    return (<>
        <Container>
            <button>
                hi
            </button>
        </Container>
    </>);
}

export default App
