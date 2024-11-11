
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
serviceName: faker.lorem.sentence(1),
staffId: faker.lorem.sentence(1),
startTime: faker.lorem.sentence(1),
endTime: faker.lorem.sentence(1),
timerStatus: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
