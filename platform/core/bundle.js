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
    legacyRegistry.register("platform/core", {
        "name": "Open MCT Web Core",
        "description": "Defines core concepts of Open MCT Web.",
        "sources": "src",
        "configuration": {
            "paths": {
                "uuid": "uuid"
            }
        },
        "extensions": {
            "versions": [
                {
                    "name": "Version",
                    "value": "${project.version}",
                    "priority": 999
                },
                {
                    "name": "Built",
                    "value": "${timestamp}",
                    "description": "The date on which this version of the client was built.",
                    "priority": 990
                },
                {
                    "name": "Revision",
                    "value": "${buildNumber}",
                    "description": "A unique revision identifier for the client sources.",
                    "priority": 995
                },
                {
                    "name": "Branch",
                    "value": "${scmBranch}",
                    "description": "The date on which this version of the client was built.",
                    "priority": 994
                }
            ],
            "components": [
                {
                    "provides": "objectService",
                    "type": "provider",
                    "implementation": "objects/DomainObjectProvider.js",
                    "depends": [ "modelService", "instantiate" ]
                },
                {
                    "provides": "capabilityService",
                    "type": "provider",
                    "implementation": "capabilities/CoreCapabilityProvider.js",
                    "depends": [ "capabilities[]", "$log" ]
                },
                {
                    "provides": "modelService",
                    "type": "provider",
                    "implementation": "models/StaticModelProvider",
                    "depends": [ "models[]", "$q", "$log" ]
                },
                {
                    "provides": "modelService",
                    "type": "provider",
                    "implementation": "models/RootModelProvider.js",
                    "depends": [ "roots[]", "$q", "$log" ]
                },
                {
                    "provides": "modelService",
                    "type": "aggregator",
                    "implementation": "models/ModelAggregator.js",
                    "depends": [ "$q" ]
                },
                {
                    "provides": "modelService",
                    "type": "provider",
                    "implementation": "models/PersistedModelProvider.js",
                    "depends": [
                        "persistenceService",
                        "$q",
                        "now",
                        "PERSISTENCE_SPACE"
                    ]
                },
                {
                    "provides": "modelService",
                    "type": "decorator",
                    "implementation": "models/CachingModelDecorator.js"
                },
                {
                    "provides": "modelService",
                    "type": "decorator",
                    "priority": "fallback",
                    "implementation": "models/MissingModelDecorator.js"
                },
                {
                    "provides": "typeService",
                    "type": "provider",
                    "implementation": "types/TypeProvider.js",
                    "depends": [ "types[]" ]
                },
                {
                    "provides": "actionService",
                    "type": "provider",
                    "implementation": "actions/ActionProvider.js",
                    "depends": [ "actions[]", "$log" ]
                },
                {
                    "provides": "actionService",
                    "type": "aggregator",
                    "implementation": "actions/ActionAggregator.js"
                },
                {
                    "provides": "actionService",
                    "type": "decorator",
                    "implementation": "actions/LoggingActionDecorator.js",
                    "depends": [ "$log" ]
                },
                {
                    "provides": "viewService",
                    "type": "provider",
                    "implementation": "views/ViewProvider.js",
                    "depends": [ "views[]", "$log" ]
                },
                {
                    "provides": "identifierService",
                    "type": "provider",
                    "implementation": "identifiers/IdentifierProvider.js",
                    "depends": [ "PERSISTENCE_SPACE" ]
                }
            ],
            "types": [
                {
                    "properties": [
                        {
                            "control": "textfield",
                            "name": "Title",
                            "key": "name",
                            "property": "name",
                            "pattern": "\\S+",
                            "required": true,
                            "cssclass": "l-med"
                        }
                    ]
                },
                {
                    "key": "root",
                    "name": "Root",
                    "glyph": "F"
                },
                {
                    "key": "folder",
                    "name": "Folder",
                    "glyph": "F",
                    "features": "creation",
                    "description": "Useful for storing and organizing domain objects.",
                    "model": { "composition": [] }
                },
                {
                    "key": "unknown",
                    "name": "Unknown Type",
                    "glyph": "\u003f"
                },
                {
                    "name": "Unknown Type",
                    "glyph": "\u003f"
                }
            ],
            "capabilities": [
                {
                    "key": "composition",
                    "implementation": "capabilities/CompositionCapability.js",
                    "depends": [ "$injector", "contextualize" ]
                },
                {
                    "key": "relationship",
                    "implementation": "capabilities/RelationshipCapability.js",
                    "depends": [ "$injector" ]
                },
                {
                    "key": "type",
                    "implementation": "types/TypeCapability.js",
                    "depends": [ "typeService" ]
                },
                {
                    "key": "action",
                    "implementation": "actions/ActionCapability.js",
                    "depends": [ "$q", "actionService" ]
                },
                {
                    "key": "view",
                    "implementation": "views/ViewCapability.js",
                    "depends": [ "viewService" ]
                },
                {
                    "key": "persistence",
                    "implementation": "capabilities/PersistenceCapability.js",
                    "depends": [ "persistenceService", "identifierService",
                        "notificationService", "$q" ]
                },
                {
                    "key": "metadata",
                    "implementation": "capabilities/MetadataCapability.js"
                },
                {
                    "key": "mutation",
                    "implementation": "capabilities/MutationCapability.js",
                    "depends": [ "topic", "now" ]
                },
                {
                    "key": "delegation",
                    "implementation": "capabilities/DelegationCapability.js",
                    "depends": [ "$q" ]
                },
                {
                    "key": "instantiation",
                    "implementation": "capabilities/InstantiationCapability.js",
                    "depends": [ "$injector", "identifierService" ]
                }
            ],
            "services": [
                {
                    "key": "now",
                    "implementation": "services/Now.js"
                },
                {
                    "key": "throttle",
                    "implementation": "services/Throttle.js",
                    "depends": [ "$timeout" ]
                },
                {
                    "key": "topic",
                    "implementation": "services/Topic.js",
                    "depends": [ "$log" ]
                },
                {
                    "key": "contextualize",
                    "implementation": "services/Contextualize.js",
                    "depends": [ "$log" ]
                },
                {
                    "key": "instantiate",
                    "implementation": "services/Instantiate.js",
                    "depends": [ "capabilityService" ]
                }
            ],
            "roots": [
                {
                    "id": "mine",
                    "model": {
                        "name": "My Items",
                        "type": "folder",
                        "composition": []
                    }
                }
            ],
            "constants": [
                {
                    "key": "PERSISTENCE_SPACE",
                    "value": "mct"
                }
            ],
            "licenses": [
                {
                    "name": "Math.uuid.js",
                    "version": "1.4",
                    "description": "Unique identifer generation (code adapted.)",
                    "author": "Robert Kieffer",
                    "website": "https://github.com/broofa/node-uuid",
                    "copyright": "Copyright (c) 2010 Robert Kieffer",
                    "license": "license-mit",
                    "link": "http://opensource.org/licenses/MIT"
                }
            ]
        }
    });
});
