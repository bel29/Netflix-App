import React, { useState } from "react";

import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { db } from "../common/firebase";
import { UserAuth } from "../context/AuthContext";

function Favorite({ item }) {
  const [like, setLike] = useState(false);
  const [setSaved] = useState(false);
  const { user } = UserAuth();

  const movieID = doc(db, "users", `${user?.email}`);
  const saveShow = async () => {
    //  addToFavorite(item);
    if (user?.email) {
      setLike(!like);
      setSaved(true);

      await updateDoc(movieID, {
        savedShows: arrayUnion({
          id: item.id,
          title: item.title,
          img: item.backdrop_path,
        }),
      });
    } else {
      alert("Please log in to save a movie");
    }
  };
  return (
    <p onClick={saveShow}>
      {like ? (
        <FaHeart className="absolute top-4 left-4 text-gray-300" />
      ) : (
        <FaRegHeart className="absolute top-4 left-4 text-gray-300" />
      )}
    </p>
  );
}
// }

export default Favorite;
