import {ESexTypes} from "../Types";
// @ts-ignore
import * as seedrandom from "seedrandom";

export const randomSex = (seed: number): ESexTypes => {
    let rndNumber;
    // @ts-ignore
    rndNumber = seedrandom(String(seed));
    const sex = [ESexTypes.MALE, ESexTypes.FEMALE];
    const randomIndex = Math.floor(rndNumber() * sex.length);

    return sex[randomIndex];
}