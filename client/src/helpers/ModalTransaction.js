import React from 'react';
import Modal from 'react-modal';
Modal.setAppElement('#root');

export default function ModalTransaction({ data }) {
  return <div>
    <Modal isOpen={true}>
      <div>{data._id}</div>
      <div>{data.description}</div>
      <div>{data.value}</div>
      <div>{data.yearMonthDay}</div>
    </Modal>
  </div>
}