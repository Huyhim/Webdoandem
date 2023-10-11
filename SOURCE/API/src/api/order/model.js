import mongoose, { Schema } from "mongoose";
import mongooseKeywords from "mongoose-keywords-vi";

const orderSchema = new Schema(
  {
    name: {
      type: String
    },
    description: {
      type: String
    },
    statusOrder: [Object],
    statusShip: [Object],
    message: {
      type: String
    },
    products: [Object],
    idUser: {
      type: String
    },
    user: Object
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (obj, ret) => {
        delete ret._id;
      }
    }
  }
);

orderSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      description: this.description,
      statusOrder: this.statusOrder,
      statusShip: this.statusShip,
      message: this.message,
      products: this.products,
      idUser: this.idUser,
      user: this.user,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };

    return full
      ? {
          ...view
          // add properties for a full view
        }
      : view;
  }
};

orderSchema.plugin(mongooseKeywords, {
  paths: ["idUser"]
});

const model = mongoose.model("Order", orderSchema);

export const schema = model.schema;
export default model;
