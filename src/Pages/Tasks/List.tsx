import React from "react";
import {AxiosPromise, AxiosResponse} from "axios";
import {Router} from "../../Arch/Router";
import {CommonTaskPage} from "./Common";


interface ListProps {
}

interface ListStates {

    listdata?: string; // json data
}

const axios = require('axios').default;


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
        axios({
            "method": 'get',
            "url": 'http://localhost:8080/tasks',
            "crossdomain": true
        }).then((response: AxiosResponse) => {
            this.setState({
               "listdata": JSON.stringify(response.data)
            });
        });
    }

    /**
     * Renders the list items.
     */
    private renderListItems(rawItems: string): JSX.Element {
        const parsedData: ListItem[] = JSON.parse(rawItems);

        return (
            <ul>
                {parsedData.map(listItem => {
                    return (
                        <li
                            onClick={() => this.performTaskFormOpen(listItem.id)}
                        >{listItem.tasktext}</li>
                    );
                })}
            </ul>
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
                {this.state.listdata === undefined
                    ? "Loading"
                    : this.renderListItems(this.state.listdata)
                }
            </div>
        );
    }
}
