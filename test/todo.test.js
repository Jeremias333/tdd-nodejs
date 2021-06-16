const {describe, it, before, beforeEach, afterEach} = require('mocha');
const {expect} = require('chai');
const Todo = require("../src/todo");
const {createSandbox} = require('sinon');
const { expectation } = require('sinon');

describe('todo', () => {
    let sandBox;
    beforeEach(() => {
        sandBox = createSandbox();
    });

    afterEach(() => sandBox.restore());

    describe("#isValid", () => {
        it("should return invalid when creating an object without text", () => {
            const data = {
                text: "",
                when: new Date("2020-04-06")
            }
            const todo = new Todo(data);
            const result = todo.isValid();
            expect(result).to.be.not.ok;
        });
        it("should return invalid when creating an object using the \"when\" property inválid", () => {
            const data = {
                text: "Hello World",
                when: new Date("20-04-06")
            }
            const todo = new Todo(data);
            const result = todo.isValid();
            expect(result).to.be.not.ok;
        });
        it("should have \"id\", \"text\", \"when\" and \"status\ properties after creating object", () => {
            const data = {
                text: "Hello World",
                when: new Date("2020-04-06")
            }
            const expectedId = '000001';

            const uuid = require("uuid");
            const fakeUUID = sandBox.fake.returns(expectedId);
            sandBox.replace(uuid, "v4", fakeUUID);

            const todo = new Todo(data);
            const expectedItem = {
                text: data.text,
                when: data.when,
                status: "",
                id: expectedId
            }

            const result = todo.isValid();
            expect(result).to.be.ok;

            expect(uuid.v4.calledOnce).to.be.ok;
            expect(todo).to.be.deep.equal(expectedItem)
        });
    });
});