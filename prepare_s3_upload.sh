#!/usr/bin/env bash

# Exit on errors
set -e

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

echo "Done! Your AWS-ready site is in: $DEST_DIR"