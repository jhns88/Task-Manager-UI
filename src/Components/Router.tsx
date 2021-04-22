import React from "react";
import {Router as CoreRouter} from "../Arch/Router";

/**
 * A defaultPage can be any react component.
 */
type PageDefinition = JSX.Element;


interface PageDefinitions {

    /**
     *
     */
    [key: string]: () => PageDefinition;
}

/**
 * The router component props
 */
export interface RouterProps {

    /**
     * An object with defaultPage definitions.
     */
    pages: PageDefinitions;

    defaultPage: string;
}

export interface RouterState {

    page: string;
}

/**
 * A router for resource routing.
 */
export class Router extends React.PureComponent<RouterProps, RouterState> {

    /**
     *
     */
    private mounted: boolean = false;

    /**
     * The router constructor.
     */
    constructor(props: RouterProps, state: RouterState) {
        super(props, state);

        this.state = {
            "page": props.defaultPage
        };
    }

    /**
     * @inheritDoc
     */
    public componentDidMount() {
        this.mounted = true;

        CoreRouter.getInstance().addOnPageChangeListener(page => {
            if (this.mounted === true) {
                this.setState({
                    "page": page
                });
            }
        });
    }

    /**
     * @inheritDoc
     */
    public componentWillUnmount() {
        this.mounted = false;
    }

    /**
     * @inheritDoc
     */
    public render() {
        let page: string = this.state.page;

        return (
            <div>
                {this.props.pages[page]()}
            </div>
        );
    }
}
