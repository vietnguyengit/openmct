/*****************************************************************************
 * Open MCT, Copyright (c) 2014-2021, United States Government
 * as represented by the Administrator of the National Aeronautics and Space
 * Administration. All rights reserved.
 *
 * Open MCT is licensed under the Apache License, Version 2.0 (the
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
 * Open MCT includes source code licensed under additional open source
 * licenses. See the Open Source Licenses file (LICENSES.md) included with
 * this source code distribution or the Licensing information page available
 * at runtime from the About dialog for additional information.
 *****************************************************************************/
import CouchPlugin from './plugin.js';
import {
    createOpenMct,
    resetApplicationState, spyOnBuiltins
} from 'utils/testing';
import CouchObjectProvider from './CouchObjectProvider';

describe('the plugin', () => {
    let openmct;
    let element;
    let child;
    let provider;
    let testPath = '/test/db';
    let options;
    let mockIdentifierService;
    let mockDomainObject;

    beforeEach((done) => {
        mockDomainObject = {
            identifier: {
                namespace: '',
                key: 'some-value'
            },
            type: 'mock-type'
        };
        options = {
            url: testPath,
            filter: {},
            disableObserve: true
        };
        openmct = createOpenMct(false);

        spyOnBuiltins(['fetch'], window);

        openmct.$injector = jasmine.createSpyObj('$injector', ['get']);
        mockIdentifierService = jasmine.createSpyObj(
            'identifierService',
            ['parse']
        );
        mockIdentifierService.parse.and.returnValue({
            getSpace: () => {
                return 'mct';
            }
        });

        openmct.$injector.get.and.returnValue(mockIdentifierService);

        openmct.install(new CouchPlugin(options));

        openmct.types.addType('mock-type', {creatable: true});

        element = document.createElement('div');
        child = document.createElement('div');
        element.appendChild(child);

        openmct.on('start', done);
        openmct.startHeadless();

        provider = openmct.objects.getProvider(mockDomainObject.identifier);
        spyOn(provider, 'get').and.callThrough();
        spyOn(provider, 'create').and.callThrough();
        spyOn(provider, 'update').and.callThrough();
    });

    afterEach(() => {
        return resetApplicationState(openmct);
    });

    describe('the provider', () => {
        let mockPromise;
        beforeEach(() => {
            mockPromise = Promise.resolve({
                json: () => {
                    return {
                        ok: true,
                        _id: 'some-value',
                        _rev: 1,
                        model: {}
                    };
                }
            });
            fetch.and.returnValue(mockPromise);
        });

        it('gets an object', () => {
            openmct.objects.get(mockDomainObject.identifier).then((result) => {
                expect(result.identifier.key).toEqual(mockDomainObject.identifier.key);
            });
        });

        it('creates an object', () => {
            openmct.objects.save(mockDomainObject).then((result) => {
                expect(provider.create).toHaveBeenCalled();
                expect(result).toBeTrue();
            });
        });

        it('updates an object', () => {
            openmct.objects.save(mockDomainObject).then((result) => {
                expect(result).toBeTrue();
                expect(provider.create).toHaveBeenCalled();
                openmct.objects.save(mockDomainObject).then((updatedResult) => {
                    expect(updatedResult).toBeTrue();
                    expect(provider.update).toHaveBeenCalled();
                });
            });
        });

        it('updates queued objects', () => {
            let couchProvider = new CouchObjectProvider(openmct, options, '');
            let intermediateResponse = couchProvider.getIntermediateResponse();
            spyOn(couchProvider, 'updateQueued');
            couchProvider.enqueueObject(mockDomainObject.identifier.key, mockDomainObject, intermediateResponse);
            couchProvider.objectQueue[mockDomainObject.identifier.key].updateRevision(1);
            couchProvider.update(mockDomainObject);
            expect(couchProvider.objectQueue[mockDomainObject.identifier.key].hasNext()).toBe(2);
            couchProvider.checkResponse({
                ok: true,
                rev: 2,
                id: mockDomainObject.identifier.key
            }, intermediateResponse);

            expect(couchProvider.updateQueued).toHaveBeenCalledTimes(2);
        });

        describe('batches object requests', () => {
            //NEED TO MAKE SURE THERE ARE NO RACE CONDITIONS WHERE REQUESTS FOR OBJECTS ARE DROPPED
        });
    });
});
