import {ESexTypes} from "../Types";
import {thirdNameFemale, thirdNameMale} from "../assets/thirdNameBase";
// @ts-ignore
import * as seedrandom from "seedrandom";


export const randomThirdNameGiver = (gender: ESexTypes, seed: number) => {
    let rndNumber;
    // @ts-ignore
    rndNumber = seedrandom(String(seed));

   switch (gender) {
       case ESexTypes.FEMALE:
           return thirdNameFemale[Math.floor(rndNumber() * thirdNameFemale.length)];
       case ESexTypes.MALE:
           return thirdNameMale[Math.floor(rndNumber() * thirdNameMale.length)];
   }
}