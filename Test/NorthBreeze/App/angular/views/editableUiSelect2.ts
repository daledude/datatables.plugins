﻿module app.AngularExamples {

    export class EditableUiSelect2Controller {
        
        public data = [];

        public objVersions = [
            { id: 1, text: 'one' },
            { id: 2, text: 'two' },
            { id: 3, text: 'three' },
            { id: 4, text: 'four' },
            { id: 5, text: 'five' }
        ];
        public versions = [1, 2, 3, 4, 5, 6, 7];
        public versionGroups = [
            { label: 'Group1', items: [1, 2, 3] },
            { label: 'Group2', items: [4, 5, 6] }
        ];

        public options;

        public static $inject = ['$scope']
        constructor($scope) {
            $scope.vm = this;
            var i;

            for (i = 0; i < 100; i++) {
                this.data.push({
                    "versionSimple": 1,
                    "versionSimpleMulti": [1],
                    "versionPrimitive": 1,
                    "versionNgOptions": 1,
                    "objVersion": this.objVersions[0],
                    "version": 1,
                    "versionGroup": 1
                });
            }

            $scope.formatObjVersion = (id) => {
                for (i = 0, length = this.objVersions.length; i < length; i++) {
                    if (this.objVersions[i].id === id)
                        return this.objVersions[i].id + ' - ' + this.objVersions[i].text;
                }
                return '';
            };

            this.options = {
                deferRender: true,
                columns: [
                    {
                        data: "versionSimple", title: "Version simple", type: "number",
                        editable: {
                            validators: { required: true },
                            options: [{ text: 'Version 1', id: 1 }, { text: 'Version 2', id: 2 }],
                            type: 'select',
                            settings: {
                                allowClear: true,
                                placeholder: 'Select a version',
                                width: '150px'
                            }
                        }
                    },
                    {
                        data: "versionNgOptions", title: "Version ngOptions", type: "number",
                        editable: {
                            validators: { required: true },
                            ngOptions: 'item.id as item.text for item in vm.objVersions',
                            type: 'select',
                            settings: {
                                allowClear: true,
                                placeholder: 'Select a version',
                                width: '150px'
                            }
                        }
                    },
                    {
                        data: "versionPrimitive", title: "Version Primitive", type: "number",
                        expression: "formatObjVersion(data.versionPrimitive)",
                        editable: {
                            asInput: true,
                            type: 'select',
                            settings: {
                                allowClear: true,
                                placeholder: "Select a version",
                                data: this.objVersions,
                                select2Model: (item) => {
                                    return item ? item.id: null;
                                },
                                formatResult: (item) => {
                                    return item.id + " - " + item.text;
                                },
                                formatSelection: (item) => {
                                    return item.id + " - " + item.text;
                                },
                            }
                        }
                    },
                    {
                        data: "versionSimpleMulti", title: "Version multiple", 
                        expression: "data.versionSimpleMulti.join(', ')",
                        editable: {
                            asInput: true,
                            validators: { required: true },
                            type: 'select',
                            settings: {
                                simple_tags: true,
                                multiple: true,
                                data: this.objVersions,
                                allowClear: true,
                                placeholder: 'Select a version',
                                width: '150px'
                            }
                        }
                    },
                    {
                        data: "objVersion", title: "Version Object",
                        expression: "data.objVersion.id + '-' + data.objVersion.text",
                        editable: {
                            asInput: true,
                            type: 'select',
                            settings: {
                                allowClear: true,
                                placeholder: "Select a version",
                                data: this.objVersions
                            }
                        }
                    },
                    {
                        data: "versionGroup", title: "Version Group", type: "number",
                        editable: {
                            validators: { required: true },
                            groups: true,
                            type: 'select',
                            settings: {
                                allowClear: true,
                                placeholder: 'Select a version',
                                width: '150px'
                            },
                            template: {
                                optgroup: {
                                    attrs: {
                                        'ng-repeat': 'group in vm.versionGroups',
                                        'label': '{{group.label}}'
                                    }
                                },
                                option: {
                                    attrs: {
                                        'ng-repeat': 'item in group.items',
                                        'ng-bind': 'item',
                                        'ng-value': 'item',
                                    }
                                }
                            }
                        }

                    }
                ],
                editable: {
                    services: {
                        data: {
                            type: dt.editable.DefaultDataSerice,
                        },
                    },
                },
            };

        }

    }
}

angular.module("app").controller("AngularExamples.EditableUiSelect2Controller", app.AngularExamples.EditableUiSelect2Controller);