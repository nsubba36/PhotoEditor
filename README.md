# Image Editor

This is an interactive image editor that allows users to upload an image, apply various transformations (such as rotation and flip), adjust filters, and download the edited image. The project uses TypeScript and manipulates the DOM to provide a smooth user experience.

## Features

- **Image Upload**: Users can upload an image from their local device.
- **Rotation**: Rotate the image by 90 degrees either to the left or right.
- **Flip**: Flip the image horizontally or vertically.
- **Filters**: Apply various filters like brightness, contrast, blur, and more to adjust the image.
- **Reset**: Reset all transformations and filters to their initial state.
- **Download**: Download the edited image in PNG format.

## Technologies Used

- **TypeScript**: The project is built using TypeScript for static typing and better development practices.
- **HTML/CSS**: The front-end uses HTML and CSS to structure and style the editor interface.

## Usage

1. **Upload Image**: Use the image input field to select an image from your device.
2. **Apply Filters**: Use the range sliders to apply filters like brightness, contrast, and more.
3. **Transformations**:
    - **Rotate**: Click the rotate icons to rotate the image 90 degrees to the left or right.
    - **Flip**: Use the flip buttons to flip the image horizontally or vertically.
4. **Download Image**: Click the download button to save the edited image as a PNG file.

## Code Overview

### Key DOM Elements:

- `transformGrid`: The grid where transformations (rotate, flip) are applied.
- `imageField`: The image element being edited.
- `imageInput`: The file input element for uploading images.
- `resetFilter`: The button to reset all transformations and filters.
- `filters`: A collection of range inputs that control the image filters.
- `flipHorizontal`: The icon to flip the image horizontally.
- `flipVertical`: The icon to flip the image vertically.
- `downloadImage`: The button to download the edited image.

### Key Functions:

- **applyFilter()**: Applies the active filters to the image based on the values from the filter range inputs.
- **applyTransform()**: Applies the current transformations (rotation and flip) to the image.
- **createRotateIcon()**: Adds rotation icons to the transformation grid.
- **downloadEditedImage()**: Downloads the edited image as a PNG file with applied transformations and filters.
