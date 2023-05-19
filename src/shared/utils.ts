import moment from "moment";
import { IPost } from "../components/posts/models/IPost.interface";

/** readable format for date */
export const formatDate = (params: any) => {
    return moment(params?.value ?? params).format('DD MMM YYYY');
}

/** sort by date descending */
export const sortByDate = (array: IPost[]) => {
    array.sort((a: IPost,b: IPost)=> new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
    return array;
}