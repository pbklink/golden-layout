import { Config, GoldenLayout, UserSerialisableComponentConfig } from "../dist/golden-layout";
import { BooleanComponent } from './boolean-component';
import { ColorComponent } from './color-component';
import { prefinedLayouts } from './predefined-layouts';
import { TextComponent } from './text-component';

export class App {
    private _goldenLayout: GoldenLayout;
    private _registerExtraComponentTypesButton;
    private _registerExtraComponentTypesButtonClickListener = () => this.handleRegisterExtraComponentTypesButtonClick();
    private _registeredComponentNamesSelect: HTMLSelectElement;
    private _registeredComponentNamesSelectChangeListener = () => this.handleRegisteredComponentNamesSelectChange();
    private _addComponentButton: HTMLButtonElement;
    private _addComponentButtonClickListener = () => this.handleAddComponentButtonClick();
    private _layoutSelect: HTMLSelectElement;
    private _layoutSelectChangeListener = () => this.handleLayoutSelectChange();
    private _loadLayoutButton: HTMLButtonElement;
    private _loadLayoutButtonClickListener = () => this.handleLoadLayoutButtonClick();
    private _saveLayout: HTMLButtonElement;
    private _saveLayoutClickListener = () => this.handleSaveLayoutClick();
    private _reloadSavedLayout: HTMLButtonElement;
    private _reloadSavedLayoutClickListener = () => this.handleReloadSavedLayoutClick();
 
    private _allComponentsRegistered = false;
    private _savedConfig: Config | undefined;

    constructor() {
        const initialConfig = prefinedLayouts.colorComponentCompatible[0].config;
        const layoutElement = document.querySelector('#layoutContainer') as HTMLElement;
        if (layoutElement === null) {
            throw new Error('layoutContainerElement not found');
        }
        this._goldenLayout = new GoldenLayout(initialConfig, layoutElement);
        this._goldenLayout.registerComponentConstructor(ColorComponent.typeName, ColorComponent);

        const registerExtraComponentTypesButton = document.querySelector('#registerExtraComponentTypesButton') as HTMLButtonElement;
        if (registerExtraComponentTypesButton === null) {
            throw Error('Could not find RegisterExtraComponentTypesButton');
        }
        this._registerExtraComponentTypesButton = registerExtraComponentTypesButton;
        this._registerExtraComponentTypesButton.addEventListener('click', this._registerExtraComponentTypesButtonClickListener);

        const registeredComponentNamesSelect = document.querySelector('#registeredComponentTypesSelect') as HTMLSelectElement;
        if (registeredComponentNamesSelect === null) {
            throw new Error()
        }
        this._registeredComponentNamesSelect = registeredComponentNamesSelect;
        this._registeredComponentNamesSelect.addEventListener('change', this._registeredComponentNamesSelectChangeListener);

        const addComponentButton = document.querySelector('#addComponentButton') as HTMLButtonElement;
        if (addComponentButton === null) {
            throw Error('Could not find addComponentButton');
        }
        this._addComponentButton = addComponentButton;
        this._addComponentButton.addEventListener('click', this._addComponentButtonClickListener);

        const layoutSelect = document.querySelector('#layoutSelect') as HTMLSelectElement;
        if (layoutSelect === null) {
            throw new Error()
        }
        this._layoutSelect = layoutSelect;
        this._layoutSelect.addEventListener('change', this._layoutSelectChangeListener);

        const loadLayoutButton = document.querySelector('#loadLayoutButton') as HTMLButtonElement;
        if (loadLayoutButton === null) {
            throw Error('Could not find loadLayoutButton');
        }
        this._loadLayoutButton = loadLayoutButton;
        this._loadLayoutButton.addEventListener('click', this._loadLayoutButtonClickListener);

        const saveLayout = document.querySelector('#saveLayout') as HTMLButtonElement;
        if (saveLayout === null) {
            throw Error('Could not find saveLayout');
        }
        this._saveLayout = saveLayout;
        this._saveLayout.addEventListener('click', this._saveLayoutClickListener);

        const reloadSavedLayout = document.querySelector('#reloadSavedLayout') as HTMLButtonElement;
        if (reloadSavedLayout === null) {
            throw Error('Could not find reloadSavedLayout');
        }
        this._reloadSavedLayout = reloadSavedLayout;
        this._reloadSavedLayout.disabled = true;
        this._reloadSavedLayout.addEventListener('click', this._reloadSavedLayoutClickListener);
    }

    start(): void {
        this._goldenLayout.init();

        this.loadRegisteredComponentNamesSelect();
        this.loadLayoutSelect();
    }

    private handleRegisterExtraComponentTypesButtonClick() {
        this._goldenLayout.registerComponentConstructor(TextComponent.typeName, TextComponent);
        this._goldenLayout.registerComponentConstructor(BooleanComponent.typeName, BooleanComponent);
        this._allComponentsRegistered = true;
        this.loadRegisteredComponentNamesSelect();
        this.loadLayoutSelect();
        this._registerExtraComponentTypesButton.disabled = true;
    }

    private handleRegisteredComponentNamesSelectChange() {
        // nothing to do here
    }

    private handleAddComponentButtonClick() {
        const componentName = this._registeredComponentNamesSelect.value;
        const userItemConfig: UserSerialisableComponentConfig = {
            componentName,
            type: 'component',
        }
        this._goldenLayout.root?.addChildFromItemConfig(userItemConfig)
    }

    private handleLayoutSelectChange() {
        //
    }

    private handleLoadLayoutButtonClick() {
        // should we destroy existing layout?
    }

    private handleSaveLayoutClick() {
        this._savedConfig = this._goldenLayout.toConfig();
        this._reloadSavedLayout.disabled = false;
    }

    private handleReloadSavedLayoutClick() {
        if (this._savedConfig === undefined) {
            throw new Error('No saved config');
        } else {
            // should we destroy existing layout?
        }
    }

    private loadRegisteredComponentNamesSelect() {
        this._registeredComponentNamesSelect.options.length = 0;
        const names = this._goldenLayout.getRegisteredComponentTypeNames();
        for (const name of names) {
            const option = new Option(name);
            this._registeredComponentNamesSelect.options.add(option);
        }
    }

    private loadLayoutSelect() {
        this._layoutSelect.options.length = 0;
        const layouts = this._allComponentsRegistered ? prefinedLayouts.colorComponentCompatible : prefinedLayouts.colorComponentCompatible;
        for (const layout of layouts) {
            const option = new Option(layout.name);
            this._layoutSelect.options.add(option);
        }
    }
}
