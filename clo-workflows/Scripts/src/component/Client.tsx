import { inject, observer } from "mobx-react"
import * as React from "react"

import { ClientStore } from "../store/ClientStore/ClientStore"
import { SessionStore } from "../store/SessionStore"
import Header from "./Header"
import { ProjectProcessList } from "./ProjectProcessList"
import ProjectFormModal from "./ProjectFormModal"
import ProcessFormModal from "./ProcessFormModal"
import { Message } from "./Message"
import { NoteSource, NoteScope } from "../model/Note"
import { NotesBox } from "./NotesBox"

const styles = {
    wrapper: {
        display: "inline-flex",
        width: "100%",
        height: "auto",
    } as React.CSSProperties,
    rightSection: {
        margin: "0",
        padding: "30px",
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        width: "30%",
    } as React.CSSProperties,
    leftSection: {
        margin: "0",
        padding: "10px",
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        width: "70%",
        boxShadow: "0 5px 10px rgba(0, 0, 0, 0.19), 0 3px 3px rgba(0, 0, 0, 0.18)",
    } as React.CSSProperties,
}

@inject("rootStore")
@observer
export class Client extends React.Component<any, any> {
    public componentWillMount() {
        this.clientStore = this.props.rootStore.clientStore
    }
    clientStore: ClientStore

    render() {
        const clientStore = this.clientStore
        return (
            <div>
                <div style={styles.wrapper}>
                    <div style={styles.leftSection}>
                        <ProjectProcessList
                            messageVisible={clientStore.message}
                            data={this.clientStore.data}
                            handleSubmit={(projectId: any) => clientStore.handleAddNewProcess(projectId)}
                            view={clientStore.view}
                        />
                    </div>
                    <div style={styles.rightSection}>
                        {this.clientStore.view.notesType && (
                            <NotesBox
                                title={this.clientStore.view.notesTitle}
                                notes={this.clientStore.selectedNotes}
                                onCreateNote={this.clientStore.submitNewNote}
                                onUpdateNote={this.clientStore.updateNote}
                                onDeleteNote={this.clientStore.deleteNote}
                                currentUser={this.clientStore.data.currentUser}
                                noteSource={this.clientStore.view.notesType}
                                maxScope={NoteScope.CLIENT}
                            />
                        )}
                    </div>
                </div>
                {clientStore.view.modal === "project" && <ProjectFormModal clientStore={clientStore} />}
                {clientStore.view.modal === "process" && <ProcessFormModal clientStore={clientStore} />}
                {clientStore.message && <Message {...clientStore.message} />}
            </div>
        )
    }
}
