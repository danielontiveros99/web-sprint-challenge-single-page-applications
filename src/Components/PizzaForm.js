import React, { useState, useEffect} from 'react'
import axios from 'axios'
import * as yup from 'yup'
import styled from 'styled-components'
import imgBack from '../Assets/background.jpg'

const PizzaDiv = styled.div`
  width: 400px;
  background: #6495ED;
  color: white;
  padding: 2%;
  position: fixed;
  margin: 2% 15% 15% 30%;
  border-radius: 10px;
  overflow: hidden;
`;


const PizzaForm = () => {
    //ALL STATES OF DATA
    const[orderForm, setOrderForm]=useState({
        name:'',
        size:{
            small: false,
            medium: false,
            large: false,
            extraLarge: false,
        },
        toppings: {
            pepperoni: false,
            sausage: false,
            mushrooms: false,
            blackOlives: false,
            greenPepper: false,
            onion: false,
        },
        instructions: '',
    })
    const[errors, setErrors] = useState({
        name: '',
    })
    
    const[apiData, setApiData] = useState(null)

    //Validation coding below - using Yup
    const schema = yup.object().shape({
        name: yup.string().required("Must Input Name").min(2,"min 2 letters required")
    })

    const validateData = (e) => {
        yup.reach(schema, e.target.name).validate(e.target.value)
        .then((val) => {
            setErrors({...errors, [e.target.name]:''})
        })
        .catch((err) => {
            setErrors({...errors, [e.target.name]: err.errors[0]})
        })
    }

    // Change Form Data Function
    const formDataChange = (e) => {
        e.persist()
        
        if(e.target.type === 'checkbox'){
            setOrderForm({...orderForm, toppings:{
                ...orderForm.toppings, [e.target.value]: e.target.checked}})
        }else{
            setOrderForm({...orderForm, [e.target.name]:e.target.value})
        }
        if(e.target.name==='name'){
            validateData(e);
        }
    }

    // Form Submit Function
    const submitForm = (e) => {
        e.preventDefault();
        axios.post('https://reqres.in/api/users', orderForm)
        .then(response => {
            setApiData(response.data)
            setOrderForm({
                name:'',
                size:{
                    small: false,
                    medium: false,
                    large: false,
                    extraLarge: false,
                },
                toppings: {
                    pepperoni: false,
                    sausage: false,
                    mushrooms: false,
                    blackOlives: false,
                    greenPepper: false,
                    onion: false,
                },
                instructions: '',
            })
        }).catch(err => console.log ("this is the error" , err))
    }


    return (
    <PizzaDiv>
        <form onSubmit={submitForm}>
        <label htmlFor='name'>
            Your Full Name: 
            <input
                id='name'
                name='name'
                type='text'
                placeholder='Enter Name'
                data-cy='name'
                value={orderForm.name}
                onChange={formDataChange}
            />
            {errors.name.length > 0 ? <p style={{color:'red'}}>{errors.name}</p> : null}
        </label>
        <label htmlFor='size'>
            Select Your Size: 
            <select 
                id='size'
                name='size'
                data-cy='size'
                defaultValue='large'
                value={orderForm.size}
                onChange={formDataChange}>
                    <option value='small' data-cy='small'>Small</option>
                    <option value='medium' data-cy='medium'>Medium</option>
                    <option value='large' data-cy='large'>Large</option>
                    <option value='extraLarge' data-cy='extraLarge'>Extra Large</option>
            </select>
        </label>
            <fieldset>
                <legend>Toppings! Pick As Many As You'd Like!</legend>
                <label htmlFor='pepperoni'>
                    <input
                        id='pepperoni'
                        name='pepperoni'
                        value='pepperoni'
                        data-cy='pepperoni'
                        type='checkbox'
                        onChange={formDataChange}
                    />
                    Pepperoni
                </label>
                <label htmlFor='sausage'>
                    <input
                        id='sausage'
                        name='sausage'
                        value='sausage'
                        data-cy='sausage'
                        type='checkbox'
                        onChange={formDataChange}
                    />
                    Sausage
                </label>
                <label htmlFor='mushrooms'>
                    <input
                        id='mushrooms'
                        name='mushrooms'
                        value='mushrooms'
                        data-cy='mushrooms'
                        type='checkbox'
                        onChange={formDataChange}
                    />
                    Mushrooms
                </label>
                <label htmlFor='blackOlives'>
                    <input
                        id='blackOlives'
                        name='blackOlives'
                        value='blackOlives'
                        data-cy='blackOlives'
                        type='checkbox'
                        onChange={formDataChange}
                    />
                    Black Olives
                </label>
                <label htmlFor='greenPepper'>
                    <input
                        id='greenPepper'
                        name='greenPepper'
                        value='greenPepper'
                        data-cy='greenPepper'
                        type='checkbox'
                        onChange={formDataChange}
                    />
                    Green Peppers
                </label>
                <label htmlFor='onion'>
                    <input
                        id='onion'
                        name='onion'
                        value='onion'
                        data-cy='onion'
                        type='checkbox'
                        onChange={formDataChange}
                    />
                    Onions
                </label>
            </fieldset>
            <label htmlFor='instructions'>
                Any Special Instructions?
                <textarea
                    id='instructions'
                    name='instructions'
                    data-cy='instruction'
                    value={orderForm.instructions}
                    placeholder="Special Instructions Here"
                    onChange={formDataChange}
                />
            </label>      
            <button
                style={{
                    background: "black",
                    color: "white",
                    borderRadius: "8px",
                    width: "150px",
                    height: "30px",
                    fontSize: "1.2rem",
                    border: "none",
                    marginTop: "2%"
                }}
                type="submit"
                data-cy='submit'
            >
            Order Now
            </button>
        </form> 
        <pre style={{color:"black"}}>{JSON.stringify(apiData, null, 2)}</pre>
    </PizzaDiv>
    )
}

export default PizzaForm
