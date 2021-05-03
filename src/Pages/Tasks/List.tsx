import React from "react";
import {Router} from "../../Arch/Router";
import {CommonTaskPage} from "./Common";
import {Divider, Button, Header, Loader, Icon} from "semantic-ui-react";
import {TaskStorage} from "../../Arch/Storages/TaskStorage";
import {Task} from "../../Arch/Task";

interface ListProps {
    // nothing special yet
}

interface ListStates {
    listdata?: string; // the list item data as json string
}

/**
 *
 */
export class List extends React.PureComponent<ListProps, ListStates> {

    /**
     * The task list constructor.
     */
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

    /**
     * Load tasks for the task list.
     */
    private loadTasks(): void {
        TaskStorage.DEFAULT.getTasks()
            .then(tasks => {
                this.setState({
                    "listdata": JSON.stringify(tasks)
                });
            })
        ;
    }

    private markTaskAsDone(taskId: number): void {
        const task: (Task | undefined) = TaskStorage.DEFAULT.getTask(taskId);

        if (task !== undefined) {
            task.done = true;
            TaskStorage.DEFAULT.saveTask(task)
                .then(() => this.loadTasks())
            ;
        }
    }

    private markTaskAsUndone(taskId: number): void {
        const task: (Task | undefined) = TaskStorage.DEFAULT.getTask(taskId);

        if (task !== undefined) {
            task.done = false;
            TaskStorage.DEFAULT.saveTask(task)
                .then(() => this.loadTasks())
            ;
        }
    }

    /**
     * Performs a task deletion.
     */
    private deleteTask(taskId: number): void {
        TaskStorage.DEFAULT.deleteTask(taskId)
            .then(() => this.loadTasks())
        ;
    }

    /**
     * Renders the list items.
     */
    private renderListItems(rawItems: string): JSX.Element {
        const list: Task[] = JSON.parse(rawItems);

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
                                            <Button basic size='mini' onClick={() => this.markTaskAsDone(item.id as number)} primary>Done</Button>
                                        </div>
                                        <Button basic color={"green"} size={"mini"} icon onClick={() => this.performTaskFormOpen(item.id as number)}>
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
                                            <div style={{display: "inline"}} onClick={() => this.performTaskFormOpen(item.id as number)}>
                                                {item.tasktext}
                                            </div>
                                            <div style={{display: "inline", marginLeft: "1rem"}}>
                                                <Button basic size='mini' color={"grey"} onClick={() => this.markTaskAsUndone(item.id as number)}>
                                                    Undone
                                                </Button>
                                                <Button basic color={"green"} size={"mini"} icon onClick={() => this.performTaskFormOpen(item.id as number)}>
                                                    <Icon name='pencil alternate' />
                                                </Button>
                                                <Button basic color={"red"} size={"mini"} icon onClick={() => this.deleteTask(item.id as number)}>
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
