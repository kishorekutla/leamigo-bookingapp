

const express = require("express");
const cors = require("cors");
const app = express();
const port = 3004;

const dummyData=[{
    id: 1,
    name: "Air Indigo",
    price: 9050,
    availableDates: ["2023-07-23", "2023-07-24", "2023-07-25"],
    startingPoint: "Hyderabad",
    endingPoint: "Mumbai",
  },
  {
    id: 2,
    name: "Deccan",
    price: 4580,
    availableDates: ["2023-07-23", "2023-07-25", "2023-07-26"],
    startingPoint: "Hyderabad",
    endingPoint: "Chennai",
  },
  {
    id: 3,
    name: "Tata", 
    price: 5550,
    availableDates: ["2023-07-25", "2023-07-26", "2023-07-27"],
    startingPoint: "Delhi",
    endingPoint: "Hyderabad",
  },
];

app.use(cors());

app.get("/api/flights", (req, res) => {
  const { start, end, date } = req.query;
  console.log(date)
  const filteredVehicles = dummyData.filter(
    (vehicle) =>
      vehicle.availableDates.includes(date) &&
      vehicle.startingPoint.toLowerCase().includes(start.toLowerCase()) &&
      vehicle.endingPoint.toLowerCase().includes(end.toLowerCase())
  );
  res.send(filteredVehicles);
  console.log(filteredVehicles)
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
