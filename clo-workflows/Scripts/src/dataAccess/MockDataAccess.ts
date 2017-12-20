import { IDataAccess } from "./IDataAccess"
import { IUser } from "../model/User"

export class MockDataAccess implements IDataAccess {

    public fetchUser(): Promise<IUser> {
        return Promise.resolve({
            name: "Connor Moody",
            username: "cmoody4",
            email: "cmoody4@byu.edu",
            role: null,
        })
    }

}