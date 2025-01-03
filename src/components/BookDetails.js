import React from "react";

const BookDetails = () => {
  const book = {
    title: "Sample Book",
    author: "Author Name",
    price: 499,
    description: "This is a sample book description.",
  };

  return (
    <div>
      <h2>{book.title}</h2>
      <p>Author: {book.author}</p>
      <p>Price: ₹{book.price}</p>
      <p>{book.description}</p>
      <button>Add to Cart</button>
      <button>Wishlist</button>
      <button>Buy Now</button>
    </div>
  );
};

export default BookDetails;
