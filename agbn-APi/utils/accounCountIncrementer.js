const sequelize = require("sequelize");
const { AccountCount } = require("../models");

const accounCountIncrementer = async () => {
  let m = "";
  try {
    const response = await AccountCount.findByPk(1);
    // @ts-ignore
    if (response !== null && response.count < 3) {
      // @ts-ignore
      const count = response?.count + 1;
      await AccountCount.update(
        { count },
        {
          where: { id: 1 },
        }
      );
      return (m = "incremented");
    } else if (response === null) {
      await AccountCount.create({
        count: 1,
      });
      return (m = "created");
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = accounCountIncrementer;
