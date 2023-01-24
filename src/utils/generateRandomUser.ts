import {faker as fakerEs} from "@faker-js/faker/locale/es"
import {faker as fakerEn} from "@faker-js/faker/locale/en_US"
import {faker as fakerRu} from "@faker-js/faker/locale/ru"
import {ELanguages, IUser} from "../Types";
import {randomSex} from "./randomSex";
import {randomThirdNameGiver} from "./randomThirdNameGiver";
import {makeMistakes} from "./makeMistakes";

interface IGenerateUser {
    seed: number;
    nextNumber: number;
    mistakes: number;
    mistakesSeed: number;
    language: ELanguages;
}

export function generateRandomUser({seed, mistakesSeed, mistakes, language, nextNumber}: IGenerateUser): IUser {
    let faker;
    switch (language){
        case ELanguages.ES:
            faker = fakerEs;
            break;
        case ELanguages.EN:
            faker = fakerEn;
            break;
        case ELanguages.RU:
            faker = fakerRu;
            break;
    }
    faker.seed(seed);
    const sex = randomSex(seed);
    const name = faker.name.fullName({sex: sex}).split(' ').reverse();
    if(language === ELanguages.RU) {
        name.push(randomThirdNameGiver(sex, seed));
    }
    const fullName = name.join(" ");
    let address;
    let phoneNumber;
    switch (language) {
        case ELanguages.ES:
            phoneNumber = '+34' + faker.phone.number(' (##) #### ###');
            address = faker.address.city() + ", " + faker.address.streetAddress();
            break;
        case ELanguages.RU:
            phoneNumber = '+7 ' + faker.phone.number();
            address = faker.address.cityName() + ", " + faker.address.streetAddress();
            break;
        case ELanguages.EN:
            phoneNumber = '+1-' + faker.phone.number('###-###-####');
            address = faker.address.cityName() + ", " + faker.address.streetAddress();
            break;
    }

    const [resultPhoneNumber, resultAddress, resultFullName] = makeMistakes({
            seed,
            mistakes,
            phoneNumber,
            address,
            fullName,
            randomSeed: mistakesSeed,
            language
        });

    return {
        number: nextNumber,
        id: faker.datatype.uuid(),
        name: resultFullName,
        address: resultAddress,
        phoneNumber: resultPhoneNumber,
    }
}