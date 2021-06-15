class TodoService {
    constructor({ todoRepository }) {
        this.todoRepository = todoRepository;
    }

    create(todoItem) {
        if(!todoItem.isValid()) {
            return {
                error: {
                    message: 'invalid data',
                    data: todoItem
                }
            }
        }
    }

    list(query) {
        return this.todoRepository.list()
             .map(({meta, $loki, ...result}) => result);
    }

}

module.exports = TodoService;