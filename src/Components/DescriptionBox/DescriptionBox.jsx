import React, { useState, useEffect } from "react";
import "./DescriptionBox.css";

const DescriptionBox = () => {
  // Initialize with John Doe's reviews only
  const initialReviews = [
    { id: 1, name: "John Doe", comment: "Great product!", rating: 5 },
  ];

  const [reviews, setReviews] = useState(initialReviews);
  const [newReviewName, setNewReviewName] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState("");
  const [addedReviews, setAddedReviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Filter out reviews not authored by John Doe
    const johnsReviews = [...reviews, ...addedReviews].filter(
      (review) => review.name === "John Doe"
    );

    // Update state with filtered reviews
    setReviews(johnsReviews);

    // Update localStorage with filtered reviews
    localStorage.setItem("reviews", JSON.stringify(johnsReviews));
  }, [addedReviews]); // Only update when addedReviews changes

  const handleNameChange = (e) => {
    setNewReviewName(e.target.value);
  };

  const handleRatingChange = (e) => {
    setNewReviewRating(parseInt(e.target.value));
  };

  const handleCommentChange = (e) => {
    setNewReviewComment(e.target.value);
  };

  const handleAddReview = () => {
    if (newReviewName && newReviewComment) {
      const newReview = {
        id: reviews.length + 1,
        name: newReviewName,
        comment: newReviewComment,
        rating: newReviewRating,
      };
      setAddedReviews([...addedReviews, newReview]);
      setNewReviewName("");
      setNewReviewRating(5);
      setNewReviewComment("");
      setIsModalOpen(false);
    } else {
      alert("Please enter your name and a comment before submitting.");
    }
  };

  const handleDeleteReview = (id) => {
    const updatedReviews = addedReviews.filter((review) => review.id !== id);
    setAddedReviews(updatedReviews);
  };

  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box fade">
          Reviews ({reviews.length + addedReviews.length})
        </div>
      </div>

      <div className="descriptionbox-reviews">
        {[...reviews, ...addedReviews].map((review) => (
          <div key={review.id} className="review-item">
            <div className="review-header">
              <div className="review-name">{review.name}</div>
              <div className="review-rating">Rating: {review.rating}</div>
            </div>
            <div className="review-comment">{review.comment}</div>
            {addedReviews.some(
              (addedReview) => addedReview.id === review.id
            ) && (
              <button onClick={() => handleDeleteReview(review.id)}>
                Delete
              </button>
            )}
          </div>
        ))}
      </div>

      <button
        className="add-review-button"
        onClick={() => setIsModalOpen(true)}
      >
        Add Review
      </button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-modal" onClick={() => setIsModalOpen(false)}>
              &times;
            </span>
            <h3>Add a Review</h3>
            <label>Name:</label>
            <input
              type="text"
              value={newReviewName}
              onChange={handleNameChange}
            />

            <label>Rating:</label>
            <select value={newReviewRating} onChange={handleRatingChange}>
              {[1, 2, 3, 4, 5].map((value) => (
                <option key={value} value={value}>
                  {value} star{value !== 1 ? "s" : ""}
                </option>
              ))}
            </select>

            <label>Comment:</label>
            <textarea value={newReviewComment} onChange={handleCommentChange} />

            <button onClick={handleAddReview}>Submit Review</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DescriptionBox;
