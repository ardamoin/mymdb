const db = require("../db");

exports.get_favorites = (req, res) => {
  const { user_id } = req.body;

  db.query(
    "SELECT media_id, media_type FROM favorites WHERE user_id = ?",
    [user_id],
    async (error, result) => {
      console.log(result);
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" }); // Handle the database error
      }

      if (result.length === 0) {
        return res.status(200).json({ message: "No favorite media found" });
      }

      return res
        .status(200)
        .json({ message: "Favorites found!", favorites: result });
    }
  );
};

exports.add_favorite = (req, res) => {
  const { user_id, media_id, media_type } = req.body;

  db.query(
    "INSERT INTO favorites (user_id, media_id, media_type) VALUES (?, ?, ?)",
    [user_id, media_id, media_type],
    async (error, result) => {
      console.log(result);
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" }); // Handle the database error
      }

      return res.status(200).json({ message: "Added to favorites" });
    }
  );
};

exports.remove_favorite = (req, res) => {
  const { user_id, media_id, media_type } = req.body;
  console.log(req.body);

  db.query(
    "DELETE FROM favorites WHERE user_id = ? AND media_id = ? AND media_type = ?",
    [user_id, media_id, media_type],
    async (error, result) => {
      console.log(result);
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" }); // Handle the database error
      }

      if(result.affectedRows === 0) {
        console.log(error);
        return res.status(400).json({ message: "Media is not a favorite" });
      }

      return res
        .status(200)
        .json({ message: `Media deleted`, media_type, media_id });
    }
  );
};
