import { observer } from "mobx-react"
import { Dropdown } from "office-ui-fabric-react"
import { DefaultButton, PrimaryButton } from "office-ui-fabric-react/lib/Button"
import { Panel, PanelType } from "office-ui-fabric-react/lib/Panel"
import { Modal } from "office-ui-fabric-react/lib/Modal"

import * as React from "react"

import { ClientStore } from "../store/ClientStore/ClientStore"
import FormControlGroup from "./FormControlGroup"

export interface IFormPanelProps {
    clientStore: ClientStore
}

const ProjectFormModal = observer((props: IFormPanelProps) => {
    return (
        <Modal
            isOpen={true}
            onDismiss={() => {
                props.clientStore.view.modal = undefined
            }}
            isBlocking={true}
        >
            <div
                style={{
                    height: "80vh",
                    width: "40vw",
                    padding: "32px",
                }}
            >
                <Dropdown
                    label="Select the Project Type:"
                    selectedKey={props.clientStore.view.project.type ? props.clientStore.view.project.type : undefined}
                    options={props.clientStore.typesAsOptions.PROJECTS.map((field, index) => ({
                        text: field.text,
                        value: field.text,
                        key: field.text,
                    }))}
                    style={{
                        width: "200px",
                        margin: "20px 0px",
                    }}
                    placeHolder={props.clientStore.view.project.type ? props.clientStore.view.project.type : "select a project type"}
                    onChanged={e => {
                        props.clientStore.view.project.type = e.text
                    }}
                    disabled={props.clientStore.view.asyncPendingLockout}
                />
                {props.clientStore.view.project.type && (
                    <div>
                        <FormControlGroup
                            data={props.clientStore.newProject}
                            formControls={props.clientStore.currentForm}
                            validation={props.clientStore.currentFormValidation}
                            updateFormField={(fieldName, value) =>
                                props.clientStore.updateClientStoreMember(fieldName, value, "newProject")
                            }
                        />
                    </div>
                )}

                <PrimaryButton
                    description="Create the new project"
                    onClick={() => props.clientStore.processClientRequest()}
                    text="Create Project"
                    disabled={
                        props.clientStore.view.asyncPendingLockout ||
                        props.clientStore.newProject.get("Title") === undefined ||
                        props.clientStore.newProject.get("Title") === ""
                    }
                />
                <br />
                <br />
                <DefaultButton
                    text="Close"
                    description="close without submitting"
                    onClick={() => {
                        props.clientStore.view.modal = null
                    }}
                    disabled={props.clientStore.view.asyncPendingLockout}
                />
            </div>
            <br />
            <br />
        </Modal>
    )
})
export default observer(ProjectFormModal)
