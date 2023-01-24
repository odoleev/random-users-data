import {englishLetters, russianLetters, spanishLetters} from "../assets/letters";
// @ts-ignore
import * as seedrandom from "seedrandom";
import {ELanguages} from "../Types";

interface IMakeMistakes {
    seed: number;
    mistakes: number;
    fullName: string;
    address: string;
    phoneNumber: string;
    randomSeed: number;
    language: ELanguages;
}

export function makeMistakes({seed, mistakes, phoneNumber, address, fullName, randomSeed, language}: IMakeMistakes): [phoneNumber: string, address: string, fullName: string] {
    let result: [phoneNumber: string, address: string, fullName: string]  = [phoneNumber, address, fullName]
    let fullMistakes = mistakes;
    const chance = mistakes - Math.floor(mistakes);
    // @ts-ignore
    const rnd = seedrandom(seed + randomSeed);

    if (chance > 0) {

        if(rnd() < chance) {
            fullMistakes = Math.ceil(mistakes)
        } else {
            fullMistakes = Math.floor(mistakes)
        }
    }
    if (fullMistakes === 0) return result;

    for (let i = 0; i < fullMistakes; i++) {
        // @ts-ignore
        let rndMistake = seedrandom(rnd() + i);
        let rndValue = Math.floor( rndMistake() * result.length);
        if(rndMistake() < 0.3) {
            result[rndValue] = deleteRandomElem(result[rndValue], rndMistake());
        } else if (rndMistake() < 0.6) {
            result[rndValue] = swapRandomElem(result[rndValue], rndMistake());
        } else {
            result[rndValue] = addRandomElem(result[rndValue], rndMistake(), language);
        }
    }

    function deleteRandomElem(stringToDelete: string, rndSeeded: number) {
        const arrayToDelete = stringToDelete.split('');
        const rndIndex = Math.floor(rndSeeded * arrayToDelete.length);
        return arrayToDelete.filter((_, index) => index !== rndIndex).join('');
    }

    function swapRandomElem(stringToSwap: string, rndSeeded: number) {
        const arrayToSwap = stringToSwap.split('');
        const rndIndex = Math.floor(rndSeeded * (arrayToSwap.length - 1));
        [arrayToSwap[rndIndex], arrayToSwap[rndIndex+1]] = [arrayToSwap[rndIndex+1], arrayToSwap[rndIndex]];
        return arrayToSwap.join('');
    }

    function addRandomElem(stringToAdd: string, rndSeeded: number, language: ELanguages) {
        const arrayToAdd = stringToAdd.split('');
        const rndIndex = Math.floor(rndSeeded * arrayToAdd.length);
        let letters;
        switch (language) {
            case ELanguages.EN:
                letters = englishLetters;
                break;
            case ELanguages.ES:
                letters = spanishLetters;
                break;
            case ELanguages.RU:
                letters = russianLetters;
                break;
        }
        const randomLetter = letters[Math.floor(rndSeeded * letters.length)];
        return arrayToAdd.slice(0, rndIndex).join('') + randomLetter + arrayToAdd.slice(rndIndex).join('');
    }

    return result;
}