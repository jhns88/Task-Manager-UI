import {Task} from "../Task";
import {AxiosResponse} from "axios";

const axios = require('axios').default;


interface Tasks {
    [key: string]: Task;
}

/**
 *
 */
export class TaskStorage {

    public static DEFAULT = new TaskStorage();

    /**
     * The available tasks
     */
    private tasks: Tasks = {};

    /**
     * Loads available tasks from the server.
     */
    public getTasks(): Promise<Task[]> {
        return new Promise<Task[]>(resolve => {
            // axios({
            //     "method": 'get',
            //     "url": 'http://localhost:8080/tasks'
            // }).then((response: AxiosResponse) => {
            //     resolve(response.data);
            // });

            resolve([]); // TODO
        });
    }


    public getTask(id: number): (Task | undefined) {
        return this.tasks[id];
    }

    public saveTask(task: Task): Promise<void> {
        return new Promise(resolve => {
            // axios({
            //     "method": 'put',
            //     "url": 'http://localhost:8080/tasks/' + taskId,
            //     "crossdomain": true,
            //     "data": {
            //         "done": false
            //     }
            // }).then((response: AxiosResponse) => {
            //     this.loadTasks();
            // });
        });
    }


    /**
     * Allows to delete a task.
     */
    public deleteTask(id: number): Promise<void> {
        return new Promise(resolve => {
            // axios({
            //     "method": 'delete',
            //     "url": process.env.REACT_APP_SERVER_URL + '/tasks/' + id,
            //     "crossdomain": true
            // }).then(() => {
            //     resolve();
            // });

            // TODO
        });
    }
}
