const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  {
    timestamps: true
  }
)

courseSchema.set('toJSON', { virtuals: true, versionKey: false })
courseSchema.set('toObject', { virtuals: true, versionKey: false })

module.exports = mongoose.model('Courses', courseSchema)
