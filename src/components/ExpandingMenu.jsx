import React from 'react';
import classNames from 'classnames';

class ExpandingMenuItem extends React.Component {
    render() {
        const {isMenuExpanded, onSelect, children} = this.props;
        return (
            <div className={classNames({
                    "expanding-menu-item": true,
                    "expanding-menu-item-expanded": isMenuExpanded
                })}
                 onClick={onSelect}>
                {children}
            </div>
        )
    }
}

export default class ExpandingMenu extends React.Component {
    render() {
        const {isMenuExpanded} = this.props;
        return (
            <div className="expanding-menu">
                <ExpandingMenuItem isMenuExpanded={isMenuExpanded} onSelect={() => {console.log("History")}}>
                    <div className="expanding-menu-item-title">History</div>
                    <div className="expanding-menu-item-icon"><span className="glyphicon glyphicon-menu-left"/></div>
                </ExpandingMenuItem>
                <ExpandingMenuItem isMenuExpanded={isMenuExpanded} onSelect={() => {console.log("Rquests")}}>
                    <div className="expanding-menu-item-title">Requests</div>
                    <div className="expanding-menu-item-icon"><span className="glyphicon glyphicon-plus"/></div>
                </ExpandingMenuItem>
                <ExpandingMenuItem isMenuExpanded={isMenuExpanded} onSelect={() => {console.log("Future")}}>
                    <div className="expanding-menu-item-title">Future</div>
                    <div className="expanding-menu-item-icon"><span className="glyphicon glyphicon-menu-right"/></div>
                </ExpandingMenuItem>
                <ExpandingMenuItem isMenuExpanded={isMenuExpanded} onSelect={() => {console.log("Card")}}>
                    <div className="expanding-menu-item-title">Card</div>
                    <div className="expanding-menu-item-icon"><span className="glyphicon glyphicon-credit-card"/></div>
                </ExpandingMenuItem>
                <ExpandingMenuItem isMenuExpanded={isMenuExpanded} onSelect={() => {console.log("Payments")}}>
                    <div className="expanding-menu-item-title">Payments</div>
                    <div className="expanding-menu-item-icon"><span className="glyphicon glyphicon-minus"/></div>
                </ExpandingMenuItem>
                <ExpandingMenuItem isMenuExpanded={isMenuExpanded} onSelect={() => {console.log("Me")}}>
                    <div className="expanding-menu-item-title">Me</div>
                    <div className="expanding-menu-item-icon"><span className="glyphicon glyphicon-user"/></div>
                </ExpandingMenuItem>
            </div>
        )
    }
}
