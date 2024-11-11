
import { faker } from "@faker-js/faker";
export default (user,count,userNameIds,userMailAddressIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
machineID: faker.lorem.sentence(""),
userName: userNameIds[i % userNameIds.length],
userMailAddress: userMailAddressIds[i % userMailAddressIds.length],
location: faker.lorem.sentence(""),
userCheckList: faker.lorem.sentence(""),
tktStatus: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
