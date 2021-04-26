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
    [key: string]: (props: any) => PageDefinition;
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
    props: string;
}

/**
 * A router for resource routing.
 */
export class Router extends React.PureComponent<RouterProps, RouterState> {

    /**
     * TRUE if the router is mounted.
     */
    private mounted: boolean = false;

    /**
     * A reference identifier of the subscribes router page change listener.
     */
    private pageChangeListenerRefId: (string | undefined);

    /**
     * The router constructor.
     */
    constructor(props: RouterProps, state: RouterState) {
        super(props, state);

        this.state = {
            "page": props.defaultPage,
            "props": JSON.stringify({})
        };
    }

    /**
     * @inheritDoc
     */
    public componentDidMount(): void {
        this.mounted = true;

        this.pageChangeListenerRefId = CoreRouter.getInstance().addOnPageChangeListener(
            (page: string, props: object) => {
                if (this.mounted === true) {
                    this.setState({
                        "page": page,
                        "props": JSON.stringify(props)
                    });
                }
            }
        );
    }

    /**
     * @inheritDoc
     */
    public componentWillUnmount(): void {
        this.mounted = false;

        this.pageChangeListenerRefId && CoreRouter.getInstance().unsubscribePageChangeListener(
            this.pageChangeListenerRefId
        );
    }

    /**
     * @inheritDoc
     */
    public render() {
        return (
            <div>
                {this.props.pages[this.state.page](
                    JSON.parse(this.state.props)
                )}
            </div>
        );
    }
}
