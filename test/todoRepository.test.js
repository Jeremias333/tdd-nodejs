const {describe, it, before, afterEach} = require('mocha');
const {expect} = require('chai');
const TodoRepository = require('../src/todoRepository');
const { createSandbox } =  require('sinon');

describe('todoRepository', () => {
    let todoRepository;
    let sandBox;

    before(() => {
        todoRepository = new TodoRepository();
        sandBox = new createSandbox();
    });

    afterEach(() => {
        sandBox.restore();
    });

    describe('methods signature', () => {
        it('should call find from lokijs', () => {
            const mockDatabase = [
                {
                    name: 'jeremias',
                    age: 21,
                    meta: { revision: 0, created: 1623708892971, version: 0 },
                    '$loki': 1
                },
            ];

            const functionName = "find";
            const expectedReturn = mockDatabase;
            sandBox.stub(
                todoRepository.schedule,
                functionName
            ).returns(expectedReturn);

            const result = todoRepository.list();
            expect(result).to.be.deep.equal(expectedReturn);
            expect(todoRepository.schedule[functionName].calledOnce).to.be.ok;
        });
        
        it('should call insertOne from lokijs', () => {
            const functionName = "insertOne";
            const expectedReturn = true;

            sandBox.stub(
                todoRepository.schedule,
                functionName
            ).returns(expectedReturn);

            const data = {name: 'Jeremias'}
            const result = todoRepository.create(data);

            expect(result).to.be.ok;
            expect(todoRepository.schedule[functionName].calledOnceWithExactly(data)).to.be.ok;

        });
       
    });
});

