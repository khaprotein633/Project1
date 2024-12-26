import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Review.scss";

const ReviewComponent = ({ userId, productId }) => {
    const [reviews, setReviews] = useState([]);
    const [newComment, setNewComment] = useState({
        product_id: "", // Đảm bảo bắt đầu với productId hiện tại
        user_id: "",
        rating: 0,
        comment: "",
    });
    const [visibleReviews, setVisibleReviews] = useState(6);
    const [averageRating, setAverageRating] = useState(0);
    const [totalReviews, setTotalReviews] = useState(0);
    const [loading, setLoading] = useState(false);

    // Fetch reviews when productId changes
    useEffect(() => {
        setNewComment((prevComment) => ({
            ...prevComment,
            product_id: productId, 
            user_id:userId
        }));
        fetchReviews();
    }, [productId]);
    const fetchReviews = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `http://localhost:4000/api/comment/getbyid/${productId}`
            );
            const fetchedReviews = response.data.list;
            setReviews(fetchedReviews);
            setTotalReviews(response.data.total);

            const avgRating =
                fetchedReviews.reduce((acc, review) => acc + review.rating, 0) /
                fetchedReviews.length;
            setAverageRating(avgRating.toFixed(1));
        } catch (error) {
            console.error("Error fetching comments:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewComment((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newComment.rating < 1 || newComment.rating > 5) {
            alert("Please provide a rating between 1 and 5.");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(
                "http://localhost:4000/api/comment/add",
                newComment
            );
            if (response.status === 201) {
                setNewComment({
                    rating: 0,
                    comment: "",
                    user_id: userId,
                    product_id: productId, // Đảm bảo product_id là của giày hiện tại
                });
            }
            fetchReviews();
        } catch (error) {
            console.error("Error submitting comment:", error);
            alert("Failed to submit comment. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const loadMore = () => {
        setVisibleReviews((prev) => prev + 6);
    };

    return (
        <div className="review-container">
            {/* Average Rating Section */}
            <div className="rating-summary">
                <div className="average-rating">
                    <span className="rating-number">{averageRating}</span>
                    <div className="stars">
                        {Array.from({ length: 5 }, (_, i) => (
                            <span
                                key={i}
                                className={`star ${i < Math.floor(averageRating) ? "filled" : ""}`}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                    <p className="total-reviews">
                        {totalReviews} customers have reviewed this product
                    </p>
                </div>
            </div>

            {/* Review List */}
            <div className="reviews">
                {loading ? (
                    <p>Loading reviews...</p>
                ) : (
                    reviews.slice(0, visibleReviews).map((review, index) => (
                        <div className="review" key={index}>
                            <div className="review-rating">
                                {Array.from({ length: 5 }, (_, i) => (
                                    <span key={i} className={`star ${i < review.rating ? "filled" : ""}`}>
                                        ★
                                    </span>
                                ))}
                            </div>
                            <h4>{review.user_id.name}</h4>
                            <p>{review.comment}</p>
                            <span className="review-meta">
                                {new Date(review.review_date).toLocaleDateString()} by {review.user_id.name}
                            </span>
                        </div>
                    ))
                )}
            </div>

            {/* Load More Button */}
            {visibleReviews < reviews.length && !loading && (
                <button className="load-more" onClick={loadMore}>
                    Load More
                </button>
            )}

            {/* Give a Comment Section */}
            <div className="give-comment">
                <h3>Give a Comment</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="rating">Rating (1-5)</label>
                        <input
                            type="number"
                            name="rating"
                            value={newComment.rating}
                            min="1"
                            max="5"
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="comment">Comment</label>
                        <textarea
                            name="comment"
                            value={newComment.comment}
                            onChange={handleInputChange}
                            placeholder="Write your review here"
                            required
                        />
                    </div>
                    <button type="submit" className="submit-comment" disabled={loading}>
                        {loading ? "Submitting..." : "Submit"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ReviewComponent;
