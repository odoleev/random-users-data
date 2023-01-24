import {ELanguages, UsersType} from "../../Types";

export interface IFunctionalTabs {
    seed: number;
    onChangeSeed: (value: number | null) => void;
    onRandomSeed: () => void;

    onChangeMistake: (value: number | null) => void;
    mistakesValue: number;

    language: ELanguages;
    onChangeLanguage: (lang: ELanguages) => void;

    users: UsersType
}