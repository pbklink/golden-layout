import { ComponentContainer, GoldenLayout } from "../dist/types/index.d";
import { ItemConfig } from "../dist/types/js_es6/config/config";
import {
    UserConfig,
    UserSerialisableComponentConfig
} from "../dist/types/js_es6/config/user-config";
import "../src/less/goldenlayout-base.less";
import "../src/less/themes/goldenlayout-dark-theme.less";
import "./test.less";

declare global {
    interface Window {
        myLayout: GoldenLayout;
    }
}

// class LoggerAspect {
//   @beforeMethod({
//     classNamePattern: /^LayoutManager/,
//     methodNamePattern: /.*/
//   })
//   invokeBeforeMethod(meta: Metadata) {
//     // meta.woveMetadata == { bar: 42 }
//     console.log(`Inside of the logger. Called ${meta.className}.${meta.method.name} with args: ${meta.method.args.join(', ')}.`);
//   }
// }

if (document.readyState !== "loading") run();
// in case the document is already rendered
else document.addEventListener("DOMContentLoaded", run);

function run() {
    // $(document).on('mousemove touchmove', (e) => {
    //   console.log('intercepted event, e:', e.target)
    // });

    //
    // set layout type
    //
    const layout = "tab-dropdown";

    //
    // init
    //
    let config: UserConfig;
    switch (layout.toLowerCase()) {
        case "mini":
            config = createMiniConfig();
            break;
        case "responsive":
            config = createResponsiveConfig();
            break;
        case "tab-dropdown":
            config = createTabDropdownConfig();
            break;
        default:
            config = createStandardConfig();
            break;
    }

    class Component {
        constructor(container: ComponentContainer, state: unknown) {
            const paraElement = document.createElement("p");
            paraElement.style.textAlign = "left";
            const title = container.config.title;
            paraElement.innerHTML = (title ?? "unknown") + " component";
            container.contentElement.appendChild(paraElement);
        }
    }

    const myLayout = new GoldenLayout(config);

    myLayout.registerComponentWithConstructor("html", Component);

    myLayout.init();

    window.myLayout = myLayout;

    function createMiniConfig(): UserConfig {
        return {
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
                            componentName: "html",
                            width: 30,
                            componentState: { bg: "golden_layout_spiral.png" },
                        } as UserSerialisableComponentConfig,
                        {
                            title: "Layout",
                            header: { show: "top", popout: false },
                            type: "component",
                            componentName: "html",
                            componentState: { bg: "golden_layout_text.png" },
                        } as UserSerialisableComponentConfig,
                    ],
                },
            ],
        };
    }

    function createStandardConfig(): UserConfig {
        return {
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
                                    componentName: "html",
                                },
                                {
                                    type: "row",
                                    content: [
                                        {
                                            type: "component",
                                            title: "Golden",
                                            header: { show: "right" },
                                            isClosable: false,
                                            componentName: "html",
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
                                            componentName: "html",
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
                                            componentName: "html",
                                            componentState: {
                                                companyName: "Stock X",
                                            },
                                        } as UserSerialisableComponentConfig,
                                        {
                                            type: "component",
                                            title: "LexCorp plc.",
                                            componentName: "html",
                                            componentState: {
                                                companyName: "Stock Y",
                                            },
                                        } as UserSerialisableComponentConfig,
                                        {
                                            type: "component",
                                            title: "Springshield plc.",
                                            componentName: "html",
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
                                            componentName: "html",
                                            componentState: {
                                                companyName: "Stock X",
                                            },
                                        } as UserSerialisableComponentConfig,
                                        {
                                            type: "component",
                                            title: "comp 2",
                                            componentName: "html",
                                            componentState: {
                                                companyName: "Stock Y",
                                            },
                                        } as UserSerialisableComponentConfig,
                                        {
                                            type: "component",
                                            title: "comp 3",
                                            componentName: "html",
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
    }

    function createResponsiveConfig(): UserConfig {
        return {
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
                                    componentName: "html",
                                },
                                {
                                    type: "row",
                                    content: [
                                        {
                                            type: "component",
                                            title: "Golden",
                                            componentName: "html",
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
                                            componentName: "html",
                                            componentState: {
                                                companyName: "Stock X",
                                            },
                                        } as UserSerialisableComponentConfig,
                                        {
                                            type: "component",
                                            title: "LexCorp plc.",
                                            componentName: "html",
                                            componentState: {
                                                companyName: "Stock Y",
                                            },
                                        } as UserSerialisableComponentConfig,
                                        {
                                            type: "component",
                                            title: "Springshield plc.",
                                            componentName: "html",
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
                            componentName: "html",
                            componentState: { bg: "golden_layout_text.png" },
                        } as UserSerialisableComponentConfig,
                        {
                            width: 20,
                            type: "component",
                            title: "Market",
                            componentName: "html",
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
                                    componentName: "html",
                                },
                                {
                                    height: 80,
                                    type: "component",
                                    title: "Profile",
                                    componentName: "html",
                                },
                            ],
                        },
                    ],
                },
            ],
        };
    }

    function createTabDropdownConfig(): UserConfig {
        return {
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
                                    componentName: "html",
                                },
                                {
                                    type: "row",
                                    content: [
                                        {
                                            type: "component",
                                            title: "Golden",
                                            componentName: "html",
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
                                            componentName: "html",
                                            componentState: {
                                                companyName: "Stock X",
                                            },
                                        } as UserSerialisableComponentConfig,
                                        {
                                            type: "component",
                                            title: "LexCorp plc.",
                                            componentName: "html",
                                            componentState: {
                                                companyName: "Stock Y",
                                            },
                                        } as UserSerialisableComponentConfig,
                                        {
                                            type: "component",
                                            title: "Springshield plc.",
                                            componentName: "html",
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
                                    componentName: "html",
                                },
                                {
                                    type: "component",
                                    title: "Performance",
                                    componentName: "html",
                                },
                                {
                                    type: "component",
                                    title: "Trend",
                                    componentName: "html",
                                },
                                {
                                    type: "component",
                                    title: "Balance",
                                    componentName: "html",
                                },
                                {
                                    type: "component",
                                    title: "Budget",
                                    componentName: "html",
                                },
                                {
                                    type: "component",
                                    title: "Curve",
                                    componentName: "html",
                                },
                                {
                                    type: "component",
                                    title: "Standing",
                                    componentName: "html",
                                },
                                {
                                    type: "component",
                                    title: "Lasting",
                                    componentName: "html",
                                    componentState: {
                                        bg: "golden_layout_spiral.png",
                                    },
                                } as UserSerialisableComponentConfig,
                                {
                                    type: "component",
                                    title: "Profile",
                                    componentName: "html",
                                },
                            ],
                        },
                        {
                            width: 30,
                            title: "Layout",
                            type: "component",
                            componentName: "html",
                            componentState: { bg: "golden_layout_text.png" },
                        } as UserSerialisableComponentConfig,
                    ],
                },
            ],
        };
    }
}
