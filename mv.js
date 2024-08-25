const express = require("express");
const router = express.Router();

const Movie = require("../../db/schemas/movieSchema");

router.get("/.", async (req, res) => {
    const queryParams = req.query;
    const filters = {};
    if (queryParams.name) {
        filters.name = {
            $regex: `^{queryParams.name}`,
            $options:"i",
        };

    }
    if (queryParams.rating) {
        filters.rating = {
            $gte: parseFloat(queryParams.rating),
        };
    }
    const movies = await Movie.find(filters);
    res.json(movies);
});

router.get("/", async (req,res ) => {
    const movies = await Movie.find();
    res.json(movies);
});

router.post("/", async (req,res ) => {
    try{
    const moviesData = req.body;
    //const existingMovie = await Movie.exists({ name: moviesData.name });
    //if (existingMovie) {
    //  return res.status(400).json({ message: "Movie with this name already exists" });
    //}
    const newMovie = new Movie (moviesData);
    await newMovie.save();
    res.json({
        message :"Movie added successfully"
    });
}

catch (error)
{
    console.log(error);
    res.status(500).json({
        message : "Internal server error"
    });
}
})

router.put("/:id", async (req, res) => {
    try {
      const id = req.params.id ;
      const updates = req.body; 
      await Movie.findByIdAndUpdate(id, updates);
      res.json({ message: "Movie update successfully" });
      }
    catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

router.delete("/:id", async (req, res) => {
    try {
      const id = req.params.id; //path parameter
      await Movie.deleteOne({ _id: id });
      res.json({ message: "Movie deleted successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
    router.get("/:id", async (req, res) => {
    try {
        const movieid = req.params.id;
        console.log("Handling the get by id request");
        const movie = await Movie.findById(movieid);
        res.json(movie);
    } catch (error) {
        if (error.kind === "ObjectId") {
        res.status(404).json({ message: "Movie not found" });
        } else {
        res.status(500).json({ message: "Internal server error"});
    }
}
});

module.exports=router;

