import mongoose, { Schema } from 'mongoose'

const categorySchema = new Schema({
  name: {
    type: String
  },
  key: {
    type: String
  },
  description: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

categorySchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      key: this.key,
      description: this.description,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Category', categorySchema)

export const schema = model.schema
export default model
