import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Pagination = () => {
    let [comments, setComments] = useState([]);
    let [page, setPage] = useState(0);
    let [count, setCount] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:5000/commentsCount")
            .then(res => setCount(res.data.count))
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:5000/comments?page=${page}`)
            .then(res => setComments(res.data));
    }, [page]);

    let handlePrevious = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    };

    let handleNext = () => {
        if (page < totalPages - 1) {
            setPage(page + 1);
        }
    };

    let totalPages = Math.ceil(count / 30); //30 is the default for perPages. If select-option is used it can be changed.

    let displayPages = [...Array(totalPages).keys()];
    return (
        <div>
            <div className='w-[90%] mx-auto grid grid-cols-4 gap-6 py-6'>
                {
                    comments.map(comment =>
                        <div className='shadow-lg p-4' key={comment._id}>
                            <div className='flex gap-2'>
                                <p className='font-bold text-xl'>{comment.id}</p>
                                <h4 className='text-xl'>{comment.name}</h4>
                            </div>
                            <div>
                                {comment.body}
                            </div>
                        </div>
                    )
                }
            </div>
            <div className='flex justify-center gap-4'>
                <button onClick={handlePrevious} className='bg-gray-700 font-bold text-white py-3 px-4 rounded-lg'>
                    Previous
                </button>
                {
                    displayPages.map((item, index) =>
                        <button onClick={() => setPage(index)} className='bg-gray-700 font-bold text-white py-3 px-4 rounded-lg'>
                            {index}
                        </button>
                    )
                }
                <button onClick={handleNext} className='bg-gray-700 font-bold text-white py-3 px-4 rounded-lg'>
                    Next
                </button>
            </div>
        </div>
    );
};

export default Pagination;
