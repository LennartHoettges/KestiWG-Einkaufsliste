#!/bin/bash

# Simple script to create placeholder icons using base64 encoded PNG data
# This creates minimal 1x1 colored pixels that will be scaled by the browser

cd "$(dirname "$0")"

# Green color in hex: #4CAF50
# This is a minimal PNG file (1x1 green pixel) in base64

SIZES=(72 96 128 144 152 192 384 512)

echo "Creating placeholder PWA icons..."

for size in "${SIZES[@]}"; do
  # Create a simple HTML file that can be used to download the icon
  filename="icon-${size}x${size}.png"
  
  # Using ImageMagick if available, otherwise create a note
  if command -v convert &> /dev/null; then
    convert -size ${size}x${size} xc:#4CAF50 -fill white -draw "circle $((size/2)),$((size/2)) $((size/2)),$((size/4))" "$filename"
    echo "✓ Created $filename"
  else
    echo "⚠ ImageMagick not found. Please create $filename manually (${size}x${size} px)"
  fi
done

echo ""
echo "Icon generation complete!"
echo "Note: These are placeholder icons. For production, create proper icons with a design tool."
echo "See README.md in this directory for more information."
