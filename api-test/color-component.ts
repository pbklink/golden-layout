import { ComponentContainer } from '../dist/golden-layout';

export class ColorComponent {
    static readonly typeName = 'color';

    constructor(container: ComponentContainer, state: unknown) {
        const paraElement = document.createElement("p");
        paraElement.style.textAlign = "left";
        paraElement.style.color = 'red';
        const title = container.config.title;
        paraElement.innerText = (title ?? "unknown") + " component";
        container.contentElement.appendChild(paraElement);
    }
}
