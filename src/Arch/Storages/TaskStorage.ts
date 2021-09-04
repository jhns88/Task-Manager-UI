import {Task} from "../Task";
import {AxiosResponse} from "axios";
import {Router} from "../Router";
import {CommonTaskPage} from "../../Pages/Tasks/Common";

const axios  = require('axios').default;

interface Tasks {
    [key: string]: Task;
}


// process.env.NODE_ENV Disabled during presentation purpose
const syncWithBackend: boolean = false;

/**
 * Stores and synchronizes tasks.
 */
export class TaskStorage {

    /**
     * A single default task storage instance.
     */
    public static DEFAULT = new TaskStorage();

    /**
     * The internal tasks cache.
     */
    private tasks: Tasks = {};

    /**
     * Loads available tasks from the server.
     */
    public getTasks(): Promise<Task[]> {
        return new Promise<Task[]>(resolve => {
            if (syncWithBackend === true) {
                axios({
                    "method": 'get',
                    "url": process.env.REACT_APP_SERVER_URL + "/tasks"
                }).then((response: AxiosResponse) => {
                    resolve(response.data);
                });
            } else {
                resolve(Object.values(this.tasks));
            }
        });
    }

    /**
     * Loads available tasks from the server.
     */
    private syncTasksFromServer(): Promise<Task[]> {
        return new Promise<Task[]>(resolve => {
            if (syncWithBackend === true) {
                axios({
                    "method": 'get',
                    "url": process.env.REACT_APP_SERVER_URL + "/tasks"
                }).then((response: AxiosResponse) => {
                    // reset
                    this.tasks = {};

                    response.data.forEach((task: Task) => {
                        this.tasks[task.id as number] = task;
                    });

                    resolve(Object.values(this.tasks));
                });
            } else {
                resolve(Object.values(this.tasks));
            }
        });
    }

    public getTask(id: number): (Task | undefined) {
        return this.tasks[id];
    }

    public saveTask(task: Task): Promise<void> {
        return new Promise(resolve => {
            const idAssigned: boolean = (task.id !== undefined);
            const id: number = (task.id ?? Object.keys(this.tasks).length);

            task.id = id;
            this.tasks[id] = task;

            // synchronize with backend on production env
            if (syncWithBackend === true) {
                axios({
                    "method": (idAssigned === true ? 'put' : "post"),
                    "url": process.env.REACT_APP_SERVER_URL + '/tasks' + task.id,
                    "crossdomain": true,
                    "data": task
                }).then((response: AxiosResponse) => {
                    this.syncTasksFromServer()
                        .finally(() => {
                            resolve();
                        })
                    ;
                });
            } else {
                resolve();
            }
        });
    }

    /**
     * Allows to delete a task.
     */
    public deleteTask(id: number): Promise<void> {
        return new Promise(resolve => {
            delete this.tasks[id];

            if (syncWithBackend === true) {
                axios({
                    "method": 'delete',
                    "url": process.env.REACT_APP_SERVER_URL + '/tasks/' + id,
                    "crossdomain": true
                }).then(() => {
                    resolve();
                });
            } else {
                resolve();
            }
        });
    }

    /**
     * Resets the task storage.
     */
    public reset(): TaskStorage {
        this.tasks = {};
        return this;
    }
}
