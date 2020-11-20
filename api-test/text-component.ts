import { ComponentContainer } from '../dist/golden-layout';

export class TextComponent {
    static readonly typeName = 'text';

    constructor(container: ComponentContainer, state: unknown) {
        const element = document.createElement('input');
        element.type = "text";
        element.value = 'xyz';
        container.contentElement.appendChild(element);
    }
}