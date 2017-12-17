"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var React = require("react");
var store = require("@redux-store");
// import store = require('../../data-stores/redux-store');
var art_child_1 = require("./children/art-child");
module.exports = (function (_super) {
    __extends(Home, _super);
    function Home(props) {
        return _super.call(this, props) || this;
    }
    Home.prototype.componentDidMount = function () {
        var s = store.getState();
        this.unsubscribe = store.subscribe(function () {
            console.log('home is subscribed.');
        });
    };
    Home.prototype.componentWillUnmount = function () {
        console.log('component will unsubscribe');
        this.unsubscribe();
    };
    Home.prototype.render = function () {
        art_child_1.default = require('./children/art-child').default;
        return (<div>
                Wekkkpp zoom peaches
                <art_child_1.default />
            </div>);
    };
    return Home;
}(React.Component));
