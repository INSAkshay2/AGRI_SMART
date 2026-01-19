# Environment Variables Setup Guide

## Required Environment Variables for .env file

Create a `.env` file in the `backend` directory with the following variables:

```env
# Server Configuration
PORT=8000

# MongoDB Configuration
# Format: mongodb://localhost:27017 or mongodb+srv://username:password@cluster.mongodb.net
# Note: The database name (cropdoctor) will be appended automatically
MONGODB_URI=mongodb://localhost:27017

# JWT Token Secrets
# Generate strong random strings for these (you can use: openssl rand -base64 32)
ACCESS_TOKEN_SECRET=your_access_token_secret_here
REFRESH_TOKEN_SECRET=your_refresh_token_secret_here

# JWT Token Expiry Times
# Format: Examples - "15m", "1h", "7d", "30d"
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=30d

# Cloudinary Configuration (for image uploads)
# Get these from your Cloudinary dashboard: https://cloudinary.com/console
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Gemini (LLM) API Key (used by /api/v1/ai/chat and image analysis)
# Get from Google AI Studio
GEMINI_API_KEY=your_gemini_api_key
```

## How to Generate JWT Secrets

You can generate secure random strings using one of these methods:

### Using OpenSSL (Recommended):
```bash
openssl rand -base64 32
```

### Using Node.js:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## MongoDB Connection String Examples

### Local MongoDB:
```
MONGODB_URI=mongodb://localhost:27017
```

### MongoDB Atlas (Cloud):
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net
```

**Note:** The database name `cropdoctor` will be automatically appended to your connection string.

## Important Notes

1. **Never commit your `.env` file to version control** - It contains sensitive information
2. Make sure your `.env` file is in the `backend` directory (same level as `package.json`)
3. The database connection will automatically use the database name from `constants.js` (currently: `cropdoctor`)
4. For production, use strong, unique secrets for JWT tokens
5. Adjust token expiry times based on your security requirements
