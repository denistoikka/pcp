import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

export default class PersonsSlideMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isHovered: false};
    }

    componentWillReceiveProps({cursorPosition, canBlobMove, onHover, onHoverOver, hideNotHoveredMenus, scale}) {
        // detect whether movable blob is hovering current element

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

            if(isCursorInsideItem) {
                if(!hideNotHoveredMenus) setTimeout(onHover, 0);
                this.setState({isHovered: true});
            } else {
                if(hideNotHoveredMenus && this.state.isHovered) {
                    setTimeout(onHoverOver, 0);
                }
                this.setState({isHovered: false});
            }
        } else if(this.state.isHovered) {
            if(hideNotHoveredMenus && this.state.isHovered) {
                setTimeout(onHoverOver, 0);
            }
            this.setState({isHovered: false});
        }
    }

    render() {
        const {isHovered} = this.state;
        const {children, position, hasBlobMoved, hideNotHoveredMenus, cursorPosition, onSelect, scale} = this.props;

        const item = name => {
            return <PersonsSlideMenuItem name={name}
                                         isParentHovered={isHovered}
                                         cursorPosition={cursorPosition}
                                         onSelect={value => {console.log(value)}}
                                         scale={scale}/>;
        };

        return (
            <div className={classNames({
                "persons-slide-menu": true,
                "persons-slide-menu-top": position == "top",
                "persons-slide-menu-bottom": position == "bottom",
                "persons-slide-menu-hidden": !hasBlobMoved || (hideNotHoveredMenus && !isHovered),
                "persons-slide-menu-hovered": isHovered
            })}>
                <div className={classNames({
                    "persons-slide-menu-preview": true
                })}>
                    {children}
                </div>
                <div className="persons-slide-menu-content">
                    {item("Chester Bennington")}
                    {item("Mike Shinoda")}
                    {item("Joe Hahn")}
                    {item("Brad Delson")}
                </div>
            </div>
        )
    }
}

class PersonsSlideMenuItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isHovered: false};
    }

    componentWillReceiveProps({isParentHovered, cursorPosition, onSelect, name, scale}) {
        // detect whether movable blob is hovering current element

        if(isParentHovered) {
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
            onSelect(name);
        }
    }

    render() {
        const nameParts = this.props.name.split(" ");
        let initials = "";
        nameParts.forEach(part => {if(part) initials = initials + part[0]});

        return (
            <div className={classNames({
                "persons-slide-menu-item": true,
                "persons-slide-menu-item-hovered": this.state.isHovered
            })}>
                <div className="persons-slide-menu-item-name">{this.props.name}</div>
                <div className="persons-slide-menu-item-initials">{initials}</div>
            </div>
        )
    }
}
