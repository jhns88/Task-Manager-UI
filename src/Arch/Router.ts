type PageChangeListenerFunc = (page: string, props: object) => void;

interface PageChangeListener {
    [key: string]: PageChangeListenerFunc;
}

/**
 * The router which allows to change app page context.
 */
export class Router {

    /**
     * The router singleton instance.
     */
    private static instance: (Router | undefined);

    /**
     * A list of page change listeners.
     */
    private pageChangeListeners: PageChangeListener = {};

    /**
     * Returns the router instance.
     */
    public static getInstance(): Router {
        let instance: (Router | undefined) = Router.instance

        // create instance on demand
        if (instance === undefined) {
            instance = Router.instance = new Router();
        }

        return instance;
    }

    /**
     * Allows to switch the page.
     */
    public switchPage(page: string, props: object = {}): void {
        for (let id in this.pageChangeListeners) {
            this.pageChangeListeners[id](page, props);
        }
    }

    /**
     * Allows to add an page change listener to the router and returns a ref id which allows
     * to clear the listener afterwards.
     */
    public addOnPageChangeListener(listener: PageChangeListenerFunc): string {
        const id: string = Math.random().toString(36).substr(2, 9);

        this.pageChangeListeners[id] = listener;

        return id;
    }

    /**
     * Unsubscribes listener with id.
     */
    public unsubscribePageChangeListener(id: string): void {
        delete this.pageChangeListeners[id];
    }
}
