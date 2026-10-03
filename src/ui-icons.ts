import { library, icon } from '@fortawesome/fontawesome-svg-core';
import { faRotateRight, faRotateLeft } from '@fortawesome/free-solid-svg-icons';

library.add(
    faRotateLeft,
    faRotateRight,
)

export const rotateLeft = icon({prefix: "fas", iconName: 'rotate-left'}).node[0];
rotateLeft.classList.add('rotate-left');
export const rotateRight = icon({prefix: "fas", iconName: 'rotate-right'}).node[0];
rotateRight.classList.add('rotate-right');
