import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

class SavingBlob extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isHovered: false};
    }

    componentWillReceiveProps({cursorPosition, canBlobMove, onSelect, scale}) {
        // detect whether movable blob is hovering current element
        // apply action if current blob is hovered and movable blob has finished its movement

        if(canBlobMove) {
            const item = $(ReactDOM.findDOMNode(this));
            const offset = item.offset();
            const offsetLeft = offset.left / scale;
            const offsetTop = offset.top / scale;
            const width = item.outerWidth();
            const height = item.outerHeight();
            const {x, y} = cursorPosition;

            const isCursorInsideItem = offsetLeft < x  && x < (offsetLeft + width)
                && offsetTop < y && y < (offsetTop + height);

            this.setState({isHovered: isCursorInsideItem});
        } else if(this.state.isHovered) {
            this.setState({isHovered: false});
            onSelect();
        }
    }

    render() {
        const {hasBlobMoved, hideNotHoveredMenus, onSelect} = this.props;
        return (
            <div className={classNames({
                    "saving-blob": true,
                    "saving-blob-visible": hasBlobMoved && !hideNotHoveredMenus,
                    "saving-blob-hover": this.state.isHovered
                })}
                 onClick={onSelect}>
                <div className="saving-blob-inner">
                    Save
                </div>
            </div>
        )
    }
}

export default class SavingBlobs extends React.Component {
    render() {
        return (
            <div>
                <SavingBlob {...this.props} onSelect={() => {console.log("Save 1")}}/>
                <SavingBlob {...this.props} onSelect={() => {console.log("Save 2")}}/>
                <SavingBlob {...this.props} onSelect={() => {console.log("Save 3")}}/>
            </div>
        )
    }
}
