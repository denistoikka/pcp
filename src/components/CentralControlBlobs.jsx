import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

class BigCentralBlob extends React.Component {
    constructor(props) {
        super(props);
        this.state = {animateBlob: false};
    }

    onMouseUp(evt) {
        const {canBlobMove, hasBlobMoved, onMouseUp} = this.props;
        onMouseUp(evt);

        // animate blob beating
        if(canBlobMove && !hasBlobMoved) this.setState({animateBlob: true});
    }

    onMouseDown(evt) {
        const {isTouchStarted, onMouseDown} = this.props;
        if(!isTouchStarted) {
            this.setState({animateBlob: false});
            onMouseDown(evt, $(ReactDOM.findDOMNode(this)));
        }
    }

    onTouchStart(evt) {
        this.onMouseDown(evt);
    }

    render() {
        return (
            <div className={classNames({
                "big-central-blob": true,
                "big-central-blob-animate": this.state.animateBlob
            })}
                 onTouchStart={this.onTouchStart.bind(this)}
                 onMouseDown={this.onMouseDown.bind(this)}
                 onMouseUp={this.onMouseUp.bind(this)}>
                <div className="big-central-blob-value">
                    <span className="glyphicon glyphicon-euro"/>
                    <span className="big-central-blob-value-euro">5.</span>
                    <span className="big-central-blob-value-cents">01</span>
                </div>
            </div>
        )
    }
}

class SmallMovableBlob extends React.Component {
    render() {
        const {isBlobMovable, movableBlobPosition: mbp, hasBlobMoved} = this.props;
        let transform = "";
        if(isBlobMovable) {
            const translateX = mbp.x-100;
            const translateY = mbp.y-100;
            transform = "translate(" + translateX + "px, " + translateY + "px)";
        }
        return (
            <div style={{transform}}
                 className={classNames({
                    "small-movable-blob": true,
                    "small-movable-blob-visible": hasBlobMoved
                 })}>
            </div>
        )
    }
}

export default class CentralControlBlobs extends React.Component {
    render() {
        const {isTouchStarted, hasBlobMoved, canBlobMove, movableBlobPosition,
            onCentralBlobMouseUp, onCentralBlobMouseDown} = this.props;
        return (
            <div>
                <div className="central-control-blobs">
                    <SmallMovableBlob isBlobMovable={canBlobMove}
                                      movableBlobPosition={movableBlobPosition}
                                      hasBlobMoved={hasBlobMoved}/>
                    <BigCentralBlob isTouchStarted={isTouchStarted}
                                    hasBlobMoved={hasBlobMoved}
                                    canBlobMove={canBlobMove}
                                    onMouseUp={onCentralBlobMouseUp}
                                    onMouseDown={onCentralBlobMouseDown}/>
                </div>
                <div dangerouslySetInnerHTML={{__html: `
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="0" height="0">
                        <defs>
                            <filter id="goo">
                                <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                                <feColorMatrix in="blur" mode="matrix"
                                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                                <feBlend in="SourceGraphic" in2="goo" />
                            </filter>
                        </defs>
                    </svg>
                `}}></div>
            </div>
        )
    }
}
