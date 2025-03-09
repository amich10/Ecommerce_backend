import { DataTypes } from "sequelize";
import sequelize from "../../config/sequelize.config.js";
const BannerModel = sequelize.define("Banner", {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.ENUM,
    values: ["active", "inactive"],
    defaultValue: "inactive",
  },
  image: {
    type: DataTypes.JSONB,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

export default BannerModel;
