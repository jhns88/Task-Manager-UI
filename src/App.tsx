import './App.css';
import 'semantic-ui-css/semantic.min.css'
import {Menu, Container, Header} from "semantic-ui-react";
import {Router as CoreRouter} from "./Arch/Router";
import {Form as TaskForm} from "./Pages/Tasks/Form";
import {List as TaskList} from "./Pages/Tasks/List";
import React from "react";
import {Router} from "./Components/Router";

interface AppProps {

}

interface AppState {
    page: string;
}

class App extends React.Component<AppProps, AppState> {

    /**
     * Switches the app page.
     */
    private switchPage(pageName: string): void {
        debugger;

        CoreRouter.getInstance().switchPage(pageName);
    }

    /**
     * @inheritDoc
     */
    public render() {
        return (
            <div>
                <Menu fixed='top' inverted>
                    <Container>
                        <Menu.Item as='a' header>
                            Task Manager
                        </Menu.Item>
                        <Menu.Item as='a' onClick={() => this.switchPage("task.list")}>Tasks</Menu.Item>
                        <Menu.Item as='a' onClick={() => this.switchPage("task.form")}>Test Task Form</Menu.Item>
                    </Container>
                </Menu>

                <Container style={{ marginTop: '5em' }}>
                    <Router
                        defaultPage="task.list"
                        pages={{
                            "task.list": () => <TaskList/>,
                            "task.form": () => <TaskForm/>
                        }}
                    />
                </Container>
            </div>
        );
    }
}

export default App;
