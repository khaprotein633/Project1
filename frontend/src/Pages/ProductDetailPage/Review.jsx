import React, { useState } from "react";
import "./Review.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";

const ReviewComponent = () => {
    const [reviews, setReviews] = useState([
        {
            rating: 4,
            title: "Great fit, great price",
            description:
                "Worth buying this for value for money. But be warned: get one size larger as the medium is closer to small medium!",
            date: "20th September 2020",
            author: "DaveD",
        },
        {
            rating: 2,
            title: "Not worth the money",
            description:
                "Loose and poor stitching on the sides. Won’t buy this again.",
            date: "18th September 2020",
            author: "Sandra K",
        },
        {
            rating: 4.5,
            title: "Decent for the price",
            description: "I buy these often as they are good quality and value for money.",
            date: "16th September 2020",
            author: "MikeS",
        },
        {
            rating: 4,
            title: "Great little T",
            description: "Wore this to my local music festival - went down well.",
            date: "14th September 2020",
            author: "Frankie",
        },
        {
            rating: 4,
            title: "Great for the BBQ",
            description:
                "Bought this on the off chance it would work well with my skinny jeans, was a great decision. Would recommend.",
            date: "20th September 2020",
            author: "Kevin",
        },
        {
            rating: 2,
            title: "Nothing special but it’s okay",
            description: "It’s a t-shirt. What can I say, it does the job.",
            date: "20th September 2020",
            author: "Holly",
        },
    ]);
    const [visibleReviews, setVisibleReviews] = useState(6);
    const [newComment, setNewComment] = useState({
        rating: 0,
        title: "",
        description: "",
        author: "",
    });
    const [hoverRating, setHoverRating] = useState(0);
    const [isHalfStar, setIsHalfStar] = useState(false);

    const totalReviews = reviews.length;
    const averageRating = (
        reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
    ).toFixed(1);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewComment((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleStarHover = (rating, event) => {
        const { clientX, target } = event;
        const rect = target.getBoundingClientRect();
        const isHalf = clientX - rect.left < rect.width / 2; // Check if the hover is on the left half of the star
        setHoverRating(rating - (isHalf ? 0.5 : 0));
        setIsHalfStar(isHalf);
    };

    const handleStarClick = (rating) => {
        setNewComment((prev) => ({
            ...prev,
            rating,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newComment.rating && newComment.title && newComment.description && newComment.author) {
            setReviews((prev) => [
                {
                    ...newComment,
                    date: new Date().toLocaleDateString(),
                },
                ...prev,
            ]);
            setNewComment({ rating: 0, title: "", description: "", author: "" });
        } else {
            alert("Please fill out all fields!");
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
                    <p className="total-reviews">{totalReviews} customers have reviewed this product</p>
                </div>

                {/* Rating Breakdown */}
                <div className="rating-breakdown">
                    {[5, 4, 3, 2, 1].map((rating, index) => (
                        <div key={index} className="rating-row">
                            <span>{rating} ★</span>
                            <div className="bar">
                                <div
                                    className="filled-bar"
                                    style={{
                                        width: `${(Math.random() * 50 + 10).toFixed(1)}%`,
                                    }}
                                ></div>
                            </div>
                            <span>{Math.floor(Math.random() * 100)}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Review List */}
            <div className="reviews">
                {reviews.slice(0, visibleReviews).map((review, index) => (
                    <div className="review" key={index}>
                        <div className="review-rating">
                            {Array.from({ length: 5 }, (_, i) => (
                                <span key={i} className={`star ${i < review.rating ? "filled" : ""}`}>
                                    ★
                                </span>
                            ))}
                        </div>
                        <h4>{review.title}</h4>
                        <p>{review.description}</p>
                        <span className="review-meta">
                            {review.date} by {review.author}
                        </span>
                    </div>
                ))}
            </div>

            {/* Load More Button */}
            {visibleReviews < reviews.length && (
                <button className="load-more" onClick={loadMore}>
                    Load More
                </button>
            )}
            {/* Load More Button */}
            {visibleReviews > reviews.length && (
                <button className="load-more" onClick={loadMore}>
                    Load More
                </button>
            )}
            {/* Give a Comment Section */}
            <div className="give-comment">
                <h3>Give a Comment</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="rating">Rating</label>
                        <div className="star-rating-input">
                            {Array.from({ length: 5 }, (_, i) => (
                                <span
                                    key={i}
                                    className={`star ${i + 1 <= hoverRating || (i < hoverRating && isHalfStar)
                                            ? "filled"
                                            : ""
                                        }`}
                                    onMouseMove={(e) => handleStarHover(i + 1, e)}
                                    onMouseLeave={() => {
                                        setHoverRating(0);
                                        setIsHalfStar(false);
                                    }}
                                    onClick={() => handleStarClick(hoverRating)}
                                >
                                    {i + 1 <= hoverRating || (i < hoverRating && isHalfStar) ? (
                                        i + 0.5 === hoverRating ? (
                                            <FontAwesomeIcon icon={faStarHalfAlt} />
                                        ) : (
                                            <FontAwesomeIcon icon={faStar} />
                                        )
                                    ) : (
                                        <FontAwesomeIcon icon={faStar} style={{ color: "#e0e0e0" }} />
                                    )}
                                </span>
                            ))}
                        </div>

                    </div>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={newComment.title}
                            onChange={handleInputChange}
                            placeholder="Enter your title"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={newComment.description}
                            onChange={handleInputChange}
                            placeholder="Write your review here"
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="author">Name</label>
                        <input
                            type="text"
                            id="author"
                            name="author"
                            value={newComment.author}
                            onChange={handleInputChange}
                            placeholder="Enter your name"
                        />
                    </div>
                    <button type="submit" className="submit-comment">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ReviewComponent;
