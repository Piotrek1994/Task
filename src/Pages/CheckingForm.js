import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'

let SelectingFormValuesForm = props => {
	const { favoriteColorValue, fullName, handleSubmit, hasEmailValue, pristine, reset, submitting, soupCheckValue,sandwichCheckValue } =
		props
	return (
		<form className='card' style={{ width: '1000px', margin: '40px auto' }} onSubmit={handleSubmit}>
			<div>
				<label htmlFor='hasEmail'>Pizza?</label>
				<div>
					<Field name='hasEmail' id='hasEmail' component='input' type='checkbox' />
				</div>
			</div>

			<div>
				<label>Soup?</label>
				<div>
					<Field name='soupCheck' component='input' type='checkbox' />
				</div>
			</div>

			<div>
				<label>Sandwich?</label>
				<div>
					<Field name='sandwichCheck' component='input' type='checkbox' />
				</div>
			</div>

			{sandwichCheckValue && (
				<div>
                <label>Slices of bread</label>
                <div>
                    <Field name='number' component='input' type='number' placeholder='0' />
                </div>
            </div>
			)}

			{soupCheckValue && (
				<div>
					<label>Spiciness scale</label>
					<div>
						<Field component='input' type='range' id='volume' name='volume' min='0' max='11' />
					</div>
				</div>
			)}

			{hasEmailValue && (
				<div>
					<label>Number of slices</label>
					<div>
						<Field name='number' component='input' type='number' placeholder='0' />
					</div>
				</div>
			)}
			{hasEmailValue && (
				<div className='form-floating mb-3'>
					<input type='number' class='form-control' id='floatingInput' placeholder='Diameter'></input>
					<label for='floatingInput'>Diameter</label>
				</div>
			)}

			<div>
				<button type='submit' disabled={pristine || submitting}>
					Submit {fullName}
				</button>
				<button type='button' disabled={pristine || submitting} onClick={reset}>
					Clear Values
				</button>
			</div>
		</form>
	)
}

// The order of the decoration does not matter.

// Decorate with redux-form
SelectingFormValuesForm = reduxForm({
	form: 'selectingFormValues', // a unique identifier for this form
})(SelectingFormValuesForm)

// Decorate with connect to read form values
const selector = formValueSelector('selectingFormValues') // <-- same as form name
SelectingFormValuesForm = connect(state => {
	// can select values individually
	const hasEmailValue = selector(state, 'hasEmail')
	const soupCheckValue = selector(state, 'soupCheck')
	const sandwichCheckValue = selector(state, 'sandwichCheck')
	const favoriteColorValue = selector(state, 'favoriteColor')
	// or together as a group
	const { firstName, lastName } = selector(state, 'firstName', 'lastName')
	return {
		hasEmailValue,
		favoriteColorValue,
		soupCheckValue,
        sandwichCheckValue,
		fullName: `${firstName || ''} ${lastName || ''}`,
	}
})(SelectingFormValuesForm)

export default SelectingFormValuesForm
