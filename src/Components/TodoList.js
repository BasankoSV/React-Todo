import React from 'react'
import { Checkbox, List, Button } from 'antd'
import { Popconfirm } from 'antd'
import {
  EditOutlined,
  ExclamationCircleFilled,
  DeleteFilled
} from '@ant-design/icons'


function TodoList(props) {
  
  const styleImportant = { color: '#820014', fontWeight: 'bold' }
  const styleCompleted = { textDecoration: 'line-through' }
  const styleImportantCompleted = {...styleImportant, ...styleCompleted}

  return (
    <List
      split={ true }
      bordered={ true }
      size='small'
      header={
        <Button type="primary" block
          onClick={props.modalVisible.bind(null, true, null)}>
          Добавить новую задачу
        </Button>
        }
      footer={ <div style={{fontWeight: 900}}>Всего задач: {props.todos.length} шт.</div> }
      dataSource={ props.todos }
      renderItem={(item,index) =>
        <List.Item
          key={item.index}
          style={ item.important ? (item.completed ? styleImportantCompleted : styleImportant) : (item.completed ? styleCompleted : null) }
          actions={[
            item.date,
            <Checkbox
              checked={item.completed}
              onChange={props.onCompleted.bind(null, item.id)}
            ></Checkbox>,
            <EditOutlined
              title={'Редактировать'}
              style={{color: '#1890ff'}}
              onClick={props.modalVisible.bind(null, false, index)}
            />,
            <ExclamationCircleFilled
              title={'Важно'}
              style={{color: '#d4380d'}}
              onClick={props.onImportant.bind(null, item.id)}
            />,
            <Popconfirm
              title='Удалить, Вы уверены?'
              onConfirm={ props.onRemove.bind(null, item.id) }
            >
              <DeleteFilled
                title={'Удалить'}
                style={{color: '#096dd9'}}
              />
            </Popconfirm>
          ]}
        >
          { item.title }
        </List.Item>
      }
    />
  )
}

export default TodoList