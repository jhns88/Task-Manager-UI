import React, {FormEvent} from "react";
import {Button, Header, Divider, Input} from "semantic-ui-react";

interface FormProps {

}

interface FormStates {
    task?: (string | undefined);
}


/**
 *
 */
export class Form extends React.Component<FormProps, FormStates> {

    public constructor(props: FormProps) {
        super(props);

        this.state = {
            "task": undefined
        };
    }


    private saveTask(): void {
    }

    private storeInput(event: FormEvent): void {
        // this.setState()
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
