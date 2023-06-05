import type { FC } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Todo } from './TodoItem';
import { Item } from '@shared';
import { useTodosStore } from '@store';
import { defaultTodos } from '@assets';

export const TodoList: FC = () => {
    const [todosLoading, setTodosLoading] = useState(true);
    const todos = useTodosStore((state) => state.todos);
    const setTodos = useTodosStore((state) => state.setTodos);
    const updateTodosOrder = useTodosStore((state) => state.updateTodosOrder);

    const moveTodo = useCallback(
        (dragIndex: number, hoverIndex: number) => {
            updateTodosOrder(dragIndex, hoverIndex);
        },
        [updateTodosOrder]
    );

    const renderTodo = useCallback(
        (todo: Item, index: number) => {
            return <Todo key={todo.id} index={index} id={todo.id} text={todo.text} moveTodo={moveTodo} />;
        },
        [moveTodo]
    );

    useEffect(() => {
        setTimeout(() => {
            setTodos(defaultTodos);
            setTodosLoading(false);
        }, 1000);
    }, [setTodos]);

    return useMemo(() => (todosLoading ? <div>Loading...</div> : <ul>{todos.map((todo, i) => renderTodo(todo, i))}</ul>), [renderTodo, todos, todosLoading]);
};
