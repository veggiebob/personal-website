#!/usr/bin/env bash

# Exit on errors
set -e

# Configuration - Update these variables for your setup
S3_BUCKET="veggiebob-bucket2"  # Replace with your actual S3 bucket name
CLOUDFRONT_DISTRIBUTION_ID="E3M528J29H3ISU"  # Optional: Replace with your CloudFront distribution ID for cache invalidation

echo "Building the static site..."
npm run build

# Paths
SOURCE_DIR="./static-personal-website"
DEST_DIR="$HOME/Downloads/static-personal-website-aws"

echo "Preparing static site for AWS upload..."

# 1. Remove existing destination folder if it exists
if [ -d "$DEST_DIR" ]; then
    echo "Removing old $DEST_DIR..."
    rm -rf "$DEST_DIR"
fi

# 2. Copy build folder to Downloads
echo "Copying $SOURCE_DIR to $DEST_DIR..."
cp -R "$SOURCE_DIR" "$DEST_DIR"

# 3. Remove all .map files
echo "Removing all .map files..."
find "$DEST_DIR" -type f -name "*.map" -delete

# 4. Remove all LICENSE files
echo "Removing LICENSE files..."
find "$DEST_DIR" -type f -name "LICENSE" -delete

# 5. Remove .git folder if present
if [ -d "$DEST_DIR/.git" ]; then
    echo "Removing .git folder..."
    rm -rf "$DEST_DIR/.git"
fi

echo "Preparation complete! AWS-ready site is in: $DEST_DIR"

# 6. Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "Error: AWS CLI is not installed. Please install it first:"
    echo "https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html"
    exit 1
fi

# 7. Check if user is logged in to AWS
echo "Checking AWS credentials..."
if ! aws sts get-caller-identity &> /dev/null; then
    echo "Error: AWS credentials not configured or expired."
    echo "Please run 'aws configure' or 'aws sso login' first."
    exit 1
fi

echo "AWS credentials verified ✓"

# 8. Upload to S3 bucket
echo "Uploading to S3 bucket: s3://$S3_BUCKET"
aws s3 sync "$DEST_DIR" "s3://$S3_BUCKET" \
    --delete \
    --cache-control "public, max-age=31536000" \
    --exclude "*.html" \
    --exclude "*.json"

# Upload HTML and JSON files with shorter cache control
echo "Uploading HTML and JSON files with shorter cache..."
aws s3 sync "$DEST_DIR" "s3://$S3_BUCKET" \
    --cache-control "public, max-age=300" \
    --include "*.html" \
    --include "*.json"

echo "Upload to S3 complete ✓"

# 9. Invalidate CloudFront cache (optional)
if [ -n "$CLOUDFRONT_DISTRIBUTION_ID" ]; then
    echo "Invalidating CloudFront cache..."
    aws cloudfront create-invalidation \
        --distribution-id "$CLOUDFRONT_DISTRIBUTION_ID" \
        --paths "/*"
    echo "CloudFront invalidation initiated ✓"
fi

echo "🚀 Deployment complete!"
echo "Your website has been uploaded to: s3://$S3_BUCKET"