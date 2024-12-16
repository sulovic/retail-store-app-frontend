import { FilterType, PaginationType } from "@/types/types";

const generateApiParams = ({ filters, pagination, search }: { filters?: FilterType, pagination?: Omit<PaginationType, "count">, search?: string }): string => {
    let apiParams = "";

    if (search || filters || pagination) {
        apiParams += "?";
    }

    if (pagination) {
        apiParams += `limit=${pagination.limit}&page=${pagination.page}`;
    }

    if (filters) {
        const filterParams = Object.entries(filters)
            .map(([key, value]) => {
                if (value.length > 0) {
                    return `${key}=${value}`; 
                }
                return null; 
            })
            .filter(Boolean) 
            .join("&");

        if (filterParams) {
            apiParams += `&${filterParams}`; 
        }
    }

    if (search) {
        apiParams += `&search=${search}`;
    }

    return apiParams;
};

export default generateApiParams;
