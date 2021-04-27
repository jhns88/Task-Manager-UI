import React from "react";
import {AxiosPromise, AxiosResponse} from "axios";
import {Router} from "../../Arch/Router";
import {CommonTaskPage} from "./Common";
import {Divider, Button, Header, Loader, Icon} from "semantic-ui-react";

const axios = require('axios').default;

interface ListProps {
    // nothing special yet
}

interface ListStates {
    listdata?: string; // the list item data as json string
}

interface ListItem {
    id: number;
    tasktext: string;
    done: boolean;
}

/**
 *
 */
export class List extends React.Component<ListProps, ListStates> {

    constructor(props: ListProps) {
        super(props);

        this.state = {};
    }


    /**
     * @inheritDoc
     */
    public componentDidMount() {
        this.loadTasks();
    }

    private loadTasks(): void {
        axios({
            "method": 'get',
            "url": 'http://localhost:8080/tasks'
        }).then((response: AxiosResponse) => {
            this.setState({
                "listdata": JSON.stringify(response.data)
            });
        });
    }

    private markTaskAsDone(taskId: number): void {
        axios({
            "method": 'put',
            "url": 'http://localhost:8080/tasks/' + taskId,
            "crossdomain": true,
            "data": {
                "done": true
            }
        }).then((response: AxiosResponse) => {
            this.loadTasks();
        });
    }

    private markTaskAsUndone(taskId: number): void {
        axios({
            "method": 'put',
            "url": 'http://localhost:8080/tasks/' + taskId,
            "crossdomain": true,
            "data": {
                "done": false
            }
        }).then((response: AxiosResponse) => {
            this.loadTasks();
        });
    }

    /**
     * Performs a task deletion.
     */
    private deleteTask(taskId: number): void {
        axios({
            "method": 'delete',
            "url": 'http://localhost:8080/tasks/' + taskId,
            "crossdomain": true
        }).then((response: AxiosResponse) => {
            this.loadTasks();
        });
    }

    /**
     * Renders the list items.
     */
    private renderListItems(rawItems: string): JSX.Element {
        const list: ListItem[] = JSON.parse(rawItems);

        return (
            <div>
                <Header as='h4'>Open Tasks:</Header>
                <div>
                    <ul>
                        {list
                            .filter(item => item.done === false)
                            .map(item => {
                                return (
                                    <li style={{height: 50}} key={item.id}>
                                        <div style={{display: "inline"}}>
                                            {item.tasktext}
                                        </div>
                                        <div style={{display: "inline", marginLeft: "1rem"}}>
                                            <Button basic size='mini' onClick={() => this.markTaskAsDone(item.id)} primary>Done</Button>
                                        </div>
                                        <Button basic color={"green"} size={"mini"} icon onClick={() => this.performTaskFormOpen(item.id)}>
                                            <Icon name='pencil alternate' />
                                        </Button>
                                    </li>
                                )}
                            )
                        }
                    </ul>
                </div>
                <Divider/>

                <div>
                    <Header as='h4'>Closed Tasks:</Header>
                    <div>
                        <ul>
                            {list
                                .filter(item => item.done === true)
                                .map(item => {
                                    return (
                                        <li style={{height: 50}} key={item.id}>
                                            <div style={{display: "inline"}}onClick={() => this.performTaskFormOpen(item.id)}>
                                                {item.tasktext}
                                            </div>
                                            <div style={{display: "inline", marginLeft: "1rem"}}>
                                                <Button basic size='mini' color={"grey"} onClick={() => this.markTaskAsUndone(item.id)}>
                                                    Undone
                                                </Button>
                                                <Button basic color={"green"} size={"mini"} icon onClick={() => this.performTaskFormOpen(item.id)}>
                                                    <Icon name='pencil alternate' />
                                                </Button>
                                                <Button basic color={"red"} size={"mini"} icon onClick={() => this.deleteTask(item.id)}>
                                                    <Icon name='trash alternate outline' />
                                                </Button>
                                            </div>
                                        </li>
                                    )}
                                )
                            }
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

    /**
     *
     */
    private performTaskFormOpen(id: number): void {
        Router.getInstance().switchPage(
            CommonTaskPage.Form,
            {
                "id": id
            }
        );
    }

    /**
     * @inheritDoc
     */
    public render() {
        return (
            <div>
                <Header as='h1'>Task List</Header>
                <Divider/>
                {this.state.listdata === undefined
                    ? <Loader active inline={true} />
                    : this.renderListItems(this.state.listdata)
                }
            </div>
        );
    }
}
