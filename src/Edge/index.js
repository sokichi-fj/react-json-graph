/* @flow */
import React, {Component} from 'react';
import type {ElementRef as ReactElementRef} from 'react';

import Node from '../Node';
import styles from './edge.css';

type Props = {
    source: ReactElementRef<typeof Node>,
    target: ReactElementRef<typeof Node>,
};

type State = {
    path: ?string,
};

type Rect = {
    x: number,
    y: number,
    width: number,
    height: number,
};

class Edge extends Component<Props, State> {
    source: ReactElementRef<typeof Node>;
    target: ReactElementRef<typeof Node>;

    static vertiacalLinkPath(source: Rect, target: Rect):string {
        return 'M' + source.x + ',' + source.y
            + 'C' + source.x + ',' + (source.y + target.y) / 2
            + ' ' + target.x + ',' + (source.y + target.y) / 2
            + ' ' + target.x + ',' + target.y;
    }

    static horizontalLinkPath(source: Rect, target: Rect):string {
        const sourceX = source.x + source.width;
        const sourceY = source.y + (source.height / 2);
        const targetY = target.y + (target.height / 2);

        return 'M' + sourceX + ',' + sourceY
            + 'C' + (sourceX + target.x) / 2 + ',' + sourceY
            + ' ' + (sourceX + target.x) / 2 + ',' + targetY
            + ' ' + target.x + ',' + targetY;
    }

    constructor(props: Props) {
        super(props);

        this.state = {
            source: props.source,
            target: props.target,
        };
    }

    componentWillReceiveProps(nextProps) {
        const {source, target} = this.state;

        if (nextProps.source.id !== source.id) {
            this.setState({source: nextProps.source});
        }

        if (nextProps.target.id !== target.id) {
            this.setState({target: nextProps.target});
        }
    }

    toJSON(): {source: string, target: string} {
        const {source, target} = this.state;

        return {
            source: source.id,
            target: target.id,
        };
    }

    getPath() {
        const {source, target} = this.state;
        return Edge.horizontalLinkPath(source, target);
    }

    render() {
        const path = this.getPath();

        return (
            <path className={styles.root} d={path} />
        );
    }
}

export default Edge;
