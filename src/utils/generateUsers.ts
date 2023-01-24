import {generateRandomUser} from "./generateRandomUser";
import {ELanguages, UsersType} from "../Types";
// @ts-ignore
import * as seedrandom from "seedrandom";

interface IGenerateUsers {
    seed: number;
    firstRender: boolean;
    lastNumber: number;
    mistakes: number;
    mistakesSeed: number;
    language: ELanguages
}

export function generateUsers({seed, firstRender, lastNumber, mistakes, mistakesSeed, language} : IGenerateUsers): UsersType {
    const users = [];
    let updatedLastNumber = lastNumber;
    let currentSeed = seed;
    // @ts-ignore
    const rndSeedNumber = seedrandom(seed);
    if(firstRender) {
        for(let i = 0; i <= 19; i++) {
            updatedLastNumber += 1
            users.push(generateRandomUser({
                seed: currentSeed,
                nextNumber: updatedLastNumber,
                mistakes,
                mistakesSeed,
                language
            }));
            currentSeed += Math.floor(rndSeedNumber() * 100000000)
        }
    } else {
        for(let i = 0; i <= 9; i++) {
            updatedLastNumber += 1
            users.push(generateRandomUser({
                seed: currentSeed,
                nextNumber: updatedLastNumber,
                mistakes,
                mistakesSeed,
                language
            }));
            currentSeed += Math.floor(rndSeedNumber() * 100000000)
        }
    }

    return users;
}