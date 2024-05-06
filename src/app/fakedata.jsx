import { faker } from "@faker-js/faker";


export function createRandomUser(){
    

    return{
        profile: faker.image.avatar(),
        firstName: faker.person.firstName(),
        lastName : faker.person.lastName(),
        age : faker.number.int({min: 1, max: 100}),
        visits : faker.number.int(1000),
        progress : faker.date.past()
    }
}

export const USERS = faker.helpers.multiple(createRandomUser,{
    count : 30,
})
