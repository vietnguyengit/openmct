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
    legacyRegistry.register("platform/features/timeline", {
        "name": "Timelines",
        "description": "Resources, templates, CSS, and code for Timelines.",
        "resources": "res",
        "extensions": {
            "constants": [
                {
                    "key": "TIMELINE_MINIMUM_DURATION",
                    "description": "The minimum duration to display in a timeline view (one hour.)",
                    "value": 3600000
                },
                {
                    "key": "TIMELINE_MAXIMUM_OFFSCREEN",
                    "description": "Maximum amount, in pixels, of a Gantt bar which may go off screen.",
                    "value": 1000
                },
                {
                    "key": "TIMELINE_ZOOM_CONFIGURATION",
                    "description": "Describes major tick sizes in milliseconds, and width in pixels.",
                    "value": {
                        "levels": [
                            1000,
                            2000,
                            5000,
                            10000,
                            20000,
                            30000,
                            60000,
                            120000,
                            300000,
                            600000,
                            1200000,
                            1800000,
                            3600000,
                            7200000,
                            14400000,
                            28800000,
                            43200000,
                            86400000
                        ],
                        "width": 200
                    }
                }
            ],
            "types": [
                {
                    "key": "timeline",
                    "name": "Timeline",
                    "glyph": "S",
                    "description": "A container for arranging Timelines and Activities in time.",
                    "features": [ "creation" ],
                    "contains": [ "timeline", "activity" ],
                    "properties": [
                        {
                            "name": "Start date/time",
                            "control": "timeline-datetime",
                            "required": true,
                            "property": [ "start" ],
                            "options": [ "SET" ]
                        },
                        {
                            "name": "Battery capacity (Watt-hours)",
                            "control": "textfield",
                            "required": false,
                            "conversion": "number",
                            "property": [ "capacity" ],
                            "pattern": "^-?\\d+(\\.\\d*)?$"
                        }
                    ],
                    "model": { "composition": [] }
                },
                {
                    "key": "activity",
                    "name": "Activity",
                    "glyph": "a",
                    "features": [ "creation" ],
                    "contains": [ "activity" ],
                    "description": "An action that takes place in time. You can define a start time and duration. Activities can be nested within other Activities, or within Timelines.",
                    "properties": [
                        {
                            "name": "Start date/time",
                            "control": "timeline-datetime",
                            "required": true,
                            "property": [ "start" ],
                            "options": [ "SET" ]
                        },
                        {
                            "name": "Duration",
                            "control": "duration",
                            "required": true,
                            "property": [ "duration" ]
                        }
                    ],
                    "model": { "composition": [], "relationships": { "modes": [] } }
                },
                {
                    "key": "mode",
                    "name": "Activity Mode",
                    "glyph": "A",
                    "features": [ "creation" ],
                    "description": "Define resource utilizations over time, then apply to an Activity.",
                    "model": { "resources": { "comms": 0, "power": 0 } },
                    "properties": [
                        {
                            "name": "Comms (Kbps)",
                            "control": "textfield",
                            "conversion": "number",
                            "pattern": "^-?\\d+(\\.\\d*)?$",
                            "property": [ "resources", "comms" ]
                        },
                        {
                            "name": "Power (watts)",
                            "control": "textfield",
                            "conversion": "number",
                            "pattern": "^-?\\d+(\\.\\d*)?$",
                            "property": [ "resources", "power" ]
                        }
                    ]
                }
            ],
            "views": [
                {
                    "key": "values",
                    "name": "Values",
                    "glyph": "A",
                    "templateUrl": "templates/values.html",
                    "type": "mode",
                    "uses": [ "cost" ],
                    "editable": false
                },
                {
                    "key": "timeline",
                    "name": "Timeline",
                    "glyph": "S",
                    "type": "timeline",
                    "description": "A timeline view of Timelines and Activities.",
                    "templateUrl": "templates/timeline.html",
                    "toolbar": {
                        "sections": [
                            {
                                "items": [
                                    {
                                        "method": "add",
                                        "glyph": "+",
                                        "control": "menu-button",
                                        "text": "Add",
                                        "options": [
                                            {
                                                "name": "Timeline",
                                                "glyph": "S",
                                                "key": "timeline"
                                            },
                                            {
                                                "name": "Activity",
                                                "glyph": "a",
                                                "key": "activity"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "items": [
                                    {
                                        "glyph": "\u00E9",
                                        "description": "Graph resource utilization",
                                        "control": "button",
                                        "method": "toggleGraph"
                                    },
                                    {
                                        "glyph": "A",
                                        "control": "dialog-button",
                                        "description": "Apply Activity Modes...",
                                        "title": "Apply Activity Modes",
                                        "dialog": {
                                            "control": "selector",
                                            "name": "Modes",
                                            "type": "mode"
                                        },
                                        "property": "modes"
                                    },
                                    {
                                        "glyph": "\u00E8",
                                        "description": "Edit Activity Link",
                                        "title": "Activity Link",
                                        "control": "dialog-button",
                                        "dialog": {
                                            "control": "textfield",
                                            "name": "Link",
                                            "pattern": "^(ftp|https?)\\:\\/\\/\\w+(\\.\\w+)*(\\:\\d+)?(\\/\\S*)*$"
                                        },
                                        "property": "link"
                                    },
                                    {
                                        "glyph": "\u0047",
                                        "description": "Edit Properties...",
                                        "control": "button",
                                        "method": "properties"
                                    }
                                ]
                            },
                            {
                                "items": [
                                    {
                                        "method": "remove",
                                        "description": "Remove item",
                                        "control": "button",
                                        "glyph": "Z"
                                    }
                                ]
                            }
                        ]
                    }
                }
            ],
            "stylesheets": [
                {
                    "stylesheetUrl": "css/timeline.css"
                },
                {
                    "stylesheetUrl": "css/timeline-espresso.css",
                    "theme": "espresso"
                },
                {
                    "stylesheetUrl": "css/timeline-snow.css",
                    "theme": "snow"
                }
            ],
            "representations": [
                {
                    "key": "gantt",
                    "templateUrl": "templates/activity-gantt.html",
                    "uses": [ "timespan", "type" ]
                }
            ],
            "templates": [
                {
                    "key": "timeline-tabular-swimlane-cols-tree",
                    "priority": "mandatory",
                    "templateUrl": "templates/tabular-swimlane-cols-tree.html"
                },
                {
                    "key": "timeline-tabular-swimlane-cols-data",
                    "priority": "mandatory",
                    "templateUrl": "templates/tabular-swimlane-cols-data.html"
                },
                {
                    "key": "timeline-resource-graphs",
                    "priority": "mandatory",
                    "templateUrl": "templates/resource-graphs.html"
                },
                {
                    "key": "timeline-resource-graph-labels",
                    "priority": "mandatory",
                    "templateUrl": "templates/resource-graph-labels.html"
                },
                {
                    "key": "timeline-legend-item",
                    "priority": "mandatory",
                    "templateUrl": "templates/legend-item.html"
                },
                {
                    "key": "timeline-ticks",
                    "priority": "mandatory",
                    "templateUrl": "templates/ticks.html"
                }
            ],
            "controls": [
                {
                    "key": "timeline-datetime",
                    "templateUrl": "templates/controls/datetime.html"
                },
                {
                    "key": "duration",
                    "templateUrl": "templates/controls/datetime.html"
                }
            ],
            "controllers": [
                {
                    "key": "TimelineController",
                    "implementation": "controllers/TimelineController.js",
                    "depends": [ "$scope", "$q", "objectLoader", "TIMELINE_MINIMUM_DURATION" ]
                },
                {
                    "key": "TimelineGraphController",
                    "implementation": "controllers/TimelineGraphController.js",
                    "depends": [ "$scope", "resources[]" ]
                },
                {
                    "key": "TimelineDateTimeController",
                    "implementation": "controllers/TimelineDateTimeController.js",
                    "depends": [ "$scope" ]
                },
                {
                    "key": "TimelineZoomController",
                    "implementation": "controllers/TimelineZoomController.js",
                    "depends": [ "$scope", "TIMELINE_ZOOM_CONFIGURATION" ]
                },
                {
                    "key": "TimelineTickController",
                    "implementation": "controllers/TimelineTickController.js"
                },
                {
                    "key": "TimelineTableController",
                    "implementation": "controllers/TimelineTableController.js"
                },
                {
                    "key": "TimelineGanttController",
                    "implementation": "controllers/TimelineGanttController.js",
                    "depends": [ "TIMELINE_MAXIMUM_OFFSCREEN" ]
                },
                {
                    "key": "ActivityModeValuesController",
                    "implementation": "controllers/ActivityModeValuesController.js",
                    "depends": [ "resources[]" ]
                }
            ],
            "capabilities": [
                {
                    "key": "timespan",
                    "implementation": "capabilities/ActivityTimespanCapability.js",
                    "depends": [ "$q" ]
                },
                {
                    "key": "timespan",
                    "implementation": "capabilities/TimelineTimespanCapability.js",
                    "depends": [ "$q" ]
                },
                {
                    "key": "utilization",
                    "implementation": "capabilities/UtilizationCapability.js",
                    "depends": [ "$q" ]
                },
                {
                    "key": "graph",
                    "implementation": "capabilities/GraphCapability.js",
                    "depends": [ "$q" ]
                },
                {
                    "key": "cost",
                    "implementation": "capabilities/CostCapability.js"
                }
            ],
            "directives": [
                {
                    "key": "mctSwimlaneDrop",
                    "implementation": "directives/MCTSwimlaneDrop.js",
                    "depends": [ "dndService" ]
                },
                {
                    "key": "mctSwimlaneDrag",
                    "implementation": "directives/MCTSwimlaneDrag.js",
                    "depends": [ "dndService" ]
                }
            ],
            "services": [
                {
                    "key": "objectLoader",
                    "implementation": "services/ObjectLoader.js",
                    "depends": [ "$q" ]
                }
            ],
            "resources": [
                {
                    "key": "power",
                    "name": "Power",
                    "units": "watts"
                },
                {
                    "key": "comms",
                    "name": "Comms",
                    "units": "Kbps"
                },
                {
                    "key": "battery",
                    "name": "Battery State-of-Charge",
                    "units": "%"
                }
            ]
        }
    });
});
