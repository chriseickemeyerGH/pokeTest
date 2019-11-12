import React from "react";

const HeightAndWeight = ({
  heightFt,
  heightIn,
  heightM,
  weightLb,
  weightKg
}) => (
  <>
    <p>
      Height: {heightFt}'{heightIn}" (ft) | {heightM} (m)
    </p>
    <p>
      Weight: {weightLb} (lb) | {weightKg} (kg)
    </p>
  </>
);
export default HeightAndWeight;
