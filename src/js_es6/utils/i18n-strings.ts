import { AssertError } from '../errors/internal-error';

export const enum I18nStringId {
    PopoutCannotBeCreatedWithRootItemConfig,
    PleaseRegisterAConstructorFunction,
    ComponentIsAlreadyRegistered,
}

export namespace I18nStrings {
    let initialised = false;

    interface Info {
        readonly id: I18nStringId;
        readonly default: string;
    }

    type InfosObject = { [id in keyof typeof I18nStringId]: Info };

    const infosObject: InfosObject = {
        PopoutCannotBeCreatedWithRootItemConfig: {
            id: I18nStringId.PopoutCannotBeCreatedWithRootItemConfig,
            default: 'Popout cannot be created with root ItemConfig'
        },
        PleaseRegisterAConstructorFunction: {
            id: I18nStringId.PleaseRegisterAConstructorFunction,
            default: 'Please register a constructor function'
        },
        ComponentIsAlreadyRegistered: {
            id: I18nStringId.ComponentIsAlreadyRegistered,
            default: 'Component is already registered',
        }
    }

    export const idCount = Object.keys(infosObject).length;
    export const infos = Object.values(infosObject);

    export function checkInitialise(): void {
        if (!initialised) {
            for (let i = 0; i < idCount; i++) {
                const info = infos[i];
                if (info.id !== i) {
                    throw new AssertError('INSI00110', `${i}: ${info.id}`);
                } else {
                    i18nStrings[i] = info.default;
                }
            }
        }
        initialised = true;
    }
}

export const i18nStrings = new Array<string>(I18nStrings.idCount);
