const express = require("express");
const router = express.Router();
const _ = require("lodash");
const client = require("../db");

function formateInISO(givenDate) {
  return new Date(givenDate).toISOString().split(".")[0] + "Z";
}

function formateToStartMidnight(currentDate, givenDate) {
  return new Date(currentDate.setDate(givenDate)).setUTCHours(0, 0, 0, 0);
}

// Generate and fetch rewards
// /users/1/rewards

router.get("/:user_id/rewards", async (req, res) => {
  try {
    //   get given user id and date
    let userId = req.params.user_id;
    let givenDate = req.query.at;
    // data validation
    if (!userId) {
      return res.status(404).send("No user id found");
    }
    if (isNaN(Date.parse(givenDate))) {
      return res.status(404).send("Not a valid date");
    }
    //   The getDate() method returns the day of the month
    //   The getDay() method returns the day of the week
    let curr = new Date(givenDate);
    let first = curr.getDate() - curr.getDay();
    let second = first + 1;
    let third = first + 2;
    let fourth = first + 3;
    let fifth = first + 4;
    let sixth = first + 5;
    let seven = first + 6;
    let eight = first + 7;
    //   formate the dates to start at midnight
    let firstDay = formateToStartMidnight(curr, first);
    let secondDay = formateToStartMidnight(curr, second);
    let thirdDay = formateToStartMidnight(curr, third);
    let fourthDay = formateToStartMidnight(curr, fourth);
    let fifthDay = formateToStartMidnight(curr, fifth);
    let sixthDay = formateToStartMidnight(curr, sixth);
    let seventhDay = formateToStartMidnight(curr, seven);
    let eighthDay = formateToStartMidnight(curr, eight);
    const allDays = [
      firstDay,
      secondDay,
      thirdDay,
      fourthDay,
      fifthDay,
      sixthDay,
      seventhDay,
      eighthDay,
    ];
    let week = {
      data: [],
    };
    for (let i = 0; i < allDays.length - 1; i++) {
      const availableAt = formateInISO(allDays[i]);
      const expiresAt = formateInISO(allDays[i + 1]);
      week.data.push({
        availableAt,
        redeemedAt: null,
        expiresAt,
      });
    }
    // save data
    await client.set(userId, JSON.stringify(week));
    return res.send(week);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

// redeem rewards
router.patch("/:user_id/rewards/:given_date/redeem", async (req, res) => {
  try {
    //   get given user id and date
    let userId = req.params.user_id;
    let givenDate = req.params.given_date;
    // data validation
    if (!userId) {
      return res.status(400).send("No user id found");
    }
    if (isNaN(Date.parse(givenDate))) {
      return res.status(400).send("Not a valid date");
    }
    // get the user  data
    let value = await client.get(userId);
    if (value) {
      let { data } = JSON.parse(value);
      // find the user date
      let reward = _.find(data, function (item) {
        if (item.availableAt === givenDate) {
          return item;
        }
      });
      if (reward) {
        let t1 = Date.now();
        let t2 = Date.parse(reward.expiresAt);
        // compare in millseconds
        if (t2 - t1 > 0) {
          reward.redeemedAt = new Date().toString();
          return res.send(reward);
        }
        return res
          .status(400)
          .send({ error: { message: "This reward is already expired" } });
      }
      return res
        .status(400)
        .send({ error: { message: "This reward is already expired" } });
    }
    return res.status(404).send({
      message: "user data not found",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

module.exports = router;
