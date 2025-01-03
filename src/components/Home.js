import React, { useState, useEffect } from "react";

// Function to convert USD to INR (for demonstration, using a fixed rate)
const convertToINR = (amount, rate = 83) => {
  return (amount * rate).toFixed(2); // 83 is a rough conversion rate from USD to INR
};

const Home = () => {
  const [category, setCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // For storing the search query
  const [books, setBooks] = useState([]); // For storing the search results
  const [loading, setLoading] = useState(false); // For handling loading state
  
  // Handle category button click
  const handleCategoryClick = (category) => {
    setCategory(category);
    setLoading(true);

    // Fetch books by category from Google Books API
    fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${category}&key=AIzaSyDoMUGmhpob55O7cnkvNAinOQ0I0sQBSnQ`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // Log the entire response to check if books are available
      if (data.items && data.items.length > 0) {
        const saleableBooks = data.items.filter(book => 
          book.saleInfo && book.saleInfo.saleability === "FOR_SALE" && book.saleInfo.retailPrice
        );
        console.log(saleableBooks); // Log the saleable books
        setBooks(saleableBooks);
      } else {
        setBooks([]);
      }
      setLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching books:", error);
      setBooks([]);
      setLoading(false);
    });
  };

  // Handle the search functionality
  const handleSearch = (e) => {
    setSearchTerm(e.target.value); // Update search term as user types
  };

  useEffect(() => {
    if (!searchTerm) return; // Don't search if the search term is empty
    setLoading(true);

    // Fetch books based on search term from the Google Books API
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=YOUR_API_KEY`)
      .then((response) => response.json())
      .then((data) => {
        setBooks(data.items || []); // Set the fetched books to state
        setLoading(false); // Stop loading
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
        setBooks([]); // Set empty array in case of error
        setLoading(false); // Stop loading
      });
  }, [searchTerm]); // Trigger when search term changes

  return (
    <div>
      <h2>Welcome to the Bookstore</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search for books, authors, or genres..."
        value={searchTerm}
        onChange={handleSearch} // Update search term as user types
      />
      
      <div>
        <h3>Categories</h3>
        <div>
          {[
            "Best Sellers", "New Arrivals", "Fiction", "Non-fiction", "Self-help",
            "Cookbook", "Kids", "Biography", "Autobiography", "Romance", "Thriller",
            "Mystery", "Horror", "Fantasy", "Western", "Drama", "Poetry",
            "Historical fiction", "Anime", "Action/Adventure", "Academic"
          ].map((cat) => (
            <button key={cat} onClick={() => handleCategoryClick(cat)}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Display category books */}
      <div>
        <h3>{category} Books</h3>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {books.length > 0 ? (
              books.map((book, index) => (
                <div key={index}>
                  <h4>{book.volumeInfo.title}</h4>
                  <p><strong>Author(s):</strong> {book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "Unknown Author"}</p>
                  <p><strong>Publisher:</strong> {book.volumeInfo.publisher || "No Publisher Information"}</p>
                  <p><strong>Published Date:</strong> {book.volumeInfo.publishedDate || "No Date Available"}</p>
                  <p><strong>Page Count:</strong> {book.volumeInfo.pageCount || "Not Available"}</p>
                  <p>{book.volumeInfo.description || "No description available"}</p>
                  {book.volumeInfo.imageLinks && (
                    <img
                      src={book.volumeInfo.imageLinks.thumbnail}
                      alt={book.volumeInfo.title}
                      style={{ width: "100px", height: "150px" }}
                    />
                  )}
                  <div>
                    <a href={book.volumeInfo.infoLink} target="_blank" rel="noopener noreferrer">
                      More Info
                    </a>
                  </div>
                  {/* Display Price in INR if available */}
                  {book.saleInfo && book.saleInfo.retailPrice && book.saleInfo.retailPrice.amount ? (
                      <p><strong>Price:</strong> ₹{book.saleInfo.retailPrice.amount}</p>
                    ) : (
                      <p><strong>Price:</strong> Not Available</p>
                    )}
                </div>
              ))
            ) : (
              <p>No saleable books found in this category.</p>
            )}
          </div>
        )}
      </div>

      {/* Display search results dynamically */}
      <div>
        <h3>Search Results</h3>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {books.length > 0 ? (
              books.map((book, index) => (
                <div key={index}>
                  <h4>{book.volumeInfo.title}</h4>
                  <p><strong>Author(s):</strong> {book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "Unknown Author"}</p>
                  <p><strong>Publisher:</strong> {book.volumeInfo.publisher || "No Publisher Information"}</p>
                  <p><strong>Published Date:</strong> {book.volumeInfo.publishedDate || "No Date Available"}</p>
                  <p><strong>Page Count:</strong> {book.volumeInfo.pageCount || "Not Available"}</p>
                  <p>{book.volumeInfo.description || "No description available"}</p>
                  {book.volumeInfo.imageLinks && (
                    <img
                      src={book.volumeInfo.imageLinks.thumbnail}
                      alt={book.volumeInfo.title}
                      style={{ width: "100px", height: "150px" }}
                    />
                  )}
                  <div>
                    <a href={book.volumeInfo.infoLink} target="_blank" rel="noopener noreferrer">
                      More Info
                    </a>
                  </div>
                  {/* Display Price in INR if available */}
                  {book.saleInfo && book.saleInfo.retailPrice && book.saleInfo.retailPrice.amount ? (
                      <p><strong>Price:</strong> ₹{book.saleInfo.retailPrice.amount}</p>
                    ) : (
                      <p><strong>Price:</strong> Not Available</p>
                    )}
                </div>
              ))
            ) : (
              <p>No books found matching your search.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
