import mongoose, { Document, Schema } from 'mongoose';

// Interface for URL document
export interface IUrl extends Document {
  url: string;
  description: string;
  title?: string;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
  addTag(tag: string): Promise<IUrl>;
}

// URL model schema
const urlSchema = new Schema<IUrl>({
  url: {
    type: String,
    required: [true, 'URL is required'],
    trim: true,
    validate: {
      validator: function(v: string) {
        return /^https?:\/\/.+/.test(v);
      },
      message: 'URL must start with http:// or https://'
    }
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [500, 'Description cannot have more than 500 characters']
  },
  title: {
    type: String,
    trim: true,
    maxlength: [100, 'Title cannot have more than 100 characters']
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }]
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt
  collection: 'urls' // Collection name in MongoDB
});

// Indexes for better performance
urlSchema.index({ url: 1 }, { unique: true });
urlSchema.index({ tags: 1 });
urlSchema.index({ createdAt: -1 });

// Static method to find URLs by tag
urlSchema.statics.findByTag = function(tag: string) {
  return this.find({ tags: tag.toLowerCase() });
};

// Instance method to add tag
urlSchema.methods.addTag = function(tag: string) {
  if (!this.tags.includes(tag.toLowerCase())) {
    this.tags.push(tag.toLowerCase());
  }
  return this.save();
};

// Middleware to validate URL before saving
urlSchema.pre('save', function(next) {
  if (this.isModified('url')) {
    // Remove whitespace and normalize URL
    this.url = this.url.trim();
    if (!this.url.startsWith('http://') && !this.url.startsWith('https://')) {
      this.url = 'https://' + this.url;
    }
  }
  next();
});

// Export the model
export const Url = mongoose.model<IUrl>('Url', urlSchema);

export default Url; 