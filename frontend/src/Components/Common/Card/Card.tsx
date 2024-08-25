// src/components/Card.js
import React from "react";
import PrimaryButton from "../Button/Button";
import moment from "moment";

interface CardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  buttonText: string;
  onButtonClick: any;
  gender: string;
}

const Card = ({
  imageSrc,
  imageAlt,
  title,
  description,
  buttonText,
  onButtonClick,
  gender,
}: CardProps) => {
  return (
    <div
      className="max-w-sm rounded overflow-hidden shadow-lg bg-white dark:bg-gray-700 dark:text-gray-100"
      role="region"
      aria-labelledby={`card-title-${title}`}
    >
      <img className="w-full h-48 object-cover" src={imageSrc} alt={imageAlt} />
      <div className="px-6 py-4">
        <h2 id={`card-title-${title}`} className="text-xl font-bold mb-2">
          {title}
        </h2>
        <p className="text-gray-700 dark:text-gray-400 text-base flex justify-between">
          <strong>Created At: </strong>
          {moment(description).format("DD MMM YYYY")}
        </p>
        <p className="text-gray-700 dark:text-gray-400 text-base flex justify-between">
          <strong>Gender: </strong>
          {gender.toUpperCase()}
        </p>
      </div>
      {buttonText && onButtonClick && (
        <div className="px-6 py-4">
          <PrimaryButton
            type="button"
            label="View More"
            onClick={onButtonClick}
          />
        </div>
      )}
    </div>
  );
};

export default Card;
