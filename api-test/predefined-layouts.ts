import { ItemConfig, UserConfig, UserSerialisableComponentConfig } from '../dist/golden-layout';
import { ColorComponent } from './color-component';

export interface Layout {
    name: string;
    config: UserConfig;
}

const miniConfig: UserConfig = {
    content: [
        {
            type: ItemConfig.Type.row,
            content: [
                {
                    type: "component",
                    title: "Golden",
                    header: {
                        show: "top",
                    },
                    isClosable: false,
                    componentName: ColorComponent.typeName,
                    width: 30,
                    componentState: { bg: "golden_layout_spiral.png" },
                } as UserSerialisableComponentConfig,
                {
                    title: "Layout",
                    header: { show: "top", popout: false },
                    type: "component",
                    componentName: ColorComponent.typeName,
                    componentState: { bg: "golden_layout_text.png" },
                } as UserSerialisableComponentConfig,
            ],
        },
    ],
};

const miniLayout: Layout = {
    name: 'mini',
    config: miniConfig,
};

const standardConfig: UserConfig = {
    content: [
        {
            type: "row",
            content: [
                {
                    width: 80,
                    type: "column",
                    content: [
                        {
                            title: "Fnts 100",
                            header: { show: "bottom" },
                            type: "component",
                            componentName: ColorComponent.typeName,
                        },
                        {
                            type: "row",
                            content: [
                                {
                                    type: "component",
                                    title: "Golden",
                                    header: { show: "right" },
                                    isClosable: false,
                                    componentName: ColorComponent.typeName,
                                    width: 30,
                                    componentState: {
                                        bg: "golden_layout_spiral.png",
                                    },
                                } as UserSerialisableComponentConfig,
                                {
                                    title: "Layout",
                                    header: {
                                        show: "left",
                                        popout: false,
                                    },
                                    type: "component",
                                    componentName: ColorComponent.typeName,
                                    componentState: {
                                        bg: "golden_layout_text.png",
                                    },
                                } as UserSerialisableComponentConfig,
                            ],
                        },
                        {
                            type: "stack",
                            content: [
                                {
                                    type: "component",
                                    title: "Acme, inc.",
                                    componentName: ColorComponent.typeName,
                                    componentState: {
                                        companyName: "Stock X",
                                    },
                                } as UserSerialisableComponentConfig,
                                {
                                    type: "component",
                                    title: "LexCorp plc.",
                                    componentName: ColorComponent.typeName,
                                    componentState: {
                                        companyName: "Stock Y",
                                    },
                                } as UserSerialisableComponentConfig,
                                {
                                    type: "component",
                                    title: "Springshield plc.",
                                    componentName: ColorComponent.typeName,
                                    componentState: {
                                        companyName: "Stock Z",
                                    },
                                } as UserSerialisableComponentConfig,
                            ],
                        },
                    ],
                },
                {
                    width: 50,
                    type: "row",
                    title: "test stack",
                    content: [
                        {
                            type: "stack",
                            title: "test row",
                            content: [
                                {
                                    type: "component",
                                    title: "comp 1",
                                    componentName: ColorComponent.typeName,
                                    componentState: {
                                        companyName: "Stock X",
                                    },
                                } as UserSerialisableComponentConfig,
                                {
                                    type: "component",
                                    title: "comp 2",
                                    componentName: ColorComponent.typeName,
                                    componentState: {
                                        companyName: "Stock Y",
                                    },
                                } as UserSerialisableComponentConfig,
                                {
                                    type: "component",
                                    title: "comp 3",
                                    componentName: ColorComponent.typeName,
                                    componentState: {
                                        companyName: "Stock Z",
                                    },
                                } as UserSerialisableComponentConfig,
                            ],
                        },
                    ],
                },
            ],
        },
    ],
};

const standardLayout: Layout = {
    name: 'standard',
    config: standardConfig,
};

const responsiveConfig: UserConfig = {
    settings: {
        responsiveMode: "always",
    },
    dimensions: {
        minItemWidth: 250,
    },
    content: [
        {
            type: "row",
            content: [
                {
                    width: 30,
                    type: "column",
                    content: [
                        {
                            title: "Fnts 100",
                            type: "component",
                            componentName: ColorComponent.typeName,
                        },
                        {
                            type: "row",
                            content: [
                                {
                                    type: "component",
                                    title: "Golden",
                                    componentName: ColorComponent.typeName,
                                    width: 30,
                                    componentState: {
                                        bg: "golden_layout_spiral.png",
                                    },
                                } as UserSerialisableComponentConfig,
                            ],
                        },
                        {
                            type: "stack",
                            content: [
                                {
                                    type: "component",
                                    title: "Acme, inc.",
                                    componentName: ColorComponent.typeName,
                                    componentState: {
                                        companyName: "Stock X",
                                    },
                                } as UserSerialisableComponentConfig,
                                {
                                    type: "component",
                                    title: "LexCorp plc.",
                                    componentName: ColorComponent.typeName,
                                    componentState: {
                                        companyName: "Stock Y",
                                    },
                                } as UserSerialisableComponentConfig,
                                {
                                    type: "component",
                                    title: "Springshield plc.",
                                    componentName: ColorComponent.typeName,
                                    componentState: {
                                        companyName: "Stock Z",
                                    },
                                } as UserSerialisableComponentConfig,
                            ],
                        },
                    ],
                },
                {
                    width: 30,
                    title: "Layout",
                    type: "component",
                    componentName: ColorComponent.typeName,
                    componentState: { bg: "golden_layout_text.png" },
                } as UserSerialisableComponentConfig,
                {
                    width: 20,
                    type: "component",
                    title: "Market",
                    componentName: ColorComponent.typeName,
                    componentState: {
                        className: "market-content",
                        style: [
                            ".market-content label {",
                            "  margin-top: 10px",
                            "  display: block",
                            "  text-align: left",
                            "}",
                            ".market-content input {",
                            "  width: 250px",
                            "  border: 1px solid red",
                            "}",
                        ],
                        html: [
                            '<label for="name">Name<label>',
                            '<input id="name" type="text"></input>',
                        ],
                    },
                } as UserSerialisableComponentConfig,
                {
                    width: 20,
                    type: "column",
                    content: [
                        {
                            height: 20,
                            type: "component",
                            title: "Performance",
                            componentName: ColorComponent.typeName,
                        },
                        {
                            height: 80,
                            type: "component",
                            title: "Profile",
                            componentName: ColorComponent.typeName,
                        },
                    ],
                },
            ],
        },
    ],
};

const responsiveLayout: Layout = {
    name: 'responsive',
    config: responsiveConfig,
};

const tabDropdownConfig: UserConfig = {
    settings: {
        tabOverlapAllowance: 25,
        reorderOnTabMenuClick: false,
        tabControlOffset: 5,
    },
    content: [
        {
            type: "row",
            content: [
                {
                    width: 30,
                    type: "column",
                    content: [
                        {
                            title: "Fnts 100",
                            type: "component",
                            componentName: ColorComponent.typeName,
                        },
                        {
                            type: "row",
                            content: [
                                {
                                    type: "component",
                                    title: "Golden",
                                    componentName: ColorComponent.typeName,
                                    width: 30,
                                    componentState: {
                                        bg: "golden_layout_spiral.png",
                                    },
                                } as UserSerialisableComponentConfig,
                            ],
                        },
                        {
                            type: "stack",
                            content: [
                                {
                                    type: "component",
                                    title: "Acme, inc.",
                                    componentName: ColorComponent.typeName,
                                    componentState: {
                                        companyName: "Stock X",
                                    },
                                } as UserSerialisableComponentConfig,
                                {
                                    type: "component",
                                    title: "LexCorp plc.",
                                    componentName: ColorComponent.typeName,
                                    componentState: {
                                        companyName: "Stock Y",
                                    },
                                } as UserSerialisableComponentConfig,
                                {
                                    type: "component",
                                    title: "Springshield plc.",
                                    componentName: ColorComponent.typeName,
                                    componentState: {
                                        companyName: "Stock Z",
                                    },
                                } as UserSerialisableComponentConfig,
                            ],
                        },
                    ],
                },
                {
                    width: 20,
                    type: "stack",
                    content: [
                        {
                            type: "component",
                            title: "Market",
                            componentName: ColorComponent.typeName,
                        },
                        {
                            type: "component",
                            title: "Performance",
                            componentName: ColorComponent.typeName,
                        },
                        {
                            type: "component",
                            title: "Trend",
                            componentName: ColorComponent.typeName,
                        },
                        {
                            type: "component",
                            title: "Balance",
                            componentName: ColorComponent.typeName,
                        },
                        {
                            type: "component",
                            title: "Budget",
                            componentName: ColorComponent.typeName,
                        },
                        {
                            type: "component",
                            title: "Curve",
                            componentName: ColorComponent.typeName,
                        },
                        {
                            type: "component",
                            title: "Standing",
                            componentName: ColorComponent.typeName,
                        },
                        {
                            type: "component",
                            title: "Lasting",
                            componentName: ColorComponent.typeName,
                            componentState: {
                                bg: "golden_layout_spiral.png",
                            },
                        } as UserSerialisableComponentConfig,
                        {
                            type: "component",
                            title: "Profile",
                            componentName: ColorComponent.typeName,
                        },
                    ],
                },
                {
                    width: 30,
                    title: "Layout",
                    type: "component",
                    componentName: ColorComponent.typeName,
                    componentState: { bg: "golden_layout_text.png" },
                } as UserSerialisableComponentConfig,
            ],
        },
    ],
};

const tabDropdownLayout: Layout = {
    name: 'tabDropdown',
    config: tabDropdownConfig,
};

export interface PredefinedLayouts {
    colorComponentCompatible: Layout[];
    allComponents: Layout[];
}

export const prefinedLayouts: PredefinedLayouts = {
    colorComponentCompatible: [miniLayout, standardLayout],
    allComponents: [miniLayout, responsiveLayout, standardLayout, tabDropdownLayout]
};
