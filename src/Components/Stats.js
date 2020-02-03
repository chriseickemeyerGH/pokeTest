import React from "react";

const Stats = ({ stats }) => (
  <>
    <h3>Base Stat Values</h3>
    {stats.map(item => (
      <p key={item.stat.name}>
        {item.stat.name.toUpperCase()}: {item.base_stat}
      </p>
    ))}
  </>
);

export default Stats;
