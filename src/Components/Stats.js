import React from "react";

import Box from "./Box";

const Stats = ({ stats }) => (
  <Box setPadding="5px 20px">
    <h3>Base Stat Values</h3>
    {stats.map(item => (
      <p key={item.stat.name}>
        {item.stat.name.toUpperCase()}: {item.base_stat}
      </p>
    ))}
  </Box>
);

export default Stats;
