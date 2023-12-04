import React from "react";
import ContentLoader from "react-content-loader";

export default function PizzaSkeletonCard() {
  return (
    <ContentLoader
      speed={0}
      width={280}
      height={490}
      viewBox="0 0 280 490"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <circle cx="140" cy="140" r="120" />
      <rect x="0" y="272" rx="8" ry="8" width="280" height="29" />
      <rect x="0" y="309" rx="8" ry="8" width="280" height="88" />
      <rect x="1" y="430" rx="8" ry="8" width="95" height="30" />
      <rect x="130" y="430" rx="24" ry="24" width="150" height="45" />
    </ContentLoader>
  );
}
