(function (){
    // course link: https://github.com/odoo/owl/blob/master/doc/learning/tutorial_todoapp.md
    // console.log('Hello Owl', owl.__info__.version);
    const { Component, mount, xml } = owl;

    class Task extends Component {
        static template = xml /* xml */ `
            <div class="task" t-att-class="props.task.isCompleted ? 'done' : ''">
                <input type="checkbox" t-att-checked="props.task.isCompleted"/>
                <span>
                    <t t-esc="props.task.text"/>
                </span>
            </div>
        `;
        static props = ["task"];
    }
    
    class Root extends Component {
        static template = xml/* xml */ `
            <div class="todo-app">
                <input placeholder="Enter a new task" t-on-keyup="addTask"/>
                <div class="task-list">
                    <t t-foreach="tasks" t-as="task" t-key="task.id">
                        <Task task="task"/>
                    </t>
                </div>
            </div>
        `;

        addTask(ev) {
            if (ev.keyCode ===13) {
                const text = ev.target.value.trim();
                ev.target.value = "";
                console.log('adding task: ', text);
            }
        }
        
        static components = { Task };

        tasks = [
            {
                id: 1,
                text: "Buy Milk",
                isCompleted: true,
            },
            {
                id: 2,
                text: "Clean House",
                isCompleted: false,
            },
        ];
    }

    mount(Root, document.body, {dev: true})
})();