import React, { useState } from 'react'
import { connect } from 'react-redux'
import { email, required } from 'redux-form-validators'
import { Field, Form, reduxForm, FieldArray, formValueSelector  } from 'redux-form'
import './DynamicForm.css'
import { Radio, RadioGroupField, Flex } from '@aws-amplify/ui-react'


const DISHES_TYPES = [
	{
		key: 0,
		description: 'pizza',
	},
	{
		key: 1,
		description: 'soup',
	},
	{
		key: 2,
		description: 'sandwitch',
	},
]

const TextField = props => {
	const { meta = {} } = props
	const inputProps = {
		type: props.type || 'text',
		className: props.className,
		name: props.input.name,
		id: props.input.name,
		readOnly: props.readOnly,
		autoFocus: props.autoFocus,
		autoComplete: props.autoComplete,
		placeholder: props.placeholder,
		maxLength: props.maxLength,
		value: meta.uncontrolled ? undefined : props.input.value,
		defaultValue: meta.uncontrolled ? props.defaultValue : undefined,
		onChange: props.input.onChange,
		onKeyUp: props.onKeyUp,
		onBlur: props.onBlur,
		step: props.step || '',
		min: props.min || '',
	}

	return (
		<React.Fragment>
			<div name={`position-${props.input.name}`} className={`position-${props.input.name}`}>
				<input {...inputProps} {...props} onBlur={props.onBlurHandler} />
				{meta.touched && meta.error ? <div style={{ color: 'red' }}>{`This field  ${meta.error}`}</div> : null}
			</div>
		</React.Fragment>
	)
}

const renderUsers = ({ fields }) => {
	return (
		<>
			{fields.map((user, index) => {
				return (
					<>
						{index > 0 && (
							<button
								type='button'
								className='btn btn-danger btn-sm float-end mt-2'
								onClick={() => fields.remove(index)}>
								Remove
							</button>
						)}

						<div className='form_field'>
							<label class='form-label'>Dish name</label>
							<Field
								className='form-control'
								name={`${user}.firstName`}
								component={TextField}
								type='text'
								validate={[required()]}
							/>
						</div>
						<div className='form_field'>
							<label className='form-label'>Preparation time</label>
							<input className='form-control' id='preparation_time' defaultValue='00:00:00' type='time' step='1' />
						</div>	
					</>
				)
			})}
		</>
	)
}

const ScrollForm = ({ handleSubmit, form }) => {
	return (
		<div class='card' style={{ width: '1100px', margin: '40px auto' }}>
			<div class='card-body'>
				<Form onSubmit={handleSubmit}>
					<h3 style={{ textAlign: 'center' }}>Dish Form</h3>
					<br />
					<FieldArray name='users' component={renderUsers} />

					<div>
						<button className='btn btn-primary mt-2'>Submit</button>
					</div>
				</Form>
			</div>
		</div>
	)
}



  

export default reduxForm({
	form: 'ScrollForm',
	enableReinitialize: true,
})(ScrollForm)
