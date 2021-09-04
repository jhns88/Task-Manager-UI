import {TaskStorage} from "./TaskStorage";
import {Task} from "../Task";

/**
 * Tests the task storage component.
 */
describe('Task Storage', () => {

  it("should be empty on start", done => {
    TaskStorage.DEFAULT.reset().getTasks()
      .then(tasks => {
        expect(tasks).toEqual([]);
        done();
      })
      .catch(err => {
        done(err)
      })
    ;
  });

  it("should have one task listed after one was added", done => {
    const newTask: Task = {
      "done": false,
      "tasktext": "any task content"
    };

    TaskStorage.DEFAULT.reset().saveTask(newTask)
      .then(() => {
        TaskStorage.DEFAULT.getTasks()
          .then(tasks => {
            expect(tasks).toContain(newTask);
            done();
          })
          .catch(err => {
            done(err);
          })
        ;
      })
    ;
  });


  it("handles deletions correctly", done => {
    const newTask: Task = {
      "done": false,
      "tasktext": "any task content"
    };

    TaskStorage.DEFAULT.reset().saveTask(newTask)
      .then(() => {
        TaskStorage.DEFAULT.getTasks()
          .then(tasks => {
            const firstTask: Task = (tasks.pop() as Task);

            TaskStorage.DEFAULT.deleteTask(firstTask.id as number)
              .then(() => {
                TaskStorage.DEFAULT.getTasks()
                  .then(tasks => {
                    expect(tasks).toEqual([]);
                    done();
                  })
                  .catch(err => done(err))
                ;
              })
              .catch(err => done(err))
            ;
          })
        ;
      })
    ;
  });
});
