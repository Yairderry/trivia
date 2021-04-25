import React from "react";
import Star from "./Star";

export default function Rating() {
  return (
    <div>
      <p>Did you like this question?</p>
      <div>
        {[1, 2, 3, 4, 5].map((rating, i) => (
          <Star key={i} rating={rating} />
        ))}
      </div>
      <p>Rating questions helps us improve the user experience!</p>
      <button>Skip to the next question</button>
    </div>
  );
}
