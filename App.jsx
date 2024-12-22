import { useState } from 'react';
import './App.css';
import uniquid from 'uniquid';

const App = () => {
  const [box, setBox] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [date, setDate] = useState('');
  const [todo, setTodo] = useState([]);
  const [select, setSelect] = useState('');
  const [status, setStatus] = useState('All');
  const [editId, setEditId] = useState(null);
  // const onClick = () => {
  //   if (inputValue != '') {

  //     setTodo([
  //       ...todo,
  //       {
  //         id: uniquid(),
  //         content: inputValue,
  //         date: date,
  //         select: select,
  //         completed: false,
  //       },
  //     ]);
  //   }
  //   setInputValue('');
  //   setSelect('');
  //   setBox(false);

  // };
  const onClick = () => {
    if (inputValue !== '') {
      if (editId) {
        setTodo(
          todo.map(item =>
            item.id === editId
              ? { ...item, content: inputValue, date, select }
              : item
          )
        );
        setEditId(null);
      } else {
        setTodo([
          ...todo,
          {
            id: uniquid(),
            content: inputValue,
            date: date,
            select: select,
            completed: false,
          },
        ]);
      }
    }
    setInputValue('');
    setDate('');
    setSelect('');
    setBox(false);
  };
  const priorityorder = priority => {
    if (priority === 'High') {
      return 'red';
    } else if (priority === 'Medium') {
      return 'green';
    } else if (priority === 'Low') {
      return 'yellow';
    } else {
      return 'grey';
    }
  };
  const trash = id => {
    const notrash = todo.filter(item => item.id !== id);
    setTodo(notrash);
  };
  const oncheck = (e, id) => {
    const todoCopy = [...todo];
    let index = 0;
    for (var i = 0; i < todoCopy.length; i++) {
      if (todoCopy[i].id == id) {
        index = i;
      }
    }
    todoCopy[index].completed = e.target.checked;
    setTodo(todoCopy);
  };
  const onEdit = item => {
    setEditId(item.id);
    setInputValue(item.content);
    setDate(item.date);
    setSelect(item.select);
    setBox(true);
  };
  const gettodo = status => {
    if (status === 'Today') {
      const todayDate = new Date().toISOString().split('T')[0];
      return todo.filter(item => item.date === todayDate);
    } else if (status === 'Pending') {
      return todo.filter(item => !item.completed);
    } else if (status === 'Overdue') {
      const todayDate = new Date().toISOString().split('T')[0];
      return todo.filter(item => item.date < todayDate && !item.completed);
    } else {
      return todo;
    }
  };

  return (
    <>
      <div className="fullsection">
        <div className="section1">
          <h1>ToDo List</h1>
        </div>
        <div className="status">
          <div onClick={() => setStatus('All')} className="all">
            <h3>All</h3>
          </div>
          <div onClick={() => setStatus('Today')} className="today">
            <h3>Today</h3>
          </div>
          <div onClick={() => setStatus('Pending')} className="pending">
            <h3>Pending</h3>{' '}
          </div>
          <div onClick={() => setStatus('Overdue')} className="overdue">
            <h3>Overdue</h3>{' '}
          </div>
        </div>

        <div className="section2">
          <h3>Task</h3>

          <button
            className="addbtn"
            onClick={() => {
              setBox(true);
            }}
          >
            + Add Task
          </button>
        </div>
        <div className="box" style={{ display: box ? 'block' : 'none' }}>
          <div className="form">
            <h3>Task Details</h3>
            <label htmlFor="">Title</label>

            <input
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
            />

            <div className="selectanddate">
              <div className="select">
                <label htmlFor="id">Priority</label>
                <br />
                <br />
                <select
                  name=""
                  id="id"
                  placeholder="Select Priority"
                  value={select}
                  onChange={e => setSelect(e.target.value)}
                >
                  <option value="">select priority</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <div className="date">
                <label htmlFor="">Deadline</label>
                <br />
                <br />
                <input
                  type="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                />
              </div>
            </div>
            <div className="boxbtn">
              <button onClick={() => setBox(false)}>close</button>
              <button onClick={onClick}>Add</button>
            </div>
          </div>
        </div>
        <div className="mapping">
          {gettodo(status).map(item => {
            return (
              <div className="todolist">
                <input type="checkbox" />
                <p>{item.content}</p>
                <div className="icons">
                  <div
                    className="priority"
                    style={{ backgroundColor: priorityorder(item.select) }}
                  ></div>
                  <p className="date"> {item.date}</p>

                  <i
                    onClick={() => {
                      trash(item.id);
                    }}
                    class="fa-solid fa-trash"
                  ></i>
                  <i
                    onClick={() => {
                      onEdit(item);
                    }}
                    class="fa-solid fa-pen-to-square"
                  ></i>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default App;
