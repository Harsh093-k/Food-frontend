import React, { useState, useEffect } from "react";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import Card from "../Component/Card";

import { makeUnauthenticatedGETRequest } from "../utile/Server";

const Home = () => {
    const [search, setSearch] = useState();
    const [foodCat, setFoodCat] = useState([]);
    const [foodItems, setFoodItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadData = async () => {
        setLoading(true);
        try {
            const categories = await makeUnauthenticatedGETRequest("/food/category");
            const items = await makeUnauthenticatedGETRequest("/food/items");

            setFoodCat(categories);
            setFoodItems(items);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch data. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-danger">{error}</div>;
    }

    return (
        <>
            <Navbar />
            <div><div
                id="carouselExampleCaptions"
                className="carousel slide"
                data-bs-ride="carousel"
                style={{ objectFit: "contain" }}
            >
                {/* Carousel Indicators */}
                <div className="carousel-indicators">
                    <button
                        type="button"
                        data-bs-target="#carouselExampleCaptions"
                        data-bs-slide-to="0"
                        className="active"
                        aria-current="true"
                        aria-label="Slide 1"
                    ></button>
                    <button
                        type="button"
                        data-bs-target="#carouselExampleCaptions"
                        data-bs-slide-to="1"
                        aria-label="Slide 2"
                    ></button>
                    <button
                        type="button"
                        data-bs-target="#carouselExampleCaptions"
                        data-bs-slide-to="2"
                        aria-label="Slide 3"
                    ></button>
                </div>

                {/* Search Form */}
                <div
                    className="justify-content-center"
                    style={{
                        position: "absolute",
                        zIndex: 10,
                        top: "10px",
                        left: "50%",
                        transform: "translateX(-50%)",
                    }}
                >
                    <input
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)} // Update state as user types
                        style={{
                            padding: "8px",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                            width: "300px",
                        }}
                    />
                    {/* Optional: Add a search button if needed */}
                    {/* <button className="btn btn-outline-success text-white" type="submit">
        Search
    </button> */}
                </div>


                {/* Carousel Items */}
                <div className="carousel-inner" style={{ maxHeight: '500px' }}>
                    <div className="carousel-item active">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRknofa_9Vpomis8CZcooxiIe6afdQnVB6HXw&s"
                            className="d-inline w-100"
                            style={{ filter: "brightness(30%)" }}
                            alt="Slide 1"
                        />
                        <div className="carousel-caption d-none d-md-block"></div>
                    </div>
                    <div className="carousel-item">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7Z7uvK5fm2fOdR3mVMRxuru203fHSP7-xJQ&s"
                            className="d-inline w-100"
                            style={{ filter: "brightness(30%)" }}
                            alt="Slide 2"
                        />
                        <div className="carousel-caption d-none d-md-block"></div>
                    </div>
                    <div className="carousel-item">
                        <img
                            src="https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?cs=srgb&dl=pexels-marvin-ozz-1297854-2474661.jpg&fm=jpg"
                            className="d-inline w-100"
                            style={{ filter: "brightness(30%)" }}
                            alt="Slide 3"
                        />
                        <div className="carousel-caption d-none d-md-block"></div>
                    </div>
                </div>

                {/* Carousel Controls */}
                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide="prev"
                >
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide="next"
                >
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div></div>
            <div className="m-3">
                {foodCat.length > 0 ? (
                    foodCat.map((category) => (
                        <div className="row mb-3" key={category._id}>
                            <div className="fs-3 m-3">{category.CategoryName}</div>
                            <hr />
                            {foodItems
                                .filter((item) =>
                                    item.CategoryName === category.CategoryName &&
                                    (search ? item.name.toLowerCase().includes(search.toLowerCase()) : true)
                                )
                                .map((filteredItem) => (
                                    <div key={filteredItem._id} className="col-12 col-md-6 col-lg-3">
                                        <Card
                                            foodItems={filteredItem}
                                           options={filteredItem.options[0]}
                                        />
                                    </div>
                                ))}
                        </div>
                    ))
                ) : (
                    <div className="text-muted">No categories available.</div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default Home;


