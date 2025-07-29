# URL Management System

This project implements a MongoDB database model to store URLs and their descriptions, with tag functionality and validations.

## 🚀 Features

- **URL Storage**: Saves URLs with descriptions, titles and tags
- **URL Validation**: Checks if URL is valid and adds protocol if necessary
- **Tag System**: Organizes URLs by categories
- **Optimized Indexes**: Improved performance for queries
- **Automatic Timestamps**: Records creation and update dates

## 📋 Model Structure

### Required Fields
- `url`: String (required) - The URL to be stored
- `description`: String (required) - URL description (max 500 characters)

### Optional Fields
- `title`: String (optional) - URL title (max 100 characters)
- `tags`: Array of Strings (optional) - Tags for categorization

### Automatic Fields
- `createdAt`: Date - Creation date
- `updatedAt`: Date - Last update date

## 🛠️ Installation

1. **Install dependencies:**
   ```bash
   yarn install
   ```

2. **Configure MongoDB:**
   - Make sure MongoDB is running locally
   - Or configure the `MONGODB_URI` environment variable

3. **Run the project:**
   ```bash
   yarn start
   ```

## 📊 Usage Example

```typescript
import { Url } from './src/models/Url';

// Create a new URL
const novaUrl = new Url({
  url: 'https://www.google.com',
  description: 'Most popular search engine in the world',
  title: 'Google',
  tags: ['search', 'technology']
});

await novaUrl.save();

// Find URLs by tag
const urlsDesenvolvimento = await Url.find({ tags: 'development' });

// Add tag to existing URL
await novaUrl.addTag('browser');
```

## 🎯 Use Cases

The project includes organized use cases in the `src/usecases/` directory:

### Basic Examples (`yarn basic`)
- Create URLs with validation
- Find URLs by different criteria
- Add tags to existing URLs
- Basic CRUD operations

### Advanced Examples (`yarn advanced`)
- Complex queries with multiple tags
- Date-based filtering
- Database statistics
- URL updates and tag management
- Text search in descriptions

### LeetCode Examples (`src/usecases/leetcodeExamples.ts`)
- 25 main LeetCode problems organized by categories
- Arrays & Strings, Linked Lists, Trees, Dynamic Programming
- Graphs, Heaps, Binary Search, Sliding Window
- Backtracking, Greedy, Math, String Manipulation
- Sorting, Hash Tables, Stacks & Queues, Recursion
- Bit Manipulation, Design Patterns, Advanced Algorithms

## 🔍 Available Queries

### Find all URLs
```typescript
const todasUrls = await Url.find().sort({ createdAt: -1 });
```

### Find by tag
```typescript
const urlsPorTag = await Url.find({ tags: 'development' });
```

### Find specific URL
```typescript
const urlEspecifica = await Url.findOne({ url: 'https://www.google.com' });
```

### Use custom static method
```typescript
const urlsPorTag = await Url.findByTag('technology');
```

## ⚙️ Configuration

### Environment Variables
- `MONGODB_URI`: MongoDB connection URI (default: `mongodb://localhost:27017/urls_db`)

### Database Settings
- **Database**: `urls_db`
- **Collection**: `urls`
- **Indexes**: 
  - URL (unique)
  - Tags
  - Creation date (descending)

## 🧪 Validations

- **URL**: Must start with `http://` or `https://`
- **Description**: Maximum 500 characters
- **Title**: Maximum 100 characters
- **Tags**: Automatically converted to lowercase

## 📁 Project Structure

```
src/
├── config/
│   └── database.ts    # MongoDB configuration
├── models/
│   └── Url.ts         # URL model
├── usecases/
│   ├── index.ts       # Use cases exports
│   ├── basicExamples.ts    # Basic URL operations
│   ├── advancedExamples.ts # Advanced URL operations
│   └── leetcodeExamples.ts # 25 main LeetCode problems
└── index.ts           # Main entry point
```

## 🚀 Available Scripts

- `yarn start`: Runs the project with basic examples
- `yarn basic`: Runs basic URL operations examples
- `yarn advanced`: Runs advanced URL operations examples
- `yarn examples`: Runs advanced examples (alias for advanced)
- `yarn all`: Runs all examples sequentially
- `yarn leetcode`: Runs LeetCode examples demonstration
- `yarn build`: Compiles TypeScript
- `yarn install`: Installs dependencies

## 📝 License

MIT - João Thomazinho 