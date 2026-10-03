import { rotateRight, rotateLeft } from "./ui-icons.ts";

/**
 * DOM element for the grid where transformations are applied.
 * @type {HTMLDivElement}
 */
const transformGrid: HTMLDivElement = document.querySelector(".transformation-grid") as HTMLDivElement;

/**
 * DOM element representing the image being edited.
 * @type {HTMLImageElement}
 */
const imageField: HTMLImageElement = document.querySelector('.editing-image') as HTMLImageElement;

/**
 * DOM element for the image input element.
 * @type {HTMLInputElement}
 */
const imageInput: HTMLInputElement = document.getElementById('image-input') as HTMLInputElement;

/**
 * DOM element for the reset button.
 * @type {HTMLButtonElement}
 */
const resetFilter: HTMLButtonElement = document.querySelector('.reset-btn') as HTMLButtonElement;

/**
 * List of all range filter inputs.
 * @type {NodeListOf<HTMLInputElement>}
 */
const filters: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[type=range][data-name][data-unit]');

/**
 * DOM element for the horizontal flip icon.
 * @type {HTMLImageElement}
 */
const flipHorizontal: HTMLImageElement = document.querySelector('.flip-horizontal') as HTMLImageElement;

/**
 * DOM element for the vertical flip icon.
 * @type {HTMLImageElement}
 */
const flipVertical: HTMLImageElement = document.querySelector('.flip-vertical') as HTMLImageElement;

/**
 * DOM element for the download image button.
 * @type {HTMLButtonElement}
 */
const downloadImage: HTMLButtonElement = document.querySelector('.save-btn') as HTMLButtonElement;

/**
 * Creates rotate icons and appends them to the grid.
 * @param {Element} icon - The rotated icon element to be added.
 */
createRotateIcon(rotateLeft);
createRotateIcon(rotateRight);

const rightRotation: Element = document.querySelector('.rotate-right') as Element;
const leftRotation: Element = document.querySelector('.rotate-left') as Element;

/**
 * Interface representing the value and unit of a filter.
 * @interface
 */
interface FilterValue {
    value: string;
    unit: string;
}

/**
 * Interface for holding filter names and their corresponding values.
 * @interface
 */
interface FilterBank {
    [filterName: string]: FilterValue;
}

/**
 * Stores the initial state of filters.
 * @type {FilterBank}
 */
const initialFilterState: FilterBank = {};

/**
 * Current state of active filters.
 * @type {FilterBank}
 */
let filterBank: FilterBank = {};

/**
 * Rotation angle of the image.
 * @type {number}
 */
let rotation: number = 0;

/**
 * Scale a factor for the horizontal flip of the image.
 * @type {number}
 */
let scaleX: number = 1;

/**
 * Scale a factor for the vertical flip of the image.
 * @type {number}
 */
let scaleY: number = 1;

/**
 * Initializes the filter values when the window loads.
 */
window.onload = () => {
    for (const filter of filters) {
        const filterName: string = filter.dataset.name as string;
        const filterValue: string = filter.value;
        const filterUnit: string = filter.dataset.unit as string;

        initialFilterState[filterName] = {value: filterValue, unit: filterUnit};
    }
}

/**
 * Handles the image input change event to load an image.
 * @param {Event} event - The input change event.
 */
imageInput.addEventListener('change', (event) => {
    event.preventDefault();
    const file: File | undefined = imageInput.files?.[0];

    if (file) {
        imageField.src = URL.createObjectURL(file);
    }
})

/**
 * Applies filters to the image when any filter input changes.
 * @param {Event} event - The input event.
 */
filters.forEach((filter): void => {
    filter.addEventListener('input', (event) => {
        event.preventDefault();
        const filterName: string = filter.dataset.name as string;
        const filterValue: string = filter.value;
        const filterUnit: string = filter.dataset.unit as string;

        filterBank[filterName] = {
            value: filterValue,
            unit: filterUnit,
        }
        console.log(filterName, filterValue, filterUnit);
        applyFilter();
        console.log(filter.name);

        console.log(filter.value);
    })
})

/**
 * Applies the active filters to the image element.
 */
function applyFilter() {
    const filter = Object.entries(filterBank).map(([filterName, {
        value,
        unit
    }]) => `${filterName}(${value}${unit})`).join(' ');
    imageField.style.filter = filter;
    console.log(filter);
}

/**
 * Resets all filters and transformations on the image.
 */
resetFilter.addEventListener('click', () => {
    filterBank = {};
    imageField.style.filter = '';
    imageField.style.transform = '';
    for (const filter of filters) {
        const filterName = filter.dataset.name as string;
        const initial = initialFilterState[filterName];
        if (initial) {
            filter.value = initial.value;
        }
    }
})

/**
 * Creates and appends a rotated icon element to the transformation grid.
 * @param {Element} icon - The rotated icon to be added.
 */
function createRotateIcon(icon: Element): void {
    const iconWrapper = document.createElement('div');
    iconWrapper.classList.add('transform-wrapper');
    iconWrapper.appendChild(icon);
    transformGrid.appendChild(iconWrapper);
}

/**
 * Rotates the image 90 degrees to the right.
 */
rightRotation.addEventListener('click', () => {
    rotation += 90;
    applyTransform();
})

/**
 * Rotates the image 90 degrees to the left.
 */
leftRotation.addEventListener('click', () => {
    rotation -= 90;
    applyTransform();
})

/**
 * Flips the image horizontally.
 */
flipHorizontal.addEventListener('click', () => {
    scaleX *= -1;
    applyTransform();
})

/**
 * Flips the image vertically.
 */
flipVertical.addEventListener('click', () => {
    scaleY *= -1;
    applyTransform();
})

/**
 * Applies the current transformation (rotation and flip) to the image.
 */
function applyTransform(): void {
    imageField.style.transform = `rotate(${rotation}deg) scale(${scaleX}, ${scaleY})`;
}

/**
 * Downloads the edited image as a PNG file.
 */
downloadImage.addEventListener('click', () => {
    const canvas: HTMLCanvasElement = document.createElement('canvas') as HTMLCanvasElement;
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;

    const img: HTMLImageElement = imageField;
    const width: number = img.naturalWidth;
    const height: number = img.naturalHeight;

    const isRotated: boolean = Math.abs(rotation % 180) === 90;
    canvas.width = isRotated ? height : width;
    canvas.height = isRotated ? width : height;

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(scaleX, scaleY);
    ctx.filter = getComputedStyle(imageField).filter;
    ctx.drawImage(img, -width / 2, -height / 2, width, height);

    ctx.restore();

    const link = document.createElement('a');
    link.download = 'edited-image.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
})
