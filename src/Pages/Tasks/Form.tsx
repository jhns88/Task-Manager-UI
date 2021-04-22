import React from "react";
import {Button, Header, Divider, Input} from "semantic-ui-react";

/**
 * The task form props.
 */
interface FormProps {
    // nothing special yet
}

/**
 * The task form component states.
 */
interface FormStates {
    task?: (string | undefined);
}

/**
 * The task form implementation.
 */
export class Form extends React.Component<FormProps, FormStates> {

    /**
     * The task form component constructor.
     */
    public constructor(props: FormProps) {
        super(props);

        this.state = {
            "task": undefined
        };
    }

    /**
     * Performs a task save action.
     */
    private saveTask(): void {
        alert("save: " + this.state.task);
    }

    /**
     * Stores the current task value to allow controlled input component.
     */
    private storeInput(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({
            "task": event.target.value
        });
    }

    /**
     * @inheritDoc
     */
    public render() {
        return (
            <div>
                <Header as='h1'>Create Task</Header>
                <Divider/>
                <Input placeholder='Task' onChange={e => this.storeInput(e)} value={this.state.task} />
                <Divider/>
                <div>
                    <Button onClick={() => this.saveTask()} primary>Save</Button>
                </div>
            </div>
        );
    }
}
