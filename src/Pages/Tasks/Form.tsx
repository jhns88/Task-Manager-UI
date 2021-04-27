import React from "react";
import {Button, Header, Divider, Input} from "semantic-ui-react";
import {AxiosResponse} from "axios";
import {Router} from "../../Arch/Router";
import {CommonTaskPage} from "./Common";

/**
 * The task form props.
 */
export interface FormProps {
    id?: number;
}

/**
 * The task form component states.
 */
interface FormStates {
    id?: number;
    tasktext?: (string | undefined);
    done?: boolean;
}

const axios = require('axios').default;

/**
 * The task form implementation.
 */
export class Form extends React.PureComponent<FormProps, FormStates> {

    /**
     * The task form component constructor.
     */
    public constructor(props: FormProps) {
        super(props);

        this.state = {
            "id": props.id,
            "tasktext": "",
            "done": false
        };
    }

    /**
     * Performs a task save action.
     */
    private saveTask(): void {
        const id: (number | undefined) = this.state.id;

        axios({
            "method": (id !== undefined ? "put": "post"),
            "url": 'http://localhost:8080/tasks' + (id !== undefined ? ("/" + id) : ""),
            "data": {
                "id": id,
                "tasktext": this.state.tasktext,
                "done": this.state.done
            }
        }).then((response: AxiosResponse) => {
            Router.getInstance().switchPage(CommonTaskPage.List);
        });
    }

    /**
     * @inheritDoc
     */
    public componentDidMount() {
        // load data
        if (this.state.id !== undefined) {
            axios({
                "method": 'get',
                "url": 'http://localhost:8080/tasks/' + this.state.id
            }).then((response: AxiosResponse) => {
                this.setState(response.data);
            });
        }
    }

    /**
     * Stores the current task value to allow controlled input component.
     */
    private storeInput(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({
            "tasktext": event.target.value
        });
    }

    /**
     * @inheritDoc
     */
    public render() {
        return (
            <div>
                <Header as='h1'>{this.state.id !== undefined ? "Edit Task" : "Create Task"}</Header>
                <Divider/>
                <Input placeholder='Task' onChange={e => this.storeInput(e)} value={this.state.tasktext} />
                <Divider/>
                <div>
                    <Button onClick={() => this.saveTask()} primary>Save</Button>
                </div>
            </div>
        );
    }
}
