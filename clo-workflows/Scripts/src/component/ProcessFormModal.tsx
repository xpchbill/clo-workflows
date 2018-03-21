import { observer } from "mobx-react"
import { Dropdown, Checkbox } from "office-ui-fabric-react"
import { DefaultButton, PrimaryButton } from "office-ui-fabric-react/lib/Button"
import { Panel, PanelType } from "office-ui-fabric-react/lib/Panel"
import { Modal } from "office-ui-fabric-react/lib/Modal"
import * as React from "react"

import { ClientStore } from "../store/ClientStore"
import FormControlGroup from "./FormControlGroup"
import WorkFormModal from "./WorkFormModal"

export interface IFormPanelProps {
    clientStore: ClientStore
    togglePanel(m: string, v: string | boolean)
}

// TODO this is mixing works and processes together
const ProcessFormModal = (props: IFormPanelProps) => {
    return (
        <Modal
            isOpen={props.clientStore.showProcessModal}
            onDismiss={() => {
                props.togglePanel("showProcessModal", false)
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
                <h2>New Process Form</h2>
                <Checkbox
                    label={"add a new work"}
                    checked={props.clientStore.workIsNew}
                    onChange={(m, v) => {
                        if (!v) props.clientStore.closeWorkForm()
                        props.clientStore.updateClientStoreMember("workIsNew", v)
                    }}
                />
                {props.clientStore.workIsNew ? (
                    <WorkFormModal clientStore={props.clientStore} togglePanel={props.togglePanel} />
                ) : (
                    <Dropdown
                        label="Select the Work:"
                        selectedKey={props.clientStore.viewState.selectedWork ? props.clientStore.viewState.selectedWorkType : undefined}
                        options={props.clientStore.works.map((field, index) => {
                            return {
                                text: field.Title,
                                value: field.Title,
                                key: field.Id,
                            }
                        })}
                        style={{
                            width: "200px",
                            margin: "20px 0px",
                        }}
                        placeHolder={
                            props.clientStore.viewState.selectedWorkType ? props.clientStore.viewState.selectedWorkType : "select a Work"
                        }
                        onChanged={e => {
                            console.log(e.key)
                            props.clientStore.updateClientStoreMember("selectedWork", e.key)
                        }}
                        disabled={props.clientStore.asyncPendingLockout}
                    />
                )}

                <PrimaryButton
                    description="Submit Process Request"
                    onClick={props.clientStore.submitNewWorkProcess}
                    text="Submit Work Request"
                    disabled={props.clientStore.asyncPendingLockout}
                />
                <br />
                <br />
                <DefaultButton
                    description="close without submitting"
                    text="Clear and Cancel"
                    onClick={() => {
                        props.clientStore.closeProcessModal()
                    }}
                    disabled={props.clientStore.asyncPendingLockout}
                />
                <DefaultButton
                    text="Close"
                    description="close without submitting"
                    onClick={() => {
                        props.togglePanel("showProcessModal", false)
                    }}
                    disabled={props.clientStore.asyncPendingLockout}
                />
            </div>{" "}
        </Modal>
    )
}
export default observer(ProcessFormModal)
