/*****************************************************************************
 * Open MCT Web, Copyright (c) 2014-2015, United States Government
 * as represented by the Administrator of the National Aeronautics and Space
 * Administration. All rights reserved.
 *
 * Open MCT Web is licensed under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * Open MCT Web includes source code licensed under additional open source
 * licenses. See the Open Source Licenses file (LICENSES.md) included with
 * this source code distribution or the Licensing information page available
 * at runtime from the About dialog for additional information.
 *****************************************************************************/
/*global define*/

define(['legacyRegistry'], function (legacyRegistry) {
    "use strict";
    legacyRegistry.register("platform/commonUI/general", {
        "name": "General UI elements",
        "description": "General UI elements, meant to be reused across modes",
        "resources": "res",
        "extensions": {
            "services": [
                {
                    "key": "urlService",
                    "implementation": "services/UrlService.js",
                    "depends": [ "$location" ]
                },
                {
                    "key": "popupService",
                    "implementation": "services/PopupService.js",
                    "depends": [ "$document", "$window" ]
                }
            ],
            "runs": [
                {
                    "implementation": "StyleSheetLoader.js",
                    "depends": [ "stylesheets[]", "$document", "THEME" ]
                },
                {
                    "implementation": "UnsupportedBrowserWarning.js",
                    "depends": [ "notificationService", "agentService" ]
                }
            ],
            "stylesheets": [
                {
                    "stylesheetUrl": "css/normalize.min.css",
                    "priority": "mandatory"
                }
            ],
            "templates": [
                {
                    "key": "bottombar",
                    "templateUrl": "templates/bottombar.html"
                },
                {
                    "key": "action-button",
                    "templateUrl": "templates/controls/action-button.html"
                },
                {
                    "key": "input-filter",
                    "templateUrl": "templates/controls/input-filter.html"
                },
                {
                    "key": "indicator",
                    "templateUrl": "templates/indicator.html"
                },
                {
                    "key": "message-banner",
                    "templateUrl": "templates/message-banner.html"
                },
                {
                    "key": "progress-bar",
                    "templateUrl": "templates/progress-bar.html"
                },
                {
                  "key": "time-controller",
                  "templateUrl": "templates/controls/time-controller.html"
                }
            ],
            "controllers": [
                {
                    "key": "TimeRangeController",
                    "implementation": "controllers/TimeRangeController.js",
                    "depends": [ "$scope", "formatService", "DEFAULT_TIME_FORMAT", "now" ]
                },
                {
                    "key": "DateTimePickerController",
                    "implementation": "controllers/DateTimePickerController.js",
                    "depends": [ "$scope", "now" ]
                },
                {
                    "key": "DateTimeFieldController",
                    "implementation": "controllers/DateTimeFieldController.js",
                    "depends": [ "$scope", "formatService", "DEFAULT_TIME_FORMAT" ]
                },
                {
                    "key": "TreeNodeController",
                    "implementation": "controllers/TreeNodeController.js",
                    "depends": [ "$scope", "$timeout" ]
                },
                {
                    "key": "ActionGroupController",
                    "implementation": "controllers/ActionGroupController.js",
                    "depends": [ "$scope" ]
                },
                {
                    "key": "ToggleController",
                    "implementation": "controllers/ToggleController.js"
                },
                {
                    "key": "ContextMenuController",
                    "implementation": "controllers/ContextMenuController.js",
                    "depends": [ "$scope" ]
                },
                {
                    "key": "ClickAwayController",
                    "implementation": "controllers/ClickAwayController.js",
                    "depends": [ "$scope", "$document" ]
                },
                {
                    "key": "ViewSwitcherController",
                    "implementation": "controllers/ViewSwitcherController.js",
                    "depends": [ "$scope", "$timeout" ]
                },
                {
                    "key": "BottomBarController",
                    "implementation": "controllers/BottomBarController.js",
                    "depends": [ "indicators[]" ]
                },
                {
                    "key": "GetterSetterController",
                    "implementation": "controllers/GetterSetterController.js",
                    "depends": [ "$scope" ]
                },
                {
                    "key": "SplitPaneController",
                    "implementation": "controllers/SplitPaneController.js"
                },
                {
                    "key": "SelectorController",
                    "implementation": "controllers/SelectorController.js",
                    "depends": [ "objectService", "$scope" ]
                },
                {
                    "key": "ObjectInspectorController",
                    "implementation": "controllers/ObjectInspectorController.js",
                    "depends": [ "$scope", "objectService" ]
                },
                {
                    "key": "BannerController",
                    "implementation": "controllers/BannerController.js",
                    "depends": ["$scope", "notificationService", "dialogService"]
                }
            ],
            "directives": [
                {
                    "key": "mctContainer",
                    "implementation": "directives/MCTContainer.js",
                    "depends": [ "containers[]" ]
                },
                {
                    "key": "mctDrag",
                    "implementation": "directives/MCTDrag.js",
                    "depends": [ "$document" ]
                },
                {
                    "key": "mctClickElsewhere",
                    "implementation": "directives/MCTClickElsewhere.js",
                    "depends": [ "$document" ]
                },
                {
                    "key": "mctResize",
                    "implementation": "directives/MCTResize.js",
                    "depends": [ "$timeout" ]
                },
                {
                    "key": "mctPopup",
                    "implementation": "directives/MCTPopup.js",
                    "depends": [ "$compile", "popupService" ]
                },
                {
                    "key": "mctScrollX",
                    "implementation": "directives/MCTScroll.js",
                    "depends": [ "$parse", "MCT_SCROLL_X_PROPERTY", "MCT_SCROLL_X_ATTRIBUTE" ]
                },
                {
                    "key": "mctScrollY",
                    "implementation": "directives/MCTScroll.js",
                    "depends": [ "$parse", "MCT_SCROLL_Y_PROPERTY", "MCT_SCROLL_Y_ATTRIBUTE" ]
                },
                {
                    "key": "mctSplitPane",
                    "implementation": "directives/MCTSplitPane.js",
                    "depends": [ "$parse", "$log", "$interval" ]
                },
                {
                    "key": "mctSplitter",
                    "implementation": "directives/MCTSplitter.js"
                }
            ],
            "constants": [
                {
                    "key": "MCT_SCROLL_X_PROPERTY",
                    "value": "scrollLeft"
                },
                {
                    "key": "MCT_SCROLL_X_ATTRIBUTE",
                    "value": "mctScrollX"
                },
                {
                    "key": "MCT_SCROLL_Y_PROPERTY",
                    "value": "scrollTop"
                },
                {
                    "key": "MCT_SCROLL_Y_ATTRIBUTE",
                    "value": "mctScrollY"
                },
                {
                    "key": "THEME",
                    "value": "unspecified",
                    "priority": "fallback"
                }
            ],
            "containers": [
                {
                    "key": "accordion",
                    "templateUrl": "templates/containers/accordion.html",
                    "attributes": [ "label" ]
                }
            ],
            "representations": [
                {
                    "key": "tree",
                    "templateUrl": "templates/subtree.html",
                    "uses": [ "composition" ],
                    "type": "root",
                    "priority": "preferred"
                },
                {
                    "key": "tree",
                    "templateUrl": "templates/tree.html"
                },
                {
                    "key": "subtree",
                    "templateUrl": "templates/subtree.html",
                    "uses": [ "composition" ]
                },
                {
                    "key": "tree-node",
                    "templateUrl": "templates/tree-node.html",
                    "uses": [ "action" ]
                },
                {
                    "key": "label",
                    "templateUrl": "templates/label.html",
                    "uses": [ "type", "location" ],
                    "gestures": [ "drag", "menu", "info" ]
                },
                {
                    "key": "node",
                    "templateUrl": "templates/label.html",
                    "uses": [ "type" ],
                    "gestures": [ "drag", "menu" ]
                },
                {
                    "key": "action-group",
                    "templateUrl": "templates/controls/action-group.html",
                    "uses": [ "action" ]
                },
                {
                    "key": "context-menu",
                    "templateUrl": "templates/menu/context-menu.html",
                    "uses": [ "action" ]
                },
                {
                    "key": "switcher",
                    "templateUrl": "templates/controls/switcher.html",
                    "uses": [ "view" ]
                },
                {
                    "key": "object-inspector",
                    "templateUrl": "templates/object-inspector.html"
                }
            ],
            "controls": [
                {
                    "key": "selector",
                    "templateUrl": "templates/controls/selector.html"
                },
                {
                    "key": "datetime-picker",
                    "templateUrl": "templates/controls/datetime-picker.html"
                },
                {
                    "key": "datetime-field",
                    "templateUrl": "templates/controls/datetime-field.html"
                }
            ],
            "licenses": [
                {
                    "name": "Modernizr",
                    "version": "2.6.2",
                    "description": "Browser/device capability finding",
                    "author": "Faruk Ateş",
                    "website": "http://modernizr.com",
                    "copyright": "Copyright (c) 2009–2015",
                    "license": "license-mit",
                    "link": "http://modernizr.com/license/"
                },
                {
                    "name": "Normalize.css",
                    "version": "1.1.2",
                    "description": "Browser style normalization",
                    "author": "Nicolas Gallagher, Jonathan Neal",
                    "website": "http://necolas.github.io/normalize.css/",
                    "copyright": "Copyright (c) Nicolas Gallagher and Jonathan Neal",
                    "license": "license-mit",
                    "link": "https://github.com/necolas/normalize.css/blob/v1.1.2/LICENSE.md"
                }
            ]
        }
    });
});
