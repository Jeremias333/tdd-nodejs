const {describe, it, before, afterEach} = require('mocha');
const {expect} = require('chai');
const TodoService = require('../src/todoService');
const Todo = require('../src/todo');
const { createSandbox } =  require('sinon');

describe('todoService', () => {
    let sandBox;

    before(() => {
        sandBox = new createSandbox();
    });

    describe("#list", () => {
        const mockDatabase = [
            {
                name: 'jeremias',
                age: 21,
                meta: { revision: 0, created: 1623708892971, version: 0 },
                '$loki': 1
            },
        ];

        let todoService;
        beforeEach(() => {
            const dependencies = {
                todoRepository: {
                    list: sandBox.stub().returns(mockDatabase)
                }
            }
            todoService = new TodoService(dependencies);
        });

        it("should return data on a specific format", () => {
            const result = todoService.list();
            const [{meta, $loki, ...expected}] = mockDatabase;
            expect(result).to.be.deep.equal([expected]); 
        });
    });

    describe("#create", () => {
        let todoService;
        beforeEach(() => {
            const dependencies = {
                todoRepository: {
                    create: sandBox.stub().returns(true)
                }
            }

            todoService = new TodoService(dependencies);
        });

        it("should't save todo item with invalid data", () => {
            const data = new Todo({
                text: '',
                when: ''
            });
            Reflect.deleteProperty(data, "id");
            const expected = {
                error: {
                    message: "invalid data",
                    data: data
                }
            }
            const result = todoService.create(data);
            expect(result).to.be.deep.equal(expected);
        }); 
        it("should save todo item with late status when the property is further than today", () => {
            const properties = {
                text: "I must walk my dog",
                when: new Date("2021-10-01 12:00:00 GMT-0")
            }
            const data = new Todo(data);
            const expectedId = '000001';

            const uuid = require("uuid");
            const fakeUUID = sandBox.fake.returns(expectedId);
            sandBox.replace(uuid, uuid.v4.name, fakeUUID)

            const today = new Date("2020-10-02");

        });
        it("should save todo item with peding status");

    });
});