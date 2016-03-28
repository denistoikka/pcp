import React from 'react';
import ReactDOM from 'react-dom';

import SavingBlobs from './components/SavingBlobs.jsx';
import CentralControlBlobs from './components/CentralControlBlobs.jsx';
import ExpandingMenu from './components/ExpandingMenu.jsx';
import PersonsSlideMenu from './components/PersonsSlideMenu.jsx';

class Main extends React.Component {
    constructor(props) {
        super(props);

        // resize control menu so that it fulfill all available space
        // that is not the way it should be, but is fine for the test assignment
        const scale = window.innerHeight / 640;

        this.state = {
            isTouchStarted: false,
            isMenuExpanded: false,
            hideExpandedMenuTimeout: null,
            canBlobMove: false,
            hasBlobMoved: false,
            movableBlobPosition: {x: 0, y: 0},
            cursorPosition: {x: 0, y: 0},
            hideNotHoveredMenus: false,
            scale
        };
    }

    onToggleExpandedMenu() {
        const {hasBlobMoved, isMenuExpanded, hideExpandedMenuTimeout} = this.state;
        if(isMenuExpanded) {
            if(hideExpandedMenuTimeout) clearTimeout(hideExpandedMenuTimeout);
            this.setState({isMenuExpanded: false, hideExpandedMenuTimeout: null});
        } else if(!hasBlobMoved) {
            const timeout = setTimeout(this.onToggleExpandedMenu.bind(this), 7000);
            this.setState({isMenuExpanded: true, hideExpandedMenuTimeout: timeout});

        }
    }

    onCentralControlMouseUp(evt) {
        this.onToggleExpandedMenu(evt);
    }

    onCentralControlMouseDown(evt, target) {
        // prepare movable blob for activity

        const {scale} = this.state;

        let eventX = evt.pageX;
        let eventY = evt.pageY;
        if(evt.type == "touchstart") {
            eventX = evt.touches[0].pageX;
            eventY = evt.touches[0].pageY;
            this.setState({isTouchStarted: true});
        }

        eventX = eventX / scale;
        eventY = eventY / scale;

        const offset = $(target).offset();
        let offsetX = eventX - offset.left / scale;
        let offsetY = eventY - offset.top / scale;

        this.setState({
            canBlobMove: true,
            movableBlobPosition: {x: offsetX, y: offsetY},
            cursorPosition: {x: eventX, y: eventY}
        });
    }

    onMouseUp(evt) {
        // release movable blob if needed

        this.setState({canBlobMove: false, hasBlobMoved: false});
    }

    onMouseMove(evt) {
        // handle activity of movable blob if needed

        const {canBlobMove, movableBlobPosition: mbp, cursorPosition: previousCursorPosition, scale} = this.state;

        if(canBlobMove) {
            evt.preventDefault();
            evt.stopPropagation();

            let eventX = evt.pageX;
            let eventY = evt.pageY;
            if(evt.type == "touchmove") {
                eventX = evt.touches[0].pageX;
                eventY = evt.touches[0].pageY;
            }

            eventX = eventX / scale;
            eventY = eventY / scale;

            const dx = eventX - previousCursorPosition.x;
            const dy = eventY - previousCursorPosition.y;

            if(dx || dy) {
                this.setState({
                    hasBlobMoved: true,
                    movableBlobPosition: {x: mbp.x + dx, y: mbp.y + dy},
                    cursorPosition: {x: eventX, y: eventY}
                });

                setTimeout(this.onToggleExpandedMenu.bind(this), 0);
            }
        }
    }

    onTouchEnd(evt) {
        this.setState({isTouchStarted: false});
        setTimeout(this.onMouseUp.bind(this, evt), 0); // setTimeout - to prevent unnecessary menu expanding
    }

    onTouchMove(evt) {
        this.onMouseMove(evt);
    }

    onSlideMenuHover() {
        // hide one of slide menus (request or pay)
        this.setState({hideNotHoveredMenus: true});
    }

    onSlideMenuHoverOver() {
        // hide one of slide menus (request or pay)
        this.setState({hideNotHoveredMenus: false});
    }

    render() {
        const {isTouchStarted, isMenuExpanded, hasBlobMoved, canBlobMove,
            movableBlobPosition, cursorPosition, hideNotHoveredMenus, scale} = this.state;
        return (
            <div className="pocopay-app"
                 onTouchEnd={this.onTouchEnd.bind(this)}
                 onTouchMove={this.onTouchMove.bind(this)}
                 onMouseUp={this.onMouseUp.bind(this)}
                 onMouseMove={this.onMouseMove.bind(this)}>
                <div className="control-menu" style={{transform: "scale(" + scale + ")"}}>
                    <PersonsSlideMenu position="top"
                                      cursorPosition={cursorPosition}
                                      canBlobMove={canBlobMove}
                                      scale={scale}
                                      hasBlobMoved={hasBlobMoved}
                                      hideNotHoveredMenus={hideNotHoveredMenus}
                                      onHover={this.onSlideMenuHover.bind(this)}
                                      onHoverOver={this.onSlideMenuHoverOver.bind(this)}>
                        Request
                    </PersonsSlideMenu>
                    <PersonsSlideMenu position="bottom"
                                      cursorPosition={cursorPosition}
                                      canBlobMove={canBlobMove}
                                      scale={scale}
                                      hasBlobMoved={hasBlobMoved}
                                      hideNotHoveredMenus={hideNotHoveredMenus}
                                      onHover={this.onSlideMenuHover.bind(this)}
                                      onHoverOver={this.onSlideMenuHoverOver.bind(this)}>
                        Pay
                    </PersonsSlideMenu>
                    <ExpandingMenu isMenuExpanded={isMenuExpanded}/>
                    <SavingBlobs cursorPosition={cursorPosition}
                                 canBlobMove={canBlobMove}
                                 hasBlobMoved={hasBlobMoved}
                                 hideNotHoveredMenus={hideNotHoveredMenus}
                                 scale={scale}/>
                    <CentralControlBlobs isTouchStarted={isTouchStarted}
                                         hasBlobMoved={hasBlobMoved}
                                         canBlobMove={canBlobMove}
                                         movableBlobPosition={movableBlobPosition}
                                         onCentralBlobMouseDown={this.onCentralControlMouseDown.bind(this)}
                                         onCentralBlobMouseUp={this.onCentralControlMouseUp.bind(this)}/>
                </div>
            </div>
        )
    }
}

const target = document.getElementById('react-root');
window.onload = () => {
    ReactDOM.render(<Main />, target);
};
