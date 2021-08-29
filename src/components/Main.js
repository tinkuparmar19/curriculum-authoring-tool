import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function Main(props) {
    const { rows } = props

    

    return (
        <>
            <div className='container-constant'>
                <div className='container-left-first'>
                    <h4>Actions</h4>
                    <p>Move, Ident, Outdent, Delete</p>
                </div>
                <div className='container-right-first'>
                    <h4>Standard</h4>
                    <p>The text of the standard</p>
                </div>
            </div>
            <DragDropContext onDragEnd={props.handleOnDragEnd}>
            <Droppable droppableId='rows'>
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {rows && rows.map(item => {
                            return (
                                <Draggable key={item.id} draggableId={item.id.toString()} index={item.id}>
                                    {(provided) => (
                                        <div key={item.id} className='container-constant' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                        <div className='container-left'>
                                        <i className="fas fa-arrows-alt" ></i>
                                        <i className="fas fa-arrow-left" onClick={() => props.handleLeftMain(item.id)}></i>
                                        <i className="fas fa-arrow-right" onClick={() => props.handleRightMain(item.id)}></i>
                                        <i className="far fa-trash-alt" onClick={() => props.handleDelete(item.id)}></i>
                                    </div>
                                    <div className={`container-right ${item.position}`}>
                                        {item.text}
                                    </div>
                                </div>
                                )}
                                </Draggable>
                        )})}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            </DragDropContext>
        </>
    )
}

export default Main
