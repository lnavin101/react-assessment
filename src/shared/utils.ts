import moment from "moment";

/** readable format for date */
export const formatDate = (params: any) => {
    return moment(params?.value ?? params).format('DD MMM YYYY');
}