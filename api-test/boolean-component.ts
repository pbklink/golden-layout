import { ComponentContainer } from '../dist/golden-layout';

export class BooleanComponent {
    static readonly typeName = 'boolean';

    constructor(container: ComponentContainer, state: unknown) {
        const element = document.createElement('input');
        element.type = "checkbox";
        element.checked = true;
        container.contentElement.appendChild(element);
    }
}