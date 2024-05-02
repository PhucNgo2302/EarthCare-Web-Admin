import { faker } from "@faker-js/faker";

export function createRandomUser(){
    return{
        avatar: faker.image.avatar,
        firstName: faker.person.firstName(),
        lastName : faker.person.lastName(),
        age : faker.datatype.number({min: 1, max: 100}),
        visits : faker.datatype.number(1000),
        progress : faker.date.past()
    }
}

