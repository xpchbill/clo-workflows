import { SessionStore } from "./../../src/store/SessionStore"
import { ClientStore } from "./../../src/store/ClientStore"
import * as ava from "ava"
import { RootStore } from "../../src/store/RootStore"
import { useStrict } from "mobx"
import { when, mock, verify, instance, spy, anything } from "ts-mockito"
import { IUser } from "../../src/model/User"
import { MockProjects, MockUsers, MockProcesses } from "../../src/service/dataService/MockData"
import { MockDataService } from "../../src/service/dataService/MockDataService"
import { ListName } from "../../src/service/dataService/IDataService"

ava.test("root store creates all child stores when an employee logs in", async t => {
    const mockDataService = mock(MockDataService)
    const user = {
        name: "Connor Moody",
        username: "cmoody4",
        email: "cdmoody0604@gmail.com",
        role: {
            name: "Administrator",
            permittedSteps: [],
        },
    }
    when(mockDataService.fetchUser()).thenReturn(Promise.resolve(user))
    when(mockDataService.fetchEmployeeActiveProcesses(anything())).thenReturn(Promise.resolve(MockProcesses))
    when(mockDataService.fetchRequestElementsById(anything(), ListName.PROJECTS)).thenReturn(Promise.resolve(MockProjects))
    when(mockDataService.fetchClientActiveProjects(anything())).thenReturn(Promise.resolve(MockProjects))

    const rootStore: RootStore = new RootStore(instance(mockDataService))
    await rootStore.init()
    t.truthy(rootStore.sessionStore)
    t.truthy(rootStore.clientStore)
    t.truthy(rootStore.employeeStore)
})

ava.test("root store creates all stores except employeeProcess store when client logs in", async t => {
    const mockDataService = mock(MockDataService)
    const user = {
        name: "Connor Moody",
        username: "cmoody4",
        email: "cdmoody0604@gmail.com",
        role: {
            name: "Anonymous",
            permittedSteps: [],
        },
    }
    when(mockDataService.fetchUser()).thenReturn(Promise.resolve(user))
    when(mockDataService.fetchRequestElementsById(anything(), ListName.PROJECTS)).thenReturn(Promise.resolve(MockProjects))
    when(mockDataService.fetchClientActiveProjects(anything())).thenReturn(Promise.resolve(MockProjects))

    const rootStore: RootStore = new RootStore(instance(mockDataService))
    await rootStore.init()
    t.truthy(rootStore.sessionStore)
    t.truthy(rootStore.clientStore)
    t.falsy(rootStore.employeeStore)
})
