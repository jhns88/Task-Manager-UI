type PageChangeListener = (page: string) => void;

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
    private pageChangeListeners: PageChangeListener[] = [];

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
    public switchPage(page: string): void {
        this.pageChangeListeners.forEach(listener => listener(page));
    }

    /**
     * Allows to add an page change listener to the router.
     */
    public addOnPageChangeListener(listener: PageChangeListener): void {
        this.pageChangeListeners.push(listener);
    }
}
