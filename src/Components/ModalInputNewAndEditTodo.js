import React, { useState, useEffect } from "react"
import { Modal } from 'antd'
import { Input, DatePicker } from 'antd'
import moment from 'moment'
import 'moment/locale/ru'
import locale from 'antd/lib/date-picker/locale/ru_RU'

function ModalInputNewAndEditTodo(props) {
  const {title, date, index} = props.edit

  useEffect(() => {
    setValue(title)
    date ? setDateTodo(date) : setDateTodo(dateTodoDefault)
  }, [title, date])

  const [value, setValue] = useState('')

  const dateTodoDefault = moment(Date.now()).format('L')
  const [dateTodo, setDateTodo] = useState(dateTodoDefault)

  const clearTitleSetDate = () => {
    setValue('')
    setDateTodo(dateTodoDefault)
  }

  const onNewTodo = (title, date, index) => {
    if (value.trim()) {
      props.createNewTodoOrEdit(title, date, index)
      clearTitleSetDate()
      props.modalVisible()
    }
  }

  const onSetDate = value => {
    setDateTodo(moment(value).format('L'))
  }

  const handleCancel = () => {
    // clearTitleSetDate()
    props.modalVisible()
  }

  return (
    <Modal
      title={props.modalTitle}
      visible={props.visible}
      okText={'Сохранить'}
      cancelText={'Отменить'}
      width={800}
      onOk={onNewTodo.bind(null, value, dateTodo, index)}
      onCancel={handleCancel}
    >
      <Input.Group compact>
        <Input
          type="text"
          style={{ width: '70%' }}
          allowClear={true}
          onChange={event => setValue(event.target.value)}
          onPressEnter={onNewTodo.bind(null, value, dateTodo, index)}
          value={value}
          />
        <DatePicker
          format={'L'}
          locale={locale}
          value={moment(dateTodo, 'DDMMYYYY')}
          style={{ width: '30%' }}
          allowClear={false}
          showToday
          onChange={onSetDate}
        />
      </Input.Group>
    </Modal>
  )
}

export default ModalInputNewAndEditTodo
