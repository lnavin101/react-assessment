import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IPost } from './models/IPost.interface';

export default function Detail() {
    const params = useParams();
    
    // state
    const [data, setData] = useState<IPost>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`/api/posts/${params.id}`)
        .then((response) => response.json())
        .then((data) => setData(data))
        .finally(() => setLoading(false))
        .catch(error => {
            console.log(error);
            setError(error);
        });
    }, [])

    return (
        <div>
            <h1>{data?.title}</h1>
        </div>
    )
}